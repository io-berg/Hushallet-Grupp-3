import * as SecureStore from "expo-secure-store";

export async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

export async function get(key: string) {
  const result = await SecureStore.getItemAsync(key);
  return result;
}

export async function remove(key: string) {
  await SecureStore.deleteItemAsync(key);
}
