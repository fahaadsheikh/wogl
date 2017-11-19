<?php 


function woogl_enqueue_assets() {

    if ( is_child_theme() ) :
        // load parent stylesheet first if this is a child theme
		wp_enqueue_style( 'wogl-stylesheet', trailingslashit( get_template_directory_uri() ) . 'wg_assets/css/wogl.min.css', false );
		wp_enqueue_script( 'wogl-javascript', get_template_directory_uri() . 'wg_assets/css/wogl.min.js', array(), '1.0.0', true );
    else :
	    // load active theme stylesheet in both cases
		wp_enqueue_style( 'wogl-stylesheet', trailingslashit( get_stylesheet_directory_uri() ) . 'wg_assets/css/wogl.min.css', false );
		wp_enqueue_script( 'wogl-javascript', get_stylesheet_directory_uri() . 'wg_assets/css/wogl.min.js', array(), '1.0.0', true );
	endif;

}

add_action( 'wp_enqueue_scripts', 'woogl_enqueue_assets' );