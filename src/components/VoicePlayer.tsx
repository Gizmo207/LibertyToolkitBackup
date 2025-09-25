import React, { useEffect, useRef, useState } from "react";

interface VoicePlayerProps {
  src: string;
  onEnded?: () => void; // Callback when audio finishes
}

export default function VoicePlayer({ src, onEnded }: VoicePlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      console.log("VoicePlayer: Audio element created for:", src);

      // Set up event listeners
      const handleCanPlay = () => {
        console.log("VoicePlayer: Audio can play");
        setIsLoading(false);
      };

      const handleError = (e: Event) => {
        console.error("VoicePlayer: Audio error:", e);
        setHasError(true);
        setIsLoading(false);
      };

      const handleEnded = () => {
        console.log("VoicePlayer: Audio ended");
        onEnded?.();
      };

      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('ended', handleEnded);

      // Try to play immediately (will likely fail due to autoplay restrictions)
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("VoicePlayer: Audio started playing immediately!");
          })
          .catch(error => {
            console.log("VoicePlayer: Autoplay blocked, waiting for user interaction");
          });
      }

      // Set up user interaction handlers
      const handleUserInteraction = () => {
        if (!hasUserInteracted) {
          console.log("VoicePlayer: User interaction detected, attempting to play");
          setHasUserInteracted(true);

          // Try to play again on user interaction
          audio.play()
            .then(() => {
              console.log("VoicePlayer: Audio playing after user interaction!");
            })
            .catch(error => {
              console.error("VoicePlayer: Still couldn't play audio:", error);
            });
        }
      };

      // Listen for any user interaction
      document.addEventListener('click', handleUserInteraction, { once: true });
      document.addEventListener('touchstart', handleUserInteraction, { once: true });
      document.addEventListener('keydown', handleUserInteraction, { once: true });

      return () => {
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('ended', handleEnded);
        document.removeEventListener('click', handleUserInteraction);
        document.removeEventListener('touchstart', handleUserInteraction);
        document.removeEventListener('keydown', handleUserInteraction);
      };
    }
  }, [src, onEnded, hasUserInteracted]);

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        onEnded={onEnded}
        preload="auto"
      />
      {/* Hidden indicator - could be used for debugging */}
      <div style={{ display: 'none' }} data-audio-status="ready" />
    </>
  );
}
