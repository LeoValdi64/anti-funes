"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Archive, Trash2, Flame } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAshes } from "@/hooks/use-store";

export default function AshesPage() {
  const { ashes, isLoaded, clearAllAshes } = useAshes();
  const [searchQuery, setSearchQuery] = useState("");
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const filteredAshes = useMemo(() => {
    if (!searchQuery.trim()) return ashes;
    const query = searchQuery.toLowerCase();
    return ashes.filter((ash) =>
      ash.lastWords.toLowerCase().includes(query)
    );
  }, [ashes, searchQuery]);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffDays = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;

    return date.toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const handleClearAll = () => {
    clearAllAshes();
    setShowClearConfirm(false);
  };

  return (
    <main className="min-h-screen pt-24 pb-12">
      <div className="max-w-2xl mx-auto px-6">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center justify-center mb-4"
          >
            <Archive className="w-10 h-10 text-ash" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-light text-foreground mb-2"
          >
            Archive of Ashes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground"
          >
            Traces of what once was. Minimal reminders of what you released.
          </motion.p>
        </motion.header>

        {/* Search and Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex gap-3 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ashes..."
              className="pl-10 bg-card border-border focus:border-ember focus:ring-ember/20"
            />
          </div>

          {ashes.length > 0 && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowClearConfirm(true)}
              className="border-border hover:border-destructive hover:text-destructive shrink-0"
              title="Clear all ashes"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </motion.div>

        {/* Clear confirmation */}
        <AnimatePresence>
          {showClearConfirm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 bg-card border border-destructive/30 rounded-lg">
                <p className="text-sm text-foreground mb-3">
                  Clear all {ashes.length} ashes? This cannot be undone.
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowClearConfirm(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleClearAll}
                  >
                    Clear all
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats */}
        {isLoaded && ashes.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between mb-6 text-sm text-muted-foreground"
          >
            <span>
              {filteredAshes.length === ashes.length
                ? `${ashes.length} thoughts released`
                : `${filteredAshes.length} of ${ashes.length} shown`}
            </span>
            <span className="flex items-center gap-1">
              <Flame className="w-3 h-3 text-ember/50" />
              {ashes.reduce((acc, ash) => acc + ash.originalLength, 0).toLocaleString()} characters freed
            </span>
          </motion.div>
        )}

        {/* Ashes List */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="space-y-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredAshes.map((ash, index) => (
              <motion.div
                key={ash.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.03 }}
                className="group flex items-start gap-4 py-3 px-4 rounded-lg hover:bg-card/50 transition-colors"
              >
                <div className="shrink-0 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-ash/50" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground/80 break-words">
                    {ash.lastWords}
                  </p>
                </div>

                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">
                    {formatDate(ash.burnedAt)}
                  </p>
                  <p className="text-xs text-muted-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity">
                    {ash.originalLength} chars
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        <AnimatePresence>
          {isLoaded && ashes.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-card mb-4">
                <Archive className="w-8 h-8 text-muted-foreground/50" />
              </div>
              <p className="text-muted-foreground">
                Nothing has been burned yet.
              </p>
              <p className="text-sm text-muted-foreground/60 mt-1">
                Ashes will appear here after you release thoughts to the fire.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* No Results */}
        <AnimatePresence>
          {isLoaded && ashes.length > 0 && filteredAshes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12"
            >
              <p className="text-muted-foreground">
                No ashes match &ldquo;{searchQuery}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
