import { combineRgb } from '@companion-module/base'
export function getFeedbackDefinitions(self) {
	return {
		is_paused: {
			type: 'boolean',
			name: 'Cue is Paused',
			description: 'True when the current cue is paused (not running, not stopped).',
			defaultStyle: {
				bgcolor: combineRgb(255, 200, 0),
				color: combineRgb(0, 0, 0),
			},
			options: [],
			callback: () => !!self.state?.isPaused && !self.state?.isStopped,
		},

		is_stopped: {
			type: 'boolean',
			name: 'Show is Stopped',
			description: 'True when the show has been stopped.',
			defaultStyle: {
				bgcolor: combineRgb(180, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => !!self.state?.isStopped,
		},

		is_over_time: {
			type: 'boolean',
			name: 'Cue is Over Time',
			description: 'True when remaining time is negative (cue has run past its scheduled duration).',
			defaultStyle: {
				bgcolor: combineRgb(220, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => (self.state?.remainingSec ?? 0) < 0,
		},

		is_over_schedule: {
			type: 'boolean',
			name: 'Show is Over Schedule',
			description: 'True when projected end is past scheduled end (over/under > 0).',
			defaultStyle: {
				bgcolor: combineRgb(220, 100, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => (self.state?.overUnderSec ?? 0) > 0,
		},

		is_sub_running: {
			type: 'boolean',
			name: 'Sub-Timer Is Running',
			description: 'True when the sub-timer is actively counting down.',
			defaultStyle: {
				bgcolor: combineRgb(0, 150, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => !!self.state?.subIsRunning,
		},

		is_sub_at_zero: {
			type: 'boolean',
			name: 'Sub-Timer At Zero',
			description: 'True when the sub-timer remaining is at or below zero.',
			defaultStyle: {
				bgcolor: combineRgb(150, 0, 0),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => (self.state?.subRemainingSec ?? 0) <= 0,
		},

		is_sub_stop_at_zero: {
			type: 'boolean',
			name: 'Sub-Timer Stop At Zero Enabled',
			description: 'True when the sub-timer is configured to stop at zero (default).',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => !!(self.state?.subStopAtZero ?? true),
		},

		speaker_mode_main_only: {
			type: 'boolean',
			name: 'Speaker View: Main Only',
			description: 'True when the speaker view is showing only the main timer.',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => (self.state?.speakerTimerMode ?? 'mainOnly') === 'mainOnly',
		},

		speaker_mode_sub_only: {
			type: 'boolean',
			name: 'Speaker View: Sub Only',
			description: 'True when the speaker view is showing only the sub-timer.',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state?.speakerTimerMode === 'subOnly',
		},

		speaker_mode_both: {
			type: 'boolean',
			name: 'Speaker View: Both',
			description: 'True when the speaker view is showing both timers.',
			defaultStyle: {
				bgcolor: combineRgb(0, 100, 200),
				color: combineRgb(255, 255, 255),
			},
			options: [],
			callback: () => self.state?.speakerTimerMode === 'both',
		},
	}
}
