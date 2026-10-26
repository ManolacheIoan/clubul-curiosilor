/** Iconițe de interfață: contur rotunjit, 24×24, culoarea textului din jur. */

type P = { className?: string };

function I({ className, children }: P & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`icon ${className ?? ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

export const PhoneIcon = (p: P) => (
  <I {...p}>
    <path d="M5 3h3l2 5-2.5 1.5a11 11 0 0 0 7 7L16 14l5 2v3a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />
  </I>
);
export const MailIcon = (p: P) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </I>
);
export const PencilIcon = (p: P) => (
  <I {...p}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16Z" />
    <path d="m14 6 4 4" />
  </I>
);
export const CheckIcon = (p: P) => (
  <I {...p}>
    <path d="m5 12.5 4.5 4.5L19 7" />
  </I>
);
export const ArrowRightIcon = (p: P) => (
  <I {...p}>
    <path d="M5 12h14m-6-6 6 6-6 6" />
  </I>
);
export const ArrowLeftIcon = (p: P) => (
  <I {...p}>
    <path d="M19 12H5m6-6-6 6 6 6" />
  </I>
);
export const MenuIcon = (p: P) => (
  <I {...p}>
    <path d="M4 7h16M4 12h16M4 17h16" />
  </I>
);
export const CloseIcon = (p: P) => (
  <I {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </I>
);
export const ShieldIcon = (p: P) => (
  <I {...p}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
    <path d="m9 12 2 2 4-4" />
  </I>
);
export const UsersIcon = (p: P) => (
  <I {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20a6.5 6.5 0 0 1 13 0" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M17 14.5a5 5 0 0 1 4.5 5" />
  </I>
);
export const ChatIcon = (p: P) => (
  <I {...p}>
    <path d="M4 5h16v11H9l-5 4Z" />
    <path d="M8 10h8M8 13h5" />
  </I>
);
export const ClockIcon = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </I>
);
export const CalendarIcon = (p: P) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="16" rx="3" />
    <path d="M3 10h18M8 3v4m8-4v4" />
  </I>
);
export const GraduationIcon = (p: P) => (
  <I {...p}>
    <path d="m2 9 10-5 10 5-10 5Z" />
    <path d="M6 11v5c3 2.5 9 2.5 12 0v-5M22 9v6" />
  </I>
);
export const HeartIcon = (p: P) => (
  <I {...p}>
    <path d="M12 20s-8-4.5-8-10.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 8 2.5C20 15.5 12 20 12 20Z" />
  </I>
);
export const SearchIcon = (p: P) => (
  <I {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </I>
);
export const PinIcon = (p: P) => (
  <I {...p}>
    <path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12Z" />
    <circle cx="12" cy="9" r="2.5" />
  </I>
);
export const PlusIcon = (p: P) => (
  <I {...p}>
    <path d="M12 5v14M5 12h14" />
  </I>
);
export const TrashIcon = (p: P) => (
  <I {...p}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13" />
  </I>
);
export const AlertIcon = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7.5v5.5M12 16.5v.1" />
  </I>
);
export const InfoIcon = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v6M12 7.5v.1" />
  </I>
);
export const IdCardIcon = (p: P) => (
  <I {...p}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <circle cx="9" cy="11" r="2" />
    <path d="M6 16a3 3 0 0 1 6 0M14 10h4M14 13h3" />
  </I>
);
export const FirstAidIcon = (p: P) => (
  <I {...p}>
    <rect x="3" y="7" width="18" height="13" rx="3" />
    <path d="M9 7V4h6v3M12 10.5v6M9 13.5h6" />
  </I>
);
export const AppleIcon = (p: P) => (
  <I {...p}>
    <path d="M12 7c-2-1.5-7-1.5-7 4.5S9 21 12 19.5c3 1.5 7-2 7-8S14 5.5 12 7Z" />
    <path d="M12 7c0-2 1-3.5 3-4" />
  </I>
);
export const SparkIcon = (p: P) => (
  <I {...p}>
    <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5m7 7L18 18m0-12-2.5 2.5m-7 7L6 18" />
  </I>
);
export const BackpackIcon = (p: P) => (
  <I {...p}>
    <path d="M6 9a6 6 0 0 1 12 0v11H6Z" />
    <path d="M9 4.5V3h6v1.5M9 14h6v3H9Z" />
  </I>
);
export const LeafIcon = (p: P) => (
  <I {...p}>
    <path d="M5 19C5 10 11 4 20 4c0 9-6 15-15 15Z" />
    <path d="M5 19 14 10" />
  </I>
);
export const FlagIcon = (p: P) => (
  <I {...p}>
    <path d="M5 21V4m0 0h11l-2 4 2 4H5" />
  </I>
);
export const MoonIcon = (p: P) => (
  <I {...p}>
    <path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5Z" />
  </I>
);
export const PlateIcon = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="6" />
    <path d="M3 4v6a2 2 0 0 0 2 2v8M21 4c-2 1-2 4-2 7h2v9" />
  </I>
);
export const BallIcon = (p: P) => (
  <I {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 3c-3 3-3 15 0 18M3.5 9h17M3.5 15h17" />
  </I>
);
export const BookIcon = (p: P) => (
  <I {...p}>
    <path d="M4 5c3-1.5 6-1.5 8 0v14c-2-1.5-5-1.5-8 0Zm8 0c2-1.5 5-1.5 8 0v14c-3-1.5-6-1.5-8 0" />
  </I>
);
