import AsyncStorage from "@react-native-async-storage/async-storage";
import { submitError } from "./errors";

export enum AsyncStorageKeys {
  FAVORITES = "favorites",
}

export const getAsyncStorageData = async (
  key: AsyncStorageKeys
): Promise<unknown> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error("Error: getAsyncStorageData", error);
    submitError({ error });
  }
};

export const setAsyncStorageData = async (
  key: AsyncStorageKeys,
  value: any
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error("Error: setAsyncStorageData", error);
    submitError({ error });
  }
};
