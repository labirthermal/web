import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	Tooltip,
	Button
} from '@wordpress/components';

import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';
import './editor.scss';
import { AppearencePanel } from '../utils/appearence/AppearencePanel';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	/** Register the webcomponents if not already */
	useRegisterIframeScript();

	const {
		t,
		v,
		vunits,
		ha
	} = attributes;

	console.log( t, v, vunits, ha );

	/**
	 * @param {number|undefined} value 
	 */
	const sanitizeValue = ( value ) => {

		const floatVal = parseFloat( value );

		if ( isNaN( floatVal ) ) {
			return undefined;
		}

		return floatVal;
	}


	return (
		<>
			<InspectorControls>

				<PanelBody title="Values">

					<NumberControl
						name="t"
						label="Air temperature"
						__next40pxDefaultSize
						value={t}
						min={273.15 * -1}
						max={1000}
						onChange={(nextValue) => setAttributes({ t: sanitizeValue( nextValue ) })}
					>
					</NumberControl>

					<NumberControl
						name="v"
						label="Wind speed"
						__next40pxDefaultSize
						value={v}
						onChange={(nextValue) => setAttributes({ v: sanitizeValue( nextValue ) })}
					>
					</NumberControl>

					<SelectControl
						name="vunits"
						label="Wind speed unit"
						value={vunits}
						options={[
							{
								value: "mps",
								label: "m/s"
							},
							{
								value: "kph",
								label: "km/h"
							}
						]}
						onChange={(value) => setAttributes({ vunits: value })}
					></SelectControl>

					<NumberControl
						name="t"
						label="Relative humidity"
						help="0 - 100 %"
						__next40pxDefaultSize
						value={ha}
						onChange={(nextValue) => setAttributes({ ha: sanitizeValue( nextValue ) })}
						min={0}
						max={100}
					>
					</NumberControl>

					<Button 
						variant='primary'
						onClick={() => setAttributes({
						t: undefined,
						v: undefined,
						ha: undefined,
						vunits: "mps"
					})}
					>Reset</Button>

					<AppearencePanel {...attributes} setter={setAttributes} />

					

				</PanelBody>

			</InspectorControls>


			<div {...useBlockProps()}>


				<Tooltip
					text="Click to edit"
					delay={300}
					hideOnClick={false}
				>

					<div>
						<div className="thermal__content-editor__container">
							<div>

								<apparent-temperature-aat
									t={t}
									v={v}
									ha={ha}
									vunits={vunits}
									style={{
										pointerEvents: "none"
									}}
									skin={attributes.skin}
									lines={attributes.lines}
									corners={attributes.corners}
								></apparent-temperature-aat>

								<div className="thermal__content-editor__wrapper">
									<div>Edit parameters in the sidebar.</div>
								</div>

							</div>
						</div>

					</div>

				</Tooltip>

			</div>

		</>
	);
}
