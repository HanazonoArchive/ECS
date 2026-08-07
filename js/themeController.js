/**
 * @file js/themeController.js
 * @description Theme management and visual mode toggling.
 * UNIX Principle: Theme application logic only.
 */

import { loadState, saveState } from './storage.js';

/** All available themes in cycle order */
export const THEME_LIST = [
  { id: 'dark',    name: 'Dark Void' },
  { id: 'cyber',   name: 'Cyber Neon' },
  { id: 'light',   name: 'Clean Light' },
  { id: 'sakura',  name: 'Sakura' },
  { id: 'ocean',   name: 'Ocean' },
  { id: 'forest',  name: 'Forest' },
  { id: 'sunset',  name: 'Sunset' },
  { id: 'grape',   name: 'Grape' },
  { id: 'mint',    name: 'Mint' },
  { id: 'crimson', name: 'Crimson' }
];

/**
 * Apply theme to document
 * @param {string} theme 
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveState({ theme });
}

/**
 * Get active theme
 * @returns {string}
 */
export function getActiveTheme() {
  const saved = loadState().theme;
  if (saved && THEME_LIST.some(t => t.id === saved)) return saved;
  return 'dark';
}

/**
 * Get the next theme in rotation
 * @returns {{ id: string, name: string }}
 */
export function getNextTheme() {
  const current = getActiveTheme();
  const idx = THEME_LIST.findIndex(t => t.id === current);
  const next = THEME_LIST[(idx + 1) % THEME_LIST.length];
  return next;
}

/**
 * Initialize theme
 */
export function initTheme() {
  const currentTheme = getActiveTheme();
  applyTheme(currentTheme);
}
