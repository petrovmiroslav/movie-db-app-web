import lodashDebounce from "lodash/debounce";
import lodashThrottle from "lodash/throttle";

export type WrappedPromiseValue<T> = [T, null] | [null, unknown];

export const asyncWrap = async <T>(
  promise: Promise<T>
): Promise<WrappedPromiseValue<T>> => {
  try {
    const data = await promise;
    return [data, null];
  } catch (error) {
    return [null, error];
  }
};

export const debounce = lodashDebounce;
export const throttle = lodashThrottle;
