import { useContext } from "react";
import { UpvoteContext } from "../context/UpvoteProvider";

// a wrapper around useContext for the upvote context
// throws if you use it outside the provider
export function useUpvoteLists() {
  const ctx = useContext(UpvoteContext);

  if (!ctx) {
    throw new Error("useUpvoteLists must be used within UpvoteProvider");
  }

  return ctx;
}
