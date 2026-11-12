import { Tooltip } from '@wordpress/components';
import { __ } from '@wordpress/i18n';


/**
 * Preview of the webcomponent used when a file is provided.
 */
export default function Preview({
    ID,
    attributes
}) {

    const {
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
        skin,
        lines,
        corners,
        ms,
        unit
    } = attributes;

    return <Tooltip
        text={__("Click to edit", "thermal-display")}
        delay={300}
        hideOnClick={false}
    >
        <div>
            <div className="thermal__content-editor__container">
                <div>

                    <thermal-file-app
                        manager-slug={ID}
                        thermal={thermal}
                        visible={visible}
                        palette={palette}
                        author={author}
                        license={license}
                        label={label}
                        description={description}
                        from={from}
                        to={to}
                        opacity={opacity}
                        analysis1={analysis1}
                        analysis2={analysis2}
                        analysis3={analysis3}
                        analysis4={analysis4}
                        analysis5={analysis5}
                        analysis6={analysis6}
                        analysis7={analysis7}
                        ms={ms}
                        speed={speed}
                        advanced-palettes
                        unit={unit}
                        skin={skin}
                        lines={lines}
                        corners={corners}
                    ></thermal-file-app>
                </div>

                <div className="thermal__content-editor__wrapper">
                    <div>{__("Edit parameters in the sidebar.", "thermal-display")}</div>
                </div>
            </div>
        </div>
    </Tooltip>
}