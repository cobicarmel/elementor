export default class extends elementorModules.Module {
	constructor( $element, interactions ) {
		super();

		this.$element = $element;

		this.interactions = interactions;

		this.runInteractions();
	}

	runInteractions() {
		this.interactions.forEach( ( interaction ) => this.runInteraction( interaction ) );
	}

	runInteraction( interaction ) {
		interaction.events.forEach( ( eventName ) => this.runEvent( eventName, interaction ) );
	}

	runEvent( eventName, interaction ) {
		const EventClass = elementorFrontend.interactionsManager.getEventClass( eventName );

		new EventClass( {
			$element: this.$element,
			event: eventName,
			callback: ( ...args ) => this.runActions( interaction, ...args ),
		} );
	}

	runActions( interaction, ...args ) {
		interaction.actions.forEach( ( actionName ) => this.runAction( actionName, interaction, ...args ) );
	}

	runAction( actionName, interaction, ...args ) {
		const ActionClass = elementorFrontend.interactionsManager.getActionClass( actionName ),
			actionSettings = {},
			keyRegex = new RegExp( '^' + actionName + '_' );

		jQuery.each( interaction, ( key, value ) => {
			const pureKey = key.replace( keyRegex, '' );

			if ( pureKey !== key ) {
				actionSettings[ pureKey ] = value;
			}
		} );

		new ActionClass( actionSettings, ...args );
	}
}
