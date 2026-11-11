import Link from "next/link";
import { CampCard } from "@/components/CampCard";
import { Counter } from "@/components/Counter";
import { CtaBand } from "@/components/CtaBand";
import { EventList } from "@/components/events/EventList";
import { FollowCompass } from "@/components/home/FollowCompass";
import { Greeting } from "@/components/home/Greeting";
import { ActivityArt } from "@/components/illustrations/ActivityArt";
import { Character, Explorer, Fox, Owl, Robot } from "@/components/illustrations/Characters";
import { Blob, Cloud, Leaf, Magnifier, MapScroll, Star, Telescope } from "@/components/illustrations/Motifs";
import { ArrowRightIcon, ChatIcon, GraduationIcon, PencilIcon, ShieldIcon, UsersIcon } from "@/components/icons";
import { Reveal } from "@/components/Reveal";
import { BUSINESS_NAME } from "@/config/site";
import { camps } from "@/data/camps";
import { typicalDay } from "@/data/day";
import { AGE_GROUPS } from "@/data/groups";
import { programs } from "@/data/programs";
import { staff } from "@/data/staff";
import { todayIso } from "@/lib/dates";
import { eventItems } from "@/lib/events";
import { formatLei } from "@/lib/programs";

const offer = [
  {
    art: "after-school" as const,
    title: "After-school",
    text: "12:00 – 18:00: teme făcute cu un educator, gustare, joacă și misiunea zilei.",
    href: "/programe/after-school/",
  },
  {
    art: "engleza" as const,
    title: "Limbi străine",
    text: "Engleză, germană, franceză și spaniolă, învățate prin jocuri, cântece și povești.",
    href: "/programe/?domeniu=limbi",
  },
  {
    art: "robotica" as const,
    title: "Ateliere și cursuri",
    text: "Robotică, științe, arte, teatru, muzică, șah, sport și gătit pentru copii.",
    href: "/programe/",
  },
  {
    art: "stiinte" as const,
    title: "Tabere în vacanțe",
    text: "Vară, iarnă, Paște și vacanța intersemestrială: o temă nouă în fiecare săptămână.",
    href: "/tabere/",
  },
];

const trust = [
  {
    icon: ShieldIcon,
    title: "Siguranță, pe primul loc",
    text: "Copilul pleacă doar cu persoanele autorizate de tine. Alergiile sunt notate și urmărite. Personal instruit în prim ajutor pediatric.",
  },
  {
    icon: GraduationIcon,
    title: "Educatori calificați",
    text: "Profesori, educatori și instructori cu experiență în lucrul cu copiii, cu pregătire în domeniul pe care îl predau.",
  },
  {
    icon: UsersIcon,
    title: "Grupe mici",
    text: "Cel mult 8 copii la limbi și robotică, cel mult 12 la after-school. Fiecare copil e văzut și ascultat.",
  },
  {
    icon: ChatIcon,
    title: "Comunicare zilnică",
    text: "Un mesaj scurt în fiecare zi, o discuție lunară despre progres și un om pe care îl poți suna oricând.",
  },
];

export default function Home() {
  const summerCamps = camps.filter((c) => c.season === "vara").slice(0, 3);
  const minCamp = Math.min(...camps.map((c) => c.pricePerWeek));
  const dayPreview = [typicalDay[0], typicalDay[3], typicalDay[5], typicalDay[7]];

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero">
        <Blob className="hero__blob hero__blob--a" color="#E6F0EA" />
        <Blob className="hero__blob hero__blob--b" color="#FFF4D1" />
        <div className="wrap hero__inner">
          <div className="hero__text">
            <p className="hero__hello">
              <Greeting /> <span>Bine ai venit în {BUSINESS_NAME}</span>
            </p>
            <h1>
              Aici, fiecare zi e o <span className="highlight">misiune</span> de explorare
            </h1>
            <p className="lead">
              Centru educațional pentru copii de 4–14 ani: after-school cu ajutor la teme, limbi străine, ateliere de
              știință, artă și robotică, plus tabere în fiecare vacanță.
            </p>
            <div className="btn-row">
              <Link href="/inscriere/" className="btn btn--primary">
                <PencilIcon /> Înscrie copilul
              </Link>
              <Link href="/programe/" className="btn">
                Vezi programele <ArrowRightIcon />
              </Link>
            </div>
          </div>

          <div className="hero__art" aria-hidden="true">
            <Cloud className="hero__cloud float float--c" />
            <Star className="hero__star hero__star--a float" />
            <Star className="hero__star hero__star--b float float--b" />
            <Leaf className="hero__leaf float float--b" />
            <MapScroll className="hero__map" />
            <FollowCompass className="hero__compass" />
            <Owl className="hero__char hero__char--owl bounce" />
            <Fox className="hero__char hero__char--fox bounce bounce--late" />
            <Robot className="hero__char hero__char--robot bounce bounce--mid" />
            <Explorer className="hero__char hero__char--kid bounce" />
          </div>
        </div>
      </section>

      {/* ---------- ce oferim ---------- */}
      <section className="section" aria-labelledby="oferim">
        <div className="wrap">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">Ce oferim</span>
            <h2 id="oferim">Patru drumuri, o singură hartă</h2>
            <p className="lead">Alege ce i se potrivește copilului tău sau combină-le: reducerile se aplică automat.</p>
          </Reveal>
          <ul className="offer grid grid--4">
            {offer.map((o, i) => (
              <Reveal as="li" key={o.title} delay={i * 80} className="offer__item">
                <ActivityArt art={o.art} className="offer__art wiggle-target" />
                <h3>
                  <Link href={o.href} className="card-link">
                    {o.title}
                  </Link>
                </h3>
                <p>{o.text}</p>
                <span className="link-arrow" aria-hidden="true">
                  Descoperă <ArrowRightIcon />
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- cluburile ---------- */}
      <section className="section section--tint" aria-labelledby="cluburi">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Cluburile de exploratori</span>
            <h2 id="cluburi">Fiecare vârstă are clubul ei</h2>
            <p className="lead">Copiii lucrează alături de colegi de aceeași vârstă, cu activități gândite pentru ce pot și ce îi interesează acum.</p>
          </Reveal>
          <ul className="clubs grid grid--3">
            {AGE_GROUPS.map((g, i) => (
              <Reveal as="li" key={g.id} delay={i * 100} className="club">
                <Character id={(["ruxi", "tudor", "bip"] as const)[i]} className="club__char" />
                <div>
                  <span className="tag tag--yellow">{g.label}</span>
                  <h3>{g.club}</h3>
                  <p>{g.description}</p>
                  <Link href={`/programe/?varsta=${g.id}`} className="link-arrow">
                    Programe pentru {g.label} <ArrowRightIcon />
                  </Link>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- încredere ---------- */}
      <section className="section" aria-labelledby="incredere">
        <div className="wrap trust">
          <Reveal className="section-head">
            <span className="eyebrow">Pentru părinți</span>
            <h2 id="incredere">De ce ne încredințează părinții copiii</h2>
            <p className="lead">Știm că ne lași ce ai mai de preț. De aceea regulile de siguranță sunt clare, scrise și respectate în fiecare zi.</p>
          </Reveal>
          <ul className="trust__list grid grid--2">
            {trust.map((t, i) => (
              <Reveal as="li" key={t.title} delay={i * 80} className="trust__item">
                <span className="trust__icon">
                  <t.icon />
                </span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </ul>
          <Reveal className="stats">
            <dl>
              <div>
                <dt>educatori în echipă</dt>
                <dd>
                  <Counter value={staff.length} />
                </dd>
              </div>
              <div>
                <dt>programe și cursuri</dt>
                <dd>
                  <Counter value={programs.length} />
                </dd>
              </div>
              <div>
                <dt>copii, maximum, la limbi și robotică</dt>
                <dd>
                  <Counter value={8} />
                </dd>
              </div>
              <div>
                <dt>ore de after-school pe zi</dt>
                <dd>
                  <Counter value={6} />
                </dd>
              </div>
            </dl>
          </Reveal>
          <p className="trust__more">
            <Link href="/siguranta/" className="link-arrow">
              Citește regulile de siguranță <ArrowRightIcon />
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- o zi ---------- */}
      <section className="section section--cream" aria-labelledby="zi">
        <div className="wrap">
          <Reveal className="section-head section-head--center">
            <span className="eyebrow">O zi la Club</span>
            <h2 id="zi">De la clopoțel la „pa, pe mâine!”</h2>
          </Reveal>
          <ol className="day-preview">
            {dayPreview.map((s, i) => (
              <Reveal as="li" key={s.time + s.title} delay={i * 120} className="day-preview__stop">
                <span className="day-preview__time">{s.time}</span>
                <Character id={s.character} className="day-preview__char" />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <div className="btn-row btn-row--center">
            <Link href="/o-zi-la-club/" className="btn btn--green">
              Vezi harta întregii zile <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- chestionar pentru copii ---------- */}
      <section className="section" aria-labelledby="quiz-teaser">
        <div className="wrap">
          <Reveal className="quiz-teaser">
            <div className="quiz-teaser__art" aria-hidden="true">
              <Magnifier className="quiz-teaser__magnifier float" />
              <Telescope className="quiz-teaser__telescope float float--b" />
            </div>
            <div>
              <span className="eyebrow">Pentru copii</span>
              <h2 id="quiz-teaser">Ce fel de explorator ești?</h2>
              <p>Șase întrebări, patru tipuri de exploratori și un personaj care ți se potrivește. Durează un minut!</p>
              <Link href="/ce-explorator-esti/" className="btn btn--yellow">
                Începe chestionarul <ArrowRightIcon />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- tabere ---------- */}
      <section className="section section--tint" aria-labelledby="tabere">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Tabere de vacanță</span>
            <h2 id="tabere">Vara asta: junglă, inventatori și călătorii în spațiu</h2>
            <p className="lead">
              Tabere de zi, de luni până vineri, de la {formatLei(minCamp)} pe săptămână, cu prânz și gustări incluse.
            </p>
          </Reveal>
          <div className="grid grid--3">
            {summerCamps.map((c, i) => (
              <Reveal key={c.slug} delay={i * 100}>
                <CampCard camp={c} />
              </Reveal>
            ))}
          </div>
          <div className="btn-row">
            <Link href="/tabere/" className="btn btn--green">
              Toate taberele și perioadele <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- calendar ---------- */}
      <section className="section" aria-labelledby="calendar">
        <div className="wrap">
          <Reveal className="section-head">
            <span className="eyebrow">Calendar</span>
            <h2 id="calendar">Ce urmează la Club</h2>
            <p className="lead">Porți deschise, spectacole și ateliere la care sunt invitați și părinții.</p>
          </Reveal>
          <EventList items={eventItems()} buildDay={todayIso()} limit={3} />
          <div className="btn-row">
            <Link href="/calendar/" className="btn">
              Tot calendarul <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
