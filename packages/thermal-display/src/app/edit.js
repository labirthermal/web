import Empty from './components/empty';
import { __ } from '@wordpress/i18n';

import { useCallback, useMemo, useState } from '@wordpress/element';

import { useAnalysisEditor } from '../utils/analysisEditor/useAnalysisEditor';

import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';
import {
	Button,
	PanelBody,
	Placeholder,
	SelectControl,
	TextControl,
	Tooltip,
	RangeControl,
	PanelHeader,
	CheckboxControl,
	ButtonGroup
} from '@wordpress/components';

import './editor.scss';
import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';

import { AnalysisEditorModal } from '../utils/analysisEditor/AnalysisEditorModal';
import { AnalysisEditorTrigger } from '../utils/analysisEditor/AnalysisEditorTrigger';
import { useNotations } from '../utils/notationEditor/useNotations';
import { EditorModal } from '../utils/editor/EditorModal';
import { AppearencePanel } from '../utils/appearence/AppearencePanel';
import Preview from './components/preview';
import Thumbnail from './components/thumbnail';
import Range from './components/range';
import Palettes from './components/palette';
import AdvancedPalette from './components/advancedPalette';

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
		variant,
		palette,
		thermal,
		opacity,
		visible,
		label,
		description,
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
		showabout,
		showhistogram,
		showshare,
		showlayout,
		interactiveanalysis,
		notations,
		advancedpalettes
	} = attributes;

	const [hasEditor, setHasEditor] = useState(false);



	const [thermalBackup, setThermalBackup] = useState(thermal);

	const [previewFile, setPreviewFile] = useState();

	const [duration, setDuration] = useState(0);

	const { open, setOpen } = useAnalysisEditor();

	const startUploadingThermalFile = () => {
		const backup = thermal;
		setThermalBackup(backup);
		setAttributes({ thermal: thermal });
	}

	const calcelUploadingThermalFile = () => {
		setAttributes({ thermal: thermalBackup });
	}

	const successfullyUploadedThermalFile = (file) => {
		setAttributes({ thermal: file });
		setThermalBackup(undefined);
	}

	const startUploadingVisibleFile = () => {

	}

	const successfullyUploadedVisibleFile = (file) => {
		setAttributes({ visible: file });
	}

	const filePreviewCallback = useCallback(node => {

		if (node) {


			node.fileController.onSuccess.set(ID + "___sth", instance => {

					setPreviewFile(instance);

					if (instance.moutedBaseLayers) {
						instance.unmountFromDom();
					}

					setDuration(instance.timeline.duration);

					instance.draw();

				});

			node.registryController.onInternalObject.set(ID + "___sth", registry => {
				// Handle the internal registry object

				registry.range.addListener( ID, value => {
					if (value instanceof Object) {
						setAttributes(value);
					} else {
						setAttributes({ from: undefined, to: undefined });
					}
				} );
			});

		}

	}, []);

	const displaySettingsCallback = useCallback(node => {

		if (node) {

			node.registryController.onInternalObject.set(ID + "___sth", registry => {
				// Handle the internal registry object
				registry.range.addListener( ID, value => {
					if (value instanceof Object) {
						setAttributes(value);
					} else {
						setAttributes({ from: undefined, to: undefined });
					}
				} );
			});


		}

	}, []);




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

					<PanelBody title="Thermal file">

						{thermal && <Thumbnail 
							ID={ID}
							thermal={thermal}
							palette={palette}
							advancedPalettes={advancedpalettes}
							from={from}
							to={to}
						/>}

						<div style={{ marginBottom: "1rem", marginTop: thermal ? "1rem" : "0" }}>

							<ButtonGroup>

								<MediaUpload
									allowedTypes={['application/octet-stream']}
									onSelect={result => {
										successfullyUploadedThermalFile(result.url);
									}}
									onClose={calcelUploadingThermalFile}
									render={({ open }) => <Button
										onClick={() => {
											startUploadingThermalFile();
											open();
										}}
										variant="primary"
										size="compact"
									>
										{thermal ? "Change file" : "Upload or select a LRC file"}
									</Button>
									}
								/>

								{thermal &&
									<Button
										variant="secondary"
										size='compact'
										onClick={() => setHasEditor(true)}
									>Editor</Button>
								}

							</ButtonGroup>
						</div>


					</PanelBody>

					<PanelBody title="Visible file" initialOpen={false}>

						<div>
							{visible && <img src={visible} />}

							<MediaUpload
								allowedTypes="image"
								onSelect={result => {
									successfullyUploadedVisibleFile(result.url);
								}}
								render={({ open }) => (
									<>
										<Button
											onClick={() => {
												startUploadingVisibleFile();
												open();
											}}
											variant="primary"
										>
											{visible ? "Change file" : "Upload or select a visible image"}
										</Button>
										{visible && <Button
											variant="secondary"
											onClick={() => {
												setAttributes({ visible: undefined, opacity: 1 });
											}}
										>Remove the file</Button>}
									</>
								)}
							/>
						</div>

						{visible && <div
							style={{ paddingTop: "1rem" }}
						>
							<RangeControl
								__nextHasNoMarginBottom
								label="IR image opacity"
								help="If a visible file is provided, you can set the initial transparency of the thermal file."
								value={opacity}
								onChange={(value) => setAttributes({ opacity: value })}
								min={0}
								max={1}
								step={0.01}
							/>
						</div>}


					</PanelBody>

					<PanelBody title="Information" initialOpen={false}>

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

						<TextControl
							label={__(
								'Label',
								'thermal-display'
							)}
							help="Label appears on the black button on top & left of the app."
							value={label || ''}
							onChange={(value) =>
								setAttributes({ label: value })
							}
						/>

					</PanelBody>

					<PanelBody title="Display settings" initialOpen={false}>

						<Range
							ID={ID}
							setAttributes={setAttributes}
						/>

						<Palettes
							ID={ID}
							palette={palette}
							advancedPalettes={advancedpalettes}
							setAttributes={setAttributes}
						/>

						<AdvancedPalette
							ID={ID}
							advancedPalettes={advancedpalettes}
							setAttributes={setAttributes}
						/>

						<manager-provider
							// manager-slug={ID}
							palette={palette}
							autoclear="true"
						>
							<registry-provider
								from={from}
								to={to}
								ref={displaySettingsCallback}
							>
								<group-provider>
									<file-provider thermal={thermal}>

										<CheckboxControl
											__nextHasNoMarginBottom
											checked={advancedpalettes}
											label="Enable advanced palettes"
											onChange={(value) => { setAttributes({ advancedpalettes: value }) }}
										/>

										<SelectControl
											label="Palette"
											value={palette}
											options={[
												{
													label: "Iron",
													value: "iron"
												},
												{
													label: "Jet",
													value: "jet"
												},
												{
													label: "White hot",
													value: "white_hot"
												},
												{
													label: "Black hot",
													value: "black_hot"
												},
												{
													label: "Lava",
													value: "lava"
												},
												{
													label: "Rainbow",
													value: "rainbow"
												},
												{
													label: "Rainbow HC",
													value: "rainbow_hc"
												}
											]}

											onChange={(value) => setAttributes({ palette: value })}
										/>

										<div style={{ paddingBottom: "1rem" }}>

											<registry-range-slider></registry-range-slider>
											<registry-ticks-bar></registry-ticks-bar>

											<registry-range-display></registry-range-display>

										</div>

										{(previewFile && previewFile.timeline.isSequence) && <SelectControl
											label="Playback Speed"
											value={speed}
											options={[
												{
													label: "0.5x",
													value: 0.5
												},
												{
													label: "1x",
													value: 1
												},
												{
													label: "2x",
													value: 2
												},
												{
													label: "3x",
													value: 3
												},
												{
													label: "5x",
													value: 5
												},
												{
													label: "10x",
													value: 10
												},
											]}

											onChange={(value) => setAttributes({ speed: value })}
										/>}

										<CheckboxControl
											__nextHasNoMarginBottom
											checked={showhistogram}
											label="Show histogram"
											hint="Enable histogram display in the thermal scale?"
											onChange={(value) => { setAttributes({ showhistogram: value }) }}
										/>

										<CheckboxControl
											__nextHasNoMarginBottom
											checked={showshare}
											label="Show share button"
											help="Display a button with instruction on embedding this file to other websites?"
											onChange={(value) => { setAttributes({ showshare: value }) }}
										/>

										<CheckboxControl
											__nextHasNoMarginBottom
											checked={showlayout}
											label="Show layout button"
											help="Enable the user to change the application layout?"
											onChange={(value) => { setAttributes({ showlayout: value }) }}
										/>

										<CheckboxControl
											__nextHasNoMarginBottom
											checked={interactiveanalysis}
											label="Interactive analysis"
											help="Should the visitor be able to edit analysis?"
											onChange={(value) => { setAttributes({ interactiveanalysis: value }) }}
										/>

										<AppearencePanel {...attributes} setter={setAttributes} />


									</file-provider>
								</group-provider>
							</registry-provider>
						</manager-provider>

					</PanelBody>

				</InspectorControls>


			</MediaUploadCheck>


			{/** The content to be displayed in the block editor */}

			<div {...useBlockProps()}>

				{thermal
					? <Preview
						attributes={attributes}
					/>
					: <Empty
						startUploadingThermalFile={startUploadingThermalFile}
						successfullyUploadedThermalFile={successfullyUploadedThermalFile}
					/>
				}

			</div>

		</>
	);
}
