import { useState } from "react";
import { useDebouncedValue } from "./useDebouncedValue";

export function usePlayerSearch() {
  const [keyword, setKeyword] = useState("");

  const q = keyword.trim();
  const debouncedQ = useDebouncedValue(q, 300);

  return {
    keyword,
    setKeyword,
    q,
    debouncedQ,

    isSearchMode: q.length > 0,
    isDebouncing: q !== debouncedQ,

    reset: () => setKeyword(""),
  };
}
