import { MediaUpload } from '@wordpress/block-editor';
import { Button, Placeholder } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Empty( { onSelect } ) {
	return (
		<Placeholder
			label={ __( 'Group of IR images', 'thermal-display' ) }
			instructions={ __(
				'Select one or more thermal files in the sidebar or add them here.',
				'thermal-display'
			) }
		>
			<MediaUpload
				allowedTypes={ [ 'application/octet-stream' ] }
				multiple
				onSelect={ onSelect }
				render={ ( { open } ) => (
					<Button onClick={ open } variant="primary">
						{ __( 'Select thermal files', 'thermal-display' ) }
					</Button>
				) }
			/>
		</Placeholder>
	);
}
