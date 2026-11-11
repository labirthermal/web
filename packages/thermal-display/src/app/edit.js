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
import { Unit } from './components/unit';
import Field from './components/field';
import Speed from './components/speed';
import Ms from './components/ms';

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
		ms,
		speed,
		showabout,
		showhistogram,
		showshare,
		showlayout,
		interactiveanalysis,
		notations,
		advancedpalettes,
		unit
	} = attributes;

	const [hasEditor, setHasEditor] = useState(false);

	const [isSequence, setIsSequence] = useState(false);



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

				registry.range.addListener(ID, value => {
					if (value instanceof Object) {
						setAttributes(value);
					} else {
						setAttributes({ from: undefined, to: undefined });
					}
				});
			});

		}

	}, []);

	const displaySettingsCallback = useCallback(node => {

		if (node) {

			node.registryController.onInternalObject.set(ID + "___sth", registry => {
				// Handle the internal registry object
				registry.range.addListener(ID, value => {
					if (value instanceof Object) {
						setAttributes(value);
					} else {
						setAttributes({ from: undefined, to: undefined });
					}
				});
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
							from={from}
							to={to}
							setIsSequence={setIsSequence}
							ms={ms}
							unit={unit}
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

					<PanelBody title="Thermal display settings" initialOpen={false}>

						<Field
							label="Thermal range"
							description="Adjust the default thermal range."
						>
							<Range
								ID={ID}
								unit={unit}
								setAttributes={setAttributes}
							/>
						</Field>

						<Field
							label="Colour palette"
							description="Select the colour palette for the thermal display."
						>
							<Palettes
								ID={ID}
								palette={palette}
								unit={unit}
								setAttributes={setAttributes}
							/>
						</Field>


						<Field
							label="Thermal Unit"
							description="Select the unit for the thermal display."
						>
							<Unit
								ID={ID}
								unit={unit}
								setAttributes={setAttributes}
							/>
						</Field>

					</PanelBody>

					{isSequence && <PanelBody title="Playback settings" initialOpen={false}>
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

					<PanelBody title="Appearance settings" initialOpen={false}>
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
						startUploadingThermalFile={startUploadingThermalFile}
						successfullyUploadedThermalFile={successfullyUploadedThermalFile}
					/>
				}

			</div>

		</>
	);
}
