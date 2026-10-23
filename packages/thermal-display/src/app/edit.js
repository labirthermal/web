
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

			<manager-provider
				manager-slug={ID}
				style={{ display: "contents" }}
			>

				<registry-provider
					registry-slug={ID}
					style={{ display: "contents" }}
				>

					<group-provider
						group-slug={ID}
						style={{ display: "contents" }}
					>

						<file-provider
							thermal={thermal}
						>

							<file-canvas></file-canvas>
							<manager-tool-bar></manager-tool-bar>

						</file-provider>

						{thermal}

					</group-provider>

				</registry-provider>



			</manager-provider>


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


						{thermal &&

							<manager-provider
								// manager-slug={ID}
								palette={palette}
								autoclear="true"
							>
								<registry-provider
									from={from}
									to={to}
								>
									<group-provider>
										<file-provider
											thermal={thermal}
											ref={filePreviewCallback}
										>
											<file-canvas></file-canvas>
										</file-provider>
									</group-provider>
								</registry-provider>
							</manager-provider>
						}

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

										<SelectControl
											label="Variant"
											value={variant}
											options={[
												{
													label: "Advanced analyser",
													value: "advanced"
												},
												{
													label: "Simple layout",
													value: "simple"
												},
												{
													label: "Lesson",
													value: "lesson"
												},
												{
													label: "Image without interface",
													value: "nogui"
												}
											]}
											onChange={(value) => setAttributes({ variant: value })}
										>

										</SelectControl>

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


			<div {...useBlockProps()}>
				{thermal
					? <Tooltip
						text="Click to edit"
						delay={300}
						hideOnClick={false}
					>
						<div>
							<div className="thermal__content-editor__container">
								<div>

									<thermal-file-app
										thermal={thermal}
										visible={visible}
										palette={palette}
										author={author}
										license={license}
										label={label}
										description={description}
										from={from}
										to={to}
										analysis1={analysis1}
										analysis2={analysis2}
										analysis3={analysis3}
										analysis4={analysis4}
										analysis5={analysis5}
										analysis6={analysis6}
										analysis7={analysis7}
										style={{
											pointerEvents: "none"
										}}
										speed={speed}
										opacity={opacity}
										advanced-palettes={advancedpalettes ? "true" : "false"}
										skin={attributes.skin}
										lines={attributes.lines}
										corners={attributes.corners}
									>

										{Object.values(notations).length > 0 && Object.values(notations).map(notation => <notation-entry
											label={notation.label}
											slot="notation"
											from={notation.from}
											to={notation.to}
											image={notation.image}
										/>)}

									</thermal-file-app>
								</div>

								<div className="thermal__content-editor__wrapper">
									<div>Edit parameters in the sidebar.</div>
								</div>
							</div>
						</div>
					</Tooltip>
					: <Placeholder
						label="IR image"
						instructions="Upload or select a thermal file to see an advanced analyser application here."
						icon={<svg id="Vrstva_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
							<defs>
								<linearGradient id="Nepojmenovaný_přechod_12" data-name="Nepojmenovaný přechod 12" x1="452.4" y1="7.95" x2="-8.33" y2="364.12" gradientUnits="userSpaceOnUse">
									<stop offset="0" stop-color="#eae200" />
									<stop offset=".34" stop-color="#d42900" />
									<stop offset="1" stop-color="#0007bf" />
								</linearGradient>
								<linearGradient id="Nepojmenovaný_přechod_13" data-name="Nepojmenovaný přechod 13" x1="25.41" y1="59.57" x2="388.25" y2="59.57" gradientUnits="userSpaceOnUse">
									<stop offset="0" stop-color="#0007bf" />
									<stop offset=".66" stop-color="#d42900" />
									<stop offset="1" stop-color="#eae200" />
								</linearGradient>
							</defs>
							<rect x="1" width="511" height="345" rx="18.11" ry="18.11" />
							<rect x="25" y="80.12" width="362" height="236.61" rx="12.96" ry="12.96" fill="url(#Nepojmenovaný_přechod_12)" />
							<line x1="31.36" y1="30" x2="100.3" y2="30" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89" />
							<line x1="405.91" y1="88.55" x2="474.85" y2="88.55" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89" />
							<line x1="405.91" y1="106.93" x2="451.36" y2="106.93" fill="none" stroke="#818080" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89" />
							<g>
								<path d="M483.03,512v-171.78s.02-.09.03-.13c1.15-6.15-2.24-12.25-8.07-14.51l-96.57-37.53c-1.51-.59-3.11-.88-4.71-.88h0c-1.6,0-3.19.29-4.71.88l-95.38,37.05c-5.62,1.44-9.77,6.53-9.77,12.6v174.31h219.17Z" fill="#fff" />
								<polyline points="373.72 300.17 470.28 337.69 470.03 337.69 470.03 512 276.86 512 276.86 337.69 277.11 337.69 373.72 300.17" />
								<path d="M353.12,468.3h23.02v-40.9h23.02c5.77,0,9.89,1.26,12.45,3.83,2.57,2.57,4.22,6.54,4.99,12.02.58,4.26,1.02,8.58,1.31,13.18.19,4.05,1.01,8.06,2.36,11.87h-.03l.05.05s-.01-.03-.02-.05h23.03c-1.16-1.65-1.99-3.44-2.42-5.38-.53-2.18-.92-4.41-1.16-6.64-.24-2.42-.44-4.65-.53-6.88s-.19-4.22-.29-5.86c-.19-2.62-.58-5.28-1.11-7.9-.48-2.57-1.36-4.99-2.57-7.27-1.16-2.18-2.71-4.12-4.55-5.72-2.04-1.7-4.46-2.96-7.03-3.59v-.29c5.28-1.89,9.79-5.48,12.7-10.27,2.67-4.89,3.97-10.42,3.83-15.99.05-3.83-.68-7.66-2.13-11.19-1.41-3.44-3.49-6.54-6.15-9.16-2.76-2.67-6.06-4.8-9.64-6.2-3.95-1.51-8.13-2.28-12.31-2.28-.13,0-.25,0-.38,0h-56.4v104.62" fill="#fff" />
								<polyline points="309.89 468.35 332.91 468.35 332.91 363.69 309.89 363.69 309.89 468.35" fill="#fff" />
								<g>
									<path d="M413.25,385.05c-2.62-2.28-6.59-3.44-11.92-3.44h-25.15v29.46h25.2c5.28,0,9.21-1.16,11.92-3.49,2.71-2.33,3.97-6.15,3.97-11.44s-1.36-8.77-4.02-11.05v-.05Z" />
									<path d="M401.33,381.61c5.33,0,9.3,1.16,11.92,3.44v.05c2.67,2.28,4.02,5.77,4.02,11.05s-1.26,9.11-3.97,11.44c-2.71,2.33-6.64,3.49-11.92,3.49h-25.2v-29.46h25.15" />
								</g>
							</g>
							<line x1="31.36" y1="59.57" x2="382.3" y2="59.57" fill="none" stroke="url(#Nepojmenovaný_přechod_13)" stroke-linecap="round" stroke-miterlimit="10" stroke-width="11.89" />
						</svg>}
					>
						<MediaUpload
							allowedTypes={['application/octet-stream']}
							onSelect={result => {
								successfullyUploadedThermalFile(result.url);
							}}
							render={({ open }) => (
								<Button
									onClick={() => {
										startUploadingThermalFile();
										open();
									}}
									variant="primary"
								>
									{thermal ? "Change file" : "Upload or select a LRC file"}
								</Button>
							)}
						/>
					</Placeholder>
				}

			</div>

		</>
	);
}
