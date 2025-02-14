// hooks/useSectionRefs.ts
import { useRef, RefObject } from "react";

interface DesktopRefs {
  section1: RefObject<HTMLDivElement | null>;
  section1Content: RefObject<HTMLDivElement | null>;
  section2: RefObject<HTMLDivElement | null>;
  section3: RefObject<HTMLDivElement | null>;
  section4: RefObject<HTMLDivElement | null>;
  section41: RefObject<HTMLDivElement | null>;
  section5: RefObject<HTMLDivElement | null>;
  section51: RefObject<HTMLDivElement | null>;
}

interface MobileRefs {
  section1M: RefObject<HTMLDivElement | null>;
  section2M: RefObject<HTMLDivElement | null>;
  section3M: RefObject<HTMLDivElement | null>;
  section4M: RefObject<HTMLDivElement | null>;
  section5M: RefObject<HTMLDivElement | null>;
  section51M: RefObject<HTMLDivElement | null>;
}

export function useSectionRefs() {
  const desktopRefs: DesktopRefs = {
    section1: useRef<HTMLDivElement>(null),
    section1Content: useRef<HTMLDivElement>(null),
    section2: useRef<HTMLDivElement>(null),
    section3: useRef<HTMLDivElement>(null),
    section4: useRef<HTMLDivElement>(null),
    section41: useRef<HTMLDivElement>(null),
    section5: useRef<HTMLDivElement>(null),
    section51: useRef<HTMLDivElement>(null),
  };

  const mobileRefs: MobileRefs = {
    section1M: useRef<HTMLDivElement>(null),
    section2M: useRef<HTMLDivElement>(null),
    section3M: useRef<HTMLDivElement>(null),
    section4M: useRef<HTMLDivElement>(null),
    section5M: useRef<HTMLDivElement>(null),
    section51M: useRef<HTMLDivElement>(null),
  };

  return { desktopRefs, mobileRefs };
}
