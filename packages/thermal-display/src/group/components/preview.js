import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { useWebcomponent } from '../../app/hooks/useWebcomponent';

export default function GroupPreview( { ID, attributes, setAttributes } ) {
	const onReady = useCallback(
		( element ) => {
			const palette = element.managerController.managerObject.palette;
			const unit = element.managerController.managerObject.unit;
			const range = element.registryController.registryObject.range;
			const paletteKey = `${ ID }_palette`;
			const unitKey = `${ ID }_unit`;
			const rangeKey = `${ ID }_range`;

			palette.addListener( paletteKey, ( value ) =>
				setAttributes( { palette: value } )
			);
			unit.addListener( unitKey, ( value ) =>
				setAttributes( { unit: value } )
			);
			range.addListener( rangeKey, ( value ) => {
				if ( value ) {
					setAttributes( {
						from: element.managerController.toCurrentUnit(
							value.from
						),
						to: element.managerController.toCurrentUnit( value.to ),
					} );
				} else {
					setAttributes( { from: undefined, to: undefined } );
				}
			} );

			return () => {
				palette.removeListener( paletteKey );
				unit.removeListener( unitKey );
				range.removeListener( rangeKey );
			};
		},
		[ ID, setAttributes ]
	);

	const webcomponentRef = useWebcomponent( onReady );

	return (
		<Tooltip
			text={ __( 'Click to edit', 'thermal-display' ) }
			delay={ 300 }
			hideOnClick={ false }
		>
			<div>
				<div className="thermal__content-editor__container">
					<div>
						<thermal-group-app
							ref={ webcomponentRef }
							group-files={ attributes.files }
							label={ attributes.label }
							author={ attributes.author }
							license={ attributes.license }
							palette={ attributes.palette }
							unit={ attributes.unit }
							from={ attributes.from }
							to={ attributes.to }
							opacity={ attributes.opacity }
							tool={ attributes.tool }
							autohighlight={ attributes.autohighlight }
							show-fullscreen={ attributes.showfullscreen }
							smooth-thermograms={ attributes.smooththermograms }
							smooth-graph={ attributes.smoothgraph }
							advanced-palettes
							autoclear-group
							skin={ attributes.skin }
							lines={ attributes.lines }
							corners={ attributes.corners }
							analysis1={ attributes.analysis1 }
							analysis2={ attributes.analysis2 }
							analysis3={ attributes.analysis3 }
							analysis4={ attributes.analysis4 }
							analysis5={ attributes.analysis5 }
							analysis6={ attributes.analysis6 }
							analysis7={ attributes.analysis7 }
						></thermal-group-app>
					</div>
					<div className="thermal__content-editor__wrapper">
						<div>
							{ __(
								'Edit parameters in the sidebar.',
								'thermal-display'
							) }
						</div>
					</div>
				</div>
			</div>
		</Tooltip>
	);
}
