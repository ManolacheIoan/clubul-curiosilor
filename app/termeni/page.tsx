import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_NAME, site } from "@/config/site";
import { MAX_FAMILY_DISCOUNT } from "@/data/prices";

export const metadata: Metadata = {
  title: "Termeni și condiții",
  description: `Regulile de înscriere, plată, absențe și retragere la ${BUSINESS_NAME}, pe înțelesul tuturor.`,
};

export default function TermsPage() {
  const { legal } = site;
  return (
    <>
      <PageHero
        eyebrow="Termeni și condiții"
        title="Regulile Clubului, pe scurt și pe înțeles"
        intro="Text-cadru pentru înscrieri, plăți, absențe și retragere. Înainte de folosirea reală, trebuie verificat și adaptat de un jurist."
      />
      <div className="wrap">
        <article className="prose privacy">
          <p className="note">Ultima actualizare: noiembrie 2026. Document generic, în curs de revizuire.</p>

          <h2>1. Cine suntem</h2>
          <p>
            Site-ul și serviciile descrise aici aparțin firmei <strong>{legal.company}</strong>, CUI {legal.cui}, nr.
            Registrul Comerțului {legal.regCom} („Clubul”, „noi”). Ne găsești la {site.phone} și la {site.email}.
          </p>

          <h2>2. Cum se face înscrierea</h2>
          <ul>
            <li>
              Formularul de pe site este o <strong>cerere</strong>, nu o înscriere definitivă. Te sunăm în cel mult{" "}
              {site.replyWithin} ca să confirmăm locul.
            </li>
            <li>
              Înscrierea devine definitivă după semnarea contractului cu părintele sau tutorele legal și după plata primei
              luni (sau a taberei).
            </li>
            <li>Prima întâlnire la orice curs sau atelier este gratuită. Nu percepem taxă de înscriere sau garanție.</li>
            <li>
              Locurile se ocupă în ordinea confirmărilor. Dacă o grupă e completă, îți propunem altă grupă sau te trecem pe
              lista de așteptare.
            </li>
          </ul>

          <h2>3. Prețuri și plată</h2>
          <ul>
            <li>
              Prețurile actuale sunt pe pagina <Link href="/preturi/">Prețuri</Link> și includ TVA, acolo unde se aplică.
            </li>
            <li>Programele și cursurile se plătesc lunar, până pe data de 5, prin transfer bancar sau card la recepție.</li>
            <li>Taberele se plătesc integral la confirmarea locului.</li>
            <li>Reducerile se cumulează până la cel mult {MAX_FAMILY_DISCOUNT}% din totalul lunar al unei familii.</li>
            <li>
              Dacă schimbăm prețurile, te anunțăm cu cel puțin 30 de zile înainte. Noul preț se aplică doar din luna
              următoare anunțului.
            </li>
          </ul>

          <h2>4. Absențe și recuperări</h2>
          <ul>
            <li>
              Zilele lipsă din cauza bolii, anunțate până la ora 9:00, se recuperează în aceeași lună la cursuri și ateliere.
            </li>
            <li>La after-school, zilele lipsă nu se scad din abonamentul lunar, dar prânzul comandat se anulează.</li>
            <li>
              Dacă noi anulăm o întâlnire (de exemplu, din cauza bolii educatorului), o recuperăm sau o scădem din plata
              lunii următoare.
            </li>
          </ul>

          <h2>5. Renunțarea la un program</h2>
          <ul>
            <li>
              Poți renunța oricând la un program lunar, cu un mesaj trimis cu cel puțin 15 zile înainte de luna următoare.
              Luna în curs nu se rambursează.
            </li>
            <li>
              Dacă ai încheiat contractul la distanță (fără să vii la sediu), ai dreptul legal să te retragi în 14 zile, fără
              să dai un motiv. Dacă ai cerut să începem mai devreme, plătești doar zilele deja folosite.
            </li>
          </ul>

          <h2>6. Anularea unei tabere</h2>
          <ul>
            <li>
              Cu <strong>mai mult de 14 zile</strong> înainte de începere: primești toți banii înapoi.
            </li>
            <li>
              Între <strong>14 și 7 zile</strong> înainte: primești jumătate din sumă sau muți gratuit înscrierea pe altă
              perioadă cu locuri libere.
            </li>
            <li>
              Cu <strong>mai puțin de 7 zile</strong> înainte: poți muta înscrierea pe altă perioadă, dacă sunt locuri;
              altfel, suma nu se mai rambursează.
            </li>
            <li>Dacă copilul se îmbolnăvește (cu adeverință medicală), zilele pierdute devin credit pentru altă tabără.</li>
            <li>Dacă noi anulăm o tabără, primești toți banii înapoi, în cel mult 14 zile.</li>
          </ul>

          <h2>7. Sănătate, siguranță și preluare</h2>
          <ul>
            <li>
              Te rugăm să ne spui la înscriere despre alergii, intoleranțe sau alte nevoi de sănătate și să ne anunți dacă
              se schimbă ceva.
            </li>
            <li>Un copil cu febră sau boală contagioasă rămâne acasă până la vindecare, pentru binele tuturor.</li>
            <li>
              Copilul pleacă doar cu persoanele de pe lista de preluare. Toată procedura e pe pagina{" "}
              <Link href="/siguranta/">Siguranță și părinți</Link>.
            </li>
            <li>
              După ora de închidere, te sunăm. Întârzierile repetate de peste 15 minute se pot taxa, după cum scrie în
              contract.
            </li>
          </ul>

          <h2>8. Reguli de comportament</h2>
          <p>
            La Club ne purtăm frumos unii cu alții: copii, părinți și educatori. Dacă un copil pune în mod repetat în pericol
            siguranța celorlalți, discutăm întâi cu părinții și căutăm împreună o soluție. Doar în ultimă instanță putem
            suspenda participarea, cu restituirea sumei pentru zilele rămase.
          </p>

          <h2>9. Fotografii și date personale</h2>
          <p>
            Cum folosim datele și fotografiile scrie în <Link href="/confidentialitate/">Politica de confidențialitate</Link>
            . Pe scurt: nu publicăm imagini cu copiii fără acordul tău scris, separat.
          </p>

          <h2>10. Reclamații</h2>
          <p>
            Dacă ceva nu a mers bine, scrie-ne la {site.email}. Îți răspundem în cel mult 15 zile lucrătoare. Dacă nu
            ajungem la o înțelegere, te poți adresa{" "}
            <a href={legal.anpcUrl} rel="noopener">
              Autorității Naționale pentru Protecția Consumatorilor (ANPC)
            </a>{" "}
            sau poți folosi{" "}
            <a href={legal.anpcSalUrl} rel="noopener">
              soluționarea alternativă a litigiilor (SAL)
            </a>
            . Rămâne și dreptul de a te adresa instanței.
          </p>

          <h2>11. Modificări</h2>
          <p>
            Când schimbăm acești termeni, actualizăm data de mai sus și îi anunțăm pe părinții înscriși. Pentru copiii deja
            înscriși, contează și contractul semnat.
          </p>
        </article>
      </div>
    </>
  );
}
