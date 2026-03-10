import AsyncStorage from '@react-native-async-storage/async-storage';

// Helper functions
const save = async (key, value) => {
  await AsyncStorage.setItem(key, JSON.stringify(value));
};

const load = async (key) => {
  const data = await AsyncStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

const remove = async (key) => {
  await AsyncStorage.removeItem(key);
};

export { save, load, remove };