export default class TopBar extends Marionette.ItemView {
	getTemplate() {
		return '#tmpl-elementor-templates-responsive-top-bar';
	}

	className() {
		return 'e-responsive-top-bar';
	}

	templateHelpers() {
		return {
			title: this.getOption( 'title' ),
			width: '',
			height: '',
			activeDevice: '',
		};
	}

	ui() {
		const prefix = '.e-mq-';

		return {
			switcherOption: prefix + 'switcher__option',
			switcher: prefix + 'switcher',
			closeButton: prefix + 'bar__close-button',
			breakpointSettingsButton: prefix + 'bar__settings-button',
		};
	}

	events() {
		return {
			click: 'onClick',
			'change @ui.switcherOption': 'onBreakpointSelected',
			'click @ui.closeButton': 'onCloseButtonClick',
			'click @ui.breakpointSettingsButton': 'onBreakpointSettingsOpen',
		};
	}

	initialize() {
		this.listenTo( elementor.channels.deviceMode, 'change', this.onDeviceModeChange );
	}

	onDeviceModeChange() {
		const currentDeviceMode = elementor.channels.deviceMode.request( 'currentMode' ),
			$currentDeviceSwitcherOption = this.ui.switcherOption.filter( '[value=' + currentDeviceMode + ']' );

		if ( ! $currentDeviceSwitcherOption.prop( 'checked' ) ) {
			$currentDeviceSwitcherOption.prop( 'checked', true );
		}
	}

	onBreakpointSelected( e ) {
		const currentDeviceMode = elementor.channels.deviceMode.request( 'currentMode' ),
			selectedDeviceMode = e.target.value;

		if ( currentDeviceMode !== selectedDeviceMode ) {
			elementor.changeDeviceMode( selectedDeviceMode );
		}
	}

	onBreakpointSettingsOpen() {
		const isWPPreviewMode = elementorCommon.elements.$body.hasClass( 'elementor-editor-preview' );

		if ( isWPPreviewMode ) {
			// Exit Preview Mode
			elementor.panel.$el.find( '#elementor-mode-switcher-preview-input' ).trigger( 'click' );
		}

		const isInSettingsPanelActive = 'panel/global/menu' === elementor.documents.currentDocument.config.panel.default_route;

		if ( isInSettingsPanelActive ) {
			// Shake the panel
			_( 6 ).times( ( n ) => {
				_.delay( () => elementor.panel.$el.css( 'margin-left', ( ( ( n + 1 ) % 2 ) * 5 ) + 'px' ), n * 70 );
			} );

			return;
		}

		//  Open Settings Panel for Global/Layout/Breakpoints Settings
		$e.run( 'editor/documents/switch', {
			id: elementor.config.kit_id,
			mode: 'autosave',
		} )
			.then( () => $e.route( 'panel/global/settings-layout' ) )
			// TODO: Replace with a standard routing solution once one is available
			.then( () => jQuery( '.elementor-control-section_breakpoints' ).trigger( 'click' ) );
	}

	onCloseButtonClick() {
		elementor.exitDeviceMode();
	}

	onChange() {
		const changeCallback = this.getOption( 'change' );

		if ( changeCallback ) {
			changeCallback();
		}
	}

	onClick() {
		const clickCallback = this.getOption( 'click' );

		if ( clickCallback ) {
			clickCallback();
		}
	}
}