/**
 * @file js/themeController.js
 * @description Theme management and visual mode toggling.
 * UNIX Principle: Theme application logic only.
 */

import { loadState, saveState } from './storage.js';

/**
 * Apply theme to document
 * @param {'dark'|'cyber'|'light'} theme 
 */
export function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  saveState({ theme });
}

/**
 * Get active theme
 * @returns {'dark'|'cyber'|'light'}
 */
export function getActiveTheme() {
  const saved = loadState().theme;
  if (saved) return saved;

  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
}

/**
 * Initialize theme listeners
 */
export function initTheme() {
  const currentTheme = getActiveTheme();
  applyTheme(currentTheme);
}
