import isEqual from "lodash/isEqual";

export const areObjectsEqual = (
  objectA: {} | undefined,
  objectB: {} | undefined
): boolean => isEqual(objectA, objectB);
