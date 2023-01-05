import { v4 as uuidv4 } from "uuid";

export const getRandomId = <T extends string = string>(): T => uuidv4() as T;
