/**
 * @file js/presets.js
 * @description Preset game profiles and energy configurations.
 * UNIX Principle: Data source of game presets only.
 */

export const GAME_PRESETS = [
  {
    id: 'genshin',
    name: 'Genshin Impact',
    energyName: 'Original Resin',
    maxEnergy: 200,
    minutesPerEnergy: 8,
    customCosts: [20, 40, 60],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>`
  },
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    energyName: 'Trailblaze Power',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [30, 40, 60],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
  },
  {
    id: 'wuwa',
    name: 'Wuthering Waves',
    energyName: 'Waveplates',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [40, 60],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h5l3 9 4-18 3 9h5"/></svg>`
  },
  {
    id: 'zzz',
    name: 'Zenless Zone Zero',
    energyName: 'Battery Charge',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [20, 40, 60],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`
  },
  {
    id: 'arknights',
    name: 'Arknights',
    energyName: 'Sanity',
    maxEnergy: 135,
    minutesPerEnergy: 6,
    customCosts: [18, 21, 30],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
  },
  {
    id: 'fgo',
    name: 'Fate/Grand Order',
    energyName: 'AP',
    maxEnergy: 144,
    minutesPerEnergy: 5,
    customCosts: [20, 40],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`
  },
  {
    id: 'bluearchive',
    name: 'Blue Archive',
    energyName: 'AP',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [10, 20, 40],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>`
  },
  {
    id: 'reverse1999',
    name: 'Reverse: 1999',
    energyName: 'Activity',
    maxEnergy: 300,
    minutesPerEnergy: 6,
    customCosts: [20, 40, 60],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>`
  },
  {
    id: 'nikke',
    name: 'Goddess of Victory: Nikke',
    energyName: 'Stamina',
    maxEnergy: 100,
    minutesPerEnergy: 6,
    customCosts: [10, 20],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>`
  },
  {
    id: 'custom',
    name: 'Custom Energy System',
    energyName: 'Energy Points',
    maxEnergy: 100,
    minutesPerEnergy: 5,
    customCosts: [20, 40, 60],
    iconSvg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
  }
];

/**
 * Get preset by ID
 * @param {string} id 
 * @returns {typeof GAME_PRESETS[0]}
 */
export function getPresetById(id) {
  return GAME_PRESETS.find(p => p.id === id) || GAME_PRESETS[0];
}
