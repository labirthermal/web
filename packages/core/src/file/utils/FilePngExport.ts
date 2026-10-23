import { AbstractAreaAnalysis } from "../../properties/analysis/analysis/internals/area/AbstractAreaAnalysis";
import { PointAnalysis } from "../../properties/analysis/analysis/internals/point/PointAnalysis";
import { AbstractExportProps, AbstractExportTypeMandatory, AbstractPngExport } from "../../utils/AbstractPngExport";
import { TimeFormat } from "../../utils/time/formatting";
import { ThermalFileInstance } from "../ThermalFileInstance";

type FileExportPngParams = AbstractExportProps;

type FileExportPngParamsMandatory = AbstractExportTypeMandatory;

export class FilePngExport extends AbstractPngExport<FileExportPngParams, FileExportPngParamsMandatory> {

    public static DEFAULT_PARAMS: FileExportPngParamsMandatory = {
        fileName: "sth",
        width: 1200,
        fontSize: 20,
        textColor: "black",
        backgroundColor: "white",
        showAnalysis: true,
        showFileName: false,
        showFileDate: false,
        license: undefined,
        showThermalScale: true,
    }

    protected localInstance?: ThermalFileInstance;

    public constructor(
        public readonly file: ThermalFileInstance
    ) {
        super();
    }



    protected onBuildDom(): void { }

    protected beforeDomRemoved(): void { }


    protected afterDomRemoved(): void {
        this.localInstance?.group.registry.manager.removeRegistry(this.localInstance.group.registry.id);
        delete this.localInstance;

    }

    protected getFinalParams(params?: AbstractExportProps | undefined): FileExportPngParamsMandatory {

        const fileName = params && params.fileName
            ? params.fileName
            : `${this.file.fileName}__export`

        return {
            ...FilePngExport.DEFAULT_PARAMS,
            ...params,
            fileName: fileName
        }
    }
    protected async onDownload(params: AbstractExportTypeMandatory): Promise<void> {

        const registryId = Math.random().toString();

        // Build inner container
        const manager = this.file.group.registry.manager;
        const registry = manager.addOrGetRegistry(registryId);
        const group = registry.groups.addOrGetGroup(registryId);

        const fontSize = `${params.fontSize}px`;

        // Mirror state
        // Mirror the group state to the local objects
        manager.palette.setPalette(this.file.group.registry.manager.palette.value);
        registry.range.imposeRange(this.file.group.registry.range.value!);


        this.localInstance = await this.file.reader.createInstance(group);

        /** @todo Hotfix - remove visible files */
        this.localInstance.removeVisibleFile();

        const relativeTime = this.file.timeline.currentStep.relative;

        if (relativeTime !== 0) {
            this.localInstance.timeline.setRelativeTime(relativeTime);
        }

        if (this.container) {

            this.container.style.lineHeight = `${params.fontSize * 1.5}px`;

            const registryMin = this.file.group.registry.minmax.value!.min;
            const registryMax = this.file.group.registry.minmax.value!.max;

            if (params.showFileName || params.showFileDate) {

                const infoElement = document.createElement("div");
                infoElement.style.paddingBottom = `${params.fontSize / 3}px`;


                if (params.showFileDate) {
                    const infoText = TimeFormat.human(this.file.timestamp);
                    infoElement.appendChild(
                        this.createElementWithText("span", infoText, fontSize, "bold", params.textColor)
                    );
                }

                if (params.showFileName) {
                    const infoText = (params.showFileDate ? " - " : "")
                        + this.file.fileName;
                    const infoWeight = params.showFileDate ? "normal" : "bold";
                    infoElement.appendChild(
                        this.createElementWithText("span", infoText, fontSize, infoWeight, params.textColor)
                    );
                }

                

                this.container.appendChild(infoElement);

            }

            // Thermal scale
            if (params.showThermalScale === true) {

                const highlight = registryMin !== this.file.meta.current.min || registryMax !== this.file.meta.current.max
                    ? { from: this.file.meta.current.min, to: this.file.meta.current.max }
                    : undefined;

                this.container.appendChild(this.buildHorizontalScale(
                    this.container,
                    registryMin,
                    registryMax,
                    this.file.group.registry.range.value!.from,
                    this.file.group.registry.range.value!.to,
                    this.file.group.registry.palette.currentPalette.gradient,
                    "gray",
                    "black",
                    highlight
                ));

            }

            // The image itself

            this.localInstance.mountToDom(this.container);

            if (this.localInstance.dom && this.localInstance.dom.visibleLayer) {
                this.localInstance.dom.visibleLayer.getLayerRoot().style.display = "none";
            }

            await this.localInstance.draw();

            // Analysis
            if (params.showAnalysis && this.file.analysis.value.length > 0) {

                const table = document.createElement("table");
                table.style.width = "100%";
                table.style.borderCollapse = "collapse";
                table.style.marginTop = `${params.fontSize / 3}px`;

                const header = document.createElement("tr");

                ["Analysis", "AVG", "MIN", "MAX"].forEach(string => {
                    const el = this.createElementWithText(
                        "th",
                        string,
                        fontSize,
                        undefined,
                        FilePngExport.COLOR_GRAY
                    );
                    el.style.textAlign = "left";
                    el.style.borderBottom = `1px solid ${FilePngExport.COLOR_LIGHT}`;
                    el.style.padding = `${params.fontSize / 3}px 0px ${params.fontSize / 3} 0px`;
                    header.appendChild(el);
                });

                table.appendChild(header);
                this.container.appendChild(table);



                this.file.slots.forEveryExistingSlot((slot, number) => {

                    const localAnalysis = this.localInstance?.slots.createAnalysisFromSerialized(slot.serialized, number);

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

                        name.style.borderBottom = `1px solid ${FilePngExport.COLOR_LIGHT}`;
                        name.style.padding = `${params.fontSize / 3}px 0px ${params.fontSize / 3} 0px`;

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

                            td.style.borderBottom = `1px solid ${FilePngExport.COLOR_LIGHT}`;

                            td.style.paddingTop = `${params.fontSize / 3}px`;
                            td.style.paddingBottom = `${params.fontSize / 3}px`;

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

            // Author & License
            if (params.author || params.license) {

                const byline = document.createElement("div");
                byline.style.lineHeight = "1.5em";
                byline.style.color = FilePngExport.COLOR_GRAY;
                byline.style.paddingTop = `${params.fontSize / 3}px`;

                if (params.author) {
                    byline.appendChild(this.createElementWithText("span", params.author, fontSize));
                }

                if (params.author && params.license) {
                    byline.appendChild(this.createElementWithText("span", " - ", fontSize));
                }

                if (params.license) {
                    byline.appendChild(this.createElementWithText("span", params.license, fontSize));
                }

                this.container.appendChild(byline);

            }

            setTimeout(() => {

                if (this.container) {
                    this.downloadImage(
                        params.fileName,
                        this.container
                    );
                }

            }, 0);

        }

    }



}