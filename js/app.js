/**
 * @file js/app.js
 * @description Main application controller and event orchestrator for ECS.
 * UNIX Principle: Application lifecycle and event binding only.
 */

import { GAME_PRESETS, getPresetById } from './presets.js';
import { calculateFullTime, calculateMilestones } from './calculator.js';
import { loadState, saveState } from './storage.js';
import { initTheme, applyTheme, getActiveTheme, getNextTheme } from './themeController.js';
import { renderPresets, updateRingGauge, updateStatCards, renderMilestones, updateTargetSolvers, showToast } from './uiManager.js';
import { parse12HourToDate, format12HourTime } from './timeFormatter.js';
import { ClockScrubberModal } from './clockModal.js';

class EnergyCalculatorApp {
  constructor() {
    this.state = loadState();
    this.currentPreset = getPresetById(this.state.activePresetId);

    // Target Time state for reverse solvers
    const defaultTarget = new Date();
    defaultTarget.setHours(20, 0, 0, 0); // 08:00 PM default
    this.targetTime = defaultTarget;

    this.init();
  }

  init() {
    initTheme();
    this.bindDOM();
    this.populateInputsFromState();
    this.renderPresetsCarousel();
    this.attachEventListeners();
    this.recalculate();
    this.startLiveClock();
  }

  bindDOM() {
    this.currentInput = document.getElementById('currentEnergyInput');
    this.maxInput = document.getElementById('maxEnergyInput');
    this.rateInput = document.getElementById('rateInput');
    this.rangeSlider = document.getElementById('currentRangeSlider');
    this.energyNameTitle = document.getElementById('energyNameTitle');
    this.targetTimeHours = document.getElementById('targetTimeHours');
    this.targetTimeMinutes = document.getElementById('targetTimeMinutes');
    this.targetTimeAmpm = document.getElementById('targetTimeAmpm');
    this.themeToggleBtn = document.getElementById('themeToggleBtn');
    this.copyBtn = document.getElementById('copySummaryBtn');
    this.helpBtn = document.getElementById('helpBtn');
    this.helpModal = document.getElementById('helpModal');
    this.helpModalClose = document.getElementById('helpModalClose');
  }

  populateInputsFromState() {
    if (this.currentInput) this.currentInput.value = this.state.currentEnergy;
    if (this.maxInput) this.maxInput.value = this.state.maxEnergy;
    if (this.rateInput) this.rateInput.value = this.state.minutesPerEnergy;
    if (this.rangeSlider) {
      this.rangeSlider.max = this.state.maxEnergy;
      this.rangeSlider.value = this.state.currentEnergy;
    }
    if (this.energyNameTitle) {
      this.energyNameTitle.textContent = this.currentPreset.energyName;
    }
  }

  renderPresetsCarousel() {
    renderPresets(this.currentPreset.id, (selectedPreset) => {
      this.currentPreset = selectedPreset;
      this.state.activePresetId = selectedPreset.id;
      this.state.maxEnergy = selectedPreset.maxEnergy;
      this.state.minutesPerEnergy = selectedPreset.minutesPerEnergy;

      // Reset current energy if it exceeds new max
      if (this.state.currentEnergy > selectedPreset.maxEnergy) {
        this.state.currentEnergy = Math.floor(selectedPreset.maxEnergy / 2);
      }

      this.populateInputsFromState();
      saveState(this.state);
      this.recalculate();
    });
  }

  attachEventListeners() {
    // Current Energy Input & Slider
    if (this.currentInput) {
      this.currentInput.addEventListener('input', (e) => {
        let val = parseInt(e.target.value, 10) || 0;
        val = Math.max(0, Math.min(val, this.state.maxEnergy));
        this.state.currentEnergy = val;
        if (this.rangeSlider) this.rangeSlider.value = val;
        this.onStateChange();
      });
    }

    if (this.rangeSlider) {
      this.rangeSlider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value, 10) || 0;
        this.state.currentEnergy = val;
        if (this.currentInput) this.currentInput.value = val;
        this.onStateChange();
      });

      let sliderTarget = this.state.currentEnergy;
      let animCurrentEnergy = this.state.currentEnergy;
      let isSliderAnimating = false;

      this.rangeSlider.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 5 : -5;
        sliderTarget = Math.max(0, Math.min(this.state.maxEnergy, sliderTarget + delta));

        if (!isSliderAnimating) {
          isSliderAnimating = true;
          const animateSlider = () => {
            const diff = sliderTarget - animCurrentEnergy;
            if (Math.abs(diff) < 0.2) {
              animCurrentEnergy = sliderTarget;
              this.state.currentEnergy = sliderTarget;
              this.rangeSlider.value = sliderTarget;
              if (this.currentInput) this.currentInput.value = sliderTarget;
              this.onStateChange();
              isSliderAnimating = false;
            } else {
              animCurrentEnergy += diff * 0.35;
              const rounded = Math.round(animCurrentEnergy);
              this.state.currentEnergy = rounded;
              this.rangeSlider.value = rounded;
              if (this.currentInput) this.currentInput.value = rounded;
              this.onStateChange();
              requestAnimationFrame(animateSlider);
            }
          };
          requestAnimationFrame(animateSlider);
        }
      }, { passive: false });
    }

    // Max Energy & Rate Inputs
    if (this.maxInput) {
      this.maxInput.addEventListener('change', (e) => {
        let val = parseInt(e.target.value, 10) || 1;
        this.state.maxEnergy = val;
        if (this.rangeSlider) this.rangeSlider.max = val;
        this.onStateChange();
      });
    }

    if (this.rateInput) {
      this.rateInput.addEventListener('change', (e) => {
        let val = parseFloat(e.target.value) || 1;
        this.state.minutesPerEnergy = val;
        this.onStateChange();
      });
    }

    // Quick Increment Buttons (+10, +20, +40, MAX)
    document.querySelectorAll('.quick-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.dataset.add;
        if (action === 'max') {
          this.state.currentEnergy = this.state.maxEnergy;
        } else if (action === 'clear') {
          this.state.currentEnergy = 0;
        } else {
          const addVal = parseInt(action, 10) || 0;
          this.state.currentEnergy = Math.min(this.state.maxEnergy, this.state.currentEnergy + addVal);
        }
        this.populateInputsFromState();
        this.onStateChange();
      });
    });

    // 12-Hour Target Time Picker Inputs
    const onTargetTimeChange = () => {
      const h = parseInt(this.targetTimeHours?.value || '8', 10);
      const m = parseInt(this.targetTimeMinutes?.value || '0', 10);
      const ampm = this.targetTimeAmpm?.textContent.trim() || 'PM';
      this.targetTime = parse12HourToDate(h, m, ampm, new Date());
      this.recalculateSolvers();
    };

    if (this.targetTimeHours) this.targetTimeHours.addEventListener('change', onTargetTimeChange);
    if (this.targetTimeMinutes) this.targetTimeMinutes.addEventListener('change', onTargetTimeChange);

    if (this.targetTimeAmpm) {
      this.targetTimeAmpm.addEventListener('click', () => {
        const currentAMPM = this.targetTimeAmpm.textContent.trim();
        this.targetTimeAmpm.textContent = currentAMPM === 'AM' ? 'PM' : 'AM';
        onTargetTimeChange();
      });
    }

    // Interactive Clock Scrubber Modal Instantiation
    this.clockModal = new ClockScrubberModal({
      onTimeSelect: (h, m, ampm) => {
        if (this.targetTimeHours) this.targetTimeHours.value = h;
        if (this.targetTimeMinutes) this.targetTimeMinutes.value = String(m).padStart(2, '0');
        if (this.targetTimeAmpm) this.targetTimeAmpm.textContent = ampm;
        onTargetTimeChange();
        showToast(`Target set to ${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')} ${ampm}`);
      }
    });

    const openClockBtn = document.getElementById('openClockModalBtn');
    if (openClockBtn) {
      openClockBtn.addEventListener('click', () => {
        const h = parseInt(this.targetTimeHours?.value || '8', 10);
        const m = parseInt(this.targetTimeMinutes?.value || '0', 10);
        const ampm = this.targetTimeAmpm?.textContent.trim() || 'PM';
        this.clockModal.open(h, m, ampm);
      });
    }

    const timeContainer = document.getElementById('timePickerContainer');
    if (timeContainer) {
      let holdTimer = null;
      timeContainer.addEventListener('mousedown', (e) => {
        if (['INPUT', 'BUTTON'].includes(e.target.tagName.toUpperCase())) return;
        holdTimer = setTimeout(() => {
          const h = parseInt(this.targetTimeHours?.value || '8', 10);
          const m = parseInt(this.targetTimeMinutes?.value || '0', 10);
          const ampm = this.targetTimeAmpm?.textContent.trim() || 'PM';
          this.clockModal.open(h, m, ampm);
        }, 220);
      });
      timeContainer.addEventListener('mouseup', () => { if (holdTimer) clearTimeout(holdTimer); });
      timeContainer.addEventListener('mouseleave', () => { if (holdTimer) clearTimeout(holdTimer); });
    }

    // Theme Switcher Button (cycles through all themes)
    if (this.themeToggleBtn) {
      this.themeToggleBtn.addEventListener('click', () => {
        const next = getNextTheme();
        applyTheme(next.id);
        showToast(`Theme: ${next.name}`);
      });
    }

    // Copy Summary Button
    if (this.copyBtn) {
      this.copyBtn.addEventListener('click', () => {
        this.copySummaryToClipboard();
      });
    }

    // Help Modal
    if (this.helpBtn && this.helpModal) {
      this.helpBtn.addEventListener('click', () => {
        this.helpModal.classList.add('open');
      });
    }
    if (this.helpModalClose && this.helpModal) {
      this.helpModalClose.addEventListener('click', () => {
        this.helpModal.classList.remove('open');
      });
      this.helpModal.addEventListener('click', (e) => {
        if (e.target === this.helpModal) this.helpModal.classList.remove('open');
      });
    }

    // Reverse Solver Tab Switches
    document.querySelectorAll('.tab-btn').forEach(tab => {
      tab.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        tab.classList.add('active');
        const targetTabId = tab.dataset.tab;
        const targetContent = document.getElementById(targetTabId);
        if (targetContent) targetContent.classList.add('active');
      });
    });
  }

  onStateChange() {
    saveState(this.state);
    this.recalculate();
  }

  recalculate() {
    const now = new Date();
    const result = calculateFullTime(
      this.state.currentEnergy,
      this.state.maxEnergy,
      this.state.minutesPerEnergy,
      now
    );

    updateRingGauge(result.currentEnergy, result.maxEnergy, result.percentage);
    updateStatCards(result, this.currentPreset.energyName);

    const milestones = calculateMilestones(
      this.state.currentEnergy,
      this.state.maxEnergy,
      this.state.minutesPerEnergy,
      now,
      this.currentPreset.customCosts
    );
    renderMilestones(milestones, this.currentPreset.energyName);

    this.recalculateSolvers();
  }

  recalculateSolvers() {
    updateTargetSolvers(
      this.targetTime,
      this.state.currentEnergy,
      this.state.maxEnergy,
      this.state.minutesPerEnergy
    );
  }

  startLiveClock() {
    setInterval(() => {
      const now = new Date();
      const liveClockElem = document.getElementById('liveClockValue');
      if (liveClockElem) liveClockElem.textContent = format12HourTime(now);

      // Re-tick calculations every second for live countdown
      this.recalculate();
    }, 1000);
  }

  copySummaryToClipboard() {
    const now = new Date();
    const result = calculateFullTime(
      this.state.currentEnergy,
      this.state.maxEnergy,
      this.state.minutesPerEnergy,
      now
    );

    const summaryText = `⚡ ECS (${this.currentPreset.name}):\n` +
      `Current: ${result.currentEnergy}/${result.maxEnergy} ${this.currentPreset.energyName}\n` +
      `Full Time: ${result.formattedFullTime12h} (${result.formattedFullDate})\n` +
      `Time Remaining: ${result.durationString}`;

    navigator.clipboard.writeText(summaryText)
      .then(() => showToast('Summary copied to clipboard!'))
      .catch(() => showToast('Failed to copy summary'));
  }
}

// Bootstrap on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  new EnergyCalculatorApp();
});
