<?php
/**
 * The header for SB GO theme
 * Full support for Elementor Free and standard WordPress menus
 *
 * @package SB_GO_Theme
 */
?><!DOCTYPE html>
<html <?php language_attributes(); ?> class="scroll-smooth">
<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="profile" href="https://gmpg.org/xfn/11">
  <?php wp_head(); ?>
</head>
<body <?php body_class('bg-white text-gray-900 antialiased selection:bg-sb-yellow selection:text-black'); ?>>
<?php wp_body_open(); ?>

<?php
// 1. Check for Elementor custom header location
if ( function_exists( 'elementor_theme_do_location' ) && elementor_theme_do_location( 'header' ) ) {
    // Custom header rendered by Elementor
} elseif ( function_exists('sb_go_is_elementor') && sb_go_is_elementor() ) {
    // Standard clean header for Elementor-designed pages
    ?>
    <header class="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        <div class="flex items-center gap-4">
          <a href="<?php echo esc_url(home_url('/')); ?>" class="flex items-center">
            <?php
            if (has_custom_logo()) {
                the_custom_logo();
            } else {
                echo '<span class="text-2xl font-black tracking-tight text-blue-900">SB <span class="text-amber-500">GO</span></span>';
            }
            ?>
          </a>
        </div>
        <nav class="hidden md:flex items-center space-x-6">
          <?php
          if (has_nav_menu('primary')) {
              wp_nav_menu(array(
                  'theme_location' => 'primary',
                  'container'      => false,
                  'menu_class'     => 'flex items-center space-x-6 font-semibold text-gray-800 hover:text-blue-900',
                  'fallback_cb'    => false,
              ));
          } else {
              echo '<a href="' . esc_url(home_url('/')) . '" class="font-semibold text-gray-800 hover:text-blue-900">Home</a>';
              echo '<a href="' . esc_url(home_url('/about')) . '" class="font-semibold text-gray-800 hover:text-blue-900">About Us</a>';
              echo '<a href="' . esc_url(home_url('/contact')) . '" class="font-semibold text-gray-800 hover:text-blue-900">Contact Us</a>';
          }
          ?>
          <a href="https://forms.gle/p925jRAuBKBpQZ5o7" target="_blank" rel="noopener noreferrer" class="bg-blue-900 text-white px-5 py-2.5 font-bold text-sm hover:bg-blue-800 transition-colors shadow-sm">
            Franchise Enquiry
          </a>
        </nav>
      </div>
    </header>
    <?php
}
?>
