import {
	InspectorControls,
	MediaUploadCheck,
	useBlockProps
} from '@wordpress/block-editor';
import {
	Button,
	ButtonGroup,
	PanelBody,
	RangeControl,
	TextControl
} from '@wordpress/components';
import { useMemo, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { AnalysisEditorModal } from '../utils/analysisEditor/AnalysisEditorModal';
import { useAnalysisEditor } from '../utils/analysisEditor/useAnalysisEditor';
import { AppearencePanel } from '../utils/appearence/AppearencePanel';
import { EditorModal } from '../utils/editor/EditorModal';
import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';
import Change from './components/change';
import Empty from './components/empty';
import Field from './components/field';
import Ms from './components/ms';
import Palettes from './components/palette';
import Preview from './components/preview';
import Range from './components/range';
import Speed from './components/speed';
import Thumbnail from './components/thumbnail';
import Unit from './components/unit';
import Visible from './components/visible';
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {

	const ID = useMemo(() => Math.random().toString(), []);

	/** Register the webcomponents if not already */
	useRegisterIframeScript();

	const {
		palette,
		thermal,
		opacity,
		visible,
		label,
		labeltooltip,
		author,
		license,
		from,
		to,
		ms,
		speed,
		unit
	} = attributes;

	const [hasEditor, setHasEditor] = useState(false);
	const [isSequence, setIsSequence] = useState(false);

	const { open, setOpen } = useAnalysisEditor();

	return (
		<>

			{hasEditor === true &&
				<EditorModal
					attributes={attributes}
					setAttributes={setAttributes}
					onClose={setHasEditor}
				/>
			}

			{open === true && <AnalysisEditorModal
				thermal={thermal}
				open={open}
				setOpen={setOpen}
				attributes={attributes}
				setAttributes={setAttributes}
			/>}

			<MediaUploadCheck>

				<InspectorControls >

					<PanelBody 
						title={__("Thermal file", "thermal-display")}
						initialOpen={true}
					>

						{thermal && <Thumbnail
							ID={ID}
							thermal={thermal}
							palette={palette}
							from={from}
							to={to}
							setIsSequence={setIsSequence}
							ms={ms}
							unit={unit}
						/>}

						<div style={{ marginBottom: "1rem", marginTop: thermal ? "1rem" : "0" }}>

							<ButtonGroup>

								<Change
									attributes={attributes}
									setAttributes={setAttributes}
								/>

								{thermal &&
									<Button
										variant="secondary"
										size='compact'
										onClick={() => setHasEditor(true)}
									>{__("Editor", "thermal-display")}</Button>
								}

							</ButtonGroup>
						</div>


					</PanelBody>

					<PanelBody 
						title={__("Visible file", "thermal-display")}
						initialOpen={false}
					>

						<div>
							{visible && <img src={visible} />}

							<Visible
								attributes={attributes}
								setAttributes={setAttributes}
							/>

						</div>

						{visible && <div
							style={{ paddingTop: "1rem" }}
						>
							<RangeControl
								__nextHasNoMarginBottom
								label={__("IR image opacity", "thermal-display")}
								help={__("If a visible file is provided, you can set the initial transparency of the thermal file.", "thermal-display")}
								value={opacity}
								onChange={(value) => setAttributes({ opacity: value })}
								min={0}
								max={1}
								step={0.01}
							/>
						</div>}


					</PanelBody>

					<PanelBody 
						title={__("Information", "thermal-display")}
						initialOpen={false}
					>

						<TextControl
							label={__(
								'Label',
								'thermal-display'
							)}
							help={__("Label appears on the black button on top & left of the app.", "thermal-display")}
							value={label || ''}
							onChange={(value) =>
								setAttributes({ label: value })
							}
						/>

						<TextControl
							label={__(
								'Label tooltip',
								'thermal-display'
							)}
							help={
								__("Label tooltip appears when the user hovers the top-left button containing the label", "thermal-display") + ` "${label}".`}
							value={labeltooltip || ''}
							onChange={(value) =>
								setAttributes({ labeltooltip: value })
							}
						/>

						<TextControl
							label={__(
								'Author',
								'thermal-display'
							)}
							value={author || ''}
							onChange={(value) =>
								setAttributes({ author: value })
							}
						/>

						<TextControl
							label={__(
								'License',
								'thermal-display'
							)}
							value={license || ''}
							onChange={(value) =>
								setAttributes({ license: value })
							}
						/>

					</PanelBody>

					<PanelBody 
						title={__("Thermal display settings", "thermal-display")} 
						initialOpen={false}
					>

						<Field
							label={__("Thermal range", "thermal-display")}
							description={__("Adjust the default thermal range.", "thermal-display")}
						>
							<Range
								ID={ID}
								unit={unit}
								setAttributes={setAttributes}
							/>
						</Field>

						<Field
							label={__("Colour palette", "thermal-display")}
							description={__("Select the colour palette for the thermal display.", "thermal-display")}
						>
							<Palettes
								ID={ID}
								palette={palette}
								unit={unit}
								setAttributes={setAttributes}
							/>
						</Field>


						<Field
							label={__("Thermal Unit", "thermal-display")}
							description={__("Select the unit for the thermal display.", "thermal-display")}
						>
							<Unit
								ID={ID}
								unit={unit}
								setAttributes={setAttributes}
							/>
						</Field>

					</PanelBody>

					{isSequence && <PanelBody 
						title={__("Playback settings", "thermal-display")} 
						initialOpen={false}
					>
						<Ms
							ID={ID}
							attributes={attributes}
							setAttributes={setAttributes}
						/>
						<Speed
							speed={speed}
							setAttributes={setAttributes}
						/>
					</PanelBody>}

					<PanelBody 
						title={__("Appearance settings", "thermal-display")} 
						initialOpen={false}
					>
						<AppearencePanel {...attributes} setter={setAttributes} />
					</PanelBody>

				</InspectorControls>


			</MediaUploadCheck>


			{/** The content to be displayed in the block editor */}

			<div {...useBlockProps()}>

				{thermal
					? <Preview
						attributes={attributes}
						ID={ID}
					/>
					: <Empty
						attributes={attributes}
						setAttributes={setAttributes}
					/>
				}

			</div>

		</>
	);
}
