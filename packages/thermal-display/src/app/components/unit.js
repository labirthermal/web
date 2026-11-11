import { useCallback, useMemo } from '@wordpress/element';
import { useWebcomponent } from '../hooks/useWebcomponent';


export function Unit({
    ID,
    unit,
    setAttributes
}){

    const slug = useMemo(() => ID + "__unit", [ID]);

    const onReady = useCallback(provider => {

        console.log(provider);

        provider.managerObject.unit.addListener(
            slug,
            value => setAttributes({unit: value})
        );

    }, [slug, setAttributes, slug]);

    const managerProviderRef = useWebcomponent(onReady);

    return <manager-provider
        manager-slug={slug}
        advanced-palettes
        unit={unit}
        ref={managerProviderRef}
    >
        <manager-unit-dropdown></manager-unit-dropdown>
    </manager-provider>

    

}