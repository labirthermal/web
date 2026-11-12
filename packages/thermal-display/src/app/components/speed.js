import { SelectControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

export default function Speed({
    speed,
    setAttributes
}) {
    return <SelectControl
        label={__("Playback Speed", "thermal-display")}
        value={speed}
        options={[
            { label: "0.5x", value: 0.5 },
            { label: "1x", value: 1 },
            { label: "2x", value: 2 },
            { label: "3x", value: 3 },
            { label: "5x", value: 5 },
            { label: "10x", value: 10 },
        ]}
        onChange={(value) => setAttributes({ speed: value })}
    ></SelectControl>
}