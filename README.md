# Bitfocus Companion for Rundown by Stagepoint

Bitfocus Companion module for [Rundown by Stagepoint](https://stagepoint.app). Lets a show caller drive their rundown - Next, Previous, Pause, Stop, Reset, time adjustments, and speaker messages - from a Streamdeck or any Companion-supported surface, with live feedback variables for cue elapsed, remaining, over/under, and projected end.

## How it works

The module is auth'd by a single Rundown API key. The owner of that key is the show caller; whichever rundown they currently lead is the one Companion controls. There is no "target user" field - when you become show caller for a different rundown in the app, Companion follows automatically.

Feedback values are populated by polling `POST /api/companion/state` (default every 500ms).

## Configuration

The host is hard-coded to `https://stagepoint.app`. The only thing you need to provide is your API key.

| Field | Description |
| --- | --- |
| API key | Generated in Rundown → Settings → Advanced → API Keys |
| Feedback poll interval | Milliseconds between state polls (250 – 10000). Default: `500` |

## Actions

- **Start / Next Cue** - advance to the next cue (or start the show)
- **Previous Cue**
- **Toggle Pause** - pauses if running, resumes if paused
- **Stop** - stops the show, preserves timers
- **Reset** - full reset (only valid after Stop)
- **Adjust Time (seconds)** - `deltaSeconds`, supports Companion variables and negatives
- **Send Speaker Message** - `text`, supports Companion variables (max 80 chars)
- **Toggle Message Flash**
- **Set Message Background Color** - `default | info | warning | error | success`
- **Clear Message**

## Feedback variables

| Variable | Description |
| --- | --- |
| `cue_number` | Current cue number |
| `cue_title` | Current cue title |
| `cue_elapsed_sec` | Elapsed time, integer seconds |
| `cue_elapsed` | Elapsed time, `H:MM:SS` / `M:SS` |
| `cue_remaining_sec` | Remaining time, signed integer seconds (negative = over) |
| `cue_remaining` | Remaining time, formatted |
| `over_under_sec` | Show over/under, signed integer seconds |
| `over_under` | Over/under formatted with leading `+` when over |
| `projected_end` | Projected end time string |
| `is_paused` | `"true"` / `"false"` |
| `is_stopped` | `"true"` / `"false"` |

## Boolean feedbacks (button styling)

- **Cue is Paused** - yellow when paused
- **Show is Stopped** - red when stopped
- **Cue is Over Time** - red when remaining time has gone negative
- **Show is Over Schedule** - orange when over/under is positive

## Local development

1. Run Companion from source (`yarn start` in the Bitfocus Companion repo).
2. Symlink or copy this folder into Companion's `module-local-dev/` directory.
3. Add a "Stagepoint Rundown" connection from the Companion web UI. Edits hot-reload.

`pnpm install` here first to get `@companion-module/base`.

## Status messages

| Status | Meaning |
| --- | --- |
| Connecting | Initial poll in flight |
| OK | Last poll succeeded |
| Authentication Failure | API key rejected (401) |
| Unknown Warning | You are not currently the show caller for any rundown (409) |
| Connection Failure | Network error reaching `stagepoint.app` |
| Bad Config | API key blank |
