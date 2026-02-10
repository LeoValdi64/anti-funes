"use client";

import { motion, useDragControls } from "framer-motion";
import { GripVertical, X } from "lucide-react";
import { ThoughtItem } from "@/lib/store";
import { useState, useRef } from "react";

interface ThoughtCardProps {
  thought: ThoughtItem;
  onBurn: (thought: ThoughtItem) => void;
  onRemove: (id: string) => void;
  bonfireRef: React.RefObject<HTMLDivElement | null>;
}

export function ThoughtCard({ thought, onBurn, onRemove, bonfireRef }: ThoughtCardProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [isOverFire, setIsOverFire] = useState(false);
  const dragControls = useDragControls();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDrag = () => {
    if (!bonfireRef.current || !cardRef.current) return;

    const bonfireRect = bonfireRef.current.getBoundingClientRect();
    const cardRect = cardRef.current.getBoundingClientRect();

    const cardCenterX = cardRect.left + cardRect.width / 2;
    const cardCenterY = cardRect.top + cardRect.height / 2;

    const isOver =
      cardCenterX > bonfireRect.left &&
      cardCenterX < bonfireRect.right &&
      cardCenterY > bonfireRect.top &&
      cardCenterY < bonfireRect.bottom;

    setIsOverFire(isOver);
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    if (isOverFire) {
      onBurn(thought);
    }

    setIsOverFire(false);
  };

  const truncatedContent = thought.content.length > 150
    ? thought.content.slice(0, 150) + "..."
    : thought.content;

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, scale: 0.8, y: 20 }}
      animate={{
        opacity: isDragging ? 0.9 : 1,
        scale: isOverFire ? 0.9 : 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.5,
        y: -50,
        transition: { duration: 0.3 },
      }}
      whileHover={{ scale: 1.02 }}
      drag
      dragControls={dragControls}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={1}
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      className={`
        relative group cursor-grab active:cursor-grabbing
        bg-card border rounded-lg p-4
        transition-colors duration-200
        ${isOverFire
          ? "border-ember shadow-lg shadow-ember/20"
          : "border-border hover:border-muted-foreground/30"
        }
      `}
      style={{
        touchAction: "none",
      }}
    >
      {/* Drag handle indicator */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-50 transition-opacity">
        <GripVertical className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Remove button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onRemove(thought.id);
        }}
        className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-secondary rounded"
      >
        <X className="w-4 h-4 text-muted-foreground hover:text-foreground" />
      </button>

      {/* Content */}
      <div className="pl-4 pr-6">
        <p className="text-sm text-foreground/90 whitespace-pre-wrap break-words">
          {truncatedContent}
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          {new Date(thought.createdAt).toLocaleDateString(undefined, {
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>

      {/* Fire overlay when dragging over bonfire */}
      {isOverFire && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{
            background: `linear-gradient(to top,
              rgba(249, 115, 22, 0.3) 0%,
              rgba(251, 191, 36, 0.2) 50%,
              transparent 100%
            )`,
          }}
        />
      )}
    </motion.div>
  );
}
