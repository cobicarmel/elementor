<?php

namespace Elementor\Core\Interactions;

use Elementor\Controls_Manager;
use Elementor\Core\Base\Base_Object;
use Elementor\Element_Base;
use Elementor\Core\Interactions\Actions\Base as BaseAction;
use Elementor\Repeater;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Manager extends Base_Object {

	const GENERAL_ACTION_GROUP = 'general';

	const MOUSE_EVENT_GROUP = 'mouse';

	private $action_groups;

	private $event_groups;

	public function __construct() {
		$this->init_action_groups();

		$this->init_event_groups();
	}
	/**
	 * Get module name.
	 *
	 * Retrieve the module name.
	 *
	 * @since  2.4.0
	 * @access public
	 *
	 * @return string Module name.
	 */
	public function get_name() {
		return 'interactions';
	}

	public function get_action_groups() {
		return $this->action_groups;
	}

	public function get_event_groups() {
		return $this->event_groups;
	}

	public function add_event_group( $group_name ) {
		$this->event_groups[ $group_name ] = [];
	}

	public function add_event( $group_name, $event_name, $event_title ) {
		$this->event_groups[ $group_name ][ $event_name ] = $event_title;
	}

	public function add_action( $group_name, $action_class ) {
		$this->action_groups[ $group_name ][] = $action_class;
	}

	public function register_element_interactions( Element_Base $element ) {
		$repeater = new Repeater();

		$event_groups = $this->get_event_groups();

		$events_options = [];

		foreach ( $element->get_interactions_event_groups() as $event_group ) {
			$events_options += $event_groups[ $event_group ];
		}

		$repeater->add_control(
			'events',
			[
				'label' => __( 'Events', 'elementor' ),
				'type' => Controls_Manager::SELECT2,
				'multiple' => true,
				'default' => [],
				'options' => $events_options,
			]
		);

		$action_groups = $this->get_action_groups();

		$selected_actions = [];

		$actions_options = [];

		foreach ( $element->get_interactions_action_groups() as $action_group ) {
			$action_classes = $action_groups[ $action_group ];

			foreach ( $action_classes as $action_class ) {
				/**
				 * @var BaseAction $action
				 */
				$action = new $action_class( $repeater );

				$selected_actions[] = $action;

				$actions_options[ $action->get_name() ] = $action->get_title();
			}
		}

		$repeater->add_control(
			'actions',
			[
				'label' => __( 'Actions', 'elementor' ),
				'type' => Controls_Manager::SELECT2,
				'multiple' => true,
				'default' => [],
				'options' => $actions_options,
			]
		);

		foreach ( $selected_actions as $action ) {
			$action->register_action_control(
				'heading_' . $action->get_name(),
				[
					'label' => $action->get_title(),
					'type' => Controls_Manager::HEADING,
				]
			);

			$action->register_controls();
		}

		$element->add_control(
			'_interactions',
			[
				'label' => __( 'Interactions', 'elementor' ),
				'type' => Controls_Manager::REPEATER,
				'fields' => $repeater->get_controls(),
				'prevent_empty' => false,
				'render_type' => 'none',
				'frontend_available' => true,
			]
		);
	}

	private function init_action_groups() {
		$actions_namespace = __NAMESPACE__ . '\Actions\\';

		$this->action_groups = [
			self::GENERAL_ACTION_GROUP => [
				$actions_namespace . 'Hide',
			],
		];
	}

	private function init_event_groups() {
		$this->event_groups = [
			self::MOUSE_EVENT_GROUP => [
				'click' => __( 'Click', 'elementor' ),
				'mouseenter' => __( 'Mouse Enter', 'elementor' ),
				'mouseleave' => __( 'Mouse Leave', 'elementor' ),
			],
		];
	}
}
