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
	}
}
