import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useFileUpload } from '../hooks/useFileUpload';

export default function Change({
    attributes,
    setAttributes
}) {

    const {
        thermal
    } = attributes;

    const {
        start,
        cancel,
        success,
        types
    } = useFileUpload(
        thermal,
        url => setAttributes({ thermal: url })
    );

    return <MediaUpload
        allowedTypes={types}
        onSelect={success}
        onClose={cancel}
        render={({ open }) => <Button
            onClick={() => {
                start();
                open();
            }}
            variant="primary"
            size="compact"
        >
            {thermal ? __("Change file", "thermal-display") : __("Upload or select a radiometric file", "thermal-display")}
        </Button>
        }
    />

}