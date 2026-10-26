import type { Metadata } from "next";
import Link from "next/link";
import { MapScroll, Telescope } from "@/components/illustrations/Motifs";
import { Explorer } from "@/components/illustrations/Characters";
import { ClockIcon, MailIcon, PencilIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Telefon, e-mail și program pentru ${BUSINESS_NAME}.`,
};

export default function ContactPage() {
  const mailSubject = encodeURIComponent(`Întrebare pentru ${BUSINESS_NAME}`);
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Hai să vorbim"
        intro="Cel mai repede ne găsești la telefon. Pentru întrebări mai lungi, scrie-ne pe e-mail: răspundem în cel mult o zi lucrătoare."
        character="ruxi"
      />
      <section className="section contact" aria-label="Date de contact">
        <div className="wrap contact__grid">
          <div className="contact__cards">
            <a className="contact-card" href={`tel:${site.phoneHref}`}>
              <span className="contact-card__icon">
                <PhoneIcon />
              </span>
              <span>
                <span className="contact-card__label">Telefon</span>
                <span className="contact-card__value">{site.phone}</span>
              </span>
            </a>
            <a className="contact-card" href={`mailto:${site.email}?subject=${mailSubject}`}>
              <span className="contact-card__icon">
                <MailIcon />
              </span>
              <span>
                <span className="contact-card__label">E-mail</span>
                <span className="contact-card__value">{site.email}</span>
              </span>
            </a>
            <div className="contact-card">
              <span className="contact-card__icon">
                <PinIcon />
              </span>
              <span>
                <span className="contact-card__label">Zona</span>
                <span className="contact-card__value">{site.area}</span>
                <span className="facts__sub">{site.addressNote}</span>
              </span>
            </div>
            <div className="card">
              <h2 className="h3 icon-title">
                <ClockIcon /> Program
              </h2>
              <table className="hours">
                <caption className="visually-hidden">Programul Clubului</caption>
                <tbody>
                  {site.hours.map((h) => (
                    <tr key={h.days}>
                      <th scope="row">{h.days}</th>
                      <td>
                        <strong>{h.hours}</strong>
                        {h.note ? <span className="facts__sub"> {h.note}</span> : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Link href="/inscriere/" className="btn btn--primary">
              <PencilIcon /> Trimite o cerere de înscriere
            </Link>
          </div>

          <figure className="contact__map">
            <div className="contact__map-art" aria-hidden="true">
              <MapScroll className="contact__scroll" />
              <Explorer className="contact__kid bounce" />
              <Telescope className="contact__telescope float" />
            </div>
            <figcaption>
              Harta exactă ți-o dăm la telefon: preferăm să ne cunoaștem înainte de prima vizită, ca să știm cine vine
              la copii.
            </figcaption>
          </figure>
        </div>
      </section>
    </>
  );
}
