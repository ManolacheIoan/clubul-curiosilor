"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { Explorer } from "@/components/illustrations/Characters";
import { Magnifier } from "@/components/illustrations/Motifs";
import { CloseIcon, SearchIcon } from "@/components/icons";
import { ProgramCard } from "@/components/ProgramCard";
import { AGE_GROUPS, DOMAINS } from "@/data/groups";
import { KIND_LABELS, programs, type ProgramKind } from "@/data/programs";
import {
  EMPTY_FILTERS,
  countByDomain,
  filterPrograms,
  parseFilters,
  serializeFilters,
  type ProgramFilters,
} from "@/lib/programs";

const KINDS: ProgramKind[] = ["after-school", "limba", "atelier"];

function View({ filters, onChange }: { filters: ProgramFilters; onChange: (f: ProgramFilters) => void }) {
  const results = filterPrograms(programs, filters);
  const counts = countByDomain(programs, filters);
  const active = filters.age || filters.domain || filters.query.trim();
  const set = (patch: Partial<ProgramFilters>) => onChange({ ...filters, ...patch });

  return (
    <div className="explorer">
      <form className="filters" role="search" aria-label="Caută și filtrează programele" onSubmit={(e) => e.preventDefault()}>
        <div className="filters__search">
          <label htmlFor="cauta">Caută o activitate</label>
          <div className="search-field">
            <SearchIcon />
            <input
              id="cauta"
              type="search"
              placeholder="de exemplu: engleză, roboți, desen"
              value={filters.query}
              onChange={(e) => set({ query: e.target.value })}
              autoComplete="off"
              maxLength={80}
            />
          </div>
        </div>

        <fieldset className="chips">
          <legend>Vârsta copilului</legend>
          {[{ id: null, label: "Toate vârstele" }, ...AGE_GROUPS.map((g) => ({ id: g.id, label: g.label }))].map((o) => (
            <label key={o.label} className="chip">
              <input type="radio" name="varsta" checked={filters.age === o.id} onChange={() => set({ age: o.id })} />
              <span>{o.label}</span>
            </label>
          ))}
        </fieldset>

        <fieldset className="chips">
          <legend>Domeniu</legend>
          <label className="chip">
            <input type="radio" name="domeniu" checked={filters.domain === null} onChange={() => set({ domain: null })} />
            <span>Toate</span>
          </label>
          {DOMAINS.map((d) => (
            <label key={d.id} className="chip" data-empty={counts[d.id] === 0 || undefined}>
              <input type="radio" name="domeniu" checked={filters.domain === d.id} onChange={() => set({ domain: d.id })} />
              <span>
                {d.label} <span className="chip__count">{counts[d.id]}</span>
              </span>
            </label>
          ))}
        </fieldset>
      </form>

      <div className="explorer__status">
        <p aria-live="polite" role="status">
          {results.length === 0
            ? "Nicio activitate găsită"
            : results.length === 1
              ? "1 activitate găsită"
              : `${results.length} activități găsite`}
        </p>
        {active ? (
          <button type="button" className="btn btn--small btn--ghost" onClick={() => onChange(EMPTY_FILTERS)}>
            <CloseIcon /> Șterge filtrele
          </button>
        ) : null}
      </div>

      {results.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state__art" aria-hidden="true">
            <Explorer className="empty-state__char" />
            <Magnifier className="empty-state__lens float" />
          </div>
          <h2>Nicio misiune pe harta asta… încă</h2>
          <p>Încearcă altă vârstă, alt domeniu sau un cuvânt mai scurt. Sau sună-ne: poate pregătim chiar ce cauți.</p>
          <button type="button" className="btn btn--green" onClick={() => onChange(EMPTY_FILTERS)}>
            Vezi toate activitățile
          </button>
        </div>
      ) : (
        KINDS.map((kind) => {
          const list = results.filter((p) => p.kind === kind);
          if (!list.length) return null;
          return (
            <section key={kind} className="explorer__group" aria-labelledby={`grup-${kind}`}>
              <h2 id={`grup-${kind}`}>{KIND_LABELS[kind]}</h2>
              <ul className="grid grid--3 program-list">
                {list.map((p) => (
                  <li key={p.slug}>
                    <ProgramCard program={p} />
                  </li>
                ))}
              </ul>
            </section>
          );
        })
      )}
    </div>
  );
}

function Synced() {
  const params = useSearchParams();
  // Starea locală pornește din adresă; la fiecare schimbare actualizăm adresa (fără intrare nouă în istoric).
  const [filters, setFilters] = useState<ProgramFilters>(() => parseFilters(params.toString()));
  const onChange = (f: ProgramFilters) => {
    setFilters(f);
    window.history.replaceState(null, "", `${window.location.pathname}${serializeFilters(f)}`);
  };
  return <View filters={filters} onChange={onChange} />;
}

/** Lista de programe cu filtre. Până se citește adresa, se afișează toată lista (identică vizual). */
export function ProgramExplorer() {
  return (
    <Suspense fallback={<View filters={EMPTY_FILTERS} onChange={() => {}} />}>
      <Synced />
    </Suspense>
  );
}
