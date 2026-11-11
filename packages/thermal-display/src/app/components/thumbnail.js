import { useCallback, useState } from '@wordpress/element';
import { useWebcomponent } from '../hooks/useWebcomponent';

import {
    __experimentalItemGroup as ItemGroup
} from '@wordpress/components';
import { Icon, image, info, video } from '@wordpress/icons';

function Row({
    icon,
    children
}) {

    if (children === undefined || children === null) {
        return <></>;
    }

    return <div style={{ display: 'flex', alignItems: 'center', width: '100%', gap: ".2em", padding: ".2em" }}>
        <Icon icon={icon} />
        {children}
    </div>
}

/**
 * Thumbnail component of the provided file along with its base information
 */
export default function Thumbnail({
    ID,
    thermal,
    palette,
    from,
    to,
    ms,
    setIsSequence,
    unit
}) {

    const [fileName, setFileName] = useState();
    const [duration, setDuration] = useState();
    const [fileSize, setFileSize] = useState();
    const [fileType, setFileType] = useState();

    const onReady = useCallback(node => {

        const controller = node.fileController;

        const onSuccess = instance => {
            setFileName(instance.fileName);
            setFileType(instance.reader.parser.name);

            if (instance.duration) {
                const formattedDuration = new Date(instance.duration).toISOString().substr(11, 8);
                const numFrames = instance.timeline.steps.length + " frames";
                setDuration(formattedDuration + " (" + numFrames + ")");
                setIsSequence(instance.timeline.isSequence);
            } else {
                setIsSequence(false);
            }

            const fileSizeInMB = (instance.meta.current.bytesize / (1024 * 1024)).toFixed(2) + " MB";
            setFileSize(fileSizeInMB);
        };

        controller.onSuccess.set("thumbnail", onSuccess);
        if (controller.fileObject) onSuccess(controller.fileObject);
        return () => controller.onSuccess.delete("thumbnail");
    }, []);

    const fileProviderRef = useWebcomponent(onReady);

    return <manager-provider
        palette={palette}
        advanced-palettes
        unit={unit}
        manager-slug={ID}
    >
        <registry-provider
            from={from}
            to={to}
            registry-slug={ID}
        >
            <group-provider>
                <file-provider
                    thermal={thermal}
                    ref={fileProviderRef}
                    ms={ms}
                >
                    <file-canvas />
                    <ItemGroup>
                        <Row icon={image}>{fileName}</Row>
                        <Row icon={info}>{fileType}</Row>
                        <Row icon={video}>{duration}</Row>
                        <Row icon={info}>{fileSize}</Row>
                    </ItemGroup>
                </file-provider>
            </group-provider>
        </registry-provider>
    </manager-provider>

}