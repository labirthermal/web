<?php
/**
 * @see https://github.com/WordPress/gutenberg/blob/trunk/docs/reference-guides/block-api/block-metadata.md#render
 */

$thermal = $attributes['thermal'] ?? '';
if ( $thermal !== '' ) :
?>
<div <?php echo get_block_wrapper_attributes(); ?>>
	<thermal-file-app
		locale="<?php echo esc_attr( get_locale() ); ?>"
		thermal="<?php echo esc_attr( $thermal ); ?>"
		palette="<?php echo esc_attr( $attributes['palette'] ?? 'iron' ); ?>"
		unit="<?php echo esc_attr( $attributes['unit'] ?? 'C' ); ?>"
		opacity="<?php echo esc_attr( $attributes['opacity'] ?? 1 ); ?>"
		speed="<?php echo esc_attr( $attributes['speed'] ?? 1 ); ?>"
		ms="<?php echo esc_attr( $attributes['ms'] ?? 0 ); ?>"
		tool="<?php echo esc_attr( $attributes['tool'] ?? 'inspect' ); ?>"
		skin="<?php echo esc_attr( $attributes['skin'] ?? 'default' ); ?>"
		lines="<?php echo esc_attr( $attributes['lines'] ?? 'default' ); ?>"
		corners="<?php echo esc_attr( $attributes['corners'] ?? 'default' ); ?>"
		advanced-palettes
		data-interactive-analysis="<?php echo ( $attributes['interactiveanalysis'] ?? true ) ? 'true' : 'false'; ?>"
		<?php if ( isset( $attributes['visible'] ) && $attributes['visible'] !== '' ) : ?>
			visible="<?php echo esc_attr( $attributes['visible'] ); ?>"
		<?php endif; ?>
		<?php if ( isset( $attributes['author'] ) && $attributes['author'] !== '' ) : ?>
			author="<?php echo esc_attr( $attributes['author'] ); ?>"
		<?php endif; ?>
		<?php if ( isset( $attributes['license'] ) && $attributes['license'] !== '' ) : ?>
			license="<?php echo esc_attr( $attributes['license'] ); ?>"
		<?php endif; ?>
		<?php if ( isset( $attributes['label'] ) && $attributes['label'] !== '' ) : ?>
			label="<?php echo esc_attr( $attributes['label'] ); ?>"
		<?php endif; ?>
		<?php if ( isset( $attributes['from'] ) && isset( $attributes['to'] ) ) : ?>
			from="<?php echo esc_attr( $attributes['from'] ); ?>"
			to="<?php echo esc_attr( $attributes['to'] ); ?>"
		<?php endif; ?>
		<?php if ( ! empty( $attributes['autohighlight'] ) ) : ?>
			autohighlight
		<?php endif; ?>
		<?php if ( ! empty( $attributes['showfullscreen'] ) ) : ?>
			show-fullscreen
		<?php endif; ?>
		<?php if ( ! empty( $attributes['smooththermograms'] ) ) : ?>
			smooth-thermograms
		<?php endif; ?>
		<?php if ( ! empty( $attributes['smoothgraph'] ) ) : ?>
			smooth-graph
		<?php endif; ?>
		<?php for ( $i = 1; $i <= 7; $i++ ) :
			$key = 'analysis' . $i;
			if ( isset( $attributes[ $key ] ) && $attributes[ $key ] !== '' ) :
		?>
			<?php echo esc_attr( $key ); ?>="<?php echo esc_attr( $attributes[ $key ] ); ?>"
		<?php
			endif;
		endfor;
		?>
	></thermal-file-app>
</div>
<?php endif; ?>
