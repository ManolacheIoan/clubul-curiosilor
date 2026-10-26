import { describe, expect, it } from "vitest";
import { EMPTY_ENROLMENT, normalizePhone, toPayload, validateAll, validateStep, type EnrolmentData } from "./enrolment";

const valid: EnrolmentData = {
  ...EMPTY_ENROLMENT,
  childName: "Maria Ionescu",
  childAge: "8",
  group: "7-10",
  parentName: "Ana Ionescu",
  phone: "0722 123 456",
  email: "ana@exemplu.ro",
  choice: "program:engleza",
  pickup: [{ name: "Ion Ionescu", relation: "bunic", phone: "+40 733 111 222" }],
  consent: true,
};

describe("normalizePhone", () => {
  it("acceptă formatele uzuale", () => {
    expect(normalizePhone("0722 123 456")).toBe("0722123456");
    expect(normalizePhone("+40 722-123-456")).toBe("0722123456");
    expect(normalizePhone("0040722123456")).toBe("0722123456");
    expect(normalizePhone("021 300 4000")).toBe("0213004000");
  });
  it("respinge numerele greșite", () => {
    for (const p of ["12345", "0722 123 45", "0122123456", "07221234567", "abc"]) expect(normalizePhone(p)).toBeNull();
  });
});

describe("validateStep", () => {
  it("formularul complet este valid", () => {
    expect(validateAll(valid)).toBeNull();
  });

  it("copilul: vârsta în afara intervalului și grupa nepotrivită", () => {
    expect(validateStep("copil", { ...valid, childAge: "3" }).childAge).toMatch(/între 4 și 14/);
    expect(validateStep("copil", { ...valid, childAge: "12", group: "7-10" }).group).toMatch(/Telescoapelor/);
    expect(validateStep("copil", { ...valid, childName: "" }).childName).toBeDefined();
  });

  it("părintele: telefon și e-mail", () => {
    const e = validateStep("parinte", { ...valid, phone: "123", email: "ana@" });
    expect(Object.keys(e).sort()).toEqual(["email", "phone"]);
  });

  it("programul trebuie să se potrivească vârstei", () => {
    expect(validateStep("program", { ...valid, childAge: "5", group: "4-6", choice: "program:robotica-si-programare" }).choice).toMatch(
      /7–14 ani/,
    );
  });

  it("tabăra cere o săptămână cu locuri libere", () => {
    const camp = { ...valid, choice: "tabara:laboratorul-inventatorilor" };
    expect(validateStep("program", camp).period).toMatch(/Alege/);
    expect(validateStep("program", { ...camp, period: "2027-06-28" }).period).toMatch(/completă/);
    expect(validateStep("program", { ...camp, period: "2027-08-02" })).toEqual({});
  });

  it("persoanele de preluare: rând gol permis doar dacă e singurul", () => {
    expect(validateStep("sanatate", { ...valid, pickup: [{ name: "", relation: "", phone: "" }] })).toEqual({});
    const two = { ...valid, pickup: [...valid.pickup, { name: "", relation: "", phone: "" }] };
    expect(validateStep("sanatate", two)["pickup.1.name"]).toBeDefined();
    const bad = { ...valid, pickup: [{ name: "Ion", relation: "", phone: "1" }] };
    expect(Object.keys(validateStep("sanatate", bad)).sort()).toEqual(["pickup.0.phone", "pickup.0.relation"]);
  });

  it("acordul este obligatoriu și validateAll indică primul pas cu erori", () => {
    expect(validateAll({ ...valid, consent: false })?.step).toBe("confirmare");
    expect(validateAll({ ...valid, email: "x", consent: false })?.step).toBe("parinte");
  });
});

describe("toPayload", () => {
  it("curăță datele și normalizează telefoanele", () => {
    const p = toPayload({ ...valid, childName: "  Maria Ionescu ", pickup: [...valid.pickup, { name: "", relation: "", phone: "" }] });
    expect(p.copil).toEqual({ nume: "Maria Ionescu", varsta: 8, grupa: "7-10" });
    expect(p.parinte.telefon).toBe("0722123456");
    expect(p.preluare).toEqual([{ nume: "Ion Ionescu", relatie: "bunic", telefon: "0733111222" }]);
    expect(p.alegere).toMatchObject({ tip: "program", slug: "engleza" });
  });
});
