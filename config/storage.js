import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

// Helper functions
const save = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log('Storage save error:', error);
  }
};

const load = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log('Storage load error:', error);
    return null;
  }
};

const remove = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Storage remove error:', error);
  }
};

// ─── SecureStore (sensitive — token) ────────────────────────────────────────

async function saveSecure(key, value) {
  try {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
  } catch (error) {
    console.log('SecureStore save error:', error);
  }
}

async function loadSecure(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.log('SecureStore load error:', error);
    return null;
  }
}

async function removeSecure(key) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log('SecureStore remove error:', error);
  }
}

// ─── User ────────────────────────────────────────────────────────────────────

async function getUser() {
  return load('user');
}

// Merges the provided fields into the existing saved user object.
// e.g. updateUser({ accountName: 'John Doe' }) only touches that field.
async function updateUser(fields) {
  try {
    const existing = (await load('user')) ?? {};
    const updated = { ...existing, ...fields };
    await save('user', updated);
    return updated;
  } catch (error) {
    console.log('Storage updateUser error:', error);
  }
}

// ─── Clear session (logout / deactivate) ─────────────────────────────────────

// Removes only session-bound data — auth token and user profile.
// Anything else saved to AsyncStorage (e.g. app preferences) is left untouched.
async function clearAll() {
  try {
    await Promise.all([remove('user'), removeSecure('auth')]);
  } catch (error) {
    console.log('Storage clearAll error:', error);
  }
}

export { save, load, remove, removeSecure, loadSecure, saveSecure, getUser, updateUser, clearAll };
