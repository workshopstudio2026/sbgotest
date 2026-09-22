<?php
/**
 * The main template file
 *
 * @package SB_GO_Theme
 */

get_header();
?>

<div id="root">
  <?php if (have_posts()) : ?>
    <div class="sr-only">
      <?php
      while (have_posts()) :
        the_post();
        the_title('<h1>', '</h1>');
        the_content();
      endwhile;
      ?>
    </div>
  <?php endif; ?>
</div>

<noscript>
  <div style="padding: 40px; text-align: center; font-family: sans-serif;">
    <h2>JavaScript Required</h2>
    <p>Please enable JavaScript in your browser to experience the SB GO website.</p>
  </div>
</noscript>

<?php
get_footer();
