import { useCallback } from '@wordpress/element';
import { useWebcomponent } from '../hooks/useWebcomponent';

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

    const registryRef = useWebcomponent(onReady);

    return <manager-provider
        manager-slug={ID}
        advanced-palettes
    >
        <registry-provider
            registry-slug={ID}
            ref={registryRef}
        >
            <registry-histogram></registry-histogram>
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
            <registry-range-form></registry-range-form>
        </registry-provider>
    </manager-provider>;
}