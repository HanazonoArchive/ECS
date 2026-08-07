/**
 * @file js/uiManager.js
 * @description Visual UI renderer and DOM state binder.
 * UNIX Principle: DOM rendering and visual updates only.
 */

import { GAME_PRESETS } from './presets.js';
import { format12HourTime, format12HourTimeShort } from './timeFormatter.js';
import { calculateSpendForTarget, calculateEnergyAtTime } from './calculator.js';

/**
 * Render game preset selector chips
 * @param {string} activePresetId 
 * @param {(preset: typeof GAME_PRESETS[0]) => void} onPresetSelect 
 */
export function renderPresets(activePresetId, onPresetSelect) {
  const container = document.getElementById('presetsGrid');
  if (!container) return;

  container.innerHTML = '';

  GAME_PRESETS.forEach(preset => {
    const chip = document.createElement('button');
    chip.className = `preset-chip ${preset.id === activePresetId ? 'active' : ''}`;
    chip.dataset.game = preset.id;
    chip.setAttribute('type', 'button');
    chip.innerHTML = `
      <span class="preset-chip-icon">${preset.iconSvg}</span>
      <span>${preset.name}</span>
    `;

    chip.addEventListener('click', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      onPresetSelect(preset);
    });

    container.appendChild(chip);
  });
}

/**
 * Update energy ring gauge visual
 * @param {number} current 
 * @param {number} max 
 * @param {number} percentage 
 */
export function updateRingGauge(current, max, percentage) {
  const currentElem = document.getElementById('ringCurrentValue');
  const maxElem = document.getElementById('ringMaxValue');
  const percentElem = document.getElementById('ringPercentage');
  const progressPath = document.getElementById('ringProgressPath');

  if (currentElem) currentElem.textContent = current;
  if (maxElem) maxElem.textContent = `/ ${max}`;
  if (percentElem) percentElem.textContent = `${percentage}% FULL`;

  if (progressPath) {
    // Circumference = 2 * PI * r = 2 * 3.14159 * 90 = 565.48
    const circumference = 565.48;
    const offset = circumference - (percentage / 100) * circumference;
    progressPath.style.strokeDashoffset = Math.max(0, offset);
  }
}

/**
 * Update primary telemetry statistics cards
 * @param {import('./types.js').CalculationResult} result 
 * @param {string} energyName 
 */
export function updateStatCards(result, energyName) {
  const fullTimeVal = document.getElementById('statFullTimeValue');
  const fullDateVal = document.getElementById('statFullDateValue');
  const remainingVal = document.getElementById('statRemainingValue');
  const durationVal = document.getElementById('statDurationValue');
  const energyNameLabel = document.getElementById('statEnergyNameLabel');
  const liveClockVal = document.getElementById('liveClockValue');

  if (fullTimeVal) fullTimeVal.textContent = result.formattedFullTime12h;
  if (fullDateVal) fullDateVal.textContent = result.formattedFullDate || 'Today';
  if (remainingVal) remainingVal.textContent = `${result.remainingEnergy} ${energyName}`;
  if (durationVal) durationVal.textContent = result.durationString;
  if (energyNameLabel) energyNameLabel.textContent = energyName;
  if (liveClockVal) liveClockVal.textContent = format12HourTime(new Date());
}

/**
 * Render milestones timeline
 * @param {import('./types.js').MilestoneItem[]} milestones 
 * @param {string} energyName 
 */
export function renderMilestones(milestones, energyName) {
  const container = document.getElementById('milestonesList');
  if (!container) return;

  container.innerHTML = '';

  milestones.forEach(m => {
    const item = document.createElement('div');
    item.className = 'milestone-item';
    item.innerHTML = `
      <div class="milestone-info">
        <span class="milestone-badge">${m.targetEnergy} ${energyName}</span>
        <span class="milestone-label">${m.label}</span>
      </div>
      <div class="milestone-timing">
        <span class="milestone-time">${m.formattedTime12h}</span>
        <span class="milestone-eta">(${m.durationText})</span>
      </div>
    `;
    container.appendChild(item);
  });
}

/**
 * Render reverse solver results for target full time
 * @param {Date} targetTime 
 * @param {number} current 
 * @param {number} max 
 * @param {number} rateMinutes 
 */
export function updateTargetSolvers(targetTime, current, max, rateMinutes) {
  const now = new Date();
  const spendResult = calculateSpendForTarget(targetTime, current, max, rateMinutes, now);
  const forecastResult = calculateEnergyAtTime(targetTime, current, max, rateMinutes, now);

  const spendValElem = document.getElementById('spendAmountValue');
  const spendMsgElem = document.getElementById('spendMessageValue');
  const forecastValElem = document.getElementById('forecastEnergyValue');

  if (spendValElem) {
    spendValElem.textContent = spendResult.isValid ? `${spendResult.spendAmount} Points` : 'N/A';
  }
  if (spendMsgElem) {
    spendMsgElem.textContent = spendResult.message;
  }
  if (forecastValElem) {
    forecastValElem.textContent = `${forecastResult.predictedEnergy} / ${max}`;
  }
}

/**
 * Show temporary toast notification
 * @param {string} message 
 */
export function showToast(message) {
  let toast = document.getElementById('toastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toastNotification';
    toast.className = 'toast-notification';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
