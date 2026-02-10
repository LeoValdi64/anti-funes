"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Flame } from "lucide-react";
import { ThoughtItem } from "@/lib/store";

interface LastWordsDialogProps {
  thought: ThoughtItem | null;
  open: boolean;
  onConfirm: (lastWords: string) => void;
  onCancel: () => void;
}

function LastWordsContent({
  thought,
  onConfirm,
  onCancel,
}: {
  thought: ThoughtItem | null;
  onConfirm: (lastWords: string) => void;
  onCancel: () => void;
}) {
  const [lastWords, setLastWords] = useState("");

  const handleConfirm = () => {
    onConfirm(lastWords);
    setLastWords("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleConfirm();
    }
  };

  const truncatedContent = thought
    ? thought.content.length > 100
      ? thought.content.slice(0, 100) + "..."
      : thought.content
    : "";

  return (
    <>
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-foreground">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <Flame className="w-5 h-5 text-ember" />
          </motion.div>
          Final Words
        </DialogTitle>
        <DialogDescription className="text-muted-foreground">
          Leave a brief trace before this thought becomes ash.
        </DialogDescription>
      </DialogHeader>

      <div className="space-y-4 py-4">
        {/* Preview of what's being burned */}
        <div className="p-3 bg-secondary/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground mb-1">Burning:</p>
          <p className="text-sm text-foreground/80 italic">
            &ldquo;{truncatedContent}&rdquo;
          </p>
        </div>

        {/* Last words input */}
        <div className="space-y-2">
          <label
            htmlFor="last-words"
            className="text-sm text-muted-foreground"
          >
            Summarize in one line (optional):
          </label>
          <Input
            id="last-words"
            value={lastWords}
            onChange={(e) => setLastWords(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="What was this really about?"
            maxLength={100}
            className="bg-background border-border focus:border-ember focus:ring-ember/20"
            autoFocus
          />
          <p className="text-xs text-muted-foreground text-right">
            {lastWords.length}/100
          </p>
        </div>
      </div>

      <div className="flex gap-3 justify-end">
        <Button
          variant="outline"
          onClick={onCancel}
          className="border-border hover:bg-secondary"
        >
          Keep it
        </Button>
        <Button
          onClick={handleConfirm}
          className="bg-ember hover:bg-ember-dark text-white"
        >
          <Flame className="w-4 h-4 mr-2" />
          Let it burn
        </Button>
      </div>
    </>
  );
}

export function LastWordsDialog({
  thought,
  open,
  onConfirm,
  onCancel,
}: LastWordsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onCancel()}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {open && (
          <LastWordsContent
            thought={thought}
            onConfirm={onConfirm}
            onCancel={onCancel}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
