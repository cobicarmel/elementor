<?php

namespace Elementor\Core\Interactions\Actions;

use Elementor\Core\Base\Base_Object;
use Elementor\Repeater;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

abstract class Base extends Base_Object {

	/**
	 * @var \Elementor\Repeater
	 */
	private $repeater;

	abstract public function get_name();

	abstract public function get_title();

	public function __construct( Repeater $repeater ) {
		$this->repeater = $repeater;
	}

	public function register_controls() {}


	public function register_action_control( $name, array $args ) {
		$action_name = $this->get_name();

		$args['conditions']['terms'][] = [
			'name' => 'actions',
			'operator' => 'contains',
			'value' => $action_name,
		];

		$this->repeater->add_control( $action_name . '_' . $name, $args );
	}
}
