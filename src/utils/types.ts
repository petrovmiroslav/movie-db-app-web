import isNull from "lodash/isNull";
import isPlainObject from "lodash/isPlainObject";
import { z } from "zod";

export const StringDateSchema = z.string().brand<"StringDate">();
export type StringDate = z.infer<typeof StringDateSchema>;

const isArray = (maybeArray: unknown): maybeArray is unknown[] =>
  Array.isArray(maybeArray);

export const typeCheckers = {
  numberFinite: <T extends number = number>(
    maybeNumber: unknown
  ): maybeNumber is T => Number.isFinite(maybeNumber),
  string: <T extends string = string>(maybeString: unknown): maybeString is T =>
    typeof maybeString === "string",
  null: (maybeNull: unknown): maybeNull is null => isNull(maybeNull),
  boolean: (maybeBoolean: unknown): maybeBoolean is boolean =>
    typeof maybeBoolean === "boolean",
  array: isArray,
  arrayOfType: <T>(
    maybeArray: unknown,
    predicate: (value: unknown, index: number, array: unknown[]) => value is T
  ): maybeArray is T[] => isArray(maybeArray) && maybeArray.every(predicate),
  objectPlain: <T extends {}>(maybeObject: unknown): maybeObject is T =>
    isPlainObject(maybeObject),
};
