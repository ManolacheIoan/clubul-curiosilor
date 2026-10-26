import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Quiz } from "@/components/quiz/Quiz";

export const metadata: Metadata = {
  title: "Ce explorator ești?",
  description: "Un chestionar pentru copii: șase întrebări și patru tipuri de exploratori.",
};

export default function QuizPage() {
  return (
    <>
      <PageHero
        eyebrow="Pentru copii"
        title="Ce explorator ești?"
        intro="Un joc scurt pentru copii (părinții pot citi cu voce tare). Răspunsurile nu se salvează nicăieri."
      />
      <section className="section quiz-section" aria-label="Chestionar">
        <div className="wrap">
          <Quiz />
        </div>
      </section>
    </>
  );
}
