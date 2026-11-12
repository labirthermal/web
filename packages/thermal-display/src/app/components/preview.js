import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useCallback } from '@wordpress/element';
import { useWebcomponent } from '../hooks/useWebcomponent';

/**
 * Preview of the webcomponent used when a file is provided.
 *
 * @param {Object} props            Component props.
 * @param {string} props.ID         Stable manager identifier.
 * @param {Object} props.attributes WordPress block attributes.
 */
export default function Preview( { ID, attributes } ) {
	const {
		palette,
		thermal,
		opacity,
		visible,
		label,
		author,
		license,
		from,
		to,
		analysis1,
		analysis2,
		analysis3,
		analysis4,
		analysis5,
		analysis6,
		analysis7,
		speed,
		skin,
		lines,
		corners,
		ms,
		unit,
		tool,
		autohighlight,
		interactiveanalysis,
		showfullscreen,
		smooththermograms,
		smoothgraph,
	} = attributes;

	const onReady = useCallback(
		( element ) => {
			element.interactiveAnalysis = interactiveanalysis ?? true;
		},
		[ interactiveanalysis ]
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
						<thermal-file-app
							ref={ webcomponentRef }
							manager-slug={ ID }
							thermal={ thermal }
							visible={ visible }
							palette={ palette }
							author={ author }
							license={ license }
							label={ label }
							from={ from }
							to={ to }
							opacity={ opacity }
							analysis1={ analysis1 }
							analysis2={ analysis2 }
							analysis3={ analysis3 }
							analysis4={ analysis4 }
							analysis5={ analysis5 }
							analysis6={ analysis6 }
							analysis7={ analysis7 }
							ms={ ms }
							speed={ speed }
							advanced-palettes
							unit={ unit }
							tool={ tool }
							autohighlight={ autohighlight }
							show-fullscreen={ showfullscreen }
							smooth-thermograms={ smooththermograms }
							smooth-graph={ smoothgraph }
							skin={ skin }
							lines={ lines }
							corners={ corners }
						></thermal-file-app>
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
