"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Sparkles } from "lucide-react";

interface ThoughtInputProps {
  onAdd: (content: string) => void;
}

export function ThoughtInput({ onAdd }: ThoughtInputProps) {
  const [content, setContent] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = () => {
    if (!content.trim()) return;
    onAdd(content);
    setContent("");
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="w-full"
    >
      <div
        className={`
          relative rounded-lg border transition-all duration-300
          ${isFocused
            ? "border-ember/50 shadow-lg shadow-ember/10"
            : "border-border hover:border-muted-foreground/30"
          }
        `}
      >
        <Textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder="Paste your notes, bookmarks, thoughts, or anything you're ready to let go..."
          className="
            min-h-[120px] resize-none
            bg-transparent border-0
            focus-visible:ring-0 focus-visible:ring-offset-0
            placeholder:text-muted-foreground/50
            text-foreground
          "
        />

        <div className="flex items-center justify-between px-3 pb-3">
          <p className="text-xs text-muted-foreground">
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">
              ⌘
            </kbd>
            {" + "}
            <kbd className="px-1.5 py-0.5 bg-secondary rounded text-xs">
              Enter
            </kbd>
            {" to add"}
          </p>

          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            size="sm"
            className="bg-ember hover:bg-ember-dark text-white disabled:opacity-50"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add to pile
          </Button>
        </div>
      </div>

      {/* Hint text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1"
      >
        <Sparkles className="w-3 h-3" />
        Drag items to the fire when you&apos;re ready to let them go
      </motion.p>
    </motion.div>
  );
}
