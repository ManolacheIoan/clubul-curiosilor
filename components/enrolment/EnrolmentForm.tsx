"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef, useState } from "react";
import { Explorer, Owl } from "@/components/illustrations/Characters";
import { AlertIcon, ArrowLeftIcon, ArrowRightIcon, CheckIcon, MailIcon, PhoneIcon, PlusIcon, TrashIcon } from "@/components/icons";
import { site } from "@/config/site";
import { camps } from "@/data/camps";
import { AGE_GROUPS, MAX_AGE, MIN_AGE, groupForAge } from "@/data/groups";
import { programs } from "@/data/programs";
import { formatPeriod } from "@/lib/dates";
import {
  EMPTY_ENROLMENT,
  STEPS,
  parseChoice,
  toPayload,
  validateAll,
  validateStep,
  type EnrolmentData,
  type FieldErrors,
  type StepId,
} from "@/lib/enrolment";
import { getEnrolmentAdapter, payloadToText, type SubmitResult } from "@/lib/enrolment-adapter";

const MAX_PICKUP = 4;

/** Ordinea câmpurilor, ca rezumatul erorilor să le listeze la fel ca în formular. */
const FIELD_LABELS: Record<string, string> = {
  childName: "Numele copilului",
  childAge: "Vârsta",
  group: "Grupa",
  parentName: "Numele tău",
  phone: "Telefon",
  email: "E-mail",
  choice: "Programul sau tabăra",
  period: "Săptămâna de tabără",
  allergies: "Alergii",
  notes: "Observații",
  consent: "Acordul",
};

const labelFor = (key: string) => {
  const m = key.match(/^pickup\.(\d+)\.(\w+)$/);
  if (!m) return FIELD_LABELS[key] ?? key;
  const what = { name: "numele", relation: "relația", phone: "telefonul" }[m[2]] ?? m[2];
  return `Persoana ${Number(m[1]) + 1}: ${what}`;
};

/** Copie a erorilor fără cheile date. */
const without = (e: FieldErrors, ...keys: string[]) => {
  const out = { ...e };
  for (const k of keys) delete out[k];
  return out;
};

const fieldId = (key: string) => `f-${key.replace(/\./g, "-")}`;

function Field({
  name,
  label,
  hint,
  errors,
  children,
}: {
  name: string;
  label: string;
  hint?: string;
  errors: FieldErrors;
  children: (props: { id: string; "aria-invalid"?: true; "aria-describedby"?: string }) => React.ReactNode;
}) {
  const id = fieldId(name);
  const err = errors[name];
  const describedBy = [hint ? `${id}-hint` : "", err ? `${id}-err` : ""].filter(Boolean).join(" ") || undefined;
  return (
    <div className={`field ${err ? "field--error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      {hint ? (
        <p id={`${id}-hint`} className="field__hint">
          {hint}
        </p>
      ) : null}
      {children({ id, "aria-invalid": err ? true : undefined, "aria-describedby": describedBy })}
      {err ? (
        <p id={`${id}-err`} className="field__error">
          <AlertIcon /> {err}
        </p>
      ) : null}
    </div>
  );
}

function ErrorSummary({ errors, refEl }: { errors: FieldErrors; refEl: React.RefObject<HTMLDivElement | null> }) {
  const keys = Object.keys(errors);
  if (!keys.length) return null;
  return (
    <div ref={refEl} className="error-summary" role="alert" tabIndex={-1}>
      <p className="error-summary__title">
        <AlertIcon /> {keys.length === 1 ? "Mai e un lucru de completat:" : `Mai sunt ${keys.length} lucruri de completat:`}
      </p>
      <ul>
        {keys.map((k) => (
          <li key={k}>
            <a
              href={`#${fieldId(k)}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(fieldId(k))?.focus();
              }}
            >
              {labelFor(k)}: {errors[k]}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

type Status = { kind: "editing" } | { kind: "sending" } | { kind: "done"; result: SubmitResult };

function Form({ initialChoice }: { initialChoice: string }) {
  const [data, setData] = useState<EnrolmentData>(() => ({
    ...EMPTY_ENROLMENT,
    choice: parseChoice(initialChoice) ? initialChoice : "",
  }));
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<Status>({ kind: "editing" });
  const heading = useRef<HTMLHeadingElement>(null);
  const summary = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
  const moved = useRef(false);

  const step = STEPS[stepIndex];
  const choice = parseChoice(data.choice);

  // După schimbarea pasului, mutăm focusul pe titlul lui (nu și la prima afișare).
  useEffect(() => {
    if (!moved.current) return;
    heading.current?.focus();
  }, [stepIndex]);

  useEffect(() => {
    if (Object.keys(errors).length) summary.current?.focus();
  }, [errors]);

  useEffect(() => {
    if (status.kind === "done") resultRef.current?.focus();
  }, [status]);

  const set = <K extends keyof EnrolmentData>(key: K, value: EnrolmentData[K]) => {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key as string]) setErrors((e) => without(e, key as string));
  };

  const setAge = (value: string) => {
    const g = groupForAge(Number(value));
    setData((d) => ({ ...d, childAge: value, group: g ? g.id : d.group }));
    setErrors((e) => without(e, "childAge", "group"));
  };

  const setPickup = (i: number, key: "name" | "relation" | "phone", value: string) => {
    setData((d) => ({ ...d, pickup: d.pickup.map((p, j) => (j === i ? { ...p, [key]: value } : p)) }));
    const k = `pickup.${i}.${key}`;
    if (errors[k]) setErrors((e) => without(e, k));
  };

  const goTo = (i: number) => {
    moved.current = true;
    setErrors({});
    setStepIndex(i);
  };

  const next = () => {
    const e = validateStep(step.id, data);
    if (Object.keys(e).length) {
      setErrors(e);
      return;
    }
    goTo(stepIndex + 1);
  };

  const submit = async () => {
    const all = validateAll(data);
    if (all) {
      moved.current = true;
      setStepIndex(STEPS.findIndex((s) => s.id === all.step));
      setErrors(all.errors);
      return;
    }
    setStatus({ kind: "sending" });
    const result = await getEnrolmentAdapter().submit(toPayload(data));
    setStatus({ kind: "done", result });
  };

  if (status.kind === "done" && status.result.status !== "error") {
    const payload = toPayload(data);
    const mailto = `mailto:${site.email}?subject=${encodeURIComponent(`Cerere de înscriere: ${payload.copil.nume}`)}&body=${encodeURIComponent(payloadToText(payload))}`;
    const sent = status.result.status === "sent";
    return (
      <div ref={resultRef} className="result card" tabIndex={-1} aria-labelledby="rezultat-titlu">
        <Explorer className="result__char bounce" />
        {sent ? (
          <>
            <h2 id="rezultat-titlu">Cererea a ajuns la noi!</h2>
            <p>
              Mulțumim, {payload.parinte.nume.split(" ")[0]}! Te sunăm în cel mult {site.replyWithin} la{" "}
              <strong>{payload.parinte.telefon}</strong> ca să confirmăm locul pentru {payload.copil.nume} și să stabilim o
              vizită.
            </p>
          </>
        ) : (
          <>
            <h2 id="rezultat-titlu">Cererea e pregătită, mai e un pas</h2>
            <p>
              Înscrierile online nu sunt încă active, așa că <strong>cererea nu a fost trimisă nicăieri</strong> și nu am
              păstrat datele tale. Ca să o finalizezi, sună-ne sau trimite-ne cererea pe e-mail: textul e deja scris.
            </p>
            <div className="btn-row">
              <a href={`tel:${site.phoneHref}`} className="btn btn--primary">
                <PhoneIcon /> Sună la {site.phone}
              </a>
              <a href={mailto} className="btn">
                <MailIcon /> Trimite pe e-mail
              </a>
            </div>
          </>
        )}
        <h3 className="result__sub">Ce ne-ai spus</h3>
        <pre className="result__text">{payloadToText(payload)}</pre>
        <p>
          <Link href="/" className="link-arrow">
            <ArrowLeftIcon /> Înapoi la pagina principală
          </Link>
        </p>
      </div>
    );
  }

  const progress = ((stepIndex + 1) / STEPS.length) * 100;

  return (
    <div className="enrol">
      <div className="enrol__progress">
        <p className="enrol__count">
          Pasul {stepIndex + 1} din {STEPS.length}
        </p>
        <div className="enrol__bar" aria-hidden="true">
          <span style={{ width: `${progress}%` }} />
        </div>
        <ol className="enrol__steps">
          {STEPS.map((s, i) => (
            <li key={s.id} aria-current={i === stepIndex ? "step" : undefined} data-done={i < stepIndex || undefined}>
              <span className="enrol__dot" aria-hidden="true">
                {i < stepIndex ? <CheckIcon /> : i + 1}
              </span>
              <span className="enrol__label">
                {s.title}
                {i < stepIndex ? <span className="visually-hidden"> (completat)</span> : null}
              </span>
            </li>
          ))}
        </ol>
      </div>

      <form
        className="enrol__form card"
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          if (step.id === "confirmare") void submit();
          else next();
        }}
      >
        <h2 ref={heading} tabIndex={-1} className="enrol__title">
          {step.title}
        </h2>

        {status.kind === "done" && status.result.status === "error" ? (
          <div className="note note--warn" role="alert">
            <AlertIcon />
            <p>
              Nu am putut trimite cererea. {status.result.message} Datele tale sunt încă aici: încearcă din nou sau sună-ne
              la <a href={`tel:${site.phoneHref}`}>{site.phone}</a>.
            </p>
          </div>
        ) : null}

        <ErrorSummary errors={errors} refEl={summary} />

        {step.id === "copil" && (
          <div className="enrol__fields">
            <Field name="childName" label="Numele și prenumele copilului" errors={errors}>
              {(p) => (
                <input {...p} type="text" autoComplete="off" value={data.childName} onChange={(e) => set("childName", e.target.value)} />
              )}
            </Field>
            <Field name="childAge" label="Vârsta" errors={errors}>
              {(p) => (
                <select {...p} value={data.childAge} onChange={(e) => setAge(e.target.value)}>
                  <option value="">Alege vârsta</option>
                  {Array.from({ length: MAX_AGE - MIN_AGE + 1 }, (_, i) => MIN_AGE + i).map((a) => (
                    <option key={a} value={a}>
                      {a} ani
                    </option>
                  ))}
                </select>
              )}
            </Field>
            <fieldset
              className={`field choice-cards ${errors.group ? "field--error" : ""}`}
              aria-describedby={errors.group ? "f-group-err" : "f-group-hint"}
            >
              <legend>Grupa (clubul)</legend>
              <p id="f-group-hint" className="field__hint">
                Se alege singură după vârstă; o poți schimba dacă vrei să discutăm altă variantă.
              </p>
              {AGE_GROUPS.map((g, i) => (
                <label key={g.id} className="choice-card">
                  <input
                    type="radio"
                    name="group"
                    id={i === 0 ? "f-group" : undefined}
                    value={g.id}
                    checked={data.group === g.id}
                    onChange={() => set("group", g.id)}
                  />
                  <span>
                    <strong>{g.club}</strong> {g.label}
                  </span>
                </label>
              ))}
              {errors.group ? (
                <p id="f-group-err" className="field__error">
                  <AlertIcon /> {errors.group}
                </p>
              ) : null}
            </fieldset>
          </div>
        )}

        {step.id === "parinte" && (
          <div className="enrol__fields">
            <Field name="parentName" label="Numele tău" errors={errors}>
              {(p) => (
                <input {...p} type="text" autoComplete="name" value={data.parentName} onChange={(e) => set("parentName", e.target.value)} />
              )}
            </Field>
            <Field name="phone" label="Telefon" hint="Te sunăm ca să confirmăm locul." errors={errors}>
              {(p) => (
                <input {...p} type="tel" inputMode="tel" autoComplete="tel" value={data.phone} onChange={(e) => set("phone", e.target.value)} />
              )}
            </Field>
            <Field name="email" label="E-mail" errors={errors}>
              {(p) => (
                <input {...p} type="email" autoComplete="email" value={data.email} onChange={(e) => set("email", e.target.value)} />
              )}
            </Field>
          </div>
        )}

        {step.id === "program" && (
          <div className="enrol__fields">
            <Field
              name="choice"
              label="Programul sau tabăra"
              hint={data.childAge ? `Potrivite pentru ${data.childAge} ani sunt marcate cu ★.` : undefined}
              errors={errors}
            >
              {(p) => (
                <select
                  {...p}
                  value={data.choice}
                  onChange={(e) => {
                    set("choice", e.target.value);
                    set("period", "");
                  }}
                >
                  <option value="">Alege</option>
                  <optgroup label="Programe, cursuri și ateliere">
                    {programs.map((x) => (
                      <option key={x.slug} value={`program:${x.slug}`}>
                        {fits(x, data.childAge) ? "★ " : ""}
                        {x.name} ({x.ageMin}–{x.ageMax} ani)
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Tabere">
                    {camps.map((x) => (
                      <option key={x.slug} value={`tabara:${x.slug}`}>
                        {fits(x, data.childAge) ? "★ " : ""}
                        {x.name} ({x.ageMin}–{x.ageMax} ani)
                      </option>
                    ))}
                  </optgroup>
                </select>
              )}
            </Field>
            {choice?.type === "tabara" ? (
              <fieldset
                className={`field choice-cards ${errors.period ? "field--error" : ""}`}
                aria-describedby={errors.period ? "f-period-err" : undefined}
              >
                <legend>Săptămâna de tabără</legend>
                {choice.periods.map((p, i) => (
                  <label key={p.start} className="choice-card" data-disabled={p.spotsLeft <= 0 || undefined}>
                    <input
                      type="radio"
                      name="period"
                      id={i === 0 ? "f-period" : undefined}
                      value={p.start}
                      checked={data.period === p.start}
                      disabled={p.spotsLeft <= 0}
                      onChange={() => set("period", p.start)}
                    />
                    <span>
                      <strong>{formatPeriod(p.start, p.end)}</strong>{" "}
                      {p.spotsLeft <= 0 ? "complet" : `${p.spotsLeft} ${p.spotsLeft === 1 ? "loc liber" : "locuri libere"}`}
                    </span>
                  </label>
                ))}
                {errors.period ? (
                  <p id="f-period-err" className="field__error">
                    <AlertIcon /> {errors.period}
                  </p>
                ) : null}
              </fieldset>
            ) : null}
          </div>
        )}

        {step.id === "sanatate" && (
          <div className="enrol__fields">
            <Field
              name="allergies"
              label="Alergii, intoleranțe sau informații medicale (opțional)"
              hint="De exemplu: alergie la arahide, astm, medicamente. Le vede doar personalul care are nevoie de ele."
              errors={errors}
            >
              {(p) => <textarea {...p} rows={3} maxLength={600} value={data.allergies} onChange={(e) => set("allergies", e.target.value)} />}
            </Field>
            <Field name="notes" label="Altceva ce ar trebui să știm (opțional)" errors={errors}>
              {(p) => <textarea {...p} rows={3} maxLength={600} value={data.notes} onChange={(e) => set("notes", e.target.value)} />}
            </Field>

            <fieldset className="pickup">
              <legend>Persoane autorizate să preia copilul</legend>
              <p className="field__hint">
                Pe lângă tine. Lasă rândul gol dacă doar tu vei lua copilul. Vezi{" "}
                <Link href="/siguranta/#preluare">procedura de preluare</Link>.
              </p>
              {data.pickup.map((p, i) => (
                <div key={i} className="pickup__row">
                  <p className="pickup__title">Persoana {i + 1}</p>
                  <Field name={`pickup.${i}.name`} label="Nume și prenume" errors={errors}>
                    {(a) => <input {...a} type="text" autoComplete="off" value={p.name} onChange={(e) => setPickup(i, "name", e.target.value)} />}
                  </Field>
                  <Field name={`pickup.${i}.relation`} label="Relația cu copilul" errors={errors}>
                    {(a) => (
                      <input
                        {...a}
                        type="text"
                        placeholder="bunică, unchi, bonă…"
                        value={p.relation}
                        onChange={(e) => setPickup(i, "relation", e.target.value)}
                      />
                    )}
                  </Field>
                  <Field name={`pickup.${i}.phone`} label="Telefon" errors={errors}>
                    {(a) => <input {...a} type="tel" inputMode="tel" value={p.phone} onChange={(e) => setPickup(i, "phone", e.target.value)} />}
                  </Field>
                  {data.pickup.length > 1 ? (
                    <button
                      type="button"
                      className="btn btn--small btn--ghost"
                      onClick={() => {
                        setData((d) => ({ ...d, pickup: d.pickup.filter((_, j) => j !== i) }));
                        setErrors({});
                      }}
                    >
                      <TrashIcon /> Șterge persoana {i + 1}
                    </button>
                  ) : null}
                </div>
              ))}
              {data.pickup.length < MAX_PICKUP ? (
                <button
                  type="button"
                  className="btn btn--small"
                  onClick={() => setData((d) => ({ ...d, pickup: [...d.pickup, { name: "", relation: "", phone: "" }] }))}
                >
                  <PlusIcon /> Adaugă o persoană
                </button>
              ) : null}
            </fieldset>
          </div>
        )}

        {step.id === "confirmare" && (
          <div className="enrol__fields">
            <Review data={data} onEdit={(id) => goTo(STEPS.findIndex((s) => s.id === id))} />
            <div className={`field consent ${errors.consent ? "field--error" : ""}`}>
              <label className="consent__label">
                <input
                  id="f-consent"
                  type="checkbox"
                  checked={data.consent}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? "f-consent-err" : undefined}
                  onChange={(e) => set("consent", e.target.checked)}
                />
                <span>
                  Sunt părintele sau tutorele legal al copilului și sunt de acord ca datele de mai sus, inclusiv informațiile
                  medicale, să fie folosite pentru înscriere, conform{" "}
                  <Link href="/confidentialitate/">Politicii de confidențialitate</Link>.
                </span>
              </label>
              {errors.consent ? (
                <p id="f-consent-err" className="field__error">
                  <AlertIcon /> {errors.consent}
                </p>
              ) : null}
            </div>
          </div>
        )}

        <div className="enrol__nav">
          {stepIndex > 0 ? (
            <button type="button" className="btn" onClick={() => goTo(stepIndex - 1)}>
              <ArrowLeftIcon /> Înapoi
            </button>
          ) : (
            <span />
          )}
          {step.id === "confirmare" ? (
            <button type="submit" className="btn btn--primary" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? "Se trimite…" : "Trimite cererea"} <CheckIcon />
            </button>
          ) : (
            <button type="submit" className="btn btn--green">
              Continuă <ArrowRightIcon />
            </button>
          )}
        </div>
      </form>

      <aside className="enrol__help" aria-label="Ajutor">
        <Owl className="enrol__owl" />
        <p>
          Preferi la telefon? Sună-ne la <a href={`tel:${site.phoneHref}`}>{site.phone}</a> și completăm împreună.
        </p>
      </aside>
    </div>
  );
}

const fits = (x: { ageMin: number; ageMax: number }, age: string) => {
  const a = Number(age);
  return age !== "" && a >= x.ageMin && a <= x.ageMax;
};

function Review({ data, onEdit }: { data: EnrolmentData; onEdit: (id: StepId) => void }) {
  const p = toPayload(data);
  const group = AGE_GROUPS.find((g) => g.id === data.group);
  const rows: { step: StepId; label: string; value: string }[] = [
    { step: "copil", label: "Copilul", value: `${p.copil.nume}, ${p.copil.varsta} ani, ${group?.club ?? ""}` },
    { step: "parinte", label: "Părintele", value: `${p.parinte.nume}, ${p.parinte.telefon}, ${p.parinte.email}` },
    {
      step: "program",
      label: "Alegerea",
      value: p.alegere
        ? `${p.alegere.nume}${p.alegere.perioada ? `, ${p.alegere.perioada}` : ""}`
        : "-",
    },
    { step: "sanatate", label: "Alergii", value: p.alergii || "niciuna declarată" },
    { step: "sanatate", label: "Observații", value: p.observatii || "-" },
    {
      step: "sanatate",
      label: "Preluare",
      value: p.preluare.length ? p.preluare.map((x) => `${x.nume} (${x.relatie})`).join(", ") : "doar părintele",
    },
  ];
  return (
    <dl className="review">
      {rows.map((r) => (
        <div key={r.label}>
          <dt>{r.label}</dt>
          <dd>{r.value}</dd>
          <dd className="review__edit">
            <button type="button" className="text-btn" onClick={() => onEdit(r.step)}>
              Modifică<span className="visually-hidden"> {r.label.toLowerCase()}</span>
            </button>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function WithParams() {
  const params = useSearchParams();
  return <Form initialChoice={params.get("alegere") ?? ""} />;
}

/** Formularul de înscriere; ?alegere=program:engleza precompletează programul. */
export function EnrolmentForm() {
  return (
    <Suspense fallback={<Form initialChoice="" />}>
      <WithParams />
    </Suspense>
  );
}
