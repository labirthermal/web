import type { ThermalFileInstance, ThermalGroup, ThermalRegistry } from "@labirthermal/core";
import { ThermalFileFailure, TimeFormat } from "@labirthermal/core";
import { endOfDay, endOfHour, endOfMonth, endOfWeek, endOfYear, format, startOfDay, startOfHour, startOfMonth, startOfWeek, startOfYear } from "date-fns";
import type { ThermalGroupAppElement } from "../../apps/ThermalGroupApp";
import type { ParsedFileType } from "../../apps/multiple/AbstractMultipleApp";
import type { ThermalFileElement } from "./ThermalFile";

export type Grouping = "none" | "hour" | "day" | "week" | "month" | "year";

export type FileEntry = {
    /** Individual name of the file provided optionally by the user */
    label?: string,
    /** The respective instance. */
    instance: ThermalFileInstance,
    /** Optional inner html from the webcomponent. */
    innerHtml?: string,
    /** Automatically generated time relative to the actual grouping */
    time?: string
}

export type GroupEntry = {
    label: string,
    info?: string,
    from: number,
    to: number,
    files: FileEntry[]
}

export class TimeGrouping {

    protected records: FileEntry[] = [];

    public get numFiles(): number {
        return this.records.length;
    }

    public forEveryInstance(fn: (instance: ThermalFileInstance) => void) {
        this.records.forEach(record => {
            fn(record.instance);
        });
    }


    protected groups: Map<number, GroupEntry> = new Map;

    protected grouping: Grouping = "none";

    constructor(
        public readonly element: ThermalGroupAppElement,
        public readonly group: ThermalGroup
    ) {

    }

    flush() {

        this.records.forEach(record => {
            record.instance.unmountFromDom();
        });

        this.group.removeAllChildren();

        this.records = [];
        this.groups.clear();
        this.element.groups = [];
    }


    processEntries(
        entries: ThermalFileElement[]
    ) {

        this.flush();

        let batch: ReturnType<ThermalRegistry["batch"]["request"]> | undefined;

        entries.forEach(entry => {

            const callback = async (
                result: ThermalFileInstance | ThermalFileFailure
            ) => {

                if (result instanceof ThermalFileFailure) {
                    return;
                }

                const innerHtml = entry.innerHTML.trim();
                const storedContent = innerHtml.length > 0
                    ? innerHtml
                    : undefined;

                this.records.push({
                    instance: result,
                    innerHtml: storedContent,
                    label: entry.label,
                });

            }

            if (entry.lrc === undefined) {
                return;
            }

            if (batch === undefined) {

                batch = this.group.registry.batch.request(
                    entry.lrc,
                    entry.png,
                    this.group,
                    callback,
                    this.element.UUID
                );

                batch.onResolve.set(
                    this.element.UUID + "___something",
                    () => {
                        this.processGroups();
                    }
                );

            } else {
                batch.request(
                    entry.lrc,
                    entry.png,
                    this.group,
                    callback
                );
            }

        });

    }

    processParsedFiles(
        files: ParsedFileType[]
    ) {

        this.flush();

        let batch: ReturnType<ThermalRegistry["batch"]["request"]> | undefined;

        files.forEach(file => {

            const callback = async (
                result: ThermalFileInstance | ThermalFileFailure
            ) => {

                if (result instanceof ThermalFileFailure) {
                    return;
                }

                const innerHtml = file.note ?? "";
                const storedContent = innerHtml.length > 0
                    ? innerHtml
                    : undefined;

                this.records.push({
                    instance: result,
                    innerHtml: storedContent,
                    label: file.label
                });

            }

            if (batch === undefined) {

                batch = this.group.registry.batch.request(
                    file.thermal,
                    file.visible,
                    this.group,
                    callback,
                    this.element.UUID
                );

                batch.onResolve.set(
                    this.element.UUID + "___something",
                    () => {
                        this.processGroups();

                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis1, 1);
                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis2, 2);
                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis3, 3);
                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis4, 4);
                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis5, 5);
                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis6, 6);
                        this.group.analysisSync.recieveSlotSerialized(this.element.analysis7, 7);

                    }
                );

            } else {
                batch.request(
                    file.thermal,
                    file.visible,
                    this.group,
                    callback
                );
            }

        });

    }

    protected processGroups() {

        this.element.groups = [];

        this.groups.clear();

        this.group.registry.palette.setPalette(this.element.palette);

        this.records

            // Sort all records by the time
            .sort((a, b) => { return a.instance.timestamp - b.instance.timestamp; })

            // Append records to their respective groups
            .forEach(record => {

                const fileTimestamp = record.instance.timestamp;

                const groupStart = this.getGroupFromTimestamp(fileTimestamp);

                let existingGroup = this.groups.get(groupStart);

                // Create the group if not yet existing
                if (!existingGroup) {

                    const groupEnd = this.getGroupToTimestamp(fileTimestamp);
                    const { label, info } = this.getGroupLabels(fileTimestamp);

                    const group: GroupEntry = {
                        label: label ?? "",
                        info,
                        from: groupStart,
                        to: groupEnd,
                        files: []
                    }

                    existingGroup = group;
                    this.groups.set(groupStart, group);

                }

                record.time = this.getItemLabel(record.instance.timestamp)

                existingGroup.files.push(record);

            });

        // Sort items within the group
        this.groups.forEach(group => {
            group.files = group.files.sort((a, b) => {
                return a.instance.timestamp - b.instance.timestamp;
            });
        });

        // Assign local groups above
        this.element.groups = Array.from(
            this.groups.values()
        );

    }

    protected getGroupFromTimestamp(
        frameTimestamp: number
    ): number {
        if (this.grouping === "none") {
            return -Infinity;
        } else if (this.grouping === "hour") {
            return startOfHour(frameTimestamp).getTime();
        } else if (this.grouping === "day") {
            return startOfDay(frameTimestamp).getTime();
        } else if (this.grouping === "week") {
            return startOfWeek(frameTimestamp).getTime();
        } else if (this.grouping === "month") {
            return startOfMonth(frameTimestamp).getTime();
        } else if (this.grouping === "year") {
            return startOfYear(frameTimestamp).getTime()
        }

        return NaN;

    }

    protected getGroupToTimestamp(
        frameTimestamp: number
    ): number {
        if (this.grouping === "none") {
            return Infinity;
        } else if (this.grouping === "hour") {
            return endOfHour(frameTimestamp).getTime();
        } else if (this.grouping === "day") {
            return endOfDay(frameTimestamp).getTime();
        } else if (this.grouping === "week") {
            return endOfWeek(frameTimestamp).getTime();
        } else if (this.grouping === "month") {
            return endOfMonth(frameTimestamp).getTime();
        } else if (this.grouping === "year") {
            return endOfYear(frameTimestamp).getTime()
        }

        return NaN;

    }

    protected getGroupLabels(
        frameTimestamp: number
    ): { label?: string, info?: string } {

        if (this.grouping === "none") {
            return {};
        } else if (this.grouping === "hour") {
            return {
                label: format(frameTimestamp, "H:00 d. M. yyyy")
            }
        } else if (this.grouping === "day") {
            return {
                label: format(frameTimestamp, "d.M.yyyy")
            }
        } else if (this.grouping === "week") {
            return {
                label: "Week " + format(frameTimestamp, "w") + " of " + format(frameTimestamp, "yyyy"),
                info: [
                    TimeFormat.humanDate(startOfWeek(frameTimestamp).getTime()),
                    TimeFormat.humanDate(endOfWeek(frameTimestamp).getTime())
                ].join(" - ")
            }
        } else if (this.grouping === "month") {
            return {
                label: format(frameTimestamp, "MMMM yyyy"),
                info: [
                    TimeFormat.humanDate(startOfMonth(frameTimestamp).getTime()),
                    TimeFormat.humanDate(endOfMonth(frameTimestamp).getTime())
                ].join(" - ")
            }
        } else if (this.grouping === "year") {
            return {
                label: format(frameTimestamp, "yyyy")
            }
        }

        return {};

    }

    protected getItemLabel(frameTimestamp: number) {
        if (this.grouping === "none") {
            return TimeFormat.human(frameTimestamp);
        } else if (this.grouping === "hour") {
            return format(frameTimestamp, "H:mm:ss");
        } else if (this.grouping === "day") {
            return format(frameTimestamp, "H:mm:ss");
        } else if (this.grouping === "week") {
            return TimeFormat.human(frameTimestamp);
        } else if (this.grouping === "month") {
            return TimeFormat.human(frameTimestamp);
        } else if (this.grouping === "year") {
            return TimeFormat.human(frameTimestamp);
        }

        return TimeFormat.human(frameTimestamp);
    }

    public setGrouping(
        grouping: Grouping
    ) {
        this.grouping = grouping;
        this.processGroups();
    }



}