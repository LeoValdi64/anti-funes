export interface ThoughtItem {
  id: string;
  content: string;
  createdAt: number;
}

export interface AshItem {
  id: string;
  lastWords: string;
  burnedAt: number;
  originalLength: number;
}

const THOUGHTS_KEY = "anti-funes-thoughts";
const ASHES_KEY = "anti-funes-ashes";

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function getThoughts(): ThoughtItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(THOUGHTS_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveThoughts(thoughts: ThoughtItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(THOUGHTS_KEY, JSON.stringify(thoughts));
}

export function addThought(content: string): ThoughtItem {
  const thoughts = getThoughts();
  const newThought: ThoughtItem = {
    id: generateId(),
    content: content.trim(),
    createdAt: Date.now(),
  };
  thoughts.push(newThought);
  saveThoughts(thoughts);
  return newThought;
}

export function removeThought(id: string): void {
  const thoughts = getThoughts();
  const filtered = thoughts.filter((t) => t.id !== id);
  saveThoughts(filtered);
}

export function getAshes(): AshItem[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(ASHES_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveAshes(ashes: AshItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ASHES_KEY, JSON.stringify(ashes));
}

export function addAsh(thought: ThoughtItem, lastWords: string): AshItem {
  const ashes = getAshes();
  const newAsh: AshItem = {
    id: generateId(),
    lastWords: lastWords.trim() || "(no last words)",
    burnedAt: Date.now(),
    originalLength: thought.content.length,
  };
  ashes.unshift(newAsh);
  saveAshes(ashes);
  removeThought(thought.id);
  return newAsh;
}

export function clearAllAshes(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(ASHES_KEY, JSON.stringify([]));
}
