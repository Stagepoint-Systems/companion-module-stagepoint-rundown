export const RUNDOWN_HOST = "https://stagepoint.app";

export function getConfigFields() {
  return [
    {
      type: "static-text",
      id: "info",
      width: 12,
      label: "About",
      value:
        "Connects Companion to Stagepoint Rundown. Paste your API key - the owner of that key is the show caller, and Companion drives whichever rundown that user is currently calling.",
    },
    {
      type: "textinput",
      id: "apiKey",
      label: "API key",
      tooltip: "Generate one in Rundown → Settings → Advanced → API Keys.",
      width: 12,
      default: "",
    },
    {
      type: "number",
      id: "pollIntervalMs",
      label: "Feedback poll interval (ms)",
      width: 6,
      min: 250,
      max: 10000,
      default: 500,
    },
  ];
}
