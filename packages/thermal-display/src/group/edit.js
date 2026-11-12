import {
	InspectorControls,
	MediaUpload,
	MediaUploadCheck,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	Button,
	CheckboxControl,
	PanelBody,
	RangeControl,
	SelectControl,
	TextControl,
} from '@wordpress/components';
import { useCallback, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { AppearencePanel } from '../utils/appearence/AppearencePanel';
import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';
import { useFiles } from './hooks/useFiles';
import Empty from './components/empty';
import GroupFile from './components/file';
import GroupPreview from './components/preview';
import './editor.scss';

const paletteOptions = [
	{ label: 'Iron', value: 'iron' },
	{ label: 'Jet', value: 'jet' },
	{ label: 'White hot', value: 'white_hot' },
	{ label: 'Black hot', value: 'black_hot' },
	{ label: 'Lava', value: 'lava' },
	{ label: 'Arctic', value: 'arctic' },
	{ label: 'Rainbow', value: 'rainbow' },
	{ label: 'Rainbow high contrast', value: 'rainbow_hc' },
];

export default function EditGroup( { attributes, setAttributes } ) {
	const ID = useMemo( () => Math.random().toString(), [] );
	useRegisterIframeScript();

	const {
		files,
		parsed,
		removeFile,
		syncUrls,
		updateFileLabel,
		updateFileVisible,
	} = useFiles( attributes.files );

	useEffect( () => {
		if ( parsed !== attributes.files ) {
			setAttributes( { files: parsed } );
		}
	}, [ parsed, attributes.files, setAttributes ] );

	const onFilesSelect = useCallback(
		( selectedFiles ) => {
			if ( Array.isArray( selectedFiles ) ) {
				syncUrls( selectedFiles.map( ( file ) => file.url ) );
			}
		},
		[ syncUrls ]
	);

	const updateRangeEndpoint = useCallback(
		( key, value ) => {
			if ( value === '' ) {
				setAttributes( { from: undefined, to: undefined } );
				return;
			}

			const numericValue = Number( value );
			const otherEndpoint =
				key === 'from' ? attributes.to : attributes.from;
			setAttributes( {
				from:
					key === 'from'
						? numericValue
						: ( otherEndpoint ?? numericValue ),
				to:
					key === 'to'
						? numericValue
						: ( otherEndpoint ?? numericValue ),
			} );
		},
		[ attributes.from, attributes.to, setAttributes ]
	);

	return (
		<>
			<MediaUploadCheck>
				<InspectorControls>
					<PanelBody
						title={ __( 'Thermal files', 'thermal-display' ) }
						initialOpen
					>
						<MediaUpload
							allowedTypes={ [ 'application/octet-stream' ] }
							multiple
							onSelect={ onFilesSelect }
							render={ ( { open } ) => (
								<Button onClick={ open } variant="primary">
									{ __(
										'Select thermal files',
										'thermal-display'
									) }
								</Button>
							) }
						/>
						{ Object.values( files ).map( ( file ) => (
							<GroupFile
								key={ file.thermal }
								file={ file }
								updateFileLabel={ updateFileLabel }
								updateFileVisible={ updateFileVisible }
								removeFile={ removeFile }
							/>
						) ) }
					</PanelBody>

					<PanelBody
						title={ __( 'Information', 'thermal-display' ) }
						initialOpen={ false }
					>
						<TextControl
							label={ __( 'Label', 'thermal-display' ) }
							value={ attributes.label || '' }
							onChange={ ( value ) =>
								setAttributes( { label: value } )
							}
						/>
						<TextControl
							label={ __( 'Author', 'thermal-display' ) }
							value={ attributes.author || '' }
							onChange={ ( value ) =>
								setAttributes( { author: value } )
							}
						/>
						<TextControl
							label={ __( 'License', 'thermal-display' ) }
							value={ attributes.license || '' }
							onChange={ ( value ) =>
								setAttributes( { license: value } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __(
							'Application settings',
							'thermal-display'
						) }
						initialOpen={ false }
					>
						<SelectControl
							label={ __( 'Colour palette', 'thermal-display' ) }
							value={ attributes.palette }
							options={ paletteOptions }
							onChange={ ( value ) =>
								setAttributes( { palette: value } )
							}
						/>
						<SelectControl
							label={ __(
								'Temperature unit',
								'thermal-display'
							) }
							value={ attributes.unit }
							options={ [
								{ label: 'Celsius', value: 'C' },
								{ label: 'Fahrenheit', value: 'F' },
								{ label: 'Kelvin', value: 'K' },
							] }
							onChange={ ( value ) =>
								setAttributes( { unit: value } )
							}
						/>
						<RangeControl
							label={ __(
								'Thermogram opacity',
								'thermal-display'
							) }
							value={ attributes.opacity }
							min={ 0 }
							max={ 1 }
							step={ 0.01 }
							onChange={ ( value ) =>
								setAttributes( { opacity: value } )
							}
						/>
						<TextControl
							type="number"
							label={ __(
								'Initial range minimum',
								'thermal-display'
							) }
							help={ __(
								'Set both range endpoints to use an initial range.',
								'thermal-display'
							) }
							value={ attributes.from ?? '' }
							onChange={ ( value ) =>
								updateRangeEndpoint( 'from', value )
							}
						/>
						<TextControl
							type="number"
							label={ __(
								'Initial range maximum',
								'thermal-display'
							) }
							help={ __(
								'Set both range endpoints to use an initial range.',
								'thermal-display'
							) }
							value={ attributes.to ?? '' }
							onChange={ ( value ) =>
								updateRangeEndpoint( 'to', value )
							}
						/>
						<SelectControl
							label={ __(
								'Initial analysis tool',
								'thermal-display'
							) }
							value={ attributes.tool }
							options={ [
								{
									label: __( 'Inspect', 'thermal-display' ),
									value: 'inspect',
								},
								{
									label: __( 'Add point', 'thermal-display' ),
									value: 'add-point',
								},
								{
									label: __(
										'Add rectangle',
										'thermal-display'
									),
									value: 'add-rect',
								},
								{
									label: __(
										'Add ellipse',
										'thermal-display'
									),
									value: 'add-ellipsis',
								},
								{
									label: __( 'Edit', 'thermal-display' ),
									value: 'edit',
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { tool: value } )
							}
						/>
						<CheckboxControl
							label={ __(
								'Highlight the selected file on hover',
								'thermal-display'
							) }
							checked={ attributes.autohighlight }
							onChange={ ( value ) =>
								setAttributes( { autohighlight: value } )
							}
						/>
						<CheckboxControl
							label={ __(
								'Show fullscreen button',
								'thermal-display'
							) }
							checked={ attributes.showfullscreen }
							onChange={ ( value ) =>
								setAttributes( { showfullscreen: value } )
							}
						/>
						<CheckboxControl
							label={ __(
								'Smooth thermograms',
								'thermal-display'
							) }
							checked={ attributes.smooththermograms }
							onChange={ ( value ) =>
								setAttributes( { smooththermograms: value } )
							}
						/>
						<CheckboxControl
							label={ __(
								'Smooth analysis graphs',
								'thermal-display'
							) }
							checked={ attributes.smoothgraph }
							onChange={ ( value ) =>
								setAttributes( { smoothgraph: value } )
							}
						/>
					</PanelBody>

					<PanelBody
						title={ __( 'Appearance settings', 'thermal-display' ) }
						initialOpen={ false }
					>
						<AppearencePanel
							{ ...attributes }
							setter={ setAttributes }
						/>
					</PanelBody>
				</InspectorControls>
			</MediaUploadCheck>

			<div { ...useBlockProps() }>
				{ parsed ? (
					<GroupPreview
						ID={ ID }
						attributes={ { ...attributes, files: parsed } }
						setAttributes={ setAttributes }
					/>
				) : (
					<Empty onSelect={ onFilesSelect } />
				) }
			</div>
		</>
	);
}
