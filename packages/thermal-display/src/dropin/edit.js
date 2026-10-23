import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { useCallback } from '@wordpress/element';
import {
	PanelBody,
	Tooltip,
	CheckboxControl
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
		statistics
	} = attributes;

	const setStatistics = useCallback( ( value ) =>  {
		setAttributes({ statistics: value});
	}, statistics, setAttributes );


	return (
		<>

			<InspectorControls>
				<PanelBody title="Statistics">
					<CheckboxControl 
						__nextHasNoMarginBottom
						checked={statistics}
						label='Store usage statistics'
						onChange={ setStatistics }
						help={<div>Anonymysed data shall be stored <a href="/wp-admin/admin.php?page=thermal-dropin-statistics" target="_blank">here</a>:
							<ul style={{listStyleType: "disc"}}>
								<li>Time of file upload</li>
								<li>URL where the file was uploaded</li>
								<li>IP Address</li>
								<li>File name</li>
								<li>File size</li>
								<li>Number of frames in the file</li>
								<li>File resolution</li>
								<li>File timestamp</li>
								<li>Browser `userAgent` properties</li>
							</ul>
						</div>}
					/>
				</PanelBody>
				<PanelBody title="Appearence">
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

								<thermal-dropin-app 
									style={{pointerEvents: "none"}} 
									skin={attributes.skin}
									lines={attributes.lines}
									corners={attributes.corners}
								></thermal-dropin-app>

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
