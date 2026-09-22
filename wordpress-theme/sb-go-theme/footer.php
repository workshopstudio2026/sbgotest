<?php
/**
 * The footer for SB GO theme
 * Full support for Elementor Free and standard WordPress hooks
 *
 * @package SB_GO_Theme
 */

// 1. Check for Elementor custom footer location
if ( function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'footer' ) ) {
    // Custom footer rendered by Elementor
} elseif ( function_exists('sb_go_is_elementor') && sb_go_is_elementor() ) {
    // Standard clean footer for Elementor-designed pages
    ?>
    <footer class="bg-gray-950 text-white py-12 border-t border-gray-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center text-sm text-gray-400">
        <p>&copy; <?php echo date('Y'); ?> <?php bloginfo('name'); ?>. All Rights Reserved.</p>
        <?php
        if (has_nav_menu('footer')) {
            wp_nav_menu(array(
                'theme_location' => 'footer',
                'container'      => false,
                'menu_class'     => 'flex items-center space-x-4 text-xs text-gray-400',
                'fallback_cb'    => false,
            ));
        }
        ?>
      </div>
    </footer>
    <?php
}

wp_footer();
?>
</body>
</html>
