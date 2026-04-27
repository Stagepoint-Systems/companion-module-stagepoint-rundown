import { InstanceStatus } from "@companion-module/base";
import { RUNDOWN_HOST } from "./config.js";

const COLOR_CHOICES = [
  { id: "default", label: "White (Default)" },
  { id: "info", label: "Blue (Info)" },
  { id: "warning", label: "Yellow (Warning)" },
  { id: "error", label: "Red (Critical)" },
  { id: "success", label: "Green (Success)" },
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
      callback: async (event, context) => {
        const raw = await context.parseVariablesInString(
          event.options.deltaSeconds,
        );
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
      callback: async (event, context) => {
        const text =
          (await context.parseVariablesInString(event.options.text)) || "";
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
  };
}
