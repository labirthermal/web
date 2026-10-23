import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
	PanelBody,
	__experimentalNumberControl as NumberControl,
	SelectControl,
	Tooltip,
	Button,
	ToggleControl,
	TextControl
} from '@wordpress/components';

import { Icon, check, lock, unlock } from '@wordpress/icons';


import { useRegisterIframeScript } from '../utils/useRegisterIframeScript';
import './editor.scss';

import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';

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
		serverApiRoot,
		enabled,
		promptTitle,
		promptText
	} = attributes;

	const icon = useMemo(() => {
		return enabled
			? <Icon icon={lock} />
			: <Icon icon={unlock} />;
	}, [enabled]);

	const label = useMemo(() => {
		return enabled
			? 'Vyžadováno přihlášení'
			: 'Veřejně viditelné';
	}, [enabled]);

	const enabledClass = useMemo(() => {
		return enabled ? 'enabled' : 'disabled';
	}, [enabled]);


	return (
		<>



			<InspectorControls>

				<PanelBody title="Nastavení ochrany">

					<ToggleControl
						label="Povolit ochranu obsahu"
						checked={enabled}
						onChange={(value) => setAttributes({ enabled: value })}
					/>


				</PanelBody>

				<PanelBody title="Upozornění">

					<TextControl
						label="Titulek upozornění"
						help="Název upozornění, které se zobrazí nepřihlášeným uživatelům."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ promptTitle: value })}
						value={promptTitle}
						required
						type="string"
					/>

					<TextControl
						label="Text upozornění"
						help="Volitelný text, který se zobrazí pod titulkem upozornění."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ promptText: value })}
						value={promptText}
						required
						type="string"
					/>


				</PanelBody>

				<PanelBody title="Připojení k serveru">
					<TextControl
						label="URL serveru"
						help="Zadejte URL adresu serveru, který ověřuje uživatele."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ serverUrl: value })}
						value={serverUrl}
						required
						type="string"
					/>
					<TextControl
						label="API Root"
						help="Zadejte kořenovou URL adresu API serveru."
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						onChange={(value) => setAttributes({ serverApiRoot: value })}
						value={serverApiRoot}
						required
						type="string"
					/>
				</PanelBody>

			</InspectorControls>


			<div {...useBlockProps()}>


				<div className={`labir-wall labir-wall__${enabledClass}`}>
					<div
						className="labir-wall-meta"
					>
						<span>{icon}</span>
						<span>{label}</span>
						<span>"{promptTitle}"</span>
					</div>
					<InnerBlocks />
				</div>


			</div>

		</>
	);
}
