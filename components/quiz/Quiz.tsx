"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Character, CHARACTER_NAMES } from "@/components/illustrations/Characters";
import { Compass, Star } from "@/components/illustrations/Motifs";
import { ArrowLeftIcon, ArrowRightIcon, SparkIcon } from "@/components/icons";
import { EXPLORERS, QUIZ } from "@/data/quiz";
import { programs } from "@/data/programs";
import { scoreQuiz, type QuizAnswers } from "@/lib/quiz";

const LETTERS = ["A", "B", "C", "D"];

/** Chestionarul pentru copii. Răspunsurile rămân doar în memoria paginii (nu se salvează nicăieri). */
export function Quiz() {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [done, setDone] = useState(false);
  const focusRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);

  useEffect(() => {
    if (moved.current) focusRef.current?.focus({ preventScroll: true });
  }, [started, index, done]);

  const total = QUIZ.length;
  const answered = Object.keys(answers).length;
  const progress = done ? 100 : (answered / total) * 100;

  const choose = (qid: string, aid: string) => {
    moved.current = true;
    setAnswers((a) => ({ ...a, [qid]: aid }));
    if (index + 1 < total) setIndex(index + 1);
    else setDone(true);
  };

  const restart = () => {
    moved.current = true;
    setAnswers({});
    setIndex(0);
    setDone(false);
  };

  if (!started) {
    return (
      <div className="quiz quiz--intro card">
        <div className="quiz__cast" aria-hidden="true">
          {EXPLORERS.map((e, i) => (
            <Character key={e.id} id={e.character} className={`bounce ${i % 2 ? "bounce--late" : ""}`} />
          ))}
        </div>
        <h2>Bună, micule explorator!</h2>
        <p>
          Răspunde la {total} întrebări și află ce fel de explorator ești: inventator, artist, aventurier sau povestitor.
          Nu există răspunsuri greșite!
        </p>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            moved.current = true;
            setStarted(true);
          }}
        >
          Pornește în expediție <ArrowRightIcon />
        </button>
      </div>
    );
  }

  const progressBar = (
    <div className="quiz__progress">
      <div
        className="quiz__track"
        role="progressbar"
        aria-label="Progresul chestionarului"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done ? total : answered}
        aria-valuetext={done ? "Gata!" : `${answered} din ${total} întrebări`}
      >
        <span className="quiz__fill" style={{ width: `${progress}%` }} />
        <span className="quiz__walker" style={{ left: `${progress}%` }} aria-hidden="true">
          <Compass />
        </span>
      </div>
      <Star className={`quiz__goal ${done ? "is-done" : ""}`} />
    </div>
  );

  if (done) {
    const result = scoreQuiz(answers);
    const recs = result.winner.programs.map((s) => programs.find((p) => p.slug === s)).filter(Boolean);
    return (
      <div className="quiz">
        {progressBar}
        <div className="quiz__result card" aria-live="polite">
          <div className="quiz__confetti" aria-hidden="true">
            {Array.from({ length: 14 }, (_, i) => (
              <span key={i} style={{ "--i": i } as React.CSSProperties} />
            ))}
          </div>
          <Character id={result.winner.character} className="quiz__winner bounce" title={CHARACTER_NAMES[result.winner.character]} />
          <p className="eyebrow">Rezultatul tău</p>
          <h2 ref={focusRef} tabIndex={-1}>
            Ești {result.winner.title}!
          </h2>
          <p className="quiz__desc">{result.winner.description}</p>

          <h3>Cât de mult din fiecare</h3>
          <ul className="quiz__bars">
            {EXPLORERS.map((e) => (
              <li key={e.id}>
                <span className="quiz__bar-label">{e.title}</span>
                <span className="quiz__bar" aria-hidden="true">
                  <span style={{ "--w": `${result.percents[e.id]}%` } as React.CSSProperties} data-type={e.id} />
                </span>
                <span className="quiz__bar-value">{result.percents[e.id]}%</span>
              </li>
            ))}
          </ul>

          <h3>Misiuni pe care le-ai iubi</h3>
          <ul className="quiz__recs">
            {recs.map((p) => (
              <li key={p!.slug}>
                <Link href={`/programe/${p!.slug}/`}>
                  <SparkIcon /> {p!.name}
                </Link>
              </li>
            ))}
          </ul>
          <p className="facts__sub">Arată rezultatul unui părinte: el poate vedea detaliile fiecărei activități.</p>
          <button type="button" className="btn btn--yellow" onClick={restart}>
            Încearcă din nou
          </button>
        </div>
      </div>
    );
  }

  const q = QUIZ[index];
  return (
    <div className="quiz">
      {progressBar}
      <div className="quiz__card card" key={q.id}>
        <p className="quiz__count">
          Întrebarea {index + 1} din {total}
        </p>
        <h2 ref={focusRef} tabIndex={-1} className="quiz__question" id="intrebare">
          {q.question}
        </h2>
        <ul className="quiz__answers" aria-labelledby="intrebare">
          {q.answers.map((a, i) => (
            <li key={a.id}>
              <button
                type="button"
                className="quiz__answer"
                aria-pressed={answers[q.id] === a.id}
                onClick={() => choose(q.id, a.id)}
              >
                <span className="quiz__letter" aria-hidden="true">
                  {LETTERS[i]}
                </span>
                {a.text}
              </button>
            </li>
          ))}
        </ul>
        {index > 0 ? (
          <button
            type="button"
            className="btn btn--small btn--ghost"
            onClick={() => {
              moved.current = true;
              setIndex(index - 1);
            }}
          >
            <ArrowLeftIcon /> Întrebarea anterioară
          </button>
        ) : null}
      </div>
    </div>
  );
}
