<?php

namespace Elementor\Core\Interactions\Actions;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Hide extends Base {

	public function get_name() {
		return 'hide';
	}

	public function get_title() {
		return __( 'Hide', 'elementor' );
	}

	public function register_controls() {
		$this->register_action_control(
			'selector',
			[
				'label' => __( 'Selector', 'elementor' ),
				'type' => Controls_Manager::TEXT,
			]
		);
	}
}
