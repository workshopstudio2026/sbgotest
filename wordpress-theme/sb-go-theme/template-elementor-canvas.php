<?php
/**
 * Template Name: Elementor Canvas
 * Template Post Type: page, post
 *
 * Blank canvas template for Elementor landing pages without theme header or footer.
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

<div id="elementor-canvas-content" class="w-full min-h-screen">
  <?php
  while ( have_posts() ) :
      the_post();
      the_content();
  endwhile;
  ?>
</div>

<?php wp_footer(); ?>
</body>
</html>
