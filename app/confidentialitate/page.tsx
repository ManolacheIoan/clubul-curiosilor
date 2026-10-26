import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { BUSINESS_NAME, site } from "@/config/site";

export const metadata: Metadata = {
  title: "Politica de confidențialitate și cookie-uri",
  description: "Cum prelucrăm datele părinților și ale copiilor, consimțământul părintelui și folosirea cookie-urilor.",
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Confidențialitate"
        title="Politica de confidențialitate și cookie-uri"
        intro="Text-cadru, scris pe înțelesul tuturor. Înainte de folosirea reală, trebuie verificat și adaptat de un specialist în protecția datelor."
      />
      <div className="wrap">
        <article className="prose privacy">
          <p className="note">Ultima actualizare: octombrie 2026. Document generic, în curs de revizuire.</p>

          <h2>1. Cine suntem</h2>
          <p>
            {BUSINESS_NAME} („noi”) este operatorul datelor personale pe care ni le transmiți prin acest site, la telefon
            sau la sediu. Ne poți contacta la {site.email} sau la {site.phone}.
          </p>

          <h2>2. Ce date colectăm</h2>
          <ul>
            <li>
              <strong>Datele părintelui</strong>: nume, telefon, e-mail.
            </li>
            <li>
              <strong>Datele copilului</strong>: nume, vârstă, grupa, programul sau tabăra aleasă.
            </li>
            <li>
              <strong>Informații despre sănătate</strong>, doar dacă alegi să ni le dai: alergii, intoleranțe, alte
              informații de care trebuie să ținem cont ca să avem grijă de copil.
            </li>
            <li>
              <strong>Persoanele autorizate la preluare</strong>: nume, relația cu copilul, telefon.
            </li>
          </ul>

          <h2>3. Datele copiilor și acordul părintelui</h2>
          <p>
            Datele copiilor le primim <strong>numai de la părinte sau de la tutorele legal</strong>. Nu cerem date
            direct de la copii, iar chestionarul „Ce explorator ești?” de pe site nu colectează nimic: răspunsurile rămân
            în browser și dispar când închizi pagina.
          </p>
          <p>
            Prin bifarea căsuței de acord din formularul de înscriere confirmi că ești părintele sau tutorele copilului și
            că ești de acord să prelucrăm datele de mai sus pentru înscriere. Informațiile despre sănătate sunt o categorie
            specială de date: le folosim doar ca să protejăm copilul, cu acordul tău explicit, și le vede doar personalul
            care are nevoie de ele.
          </p>
          <p>Poți retrage acordul oricând, printr-un mesaj la {site.email}; retragerea nu afectează ce s-a făcut înainte.</p>

          <h2>4. De ce folosim datele</h2>
          <ul>
            <li>ca să răspundem cererii de înscriere și să te contactăm;</li>
            <li>ca să organizăm grupele și să avem grijă de copil (alergii, preluare);</li>
            <li>ca să te informăm despre activitatea copilului;</li>
            <li>ca să respectăm obligațiile legale (de exemplu, cele contabile).</li>
          </ul>
          <p>Nu folosim datele pentru publicitate și nu le vindem nimănui.</p>

          <h2>5. Fotografii</h2>
          <p>
            Fotografiile din activități le trimitem doar părinților care și-au dat acordul separat. Nu publicăm imagini cu
            copiii pe site sau pe rețele sociale fără un acord scris distinct.
          </p>

          <h2>6. Cât timp păstrăm datele</h2>
          <p>
            Cererile de înscriere care nu se finalizează se șterg după cel mult 6 luni. Datele copiilor înscriși se
            păstrează pe durata participării și apoi atât cât cer obligațiile legale.
          </p>

          <h2>7. Cui transmitem datele</h2>
          <p>
            Doar furnizorilor care ne ajută să funcționăm (de exemplu, serviciul care primește formularele de pe site sau
            furnizorul de masă, care primește doar lista alergiilor, fără alte date), pe baza unor contracte care îi obligă
            să păstreze confidențialitatea.
          </p>

          <h2>8. Drepturile tale</h2>
          <p>
            Ai dreptul să ceri accesul la date, corectarea, ștergerea sau restricționarea lor, să te opui prelucrării și să
            primești datele într-un format portabil. Ai și dreptul să depui o plângere la autoritatea națională de
            supraveghere a protecției datelor.
          </p>

          <h2>9. Cookie-uri</h2>
          <p>
            Site-ul <strong>nu folosește cookie-uri</strong> de analiză, publicitate sau rețele sociale și nu încarcă
            scripturi de la terți. Fonturile și ilustrațiile sunt găzduite pe același server. Dacă vom adăuga vreodată
            astfel de instrumente, îți vom cere acordul înainte.
          </p>

          <h2>10. Modificări</h2>
          <p>Când schimbăm această politică, actualizăm data de mai sus și, dacă e cazul, îi anunțăm pe părinții înscriși.</p>
        </article>
      </div>
    </>
  );
}
