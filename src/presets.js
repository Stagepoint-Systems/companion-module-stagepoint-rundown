import { combineRgb } from "@companion-module/base";

export function getPresetDefinitions() {
  return {
    sub_start_pause: {
      type: "button",
      category: "Sub-Timer",
      name: "Start / Pause",
      style: {
        text: "▶ Start",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [
        {
          down: [{ actionId: "subtimer_pause" }],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: "is_sub_running",
          options: {},
          style: {
            text: "❚❚ Pause",
            bgcolor: combineRgb(180, 100, 0),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    },

    sub_reset: {
      type: "button",
      category: "Sub-Timer",
      name: "Reset",
      style: {
        text: "↺ Reset",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [{ down: [{ actionId: "subtimer_reset" }], up: [] }],
      feedbacks: [],
    },

    sub_stop: {
      type: "button",
      category: "Sub-Timer",
      name: "Stop",
      style: {
        text: "■ Stop",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(80, 0, 0),
      },
      steps: [{ down: [{ actionId: "subtimer_stop" }], up: [] }],
      feedbacks: [],
    },

    ...buildAdjustPresets(),

    sub_preset_15min: {
      type: "button",
      category: "Sub-Timer",
      name: "Preset 15:00",
      style: {
        text: "Set\\n15:00",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [
        {
          down: [
            {
              actionId: "subtimer_preset",
              options: { time: "15:00" },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },

    sub_preset_5min: {
      type: "button",
      category: "Sub-Timer",
      name: "Preset 5:00",
      style: {
        text: "Set\\n5:00",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [
        {
          down: [
            { actionId: "subtimer_preset", options: { time: "5:00" } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },

    sub_preset_1min: {
      type: "button",
      category: "Sub-Timer",
      name: "Preset 1:00",
      style: {
        text: "Set\\n1:00",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [
        {
          down: [
            { actionId: "subtimer_preset", options: { time: "1:00" } },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    },

    sub_stop_at_zero_toggle: {
      type: "button",
      category: "Sub-Timer",
      name: "Stop At Zero",
      style: {
        text: "Stop@0\\nOff",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [
        {
          down: [
            {
              actionId: "subtimer_stop_at_zero",
              options: { mode: "toggle" },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [
        {
          feedbackId: "is_sub_stop_at_zero",
          options: {},
          style: {
            text: "Stop@0\\nOn",
            bgcolor: combineRgb(0, 100, 200),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    },

    speaker_mode_main: {
      type: "button",
      category: "Sub-Timer",
      name: "Speaker: Main",
      style: {
        text: "Spkr\\nMain",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [{ down: [{ actionId: "speaker_timer_mode_main" }], up: [] }],
      feedbacks: [
        {
          feedbackId: "speaker_mode_main_only",
          options: {},
          style: {
            bgcolor: combineRgb(0, 100, 200),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    },

    speaker_mode_sub: {
      type: "button",
      category: "Sub-Timer",
      name: "Speaker: Sub",
      style: {
        text: "Spkr\\nSub",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [{ down: [{ actionId: "speaker_timer_mode_sub" }], up: [] }],
      feedbacks: [
        {
          feedbackId: "speaker_mode_sub_only",
          options: {},
          style: {
            bgcolor: combineRgb(0, 100, 200),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    },

    speaker_mode_both: {
      type: "button",
      category: "Sub-Timer",
      name: "Speaker: Both",
      style: {
        text: "Spkr\\nBoth",
        size: "14",
        color: combineRgb(255, 255, 255),
        bgcolor: combineRgb(40, 40, 40),
      },
      steps: [{ down: [{ actionId: "speaker_timer_mode_both" }], up: [] }],
      feedbacks: [
        {
          feedbackId: "speaker_mode_both",
          options: {},
          style: {
            bgcolor: combineRgb(0, 100, 200),
            color: combineRgb(255, 255, 255),
          },
        },
      ],
    },
  };
}

function buildAdjustPresets() {
  const offsets = [
    { id: "p_10m", delta: 600, label: "+10m", color: "primary" },
    { id: "p_5m", delta: 300, label: "+5m", color: "primary" },
    { id: "p_1m", delta: 60, label: "+1m", color: "primary" },
    { id: "p_30s", delta: 30, label: "+30s", color: "primary" },
    { id: "n_10m", delta: -600, label: "-10m", color: "error" },
    { id: "n_5m", delta: -300, label: "-5m", color: "error" },
    { id: "n_1m", delta: -60, label: "-1m", color: "error" },
    { id: "n_30s", delta: -30, label: "-30s", color: "error" },
  ];
  const out = {};
  for (const o of offsets) {
    out[`sub_adjust_${o.id}`] = {
      type: "button",
      category: "Sub-Timer",
      name: `Adjust ${o.label}`,
      style: {
        text: o.label,
        size: "18",
        color: combineRgb(255, 255, 255),
        bgcolor:
          o.color === "primary" ? combineRgb(0, 100, 0) : combineRgb(120, 0, 0),
      },
      steps: [
        {
          down: [
            {
              actionId: "subtimer_adjust",
              options: { deltaSeconds: String(o.delta) },
            },
          ],
          up: [],
        },
      ],
      feedbacks: [],
    };
  }
  return out;
}
