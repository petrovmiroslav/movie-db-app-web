import AsyncStorage from "@react-native-async-storage/async-storage";

export enum AsyncStorageKeys {
  FAVORITES = "favorites",
}

export const getAsyncStorageData = async (
  key: AsyncStorageKeys
): Promise<unknown> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error: getAsyncStorageData", e);
  }
};

export const setAsyncStorageData = async (
  key: AsyncStorageKeys,
  value: any
) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error: setAsyncStorageData", e);
  }
};
