import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	Tooltip,
	TextControl,
	Button,
	SelectControl,
	Placeholder
} from '@wordpress/components';
import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';

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
		url, subfolder, by, palette
	} = attributes;

	const [info, setInfo] = useState(undefined);

	const [valid, setValid] = useState(false);

	const isValidUrl = useCallback((value) => {
		try {
			new URL(value);
			return true;
		} catch (err) {
			return false;
		}
	}, []);

	const validateStringInput = useCallback((value) => {
		if (typeof value === "string") {
			const trimmed = value.trim();
			if (trimmed.length > 0) {
				return trimmed;
			} else {
				return undefined;
			}
		} else {
			return undefined;
		}

	}, []);

	const getRequestUrl = useCallback((url, subfolder, by) => {

		if (!isValidUrl(url)) {
			return undefined;
		}
		let output = `${url}?${by}&grid`;
		if (subfolder) output += `&scope=${subfolder}`;
		return output;

	}, [isValidUrl]);

	const fetchInfo = useCallback(async () => {

		setInfo(undefined);
		setValid( false );

		const target = getRequestUrl(url, subfolder, by);

		const raw = await fetch(target);

		if (raw.ok) {
			const json = await raw.json();

			if ("success" in json && "data" in json ) {
				if (json.success === true) {

					console.log( json );
					setValid(true);

				}
			}

		}

		console.log(target);

	}, [url, subfolder, getRequestUrl]);

	useEffect(() => {

		if (url && subfolder && by) {
			fetchInfo();
		}

	}, []);

	const options = useMemo(() => {
		return [
			{ value: "hours", label: "By hours" },
			{ value: "days", label: "By days" },
			{ value: "weeks", label: "By weeks" },
			{ value: "months", label: "By months" },
			{ value: "years", label: "By years" }
		]
	}, []);

	const availableOptions = useMemo(() => {
		return options.map(option => option.value);
	}, [options]);


	return (
		<>
			<InspectorControls>

				<PanelBody title="Values">

					<TextControl
						label="API endpoint"
						help="Provide the URL of the API endpoint"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => { setAttributes({ url: validateStringInput(value) }) }}
						value={url}
						required
						type="url"
					/>

					<TextControl
						label="Subfolder"
						help="Provide the name of the optional subfolder"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => { setAttributes({ subfolder: validateStringInput(value) }) }}
						value={subfolder}
					/>

					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label="Grouping"
						onChange={(value) => {
							setAttributes({by: value});
						}}
						options={options}

					></SelectControl>

					<Button
						onClick={fetchInfo}
						variant="primary"
					>Fetch information</Button>

					<br />

					<br />

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
								label: "Grayscale",
								value: "grayscale"
							},
						]}

						onChange={(value) => setAttributes({ palette: value })}
					/>

					<AppearencePanel {...attributes} setter={setAttributes} />



				</PanelBody>

			</InspectorControls>


			<div {...useBlockProps()}>


				{valid === false
					? <Placeholder
						label="A remote folder time grid"
						instructions="Fill in the URL, and an optional subfolder in the sidebar."
						icon={<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 512 512">
							<g>
								<g id="Vrstva_1">
									<path d="M327.6,240c-5.4-4.7-13.6-7.1-24.6-7.1h-51.9v60.8h52c10.9,0,19-2.4,24.6-7.2s8.2-12.7,8.2-23.6-2.8-18.1-8.3-22.8Z" />
									<path d="M252.4,0L18.9,90.7h-.6v421.3h466.9V90.7h.6L252.4,0ZM161.8,411.9h-47.5v-216h47.5v216ZM342.1,411.9c-2.8-7.9-4.5-16.2-4.9-24.6-.6-9.5-1.5-18.4-2.7-27.2-1.6-11.3-5-19.5-10.3-24.8s-13.8-7.9-25.7-7.9h-47.5v84.4h-47.5v-215.9h116.4c8.9-.1,17.8,1.5,26.2,4.7,7.4,2.9,14.2,7.3,19.9,12.8,5.5,5.4,9.8,11.8,12.7,18.9,3,7.3,4.5,15.2,4.4,23.1.3,11.5-2.4,22.9-7.9,33-6,9.9-15.3,17.3-26.2,21.2v.6c5.3,1.3,10.3,3.9,14.5,7.4,3.8,3.3,7,7.3,9.4,11.8,2.5,4.7,4.3,9.7,5.3,15,1.1,5.4,1.9,10.9,2.3,16.3.2,3.4.4,7.5.6,12.1s.6,9.2,1.1,14.2c.5,4.6,1.3,9.2,2.4,13.7.9,4,2.6,7.7,5,11.1h-47.6Z" />
								</g>
							</g>
						</svg>}
					></Placeholder>
					: <remote-grid-app
						url={url}
						subfolder={subfolder}
						palette={palette}
						by={by}
						style={{
							pointerEvents: "none"
						}}
						skin={attributes.skin}
						lines={attributes.lines}
						corners={attributes.corners}
					></remote-grid-app>
				}

			</div>

		</>
	);
}
