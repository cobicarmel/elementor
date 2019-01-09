export default class extends elementorModules.frontend.interactions.actions.Base {
	run() {
		const $elementToHide = jQuery( this.getSettings( 'selector' ) );

		$elementToHide.hide();
	}
}
