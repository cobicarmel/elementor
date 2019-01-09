export default class extends elementorModules.Module {
	constructor( settings, ...args ) {
		super( settings );

		this.run( ...args );
	}
}
