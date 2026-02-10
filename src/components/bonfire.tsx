"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useId, useSyncExternalStore } from "react";

interface EmberConfig {
  id: number;
  delay: number;
  duration: number;
  size: number;
  startX: number;
  drift: number;
  opacity: number;
  yDistance: number;
}

interface FlameConfig {
  id: number;
  index: number;
  total: number;
  baseHeight: number;
  animationDuration: number;
  width: number;
  scaleVariant: number;
  blurAmount: number;
}

function Ember({ config, intensity = 1 }: { config: EmberConfig; intensity?: number }) {
  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        width: config.size,
        height: config.size,
        left: `calc(50% + ${config.startX}px)`,
        bottom: "30%",
        background: `radial-gradient(circle, #fbbf24 0%, #f97316 50%, #ea580c 100%)`,
        boxShadow: `0 0 ${config.size * 2}px ${config.size}px rgba(251, 191, 36, ${0.3 * intensity})`,
      }}
      initial={{
        opacity: 0,
        y: 0,
        scale: 0.5,
        x: 0
      }}
      animate={{
        opacity: [0, config.opacity * intensity, config.opacity * intensity, 0],
        y: -300 - config.yDistance,
        scale: [0.5, 1, 0.8, 0.2],
        x: config.drift,
      }}
      transition={{
        duration: config.duration,
        delay: config.delay,
        repeat: Infinity,
        ease: "easeOut",
      }}
    />
  );
}

function Flame({ config, intensity = 1 }: { config: FlameConfig; intensity?: number }) {
  const offset = (config.index - config.total / 2) * 25;

  return (
    <motion.div
      className="absolute bottom-0"
      style={{
        left: `calc(50% + ${offset}px)`,
        transform: "translateX(-50%)",
      }}
    >
      <motion.div
        className="relative"
        style={{
          width: config.width,
          height: config.baseHeight * intensity,
        }}
        animate={{
          scaleY: [1, 1.1 + config.scaleVariant, 0.95, 1.05, 1],
          scaleX: [1, 0.95, 1.05, 0.98, 1],
        }}
        transition={{
          duration: config.animationDuration,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="absolute inset-0 rounded-t-full"
          style={{
            background: `linear-gradient(to top,
              #ea580c 0%,
              #f97316 20%,
              #fb923c 40%,
              #fbbf24 60%,
              #fcd34d 80%,
              transparent 100%
            )`,
            filter: `blur(${config.blurAmount}px)`,
            opacity: 0.8 * intensity,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

function seededRandom(seed: number): () => number {
  return function() {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
}

interface BonfireProps {
  isActive?: boolean;
  isBurning?: boolean;
  intensity?: number;
}

function subscribe() {
  return () => {};
}

function getClientSnapshot() {
  return true;
}

function getServerSnapshot() {
  return false;
}

export function Bonfire({ isActive = true, isBurning = false, intensity = 1 }: BonfireProps) {
  const mounted = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
  const componentId = useId();

  const embers = useMemo((): EmberConfig[] => {
    const random = seededRandom(42);
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: random() * 3,
      duration: 2 + random() * 2,
      size: 3 + random() * 6,
      startX: (random() - 0.5) * 100,
      drift: (random() - 0.5) * 100,
      opacity: 0.3 + random() * 0.7,
      yDistance: random() * 200,
    }));
  }, []);

  const flames = useMemo((): FlameConfig[] => {
    const random = seededRandom(123);
    return Array.from({ length: 7 }, (_, i) => ({
      id: i,
      index: i,
      total: 7,
      baseHeight: 80 + random() * 40,
      animationDuration: 0.3 + random() * 0.3,
      width: 30 + random() * 20,
      scaleVariant: random() * 0.2,
      blurAmount: 2 + random() * 2,
    }));
  }, []);

  if (!mounted) return null;

  const effectiveIntensity = isBurning ? Math.min(intensity * 1.5, 2) : intensity;

  return (
    <div className="relative w-full h-64 overflow-visible">
      {/* Glow effect */}
      <motion.div
        className="absolute left-1/2 bottom-0 -translate-x-1/2"
        style={{
          width: 300 * effectiveIntensity,
          height: 200 * effectiveIntensity,
          background: `radial-gradient(ellipse at bottom,
            rgba(251, 191, 36, ${0.3 * effectiveIntensity}) 0%,
            rgba(249, 115, 22, ${0.2 * effectiveIntensity}) 40%,
            transparent 70%
          )`,
          filter: "blur(20px)",
        }}
        animate={{
          scale: [1, 1.05, 0.98, 1.02, 1],
          opacity: [0.8, 1, 0.9, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Base/logs */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-32 h-6 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-full rotate-[-15deg] translate-x-2" />
        <div className="w-28 h-5 bg-gradient-to-r from-zinc-700 via-zinc-600 to-zinc-700 rounded-full rotate-[12deg] -translate-x-6 translate-y-1" />
        <div className="w-24 h-5 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 rounded-full rotate-[-8deg] -translate-x-16" />
      </div>

      {/* Flames */}
      <AnimatePresence>
        {isActive && flames.map((flame) => (
          <Flame
            key={`${componentId}-flame-${flame.id}`}
            config={flame}
            intensity={effectiveIntensity}
          />
        ))}
      </AnimatePresence>

      {/* Embers */}
      <AnimatePresence>
        {isActive && embers.map((ember) => (
          <Ember
            key={`${componentId}-ember-${ember.id}`}
            config={ember}
            intensity={effectiveIntensity}
          />
        ))}
      </AnimatePresence>

      {/* Burning burst effect */}
      <AnimatePresence>
        {isBurning && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1.5, opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute left-1/2 bottom-1/4 -translate-x-1/2"
            style={{
              width: 200,
              height: 200,
              background: `radial-gradient(circle,
                rgba(251, 191, 36, 0.8) 0%,
                rgba(249, 115, 22, 0.5) 40%,
                transparent 70%
              )`,
              filter: "blur(10px)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
