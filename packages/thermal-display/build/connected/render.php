<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

// Vytvoř manažera
$manager = new WallManager(true);

$authUrl = $manager->getAuthUrl();
$authToken = $manager->getAuthToken();


// Eventuálně procesuj formulář

// Připrav si údaje pro vykreslení
$isLoggedIn = $manager->isLoggedIn();

// Prepare the folder path
$folder = esc_attr( $attributes["path"] );
$lockedLocation = esc_attr( $attributes["pathLock"] );
$replaceWithLogin = esc_attr( $attributes["replaceWithLogin"] );

if ( $replaceWithLogin && $isLoggedIn ) {
	$identity = $manager->getUserFromTransient();
	$user = $identity["login"]["user"];
	$folder = str_replace( $replaceWithLogin, $user, $folder );
	$lockedLocation = str_replace( $replaceWithLogin, $user, $lockedLocation );
}


?>

<div <?= get_block_wrapper_attributes(); ?>>

	<connected-app
		server-url="<?= esc_attr($attributes["serverUrl"]); ?>"
		api-root="<?= esc_attr($attributes["apiRoot"]); ?>"
		folder-path="<?= $folder; ?>"
		locked-location="<?= $lockedLocation; ?>"
		<?php if ($attributes["fileName"]) : ?>file-name="<?= esc_attr($attributes["fileName"]); ?>" <?php endif; ?>
		palette="<?= esc_attr($attributes["palette"]); ?>"
		displaymode="<?= esc_attr($attributes["displayMode"]); ?>"
		folder-mode="<?= esc_attr($attributes["folderMode"]); ?>"
		grid-grouping="<?= esc_attr($attributes["by"]); ?>"
		<?= $authUrl && $authToken ? 'auth-url="' . esc_attr($authUrl) . '" auth-token="' . esc_attr($authToken) . '"' : "" ?>
		<?= $attributes["disableLogging"] ? 'disable-logging="true"' : "" ?>

		<?= $attributes["label"] ? "label='" . esc_attr($attributes["label"]) . "'" : "" ?>
		<?= $attributes["labelTooltip"] ? "label-tooltip='" . esc_attr($attributes["labelTooltip"]) . "'" : "" ?>
		<?= $attributes["labelIcon"] ? "label-icon='" . esc_attr($attributes["labelIcon"]) . "'" : "" ?>
		<?= $attributes["labelIconStyle"] ? "label-icon-style='" . esc_attr($attributes["labelIconStyle"]) . "'" : "" ?>
		<?= $attributes["labelVariant"] ? "label-variant='" . esc_attr($attributes["labelVariant"]) . "'" : "" ?>
		skin="<?= $attributes["skin"]; ?>"
		lines="<?= $attributes["lines"]; ?>"
		corners="<?= $attributes["corners"]; ?>"
	></connected-app>

</div>