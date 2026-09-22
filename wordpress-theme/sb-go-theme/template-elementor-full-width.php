<?php
/**
 * Template Name: Elementor Full Width
 * Template Post Type: page, post
 *
 * Full width page template designed for Elementor Free & Pro page builder.
 *
 * @package SB_GO_Theme
 */

get_header();
?>

<div id="elementor-content" class="w-full">
  <?php
  while ( have_posts() ) :
      the_post();
      the_content();
  endwhile;
  ?>
</div>

<?php
get_footer();
