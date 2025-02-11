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
  imageRefFB: RefObject<HTMLDivElement | null>;
  imageRef1: RefObject<HTMLDivElement | null>;
  contentBox: RefObject<HTMLDivElement | null>;
  section2Title1: RefObject<HTMLDivElement | null>;
  section3Title1: RefObject<HTMLDivElement | null>;
}

interface MobileRefs {
  animationM: RefObject<HTMLDivElement | null>;
  section1M: RefObject<HTMLDivElement | null>;
  section2M: RefObject<HTMLDivElement | null>;
  contentBoxM: RefObject<HTMLDivElement | null>;
  imageRef1M: RefObject<HTMLDivElement | null>;
  section2MTitle1: RefObject<HTMLDivElement | null>;
  section3M: RefObject<HTMLDivElement | null>;
  section3Ma: RefObject<HTMLDivElement | null>;
  section4M: RefObject<HTMLDivElement | null>;
  section41M: RefObject<HTMLDivElement | null>;
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
    imageRefFB: useRef<HTMLDivElement>(null),
    imageRef1: useRef<HTMLDivElement>(null),
    contentBox: useRef<HTMLDivElement>(null),
    section2Title1: useRef<HTMLDivElement>(null),
    section3Title1: useRef<HTMLDivElement>(null),
  };

  const mobileRefs: MobileRefs = {
    animationM: useRef<HTMLDivElement>(null),
    section1M: useRef<HTMLDivElement>(null),
    section2M: useRef<HTMLDivElement>(null),
    contentBoxM: useRef<HTMLDivElement>(null),
    imageRef1M: useRef<HTMLDivElement>(null),
    section2MTitle1: useRef<HTMLDivElement>(null),
    section3M: useRef<HTMLDivElement>(null),
    section3Ma: useRef<HTMLDivElement>(null),
    section4M: useRef<HTMLDivElement>(null),
    section41M: useRef<HTMLDivElement>(null),
    section5M: useRef<HTMLDivElement>(null),
    section51M: useRef<HTMLDivElement>(null),
  };

  return { desktopRefs, mobileRefs };
}
