import BaseEvent from './events/base';

import HideAction from './actions/hide';

import Interaction from './interaction';

export default class extends elementorModules.Module {
	constructor( ...args ) {
		super( ...args );

		this.actions = {
			hide: HideAction,
		};

		this.events = {
			Base: BaseEvent,
		};
	}

	getEventClass( eventName ) {
		eventName = elementorCommon.helpers.firstLetterUppercase( eventName );

		return this.events[ eventName ] || this.events.Base;
	}

	getActionClass( actionName ) {
		return this.actions[ actionName ];
	}

	createInteraction( $element, interactions ) {
		new Interaction( $element, interactions );
	}
}
