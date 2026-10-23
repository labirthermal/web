
import { __ } from '@wordpress/i18n';

import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';

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
	Panel,
	CheckboxControl
} from '@wordpress/components';

import './editor.scss';
import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';

import { AnalysisEditorModal } from '../utils/analysisEditor/AnalysisEditorModal';
import { AnalysisEditorTrigger } from '../utils/analysisEditor/AnalysisEditorTrigger';
import { useFiles } from './hooks/useFiles';
import { AppearencePanel } from '../utils/appearence/AppearencePanel';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function EditGroup({ attributes, setAttributes }) {

	const ID = useMemo(() => Math.random().toString());

	/** Register the webcomponents if not already */
	useRegisterIframeScript();



	const {
		webcomponent,
		palette,
		thermal,
		files,
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
		interactiveanalysis,
		preservetime
	} = attributes;

	const fl = useFiles(files);

	useEffect(() => {
		if (fl.parsed !== files)
			setAttributes({ files: fl.parsed });
	}, [fl.parsed]);

	const [thermalBackup, setThermalBackup] = useState(thermal);

	const [previewGroup, setPreviewGroup] = useState();

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

	const displaySettingsCallback = useCallback(node => {

		console.log("displaysettingcallback", node, node.registry);

		if (node) {

			node.registry.range.addListener(ID, value => {

				if (value instanceof Object) {
					setAttributes(value);
				} else {
					setAttributes({ from: undefined, to: undefined });
				}
			});

		}

	}, []);

	const previewRef = useRef();

	const [group, setGroup] = useState();

	useEffect(() => {

		console.log(">>>", previewRef.current);

		if (group === undefined) {

			setTimeout(() => {

				if (previewRef.current !== null) {


					const gr = previewRef.current.group;

					gr.registry.palette.addListener(ID, value => {
						setAttributes({ palette: value });
					});

					gr.registry.range.addListener(ID, value => {

						if (value) {
							setAttributes(value);
						}

					});

					gr.analysisSync.onSlotSync.set(ID, (
						serialized,
						slotNumber
					) => {

						const key = `analysis${slotNumber}`;
						console.log(key, serialized);
						setAttributes({ [key]: serialized });
					});

					previewRef.current.onColumns.set(ID, value => {
						setAttributes({ columns: value });
					});

					setGroup(previewRef.current.group);

				}

			}, 0);



			console.log("==========", previewRef.current);

		}

	}, [previewRef.current, group, setGroup, setAttributes]);





	return (
		<>
			<MediaUploadCheck>

				<InspectorControls >

					<PanelBody title="Thermal files">

						<AnalysisEditorModal
							thermal={thermal}
							open={open}
							setOpen={setOpen}
							attributes={attributes}
							setAttributes={setAttributes}
						/>

						<div style={{ marginBottom: "1rem", marginTop: thermal ? "1rem" : "0" }}>


							<MediaUpload
								allowedTypes={['application/octet-stream']}
								multiple={true}
								onSelect={result => {

									console.log(">>>>>", result);

									if (Array.isArray(result)) {

										const urls = result.map(file => {
											return file.url;
										});
										fl.syncUrls(urls);
									}

								}}
								render={({ open }) => (
									<Button
										onClick={() => {
											startUploadingThermalFile();
											open();
										}}
										variant="primary"
									>
										Upload or select a LRC files
									</Button>
								)}
							/>

							{Object.values(fl.files).map(file => {


								let panelTitle = file.label
									? file.label
									: file.thermal.match(/[^/]*$/)[0];




								return <Panel>
									<PanelBody title={panelTitle} initialOpen={false}>
										<TextControl
											__next40pxDefaultSize
											__nextHasNoMarginBottom
											onChange={(value) => { fl.updateFileLabel(file.thermal, value) }}
											value={file.label}
											label="Label"
										/>
										<Button
											variant="primary"
											isDestructive
											size="small"
											onClick={() => fl.removeFile(file.thermal)}
										>
											Remove
										</Button>
									</PanelBody>
								</Panel>

							})}

						</div>




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

					<PanelBody
						title="Display settings"
					>

						<CheckboxControl
							__nextHasNoMarginBottom
							checked={showhistogram}
							label="Show histogram"
							hint="Enable histogram display in the thermal scale?"
							onChange={(value) => { setAttributes({ showhistogram: value }) }}
						/>

						<CheckboxControl
							__nextHasNoMarginBottom
							checked={showabout}
							label="Show about button"
							help="Display the button with application info?"
							onChange={(value) => { setAttributes({ showabout: value }) }}
						/>

						<CheckboxControl
							__nextHasNoMarginBottom
							checked={interactiveanalysis}
							label="Interactive analysis"
							help="Should the visitor be able to edit analysis?"
							onChange={(value) => { setAttributes({ interactiveanalysis: value }) }}
						/>

						<CheckboxControl
							__nextHasNoMarginBottom
							checked={preservetime}
							label="Preserve time in file labels"
							help="Should the file time be displayed even if the file has a custom label?"
							onChange={(value) => { setAttributes({ preservetime: value }) }}
						/>

						<AppearencePanel {...attributes} setter={setAttributes} />

					</PanelBody>

				</InspectorControls>

			</MediaUploadCheck>


			<div {...useBlockProps()}>

				{fl.parsed !== undefined
					? <Tooltip
						text="Click on to edit"
						delay={300}
						hideOnClick={false}
					>
						<thermal-group-app
							files={fl.parsed}
							label={label}
							author={author}
							license={license}
							palette={palette}
							ref={previewRef}
							analysis1={analysis1}
							analysis2={analysis2}
							analysis3={analysis3}
							analysis4={analysis4}
							analysis5={analysis5}
							analysis6={analysis6}
							analysis7={analysis7}
							showabout={showabout}
							showhistogram={showhistogram}
							interactiveanalysis={interactiveanalysis}
							preservetime={preservetime}
							skin={attributes.skin}
							lines={attributes.lines}
							corners={attributes.corners}
						></thermal-group-app>
					</Tooltip>
					: <Placeholder
						label="Thermal group"
						instructions="Display multiple IR recordings taken by IR camera TIMI Edu."
						icon={<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
							<g>
								<g id="Vrstva_1">
									<path d="M327.6,240c-5.4-4.7-13.6-7.1-24.6-7.1h-51.9v60.8h52c10.9,0,19-2.4,24.6-7.2s8.2-12.7,8.2-23.6-2.8-18.1-8.3-22.8Z" />
									<path d="M252.4,0L18.9,90.7h-.6v421.3h466.9V90.7h.6L252.4,0ZM161.8,411.9h-47.5v-216h47.5v216ZM342.1,411.9c-2.8-7.9-4.5-16.2-4.9-24.6-.6-9.5-1.5-18.4-2.7-27.2-1.6-11.3-5-19.5-10.3-24.8s-13.8-7.9-25.7-7.9h-47.5v84.4h-47.5v-215.9h116.4c8.9-.1,17.8,1.5,26.2,4.7,7.4,2.9,14.2,7.3,19.9,12.8,5.5,5.4,9.8,11.8,12.7,18.9,3,7.3,4.5,15.2,4.4,23.1.3,11.5-2.4,22.9-7.9,33-6,9.9-15.3,17.3-26.2,21.2v.6c5.3,1.3,10.3,3.9,14.5,7.4,3.8,3.3,7,7.3,9.4,11.8,2.5,4.7,4.3,9.7,5.3,15,1.1,5.4,1.9,10.9,2.3,16.3.2,3.4.4,7.5.6,12.1s.6,9.2,1.1,14.2c.5,4.6,1.3,9.2,2.4,13.7.9,4,2.6,7.7,5,11.1h-47.6Z" />
								</g>
							</g>
						</svg>}
					>
						<MediaUpload
							allowedTypes={['application/octet-stream']}
							multiple={true}
							onSelect={result => {

								if (Array.isArray(result)) {

									const urls = result.map(file => {
										return file.url;
									});
									fl.syncUrls(urls);
								}

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
