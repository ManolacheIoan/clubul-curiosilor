import Link from "next/link";
import { PencilIcon, PhoneIcon } from "@/components/icons";
import { Explorer, Owl } from "@/components/illustrations/Characters";
import { site } from "@/config/site";

/** Bandă de final de pagină: îndemn la înscriere + telefon. */
export function CtaBand({
  title = "Gata de prima misiune?",
  text = "Completează formularul de înscriere în câteva minute. Te sunăm noi să stabilim o vizită.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="cta-band" aria-labelledby="cta-titlu">
      <div className="wrap cta-band__inner">
        <Owl className="cta-band__char cta-band__char--l bounce" />
        <div className="cta-band__text">
          <h2 id="cta-titlu">{title}</h2>
          <p>{text}</p>
          <div className="btn-row btn-row--center">
            <Link href="/inscriere/" className="btn btn--primary">
              <PencilIcon /> Înscrie copilul
            </Link>
            <a href={`tel:${site.phoneHref}`} className="btn">
              <PhoneIcon /> {site.phone}
            </a>
          </div>
        </div>
        <Explorer className="cta-band__char cta-band__char--r bounce bounce--late" />
      </div>
    </section>
  );
}
