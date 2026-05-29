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
  const [flippedProgramIds, setFlippedProgramIds] = useState<ProgramId[]>([]);

  useRevealOnScroll();

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

  const toggleProgramDetails = (programId: ProgramId) => {
    setFlippedProgramIds((current) =>
      current.includes(programId)
        ? current.filter((item) => item !== programId)
        : [...current, programId],
    );
  };

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
        <ProgramsSection
          flippedProgramIds={flippedProgramIds}
          toggleProgramDetails={toggleProgramDetails}
          openBooking={openBooking}
        />
        <ProcessSection />
        <GallerySection />
        <TestimonialsSection />
        <TermsSection />
        <IncludedSection />
        <FaqSection />
        <FinalCtaSection selectedProgramId={selectedProgramId} />
      </main>

      {bookingOpen && (
        <BookingModal selectedProgramId={selectedProgramId} onClose={() => setBookingOpen(false)} />
      )}

      <SiteFooter />
    </>
  );
}
