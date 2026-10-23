<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

if ( !function_exists( "analysis_is_set" ) ) {
	function analysis_is_set( $value ) {
		return $value !== null && $value !== "";
	}
}

?>

<?php if ( $attributes["files"] ): ?>

<div <?= get_block_wrapper_attributes(); ?>>
	

		<thermal-group-app
			locale="<?= get_locale(); ?>"
			<?php if (analysis_is_set( $attributes["visible"] ) ) { echo 'visible="'.$attributes["visible"].'"'; } ?>
			palette="<?= $attributes["palette"]; ?>"
			author="<?= $attributes["author"] ?>" 
			license="<?= $attributes["license"] ?>"
			<?php if ( $attributes["label"] ) { echo "label='" . $attributes["label"] . "'"; }  else { echo ""; } ?>
			description="<?= $attributes["description"] ?>"
			<?php if ( $attributes["from"] && $attributes["to"] ): ?>
				from="<?= $attributes["from"] ?>"
				to="<?= $attributes["to"]; ?>"
			<?php endif; ?>
			files="<?= $attributes["files"] ?>"
			columns="<?= $attributes["columns"] ?>"
			<?php if (analysis_is_set( $attributes["speed"] ) ) { echo 'speed="'.$attributes["speed"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["opacity"] ) ) { echo 'opacity="'.$attributes["opacity"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis1"] ) ) { echo 'analysis1="'.$attributes["analysis1"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis2"] ) ) { echo 'analysis2="'.$attributes["analysis2"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis3"] ) ) { echo 'analysis3="'.$attributes["analysis3"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis4"] ) ) { echo 'analysis4="'.$attributes["analysis4"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis5"] ) ) { echo 'analysis5="'.$attributes["analysis5"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis6"] ) ) { echo 'analysis6="'.$attributes["analysis6"].'"'; } ?>
			<?php if (analysis_is_set( $attributes["analysis7"] ) ) { echo 'analysis7="'.$attributes["analysis7"].'"'; } ?>
			showhistogram="<?= $attributes["showhistogram"] ? "true": "false" ?>"
			showabout="<?= $attributes["showabout"] ? "true": "false" ?>"
			interactiveanalysis="<?= $attributes["interactiveanalysis"] ? "true": "false" ?>"
			preservetime="<?= $attributes["preservetime"] ? "true" : "false" ?>"
			skin="<?= $attributes["skin"]; ?>"
			lines="<?= $attributes["lines"]; ?>"
			corners="<?= $attributes["corners"]; ?>"
		></thermal-group-app>

</div>

<?php endif; ?>


