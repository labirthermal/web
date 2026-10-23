<?php

/**
 * Handle CPT for thermal-display dropin statistics
 * 
 * @package ThermalDisplay
 */

 function thermal_display_cpt_register() {
	register_post_type('thermal_dropin',
		array(
			'labels'      => array(
				'name'          => "Dropin statistics",
				'singular_name' => "Dropped-in file",
			),
				'public'      => false,
				'has_archive' => false,
                'show_ui' => true,
                'exclude_from_search' => true,
                'publicly_queryable' => false,
                'show_in_nav_menus' => false,
                'show_in_admin_bar' => false,
                'show_in_rest' => false,
                'menu_icon' => 'dashicons-chart-area',
                'capability_type' => 'page',
                'supports' => [ "custom-fields", 'title' ],
                'can_export' => false
		)
	);
}
add_action('init', 'thermal_display_cpt_register');
