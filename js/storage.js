/**
 * @file js/storage.js
 * @description LocalStorage state persistence for ECS.
 * UNIX Principle: Data persistence operations only.
 */

const STORAGE_KEY = 'ECS_USER_STATE_V2';

/**
 * @typedef {Object} SavedState
 * @property {string} activePresetId
 * @property {number} currentEnergy
 * @property {number} maxEnergy
 * @property {number} minutesPerEnergy
 * @property {string} theme
 */

const DEFAULT_STATE = {
  activePresetId: 'genshin',
  currentEnergy: 60,
  maxEnergy: 200,
  minutesPerEnergy: 8,
  theme: 'dark'
};

/**
 * Load state from localStorage
 * @returns {SavedState}
 */
export function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed };
  } catch (e) {
    console.warn('Failed to load state from localStorage:', e);
    return { ...DEFAULT_STATE };
  }
}

/**
 * Save state to localStorage
 * @param {Partial<SavedState>} newState 
 */
export function saveState(newState) {
  try {
    const current = loadState();
    const merged = { ...current, ...newState };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  } catch (e) {
    console.warn('Failed to save state to localStorage:', e);
  }
}
