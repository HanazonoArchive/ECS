/**
 * @file js/types.js
 * @description Data structure definitions and JSDoc contracts for ECS.
 * UNIX Principle: Type contract definitions only.
 */

/**
 * @typedef {Object} GamePreset
 * @property {string} id - Unique identifier (e.g. 'genshin')
 * @property {string} name - Display title (e.g. 'Genshin Impact')
 * @property {string} energyName - Name of energy system (e.g. 'Original Resin')
 * @property {number} maxEnergy - Default maximum capacity (e.g. 200)
 * @property {number} minutesPerEnergy - Minutes per 1 energy point (e.g. 8)
 * @property {string} iconSvg - Clean inline SVG icon for preset chip
 * @property {number[]} customCosts - Typical farm cost milestones (e.g. [20, 40, 60])
 */

/**
 * @typedef {Object} CalculationParams
 * @property {number} currentEnergy - Current energy count
 * @property {number} maxEnergy - Maximum energy capacity
 * @property {number} minutesPerEnergy - Regeneration rate in minutes
 * @property {Date} now - Reference timestamp
 */

/**
 * @typedef {Object} CalculationResult
 * @property {number} currentEnergy - Current energy level
 * @property {number} maxEnergy - Maximum energy level
 * @property {number} remainingEnergy - Energy points left to reach max
 * @property {number} totalMinutesRemaining - Minutes left to full
 * @property {Date} fullTime - Exact Date object when full
 * @property {string} formattedFullTime12h - 12-hour formatted time (hh:mm:ss AM/PM)
 * @property {string} formattedFullDate - Human readable relative date (e.g., 'Today', 'Tomorrow')
 * @property {string} durationString - Formatted remaining duration (e.g., '14h 22m 30s')
 * @property {number} percentage - Percentage filled (0 - 100)
 */

/**
 * @typedef {Object} MilestoneItem
 * @property {string} label - Milestone title (e.g. '50%', '40 Resin (Boss)')
 * @property {number} targetEnergy - Energy amount for milestone
 * @property {Date} reachTime - Exact Date object when reached
 * @property {string} formattedTime12h - 12-hour formatted time
 * @property {string} durationText - Relative duration text (e.g. 'in 2h 15m')
 * @property {boolean} isReached - Whether already achieved
 */

export {};
