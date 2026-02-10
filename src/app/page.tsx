"use client";

import { useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hero } from "@/components/hero";
import { Bonfire } from "@/components/bonfire";
import { ThoughtInput } from "@/components/thought-input";
import { ThoughtCard } from "@/components/thought-card";
import { LastWordsDialog } from "@/components/last-words-dialog";
import { BurningAnimation } from "@/components/burning-animation";
import { useThoughts, useAshes } from "@/hooks/use-store";
import { ThoughtItem } from "@/lib/store";

export default function HomePage() {
  const bonfireRef = useRef<HTMLDivElement>(null);
  const { thoughts, isLoaded, addThought, removeThought } = useThoughts();
  const { burnThought } = useAshes();

  const [pendingBurn, setPendingBurn] = useState<ThoughtItem | null>(null);
  const [isBurning, setIsBurning] = useState(false);
  const [showBurningAnimation, setShowBurningAnimation] = useState(false);

  const handleBurnRequest = useCallback((thought: ThoughtItem) => {
    setPendingBurn(thought);
  }, []);

  const handleConfirmBurn = useCallback((lastWords: string) => {
    if (!pendingBurn) return;

    setIsBurning(true);
    setShowBurningAnimation(true);

    setTimeout(() => {
      burnThought(pendingBurn, lastWords);
      removeThought(pendingBurn.id);
      setPendingBurn(null);
      setIsBurning(false);
    }, 600);
  }, [pendingBurn, burnThought, removeThought]);

  const handleCancelBurn = useCallback(() => {
    setPendingBurn(null);
  }, []);

  const handleBurningAnimationComplete = useCallback(() => {
    setShowBurningAnimation(false);
  }, []);

  return (
    <main className="min-h-screen pt-20 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Hero Section */}
        <Hero />

        {/* Thought Input */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8"
        >
          <ThoughtInput onAdd={addThought} />
        </motion.section>

        {/* Thought Cards */}
        <AnimatePresence mode="popLayout">
          {isLoaded && thoughts.length > 0 && (
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-8 space-y-3"
            >
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm font-medium text-muted-foreground mb-4"
              >
                Waiting to be released ({thoughts.length})
              </motion.h2>

              <div className="space-y-3">
                <AnimatePresence mode="popLayout">
                  {thoughts.map((thought) => (
                    <ThoughtCard
                      key={thought.id}
                      thought={thought}
                      onBurn={handleBurnRequest}
                      onRemove={removeThought}
                      bonfireRef={bonfireRef}
                    />
                  ))}
                </AnimatePresence>
              </div>
            </motion.section>
          )}
        </AnimatePresence>

        {/* Empty State */}
        <AnimatePresence>
          {isLoaded && thoughts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground text-sm">
                No thoughts waiting. Add something to let go of.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Bonfire */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12"
        >
          <div className="text-center mb-4">
            <motion.h2
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg font-light text-foreground/80"
            >
              The Bonfire
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-muted-foreground mt-1"
            >
              Drag thoughts here to release them
            </motion.p>
          </div>

          <div
            ref={bonfireRef}
            className="relative"
          >
            <Bonfire
              isActive={true}
              isBurning={isBurning}
              intensity={thoughts.length > 0 ? 1 : 0.6}
            />

            {/* Drop zone indicator */}
            <motion.div
              className="absolute inset-0 rounded-xl border-2 border-dashed border-ember/0 pointer-events-none"
              animate={{
                borderColor: thoughts.length > 0 ? "rgba(249, 115, 22, 0.3)" : "transparent",
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.section>
      </div>

      {/* Last Words Dialog */}
      <LastWordsDialog
        thought={pendingBurn}
        open={pendingBurn !== null}
        onConfirm={handleConfirmBurn}
        onCancel={handleCancelBurn}
      />

      {/* Burning Animation Overlay */}
      <BurningAnimation
        isVisible={showBurningAnimation}
        onComplete={handleBurningAnimationComplete}
      />
    </main>
  );
}
