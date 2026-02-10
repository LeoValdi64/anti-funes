"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="text-center py-12 px-6"
    >
      {/* Logo animation */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.1,
        }}
        className="inline-flex items-center justify-center mb-6"
      >
        <div className="relative">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Flame className="w-12 h-12 text-ember" />
          </motion.div>
          {/* Glow effect */}
          <div
            className="absolute inset-0 blur-xl opacity-50"
            style={{
              background: "radial-gradient(circle, #f97316 0%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-4xl sm:text-5xl font-light tracking-tight text-foreground mb-4"
      >
        Remember{" "}
        <span className="font-medium bg-gradient-to-r from-ember to-fire bg-clip-text text-transparent">
          less
        </span>
        .{" "}
        <span className="text-muted-foreground">Think</span>{" "}
        <span className="font-medium">more</span>.
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
      >
        Funes remembered everything and was paralyzed by it.
        <br />
        <span className="text-foreground/80">
          Liberation comes from letting go.
        </span>
      </motion.p>

      {/* Decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        className="w-24 h-px bg-gradient-to-r from-transparent via-ember/50 to-transparent mx-auto mt-8"
      />
    </motion.section>
  );
}
