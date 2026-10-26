"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CloseIcon, MenuIcon, PencilIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { mainNav } from "@/config/site";

const isActive = (path: string, href: string) => (href === "/" ? path === "/" : path.startsWith(href));

export function Header() {
  const pathname = usePathname() ?? "/";
  // Ruta pe care s-a deschis meniul; după navigare nu mai corespunde, deci meniul e închis.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const isOpen = openOn === pathname;

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        button.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panel.current?.querySelector<HTMLElement>("a")?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  return (
    <header className="site-header">
      <div className="wrap site-header__inner">
        <Link href="/" className="site-header__logo">
          <Logo />
        </Link>

        <nav aria-label="Principal" className="nav-desktop">
          <ul>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link href="/inscriere/" className="btn btn--primary btn--small site-header__cta">
          <PencilIcon /> Înscrie copilul
        </Link>

        <button
          ref={button}
          type="button"
          className="menu-toggle"
          aria-expanded={isOpen}
          aria-controls="meniu-mobil"
          onClick={() => setOpenOn(isOpen ? null : pathname)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
          <span>{isOpen ? "Închide" : "Meniu"}</span>
        </button>
      </div>

      <div ref={panel} id="meniu-mobil" className="nav-mobile" hidden={!isOpen}>
        <nav aria-label="Meniu mobil">
          <ul>
            <li>
              <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
                Acasă
              </Link>
            </li>
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/ce-explorator-esti/">Ce explorator ești?</Link>
            </li>
            <li>
              <Link href="/intrebari-frecvente/">Întrebări frecvente</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
