import { download, generateCsv, mkConfig } from "export-to-csv";
import { AnalysisSyncDrive } from "../analysisSync";
import { AbstractAnalysis } from "../../analysis/internals/AbstractAnalysis";
import { AbstractAreaAnalysis } from "../../analysis/internals/area/AbstractAreaAnalysis";
import { AnalysisSlot } from "../../slots/AnalysisSlot";
import { TimeFormat } from "../../../../utils/time/formatting";

type ExportHeaderEntryType = {
    key: string,
    displayLabel: string
};

type ExportHeaderType = ExportHeaderEntryType[];

export class GroupExportCSV {

    public constructor(
        public readonly drive: AnalysisSyncDrive
    ) {

    }

    protected formatAnalysisDisplayName(
        analysis: AbstractAnalysis,
        scope?: string
    ): string {

        const nameBase = `${analysis.name} (${analysis.getType()}, ${analysis.initialColor}})`;

        if ( analysis instanceof AbstractAreaAnalysis && scope ) {
            return nameBase + " " + scope.toUpperCase();
        }

        return nameBase;
    }

    protected formatAnalysisKey(
        analysis: AbstractAnalysis,
        scope?: string
    ) {

        const keyBase = analysis.key;

        if ( analysis instanceof AbstractAreaAnalysis && scope ) {
            return keyBase + "_" + scope;
        }

        return keyBase;

    }

    protected formatFrameSlotValue(
        slot: AnalysisSlot,
        scope?: "min"|"max"|"avg"
    ): {
        key: string,
        value: string
    } {

        if ( slot.analysis instanceof AbstractAreaAnalysis && scope ) {

            let value = slot.analysis.avg!;

            if ( scope === "min" ) value = slot.analysis.min!;
            if ( scope === "max" ) value = slot.analysis.max!;

            return {
                key: this.formatAnalysisKey( slot.analysis, scope ),
                value: value.toString()
            }

        }

        return {
            key: this.formatAnalysisKey( slot.analysis ),
            value: slot.analysis.avg!.toString()
        }

    }

    /** Assamble the export header and data */
    protected getData() {

        const header: ExportHeaderType = [
            { key: "file", displayLabel: "File name" },
            { key: "timestamp", displayLabel: "Frame time" },
            { key: "frame", displayLabel: "Frame ID" }
        ];

        this.drive.forEveryExistingSlot( slot => {

            if ( slot.analysis instanceof AbstractAreaAnalysis ) {

                header.push({
                    key: this.formatAnalysisKey( slot.analysis, "min" ),
                    displayLabel: this.formatAnalysisDisplayName( slot.analysis, "min" )
                });

                header.push({
                    key: this.formatAnalysisKey( slot.analysis, "max" ),
                    displayLabel: this.formatAnalysisDisplayName( slot.analysis, "max" )
                });

                header.push({
                    key: this.formatAnalysisKey( slot.analysis, "avg" ),
                    displayLabel: this.formatAnalysisDisplayName( slot.analysis, "avg" )
                });

            } else {

                header.push({
                    key: this.formatAnalysisKey( slot.analysis ),
                    displayLabel: this.formatAnalysisDisplayName( slot.analysis )
                })

            }

        } );


        const data: {
            [index: string]: string|number
        }[] = [];

        this.drive.parent.files.value
            .sort( ( a, b ) => {return a.timestamp - b.timestamp} )
            .forEach( file => {

                const row: {
                    [index: string]: string|number
                } = {
                    file: file.fileName,
                    timestamp: TimeFormat.human( file.timeline.currentStep.absolute ),
                    frame: file.timeline.currentStep.index
                }

                file.slots.forEveryExistingSlot( ( slot ) => {

                    if ( slot.analysis instanceof AbstractAreaAnalysis ) {

                        const min = this.formatFrameSlotValue( slot, "min" );
                        const max = this.formatFrameSlotValue( slot, "max" );
                        const avg = this.formatFrameSlotValue( slot, "avg" );

                        row[ min.key ] = min.value;
                        row[ max.key ] = max.value;
                        row[ avg.key ] = avg.value;

                    } else {

                        const avg = this.formatFrameSlotValue( slot );

                        row[ avg.key ] = avg.value;

                    }

                } );

                data.push( row );




            } );




        return {
            header,
            data
        };

    }

    public downloadAsCsv() {

        const group = this.drive.parent;

        const groupIdentificator = group.name ?? group.id ?? group.hash;

        const { header, data } = this.getData();

        const csvConfig = mkConfig({
            fieldSeparator: ";",
            filename: `group_${groupIdentificator}`,
            columnHeaders: header
        });

        const csv = generateCsv( csvConfig )( data );

        download( csvConfig )( csv );

    }

}