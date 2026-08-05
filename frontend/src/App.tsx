import { useEffect, useState } from "react";
import { BookingModal } from "./components/BookingModal";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import {
  heroWords,
  getDefaultProgram,
  isProgramId,
  selectedProgramStorageKey,
} from "./data/siteData";
import type { ProgramId } from "./data/siteData";
import { useRevealOnScroll } from "./hooks/useRevealOnScroll";
import { useTypedWord } from "./hooks/useTypedWord";
import { FaqSection } from "./sections/FaqSection";
import { FinalCtaSection } from "./sections/FinalCtaSection";
import { GallerySection } from "./sections/GallerySection";
import { HeroSection } from "./sections/HeroSection";
import { IncludedSection } from "./sections/IncludedSection";
import { ProcessSection } from "./sections/ProcessSection";
import { ProgramsSection } from "./sections/ProgramsSection";
import { TestimonialsSection } from "./sections/TestimonialsSection";
import { TermsSection } from "./sections/TermsSection";
import { WhySection } from "./sections/WhySection";

export function App() {
  const typedWord = useTypedWord(heroWords);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<ProgramId>(getDefaultProgram().id);

  useRevealOnScroll();

  useEffect(() => {
    const scrollToCurrentHash = (behavior: ScrollBehavior) => {
      const sectionId = decodeURIComponent(window.location.hash.replace("#", ""));
      if (!sectionId) return;

      const section = document.getElementById(sectionId);
      if (!section) return;

      window.requestAnimationFrame(() => {
        section.scrollIntoView({ behavior, block: "start" });
      });
    };

    const initialScrollTimeout = window.setTimeout(() => scrollToCurrentHash("auto"), 80);
    const repeatInitialScrollTimeout = window.setTimeout(() => scrollToCurrentHash("auto"), 400);
    const handleHashChange = () => scrollToCurrentHash("smooth");

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.clearTimeout(initialScrollTimeout);
      window.clearTimeout(repeatInitialScrollTimeout);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    const storedProgram = window.localStorage.getItem(selectedProgramStorageKey);
    if (isProgramId(storedProgram)) {
      setSelectedProgramId(storedProgram);
    }
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.body.classList.add("menu-open");
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("menu-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const selectProgram = (programId: ProgramId) => {
    setSelectedProgramId(programId);
    window.localStorage.setItem(selectedProgramStorageKey, programId);
  };

  const openBooking = (programId: ProgramId) => {
    selectProgram(programId);
    setBookingOpen(true);
  };

  const closeBooking = () => setBookingOpen(false);

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        closeMenu={closeMenu}
        toggleMenu={() => setMenuOpen((open) => !open)}
      />

      <main id="top">
        <HeroSection typedWord={typedWord} selectedProgramId={selectedProgramId} />
        <WhySection />
        <ProgramsSection openBooking={openBooking} />
        <ProcessSection />
        <GallerySection />
        <TestimonialsSection />
        <TermsSection />
        <IncludedSection />
        <FaqSection />
        <FinalCtaSection selectedProgramId={selectedProgramId} />
      </main>

      {bookingOpen && (
        <BookingModal selectedProgramId={selectedProgramId} onClose={closeBooking} />
      )}

      <SiteFooter />
    </>
  );
}
