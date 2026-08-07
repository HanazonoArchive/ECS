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
    iconType: 'img',
    iconSrc: 'img/gi.png'
  },
  {
    id: 'hsr',
    name: 'Honkai: Star Rail',
    energyName: 'Trailblaze Power',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [30, 40, 60],
    iconType: 'img',
    iconSrc: 'img/hsr.png'
  },
  {
    id: 'wuwa',
    name: 'Wuthering Waves',
    energyName: 'Waveplates',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [40, 60],
    iconType: 'img',
    iconSrc: 'img/wuwa.png'
  },
  {
    id: 'zzz',
    name: 'Zenless Zone Zero',
    energyName: 'Battery Charge',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [20, 40, 60],
    iconType: 'img',
    iconSrc: 'img/zzz.png'
  },
  {
    id: 'arknights',
    name: 'Arknights',
    energyName: 'Sanity',
    maxEnergy: 135,
    minutesPerEnergy: 6,
    customCosts: [18, 21, 30],
    iconType: 'img',
    iconSrc: 'img/arknights.png'
  },
  {
    id: 'fgo',
    name: 'Fate/Grand Order',
    energyName: 'AP',
    maxEnergy: 144,
    minutesPerEnergy: 5,
    customCosts: [20, 40],
    iconType: 'img',
    iconSrc: 'img/fategrandorder.png'
  },
  {
    id: 'bluearchive',
    name: 'Blue Archive',
    energyName: 'AP',
    maxEnergy: 240,
    minutesPerEnergy: 6,
    customCosts: [10, 20, 40],
    iconType: 'img',
    iconSrc: 'img/bluearchive.png'
  },
  {
    id: 'reverse1999',
    name: 'Reverse: 1999',
    energyName: 'Activity',
    maxEnergy: 300,
    minutesPerEnergy: 6,
    customCosts: [20, 40, 60],
    iconType: 'img',
    iconSrc: 'img/reverse1999.png'
  },
  {
    id: 'nikke',
    name: 'Goddess of Victory: Nikke',
    energyName: 'Stamina',
    maxEnergy: 100,
    minutesPerEnergy: 6,
    customCosts: [10, 20],
    iconType: 'img',
    iconSrc: 'img/nikke.png'
  },
  {
    id: 'custom',
    name: 'Custom Energy System',
    energyName: 'Energy Points',
    maxEnergy: 100,
    minutesPerEnergy: 5,
    customCosts: [20, 40, 60],
    iconType: 'svg',
    iconSrc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`
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
