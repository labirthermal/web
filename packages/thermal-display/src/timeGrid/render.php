<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

 if ( !function_exists( "labir_aat_value_exists" ) ) {
	function labir_aat_value_exists( $value ) {
		return $value !== null;
	}
 }

 $url = $attributes["url"];
 $subfolder = $attributes["subfolder"];
 $by = $attributes["by"] ?? "days";
 $palette = $attributes["palette"] ?? "iron";

?>

<div <?= get_block_wrapper_attributes(); ?>>

		<remote-grid-app
 			locale="<?= get_locale(); ?>"
			<?php if ( labir_aat_value_exists($url) ): print( " url='{$url}'" ); endif; ?>
			<?php if ( labir_aat_value_exists( $subfolder ) ): echo " subfolder='{$subfolder}'"; endif; ?>
			<?php if ( labir_aat_value_exists( $by ) ): echo " by='{$by}'"; endif; ?>
			<?php if ( labir_aat_value_exists( $palette ) ): echo " palette='{$palette}'"; endif; ?>
			skin="<?= $attributes["skin"]; ?>"
			lines="<?= $attributes["lines"]; ?>"
			corners="<?= $attributes["corners"]; ?>"
		></remote-grid-app>

</div>


