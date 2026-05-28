import { useEffect, useState } from "react";

export function useTypedWord(words: string[]) {
  const [wordIndex, setWordIndex] = useState(0);
  const [letters, setLetters] = useState(words[0].length);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches) {
      setLetters(words[0].length);
      return;
    }

    const word = words[wordIndex];
    const atFullWord = letters === word.length;
    const atEmptyWord = letters === 0;
    const delay = deleting ? 48 : atFullWord ? 1800 : 88;

    const timer = window.setTimeout(() => {
      if (!deleting && atFullWord) {
        setDeleting(true);
        return;
      }

      if (deleting && atEmptyWord) {
        setDeleting(false);
        setWordIndex((current) => (current + 1) % words.length);
        return;
      }

      setLetters((current) => current + (deleting ? -1 : 1));
    }, delay);

    return () => window.clearTimeout(timer);
  }, [deleting, letters, wordIndex, words]);

  return words[wordIndex].slice(0, letters);
}
