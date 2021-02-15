<?php
namespace Elementor\Core\App\Modules\ImportExport;

use Elementor\Core\App\Modules\ImportExport\Directories\Root;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

class Export extends Iterator {

	/**
	 * @var \ZipArchive
	 */
	private $zip_archive;

	private function init_zip_archive() {
		$zip_archive = new \ZipArchive();

		$zip_archive->open( $this->get_archive_file_name(), \ZipArchive::CREATE | \ZipArchive::OVERWRITE );

		$this->zip_archive = $zip_archive;
	}

	private function get_archive_file_name() {
		return $this->get_temp_dir() . 'elementor-temp-kit.zip';
	}

	final public function run() {
		$this->init_zip_archive();

		$root_directory = new Root( $this );

		$manifest_data = $root_directory->run_export();

		$this->set_current_archive_path( '' );

		$this->add_json_file( 'manifest', $manifest_data, JSON_PRETTY_PRINT );

		$this->zip_archive->close();

		$file_name = $this->get_archive_file_name();

		$downloaded_file_name = 'elementor-kit-' . $manifest_data['name'] . '.zip';

		header( 'Content-type: application/zip' );

		header( 'Content-Disposition: attachment; filename=' . $downloaded_file_name );

		header( 'Content-length: ' . filesize( $file_name ) );

		readfile( $file_name );

		unlink( $file_name );

		die;
	}

	public function add_json_file( $name, $content, $json_flags = null ) {
		$this->zip_archive->addFromString( $this->get_archive_file_path( $name . '.json' ), wp_json_encode( $content, $json_flags ) );
	}
}