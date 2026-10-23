<?php

/**
 * Enable uploading of LRC images
 */

if ( ! function_exists( 'thermal_display_mime' ) ) {

    function thermal_display_mime( $mimes = array() ) {

        $mimes['lrc'] = "application/octet-stream";

        return $mimes;

    }

    add_action( 'upload_mimes', 'thermal_display_mime' );

}