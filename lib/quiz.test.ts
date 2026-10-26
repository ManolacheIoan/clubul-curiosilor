import { describe, expect, it } from "vitest";
import { QUIZ, type QuizQuestion } from "@/data/quiz";
import { answeredCount, scoreQuiz } from "./quiz";

/** Alege, la fiecare întrebare, răspunsul care dă cele mai multe puncte tipului dat. */
const allFor = (type: string) =>
  Object.fromEntries(
    QUIZ.map((q) => [q.id, [...q.answers].sort((a, b) => ((b.points as Record<string, number>)[type] ?? 0) - ((a.points as Record<string, number>)[type] ?? 0))[0].id]),
  );

describe("scoreQuiz", () => {
  it.each(["inventator", "artist", "aventurier", "povestitor"])("răspunsuri consecvente → %s", (type) => {
    expect(scoreQuiz(allFor(type)).winner.id).toBe(type);
  });

  it("adună punctele, inclusiv răspunsurile care punctează două tipuri", () => {
    const r = scoreQuiz({ pauza: "desenez", rucsac: "lupa" });
    expect(r.scores).toEqual({ inventator: 2, artist: 1, aventurier: 0, povestitor: 1 });
  });

  it("la egalitate câștigă tipul ales mai recent", () => {
    // cutie → inventator 2, superputere → artist 2: egalitate, artist e mai recent
    expect(scoreQuiz({ cutie: "desfac", superputere: "culori" }).winner.id).toBe("artist");
    // ordinea inversă a întrebărilor din chestionar dă celălalt rezultat
    expect(scoreQuiz({ cutie: "pictez", superputere: "construiesc" }).winner.id).toBe("inventator");
  });

  it("ignoră răspunsurile necunoscute și întrebările lipsă", () => {
    const r = scoreQuiz({ cutie: "nu-exista", altceva: "x" });
    expect(Object.values(r.scores).every((v) => v === 0)).toBe(true);
    expect(r.winner.id).toBe("inventator"); // fără puncte: primul din listă
    expect(answeredCount({ cutie: "nu-exista", pauza: "fug" })).toBe(1);
  });

  it("procentele însumează aproximativ 100", () => {
    const r = scoreQuiz({ cutie: "desfac", pauza: "desenez", superputere: "zbor", rucsac: "carte" });
    const sum = Object.values(r.percents).reduce((a, b) => a + b, 0);
    expect(sum).toBeGreaterThanOrEqual(99);
    expect(sum).toBeLessThanOrEqual(101);
  });

  it("funcționează și cu un chestionar personalizat", () => {
    const custom: QuizQuestion[] = [
      { id: "q", question: "?", answers: [{ id: "a", text: "a", points: { povestitor: 3, artist: 1 } }] },
    ];
    expect(scoreQuiz({ q: "a" }, custom).winner.id).toBe("povestitor");
  });

  it("fiecare întrebare are răspunsuri cu id-uri unice", () => {
    for (const q of QUIZ) expect(new Set(q.answers.map((a) => a.id)).size).toBe(q.answers.length);
  });
});
