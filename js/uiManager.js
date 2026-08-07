/**
 * @file js/uiManager.js
 * @description Visual UI renderer and DOM state binder.
 * UNIX Principle: DOM rendering and visual updates only.
 */

import { GAME_PRESETS } from './presets.js';
import { format12HourTime } from './timeFormatter.js';
import { calculateSpendForTarget, calculateEnergyAtTime } from './calculator.js';

let isDragScrollBound = false;

/**
 * Enable smooth mouse wheel horizontal scrolling for presets container
 * @param {HTMLElement} container 
 */
function enablePresetWheelScroll(container) {
  if (isDragScrollBound || !container) return;
  isDragScrollBound = true;

  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    container.scrollBy({
      left: e.deltaY * 1.2,
      behavior: 'smooth'
    });
  }, { passive: false });
}

/**
 * Enable vertical click-and-drag scrolling for card panels
 * @param {HTMLElement} panel 
 */

export function enableVerticalDragScroll(panel) {
  if (!panel || panel.dataset.vDragBound) return;
  panel.dataset.vDragBound = 'true';

  let isDown = false;
  let startY = 0;
  let scrollTop = 0;

  panel.addEventListener('mousedown', (e) => {
    // Skip if clicking interactive elements
    const tag = e.target.tagName.toUpperCase();
    if (['INPUT', 'BUTTON', 'SELECT', 'TEXTAREA', 'A', 'LABEL'].includes(tag)) return;
    isDown = true;
    startY = e.pageY - panel.offsetTop;
    scrollTop = panel.scrollTop;
  });

  panel.addEventListener('mouseleave', () => { isDown = false; });
  panel.addEventListener('mouseup', () => { isDown = false; });

  panel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const y = e.pageY - panel.offsetTop;
    const walk = (y - startY) * 1.5;
    panel.scrollTop = scrollTop - walk;
  });
}

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

    const iconHtml = preset.iconType === 'img'
      ? `<img src="${preset.iconSrc}" alt="${preset.name}" draggable="false">`
      : preset.iconSrc;

    chip.innerHTML = `
      <span class="preset-chip-icon">${iconHtml}</span>
      <span>${preset.name}</span>
    `;

    chip.addEventListener('click', () => {
      document.querySelectorAll('.preset-chip').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      onPresetSelect(preset);
    });

    container.appendChild(chip);
  });

  enablePresetWheelScroll(container);

  // Attach vertical drag scroll to all card panels
  document.querySelectorAll('.card-panel').forEach(panel => {
    enableVerticalDragScroll(panel);
  });
}

/**
 * Calculate progressive HSL color based on energy percentage (0% = Red, 33% = Orange, 66% = Yellow, 100% = Green)
 * @param {number} pct (0 to 100)
 * @returns {{ color: string, bg: string, glow: string }}
 */
export function getProgressiveEnergyColor(pct) {
  const clampPct = Math.max(0, Math.min(100, pct));
  let hue;

  if (clampPct <= 33) {
    // 0% -> 33%: Red (0°) to Orange (28°)
    hue = (clampPct / 33) * 28;
  } else if (clampPct <= 66) {
    // 33% -> 66%: Orange (28°) to Yellow (50°)
    hue = 28 + ((clampPct - 33) / 33) * 22;
  } else {
    // 66% -> 100%: Yellow (50°) to Emerald Green (140°)
    hue = 50 + ((clampPct - 66) / 34) * 90;
  }

  const h = Math.round(hue);
  return {
    color: `hsl(${h}, 85%, 52%)`,
    bg: `hsla(${h}, 85%, 52%, 0.15)`,
    glow: `hsla(${h}, 85%, 52%, 0.3)`
  };
}

/**
 * Update energy ring gauge visual & dynamic input colors
 * @param {number} current 
 * @param {number} max 
 * @param {number} percentage 
 */
export function updateRingGauge(current, max, percentage) {
  const currentElem = document.getElementById('ringCurrentValue');
  const maxElem = document.getElementById('ringMaxValue');
  const percentElem = document.getElementById('ringPercentage');
  const progressPath = document.getElementById('ringProgressPath');
  const currentInput = document.getElementById('currentEnergyInput');
  const rangeSlider = document.getElementById('currentRangeSlider');

  const { color, bg, glow } = getProgressiveEnergyColor(percentage);

  if (currentElem) {
    currentElem.textContent = Math.round(current);
    currentElem.style.color = color;
  }
  if (maxElem) maxElem.textContent = `/ ${max}`;
  if (percentElem) {
    percentElem.textContent = percentage >= 100 ? 'FULL' : `${percentage}%`;
    percentElem.style.color = color;
    percentElem.style.backgroundColor = bg;
  }

  if (progressPath) {
    const circumference = 565.48;
    const offset = circumference - (percentage / 100) * circumference;
    progressPath.style.strokeDashoffset = Math.max(0, offset);
    progressPath.style.stroke = color;
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

  // Header row
  const header = document.createElement('div');
  header.className = 'milestone-item milestone-header';
  header.innerHTML = `
    <span class="milestone-label">Tier</span>
    <span class="milestone-amount">Amt</span>
    <span class="milestone-time">Time</span>
    <span class="milestone-eta">ETA</span>
  `;
  container.appendChild(header);

  milestones.forEach(m => {
    const item = document.createElement('div');
    item.className = `milestone-item${m.isReached ? ' milestone-reached' : ''}`;
    item.innerHTML = `
      <span class="milestone-label">${m.label}</span>
      <span class="milestone-amount">${m.targetEnergy}</span>
      <span class="milestone-time">${m.formattedTime12h}</span>
      <span class="milestone-eta">${m.durationText}</span>
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
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${message}</span>
  `;

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2500);
}
