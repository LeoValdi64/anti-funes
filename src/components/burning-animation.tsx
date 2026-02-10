"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useId } from "react";

interface BurningAnimationProps {
  isVisible: boolean;
  onComplete?: () => void;
}

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

interface ParticleConfig {
  id: number;
  delay: number;
  angle: number;
  distance: number;
}

interface AshConfig {
  id: number;
  leftOffset: number;
  delayOffset: number;
}

function BurstParticle({ delay, angle, distance }: { delay: number; angle: number; distance: number }) {
  const x = Math.cos(angle) * distance;
  const y = Math.sin(angle) * distance;

  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full"
      style={{
        background: `radial-gradient(circle, #fcd34d 0%, #f97316 100%)`,
        boxShadow: "0 0 10px 2px rgba(251, 191, 36, 0.5)",
      }}
      initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
      animate={{
        scale: [0, 1.5, 0],
        x: [0, x * 0.5, x],
        y: [0, y * 0.5, y],
        opacity: [1, 1, 0],
      }}
      transition={{
        duration: 0.8,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

function AshParticle({ config }: { config: AshConfig }) {
  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-zinc-500"
      style={{
        left: `calc(50% + ${config.leftOffset}px)`,
      }}
      initial={{ y: 0, opacity: 0, scale: 0 }}
      animate={{
        y: [-50, -200],
        opacity: [0, 0.6, 0],
        scale: [0, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        delay: 0.3 + config.delayOffset,
        ease: "easeOut",
      }}
    />
  );
}

export function BurningAnimation({ isVisible, onComplete }: BurningAnimationProps) {
  const componentId = useId();

  const particles = useMemo((): ParticleConfig[] => {
    const random = seededRandom(456);
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      delay: random() * 0.2,
      angle: (i / 16) * Math.PI * 2,
      distance: 80 + random() * 40,
    }));
  }, []);

  const ashParticles = useMemo((): AshConfig[] => {
    const random = seededRandom(789);
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      leftOffset: (random() - 0.5) * 100,
      delayOffset: random() * 0.3,
    }));
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            setTimeout(() => onComplete?.(), 800);
          }}
        >
          {/* Central flash */}
          <motion.div
            className="absolute"
            style={{
              width: 200,
              height: 200,
              background: `radial-gradient(circle,
                rgba(251, 191, 36, 0.8) 0%,
                rgba(249, 115, 22, 0.5) 40%,
                transparent 70%
              )`,
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 2, 2.5],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          />

          {/* Burst particles */}
          <div className="relative">
            {particles.map((particle) => (
              <BurstParticle key={`${componentId}-burst-${particle.id}`} {...particle} />
            ))}
          </div>

          {/* Floating ash particles */}
          {ashParticles.map((ash) => (
            <AshParticle key={`${componentId}-ash-${ash.id}`} config={ash} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
