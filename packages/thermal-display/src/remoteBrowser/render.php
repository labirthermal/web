<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

 if ( !function_exists( "labir_remoteBrowser_attr_exists" ) ) {
	function labir_remoteBrowser_attr_exists( $value ) {
		return $value !== null;
	}
 }

 $url = $attributes["url"];
 $subfolder = $attributes["subfolder"];
 $by = $attributes["by"] ?? "days";
 $palette = $attributes["palette"] ?? "iron";
 $author = $attributes["author"];
 $license = $attributes["license"];
 $label = $attributes["label"];

?>

<div <?= get_block_wrapper_attributes(); ?>>

		<remote-browser-app
 			locale="<?= get_locale(); ?>"
			<?php if ( labir_remoteBrowser_attr_exists($url) ): print( " url='{$url}'" ); endif; ?>
			<?php if ( labir_remoteBrowser_attr_exists( $subfolder ) ): echo " subfolder='{$subfolder}'"; endif; ?>
			<?php if ( labir_remoteBrowser_attr_exists( $palette ) ): echo " palette='{$palette}'"; endif; ?>
			<?php if ( labir_remoteBrowser_attr_exists( $author ) ): echo " author='{$author}'"; endif; ?>
			<?php if ( labir_remoteBrowser_attr_exists( $license ) ): echo " license='{$license}'"; endif; ?>
			<?php if ( labir_remoteBrowser_attr_exists( $label ) ): echo " label='{$label}'"; endif; ?>
			enablegrouping="<?= $attributes["enablegrouping"] ? 'true' : 'false'; ?>"
			skin="<?= $attributes["skin"]; ?>"
			lines="<?= $attributes["lines"]; ?>"
			corners="<?= $attributes["corners"]; ?>"
		></remote-browser-app>

</div>


