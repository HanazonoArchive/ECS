/**
 * @file js/calculator.js
 * @description Pure calculation math engine for ECS.
 * UNIX Principle: Mathematical calculation logic only.
 */

import { format12HourTime, format12HourTimeShort, formatRelativeDate, formatDurationFromMinutes } from './timeFormatter.js';

/**
 * Calculate full energy arrival time and metrics
 * @param {number} current 
 * @param {number} max 
 * @param {number} rateMinutes 
 * @param {Date} now 
 * @returns {import('./types.js').CalculationResult}
 */
export function calculateFullTime(current, max, rateMinutes, now = new Date()) {
  const safeCurrent = Math.max(0, Math.min(current, max));
  const safeMax = Math.max(1, max);
  const safeRate = Math.max(0.1, rateMinutes);

  const remainingEnergy = safeMax - safeCurrent;
  const totalMinutesRemaining = remainingEnergy * safeRate;

  const fullTime = new Date(now.getTime() + totalMinutesRemaining * 60 * 1000);
  const percentage = Math.round((safeCurrent / safeMax) * 100);

  return {
    currentEnergy: safeCurrent,
    maxEnergy: safeMax,
    remainingEnergy,
    totalMinutesRemaining,
    fullTime,
    formattedFullTime12h: format12HourTime(fullTime),
    formattedFullDate: formatRelativeDate(fullTime, now),
    durationString: formatDurationFromMinutes(totalMinutesRemaining),
    percentage
  };
}

/**
 * Calculate how much energy to spend NOW so that energy is full at targetTime
 * @param {Date} targetTime 
 * @param {number} current 
 * @param {number} max 
 * @param {number} rateMinutes 
 * @param {Date} now 
 * @returns {{ spendAmount: number, targetEnergyLeft: number, isValid: boolean, message: string }}
 */
export function calculateSpendForTarget(targetTime, current, max, rateMinutes, now = new Date()) {
  if (!targetTime || targetTime.getTime() <= now.getTime()) {
    return {
      spendAmount: 0,
      targetEnergyLeft: current,
      isValid: false,
      message: 'Target time must be in the future'
    };
  }

  const minutesUntilTarget = (targetTime.getTime() - now.getTime()) / (1000 * 60);
  const energyRegenerated = minutesUntilTarget / rateMinutes;

  // Needed current energy at now = max - energyRegenerated
  // Therefore, energy to spend right now = current - (max - energyRegenerated)
  const targetCurrentEnergy = max - energyRegenerated;
  const spendAmount = Math.round(current - targetCurrentEnergy);

  if (spendAmount < 0) {
    return {
      spendAmount: 0,
      targetEnergyLeft: current,
      isValid: false,
      message: `Time is too short! Even with 0 spend, energy will only reach ${Math.floor(current + energyRegenerated)} by target time.`
    };
  }

  if (spendAmount > current) {
    return {
      spendAmount: current,
      targetEnergyLeft: 0,
      isValid: false,
      message: `Time is too long! Even after spending all ${current} energy, it will fill before target time.`
    };
  }

  return {
    spendAmount,
    targetEnergyLeft: current - spendAmount,
    isValid: true,
    message: `Spend ${spendAmount} energy now (leave ${current - spendAmount}) to reach ${max} cap at ${format12HourTimeShort(targetTime)}.`
  };
}

/**
 * Calculate predicted energy level at a future target time
 * @param {Date} targetTime 
 * @param {number} current 
 * @param {number} max 
 * @param {number} rateMinutes 
 * @param {Date} now 
 * @returns {{ predictedEnergy: number, overflowMinutes: number }}
 */
export function calculateEnergyAtTime(targetTime, current, max, rateMinutes, now = new Date()) {
  if (!targetTime || targetTime.getTime() <= now.getTime()) {
    return { predictedEnergy: current, overflowMinutes: 0 };
  }

  const minutesUntilTarget = (targetTime.getTime() - now.getTime()) / (1000 * 60);
  const addedEnergy = minutesUntilTarget / rateMinutes;
  const totalEnergy = current + addedEnergy;

  if (totalEnergy >= max) {
    const minutesToCap = (max - current) * rateMinutes;
    const overflowMinutes = Math.max(0, minutesUntilTarget - minutesToCap);
    return { predictedEnergy: max, overflowMinutes };
  }

  return { predictedEnergy: Math.floor(totalEnergy), overflowMinutes: 0 };
}

/**
 * Generate visual milestones for key percentage thresholds and custom farm costs
 * @param {number} current 
 * @param {number} max 
 * @param {number} rateMinutes 
 * @param {Date} now 
 * @param {number[]} customCosts 
 * @returns {import('./types.js').MilestoneItem[]}
 */
export function calculateMilestones(current, max, rateMinutes, now = new Date(), customCosts = []) {
  const milestones = [];
  const seen = new Set();

  // Percentage milestones with clean labels
  const percentages = [
    { pct: 0.25, label: '25%' },
    { pct: 0.50, label: '50%' },
    { pct: 0.75, label: '75%' },
    { pct: 1.0,  label: 'MAX' }
  ];

  percentages.forEach(({ pct, label }) => {
    const val = Math.round(max * pct);
    seen.add(val);
    milestones.push({ targetEnergy: val, label });
  });

  // Custom domain costs — derive their percentage for consistent labeling
  customCosts.forEach(cost => {
    if (cost > 0 && cost <= max && !seen.has(cost)) {
      seen.add(cost);
      const pct = Math.round((cost / max) * 100);
      milestones.push({ targetEnergy: cost, label: `${pct}%` });
    }
  });

  milestones.sort((a, b) => a.targetEnergy - b.targetEnergy);

  return milestones.map(m => {
    const isReached = current >= m.targetEnergy;
    const needed = Math.max(0, m.targetEnergy - current);
    const minutesNeeded = needed * rateMinutes;
    const reachTime = new Date(now.getTime() + minutesNeeded * 60 * 1000);

    return {
      label: m.label,
      targetEnergy: m.targetEnergy,
      reachTime,
      formattedTime12h: isReached ? '—' : format12HourTimeShort(reachTime),
      durationText: isReached ? '0h 0m 0s' : formatDurationFromMinutes(minutesNeeded),
      isReached
    };
  });
}
