import { describe, expect, it, vi } from "vitest";
import { EMPTY_ENROLMENT, toPayload } from "@/lib/enrolment";
import { demoAdapter, getEnrolmentAdapter, httpAdapter, payloadToText } from "./index";

const payload = toPayload({
  ...EMPTY_ENROLMENT,
  childName: "Maria",
  childAge: "8",
  group: "7-10",
  parentName: "Ana",
  phone: "0722123456",
  email: "ana@exemplu.ro",
  choice: "program:engleza",
  consent: true,
});

describe("adaptorul de înscriere", () => {
  it("fără endpoint folosește demo, care nu trimite nimic", async () => {
    expect(getEnrolmentAdapter("").mode).toBe("demo");
    expect(await demoAdapter.submit(payload)).toEqual({ status: "not-sent" });
  });

  it("cu endpoint trimite JSON prin POST", async () => {
    const fetchMock = vi.fn(async () => new Response("{}", { status: 200 }));
    const r = await httpAdapter("https://exemplu.test/f/abc", fetchMock).submit(payload);
    expect(r).toEqual({ status: "sent" });
    const [url, init] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe("https://exemplu.test/f/abc");
    expect(init.method).toBe("POST");
    expect(JSON.parse(String(init.body)).copil.nume).toBe("Maria");
  });

  it("raportează erorile de server și de rețea", async () => {
    const r500 = await httpAdapter("x", async () => new Response("", { status: 500 })).submit(payload);
    expect(r500).toMatchObject({ status: "error" });
    const offline = await httpAdapter("x", async () => Promise.reject(new Error("offline"))).submit(payload);
    expect(offline).toMatchObject({ status: "error" });
  });

  it("textul cererii conține datele esențiale", () => {
    const t = payloadToText(payload);
    expect(t).toContain("Maria, 8 ani");
    expect(t).toContain("Engleză prin joacă");
    expect(t).toContain("doar părintele");
  });
});
