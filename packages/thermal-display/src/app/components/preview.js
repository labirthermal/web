
import {
    Tooltip
} from '@wordpress/components';

/**
 * Preview of the webcomponent used when a file is provided.
 */
export default function Preview({
    attributes
}) {

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

    return <Tooltip
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
                        opacity={opacity}
                        analysis1={analysis1}
                        analysis2={analysis2}
                        analysis3={analysis3}
                        analysis4={analysis4}
                        analysis5={analysis5}
                        analysis6={analysis6}
                        analysis7={analysis7}
                        speed={speed}
                        advanced-palettes={advancedpalettes ? '' : undefined}
                    ></thermal-file-app>
                </div>

                <div className="thermal__content-editor__wrapper">
                    <div>Edit parameters in the sidebar.</div>
                </div>
            </div>
        </div>
    </Tooltip>
}