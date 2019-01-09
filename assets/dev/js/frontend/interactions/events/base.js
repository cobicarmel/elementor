export default class extends elementorModules.Module {
	constructor( ...args ) {
		super( ...args );

		this.run();
	}

	run() {
		const settings = this.getSettings();

		settings.$element.on( settings.event, settings.callback.bind( settings.$element ) );
	}
}
