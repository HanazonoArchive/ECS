/**
 * @file js/timeFormatter.js
 * @description Time & Date formatting utilities with 12-Hour AM/PM support.
 * UNIX Principle: Time string transformations and formatting only.
 */

/**
 * Format Date to 12-Hour format string (hh:mm:ss AM/PM)
 * @param {Date} date 
 * @returns {string} e.g. "08:30:15 PM"
 */
export function format12HourTime(date) {
  if (!date || isNaN(date.getTime())) return '--:--:-- --';
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 hour should be 12
  const strHours = String(hours).padStart(2, '0');
  return `${strHours}:${minutes}:${seconds} ${ampm}`;
}

/**
 * Format Date to short 12-Hour format string (hh:mm AM/PM)
 * @param {Date} date 
 * @returns {string} e.g. "08:30 PM"
 */
export function format12HourTimeShort(date) {
  if (!date || isNaN(date.getTime())) return '--:-- --';
  let hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12;
  const strHours = String(hours).padStart(2, '0');
  return `${strHours}:${minutes} ${ampm}`;
}

/**
 * Get human readable relative date descriptor (e.g. 'Today', 'Tomorrow', 'Sunday, Aug 9')
 * @param {Date} targetDate 
 * @param {Date} referenceNow 
 * @returns {string}
 */
export function formatRelativeDate(targetDate, referenceNow = new Date()) {
  if (!targetDate || isNaN(targetDate.getTime())) return '';

  const targetDay = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
  const nowDay = new Date(referenceNow.getFullYear(), referenceNow.getMonth(), referenceNow.getDate());
  const diffDays = Math.round((targetDay.getTime() - nowDay.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  if (diffDays === 2) return 'In 2 Days';

  return targetDate.toLocaleDateString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });
}

/**
 * Format minutes into duration string (e.g. "14h 22m 30s")
 * @param {number} totalMinutes 
 * @returns {string}
 */
export function formatDurationFromMinutes(totalMinutes) {
  if (totalMinutes <= 0) return '0h 0m 0s';

  const totalSeconds = Math.round(totalMinutes * 60);
  const days = Math.floor(totalSeconds / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  let parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0 || days > 0) parts.push(`${hours}h`);
  parts.push(`${minutes}m`);
  parts.push(`${seconds}s`);

  return parts.join(' ');
}

/**
 * Parse 12-hour AM/PM time string (e.g. "08:30", "PM") into a target Date
 * @param {number} hours12 - 1 to 12
 * @param {number} minutes - 0 to 59
 * @param {'AM'|'PM'} ampm 
 * @param {Date} baseDate 
 * @returns {Date}
 */
export function parse12HourToDate(hours12, minutes, ampm, baseDate = new Date()) {
  const result = new Date(baseDate.getTime());
  let h24 = parseInt(hours12, 10) % 12;
  if (ampm === 'PM') h24 += 12;
  result.setHours(h24, parseInt(minutes, 10), 0, 0);

  // If parsed time is earlier than baseDate today, move to tomorrow
  if (result.getTime() < baseDate.getTime()) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}
