import Link from "next/link";
import { PencilIcon, PhoneIcon } from "@/components/icons";
import { site } from "@/config/site";

/** Bara fixă de jos, doar pe telefon (ascunsă din CSS pe ecrane mari). */
export function MobileBar() {
  return (
    <div className="mobile-bar">
      <a className="btn btn--green" href={`tel:${site.phoneHref}`}>
        <PhoneIcon /> Sună
      </a>
      <Link className="btn btn--primary" href="/inscriere/">
        <PencilIcon /> Înscrie copilul
      </Link>
    </div>
  );
}
