import { InstanceStatus } from '@companion-module/base'
import { RUNDOWN_HOST } from './config.js'
import { variableValuesFromState } from './variables.js'

/**
 * Polls /api/companion/state on the configured host and pushes the result into
 * the module's variables + cached state (used by feedbacks).
 *
 * Stores the active timer on `self._pollTimer` so it can be torn down by
 * stopPolling() during reconfigure / destroy.
 */
export function startPolling(self) {
	stopPolling(self)

	const interval = Math.max(250, Number(self.config.pollIntervalMs) || 500)

	const tick = async () => {
		const apiKey = self.config.apiKey
		if (!apiKey) {
			self.updateStatus(InstanceStatus.BadConfig, 'Missing API key')
			return
		}

		try {
			const res = await fetch(`${RUNDOWN_HOST}/api/companion/state`, {
				method: 'POST',
				headers: { 'x-api-key': apiKey, 'Content-Type': 'application/json' },
			})

			if (res.status === 401) {
				self.updateStatus(InstanceStatus.AuthenticationFailure, 'Invalid API key')
				return
			}
			if (res.status === 409) {
				self.updateStatus(
					InstanceStatus.UnknownWarning,
					'Not currently the show caller for any rundown',
				)
				// Still clear stale state so variables don't show old values
				self.state = null
				self.setVariableValues(variableValuesFromState(null))
				self.checkFeedbacks('is_paused', 'is_stopped', 'is_over_time', 'is_over_schedule')
				return
			}
			if (!res.ok) {
				self.updateStatus(InstanceStatus.UnknownError, `HTTP ${res.status}`)
				return
			}

			const json = await res.json()
			self.state = json
			self.setVariableValues(variableValuesFromState(json))
			self.checkFeedbacks('is_paused', 'is_stopped', 'is_over_time', 'is_over_schedule')
			self.updateStatus(InstanceStatus.Ok)
		} catch (err) {
			self.updateStatus(InstanceStatus.ConnectionFailure, err.message)
		}
	}

	// Fire once immediately so the user sees state without waiting a full tick
	tick()
	self._pollTimer = setInterval(tick, interval)
}

export function stopPolling(self) {
	if (self._pollTimer) {
		clearInterval(self._pollTimer)
		self._pollTimer = null
	}
}
