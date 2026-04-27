import { InstanceBase, InstanceStatus, runEntrypoint } from '@companion-module/base'
import { getConfigFields } from './config.js'
import { getActionDefinitions } from './actions.js'
import { getFeedbackDefinitions } from './feedbacks.js'
import { getVariableDefinitions } from './variables.js'
import { startPolling, stopPolling } from './poll.js'

class StagepointRundownInstance extends InstanceBase {
	async init(config) {
		this.config = config
		this.state = null

		this.updateStatus(InstanceStatus.Connecting)

		this.setActionDefinitions(getActionDefinitions(this))
		this.setFeedbackDefinitions(getFeedbackDefinitions(this))
		this.setVariableDefinitions(getVariableDefinitions())

		startPolling(this)
	}

	async destroy() {
		stopPolling(this)
	}

	async configUpdated(config) {
		this.config = config
		this.updateStatus(InstanceStatus.Connecting)
		// Re-register actions so they pick up the new host/key in their callbacks
		this.setActionDefinitions(getActionDefinitions(this))
		startPolling(this)
	}

	getConfigFields() {
		return getConfigFields()
	}
}

runEntrypoint(StagepointRundownInstance, [])
