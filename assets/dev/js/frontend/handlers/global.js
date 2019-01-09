var HandlerModule = require( 'elementor-frontend/handler-module' ),
	GlobalHandler;

GlobalHandler = HandlerModule.extend( {
	getElementName: function() {
		return 'global';
	},

	animate: function() {
		var $element = this.$element,
			animation = this.getAnimation(),
			elementSettings = this.getElementSettings(),
			animationDelay = elementSettings._animation_delay || elementSettings.animation_delay || 0;

		$element.removeClass( animation );

		setTimeout( function() {
			$element.removeClass( 'elementor-invisible' ).addClass( animation );
		}, animationDelay );
	},

	getAnimation: function() {
		var elementSettings = this.getElementSettings();

		return elementSettings.animation || elementSettings._animation;
	},

	handleInteractions: function() {
		const interactions = this.getElementSettings( '_interactions' );

		if ( interactions ) {
			elementorFrontend.interactionsManager.createInteraction( this.$element, interactions );
		}
	},

	onInit: function() {
		HandlerModule.prototype.onInit.apply( this, arguments );

		if ( ! elementorFrontend.isEditMode() ) {
			this.handleInteractions();
		}

		var animation = this.getAnimation();

		if ( ! animation ) {
			return;
		}

		this.$element.removeClass( animation );

		elementorFrontend.waypoint( this.$element, this.animate.bind( this ) );
	},

	onElementChange: function( propertyName ) {
		if ( /^_?animation/.test( propertyName ) ) {
			this.animate();
		}
	},
} );

module.exports = function( $scope ) {
	new GlobalHandler( { $element: $scope } );
};
