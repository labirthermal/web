import { ContextProvider, createContext } from "@lit/context";
import type { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import { AbstractReactiveController } from "./AbstractReactiveController";

export interface PngExportSettings {
    readonly width: number;
    readonly fontSize: number;
    readonly analyses: boolean;
    readonly thermalScale: boolean;
    readonly license: boolean;
    readonly fileName: boolean;
    readonly fileDate: boolean;
}

export interface GroupExportSettings {
    readonly groupName: boolean;
    readonly columns: number;
}

export interface ConfigSettings {
    readonly export: {
        readonly png: PngExportSettings;
        readonly group: GroupExportSettings;
    };
    readonly visibility: {
        readonly showAllOptions: boolean;
    };
}

/** Exposes the general configuration context for the application. Setters are here. */
export const configContext = createContext<ConfigController>("config-context");


/** Handles the global configuration related to the PNG exports */
export class ConfigController extends AbstractReactiveController<AbstractThermalElement> {
    
    private readonly _UUID: string;
    
    public get UUID(): string {
        return this._UUID;
    }

    private _settings: ConfigSettings = {
        export: {
            png: {
                width: 1200,
                fontSize: 20,
                analyses: true,
                thermalScale: true,
                license: true,
                fileName: false,
                fileDate: true
            },
            group: {
                groupName: true,
                columns: 2
            }
        },
        visibility: {
            showAllOptions: false
        }
    };

    private readonly contextProvider: ContextProvider<typeof configContext, AbstractThermalElement>;

    constructor(host: AbstractThermalElement) {
        super(host);

        this._UUID = this.host.UUID + "__config-controller";

        this.contextProvider = new ContextProvider(host, {
            context: configContext,
            initialValue: this
        });
    }

    hostConnected(): void {}

    hostDisconnected(): void {}

    public get settings(): ConfigSettings {
        return this._settings;
    }

        // --- PNG Export Settery ---

    public setPngWidth(value: number): void {
        const width = Math.max(100, value); // volitelná ochrana proti neplatným hodnotám
        this._setPngSetting("width", width);
    }

    public setPngFontSize(value: number): void {
        const fontSize = Math.max(6, value);
        this._setPngSetting("fontSize", fontSize);
    }

    public setPngAnalyses(value: boolean): void {
        this._setPngSetting("analyses", value);
    }

    public setPngThermalScale(value: boolean): void {
        this._setPngSetting("thermalScale", value);
    }

    public setPngFileName(value: boolean): void {
        this._setPngSetting("fileName", value);
    }

    public setPngFileDate(value: boolean): void {
        this._setPngSetting("fileDate", value);
    }

    public setPngLicense(value: boolean): void {
        this._setPngSetting("license", value);
    }

    // --- Group Export Settery ---

    public setGroupColumns(value: number): void {
        const columns = Math.max(1, value);
        this._setGroupSetting("columns", columns);
    }

    public setGroupGroupName(value: boolean): void {
        this._setGroupSetting("groupName", value);
    }

    // --- Visibility ---

    public setShowAllOptions(value: boolean): void {
        this._settings = {
            ...this._settings,
            visibility: {
                ...this._settings.visibility,
                showAllOptions: value
            }
        };
        this._publish();
    }

    private _setPngSetting<K extends keyof PngExportSettings>(
        key: K,
        value: PngExportSettings[K]
    ): void {
        this._settings = {
            ...this._settings,
            export: {
                ...this._settings.export,
                png: {
                    ...this._settings.export.png,
                    [key]: value
                }
            }
        };
        this._publish();
    };

    private _setGroupSetting<K extends keyof GroupExportSettings>(
        key: K,
        value: GroupExportSettings[K]
    ): void {
        this._settings = {
            ...this._settings,
            export: {
                ...this._settings.export,
                group: {
                    ...this._settings.export.group,
                    [key]: value
                }
            }
        };
        this._publish();
    };


    private _publish(): void {
        this.contextProvider.setValue(this, true);
    }
}



