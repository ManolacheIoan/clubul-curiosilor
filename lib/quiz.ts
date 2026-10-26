import { EXPLORERS, QUIZ, type ExplorerProfile, type ExplorerType, type QuizQuestion } from "@/data/quiz";

/** Răspunsurile date: id întrebare → id răspuns. */
export type QuizAnswers = Record<string, string>;

export type QuizResult = {
  winner: ExplorerProfile;
  scores: Record<ExplorerType, number>;
  /** Procentul fiecărui tip din totalul punctelor (rotunjit; suma poate fi 99–101). */
  percents: Record<ExplorerType, number>;
};

const ORDER = EXPLORERS.map((e) => e.id);
const zero = () => Object.fromEntries(ORDER.map((t) => [t, 0])) as Record<ExplorerType, number>;

/**
 * Calculează tipul de explorator. La egalitate câștigă tipul ales la cea mai
 * recentă întrebare dintre cele la egalitate; dacă nici așa nu se poate decide,
 * contează ordinea din EXPLORERS. Răspunsurile necunoscute sunt ignorate.
 */
export function scoreQuiz(answers: QuizAnswers, questions: QuizQuestion[] = QUIZ): QuizResult {
  const scores = zero();
  /** Ultima întrebare (indice) la care fiecare tip a primit puncte. */
  const lastSeen = Object.fromEntries(ORDER.map((t) => [t, -1])) as Record<ExplorerType, number>;

  questions.forEach((q, i) => {
    const answer = q.answers.find((a) => a.id === answers[q.id]);
    if (!answer) return;
    for (const [type, pts] of Object.entries(answer.points) as [ExplorerType, number][]) {
      scores[type] += pts;
      if (pts > 0) lastSeen[type] = i;
    }
  });

  const best = Math.max(...ORDER.map((t) => scores[t]));
  const tied = ORDER.filter((t) => scores[t] === best);
  const winnerId = tied.reduce((a, b) => (lastSeen[b] > lastSeen[a] ? b : a));

  const total = ORDER.reduce((s, t) => s + scores[t], 0);
  const percents = zero();
  for (const t of ORDER) percents[t] = total ? Math.round((scores[t] / total) * 100) : 0;

  return { winner: EXPLORERS.find((e) => e.id === winnerId)!, scores, percents };
}

/** Câte întrebări au primit un răspuns valid. */
export function answeredCount(answers: QuizAnswers, questions: QuizQuestion[] = QUIZ): number {
  return questions.filter((q) => q.answers.some((a) => a.id === answers[q.id])).length;
}
