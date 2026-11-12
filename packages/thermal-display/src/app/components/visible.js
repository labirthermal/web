import { MediaUpload } from '@wordpress/block-editor';
import { Button } from '@wordpress/components';
import { useCallback } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { useFileUpload } from '../hooks/useFileUpload';

export default function Visible({
    attributes,
    setAttributes
}) {

    const {
        visible
    } = attributes;

    const callback = useCallback(url => {
        setAttributes({ visible: url });
    }, [setAttributes]);

    const {
        start,
        cancel,
        success
    } = useFileUpload(
        visible,
        callback
    );

    const remove = useCallback(() => {
        setAttributes({ visible: undefined, opacity: 1 });
    }, [setAttributes]);

    return <MediaUpload
        allowedTypes="image"
        onSelect={success}
        onCancel={cancel}
        render={({ open }) => (
            <>
                <Button
                    onClick={() => {
                        start();
                        open();
                    }}
                    variant="primary"
                >
                    {visible ? __("Change file", "thermal-display") : __("Upload or select a visible image", "thermal-display")}
                </Button>
                {visible && <Button
                    variant="secondary"
                    onClick={remove}
                >{__("Remove", "thermal-display")}</Button>}
            </>
        )}
    />

}