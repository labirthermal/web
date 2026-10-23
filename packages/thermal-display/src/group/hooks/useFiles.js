import { useCallback, useEffect, useMemo, useRef, useState } from '@wordpress/element';


/**
 * 
 * @param {string[]} records 
 */
const formatResult = (
    records
) => {
    return records.join(";");
}

/**
 * @param {string[]} entries 
 */
const formatRecord = (
    entries
) => {
    return entries.join("|");
}

/**
 * @param {string} key 
 * @param {string} value 
 */
const formatEntry = (key, value) => {
    return `${key}~${value}`;
}

/**
             * 
             * @param {string} str 
             * @param {string} separator 
             * @returns 
             */
const splitBy = (str, separator) => {
    return str.split(separator).map(s => s.trim());
}

/**
     * 
     * @param {string} value 
     */
const parseString = (
    value
) => {

    const filesStrings = splitBy(value, ";");

    const filesRecords = filesStrings.map(file => {

        const fileSegments = splitBy(file, "|");

        const fileRecords = fileSegments.map(segment => {

            const [key, value] = splitBy(segment, "~");

            return [key, value];

        });

        return fileRecords;

    });

    const filesObjects = filesRecords.map(record => {
        return Object.fromEntries(record);
    });

    const filesValue = Object.fromEntries(filesObjects.map(record => [record.thermal, record]));

    return filesValue;

};

/**
 * 
 * @param {string|undefined} initialValue 
 * @returns 
 */
export const useFiles = (
    initialValue
) => {

    const initial = useMemo(() => initialValue, []);

    const initialFiles = useMemo( () => {

        if ( initialValue === undefined ) {
            return {};
        }
        const parsedFiles = parseString(initialValue);
        return parsedFiles;
    }, [] );

    const [
        files,
        setFiles
    ] = useState(initialFiles);

    const [parsed, setParsed] = useState(initial);

    useEffect(() => {
        if (initial)
            setFiles(parseString(initial));
    }, [initial]);

    useEffect(() => {

        if (typeof files === "object") {

            let str = "";

            const filesBuffer = [];


            Object.entries(files).forEach(
                ([url, file]) => {

                    const keys = Object.keys(file);

                    if (keys.includes("thermal")) {

                        const entries = [
                            formatEntry("thermal", file.thermal)
                        ];

                        if (keys.includes("visible")) {
                            entries.push("visible", formatEntry("visible", file.visible));
                        }

                        if (keys.includes("note")) {
                            entries.push("note", formatEntry("note", file.note));
                        }

                        if (keys.includes("label")) {
                            entries.push(formatEntry("label", file.label));
                        }

                        const record = formatRecord(entries);

                        filesBuffer.push(record);

                    }

                }
            );

            str = formatResult(filesBuffer);

            if (str.length > 0) {
                setParsed(str);
            } else {
                setParsed(undefined);
            }

        }

        else {
            setParsed(undefined);
        }

    }, [files]);


    const addFile = useCallback(
        /**
         * 
         * @param {string} thermal 
         * @param {string|undefined} visible 
         * @param {string|undefined} label 
         * @param {string|undefined} note 
         */
        (
            thermal,
            visible,
            label,
            note
        ) => {

            // If the file exists already, update it
            if (Object.keys(files).includes(thermal)) {
                files[thermal] = {
                    ...files[thermal],
                    visible,
                    label,
                    note
                }
                setFiles({ ...files });
            } else {
                if (thermal.length > 0 && thermal) {
                    files[thermal] = {
                        visible,
                        thermal,
                        label,
                        note
                    };
                    setFiles({ ...files });
                }
            }

        }, [setFiles, files]);


    const removeFile = useCallback(
        /**
         * 
         * @param {string} url 
         */
        (url) => {
            if (Object.keys(files).includes(url)) {
                const { [url]: _, ...updatedValue } = files;
                setFiles(updatedValue);
            }
        }, [setFiles, files]);


    const syncUrls = useCallback(
        /**
         * 
         * @param {string[]} urls 
         */
        (
            urls
        ) => {

            const f = { ...files };

            const keys = Object.keys(f);

            // Add files that were not yet
            urls.forEach(url => {

                if (!keys.includes(url)) {
                    console.log( "added", url );
                    f[url] = {
                        thermal: url
                    }
                }

            });

            // Remove files that are no more
            keys.forEach(url => {

                if (!urls.includes(url)) {
                    console.log( "removing", url );
                    delete f[url]
                }
            });

            // Set the file lastly
            setFiles(f);

        }, [files, setFiles]);


    const updateFileUrl = useCallback(
        /**
         * 
         * @param {string} originalUrl 
         * @param {string} newUrl 
         */
        (
            originalUrl,
            newUrl
        ) => {

            if (Object.keys(files).includes(originalUrl)) {

                const f = { ...files }

                const entry = {
                    ...f[originalUrl],
                    thermal: newUrl
                }

                delete f[originalUrl];

                f[newUrl] = entry;

                setFiles(f);

            }

        }, [files, setFiles]);


    const updateFileLabel = useCallback(
        /**
         * 
         * @param {string} url 
         * @param {string|undefined} label 
         */
        (
            url,
            label
        ) => {

            console.log( url, label );

            if (Object.keys(files).includes(url)) {
                const f = { ...files };

                f[url].label = label;

                setFiles(f);
            }

        }, [files, setFiles]);


    const updateFileNote = useCallback(
        /**
         * 
         * @param {string} url 
         * @param {string|undefined} note 
         */
        (
            url,
            note
        ) => {

            if (Object.keys(files).includes(url)) {

                const f = { ...files };

                f[url] = note;

                setFiles(f);

            }

        }, [files, setFiles]);


    return {
        files,
        parsed,
        addFile,
        removeFile,
        syncUrls,
        updateFileLabel,
        updateFileUrl,
        updateFileNote,
    }




}