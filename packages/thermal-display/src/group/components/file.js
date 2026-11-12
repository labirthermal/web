import { MediaUpload } from '@wordpress/block-editor';
import { Button, PanelBody, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function GroupFile( {
	file,
	updateFileLabel,
	updateFileVisible,
	removeFile,
} ) {
	const title = file.label || file.thermal.split( '/' ).pop();

	return (
		<PanelBody title={ title } initialOpen={ false }>
			<TextControl
				label={ __( 'Label', 'thermal-display' ) }
				value={ file.label || '' }
				onChange={ ( value ) => updateFileLabel( file.thermal, value ) }
			/>
			{ file.visible && (
				<img
					src={ file.visible }
					alt=""
					style={ {
						display: 'block',
						maxWidth: '100%',
						marginBottom: '0.5rem',
					} }
				/>
			) }
			<MediaUpload
				allowedTypes={ [ 'image' ] }
				onSelect={ ( image ) =>
					updateFileVisible( file.thermal, image.url )
				}
				render={ ( { open } ) => (
					<Button onClick={ open } variant="secondary" size="compact">
						{ file.visible
							? __( 'Change visible image', 'thermal-display' )
							: __( 'Add visible image', 'thermal-display' ) }
					</Button>
				) }
			/>
			{ file.visible && (
				<Button
					onClick={ () =>
						updateFileVisible( file.thermal, undefined )
					}
					variant="tertiary"
					size="compact"
				>
					{ __( 'Remove visible image', 'thermal-display' ) }
				</Button>
			) }
			<div style={ { marginTop: '0.75rem' } }>
				<Button
					onClick={ () => removeFile( file.thermal ) }
					variant="secondary"
					isDestructive
					size="compact"
				>
					{ __( 'Remove file', 'thermal-display' ) }
				</Button>
			</div>
		</PanelBody>
	);
}
