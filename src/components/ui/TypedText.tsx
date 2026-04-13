"use client";

import { useState, useEffect, useCallback } from "react";

interface TypedTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

export function TypedText({
  phrases,
  className = "",
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseDuration = 2000,
}: TypedTextProps) {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const animate = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];

    if (!isDeleting) {
      if (text.length < currentPhrase.length) {
        return setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), typingSpeed);
      }
      return setTimeout(() => setIsDeleting(true), pauseDuration);
    }

    if (text.length > 0) {
      return setTimeout(() => setText(text.slice(0, -1)), deletingSpeed);
    }

    setIsDeleting(false);
    setPhraseIndex((i) => (i + 1) % phrases.length);
    return undefined;
  }, [text, phraseIndex, isDeleting, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  useEffect(() => {
    const timer = animate();
    return () => { if (timer) clearTimeout(timer); };
  }, [animate]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-[3px] h-[1em] bg-current ml-1 animate-pulse align-middle" />
    </span>
  );
}
