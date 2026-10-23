import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	Tooltip,
	Button,
	TextControl,
	Icon,
	Dashicon,
	Tip,
	Flex,
	BaseControl,
	ToggleControl
} from '@wordpress/components';

import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';

import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';

import './editor.scss';
import { AppearencePanel } from '../utils/appearence/AppearencePanel';


const Badge = (props) => {
	return <span
		className="badge"
	>
		{props.icon}
		<span>{props.children}</span>
	</span>
}

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
		serverUrl,
		apiRoot,
		path,
		fileName,
		palette,
		displayMode,
		compact,
		folderMode,
		by,
		disableLogging,
		replaceWithLogin,
		pathLock,
		label,
		labelTooltip,
		labelIcon,
		labelIconStyle,
		labelVariant
	} = attributes;


	const [parseUrl, setParseUrl] = useState("");

	/**
	 * @param {number|undefined} value 
	 */
	const sanitizeValue = (value) => {

		const floatVal = parseFloat(value);

		if (isNaN(floatVal)) {
			return undefined;
		}

		return floatVal;
	}

	const display = useMemo(() => {

		const replacement = replaceWithLogin 
			? <Tip><strong>'{replaceWithLogin}'</strong> bude v cestě ke složce nahrazeno loginem uživatele aktuálně přihlášeného k LabIR Serveru.</Tip> 
			: undefined;

		if (!path) {
			return <>
				<Badge
					icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
						<path fillRule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z" clipRule="evenodd" />
					</svg>
					}
				>
					Přihlašovací stránka k serveru
				</Badge>
				<Tip>Není vyplněná cesta ke složce. Po přihlášení bude uživatel procházet všechny své soubory.</Tip>
				{replacement}
			</>
		}

		if (!fileName) {
			return <>
				<Badge
					icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
						<path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
					</svg>}
				>
					{path}
				</Badge>
				{replacement}
			</>
		}

		return <>
			<>
				<Badge
					icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
						<path d="M3.75 3A1.75 1.75 0 0 0 2 4.75v3.26a3.235 3.235 0 0 1 1.75-.51h12.5c.644 0 1.245.188 1.75.51V6.75A1.75 1.75 0 0 0 16.25 5h-4.836a.25.25 0 0 1-.177-.073L9.823 3.513A1.75 1.75 0 0 0 8.586 3H3.75ZM3.75 9A1.75 1.75 0 0 0 2 10.75v4.5c0 .966.784 1.75 1.75 1.75h12.5A1.75 1.75 0 0 0 18 15.25v-4.5A1.75 1.75 0 0 0 16.25 9H3.75Z" />
					</svg>}
				>
					{path}
				</Badge>
				<Badge
					icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
						<path fillRule="evenodd" d="M1 5.25A2.25 2.25 0 0 1 3.25 3h13.5A2.25 2.25 0 0 1 19 5.25v9.5A2.25 2.25 0 0 1 16.75 17H3.25A2.25 2.25 0 0 1 1 14.75v-9.5Zm1.5 5.81v3.69c0 .414.336.75.75.75h13.5a.75.75 0 0 0 .75-.75v-2.69l-2.22-2.219a.75.75 0 0 0-1.06 0l-1.91 1.909.47.47a.75.75 0 1 1-1.06 1.06L6.53 8.091a.75.75 0 0 0-1.06 0l-2.97 2.97ZM12 7a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clipRule="evenodd" />
					</svg>
					}
				>
					{fileName}
				</Badge>
				{replacement}
			</>
		</>

	}, [path, fileName, replaceWithLogin]);


	const parse = useCallback(() => {

		if (!parseUrl) {
			return;
		}

		try {
			const url = new URL(parseUrl);

			const attr = {
				serverUrl: url.origin,
			}

			url.searchParams.forEach((value, key) => {

				switch (key) {
					case "palette":
						attr.palette = value;
						break;
					case "folder-path":
						attr.path = value;
						break;
					case "file-name":
						attr.fileName = value;
						break;
					case "display-mode":
						attr.displayMode = value;
						break;
					case "folder-mode":
						attr.folderMode = value;
						break;
					case "compact":
						attr.compact = value === "true" || value === "1";
						break;
					case "grid-grouping":
						attr.by = value;
						break;
					default:
						break;
				}

			});

			setAttributes(attr);
		} catch (error) {
			console.error("Invalid URL:", error);
			return;
		}



	}, [parseUrl, setAttributes]);


	return (
		<>
			<InspectorControls>

				<div style={{ padding: "1em" }}>
					<TextControl
						label="Parsovat URL"
						help="Vložte sdílecí URL z LabIR Serveru a spusťte parsování."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setParseUrl(value)}
						value={parseUrl}
						required
						type="string"
					/>

					<Button
						variant="primary"
						onClick={parse}
					>Parsovat</Button>
				</div>

				{!serverUrl || !apiRoot
					? <div style={{ padding: "1em" }}>
						<Tip>
							Nejprve vyplňte všechny údaje v záložce <em>Server</em> anebo vložte sdílecí odkaz přímo ze serveru.
						</Tip>
					</div>
					: <>
						<PanelBody title="Obsah">

							<TextControl
								label="Cesta ke složce"
								help="Vyplňte cestu ke složce na LabIR Serveru. Bez '/data' na začátku!"
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								onChange={(value) => setAttributes({ path: value })}
								value={path}
								required
								type="string"
							/>

							<TextControl
								label="Zamknout cestu ke složce na"
								help="Prohlížeč neumožní uživatele vidět obsah nad tuto cestu."
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								onChange={(value) => setAttributes({ pathLock: value })}
								value={pathLock}
								required
								type="string"
							/>

							<TextControl
								label="File name"
								help="If a folder is provided in the path, specify the file name to display."
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								onChange={(value) => setAttributes({ fileName: value })}
								value={fileName}
								type="string"
							/>

							<TextControl
								label="Nahradit přihlašovacím jménem"
								help="Pokud je tento blok zobrazen v zamčené sekci, v cestě bude uvedený text nahrazen přihlašovacím jménem uživatele."
								__next40pxDefaultSize
								__nextHasNoMarginBottom
								onChange={(value) => setAttributes({ replaceWithLogin: value })}
								value={replaceWithLogin}
								type="string"
							/>



							<BaseControl
								__nextHasNoMarginBottom
								id="wp-components-base-control-0"
								label="Co se zobrazí"
							>
								<div style={{
									boxSizing: 'border-box',
									padding: '1em',
									border: '1px solid #ccc',
									borderRadius: '1em',
									background: '#f9f9f9',
									display: "flex",
									flexDirection: "column",
									width: "100%",
									gap: "0.5em",
								}}>{display}</div>
							</BaseControl>

						</PanelBody>
						<PanelBody title="Zobrazení" initialOpen={false}>

							<ToggleControl
								__nextHasNoMarginBottom
								checked={disableLogging}
								label="Zakázat přihlašování na server"
								onChange={(value) => {
									setAttributes({ disableLogging: value });
								}}
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
										label: "Grayscale",
										value: "grayscale"
									},
								]}

								onChange={(value) => setAttributes({ palette: value })}
							/>

							<SelectControl
								label="Zobrazení podsložek"
								help="Pokud jsou v uvedené cestě podsložky, jak se mají zobrazit?"
								value={folderMode}
								options={[
									{
										label: "Tabulka podsložek",
										value: "table-subfolders"
									},
									{
										label: "Mřížka podsložek",
										value: "grid-subfolders"
									},
									{
										label: "Soubory podsložek v mřížce podle času",
										value: "grid-files"
									},
								]}

								onChange={(value) => setAttributes({ folderMode: value })}
							/>

							{folderMode !== "grid-files" && <SelectControl
								label="Zobrazení souborů ve složce"
								help="Pokud jsou ve složce soubory, jak se mají zobrazit?"
								value={displayMode}
								options={[
									{
										label: "Soubory v tabulce",
										value: "table"
									},
									{
										label: "Soubory v mřížce",
										value: "grid"
									},
								]}

								onChange={(value) => setAttributes({ displayMode: value })}
							/>}

							{folderMode === "grid-files" && <SelectControl
								label="Seskupení mřížky souborů"
								value={by}
								options={[
									{
										label: "Po hodinách",
										value: "hour"
									},
									{
										label: "Po dnech",
										value: "day"
									},
									{
										label: "Po týdnech",
										value: "week"
									},
									{
										label: "Po měsících",
										value: "month"
									},
									{
										label: "Po rocích",
										value: "year"
									},
								]}

								onChange={(value) => setAttributes({ by: value })}
							/>}


							{( displayMode === "grid" && folderMode !== "grid-files" ) && <ToggleControl
								__nextHasNoMarginBottom
								checked={compact}
								label="Kompaktní zobrazení"
								onChange={(value) => {
									setAttributes({ compact: value });
								}}
							/>}

							<AppearencePanel {...attributes} setter={setAttributes} />

						</PanelBody>
					</>
				}

				<PanelBody title="Popiska" initialOpen={false}>

					<TextControl
						label="Text popisky"
						help="Zadejte text, který se zobrazí jako popiska nad zobrazením."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ label: value })}
						value={label}
						type="string"
					/>

					<TextControl
						label="Tooltip popisky"
						help="Zadejte text, který se zobrazí v tooltipu popisky."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ labelTooltip: value })}
						value={labelTooltip}
						type="string"
					/>

					<TextControl
						label="Ikona popisky (interní identifikátor ikony)"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ labelIcon: value })}
						value={labelIcon}
						type="string"
					/>

					<TextControl
						label="Styl ikony popisky (interní styl ikony)"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ labelIconStyle: value })}
						value={labelIconStyle}
						type="string"
					/>

					<TextControl
						label="Variant ikony popisky (interní varianta ikony)"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ labelVariant: value })}
						value={labelVariant}
						type="string"
					/>

					

				</PanelBody>

				<PanelBody title="Server" initialOpen={false}>

					<TextControl
						label="Server URL"
						help="Provide the base URL of the LabIR Server."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ serverUrl: value })}
						value={serverUrl}
						required
						type="url"
					/>


					<TextControl
						label="API endpoint"
						help="Provide the API root endpoint. Usually '/api'"
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ apiRoot: value })}
						value={apiRoot}
						required
						type="string"
					/>

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

								<connected-app
									server-url={serverUrl}
									api-root={apiRoot}
									folder-path={path}
									file-name={fileName}
									palette={palette}
									displaymode={displayMode}
									disable-logging={disableLogging ? "true" : "false"}
									folder-mode={folderMode}
									grid-grouping={by}
									compact={compact ? "true" : "false"}
									locked-location={pathLock}
									label={label}
									label-tooltip={labelTooltip}
									label-icon={labelIcon}
									label-icon-style={labelIconStyle}
									label-variant={labelVariant}
									skin={attributes.skin}
									lines={attributes.lines}
									corners={attributes.corners}
								></connected-app>

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
