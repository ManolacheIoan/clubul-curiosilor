import type { Metadata } from "next";
import { EnrolmentForm } from "@/components/enrolment/EnrolmentForm";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Înscriere",
  description: "Formular de înscriere în cinci pași: copilul, părintele, programul sau tabăra, sănătate și persoane autorizate, confirmare.",
};

export default function EnrolPage() {
  return (
    <>
      <PageHero
        eyebrow="Înscriere"
        title="Înscrie copilul în Club"
        intro="Cinci pași scurți, cam trei minute. După ce primim cererea, te sunăm să confirmăm locul și să stabilim o vizită. Înscrierea devine definitivă după discuția cu noi."
        character="bip"
      />
      <section className="section enrol-section" aria-label="Formular de înscriere">
        <div className="wrap">
          <EnrolmentForm />
        </div>
      </section>
    </>
  );
}
