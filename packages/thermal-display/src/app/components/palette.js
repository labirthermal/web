import { useCallback, useRef } from '@wordpress/element';
import { useWebComponent } from '../../utils/useWebComponent';

/**
 * Share a manager between the display controls and synchronize its palette settings.
 */
export default function Palettes({
    ID,
    palette,
    advancedPalettes,
    setAttributes,
    children
}) {
    const currentAttributes = useRef({ palette, advancedPalettes });
    currentAttributes.current = { palette, advancedPalettes };

    const onReady = useCallback(node => {
        const paletteDrive = node.managerObject.palette;
        const controller = node.managerController;
        const paletteKey = ID + "_palette";
        const advancedKey = ID + "_advancedPalettes";

        const onPaletteChange = value => {
            if (currentAttributes.current.palette !== value) {
                currentAttributes.current.palette = value;
                setAttributes({ palette: value });
            }
        };

        const onAdvancedChange = value => {
            if (currentAttributes.current.advancedPalettes !== value) {
                currentAttributes.current.advancedPalettes = value;
                setAttributes({ advancedpalettes: value });
            }
        };

        paletteDrive.addListener(paletteKey, onPaletteChange);
        controller.onAdvancedPalettesChange.add(advancedKey, onAdvancedChange);
        onPaletteChange(paletteDrive.value);
        onAdvancedChange(node.advancedPalettes);

        return () => {
            paletteDrive.removeListener(paletteKey);
            controller.onAdvancedPalettesChange.delete(advancedKey);
        };
    }, [setAttributes, ID]);

    const managerRef = useWebComponent('manager-provider', onReady);

    return <manager-provider
        palette={palette}
        manager-slug={ID}
        advanced-palettes={advancedPalettes ? '' : undefined}
        ref={managerRef}
    >
        {children}
    </manager-provider>;
}