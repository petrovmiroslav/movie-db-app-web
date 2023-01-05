import { roundTo } from "./numbers";

// round rating. 8.123456789 => 8.0
export const getRoundedVote = (vote: number): string =>
  roundTo(vote, 1).toFixed(1);
