import { provide } from "@lit/context";
import type { PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { ConfigController } from "../controllers/ConfigController";
import { AbstractThermalElement } from "../hierarchy/AbstractThermalElement";
import type { IWithlocale, Locales } from "../translations/localeContext";
import { initLocalesInTopLevelElement, localeContext, localeConverter } from "../translations/localeContext";

export abstract class AbstractApp extends AbstractThermalElement implements IWithlocale {

    protected readonly configController = new ConfigController(this);

    @provide({ context: localeContext })
    @property({ reflect: true, converter: localeConverter })
    public locale!: Locales;

    @property({type: String, reflect: true, attribute: "label"})
    public label?: string;

    @property({type: String, reflect: true, attribute: "author"})
    public author?: string;

    @property({type: String, reflect: true, attribute: "license"})
    public license?: string;

    @property({type: Boolean, reflect: true, attribute: "show-fullscreen"})
    public showFullscreen: boolean = false;

    firstUpdated(_changedProperties: PropertyValues): void {
        super.firstUpdated(_changedProperties);
        initLocalesInTopLevelElement(this);
    }

}
