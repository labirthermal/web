import { ThermalFileInstance } from "../../../../file/ThermalFileInstance";
import { ThermalGroup } from "../../../../hierarchy/ThermalGroup";
import { Batch } from "../../../../loading/batch/Batch";
import { AbstractExportProps, AbstractExportTypeMandatory, AbstractPngExport } from "../../../../utils/AbstractPngExport";
import { TimeFormat } from "../../../../utils/time/formatting";
import { AbstractAreaAnalysis } from "../../analysis/internals/area/AbstractAreaAnalysis";
import { PointAnalysis } from "../../analysis/internals/point/PointAnalysis";
import { AnalysisSyncDrive } from "../analysisSync";

export type GroupExportPNGParams = AbstractExportProps & {
    columns?: number,
    showGroupName?: boolean,
    label?: string
}

type GroupExportPNGParamsMandatory = AbstractExportTypeMandatory & {
    columns: number,
    showGroupName: boolean,
    label?: string
}

export class GroupExportPNG extends AbstractPngExport<GroupExportPNGParams, GroupExportPNGParamsMandatory> {

    public static DEFAULT_PROPS: GroupExportPNGParamsMandatory = {
        fileName: "export.png",
        columns: 3,
        width: 1600,
        showAnalysis: true,
        showFileDate: true,
        showFileName: false,
        showThermalScale: true,
        license: undefined,
        textColor: "black",
        fontSize: 12,
        showGroupName: true,
        backgroundColor: "white"
    }

    /** Alias to the group this exporter is attached to */
    protected get group() {
        return this.drive.parent;
    }

    /** Temporary local group is used to build a mirror of images. */
    protected localGroup?: ThermalGroup;

    /** The header element with title, description and other stuff */
    protected header?: HTMLDivElement;

    /** Images are mounted to this DIV */
    protected list?: HTMLDivElement;



    public constructor(
        public readonly drive: AnalysisSyncDrive
    ) {
        super();
    }


    /** @deprecated not needed anymore */
    protected buildHeader(): HTMLDivElement {

        return document.createElement("div");

    }


    protected buildList(): HTMLDivElement {

        const element = document.createElement("div");
        element.style.boxSizing = "border-box";
        element.style.width = "100%";
        element.style.display = "flex";
        element.style.flexWrap = "wrap";

        return element;

    }


    protected buildInstance(
        instance: ThermalFileInstance,
        width: number,
        showAnalysis: boolean,
        showFileDate: boolean,
        showFileName: boolean,
        fontSize: string
    ) {

        const container = document.createElement("div");
        container.style.width = width.toString() + "%";
        container.style.padding = GroupExportPNG.GAP_SMALL;
        container.style.boxSizing = "border-box";

        const wrapper = document.createElement("div");
        container.appendChild(wrapper);

        if (showFileDate || showFileName) {

            const label = document.createElement("div");

            if (showFileDate) {
                const date = this.createElementWithText(
                    "div",
                    `${TimeFormat.human(instance.timeline.currentStep.absolute)}`,
                    fontSize,
                    "bold"
                );
                label.appendChild( date );
            }

            if ( showFileName ) {

                const fileName = this.createElementWithText(
                    "div",
                    showFileDate 
                        ? " - " + instance.fileName 
                        : instance.fileName,
                    GroupExportPNG.FONT_SIZE_SMALL,
                    showFileDate 
                        ? "normal" 
                        : "bold"
                );
                label.appendChild( fileName );
            }

            wrapper.appendChild(label);

        }



        // Build the image
        if (this.list) {

            const reference: ThermalFileInstance | undefined = this.group.files.value.find( i => i.fileName === instance.fileName );

            if ( reference ) {

                // Synchronize the MS
                instance.timeline.setRelativeTime( reference?.timeline.currentMs );
            }



            this.list.appendChild(container);

            // HOTFIX: Remove the visible file from the instance
            instance.removeVisibleFile();

            // HOTFIX: Turn off webgl preference for the export
            // In case of large groups, webgl execeeds limit of canvases
            instance.setPreferWebGl( false );

            instance.mountToDom(wrapper);
            instance.draw();

            if (instance.dom && instance.dom.visibleLayer) {
                instance.dom.visibleLayer.getLayerRoot().style.display = "none";
            }


            // Transpose all analysis if necessary
            if (showAnalysis) {

                const referenceInstance = reference;

                if (referenceInstance && referenceInstance.analysis.value.length > 0) {

                    const table = document.createElement("table");
                    table.style.width = "100%";
                    table.style.borderCollapse = "collapse";


                    const header = document.createElement("tr");

                    ["", "AVG", "MIN", "MAX"].forEach(string => {
                        const el = this.createElementWithText(
                            "th",
                            string,
                            fontSize,
                            undefined,
                            GroupExportPNG.COLOR_GRAY
                        );
                        el.style.padding = GroupExportPNG.GAP_SMALL + "px";
                        el.style.textAlign = "left";
                        header.appendChild(el);
                    });


                    table.appendChild(header);
                    wrapper.appendChild(table);

                    referenceInstance.slots.forEveryExistingSlot((slot, number) => {

                        // Transpose the analysis to temporary instance
                        const localAnalysis = instance.slots.createAnalysisFromSerialized(slot.serialized, number);

                        if (localAnalysis) {


                            // Create a record into a table

                            const row = document.createElement("tr");

                            const name = this.createElementWithText(
                                "td",
                                slot.analysis.name,
                                fontSize,
                                undefined,
                                slot.analysis.initialColor
                            );

                            name.style.borderTop = `1px solid ${GroupExportPNG.COLOR_LIGHT}`;
                            name.style.padding = `${GroupExportPNG.GAP_SMALL}px 0px ${GroupExportPNG.GAP_SMALL} 0px`;

                            row.appendChild(name);

                            const createAndAppendValue = (
                                color: string,
                                value?: number,
                            ) => {

                                const td = this.createElementWithText(
                                    "td",
                                    value ? value.toFixed(3) + " °C" : "",
                                    fontSize,
                                    undefined,

                                );

                                td.style.borderTop = `1px solid ${GroupExportPNG.COLOR_LIGHT}`;

                                td.style.paddingTop = `${GroupExportPNG.GAP_SMALL}px`;
                                td.style.paddingBottom = `${GroupExportPNG.GAP_SMALL}px`;

                                row.appendChild(td);
                            }

                            if (slot.analysis instanceof AbstractAreaAnalysis) {

                                createAndAppendValue(slot.analysis.initialColor, localAnalysis.avg);

                                createAndAppendValue(slot.analysis.initialColor, localAnalysis.min);

                                createAndAppendValue(slot.analysis.initialColor, localAnalysis.max);

                            } else if (slot.analysis instanceof PointAnalysis) {

                                createAndAppendValue(slot.analysis.initialColor, localAnalysis.avg);

                                createAndAppendValue(slot.analysis.initialColor);

                                createAndAppendValue(slot.analysis.initialColor);

                            }

                            table.appendChild(row);

                        }



                    });

                }

            }

        }

    }


    protected onBuildDom(): void {
        this.header = this.buildHeader();
        this.list = this.buildList();

        this.container?.appendChild(this.header);
        this.container?.appendChild(this.list);
    }

    protected beforeDomRemoved(): void {

        if (this.localGroup) {

            // Unmount the instances from the DOM
            this.localGroup.files.forEveryInstance(instance => instance.unmountFromDom());

            // Remove all the instances
            this.localGroup.files.removeAllInstances();

        }

    }

    protected afterDomRemoved(): void {

        delete this.header;
        delete this.list;

        // Delete the temporary group and its parameters
        delete this.localGroup;

    }

    protected onDownload(params: GroupExportPNGParamsMandatory): void {

        const registryId = Math.random().toFixed();

        // Build internal structure
        const manager = this.group.registry.manager;
        const registry = manager.addOrGetRegistry(registryId);
        const group = registry.groups.addOrGetGroup(this.group.id);

        // Popilate the header
        if ( params.showGroupName && this.header ) {

            const label = params.label ? params.label : this.group.label;
            this.header.appendChild(
                this.createElementWithText<HTMLDivElement>(
                    "div",
                    label,
                    params.fontSize.toString() + "px",
                    "bold"
                )
            );
            this.header.style.paddingBottom = GroupExportPNG.GAP_BASE;
        }

        // Build the temperature scale

        if ( params.showThermalScale ) {
            this.list?.appendChild(this.buildHorizontalScale(
            this.list!,
            this.group.registry.minmax.value!.min,
            this.group.registry.minmax.value!.max,
            this.group.registry.range.value!.from,
            this.group.registry.range.value!.to,
            this.group.registry.palette.currentPalette.gradient,
            "gray",
            "black"
        ));
        }

        // Assign the local group for further usage
        this.localGroup = group;

        // Mirror the group state to the local objects
        manager.palette.setPalette(this.group.registry.manager.palette.value);
        registry.range.imposeRange(this.group.registry.range.value!);

        // Extract URLS of affected images
        const imagesThermalUrls = this.group.files.sortedFiles.map(file => file.thermalUrl);

        // Store the batch so that it may be used later
        let batch: Batch | undefined = undefined;

        // Request all the images
        imagesThermalUrls.forEach(url => {
            batch = registry.batch.request(url, undefined, group, async () => { });
        });

        // Set listener on the batch resolve event
        batch!.onResolve.set("temporary export listener", results => {

            const width = 100 / params.columns!;

            // Build all recieved instances
            results.forEach(result => {
                if (result instanceof ThermalFileInstance) {
                    this.buildInstance(
                        result, 
                        width, 
                        params.showAnalysis, 
                        params.showFileDate, 
                        params.showFileName,
                        params.fontSize.toString() + "px"
                    );
                }
            });

            // Wait for some time (instances need to render) and then export and cleanup
            setTimeout(() => {

                if (this.container) {
                    this.downloadImage(
                        params.fileName,
                        this.container
                    );
                }

            }, 2000);

        });

    }


    /**
     * Take provided parameters and combine them with defaults and add filename.
     */
    protected getFinalParams(
        params?: GroupExportPNGParams
    ): GroupExportPNGParamsMandatory {

        const fileName = params?.fileName
            ? params.fileName
            : `group__${this.group.label}__export`;

        if (params === undefined) {
            return {
                ...GroupExportPNG.DEFAULT_PROPS,
                fileName
            } as GroupExportPNGParamsMandatory
        }

        return {
            ...GroupExportPNG.DEFAULT_PROPS,
            ...params,
            fileName
        } as GroupExportPNGParamsMandatory

    }

}