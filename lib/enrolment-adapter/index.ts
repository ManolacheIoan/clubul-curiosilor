import { site } from "@/config/site";
import type { EnrolmentPayload } from "@/lib/enrolment";

/**
 * Contractul pentru trimiterea unei cereri de înscriere.
 * - "sent": cererea a ajuns la destinație (serviciul a răspuns cu succes);
 * - "not-sent": nu există unde trimite (demo) — nimic nu a plecat din browser;
 * - "error": trimiterea a eșuat; părintele primește telefonul ca alternativă.
 */
export type SubmitResult =
  | { status: "sent" }
  | { status: "not-sent" }
  | { status: "error"; message: string };

export interface EnrolmentAdapter {
  readonly mode: "demo" | "http";
  submit(payload: EnrolmentPayload): Promise<SubmitResult>;
}

/** Demo: nu trimite nimic și spune asta deschis. */
export const demoAdapter: EnrolmentAdapter = {
  mode: "demo",
  async submit() {
    return { status: "not-sent" };
  },
};

/**
 * Trimite JSON prin POST la un endpoint compatibil Formspree (sau orice serviciu
 * care acceptă JSON și răspunde 2xx). Nu folosește nicio bibliotecă externă.
 */
export function httpAdapter(endpoint: string, fetchImpl: typeof fetch = fetch): EnrolmentAdapter {
  return {
    mode: "http",
    async submit(payload) {
      try {
        const res = await fetchImpl(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ _subject: `Cerere de înscriere: ${payload.copil.nume}`, ...payload }),
        });
        if (res.ok) return { status: "sent" };
        return { status: "error", message: `Serverul a răspuns cu codul ${res.status}.` };
      } catch {
        return { status: "error", message: "Nu am putut contacta serverul. Verifică conexiunea la internet." };
      }
    },
  };
}

/** Adaptorul folosit de site: HTTP dacă NEXT_PUBLIC_ENROLMENT_ENDPOINT e setat la build, altfel demo. */
export function getEnrolmentAdapter(endpoint: string = site.enrolmentEndpoint): EnrolmentAdapter {
  return endpoint ? httpAdapter(endpoint) : demoAdapter;
}

/** Textul cererii, pentru e-mail (mailto) sau pentru citit la telefon. */
export function payloadToText(p: EnrolmentPayload): string {
  const lines = [
    `Copil: ${p.copil.nume}, ${p.copil.varsta} ani (grupa ${p.copil.grupa})`,
    `Părinte: ${p.parinte.nume}, tel. ${p.parinte.telefon}, ${p.parinte.email}`,
    `Alegere: ${p.alegere ? `${p.alegere.nume}${p.alegere.saptamana ? `, săptămâna din ${p.alegere.saptamana}` : ""}` : "-"}`,
    `Alergii / informații medicale: ${p.alergii || "niciuna declarată"}`,
    `Observații: ${p.observatii || "-"}`,
    `Persoane autorizate la preluare: ${p.preluare.length ? p.preluare.map((x) => `${x.nume} (${x.relatie}, ${x.telefon})`).join("; ") : "doar părintele"}`,
  ];
  return lines.join("\n");
}
