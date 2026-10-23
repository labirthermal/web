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

export const AppearencePanel = ({ skin, lines, corners, setter }) => {

    return <>
        <SelectControl
            label="Skin"
            value={skin}
            options={[
                {
                    label: "Default",
                    value: "default"
                },
                {
                    label: "Dark",
                    value: "dark"
                },
                {
                    label: "Dark HC",
                    value: "darkhc"
                },
                {
                    label: "Solarized",
                    value: "solarized"
                },
                {
                    label: "System",
                    value: "system"
                },

            ]}

            onChange={(value) => setter({ skin: value })}
        />
        <SelectControl
            label="Corners"
            value={corners}
            options={[
                {
                    label: "Default",
                    value: "default"
                },
                {
                    label: "Narrow",
                    value: "narrow"
                }

            ]}

            onChange={(value) => setter({ corners: value })}
        />
        <SelectControl
            label="Lines"
            value={lines}
            options={[
                {
                    label: "Default",
                    value: "default"
                },
                {
                    label: "Big",
                    value: "big"
                }

            ]}

            onChange={(value) => setter({ lines: value })}
        />
    </>

}