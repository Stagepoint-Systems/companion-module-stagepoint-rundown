export function formatSignedHms(totalSeconds, { plusForPositive = true } = {}) {
  const value = Math.round(Number(totalSeconds) || 0);
  const sign = value < 0 ? "-" : value > 0 && plusForPositive ? "+" : "";
  const abs = Math.abs(value);
  const h = Math.floor(abs / 3600);
  const m = Math.floor((abs % 3600) / 60);
  const s = abs % 60;
  const pad = (n) => String(n).padStart(2, "0");
  if (h > 0) return `${sign}${h}:${pad(m)}:${pad(s)}`;
  return `${sign}${m}:${pad(s)}`;
}

export function parseTimeInput(str) {
  const trimmed = String(str ?? "").trim();
  if (!trimmed) return null;
  if (/^\d+$/.test(trimmed)) {
    const n = Number(trimmed);
    return n >= 0 && n <= 86400 ? n : null;
  }
  const parts = trimmed.split(":").map((p) => p.trim());
  if (parts.length === 2) {
    const m = Number(parts[0]);
    const s = Number(parts[1]);
    if (!Number.isFinite(m) || !Number.isFinite(s) || m < 0 || s < 0 || s >= 60)
      return null;
    const total = m * 60 + s;
    return total <= 86400 ? total : null;
  }
  if (parts.length === 3) {
    const h = Number(parts[0]);
    const m = Number(parts[1]);
    const s = Number(parts[2]);
    if (
      !Number.isFinite(h) ||
      !Number.isFinite(m) ||
      !Number.isFinite(s) ||
      h < 0 ||
      m < 0 ||
      m >= 60 ||
      s < 0 ||
      s >= 60
    )
      return null;
    const total = h * 3600 + m * 60 + s;
    return total <= 86400 ? total : null;
  }
  return null;
}

export function getVariableDefinitions() {
  return {
    cue_number: { name: "Current Cue Number" },
    cue_title: { name: "Current Cue Title" },

    cue_elapsed_sec: { name: "Cue Elapsed Time (seconds)" },
    cue_elapsed: { name: "Cue Elapsed Time (formatted)" },

    cue_remaining_sec: { name: "Cue Remaining Time (seconds, signed)" },
    cue_remaining: { name: "Cue Remaining Time (formatted)" },

    over_under_sec: { name: "Over/Under (seconds, signed)" },
    over_under: { name: "Over/Under (formatted)" },

    projected_end: { name: "Projected End" },

    is_paused: { name: "Is Paused (true/false)" },
    is_stopped: { name: "Is Stopped (true/false)" },

    sub_remaining_sec: { name: "Sub-Timer Remaining (seconds, signed)" },
    sub_remaining: { name: "Sub-Timer Remaining (formatted)" },
    sub_preset_sec: { name: "Sub-Timer Preset (seconds)" },
    sub_preset: { name: "Sub-Timer Preset (formatted)" },
    sub_is_running: { name: "Sub-Timer Is Running (true/false)" },
    sub_stop_at_zero: { name: "Sub-Timer Stop At Zero (true/false)" },
    speaker_timer_mode: {
      name: "Speaker View Timer Mode (mainOnly/subOnly/both)",
    },
  };
}

export function variableValuesFromState(state) {
  if (!state) return {};
  return {
    cue_number: state.currentCueNumber ?? "",
    cue_title: state.currentCueTitle ?? "",

    cue_elapsed_sec: state.elapsedSec ?? 0,
    cue_elapsed: formatSignedHms(state.elapsedSec ?? 0, {
      plusForPositive: false,
    }),

    cue_remaining_sec: state.remainingSec ?? 0,
    cue_remaining: formatSignedHms(state.remainingSec ?? 0, {
      plusForPositive: false,
    }),

    over_under_sec: state.overUnderSec ?? 0,
    over_under: formatSignedHms(state.overUnderSec ?? 0),

    projected_end: state.projectedEnd ?? "",

    is_paused: state.isPaused ? "true" : "false",
    is_stopped: state.isStopped ? "true" : "false",

    sub_remaining_sec: state.subRemainingSec ?? 0,
    sub_remaining: formatSignedHms(state.subRemainingSec ?? 0, {
      plusForPositive: false,
    }),
    sub_preset_sec: state.subPresetSec ?? 0,
    sub_preset: formatSignedHms(state.subPresetSec ?? 0, {
      plusForPositive: false,
    }),
    sub_is_running: state.subIsRunning ? "true" : "false",
    sub_stop_at_zero: state.subStopAtZero ? "true" : "false",
    speaker_timer_mode: state.speakerTimerMode ?? "mainOnly",
  };
}
