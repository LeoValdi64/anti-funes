"use client";

import { useState, useCallback, useSyncExternalStore } from "react";
import {
  ThoughtItem,
  AshItem,
  getThoughts,
  getAshes,
  addThought as addThoughtToStore,
  addAsh as addAshToStore,
  removeThought as removeThoughtFromStore,
  clearAllAshes as clearAllAshesFromStore,
} from "@/lib/store";

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getThoughtsSnapshot(): ThoughtItem[] {
  if (typeof window === "undefined") return [];
  return getThoughts();
}

function getThoughtsServerSnapshot(): ThoughtItem[] {
  return [];
}

function getAshesSnapshot(): AshItem[] {
  if (typeof window === "undefined") return [];
  return getAshes();
}

function getAshesServerSnapshot(): AshItem[] {
  return [];
}

export function useThoughts() {
  const [version, setVersion] = useState(0);

  const thoughts = useSyncExternalStore(
    subscribeToStorage,
    () => {
      void version;
      return getThoughtsSnapshot();
    },
    getThoughtsServerSnapshot
  );

  const addThought = useCallback((content: string) => {
    if (!content.trim()) return null;
    const newThought = addThoughtToStore(content);
    setVersion(v => v + 1);
    return newThought;
  }, []);

  const removeThought = useCallback((id: string) => {
    removeThoughtFromStore(id);
    setVersion(v => v + 1);
  }, []);

  const isLoaded = typeof window !== "undefined";

  return { thoughts, isLoaded, addThought, removeThought };
}

export function useAshes() {
  const [version, setVersion] = useState(0);

  const ashes = useSyncExternalStore(
    subscribeToStorage,
    () => {
      void version;
      return getAshesSnapshot();
    },
    getAshesServerSnapshot
  );

  const burnThought = useCallback((thought: ThoughtItem, lastWords: string) => {
    const ash = addAshToStore(thought, lastWords);
    setVersion(v => v + 1);
    return ash;
  }, []);

  const clearAllAshes = useCallback(() => {
    clearAllAshesFromStore();
    setVersion(v => v + 1);
  }, []);

  const refreshAshes = useCallback(() => {
    setVersion(v => v + 1);
  }, []);

  const isLoaded = typeof window !== "undefined";

  return { ashes, isLoaded, burnThought, clearAllAshes, refreshAshes };
}
