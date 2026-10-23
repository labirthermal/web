<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

 if ( !function_exists( "labir_aat_value_exists" ) ) {
	function labir_aat_value_exists( $value ) {
		return $value !== null;
	}
 }

 $t = $attributes["t"];
 $v = $attributes["v"];
 $ha = $attributes["ha"];

?>

<div <?= get_block_wrapper_attributes(); ?>>

		<apparent-temperature-aat
 			locale="<?= get_locale(); ?>"
			<?php if ( labir_aat_value_exists($t) ): print( " t='{$t}'" ); endif; ?>
			<?php if ( labir_aat_value_exists( $v ) ): echo " v='{$v}'"; endif; ?>
			<?php if ( labir_aat_value_exists( $ha ) ): echo " ha='{$ha}'"; endif; ?>
			vunits="<?= $attributes["vunits"];?>"
			skin="<?= $attributes["skin"]; ?>"
			lines="<?= $attributes["lines"]; ?>"
			corners="<?= $attributes["corners"]; ?>"
		></apparent-temperature-aat>

</div>


