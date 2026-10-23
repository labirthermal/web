<?php
/**
 * Plugin Name:       LabIR Edu - Display thermal images
 * Description:       A block for displaying IR camera recordings as interactive analysis apps.
 * Requires at least: 6.6
 * Requires PHP:      7.2
 * Version:           1.3.5
 * Author:            Jan Jáchim, New Technologies Research Center, University of West Bohemia in Pilsen
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       thermal-display
 * Domain Path:       /languages
 *
 * @package ThermalDisplay
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

require( __DIR__ . '/lib/dependencies.php' );
require( __DIR__ . '/lib/uploads.php' );
require( __DIR__ . '/lib/wall/entry.php' );

/**
 * Load the textdomain for frontend and backend
 */
add_action( 'init', 'wpdocs_load_textdomain' );
function wpdocs_load_textdomain() {
	load_plugin_textdomain( 'thermal-display', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' ); 
}

/**
 * Load the textdomain for wordpress.org
 */
function thermal_display_i18n_textdomain( $mofile, $domain ) {
	if ( 'thermal-display' === $domain && false !== strpos( $mofile, WP_LANG_DIR . '/plugins/' ) ) {
		$locale = apply_filters( 'plugin_locale', determine_locale(), $domain );
		$mofile = WP_PLUGIN_DIR . '/' . dirname( plugin_basename( __FILE__ ) ) . '/languages/' . $domain . '-' . $locale . '.mo';
	}
	return $mofile;
}
add_filter( 'load_textdomain_mofile', 'thermal_display_i18n_textdomain', 10, 2 );


/**
 * Register block categories
 */
add_filter( 'block_categories_all' , function( $categories ) {

    // Adding a new category.
	$categories[] = array(
		'slug'  => 'thermal',
		'title' => 'Thermal display'
	);

	return $categories;
} );


/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function thermal_display_init_blocks() {
	register_block_type( __DIR__ . '/build/wind-chill' );
	register_block_type( __DIR__ . '/build/app' );
	register_block_type( __DIR__ . '/build/group' );
	register_block_type( __DIR__ . '/build/remoteGroup' );
	// register_block_type( __DIR__ . '/build/timeGrid' );
	register_block_type( __DIR__ . '/build/remoteBrowser' );
	register_block_type( __DIR__ . '/build/dropin' );
    register_block_type( __DIR__ . '/build/connected' );

    register_block_type( __DIR__ . '/build/wall' );
}
add_action( 'init', 'thermal_display_init_blocks' );



add_action( 'enqueue_block_editor_assets', function() {
    wp_enqueue_style( 'dashicons' );
});




register_activation_hook(__FILE__, 'my_plugin_create_table');

function my_plugin_create_table() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'thermal_dropin_stats';
    
    $charset_collate = $wpdb->get_charset_collate();
    
    $sql = "CREATE TABLE $table_name (
        id bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        ip varchar(45) NOT NULL,
        file_name varchar(255) NOT NULL,
        file_size bigint(20) UNSIGNED NOT NULL,
        file_is_sequence tinyint(1) NOT NULL,
        file_num_frames int(11) UNSIGNED NOT NULL,
        file_width int(11) UNSIGNED NOT NULL,
        file_height int(11) UNSIGNED NOT NULL,
        file_timestamp bigint(20) UNSIGNED NOT NULL,
        file_data_type int(11) NOT NULL,
        user_agent text NOT NULL,
        window_width int(11) UNSIGNED NOT NULL,
        window_height int(11) UNSIGNED NOT NULL,
        time bigint(20) UNSIGNED NOT NULL,
        url text NOT NULL,
        created_at datetime DEFAULT CURRENT_TIMESTAMP NOT NULL,
        PRIMARY KEY (id)
    ) $charset_collate;";

    require_once ABSPATH . 'wp-admin/includes/upgrade.php';
    dbDelta($sql);
}

function my_plugin_update_check() {
    $current_version = get_option('thermal_display_db_version', '1.0');
    $new_version = '1.2';

    if ($current_version !== $new_version) {
        my_plugin_create_table();
        update_option('thermal_display_db_version', $new_version);
    }
}
add_action('admin_init', 'my_plugin_update_check');




function my_plugin_download_csv() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'thermal_dropin_stats';

    // Získání všech záznamů
    $logs = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC", ARRAY_A);

    if (empty($logs)) {
        wp_die('Žádná data k exportu.');
    }

    // Hlavičky pro stažení CSV
    header('Content-Type: text/csv; charset=UTF-8');
    header('Content-Disposition: attachment; filename="thermal_display_dropin_stats.csv"');

    // Otevření výstupního bufferu
    $output = fopen('php://output', 'w');

    // Hlavička CSV souboru
    fputcsv($output, array(
        'ID', 
        'IP', 
        'File Name', 
        'File Size (bytes)', 
        'Is Sequence', 
        'Num Frames', 
        'Width', 
        'Height',
        'File Timestamp', 
        'Data Type', 
        'User Agent', 
        'Window Width', 
        'Window Height', 
        'Time', 
        'URL', 
        'Created At'
    ));

	// Přidání záznamů do CSV
    foreach ($logs as $log) {
        // Odstranění středníků a čárek z každé hodnoty
        $safe_log = array_map(function ($value) {
            return is_string($value) ? str_replace([',', ';'], '', $value) : $value;
        }, $log);

        // Zapsání do CSV
        fputcsv($output, $safe_log);
    }

    fclose($output);
    exit;
}
add_action('wp_ajax_my_plugin_download_csv', 'my_plugin_download_csv');






// Přidání vlastní admin stránky
function my_plugin_add_admin_page() {
    add_menu_page(
        __("Thermal display usage","thermal-display"),  // Název stránky
        __("Thermal Display","thermal-display"),  // Název stránky v menu
        'manage_options', // Oprávnění
        'thermal-dropin-statistics', // Slug stránky
        'thermal_dropin_statistics_page_callback', // Callback funkce
        'dashicons-chart-area', // Ikona
        1000000000000000 // Pozice v menu
    );
}
add_action('admin_menu', 'my_plugin_add_admin_page');

function thermal_dropin_statistics_page_callback() {
    global $wpdb;
    $table_name = $wpdb->prefix . 'thermal_dropin_stats';

	$csv_url = admin_url('admin-ajax.php?action=my_plugin_download_csv');

    // Načtení dat
    $logs = $wpdb->get_results("SELECT * FROM $table_name ORDER BY created_at DESC");

    echo '<div class="wrap">';
    echo '<h1>' . __("Thermal display usage","thermal-display") . '</h1>';
	echo '<a href="' . esc_url($csv_url) . '" class="button button-primary" style="margin-bottom: 10px;">📥 ' . __("Download CSV","thermal-display") . '</a>';
    echo '<table class="wp-list-table widefat fixed striped">';
    echo "<thead>
            <tr>
				<th>" . __("Time") . "</th>
				<th>" . __("URL") . "</th>
                <th>" . __("IP") . "</th>
                <th>" . __("File name","thermal-display") . "</th>
                <th>" . __("File size (MB)","thermal-display") . ")</th>
                <th>" . __("Frames","thermal-display") . "</th>
                <th>" . __("Resolution","thermal-display") . "</th>
                <th>" . __("File recorded at","thermal-display") . "</th>
                <th>" . __("Browser","thermal-display") . "</th>
            </tr>
          </thead>";
    echo '<tbody>';

    foreach ($logs as $log) {
        echo '<tr>';
		echo '<td>' . date('Y-m-d H:i:s', $log->time / 1000) . '</td>';
		echo '<td><a href="' . esc_url($log->url) . '" target="_blank">'.esc_url($log->url).'</a></td>';
        echo '<td>' . esc_html($log->ip) . '</td>';
        echo '<td>' . esc_html($log->file_name) . '</td>';
        echo '<td>' . number_format($log->file_size / (1024 * 1024), 2) . '</td>';
        echo '<td>' . esc_html($log->file_num_frames) . '</td>';
        echo '<td>' . esc_html($log->file_width) . ' × ' . esc_html($log->file_height) . '</td>';
        echo '<td>' . date('Y-m-d H:i:s', $log->file_timestamp / 1000) . '</td>';
        echo '<td>' . esc_html($log->user_agent) . '</td>';
        
        
        echo '</tr>';
    }

    echo '</tbody>';
    echo '</table>';
    echo '</div>';
}


add_action('rest_api_init', 'my_plugin_register_api_routes');

function my_plugin_handle_api_request(WP_REST_Request $request) {
    global $wpdb;
    $table_name = $wpdb->prefix . 'thermal_dropin_stats';

    // Získání dat z JSON požadavku
    $params = $request->get_json_params();

    // Validace dat
    if (
        empty($params['ip']) || empty($params['fileName']) || !isset($params['fileSize']) ||
        !isset($params['fileIsSequence']) || !isset($params['fileNumFrames']) ||
        !isset($params['fileWidth']) || !isset($params['fileHeight']) ||
        !isset($params['fileTimestamp']) || !isset($params['fileDataType']) ||
        empty($params['userAgent']) || !isset($params['windowWidth']) ||
        !isset($params['windowHeight']) || !isset($params['time']) || empty($params['url'])
    ) {
        return new WP_REST_Response(['error' => 'Neplatná data'], 400);
    }

    // Uložení do databáze
    $wpdb->insert(
        $table_name,
        array(
            'ip'              => sanitize_text_field($params['ip']),
            'file_name'       => sanitize_text_field($params['fileName']),
            'file_size'       => intval($params['fileSize']),
            'file_is_sequence'=> intval($params['fileIsSequence']),
            'file_num_frames' => intval($params['fileNumFrames']),
            'file_width'      => intval($params['fileWidth']),
            'file_height'     => intval($params['fileHeight']),
            'file_timestamp'  => intval($params['fileTimestamp']),
            'file_data_type'  => intval($params['fileDataType']),
            'user_agent'      => sanitize_text_field($params['userAgent']),
            'window_width'    => intval($params['windowWidth']),
            'window_height'   => intval($params['windowHeight']),
            'time'            => intval($params['time']),
            'url'             => esc_url_raw($params['url']),
            'created_at'      => current_time('mysql', 1)
        ),
        array('%s', '%s', '%d', '%d', '%d', '%d', '%d', '%d', '%d', '%s', '%d', '%d', '%d', '%s', '%s')
    );

    if ($wpdb->last_error) {
        return new WP_REST_Response(['error' => 'Chyba při ukládání dat'], 500);
    }

    return new WP_REST_Response(['success' => 'Data uložena'], 200);
}

function my_plugin_register_api_routes() {
    register_rest_route('thermal-display/v1', '/log-dropin/', array(
        'methods'  => WP_REST_Server::CREATABLE,
        'callback' => 'my_plugin_handle_api_request',
        'permission_callback' => '__return_true',
    ));
}





