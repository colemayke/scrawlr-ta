import { UpvoteList } from "../types/upvote";

const STORAGE_KEY = "upvote-lists";

// reads from localStorage and parses the lists
// returns null if nothings there or if parsing fails
export function loadLists(): UpvoteList[] | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as UpvoteList[];
    return parsed;
  } catch (error) {
    console.error("Could not load lists from localStorage", error);
    return null;
  }
}

// writes lists to localStorage
// just logs an error if it fails, doesn't throw
export function saveLists(lists: UpvoteList[]): void {
    if (typeof window === "undefined") return;
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    } catch (error) {
        console.error("Could not save lists to localStorage", error);
    }
}