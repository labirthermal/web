import { useCallback } from '@wordpress/element';
import { useWebComponent } from '../../utils/useWebComponent';

export default function Range({
    ID,
    setAttributes
}) {
    const onReady = useCallback(node => {
        const range = node.registryController.registryObject.range;
        const listenerKey = ID + "_range";
        range.addListener(listenerKey, value => {
            if (value) setAttributes({ from: value.from, to: value.to });
        });
        return () => range.removeListener(listenerKey);
    }, [ID, setAttributes]);

    const registryRef = useWebComponent('registry-provider', onReady);

    return <registry-provider
        registry-slug={ID}
        ref={registryRef}
    >
        <registry-range-slider></registry-range-slider>
        <registry-ticks-bar></registry-ticks-bar>
        <registry-range-form></registry-range-form>
    </registry-provider>;
}