# Rundown by Stagepoint

Bitfocus Companion module for [Rundown by Stagepoint](https://stagepoint.app). It lets a show caller drive their Rundown (Next, Previous, Pause, Stop, Reset, Time Adjustments, and Speaker Messages) with feedbacks.

## How it works

The module is auth'd by a single Rundown API key. The owner of that key is the show caller; whichever rundown they are the active showcaller on is the one Companion controls. There is no "target user" field, when the account associated with the API key become show caller for a Rundown in the app, Companion follows automatically. It is important that the API key be generated from the account that will be the show caller for this reason.

## Configuration

The host is hard-coded to `https://stagepoint.app`. The only thing you need to provide is your API key.

| Field | Description |
| --- | --- |
| API key | Generated in Rundown → Settings → Advanced → API Keys |
| Feedback poll interval | Milliseconds between state polls (250 – 10000). Default: `500` |

## Actions
The following Actions are available:

- **Start / Next Cue** - advance to the next cue (or start the show)
- **Previous Cue**
- **Toggle Pause** - pauses if running, resumes if paused
- **Stop** - stops the show, preserves timers
- **Reset** - full reset (only valid after Stop)
- **Adjust Time (seconds)** - `Seconds`, supports Companion variables and negatives
- **Send Speaker Message** - `Text`, supports Companion variables (max 80 chars)
- **Toggle Message Flash**
- **Set Message Background Color** - `Clear | Blue | Yellow | Red | Green`
- **Clear Message**
- **Sub-Timer: Start**
- **Sub-Timer: Toggle Pause**
- **Sub-Timer: Reset**
- **Sub-Timer: Stop**
- **Sub-Timer: Adjust Time (seconds)** - `Delta`, supports variables and negatives
- **Sub-Timer: Set Preset** - `Time` (mm:ss, h:mm:ss, or seconds; supports variables)
- **Sub-Timer: Stop At Zero** - `Mode` (Enable / Disable / Toggle)
- **Speaker View: Set Timer Mode** - `Mode` (Main only / Sub only / Both)
- **Speaker View: Main Only**
- **Speaker View: Sub Only**
- **Speaker View: Both**

## Feedback Variables
The following Variables are available:

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
| `sub_remaining_sec` | Sub-timer remaining, signed integer seconds |
| `sub_remaining` | Sub-timer remaining, formatted (`H:MM:SS` / `M:SS`) |
| `sub_preset_sec` | Sub-timer preset, integer seconds |
| `sub_preset` | Sub-timer preset, formatted |
| `sub_is_running` | `"true"` / `"false"` |
| `sub_stop_at_zero` | `"true"` / `"false"` |
| `speaker_timer_mode` | `"mainOnly"` / `"subOnly"` / `"both"` |

## Feedbacks
The following Boolean feedbacks are available for button styling:

- **Cue is Paused**, **Show is Stopped**, **Cue is Over Time**, **Show is Over Schedule**
- **Sub-Timer Is Running**
- **Sub-Timer At Zero**
- **Sub-Timer Stop At Zero Enabled**
- **Speaker View: Main Only / Sub Only / Both**
