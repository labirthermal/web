import {
    CheckboxControl
} from '@wordpress/components';


export default function AdvancedPalette({
    advancedPalettes,
    setAttributes
}) {
    return <CheckboxControl
        __nextHasNoMarginBottom
        checked={advancedPalettes}
        label="Enable advanced palettes"
        onChange={(value) => setAttributes({ advancedpalettes: value })}
    />;
}