<?php

/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$statistics = $attributes['statistics'];
$id = uniqid("dropin_");

?>

<div <?= get_block_wrapper_attributes(); ?>>

	<?php 
	/** 
	 * Store analysis data whenever 
	 * the attribute "statiscics" is on.
	 * */
	if ($statistics): ?>
		<!-- Store the dropin usage statistics -->
		<script>

			document.addEventListener('DOMContentLoaded', function() {

				const element = document.getElementById("<?= $id; ?>");

				if (element !== null) {

					element.addEventListener("uploaded", async ( event ) => {
						const response = await fetch('/wp-json/thermal-display/v1/log-dropin/', {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json'
							},
							body: JSON.stringify(event.detail)
						});
					});
					
				}
			});
		</script>

	<?php endif; ?>

	<thermal-dropin-app 
		id="<?= $id; ?>" 
		locale="<?= get_locale(); ?>"
		skin="<?= $attributes["skin"]; ?>"
		lines="<?= $attributes["lines"]; ?>"
		corners="<?= $attributes["corners"]; ?>"
	><?php if ($statistics):?><thermal-dialog label="<?= __( 'Privacy', 'thermal-display' ); ?>" slot="bar-pre">
		<thermal-button slot="invoker"><?= __( 'Privacy', 'thermal-display' ); ?></thermal-button>
		<div slot="content">
			<p><?= __("This module stores anonymised usage data.", 'thermal-display' ); ?></p>
			<p><strong><?= __("Why do we store the data?", 'thermal-display' ); ?></strong></p>
			<ul>
				<li><?= __("to know what browsers do our users use to access our app", 'thermal-display' ); ?></li>
				<li><?= __("to know what kind of files do our users work with", 'thermal-display' ); ?></li>
				<li><?= __("from which locations do our users access our app", 'thermal-display' ); ?></li>
			</ul>
			<p><?= __("These information help us develop the <code>thermal-dropin-app</code> webcomponent and other parts of the <code>@labirthermal/webcomponents</code> library.", 'thermal-display' ); ?></p>
			<p><strong><?= __("Where are the data stored?", 'thermal-display' ); ?></strong></p>
			<p><?php printf( __( 'The data are stored on the domain <a href="%1$s" target="_blank">%1$s</a> and are being viewed only by administrators of this particular website.', 'thermal-display' ), get_site_url() ); ?></p>
			<p><strong><?= __("What data are being stored?", 'thermal-display' ); ?></strong></p>
			<ul>
				<li><?= __("Time when you upload a file", 'thermal-display' ); ?></li>
				<li><?= __("File name", 'thermal-display' ); ?></li>
				<li><?= __("File resolution", 'thermal-display' ); ?></li>
				<li><?= __("File timestamp", 'thermal-display' ); ?></li>
				<li><?= __("File bytesize", 'thermal-display' ); ?></li>
				<li><?= __("File frame count", 'thermal-display' ); ?></li>
				<li><?= __("Yor current browser parameters (`userAgent`)", 'thermal-display' ); ?></li>
				<li><?= __("Your current browser size", 'thermal-display' ); ?></li>
				<li><?= __("Your current IP address", 'thermal-display' ); ?></li>
			</ul>
			<p><strong><?= __("What we do not do?", 'thermal-display' ); ?></strong></p>
			<p><?= __("We do not store the files you use here (we only store their parameters sucha as bytesize, framecount, resolution).", 'thermal-display' ); ?></p>
			<p><?= __("We do not store any information that could lead to your identification (all data are stored in an anonymised form).", 'thermal-display' ); ?></p>
		</div>
	</thermal-dialog>
	<?php endif; ?></thermal-dropin-app>

</div>