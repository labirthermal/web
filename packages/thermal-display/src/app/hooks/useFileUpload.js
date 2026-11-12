import { useCallback, useMemo, useState } from '@wordpress/element';

/**
 * Unified handler of file uploads. Takes care of temporary backup and cancellation.
 * @param {string} currentUrl 
 * @param {(url: string) => void} onSuccess 
 * @returns {{ start: () => void, cancel: () => void, success: (fileUrl: string) => void }}
 */
export const useFileUpload = (
    currentUrl,
    onSuccess
) => {

    const [backupUrl, setBackupUrl] = useState();

    const start = useCallback( () => {
        setBackupUrl(currentUrl);
        onSuccess(currentUrl);
    }, [setBackupUrl, currentUrl, onSuccess] );

    const cancel = useCallback(() => {
        setBackupUrl(undefined);
        onSuccess(backupUrl);
    }, [backupUrl, onSuccess, setBackupUrl]);

    const success = useCallback((file) => {
        onSuccess(file.url);
        setBackupUrl(undefined);
    }, [setBackupUrl]);

    const types = useMemo(() => [
        'application/octet-stream',
        'image/jpeg'
    ], []);

    return {
        start,
        cancel,
        success,
        types
    }

}