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
  };
}
