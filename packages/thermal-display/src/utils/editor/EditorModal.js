import {
    Button,
    Panel,
    PanelBody,
    Placeholder,
    SelectControl,
    TextControl,
    Tooltip,
    RangeControl,
    PanelHeader,
    CheckboxControl,
    TabPanel,
    Modal,
    PanelRow
} from '@wordpress/components';
import { useCallback, useMemo, useState } from '@wordpress/element';

import { __ } from '@wordpress/i18n';
import { NotationsEditorLayout } from '../notationEditor/notationEditor';


const formatFixed = (number, fixed) => {

    const f = number.toFixed(0);
    const length = f.length;
    const add = length - fixed;
    let result = [];
    if (add > 0) {
        for (let i = 0; i < add; i++) {
            result.push(0);
        }
    }

    result.push(f);

    return result.join("");
}

export const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    return `${formatFixed(date.getUTCMinutes(), 0)}:${formatFixed(date.getUTCSeconds(), 2)}.${formatFixed(date.getUTCMilliseconds(), 3)}`;
}


export const EditorModal = ({
    attributes,
    setAttributes,
    onClose
}) => {

    const ID = useMemo(() => (Math.random() * 1000000).toFixed(0), []);
    const getId = useCallback((input) => `${ID}__${input}`, [ID]);

    const {
        thermal,
        visible,
        opacity,
        palette,
        variant,
        showhistogram,
        showlayout,
        interactiveanalysis,
        showshare,
        from,
        to,
        author,
        license,
        label,
        analysis1,
        analysis2,
        analysis3,
        analysis4,
        analysis5,
        analysis6,
        analysis7,
        notations
    } = attributes;

    const [tab, setTab] = useState("analyses");

    const [ms, setMs] = useState(0);

    const [duration, setDuration] = useState(undefined);

    const fileProviderRef = useCallback(node => {

        if (node) {

            /** Mirror internal changes of analysis to the global state */
            const closure = instance => {

                instance.slots.onSlot1Serialize.set(ID, value => setAttributes({ analysis1: value }));

                instance.slots.onSlot2Serialize.set(ID, value => setAttributes({ analysis2: value }));

                instance.slots.onSlot3Serialize.set(ID, value => setAttributes({ analysis3: value }));

                instance.slots.onSlot4Serialize.set(ID, value => setAttributes({ analysis4: value }));

                instance.slots.onSlot5Serialize.set(ID, value => setAttributes({ analysis5: value }));

                instance.slots.onSlot6Serialize.set(ID, value => setAttributes({ analysis6: value }));

                instance.slots.onSlot7Serialize.set(ID, value => setAttributes({ analysis7: value }));

                instance.group.registry.range.addListener(ID, value => setAttributes({ from: value.from, to: value.to }));

                instance.group.registry.manager.palette.addListener(ID, value => setAttributes({ palette: value }));

                setDuration(instance.timeline.duration);

                instance.timeline.addListener(ID, value => {
                    setMs(value)
                });

            }

            node.fileController.onSuccess.set(getId("instance_created__2"), closure);

        }

    }, [thermal, setMs]);

    const tabs = useMemo(() => {

        const result = [{
            name: 'analyses',
            title: 'Analyses',
            className: 'tab-one',
            children: <><PanelRow>
                <manager-tool-bar />
            </PanelRow>
                <PanelRow style={{ width: "100%" }}>
                    <file-analysis-table style={{ width: "100%" }} />
                </PanelRow>
                <PanelRow style={{ width: "100%" }}>
                    <file-analysis-graph style={{ width: "100%" }} />
                </PanelRow>
            </>
        }];

        if (duration > 0) {
            result.push({
                name: 'notations',
                title: 'Notations',
                className: 'tab-two',
                children: <>
                    <NotationsEditorLayout
                        attributes={attributes}
                        setAttributes={setAttributes}
                        duration={duration}
                        ms={ms}
                    />
                </>
            });
        }

        result.push({
            name: 'display',
            title: 'Display',
            className: 'tab-display',
            children: <>

                <PanelRow>
                    <manager-palette-dropdown />
                </PanelRow>

                <PanelRow>
                    <SelectControl
                        label="Variant"
                        value={variant}
                        options={[
                            {
                                label: "Advanced analyser",
                                value: "advanced"
                            },
                            {
                                label: "Simple layout",
                                value: "simple"
                            },
                            {
                                label: "Lesson",
                                value: "lesson"
                            },
                            {
                                label: "Image without interface",
                                value: "nogui"
                            }
                        ]}
                        onChange={(value) => setAttributes({ variant: value })}
                    />

                </PanelRow>



                {visible && <PanelRow
                    style={{ paddingTop: "1rem" }}
                >
                    <RangeControl
                        __nextHasNoMarginBottom
                        label="IR image opacity"
                        help="If a visible file is provided, you can set the initial transparency of the thermal file."
                        value={opacity}
                        onChange={(value) => setAttributes({ opacity: value })}
                        min={0}
                        max={1}
                        step={0.01}
                    />
                </PanelRow>}

                <PanelRow>
                    <CheckboxControl
                        __nextHasNoMarginBottom
                        checked={showhistogram}
                        label="Show histogram"
                        hint="Enable histogram display in the thermal scale?"
                        onChange={(value) => { setAttributes({ showhistogram: value }) }}
                    />
                </PanelRow>

                <PanelRow>
                    <CheckboxControl
                        __nextHasNoMarginBottom
                        checked={showshare}
                        label="Show share button"
                        help="Display a button with instruction on embedding this file to other websites?"
                        onChange={(value) => { setAttributes({ showshare: value }) }}
                    />
                </PanelRow>

                <PanelRow>
                    <CheckboxControl
                        __nextHasNoMarginBottom
                        checked={showlayout}
                        label="Show layout button"
                        help="Enable the user to change the application layout?"
                        onChange={(value) => { setAttributes({ showlayout: value }) }}
                    />
                </PanelRow>

                <PanelRow>
                    <CheckboxControl
                        __nextHasNoMarginBottom
                        checked={interactiveanalysis}
                        label="Interactive analysis"
                        help="Should the visitor be able to edit analysis?"
                        onChange={(value) => { setAttributes({ interactiveanalysis: value }) }}
                    />
                </PanelRow>
            </>
        });

        result.push({
            name: 'metadata',
            title: 'Metadata',
            className: 'tab-three',
            children: <><PanelRow>
                <TextControl
                    label={__(
                        'Author',
                        'thermal-display'
                    )}
                    value={author || ''}
                    onChange={(value) =>
                        setAttributes({ author: value })
                    }
                />

                <TextControl
                    label={__(
                        'License',
                        'thermal-display'
                    )}
                    value={license || ''}
                    onChange={(value) =>
                        setAttributes({ license: value })
                    }
                />

                <TextControl
                    label={__(
                        'Label',
                        'thermal-display'
                    )}
                    help="Label appears on the black button on top & left of the app."
                    value={label || ''}
                    onChange={(value) =>
                        setAttributes({ label: value })
                    }
                />
            </PanelRow>
            </>
        });


        return result;
    }, [attributes, setAttributes, duration]);

    console.log(attributes);

    return <Modal
        title='File editor'
        onRequestClose={onClose}
        isFullScreen
        className='file-editor'
    >
        {formatTimestamp(ms)}

        <manager-provider
            // manager-slug="notations-editor"
            palette={attributes.palette}
            autoclear={true}
        >
            <registry-provider
                // registry-slug="notations-editor"
                autoclear={true}
                from={from}
                to={to}
            >
                <group-provider
                    // group-slug="notations-editor"
                    autoclear={true}
                >
                    <file-provider
                        thermal={thermal}
                        visible={visible}
                        ref={fileProviderRef}
                        analysis1={analysis1}
                        analysis2={analysis2}
                        analysis3={analysis3}
                        analysis4={analysis4}
                        analysis5={analysis5}
                        analysis6={analysis6}
                        analysis7={analysis7}
                        autoclear={true}
                        batch={true}
                    >

                            {Object.values(notations).length > 0 && Object.values(notations).map(notation => <notation-entry 
                                label={notation.label} 
                                slot="notation" 
                                from={notation.from} 
                                to={notation.to} 
                            />)}

                            <main class="file-editor-layout">

                                <section>
                                    <div class="file-editor-stack gap-bottom">
                                        <registry-palette-dropdown />
                                        <registry-range-full-button />
                                        <registry-range-auto-button />
                                        <file-info-button />
                                    </div>

                                    <div class="">
                                        <registry-histogram />
                                        <registry-range-slider />
                                        <registry-ticks-bar />
                                    </div>

                                    <file-canvas />
                                    <file-timeline />

                                </section>

                                <section>
                                    <TabPanel
                                        className="my-tab-panel"
                                        onSelect={setTab}
                                        tabs={tabs}
                                    >
                                        {(tab) => <div className="file-editor-tab">
                                            <Panel header={tab.title}>
                                                <React.Fragment key=".0">
                                                    <PanelBody>
                                                        {tab.children}
                                                    </PanelBody>
                                                </React.Fragment>
                                            </Panel>
                                        </div>
                                        }
                                    </TabPanel>
                                </section>

                            </main>

                    </file-provider>
                </group-provider>
            </registry-provider>
        </manager-provider>

    </Modal>

}