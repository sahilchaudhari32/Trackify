export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage', error);
  }
};

export const getItem = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage', error);
    return defaultValue;
  }
};

export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from localStorage', error);
  }
};

export const setSessionItem = (key, value) => {
  try {
    sessionStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to sessionStorage', error);
  }
};

export const getSessionItem = (key, defaultValue = null) => {
  try {
    const item = sessionStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from sessionStorage', error);
    return defaultValue;
  }
};

export const removeSessionItem = (key) => {
  try {
    sessionStorage.removeItem(key);
  } catch (error) {
    console.error('Error removing from sessionStorage', error);
  }
};

export const clearStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
};
