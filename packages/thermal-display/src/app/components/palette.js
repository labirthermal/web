import { useCallback, useRef } from '@wordpress/element';
import { useWebcomponent } from '../hooks/useWebcomponent';
/**
 * Share a manager between the display controls and synchronize its palette settings.
 */
export default function Palettes({
    ID,
    palette,
    unit,
    setAttributes
}) {
    const currentAttributes = useRef({ palette });
    currentAttributes.current = { palette };

    const onReady = useCallback(node => {

        const paletteDrive = node.managerObject.palette;
        const paletteKey = ID + "_palette";

        const onPaletteChange = value => {
            if (currentAttributes.current.palette !== value) {
                currentAttributes.current.palette = value;
                setAttributes({ palette: value });
            }
        };

        paletteDrive.addListener(paletteKey, onPaletteChange);

        onPaletteChange(paletteDrive.value);

        return () => {
            paletteDrive.removeListener(paletteKey);
        };
    }, [setAttributes, ID]);

    const managerRef = useWebcomponent(onReady);

    return <manager-provider
        palette={palette}
        manager-slug={ID}
        advanced-palettes
        unit={unit}
        ref={managerRef}
    >
        <manager-palette-dropdown></manager-palette-dropdown>
    </manager-provider>;
}