import round from "lodash/round";

export const roundTo = (
  number: number,
  precision?: number | undefined
): number => round(number, precision);
