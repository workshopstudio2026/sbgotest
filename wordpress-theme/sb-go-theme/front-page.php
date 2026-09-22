<?php
/**
 * The template for displaying the front page
 * Supports both Elementor Free drag-and-drop page building and SB GO native React experience
 *
 * @package SB_GO_Theme
 */

get_header();
?>

<main id="primary" class="site-main">
  <?php
  if ( function_exists('sb_go_is_elementor') && sb_go_is_elementor() ) :
      // When front page is customized via Elementor visual builder
      while ( have_posts() ) :
          the_post();
          the_content();
      endwhile;
  else :
  ?>
    <div id="root">
      <?php
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
