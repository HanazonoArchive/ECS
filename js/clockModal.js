/**
 * @file js/clockModal.js
 * @description Interactive Digital Clock Drag Scrubber Modal.
 * UNIX Principle: Interactive time scrubber modal logic only.
 */

import { formatDurationFromMinutes } from './timeFormatter.js';

export class ClockScrubberModal {
  /**
   * @param {Object} options
   * @param {(hours: number, minutes: number, ampm: string) => void} options.onTimeSelect
   */
  constructor({ onTimeSelect }) {
    this.onTimeSelect = onTimeSelect;
    this.currentMinutesTotal = 1200; // 8:00 PM default (20 * 60)

    this.bindDOM();
    this.attachEvents();
  }

  bindDOM() {
    this.modal = document.getElementById('clockPickerModal');
    this.closeBtn = document.getElementById('clockModalClose');
    this.applyBtn = document.getElementById('clockModalApplyBtn');
    this.slider = document.getElementById('timeScrubberSlider');
    this.digitalTime = document.getElementById('digitalClockTime');
    this.digitalEta = document.getElementById('digitalClockEta');
  }

  open(currentHours = 8, currentMinutes = 0, currentAmpm = 'PM') {
    let h24 = currentHours % 12;
    if (currentAmpm === 'PM') h24 += 12;
    if (currentAmpm === 'AM' && currentHours === 12) h24 = 0;

    this.currentMinutesTotal = h24 * 60 + currentMinutes;
    if (this.slider) this.slider.value = this.currentMinutesTotal;

    this.updateClockVisuals();
    if (this.modal) this.modal.classList.add('open');
  }

  close() {
    if (this.modal) this.modal.classList.remove('open');
  }

  updateClockVisuals() {
    const totalMins = parseInt(this.slider ? this.slider.value : this.currentMinutesTotal, 10);
    this.currentMinutesTotal = totalMins;

    const hours24 = Math.floor(totalMins / 60);
    const mins = totalMins % 60;

    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12;

    const formattedTime = `${String(hours12).padStart(2, '0')}:${String(mins).padStart(2, '0')} ${ampm}`;

    if (this.digitalTime) {
      this.digitalTime.textContent = formattedTime;
    }

    // Relative ETA from now
    if (this.digitalEta) {
      const now = new Date();
      const target = new Date(now);
      target.setHours(hours24, mins, 0, 0);
      if (target.getTime() <= now.getTime()) {
        target.setDate(target.getDate() + 1); // next day
      }
      const diffMins = Math.round((target.getTime() - now.getTime()) / (1000 * 60));
      this.digitalEta.textContent = `Target in ${formatDurationFromMinutes(diffMins)}`;
    }
  }

  applyTime() {
    const totalMins = this.currentMinutesTotal;
    const hours24 = Math.floor(totalMins / 60);
    const mins = totalMins % 60;

    const ampm = hours24 >= 12 ? 'PM' : 'AM';
    let hours12 = hours24 % 12;
    if (hours12 === 0) hours12 = 12;

    if (this.onTimeSelect) {
      this.onTimeSelect(hours12, mins, ampm);
    }
    this.close();
  }

  attachEvents() {
    // Slider live input (dragging left-to-right)
    if (this.slider) {
      this.slider.addEventListener('input', () => {
        this.updateClockVisuals();
      });

      this.slider.addEventListener('change', () => {
        this.updateClockVisuals();
      });
    }

    // Close button & overlay click
    if (this.closeBtn) {
      this.closeBtn.addEventListener('click', () => this.close());
    }

    // Mouse wheel scroll to adjust target time (+/- 5 minutes per scroll tick with smooth easing)
    if (this.modal) {
      this.targetMinutesTotal = this.currentMinutesTotal;
      this.isWheelAnimating = false;

      this.modal.addEventListener('wheel', (e) => {
        e.preventDefault();
        const deltaMins = e.deltaY < 0 ? 5 : -5;
        this.smoothScrollMinutes(deltaMins);
      }, { passive: false });

      this.modal.addEventListener('click', (e) => {
        if (e.target === this.modal) this.close();
      });
    }

    if (this.applyBtn) {
      this.applyBtn.addEventListener('click', () => this.applyTime());
    }
  }

  smoothScrollMinutes(deltaMins) {
    if (typeof this.targetMinutesTotal !== 'number') {
      this.targetMinutesTotal = this.currentMinutesTotal;
    }

    // Accumulate target time (0..1435)
    let nextTarget = (this.targetMinutesTotal + deltaMins + 1440) % 1440;
    this.targetMinutesTotal = nextTarget;

    if (!this.isWheelAnimating) {
      this.isWheelAnimating = true;
      const animate = () => {
        const diff = this.targetMinutesTotal - this.currentMinutesTotal;
        if (Math.abs(diff) < 0.2) {
          this.currentMinutesTotal = this.targetMinutesTotal;
          if (this.slider) this.slider.value = this.currentMinutesTotal;
          this.updateClockVisuals();
          this.isWheelAnimating = false;
        } else {
          this.currentMinutesTotal += diff * 0.35; // Smooth exponential ease
          if (this.slider) this.slider.value = Math.round(this.currentMinutesTotal);
          this.updateClockVisuals();
          requestAnimationFrame(animate);
        }
      };
      requestAnimationFrame(animate);
    }
  }
}
