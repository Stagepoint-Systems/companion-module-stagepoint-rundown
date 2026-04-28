import { InstanceStatus } from "@companion-module/base";
import { RUNDOWN_HOST } from "./config.js";
import { parseTimeInput } from "./variables.js";

const COLOR_CHOICES = [
  { id: "default", label: "White (Default)" },
  { id: "info", label: "Blue (Info)" },
  { id: "warning", label: "Yellow (Warning)" },
  { id: "error", label: "Red (Critical)" },
  { id: "success", label: "Green (Success)" },
];

const STOP_AT_ZERO_CHOICES = [
  { id: "enable", label: "Enable" },
  { id: "disable", label: "Disable" },
  { id: "toggle", label: "Toggle" },
];

const SPEAKER_MODE_CHOICES = [
  { id: "mainOnly", label: "Main only" },
  { id: "subOnly", label: "Sub only" },
  { id: "both", label: "Both" },
];

async function callApi(self, path, body) {
  const apiKey = self.config.apiKey;
  if (!apiKey) {
    self.updateStatus(InstanceStatus.BadConfig, "Missing API key");
    return;
  }

  try {
    const res = await fetch(`${RUNDOWN_HOST}${path}`, {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (res.status === 401) {
      self.updateStatus(
        InstanceStatus.AuthenticationFailure,
        "Invalid API key",
      );
    } else if (res.status === 409) {
      self.updateStatus(
        InstanceStatus.UnknownWarning,
        "Not currently the show caller for any rundown",
      );
    } else if (!res.ok) {
      self.updateStatus(InstanceStatus.UnknownError, `HTTP ${res.status}`);
    } else {
      self.updateStatus(InstanceStatus.Ok);
    }
  } catch (err) {
    self.log("error", `API call failed: ${err.message}`);
    self.updateStatus(InstanceStatus.ConnectionFailure, err.message);
  }
}

export function getActionDefinitions(self) {
  return {
    cue_next: {
      name: "Start / Next Cue",
      options: [],
      callback: async () => callApi(self, "/api/companion/cue/next"),
    },

    cue_previous: {
      name: "Previous Cue",
      options: [],
      callback: async () => callApi(self, "/api/companion/cue/previous"),
    },

    cue_pause: {
      name: "Toggle Pause",
      options: [],
      callback: async () => callApi(self, "/api/companion/cue/pause"),
    },

    cue_stop: {
      name: "Stop",
      options: [],
      callback: async () => callApi(self, "/api/companion/cue/stop"),
    },

    cue_reset: {
      name: "Reset",
      options: [],
      callback: async () => callApi(self, "/api/companion/cue/reset"),
    },

    cue_adjust: {
      name: "Adjust Time (seconds)",
      options: [
        {
          type: "textinput",
          id: "deltaSeconds",
          label: "Delta (seconds, supports variables; negative subtracts)",
          default: "30",
          useVariables: true,
        },
      ],
      callback: async (event) => {
        const raw = event.options.deltaSeconds;
        const delta = parseInt(raw, 10);
        if (!Number.isFinite(delta) || delta === 0) {
          self.log("warn", `Adjust Time: invalid delta "${raw}"`);
          return;
        }
        await callApi(self, "/api/companion/cue/adjust", {
          deltaSeconds: delta,
        });
      },
    },

    message_send: {
      name: "Send Speaker Message",
      options: [
        {
          type: "textinput",
          id: "text",
          label: "Message text (max 80 chars; supports variables)",
          default: "",
          useVariables: true,
        },
      ],
      callback: async (event) => {
        const text = event.options.text || "";
        if (!text.trim()) {
          self.log("warn", "Send Speaker Message: empty text, skipping");
          return;
        }
        await callApi(self, "/api/companion/message/send", { text });
      },
    },

    message_flash: {
      name: "Toggle Message Flash",
      options: [],
      callback: async () => callApi(self, "/api/companion/message/flash"),
    },

    message_bg_color: {
      name: "Set Message Background Color",
      options: [
        {
          type: "dropdown",
          id: "color",
          label: "Color",
          default: "default",
          choices: COLOR_CHOICES,
        },
      ],
      callback: async (event) => {
        await callApi(self, "/api/companion/message/bg-color", {
          color: event.options.color,
        });
      },
    },

    message_clear: {
      name: "Clear Message",
      options: [],
      callback: async () => callApi(self, "/api/companion/message/clear"),
    },

    subtimer_start: {
      name: "Sub-Timer: Start",
      options: [],
      callback: async () => callApi(self, "/api/companion/subtimer/start"),
    },

    subtimer_pause: {
      name: "Sub-Timer: Toggle Pause",
      options: [],
      callback: async () => callApi(self, "/api/companion/subtimer/pause"),
    },

    subtimer_reset: {
      name: "Sub-Timer: Reset",
      options: [],
      callback: async () => callApi(self, "/api/companion/subtimer/reset"),
    },

    subtimer_stop: {
      name: "Sub-Timer: Stop",
      options: [],
      callback: async () => callApi(self, "/api/companion/subtimer/stop"),
    },

    subtimer_adjust: {
      name: "Sub-Timer: Adjust Time (seconds)",
      options: [
        {
          type: "textinput",
          id: "deltaSeconds",
          label: "Delta (seconds, supports variables; negative subtracts)",
          default: "30",
          useVariables: true,
        },
      ],
      callback: async (event) => {
        const raw = event.options.deltaSeconds;
        const delta = parseInt(raw, 10);
        if (!Number.isFinite(delta) || delta === 0) {
          self.log("warn", `Sub-Timer Adjust: invalid delta "${raw}"`);
          return;
        }
        await callApi(self, "/api/companion/subtimer/adjust", {
          deltaSeconds: delta,
        });
      },
    },

    subtimer_preset: {
      name: "Sub-Timer: Set Preset",
      options: [
        {
          type: "textinput",
          id: "time",
          label: "Time (mm:ss, h:mm:ss, or seconds; supports variables)",
          default: "15:00",
          useVariables: true,
        },
      ],
      callback: async (event) => {
        const raw = event.options.time;
        const seconds = parseTimeInput(raw);
        if (seconds === null) {
          self.log("warn", `Sub-Timer Preset: invalid time "${raw}"`);
          return;
        }
        await callApi(self, "/api/companion/subtimer/preset", { seconds });
      },
    },

    subtimer_stop_at_zero: {
      name: "Sub-Timer: Stop At Zero",
      options: [
        {
          type: "dropdown",
          id: "mode",
          label: "Mode",
          default: "toggle",
          choices: STOP_AT_ZERO_CHOICES,
        },
      ],
      callback: async (event) => {
        let enabled;
        if (event.options.mode === "enable") enabled = true;
        else if (event.options.mode === "disable") enabled = false;
        else enabled = !(self.state?.subStopAtZero ?? true);
        await callApi(self, "/api/companion/subtimer/stop-at-zero", {
          enabled,
        });
      },
    },

    speaker_timer_mode_set: {
      name: "Speaker View: Set Timer Mode",
      options: [
        {
          type: "dropdown",
          id: "mode",
          label: "Mode",
          default: "mainOnly",
          choices: SPEAKER_MODE_CHOICES,
        },
      ],
      callback: async (event) => {
        await callApi(self, "/api/companion/speaker/timer-mode", {
          mode: event.options.mode,
        });
      },
    },

    speaker_timer_mode_main: {
      name: "Speaker View: Main Only",
      options: [],
      callback: async () =>
        callApi(self, "/api/companion/speaker/timer-mode", {
          mode: "mainOnly",
        }),
    },

    speaker_timer_mode_sub: {
      name: "Speaker View: Sub Only",
      options: [],
      callback: async () =>
        callApi(self, "/api/companion/speaker/timer-mode", {
          mode: "subOnly",
        }),
    },

    speaker_timer_mode_both: {
      name: "Speaker View: Both",
      options: [],
      callback: async () =>
        callApi(self, "/api/companion/speaker/timer-mode", { mode: "both" }),
    },
  };
}
