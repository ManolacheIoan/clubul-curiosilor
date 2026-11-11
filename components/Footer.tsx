import Link from "next/link";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { BUSINESS_NAME, footerNav, site } from "@/config/site";

export function Footer() {
  return (
    <footer className="site-footer">
      <svg className="site-footer__wave" viewBox="0 0 1440 60" preserveAspectRatio="none" aria-hidden="true" focusable="false">
        <path d="M0 60V30c120-24 240-24 360 0s240 24 360 0 240-24 360 0 240 24 360 0v30Z" fill="currentColor" />
      </svg>
      <div className="wrap site-footer__grid">
        <div>
          <Logo className="logo--light" />
          <p className="site-footer__about">
            Un loc sigur în care copiii de 4–14 ani își fac temele, învață limbi străine și pleacă în misiuni de explorare.
          </p>
        </div>
        <nav aria-label="Subsol">
          <h2 className="site-footer__title">Pagini</h2>
          <ul className="site-footer__links">
            {footerNav.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="site-footer__title">Contact</h2>
          <ul className="site-footer__contact">
            <li>
              <PhoneIcon /> <a href={`tel:${site.phoneHref}`}>{site.phone}</a>
            </li>
            <li>
              <MailIcon /> <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
            <li>
              <PinIcon /> {site.area}
            </li>
          </ul>
          <dl className="site-footer__hours">
            {site.hours.map((h) => (
              <div key={h.days}>
                <dt>{h.days}</dt>
                <dd>{h.hours}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <div className="wrap site-footer__bottom">
        <p>
          © {new Date().getFullYear()} {BUSINESS_NAME}. Toate personajele și ilustrațiile sunt originale.
        </p>
        <p className="site-footer__legal">
          {site.legal.company} · CUI {site.legal.cui} · Reg. Com. {site.legal.regCom}
        </p>
        <ul className="site-footer__badges" aria-label="Protecția consumatorilor">
          <li>
            <a href={site.legal.anpcUrl} rel="noopener">
              ANPC
            </a>
          </li>
          <li>
            <a href={site.legal.anpcSalUrl} rel="noopener">
              ANPC – SAL: soluționarea alternativă a litigiilor
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
