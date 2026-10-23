import { useNotations } from "./useNotations";

import { useCallback, useMemo, useState } from '@wordpress/element';

import {
    Button,
    PanelBody,
    Placeholder,
    SelectControl,
    TextControl,
    Tooltip,
    RangeControl,
    PanelHeader,
    CheckboxControl,
    Modal,
    ButtonGroup,
} from '@wordpress/components';

import { InspectorControls, MediaUpload, MediaUploadCheck, useBlockProps } from '@wordpress/block-editor';

import { formatTimestamp } from "../editor/EditorModal";



const Notation = ({
    notation,
    updateFn,
    deleteFn
}) => {


    return <tr
    // onClick={() => setCurrentNotation(notation.id)}
    >
        <td>
            <TextControl
                value={notation.from}
                onChange={value => {
                    updateFn(notation.id, {
                        from: value
                    })
                }}
            />
        </td>
        <td>
            <TextControl
                value={notation.to}
                onChange={value => {
                    updateFn(notation.id, {
                        to: value
                    })
                }}
            />
        </td>
        <td>
            <TextControl
                value={notation.label}
                onChange={value => {
                    updateFn(notation.id, {
                        label: value
                    })
                }}
            />
        </td>
        <td>
            <MediaUpload
                allowedTypes="image"
                onSelect={result => {
                    console.log(result);
                    // successfullyUploadedVisibleFile(result.url);
                    updateFn(notation.id, {
                        image: result.url
                    })
                }}
                render={({ open }) => (
                    <div className="file-upload-cell">

                        {notation.image && <img
                            src={notation.image}
                            alt={notation.img}
                            onClick={open}
                            className="notation-image"
                        />}

                        <ButtonGroup>


                            {notation.image
                                ? <Button
                                    variant="secondary"
                                    size="small"
                                    onClick={() => {
                                        updateFn(notation.id, {
                                            image: undefined
                                        });
                                    }}
                                >Remove image</Button>
                                : <Button
                                    onClick={open}
                                    variant="primary"
                                    size="small"
                                >
                                    {true ? "Change file" : "Upload or select a visible image"}
                                </Button>
                            }


                        </ButtonGroup>
                    </div>
                )}
            />
        </td>

        <td>
            <Button onClick={deleteFn} variant="tertiary" size="compact">Remove</Button>
        </td>


    </tr>

}

export const NotationsEditorLayout = ({
    attributes,
    setAttributes,
    duration,
    ms
}) => {

    const n = useNotations(attributes.notations, setAttributes, duration);


    return <>

        <p>Sequence duration: <strong>{formatTimestamp(duration)}</strong></p>

        <table class="notations-table">
            {n.array.length > 0 && <thead>
                <tr>
                    <th>From</th>
                    <th>To</th>
                    <th>Text</th>
                    <th>Image</th>
                    <th>Actions</th>
                </tr>
            </thead>}
            <tbody>
                {n.array.map(notation => <Notation
                    notation={notation}
                    setAttributes={setAttributes}
                    updateFn={n.updateNotation}
                    deleteFn={() => n.removeNotation(notation.id)}
                />)}
            </tbody>
        </table>

        <Button
            onClick={() => {
                n.addNotation(ms, ms, "Popiska notace");
            }}
            variant="primary"
        >Add notation</Button>

    </>

}