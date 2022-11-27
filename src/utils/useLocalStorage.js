import { useState } from "react";

export function getStorageItem(key, initialValue) {
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem(key);
    // Parse stored json or if none return initialValue
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}

export function setStorageItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log(error);
  }
}

export function setJwtAtStorage(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch (error) {
    console.log(error);
  }
}


export function getJwtAtStorage() {
  const initialValue = '';
  try {
    // Get from local storage by key
    const item = window.localStorage.getItem('jwtToken');
    // Parse stored json or if none return initialValue
    return item ? item : initialValue;
  } catch (error) {
    // If error also return initialValue
    console.log(error);
    return initialValue;
  }
}


export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    return getStorageItem(key, initialValue);
  });

  const setValue = value => {
    const valueToStore = value instanceof Function ? value(storedValue) : value;
    setStoredValue(valueToStore);
    setStorageItem(key, valueToStore);
  };

  return [storedValue, setValue];
}