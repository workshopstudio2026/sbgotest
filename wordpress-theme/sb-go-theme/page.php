<?php
/**
 * The template for displaying all single pages
 * Full support for Elementor Free and native SB GO layouts
 *
 * @package SB_GO_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
  <?php
  if ( function_exists('sb_go_is_elementor') && sb_go_is_elementor() ) :
      // When edited with Elementor, render Elementor builder content
      while ( have_posts() ) :
          the_post();
          the_content();
      endwhile;
  else :
  ?>
    <div id="root">
      <?php
      // Standard WordPress loop fallback for SEO and accessibility
      while ( have_posts() ) :
          the_post();
          echo '<div class="sr-only">';
          the_content();
          echo '</div>';
      endwhile;
      ?>
    </div>
  <?php endif; ?>
</main>

<?php
get_footer();
