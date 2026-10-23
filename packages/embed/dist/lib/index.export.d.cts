import { AbstractAnalysis, AbstractAreaAnalysis, AbstractFileResult, AnalysisDataStateValue, AvailableThermalPalette, CallbacksManager, DropinElementListener, PlaybackSpeeds, PointAnalysis, ThermalFileFailure, ThermalFileInstance, ThermalFileReader, ThermalGroup, ThermalManager, ThermalMinmaxOrUndefined, ThermalPaletteType, ThermalRangeOrUndefined, ThermalRegistry, ThermalTool } from "@labirthermal/core";
import { CSSResultGroup, LitElement, PropertyDeclaration, PropertyValueMap, PropertyValues, ReactiveController, html, nothing } from "lit";
import { ContextProvider } from "@lit/context";
import { Ref } from "lit/directives/ref.js";
import { Placement } from "@floating-ui/dom";
import { AbstractFileResult as AbstractFileResult$1 } from "@labirthermal/core/src/loading/workers/AbstractFileResult";
import { GridGrouping } from "@labirthermal/client";
import { Quality } from "mediabunny";
//#region src/utils/converters/numberRangeConverter.d.ts
export declare const numberRangeConverter: (emptyValue: number, min: number, max: number) => {
  fromAttribute: (value: unknown) => number;
  toAttribute: (value: number) => string;
};
//#endregion
//#region src/utils/converters/booleanConverter.d.ts
export declare const booleanConverter: (emptyValue: boolean) => {
  fromAttribute: (value: string | null) => boolean;
  toAttribute: (value: boolean) => "true" | "false";
};
//#endregion
//#region src/utils/converters/paletteConverter.d.ts
/** A unified converter for thermal palettes. Recommended usage:
 * @example
 * ```ts
 * import { paletteConverter } from "path/to/paletteConverter";
 * class MyComponent extends LitElement {
 *      @property({
 *          type: String,
 *          reflect: true,
 *          converter: paletteConverter,
 *      })
 *      public palette: AvailableThermalPalette = "iron"; // IRON is used as default
 * }
 * ```
 */
export declare const paletteConverter: {
  fromAttribute: (value: unknown) => AvailableThermalPalette;
  toAttribute: (value: AvailableThermalPalette) => string;
};
//#endregion
//#region src/utils/converters/stringOrUndefinedConverter.d.ts
export declare const stringOrUndefinedConverter: {
  fromAttribute(value: unknown): string | undefined;
  toAttribute(value: string | undefined): string | undefined;
};
//#endregion
//#region src/utils/converters/durationConverter.d.ts
/** Converts a duration property indicated as string to millis and back */
export declare const durationConverter: {
  fromAttribute: (value: string | null) => number | undefined;
  toAttribute: (value: number | undefined) => string | undefined;
};
//#endregion
//#region src/utils/getContrastColor.d.ts
/** Choose the higher WCAG contrast against an opaque CSS background color. */
export declare function getContrastColor(backgroundColor: string): "#000000" | "#FFFFFF";
//#endregion
//#region src/utils/icons.d.ts
/**
 * Definice SVG ikon s jejich variantami
 * Každá ikona může mít více variant (outline, solid, mini, micro)
 * Použití: přidejte novou ikonu s jejími variantami zde
 */
declare const svg: {
  readonly lock: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path fill-rule=\"evenodd\" d=\"M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z\" clip-rule=\"evenodd\" />\n</svg>\n";
  };
  readonly document: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z\" />\n</svg>";
  };
  readonly eye: {
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n            <path d=\"M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z\" />\n                <path fill-rule=\"evenodd\" d=\"M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly play: {
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n            <path fill-rule=\"evenodd\" d=\"M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly pause: {
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n            <path fill-rule=\"evenodd\" d=\"M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly info: {
    readonly mini: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n            <path fill-rule=\"evenodd\" d=\"M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z\" clip-rule=\"evenodd\" />\n        </svg>";
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n            <path fill-rule=\"evenodd\" d=\"M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z\" clip-rule=\"evenodd\" />\n        </svg>";
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z\" />\n</svg>";
  };
  readonly settings: {
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n  <path fill-rule=\"evenodd\" d=\"M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z\" clip-rule=\"evenodd\" />\n</svg>";
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z\" />\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z\" />\n</svg>\n";
  };
  readonly back: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path fill-rule=\"evenodd\" d=\"M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z\" clip-rule=\"evenodd\" />\n</svg>";
  };
  readonly share: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path d=\"M12 6a2 2 0 1 0-1.994-1.842L5.323 6.5a2 2 0 1 0 0 3l4.683 2.342a2 2 0 1 0 .67-1.342L5.995 8.158a2.03 2.03 0 0 0 0-.316L10.677 5.5c.353.311.816.5 1.323.5Z\" />\n        </svg>";
    readonly mini: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n            <path d=\"M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z\" />\n        </svg>";
  };
  readonly folder: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z\" /></svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n        <path d=\"M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H12.5A1.5 1.5 0 0 1 14 5.5v1.401a2.986 2.986 0 0 0-1.5-.401h-9c-.546 0-1.059.146-1.5.401V3.5ZM2 9.5v3A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12.5 8h-9A1.5 1.5 0 0 0 2 9.5Z\" />\n        </svg>";
  };
  readonly wifi: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path fill-rule=\"evenodd\" d=\"M14.188 7.063a8.75 8.75 0 0 0-12.374 0 .75.75 0 0 1-1.061-1.06c4.003-4.004 10.493-4.004 14.496 0a.75.75 0 1 1-1.061 1.06Zm-2.121 2.121a5.75 5.75 0 0 0-8.132 0 .75.75 0 0 1-1.06-1.06 7.25 7.25 0 0 1 10.252 0 .75.75 0 0 1-1.06 1.06Zm-2.122 2.122a2.75 2.75 0 0 0-3.889 0 .75.75 0 1 1-1.06-1.061 4.25 4.25 0 0 1 6.01 0 .75.75 0 0 1-1.06 1.06Zm-2.828 1.06a1.25 1.25 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.355.355a.75.75 0 0 1-1.06 0l-.354-.354a.75.75 0 0 1 0-1.06Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly user: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n        <path fill-rule=\"evenodd\" d=\"M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly image: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n        <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n        <path fill-rule=\"evenodd\" d=\"M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly upwards: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n        <path fill-rule=\"evenodd\" d=\"M20.24 20.249a.75.75 0 0 0-.75-.75H8.989V5.56l2.47 2.47a.75.75 0 0 0 1.06-1.061l-3.75-3.75a.75.75 0 0 0-1.06 0l-3.75 3.75a.75.75 0 1 0 1.06 1.06l2.47-2.469V20.25c0 .414.335.75.75.75h11.25a.75.75 0 0 0 .75-.75Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly copy: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75\" />\n        </svg>";
    readonly mini: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n            <path d=\"M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z\" />\n            <path d=\"M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z\" />\n        </svg>";
  };
  readonly right: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path fill-rule=\"evenodd\" d=\"M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly trash: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path fill-rule=\"evenodd\" d=\"M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly addfolder: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n        <path fill-rule=\"evenodd\" d=\"M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H9.621a1.5 1.5 0 0 1-1.06-.44L7.439 2.44A1.5 1.5 0 0 0 6.38 2H3.5ZM8 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 6Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly upload: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path d=\"M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z\" />\n            <path d=\"M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z\" />\n        </svg>";
  };
  readonly clock: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z\" />\n</svg>";
  };
  readonly close: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M6 18 18 6M6 6l12 12\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n        <path d=\"M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z\" />\n        </svg>";
  };
  readonly edit: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n        <path d=\"M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z\" />\n        <path d=\"M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z\" />\n        </svg>";
  };
  readonly comment: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path fill-rule=\"evenodd\" d=\"M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly grid: {
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n            <path fill-rule=\"evenodd\" d=\"M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z\" clip-rule=\"evenodd\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path d=\"M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2h-2ZM3.5 9A1.5 1.5 0 0 0 2 10.5v2A1.5 1.5 0 0 0 3.5 14h2A1.5 1.5 0 0 0 7 12.5v-2A1.5 1.5 0 0 0 5.5 9h-2ZM9 3.5A1.5 1.5 0 0 1 10.5 2h2A1.5 1.5 0 0 1 14 3.5v2A1.5 1.5 0 0 1 12.5 7h-2A1.5 1.5 0 0 1 9 5.5v-2ZM10.5 9A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9h-2Z\" />\n        </svg>";
  };
  readonly list: {
    readonly solid: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 24 24\" fill=\"currentColor\" class=\"size-6\">\n            <path fill-rule=\"evenodd\" d=\"M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z\" clip-rule=\"evenodd\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path d=\"M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z\" />\n        </svg>";
  };
  readonly check: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path fill-rule=\"evenodd\" d=\"M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly "check-circle": {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path fill-rule=\"evenodd\" d=\"M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z\" clip-rule=\"evenodd\" />\n</svg>";
  };
  readonly "circle-dots": {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path fill-rule=\"evenodd\" d=\"M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5.5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z\" clip-rule=\"evenodd\" />\n</svg>";
  };
  readonly save: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M5 3h11l3 3v13H5V3Z\" />\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M7 3v4h8V3M7 10h10M7 12h8\" />\n            <circle cx=\"17\" cy=\"15\" r=\"1.5\" stroke=\"currentColor\" fill=\"none\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"currentColor\" viewBox=\"0 0 16 16\" class=\"size-4\">\n            <path d=\"M2 2h9l3 3v8H2V2Zm2 1v3h6V3H4Zm0 4h8v1H4V7Zm0 2h6v1H4V9Zm8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z\" />\n        </svg>";
  };
  readonly restore: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" className=\"size-4\">\n  <path fillRule=\"evenodd\" d=\"M6.25 12.5A2.75 2.75 0 0 0 9 9.75V4.56L6.78 6.78a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L10.5 4.56v5.19a4.25 4.25 0 0 1-8.5 0v-1a.75.75 0 0 1 1.5 0v1a2.75 2.75 0 0 0 2.75 2.75Z\" clipRule=\"evenodd\" />\n</svg>";
  };
  readonly unlink: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n            <path fill-rule=\"evenodd\" d=\"M2.22 2.22a.75.75 0 0 1 1.06 0l4.46 4.46c.128-.178.272-.349.432-.508l3-3a4 4 0 0 1 5.657 5.656l-1.225 1.225a.75.75 0 1 1-1.06-1.06l1.224-1.225a2.5 2.5 0 0 0-3.536-3.536l-3 3a2.504 2.504 0 0 0-.406.533l2.59 2.59a2.49 2.49 0 0 0-.79-1.254.75.75 0 1 1 .977-1.138 3.997 3.997 0 0 1 1.306 3.886l4.871 4.87a.75.75 0 1 1-1.06 1.061l-5.177-5.177-.006-.005-4.134-4.134a.65.65 0 0 1-.005-.006L2.22 3.28a.75.75 0 0 1 0-1.06Zm3.237 7.727a.75.75 0 0 1 0 1.06l-1.225 1.225a2.5 2.5 0 0 0 3.536 3.536l1.879-1.879a.75.75 0 1 1 1.06 1.06L8.83 16.83a4 4 0 0 1-5.657-5.657l1.224-1.225a.75.75 0 0 1 1.06 0Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly link: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n            <path d=\"M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z\" />\n            <path d=\"M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z\" />\n        </svg>";
  };
  readonly zoom: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6\" />\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path d=\"M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z\" />\n            <path fill-rule=\"evenodd\" d=\"M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z\" clip-rule=\"evenodd\" />\n        </svg>";
  };
  readonly adjustment: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n            <path d=\"M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z\" />\n        </svg>";
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75\" />\n        </svg>";
  };
  readonly range: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n            <g>\n                <line x1=\"5\" y1=\"12\" x2=\"19\" y2=\"12\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n                <line x1=\"5\" y1=\"9\" x2=\"5\" y2=\"15\" stroke=\"currentColor\" stroke-width=\"2\"/>\n                <line x1=\"19\" y1=\"9\" x2=\"19\" y2=\"15\" stroke=\"currentColor\" stroke-width=\"2\"/>\n            </g>\n        </svg>";
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"none\" class=\"size-4\">\n            <g>\n                <line x1=\"3\" y1=\"8\" x2=\"13\" y2=\"8\" stroke=\"currentColor\" stroke-width=\"1\"/>\n                <line x1=\"3\" y1=\"6\" x2=\"3\" y2=\"10\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n                <line x1=\"13\" y1=\"6\" x2=\"13\" y2=\"10\" stroke=\"currentColor\" stroke-width=\"1.5\"/>\n            </g>\n        </svg>";
  };
  readonly bigger: {
    readonly mini: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n  <path d=\"m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z\" />\n</svg>\n";
  };
  readonly smaller: {
    readonly mini: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n  <path d=\"M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H2.75a.75.75 0 0 0 0 1.5h4.5A.75.75 0 0 0 8 7.25v-4.5a.75.75 0 0 0-1.5 0v2.69L3.28 2.22ZM13.5 2.75a.75.75 0 0 0-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-2.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L13.5 5.44V2.75ZM3.28 17.78l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06ZM13.5 14.56l3.22 3.22a.75.75 0 1 0 1.06-1.06l-3.22-3.22h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-2.69Z\" />\n</svg>";
  };
  readonly ellipsis: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path d=\"M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z\" />\n</svg>";
  };
  readonly download: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path d=\"M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z\" />\n  <path d=\"M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z\" />\n</svg>";
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3\" />\n</svg>";
  };
  readonly clipboard: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.8\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z\" />\n</svg>";
  };
  readonly bulb: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18\" />\n</svg>";
  };
  readonly reload: {
    readonly micro: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 16 16\" fill=\"currentColor\" class=\"size-4\">\n  <path fill-rule=\"evenodd\" d=\"M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z\" clip-rule=\"evenodd\" />\n</svg>";
  };
  readonly warning: {
    readonly outline: "<svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke-width=\"1.5\" stroke=\"currentColor\" class=\"size-6\">\n  <path stroke-linecap=\"round\" stroke-linejoin=\"round\" d=\"M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z\" />\n</svg>";
  };
  readonly move: {
    readonly mini: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"currentColor\" class=\"size-5\">\n  <path fill-rule=\"evenodd\" d=\"M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z\" clip-rule=\"evenodd\" />\n  <path fill-rule=\"evenodd\" d=\"M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z\" clip-rule=\"evenodd\" />\n</svg>";
  };
};
/**
 * TypeScript typ pro automaticky generovaný objekt ikon
 * Zajišťuje typovou bezpečnost - pouze existující ikony a jejich varianty
 */
type IconsType = { [K in keyof typeof svg]: { [V in keyof typeof svg[K]]: (className?: string, styles?: string) => string; }; };
/**
 * Exportovaný objekt ikon s typovou bezpečností
 * Použití: icons.folder.outline("my-class", "color: red")
 */
declare const icons: IconsType;
//#endregion
//#region ../../node_modules/.pnpm/i18next@26.4.5_typescript@5.9.3/node_modules/i18next/typescript/helpers.d.ts
// Types
type $Dictionary<T = unknown> = {
  [key: string]: T;
};
type $SpecialObject = object | Array<string | object>;
// Types Operators
type $Prune<T> = never | { [K in keyof T as [keyof T[K]] extends [never] ? never : K]: T[K]; };
/** All the way down. */
interface $Turtles {
  [x: string]: $Turtles;
}
type $MergeBy<T, K> = Omit<T, keyof K> & K;
type $OmitArrayKeys<Arr> = Arr extends readonly any[] ? Omit<Arr, keyof any[]> : Arr;
type $PreservedValue<Value, Fallback> = [Value] extends [never] ? Fallback : Value;
type $NormalizeIntoArray<T extends unknown | readonly unknown[]> = T extends readonly unknown[] ? T : [T];
/**
 * @typeParam T
 * @example
 * ```
 * $UnionToIntersection<{foo: {bar: string} | {asd: boolean}}> = {foo: {bar: string} & {asd: boolean}}
 * ```
 *
 * @see https://stackoverflow.com/questions/50374908/transform-union-type-to-intersection-type
 */
type $UnionToIntersection<T> = (T extends unknown ? (k: T) => void : never) extends ((k: infer I) => void) ? I : never;
/**
 * @typeParam TPath union of strings
 * @typeParam TValue value of the record
 * @example
 * ```
 * $StringKeyPathToRecord<'foo.bar' | 'asd'> = {foo: {bar: string} | {asd: boolean}}
 * ```
 */
type $StringKeyPathToRecordUnion<TPath extends string, TValue> = TPath extends `${infer TKey}.${infer Rest}` ? { [Key in TKey]: $StringKeyPathToRecord<Rest, TValue>; } : { [Key in TPath]: TValue; };
/**
 * Used to intersect output of {@link $StringKeyPathToRecordUnion}
 *
 * @typeParam TPath union of strings
 * @typeParam TValue value of the record
 * @example
 * ```
 * $StringKeyPathToRecord<'foo.bar' | 'asd'> = {foo: {bar: string} & {asd: boolean}}
 * ```
 */
type $StringKeyPathToRecord<TPath extends string, TValue> = $UnionToIntersection<$StringKeyPathToRecordUnion<TPath, TValue>>;
/**
 * We could use NoInfer typescript build-in utility,
 * however this project still supports ts < 5.4.
 *
 * @see https://github.com/millsp/ts-toolbelt/blob/master/sources/Function/NoInfer.ts
 */
type $NoInfer<A> = [A][A extends any ? 0 : never];
//#endregion
//#region ../../node_modules/.pnpm/i18next@26.4.5_typescript@5.9.3/node_modules/i18next/typescript/options.d.ts
/**
 * This interface can be augmented by users to add types to `i18next` default TypeOptions.
 *
 * Usage:
 * ```ts
 * // i18next.d.ts
 * import 'i18next';
 * declare module 'i18next' {
 *   interface CustomTypeOptions {
 *     defaultNS: 'custom';
 *     returnNull: false;
 *     returnObjects: false;
 *     nsSeparator: ':';
 *     keySeparator: '.';
 *     compatibilityJSON: 'v4';
 *     allowObjectInHTMLChildren: false;
 *     resources: {
 *       custom: {
 *         foo: 'foo';
 *       };
 *     };
 *   }
 * }
 * ```
 */
interface CustomTypeOptions {}
/**
 * Per-package namespace types for monorepos. Augment this in each package's
 * `i18next.d.ts` instead of `CustomTypeOptions.resources` when several packages
 * need their own namespaces — otherwise TypeScript reports TS2717 on merge.
 *
 * Works alongside the legacy `CustomTypeOptions.resources` field; both end up
 * in `TypeOptions['resources']`.
 *
 * Scalar type options like `defaultNS`, `returnNull`, `enableSelector`, etc.,
 * still belong on `CustomTypeOptions` — this interface is for namespace
 * resource types only.
 *
 * @see https://github.com/i18next/i18next/issues/2409
 *
 * @example
 * ```ts
 * // packages/ui/i18next.d.ts
 * declare module 'i18next' {
 *   interface ResourceNamespaceMap {
 *     '@repo/ui': typeof uiTranslations;
 *   }
 * }
 * ```
 */
interface ResourceNamespaceMap {}
/**
 * This interface can be augmented by users to add types to `i18next` default PluginOptions.
 */
interface CustomPluginOptions {}
type _LegacyResources = CustomTypeOptions extends {
  resources: infer R;
} ? R : object;
// Per-property merge of two object types. Unlike `L & R`, which TypeScript
// collapses to `never` whenever ANY property has incompatible literals (so a
// single same-key/different-literal conflict wipes out the whole namespace),
// this iterates keys and intersects them individually — the conflicting key
// becomes `never`, the rest survive.
type _PerPropMerge<L, R> = { [K in keyof L | keyof R]: K extends keyof L ? K extends keyof R ? L[K] & R[K] : L[K] : K extends keyof R ? R[K] : never; };
// Drop properties whose value resolved to `never`. Without this, the
// conflict key would leak into `keyof Resources[ns]`, then poison
// `KeysBuilder` recursion (it tries to walk a `never` value) and break
// `t()` overload resolution for the entire namespace.
// NOTE: must use the `Pick<T, NonNeverKeys>` form. A `[K in keyof T as ...]`
// remap does NOT eagerly evaluate `T[K]` for intersection types, so conflict
// keys would survive the filter.
type _NonNeverKeys<T> = { [K in keyof T]: [T[K]] extends [never] ? never : K; }[keyof T];
type _DropConflictKeys<T> = Pick<T, _NonNeverKeys<T>>;
// When the same namespace exists on both sides, deep-merge per property and
// strip same-key/different-literal conflicts. Otherwise pick from whichever
// side has it.
type _MergeNamespaces<L, R> = { [K in keyof L | keyof R]: K extends keyof L ? K extends keyof R ? _DropConflictKeys<_PerPropMerge<L[K], R[K]>> : L[K] : K extends keyof R ? R[K] : never; };
// NOTE: empty legacy + empty registry must stay `object` so unconfigured projects
// still get `$IsResourcesDefined === false`.
type _MergedResources = [keyof _LegacyResources] extends [never] ? [keyof ResourceNamespaceMap] extends [never] ? object : ResourceNamespaceMap : [keyof ResourceNamespaceMap] extends [never] ? _LegacyResources : _MergeNamespaces<_LegacyResources, ResourceNamespaceMap>;
type TypeOptions = $MergeBy<$MergeBy<{
  /** @see {InitOptions.returnNull} */
  returnNull: false;
  /** @see {InitOptions.returnEmptyString} */
  returnEmptyString: true;
  /** @see {InitOptions.returnObjects} */
  returnObjects: false;
  /** @see {InitOptions.keySeparator} */
  keySeparator: '.';
  /** @see {InitOptions.nsSeparator} */
  nsSeparator: ':';
  /** @see {InitOptions.pluralSeparator} */
  pluralSeparator: '_';
  /** @see {InitOptions.contextSeparator} */
  contextSeparator: '_';
  /** @see {InitOptions.defaultNS} */
  defaultNS: 'translation';
  /** @see {InitOptions.fallbackNS} */
  fallbackNS: false;
  /** @see {InitOptions.compatibilityJSON} */
  compatibilityJSON: 'v4';
  /** @see {InitOptions.resources} */
  resources: object;
  /**
   * Flag that allows HTML elements to receive objects. This is only useful for React applications
   * where you pass objects to HTML elements so they can be replaced to their respective interpolation
   * values (mostly with Trans component)
   */
  allowObjectInHTMLChildren: false;
  /**
   * Flag that enables strict key checking even if a `defaultValue` has been provided.
   * This ensures all calls of `t` function don't accidentally use implicitly missing keys.
   */
  strictKeyChecks: false;
  /**
   * Prefix for interpolation
   */
  interpolationPrefix: '{{';
  /**
   * Suffix for interpolation
   */
  interpolationSuffix: '}}';
  /** @see {InterpolationOptions.unescapePrefix} */
  unescapePrefix: '-';
  /** @see {InterpolationOptions.unescapeSuffix} */
  unescapeSuffix: '';
  /**
   * Whether to extract interpolation variables from translation strings at
   * the type level. When `true` (default), the type system parses each
   * resource value for `{{variable}}` patterns and types the `t()` options
   * accordingly.
   *
   * Set to `false` when your translation strings use a different
   * interpolation syntax that the i18next type extractor cannot understand
   * — e.g. ICU MessageFormat plurals like `{count, plural, one {{count} row}
   * other {{count} rows}}` would otherwise produce phantom variable names
   * because the default extractor naively matches the outermost `{{` …
   * `}}`. This flag is type-only; runtime interpolation is governed by
   * `InterpolationOptions` and is unaffected.
   *
   * Required by `i18next-icu` users — see that package's docs for the
   * recommended `CustomTypeOptions` augmentation.
   *
   * @default true
   */
  parseInterpolation: true;
  /**
   * Use a proxy-based selector to select a translation.
   *
   * Enables features like go-to definition, and better DX/faster autocompletion
   * for TypeScript developers.
   *
   * If you're working with an especially large set of translations and aren't
   * using context, you set `enableSelector` to `"optimize"` and i18next won't do
   * any type-level processing of your translations at all.
   *
   * With `enableSelector` set to `"optimize"`, i18next is capable of supporting
   * arbitrarily large/deep translation sets without causing any IDE slowdown
   * whatsoever.
   *
   * Set `enableSelector` to `"strict"` to require an explicit namespace as the
   * first selector path segment in every call. The selector proxy stops
   * exposing the primary namespace's keys flat on `$` — even
   * `useTranslation('only')` must use `$.only.foo`, never `$.foo`. At runtime,
   * a leading segment matching the scope's namespace list (primary included)
   * is always rewritten as a namespace prefix, fully decoupling selector
   * shape from resolution scope. Use this when you want a single mental model
   * for selector paths regardless of how many namespaces a hook was created
   * with, and to remove the silent miss that flat-primary paths can otherwise
   * cause in multi-ns hooks (see [#2429](https://github.com/i18next/i18next/issues/2429)).
   *
   * `"strict"` mode is incompatible with the `"optimize"` shortcut. If you
   * have keys whose names match sibling namespaces (the
   * [#2405](https://github.com/i18next/i18next/issues/2405) pattern), do not
   * enable strict mode — the leading-segment rewrite would route those keys
   * into the wrong namespace.
   *
   * @default false
   */
  enableSelector: false;
  /**
   * Maps interpolation format specifiers to their expected value types.
   *
   * By default, i18next infers types from built-in formatter names:
   * - `number`, `currency` → `number`
   * - `datetime` → `Date`
   * - `relativetime` → `number`
   * - `list` → `readonly string[]`
   * - No format specifier → `string | number` (since i18next stringifies values at runtime)
   *
   * Use this option to add mappings for custom formatters or to override
   * the built-in defaults.
   *
   * @default {} (empty — built-in defaults apply)
   *
   * @example
   * ```ts
   * interface CustomTypeOptions {
   *   interpolationFormatTypeMap: {
   *     // custom formatter
   *     uppercase: string;
   *     // override built-in
   *     currency: string;
   *   };
   * }
   * ```
   */
  interpolationFormatTypeMap: {};
}, CustomTypeOptions>,
// HACK: apply merged resources *after* CustomTypeOptions so registry contributions
// survive when CustomTypeOptions.resources is also defined. Without this
// second step, the inner $MergeBy would replace the default `resources: object`
// with CustomTypeOptions['resources'] alone, dropping the registry namespaces.
{
  resources: _MergedResources;
}>;
type PluginOptions<T> = $MergeBy<{
  /**
   * Options for language detection - check documentation of plugin
   * @default undefined
   */
  detection?: object;
  /**
   * Options for backend - check documentation of plugin
   * @default undefined
   */
  backend?: T;
  /**
   * Options for cache layer - check documentation of plugin
   * @default undefined
   */
  cache?: object;
  /**
   * Options for i18n message format - check documentation of plugin
   * @default undefined
   */
  i18nFormat?: object;
}, CustomPluginOptions>;
type FormatFunction = (value: any, format?: string, lng?: string, options?: InterpolationOptions & $Dictionary<any>) => string;
interface InterpolationOptions {
  /**
   * Used to separate format from interpolation value
   * @default ','
   */
  formatSeparator?: string;
  /**
   * Escape function
   * @default str => str
   */
  escape?(str: string): string;
  /**
   * Always format interpolated values.
   * @default false
   */
  alwaysFormat?: boolean;
  /**
   * Escape passed in values to avoid xss injection
   * @default true
   */
  escapeValue?: boolean;
  /**
   * If true, then value passed into escape function is not casted to string, use with custom escape function that does its own type check
   * @default false
   */
  useRawValueToEscape?: boolean;
  /**
   * Prefix for interpolation
   * @default '{{'
   */
  prefix?: string;
  /**
   * Suffix for interpolation
   * @default '}}'
   */
  suffix?: string;
  /**
   * Escaped prefix for interpolation (regexSafe)
   * @default undefined
   */
  prefixEscaped?: string;
  /**
   * Escaped suffix for interpolation (regexSafe)
   * @default undefined
   */
  suffixEscaped?: string;
  /**
   * Suffix to unescaped mode
   * @default undefined
   */
  unescapeSuffix?: string;
  /**
   * Prefix to unescaped mode
   * @default '-'
   */
  unescapePrefix?: string;
  /**
   * Prefix for nesting
   * @default '$t('
   */
  nestingPrefix?: string;
  /**
   * Suffix for nesting
   * @default ')'
   */
  nestingSuffix?: string;
  /**
   * Escaped prefix for nesting (regexSafe)
   * @default undefined
   */
  nestingPrefixEscaped?: string;
  /**
   * Escaped suffix for nesting (regexSafe)
   * @default undefined
   */
  nestingSuffixEscaped?: string;
  /**
   * Separates options from key
   * @default ','
   */
  nestingOptionsSeparator?: string;
  /**
   * Global variables to use in interpolation replacements
   * @default undefined
   */
  defaultVariables?: {
    [index: string]: any;
  };
  /**
   * After how many interpolation runs to break out before throwing a stack overflow
   * @default 1000
   */
  maxReplaces?: number;
  /**
   * If true, it will skip to interpolate the variables
   * @default true
   */
  skipOnVariables?: boolean;
}
interface FallbackLngObjList {
  [language: string]: readonly string[];
}
type FallbackLng = string | readonly string[] | FallbackLngObjList | ((code: string) => string | readonly string[] | FallbackLngObjList);
interface ReactOptions {
  /**
   * Set it to fallback to let passed namespaces to translated hoc act as fallbacks
   * @default 'default'
   */
  nsMode?: 'default' | 'fallback';
  /**
   * Set it to the default parent element created by the Trans component.
   * @default 'div'
   */
  defaultTransParent?: string;
  /**
   * Set which events trigger a re-render, can be set to false or string of events
   * @default 'languageChanged'
   */
  bindI18n?: string | false;
  /**
   * Set which events on store trigger a re-render, can be set to false or string of events
   * @default ''
   */
  bindI18nStore?: string | false;
  /**
   * Set fallback value for Trans components without children
   * @default undefined
   */
  transEmptyNodeValue?: string;
  /**
   * Set it to false if you do not want to use Suspense
   * @default true
   */
  useSuspense?: boolean;
  /**
   * Function to generate an i18nKey from the defaultValue (or Trans children)
   * when no key is provided.
   * By default, the defaultValue (Trans text) itself is used as the key.
   * If you want to require keys for all translations, supply a function
   * that always throws an error.
   * @default undefined
   */
  hashTransKey?(defaultValue: TOptionsBase['defaultValue']): TOptionsBase['defaultValue'];
  /**
   * Convert eg. <br/> found in translations to a react component of type br
   * @default true
   */
  transSupportBasicHtmlNodes?: boolean;
  /**
   * Which nodes not to convert in defaultValue generation in the Trans component.
   * @default ['br', 'strong', 'i', 'p']
   */
  transKeepBasicHtmlNodesFor?: readonly string[];
  /**
   * Wrap text nodes in a user-specified element.
   * @default ''
   */
  transWrapTextNodes?: string;
  /**
   * Default props to apply to all Trans components.
   * Component-level props will override these defaults.
   */
  transDefaultProps?: {
    tOptions?: TOptions;
    values?: object;
    shouldUnescape?: boolean;
    components?: readonly unknown[] | {
      readonly [tagName: string]: unknown;
    }; // Use `unknown` (or `any`) to be permissive without importing React.
  };
  /**
   * Optional keyPrefix that will be automatically applied to returned t function in useTranslation for example.
   * Accepts a string or a selector function (e.g. `$ => $.deeply.nested`).
   * @default undefined
   */
  keyPrefix?: string | (($: any) => any);
  /**
   * Unescape function
   * by default it unescapes some basic html entities
   */
  unescape?(str: string): string;
}
type ResourceKey = string | {
  [key: string]: any;
};
interface ResourceLanguage {
  [namespace: string]: ResourceKey;
}
interface Resource {
  [language: string]: ResourceLanguage;
}
interface InitOptions<T = object> extends PluginOptions<T> {
  /**
   * Logs info level to console output. Helps finding issues with loading not working.
   * @default false
   */
  debug?: boolean;
  /**
   * Resources to initialize with (if not using loading or not appending using addResourceBundle)
   * @default undefined
   */
  resources?: Resource;
  /**
   * Allow initializing with bundled resources while using a backend to load non bundled ones.
   * @default false
   */
  partialBundledLanguages?: boolean;
  /**
   * Language to use (overrides language detection)
   * @default undefined
   */
  lng?: string;
  /**
   * Language to use if translations in user language are not available.
   * @default 'dev'
   */
  fallbackLng?: false | FallbackLng;
  /**
   * Array of allowed languages
   * @default false
   */
  supportedLngs?: false | readonly string[];
  /**
   * If true will pass eg. en-US if finding en in supportedLngs
   * @default false
   */
  nonExplicitSupportedLngs?: boolean;
  /**
   * Language codes to lookup, given set language is 'en-US':
   * 'all' --> ['en-US', 'en', 'dev'],
   * 'currentOnly' --> 'en-US',
   * 'languageOnly' --> 'en'
   * @default 'all'
   */
  load?: 'all' | 'currentOnly' | 'languageOnly';
  /**
   * Array of languages to preload. Important on server-side to assert translations are loaded before rendering views.
   * @default false
   */
  preload?: false | readonly string[];
  /**
   * Language will be lowercased eg. en-US --> en-us
   * @default false
   */
  lowerCaseLng?: boolean;
  /**
   * Language will be lowercased EN --> en while leaving full locales like en-US
   * @default false
   */
  cleanCode?: boolean;
  /**
   * String or array of namespaces to load
   * @default 'translation'
   */
  ns?: string | readonly string[];
  /**
   * Default namespace used if not passed to translation function
   * @default 'translation'
   */
  defaultNS?: string | false | readonly string[];
  /**
   * String or array of namespaces to lookup key if not found in given namespace.
   * @default false
   */
  fallbackNS?: false | string | readonly string[];
  /**
   * Calls the backend's `create()` for keys that are not found, so new keys
   * reach your translation files or service while you develop (keep it off
   * in production). `i18next-http-backend` posts them to its `addPath`;
   * `i18next-locize-backend` (https://www.locize.com/i18next?from=i18next_types__savemissing)
   * sends them to Locize, the translation management service by the i18next
   * maintainers, where they can be translated automatically.
   * @default false
   */
  saveMissing?: boolean;
  /**
   * Calls save missing key function on backend if key not found also for plural forms.
   * @default false
   */
  saveMissingPlurals?: boolean;
  /**
   * Experimental: enable to update default values using the saveMissing
   * (Works only if defaultValue different from translated value.
   * Only useful on initial development or when keeping code as source of truth not changing values outside of code.
   * Only supported if backend supports it already)
   * @default false
   */
  updateMissing?: boolean;
  /**
   * @default 'fallback'
   */
  saveMissingTo?: 'current' | 'all' | 'fallback';
  /**
   * Used to not fallback to the key as default value, when using saveMissing functionality.
   * i.e. when using with i18next-http-backend this will result in having a key with an empty string value.
   * @default false
   */
  missingKeyNoValueFallbackToKey?: boolean;
  /**
   * Used for custom missing key handling (needs saveMissing set to true!)
   * @default false
   */
  missingKeyHandler?: false | ((lngs: readonly string[], ns: string, key: string, fallbackValue: string, updateMissing: boolean, options: any) => void);
  /**
   * Receives a key that was not found in `t()` and returns a value, that will be returned by `t()`
   * @default noop
   */
  parseMissingKeyHandler?(key: string, defaultValue?: string, options?: any): any;
  /**
   * Appends namespace to missing key
   * @default false
   */
  appendNamespaceToMissingKey?: boolean;
  /**
   * Gets called in case a interpolation value is undefined. This method will not be called if the value is empty string or null
   * @default noop
   */
  missingInterpolationHandler?: (text: string, value: any, options: InitOptions) => any;
  /**
   * String or array of postProcessors to apply per default
   * @default false
   */
  postProcess?: false | string | readonly string[];
  /**
   * passthrough the resolved object including 'usedNS', 'usedLang' etc into options object of postprocessors as 'i18nResolved' property
   * @default false
   */
  postProcessPassResolved?: boolean;
  /**
   * Allows null values as valid translation
   * @default false
   */
  returnNull?: boolean;
  /**
   * Allows empty string as valid translation
   * @default true
   */
  returnEmptyString?: boolean;
  /**
   * Allows objects as valid translation result
   * @default false
   */
  returnObjects?: boolean;
  /**
   * Returns an object that includes information about the used language, namespace, key and value
   * @default false
   */
  returnDetails?: boolean;
  /**
   * Gets called if object was passed in as key but returnObjects was set to false
   * @default noop
   */
  returnedObjectHandler?(key: string, value: string, options: any): void;
  /**
   * Char, eg. '\n' that arrays will be joined by
   * @default false
   */
  joinArrays?: false | string;
  /**
   * Sets defaultValue
   * @default args => ({ defaultValue: args[1] })
   */
  overloadTranslationOptionHandler?(args: string[]): TOptions;
  /**
   * @see https://www.i18next.com/translation-function/interpolation
   */
  interpolation?: InterpolationOptions;
  /**
   * Options for react - check documentation of plugin
   * @default undefined
   */
  react?: ReactOptions;
  /**
   * Triggers resource loading in init function inside a setTimeout (default async behaviour).
   * Set it to false if your backend loads resources sync - that way calling i18next.t after
   * init is possible without relaying on the init callback.
   * @default true
   */
  initAsync?: boolean;
  /**
   * Char to separate keys
   * @default '.'
   */
  keySeparator?: false | string;
  /**
   * Char to split namespace from key
   * @default ':'
   */
  nsSeparator?: false | string;
  /**
   * Selector-API mode. Mirrors `CustomTypeOptions['enableSelector']`.
   *
   * - `false` (default): selector API disabled.
   * - `true` / `'optimize'`: selector resolution enabled.
   * - `'strict'`: require an explicit namespace as the first selector
   *   path segment in every call. The resolver always rewrites a leading
   *   namespace-matching segment as a namespace prefix.
   *
   * @default false
   */
  enableSelector?: false | true | 'optimize' | 'strict';
  /**
   * Char to split plural from key
   * @default '_'
   */
  pluralSeparator?: string;
  /**
   * Char to split context from key
   * @default '_'
   */
  contextSeparator?: string;
  /**
   * Prefixes the namespace to the returned key when using `cimode`
   * @default false
   */
  appendNamespaceToCIMode?: boolean;
  /**
   * Compatibility JSON version
   * @warning only `v4` is available and supported by typescript
   * @default 'v4'
   */
  compatibilityJSON?: 'v4';
  /**
   * Options for https://github.com/locize/locize-lastused
   * @default undefined
   */
  locizeLastUsed?: {
    /**
     * The id of your locize project
     */
    projectId: string;
    /**
     * An api key if you want to send missing keys
     */
    apiKey?: string;
    /**
     * The reference language of your project
     * @default 'en'
     */
    referenceLng?: string;
    /**
     * Version
     * @default 'latest'
     */
    version?: string;
    /**
     * Debounce interval to send data in milliseconds
     * @default 90000
     */
    debounceSubmit?: number;
    /**
     * Hostnames that are allowed to send last used data.
     * Please keep those to your local system, staging, test servers (not production)
     * @default ['localhost']
     */
    allowedHosts?: readonly string[];
  };
  /**
   * Automatically lookup for a flat key if a nested key is not found an vice-versa
   * @default true
   */
  ignoreJSONStructure?: boolean;
  /**
   * Limit parallelism of calls to backend
   * This is needed to prevent trying to open thousands of
   * sockets or file descriptors, which can cause failures
   * and actually make the entire process take longer.
   * @default 10
   */
  maxParallelReads?: number;
  /**
   * The maximum number of retries to perform.
   * Note that retries are only performed when a request has no response
   * and throws an error.
   * The default value is used if value is set below 0.
   * @default 5
   */
  maxRetries?: number;
  /**
   * Set how long to wait, in milliseconds, between retries of failed requests.
   * This number is compounded by a factor of 2 for subsequent retry.
   * The default value is used if value is set below 1ms.
   * @default 350
   */
  retryTimeout?: number;
  /**
   * Initializes the internal formatter for the in-built formats as cached version.
   * Can be set to false for this type of issues: https://github.com/i18next/i18next/issues/2227
   * @default true
   */
  cacheInBuiltFormats?: boolean;
}
interface TOptionsBase {
  /**
   * Default value to return if a translation was not found
   */
  defaultValue?: unknown;
  /**
   * Count value used for plurals
   */
  count?: number;
  /**
   * Ordinal flag for ordinal plurals
   */
  ordinal?: boolean;
  /**
   * Used for contexts (eg. male\female)
   */
  context?: unknown;
  /**
   * Object with vars for interpolation - or put them directly in options
   */
  replace?: any;
  /**
   * Override language to use
   */
  lng?: string;
  /**
   * Override languages to use
   */
  lngs?: readonly string[];
  /**
   * Override language to lookup key if not found see fallbacks for details
   */
  fallbackLng?: false | FallbackLng;
  /**
   * Override namespaces (string or array)
   */
  ns?: Namespace;
  /**
   * Override char to separate keys
   */
  keySeparator?: false | string;
  /**
   * Override char to split namespace from key
   */
  nsSeparator?: false | string;
  /**
   * Accessing an object not a translation string (can be set globally too)
   */
  returnObjects?: boolean;
  /**
   * Returns an object that includes information about the used language, namespace, key and value
   */
  returnDetails?: boolean;
  /**
   * Char, eg. '\n' that arrays will be joined by (can be set globally too)
   */
  joinArrays?: string;
  /**
   * String or array of postProcessors to apply see interval plurals as a sample
   */
  postProcess?: string | readonly string[];
  /**
   * Override interpolation options
   */
  interpolation?: InterpolationOptions;
  /**
   * Optional keyPrefix that will be applied to the key before resolving.
   * Accepts a string or a selector function (e.g. `$ => $.deeply.nested`).
   * Only supported on the TFunction returned by getFixedT().
   */
  keyPrefix?: string | (($: any) => any);
}
type TOptions<TInterpolationMap extends object = $Dictionary> = TOptionsBase & TInterpolationMap;
type FlatNamespace = $PreservedValue<keyof TypeOptions['resources'], string>;
type Namespace<T = FlatNamespace> = T | readonly T[];
type DefaultNamespace = TypeOptions['defaultNS'];
//#endregion
//#region ../../node_modules/.pnpm/i18next@26.4.5_typescript@5.9.3/node_modules/i18next/typescript/t.d.ts
/** @todo consider to replace {} with Record<string, never> */
// Type Options
type _ReturnObjects = TypeOptions['returnObjects'];
type _ReturnEmptyString = TypeOptions['returnEmptyString'];
type _ReturnNull = TypeOptions['returnNull'];
type _KeySeparator = TypeOptions['keySeparator'];
type _NsSeparator = TypeOptions['nsSeparator'];
type _PluralSeparator = TypeOptions['pluralSeparator'];
type _ContextSeparator = TypeOptions['contextSeparator'];
type _FallbackNamespace = TypeOptions['fallbackNS'];
type _Resources = TypeOptions['resources'];
type _CompatibilityJSON = TypeOptions['compatibilityJSON'];
type _InterpolationPrefix = TypeOptions['interpolationPrefix'];
type _InterpolationSuffix = TypeOptions['interpolationSuffix'];
type _UnescapePrefix = TypeOptions['unescapePrefix'];
type _UnescapeSuffix = TypeOptions['unescapeSuffix'];
type _StrictKeyChecks = TypeOptions['strictKeyChecks'];
type _EnableSelector = TypeOptions['enableSelector'];
type _ParseInterpolation = TypeOptions['parseInterpolation'];
type _InterpolationFormatTypeMap = TypeOptions['interpolationFormatTypeMap'];
type $IsResourcesDefined = [keyof _Resources] extends [never] ? false : true;
type $ValueIfResourcesDefined<Value, Fallback> = $IsResourcesDefined extends true ? Value : Fallback;
type $FirstNamespace<Ns extends Namespace> = Ns extends readonly any[] ? Ns[0] : Ns;
type Resources = $ValueIfResourcesDefined<_Resources, $Dictionary<string>>;
type PluralSuffix = 'zero' | 'one' | 'two' | 'few' | 'many' | 'other';
type WithOrWithoutPlural<Key> = _CompatibilityJSON extends 'v4' ? Key extends `${infer KeyWithoutOrdinalPlural}${_PluralSeparator}ordinal${_PluralSeparator}${PluralSuffix}` ? KeyWithoutOrdinalPlural | Key : Key extends `${infer KeyWithoutPlural}${_PluralSeparator}${PluralSuffix}` ? KeyWithoutPlural | Key : Key : Key;
type JoinKeys<K1, K2> = `${K1 & string}${_KeySeparator}${K2 & string}`;
type AppendNamespace<Ns, Keys> = `${Ns & string}${_NsSeparator}${Keys & string}`;
type TrimSpaces<T extends string, Acc extends string = ''> = T extends `${infer Char}${infer Rest}` ? Char extends ' ' ? TrimSpaces<Rest, Acc> : TrimSpaces<Rest, `${Acc}${Char}`> : T extends '' ? Acc : never;
interface Branded<Ns extends Namespace> {
  $TFunctionBrand: $IsResourcesDefined extends true ? `${Ns extends readonly any[] ? Ns[0] : Ns}` : never;
}
/** ****************************************************
 * Build all keys and key prefixes based on Resources *
 ***************************************************** */
// Do NOT add a `[Res] extends [never]` guard here: it defers these into
// conditional types, so `KeyPrefix<Ns>` no longer resolves to a literal union
// and `keyPrefix` inference widens to the whole namespace, polluting `t()`
// return types with sibling keys (#2434 regression). Guard `never` in the merge.
type KeysBuilderWithReturnObjects<Res, Key = keyof Res> = Key extends keyof Res ? Res[Key] extends $Dictionary | readonly unknown[] ? JoinKeys<Key, WithOrWithoutPlural<keyof $OmitArrayKeys<Res[Key]>>> | JoinKeys<Key, KeysBuilderWithReturnObjects<Res[Key]>> : never : never;
type KeysBuilderWithoutReturnObjects<Res, Key = keyof $OmitArrayKeys<Res>> = Key extends keyof Res ? Res[Key] extends $Dictionary | readonly unknown[] ? JoinKeys<Key, KeysBuilderWithoutReturnObjects<Res[Key]>> : Key : never;
type KeysBuilder<Res, WithReturnObjects> = $IsResourcesDefined extends true ? WithReturnObjects extends true ? keyof Res | KeysBuilderWithReturnObjects<Res> : KeysBuilderWithoutReturnObjects<Res> : string;
type KeysWithReturnObjects = { [Ns in FlatNamespace]: WithOrWithoutPlural<KeysBuilder<Resources[Ns], true>>; };
type KeysWithoutReturnObjects = { [Ns in FlatNamespace]: WithOrWithoutPlural<KeysBuilder<Resources[Ns], false>>; };
type ResourceKeys<WithReturnObjects = _ReturnObjects> = WithReturnObjects extends true ? KeysWithReturnObjects : KeysWithoutReturnObjects;
/** **********************************************************************
 * Parse t function keys based on the namespace, options and key prefix *
 *********************************************************************** */
type KeysByTOptions<TOpt extends TOptions> = TOpt['returnObjects'] extends true ? ResourceKeys<true> : ResourceKeys;
type NsByTOptions<Ns extends Namespace, TOpt extends TOptions> = TOpt['ns'] extends Namespace ? TOpt['ns'] : Ns;
type ParseKeysByKeyPrefix<Keys, KPrefix> = KPrefix extends string ? Keys extends `${KPrefix}${_KeySeparator}${infer Key}` ? Key : never : Keys;
type ParseKeysByNamespaces<Ns extends Namespace, Keys> = Ns extends readonly (infer UnionNsps)[] ? UnionNsps extends keyof Keys ? AppendNamespace<UnionNsps, Keys[UnionNsps]> : never : never;
type ParseKeysByFallbackNs<Keys extends $Dictionary> = _FallbackNamespace extends false ? never : _FallbackNamespace extends (infer UnionFallbackNs extends string)[] ? Keys[UnionFallbackNs] : Keys[_FallbackNamespace & string];
type FilterKeysByContext<Keys, Context> = Context extends string ? Keys extends `${infer Prefix}${_ContextSeparator}${Context}${_PluralSeparator}${PluralSuffix}` | `${infer Prefix}${_ContextSeparator}${Context}` ? Prefix : never : Keys;
type ParseKeys<Ns extends Namespace = DefaultNamespace, TOpt extends TOptions = {}, KPrefix = undefined, Keys extends $Dictionary = KeysByTOptions<TOpt>, ActualNS extends Namespace = NsByTOptions<Ns, TOpt>, Context extends TOpt['context'] = TOpt['context']> = $IsResourcesDefined extends true ? FilterKeysByContext<ParseKeysByKeyPrefix<Keys[$FirstNamespace<ActualNS>], KPrefix> | ParseKeysByNamespaces<ActualNS, Keys> | ParseKeysByFallbackNs<Keys>, Context> : string;
/** *******************************************************
 * Parse t function return type and interpolation values *
 ******************************************************** */
type ParseActualValue<Ret> = Ret extends `${_UnescapePrefix}${infer ActualValue}${_UnescapeSuffix}` ? TrimSpaces<ActualValue> : Ret;
/** Parses interpolation entries as `[variableName, formatSpecifier | never]` tuples. */
type ParseInterpolationEntries<Ret> = [_ParseInterpolation] extends [false] ? never : Ret extends `${string}${_InterpolationPrefix}${infer Value}${_InterpolationSuffix}${infer Rest}` ? (Value extends `${infer ActualValue},${infer Format}` ? [ParseActualValue<ActualValue>, TrimSpaces<Format>] : [ParseActualValue<Value>, never]) | ParseInterpolationEntries<Rest> : never;
/** Built-in i18next formatter name → value type mapping. */
type _BuiltInFormatTypeMap = {
  number: number;
  currency: number;
  datetime: Date;
  relativetime: number;
  list: readonly string[];
};
/** Strips inline formatting options, e.g. `currency(EUR)` → `currency`. */
type _StripFormatOptions<F> = F extends `${infer Name}(${string})` ? Name : F;
/** Resolves the type for a single interpolation entry based on name and format. */
type _ResolveEntryType<Name extends string, Format> = [Format] extends [never] ? Name extends 'count' ? number : string | number : Format extends keyof _InterpolationFormatTypeMap ? _InterpolationFormatTypeMap[Format] : _StripFormatOptions<Format> extends keyof _InterpolationFormatTypeMap ? _InterpolationFormatTypeMap[_StripFormatOptions<Format> & keyof _InterpolationFormatTypeMap] : Format extends keyof _BuiltInFormatTypeMap ? _BuiltInFormatTypeMap[Format] : _StripFormatOptions<Format> extends keyof _BuiltInFormatTypeMap ? _BuiltInFormatTypeMap[_StripFormatOptions<Format> & keyof _BuiltInFormatTypeMap] : string;
/** Local union-to-intersection (not exported from helpers). */
type _UnionToIntersection<T> = (T extends unknown ? (k: T) => void : never) extends ((k: infer I) => void) ? I : never;
/** Builds a per-entry typed record from parsed interpolation entries and intersects them. */
type _InterpolationMapFromEntries<E> = _UnionToIntersection<E extends [infer Name extends string, infer Format] ? $StringKeyPathToRecord<Name, _ResolveEntryType<Name, Format>> : never>;
type InterpolationMap<Ret> = $PreservedValue<_InterpolationMapFromEntries<ParseInterpolationEntries<Ret>>, Record<string, unknown>>;
type ParseTReturnPlural<Res, Key, KeyWithPlural = `${Key & string}${_PluralSeparator}${PluralSuffix}`> = Res[(KeyWithPlural | Key) & keyof Res];
type ParseTReturnPluralOrdinal<Res, Key, KeyWithOrdinalPlural = `${Key & string}${_PluralSeparator}ordinal${_PluralSeparator}${PluralSuffix}`> = Res[(KeyWithOrdinalPlural | Key) & keyof Res];
type ParseTReturnWithFallback<Key, Val> = Val extends '' ? _ReturnEmptyString extends true ? '' : Key : Val extends null ? _ReturnNull extends true ? null : Key : Val;
type ParseTReturn<Key, Res, TOpt extends TOptions = {}> = ParseTReturnWithFallback<Key, Key extends `${infer K1}${_KeySeparator}${infer RestKey}` ? ParseTReturn<RestKey, Res[K1 & keyof Res], TOpt> :
// Process plurals only if count is provided inside options
TOpt['count'] extends number ? TOpt['ordinal'] extends boolean ? ParseTReturnPluralOrdinal<Res, Key> : ParseTReturnPlural<Res, Key> :
// otherwise access plain key without adding plural and ordinal suffixes
Res extends readonly unknown[] ? Key extends `${infer NKey extends number}` ? Res[NKey] : never : Res[Key & keyof Res]>;
type TReturnOptionalNull = _ReturnNull extends true ? null : never;
type TReturnOptionalObjects<TOpt extends {
  returnObjects?: unknown;
}> = _ReturnObjects extends true ? $SpecialObject | string : TOpt['returnObjects'] extends true ? $SpecialObject : string;
type DefaultTReturn<TOpt extends {
  returnObjects?: unknown;
}> = TReturnOptionalObjects<TOpt> | TReturnOptionalNull;
type KeyWithContext<Key, TOpt extends TOptions> = TOpt['context'] extends string ? `${Key & string}${_ContextSeparator}${TOpt['context']}` : Key;
type ContextOfKey<Key extends string, Ns extends Namespace = DefaultNamespace, TOpt extends TOptions = {}, KPrefix = undefined, Keys extends $Dictionary = KeysByTOptions<TOpt>, ActualNS extends Namespace = NsByTOptions<Ns, TOpt>, ActualKeys = ParseKeysByKeyPrefix<Keys[$FirstNamespace<ActualNS>], KPrefix> | ParseKeysByNamespaces<ActualNS, Keys> | ParseKeysByFallbackNs<Keys>> = $IsResourcesDefined extends true ? Key extends ActualKeys ? string : ActualKeys extends `${Key}${_ContextSeparator}${infer Context}${_PluralSeparator}${PluralSuffix}` | `${Key}${_ContextSeparator}${infer Context}` ? Context : never : string;
// helper that maps the configured fallbackNS value to the matching resources slice
type FallbackResourcesOf<FallbackNS, R> = FallbackNS extends readonly (infer FN)[] ? R[FN & keyof R] : [FallbackNS] extends [false] ? never : R[Extract<FallbackNS, keyof R> & keyof R];
/* reuse the parse helpers as top-level aliases (no nested type declarations) */
type _PrimaryParse<ActualKey, PrimaryNS extends keyof Resources, TOpt extends TOptions> = ParseTReturn<ActualKey, Resources[PrimaryNS], TOpt>;
type _FallbackParse<ActualKey, FallbackNS, TOpt extends TOptions> = [FallbackResourcesOf<FallbackNS, Resources>] extends [never] ? never : ParseTReturn<ActualKey, FallbackResourcesOf<FallbackNS, Resources>, TOpt>;
type TFunctionReturn<Ns extends Namespace, Key, TOpt extends TOptions, ActualNS extends Namespace = NsByTOptions<Ns, TOpt>, ActualKey = KeyWithContext<Key, TOpt>> = $IsResourcesDefined extends true ? ActualKey extends `${infer Nsp}${_NsSeparator}${infer RestKey}` ? ParseTReturn<RestKey, Resources[Nsp & keyof Resources], TOpt> : $FirstNamespace<ActualNS> extends (infer PrimaryNS) ? [PrimaryNS] extends [keyof Resources] ? [_PrimaryParse<ActualKey, PrimaryNS & keyof Resources, TOpt>] extends [never] ? [_FallbackParse<ActualKey, _FallbackNamespace, TOpt>] extends [never] ? DefaultTReturn<TOpt> : _FallbackParse<ActualKey, _FallbackNamespace, TOpt> : _PrimaryParse<ActualKey, PrimaryNS & keyof Resources, TOpt> : never : never : DefaultTReturn<TOpt>;
type TFunctionDetailedResult<T = string, TOpt extends TOptions = {}> = {
  /**
   * The plain used key
   */
  usedKey: string;
  /**
   * The translation result.
   */
  res: T;
  /**
   * The key with context / plural
   */
  exactUsedKey: string;
  /**
   * The used language for this translation.
   */
  usedLng: string;
  /**
   * The used namespace for this translation.
   */
  usedNS: string;
  /**
   * The parameters used for interpolation.
   */
  usedParams: InterpolationMap<T> & {
    count?: TOpt['count'];
  };
};
type TFunctionProcessReturnValue<Ret, DefaultValue> = Ret extends string | $SpecialObject | null ? Ret : [DefaultValue] extends [never] ? Ret : DefaultValue;
type TFunctionReturnOptionalDetails<Ret, TOpt extends TOptions> = TOpt['returnDetails'] extends true ? TFunctionDetailedResult<Ret, TOpt> : Ret;
type AppendKeyPrefix<Key, KPrefix> = KPrefix extends string ? `${KPrefix}${_KeySeparator}${Key & string}` : Key;
/**
 * Resolves the effective key prefix by preferring a per-call `keyPrefix` from
 * options over the interface-level `KPrefix` (set via getFixedT's 3rd argument).
 */
type EffectiveKPrefix<KPrefix, TOpt> = TOpt extends {
  keyPrefix: infer OptKP extends string;
} ? OptKP : KPrefix;
/** ************************
 * T function declaration *
 ************************* */
interface TFunctionStrict<Ns extends Namespace = DefaultNamespace, KPrefix = undefined> extends Branded<Ns> {
  <const Key extends ParseKeys<Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> | TemplateStringsArray, const TOpt extends TOptions, Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, EffectiveKPrefix<KPrefix, TOpt>>, TOpt>>(key: Key | Key[], options?: TOpt & InterpolationMap<Ret> & {
    context?: Key extends string ? unknown extends TOpt['context'] ? TOpt['context'] : ContextOfKey<Key, Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> : never;
  }): TFunctionReturnOptionalDetails<TFunctionProcessReturnValue<$NoInfer<Ret>, never>, TOpt>;
  <const Key extends ParseKeys<Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> | TemplateStringsArray, const TOpt extends TOptions, Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, EffectiveKPrefix<KPrefix, TOpt>>, TOpt>>(key: Key | Key[], defaultValue: string, options?: TOpt & InterpolationMap<Ret> & {
    context?: Key extends string ? unknown extends TOpt['context'] ? TOpt['context'] : ContextOfKey<Key, Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> : never;
  }): TFunctionReturnOptionalDetails<TFunctionProcessReturnValue<$NoInfer<Ret>, never>, TOpt>;
}
interface TFunctionNonStrict<Ns extends Namespace = DefaultNamespace, KPrefix = undefined> extends Branded<Ns> {
  <const Key extends ParseKeys<Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> | TemplateStringsArray, const TOpt extends TOptions, Ret extends TFunctionReturn<Ns, AppendKeyPrefix<Key, EffectiveKPrefix<KPrefix, TOpt>>, TOpt>, const ActualOptions extends Omit<TOpt, 'context'> & InterpolationMap<Ret> & {
    context?: Key extends string ? unknown extends TOpt['context'] ? TOpt['context'] : ContextOfKey<Key, Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> : never;
  } = TOpt & InterpolationMap<Ret> & {
    context?: Key extends string ? unknown extends TOpt['context'] ? TOpt['context'] : ContextOfKey<Key, Ns, TOpt, EffectiveKPrefix<KPrefix, TOpt>> : never;
  }, DefaultValue extends string = never>(...args: [key: Key | Key[], options?: ActualOptions] | [key: string | string[], options: TOpt & $Dictionary & {
    defaultValue: DefaultValue;
  }] | [key: string | string[], defaultValue: DefaultValue, options?: TOpt & $Dictionary]): TFunctionReturnOptionalDetails<TFunctionProcessReturnValue<$NoInfer<Ret>, DefaultValue>, TOpt>;
}
type TFunctionSignature<Ns extends Namespace = DefaultNamespace, KPrefix = undefined> = _EnableSelector extends true | 'optimize' | 'strict' ? TFunctionSelector<Ns, KPrefix, GetSource<Ns, KPrefix>> : _StrictKeyChecks extends true ? TFunctionStrict<Ns, KPrefix> : TFunctionNonStrict<Ns, KPrefix>;
interface TFunction<Ns extends Namespace = DefaultNamespace, KPrefix = undefined> extends TFunctionSignature<Ns, KPrefix> {}
type KeyPrefix<Ns extends Namespace> = ResourceKeys<true>[$FirstNamespace<Ns>] | undefined;
/**
 * Strict variant: every namespace (primary included) is exposed under its own
 * key on `$`. The flattened-primary form (`Resources[Ns[0]] &`) is dropped, so
 * `$.foo` no longer typechecks when `foo` is a key in the primary namespace —
 * callers must write `$.primary.foo`. Applied uniformly to single- and
 * multi-ns hooks under `enableSelector: 'strict'`.
 */
type _NsResourceStrict<Ns extends Namespace> = Ns extends readonly any[] ? PickNamespaces<Resources, Ns[number]> : PickNamespaces<Resources, Ns & keyof Resources>;
/** The raw (unfiltered) resource object for a given namespace. */
type NsResource<Ns extends Namespace> = [_EnableSelector] extends ['strict'] ? _NsResourceStrict<Ns> : Ns extends readonly [keyof Resources, any, ...any] ? Resources[Ns[0]] & PickNamespaces<Resources, Ns[number]> : Resources[$FirstNamespace<Ns>];
/** A selector function that can be used as `keyPrefix` to scope `t()` to a sub-tree of the resource. */
type KeyPrefixSelector<Ns extends Namespace> = (src: NsResource<Ns>) => object;
/// ////////////// ///
///  ↆ selector ↆ  ///
/// ////////////// ///
declare const $PluralBrand: unique symbol;
/** Marks a value as coming from a plural-form key, requiring `count` in the selector options. */
type PluralValue<T extends string> = T & {
  readonly [$PluralBrand]: typeof $PluralBrand;
};
declare const $SelectorKeyBrand: unique symbol;
/**
 * A branded string produced by {@link keyFromSelector}.
 * Can be passed directly to `t()` when the selector API is enabled.
 */
type SelectorKey = string & {
  readonly [$SelectorKeyBrand]: typeof $SelectorKeyBrand;
};
/** Recursively strips the {@link PluralValue} brand from a type (handles nested objects for `returnObjects`). */
type DeepUnwrapPlural<T> = T extends PluralValue<infer U> ? U : T extends readonly any[] ? { [I in keyof T]: DeepUnwrapPlural<T[I]>; } : T extends object ? { [K in keyof T]: DeepUnwrapPlural<T[K]>; } : T;
type NsArg<Ns extends Namespace> = Ns[number] | readonly Ns[number][];
interface TFunctionSelector<Ns extends Namespace, KPrefix, Source> extends Branded<Ns> {
  // ── Pre-computed key(s) from keyFromSelector ────────────────────────────────
  // Accepts a branded `SelectorKey` (or array of them) produced by `keyFromSelector`.
  // Return-type precision is traded for the flexibility of decoupled key creation.
  // Placed first so that the more general selector overloads (below) are last —
  // TypeScript's `Parameters<>` utility resolves against the last call signature.
  <const Opts extends SelectorOptions<Ns[number]> = SelectorOptions<Ns[number]>>(key: SelectorKey | SelectorKey[], ...args: [options?: Opts & $Dictionary]): DefaultTReturn<Opts>;
  // ── Selector(s) with explicit `ns` ───────────────────────────────────────────
  <Target extends ConstrainTarget<Opts>, const NewNs extends NsArg<Ns> & Namespace, const Opts extends SelectorOptions<NewNs>, NewSrc extends GetSource<NewNs, KPrefix>>(selector: SelectorFn<NewSrc, ApplyTarget<Target, Opts>, Opts> | readonly SelectorFn<NewSrc, ApplyTarget<Target, Opts>, Opts>[], options: Opts & InterpolationMap<Target> & {
    ns: NewNs;
  }): SelectorReturn<Target, Opts>;
  // ── Array of selectors with default `ns` ─────────────────────────────────────
  // Captures the selector tuple as `const Fns` so TypeScript preserves each
  // element's exact return type.  The union of return types is then extracted
  // via a distributive `infer`, which correctly handles mixed PluralValue<T> and
  // plain-string callbacks that would otherwise cause TypeScript to "lock in" the
  // type from the first element.
  <const Fns extends readonly ((src: Select<Source, Opts['context']>) => string | object)[], const Opts extends SelectorOptions<Ns[number]> = SelectorOptions<Ns[number]>>(selectors: Fns, options?: Opts & InterpolationMap<DeepUnwrapPlural<Fns[number] extends ((...args: any[]) => infer R) ? R : never>>): SelectorReturn<Fns[number] extends ((...args: any[]) => infer R) ? R : never, Opts>;
  // ── Single selector with context + returnObjects ────────────────────────────
  // More specific than the general context overload below. Captures `Context` as
  // a const generic and uses `const Fn` + `ReturnType<Fn>` so FilterKeys sees the
  // concrete context and the callback's object/array shape is preserved (#2398).
  // Without this, `ConstrainTarget` / `ApplyTarget` collapse to `unknown` when
  // `returnObjects: true`.
  <const Context extends string, const Fn extends (src: Select<Source, Context>) => any, const Opts extends SelectorOptions<Ns[number]> & {
    context: Context;
    returnObjects: true;
  } = SelectorOptions<Ns[number]> & {
    context: Context;
    returnObjects: true;
  }>(selector: Fn, options: Opts & InterpolationMap<DeepUnwrapPlural<ReturnType<Fn>>>): SelectorReturn<ReturnType<Fn>, Opts>;
  // ── Single selector with context — bypasses count enforcement ────────────────
  // When `context` is present in options, `Target` is derived from the
  // context-filtered source (third mapped type of FilterKeys), which does NOT
  // apply the PluralValue brand.  A separate overload avoids the circular
  // inference that would otherwise occur when `Opts['context']` sits inside the
  // conditional rest tuple of the overload below.
  <Target extends ConstrainTarget<Opts>, const NewNs extends NsArg<Ns> = Ns[number], const Opts extends SelectorOptions<NewNs> & {
    context: string;
  } = SelectorOptions<NewNs> & {
    context: string;
  }>(selector: SelectorFn<Source, ApplyTarget<Target, Opts>, Opts>, options: Opts & InterpolationMap<Target>): SelectorReturn<Target, Opts>;
  // ── Single selector with defaultValue — preserves literal type of DV ────────
  // `const Opts` loses literal precision for `defaultValue` when inferred
  // through a conditional rest tuple (TypeScript limitation).  This dedicated
  // overload captures `DV` from a regular (non-conditional) parameter position,
  // preserving its literal type.  Count enforcement for plural keys is achieved
  // via a conditional intersection on the options parameter.
  <const Fn extends (src: Select<Source, undefined>) => ConstrainTarget<Opts>, const DV extends string, const Opts extends SelectorOptions<Ns[number]> = SelectorOptions<Ns[number]>>(selector: Fn, options: Opts & {
    defaultValue: DV;
  } & (ReturnType<Fn> extends PluralValue<string> ? {
    count: number;
  } : {}) & InterpolationMap<DeepUnwrapPlural<ReturnType<Fn>>>): SelectorReturn<ReturnType<Fn>, Opts, DV>;
  // ── Single selector without context — enforces count for plural keys ──────────
  // Uses `const Fn` to capture the selector's exact return type independently of
  // `Opts`, breaking the circular dependency between `Target` inference and the
  // conditional rest tuple.  `ReturnType<Fn>` drives both the plural check and
  // the return type; `Opts` is inferred later from the resolved rest args.
  <const Fn extends (src: Select<Source, undefined>) => ConstrainTarget<Opts>, const Opts extends SelectorOptions<Ns[number]> = SelectorOptions<Ns[number]>>(selector: Fn, ...args: ReturnType<Fn> extends PluralValue<string> ? [options: Opts & {
    count: number;
  } & InterpolationMap<DeepUnwrapPlural<ReturnType<Fn>>>] : [options?: Opts & InterpolationMap<ReturnType<Fn>>]): SelectorReturn<ReturnType<Fn>, Opts>;
}
interface SelectorOptions<Ns = Namespace> extends Omit<TOptionsBase, 'ns' | 'nsSeparator'>, $Dictionary {
  ns?: Ns;
}
type SelectorReturn<Target, Opts extends {
  defaultValue?: unknown;
  returnObjects?: boolean;
}, DV = Opts['defaultValue']> = $IsResourcesDefined extends true ? TFunctionReturnOptionalDetails<ProcessReturnValue<DeepUnwrapPlural<Target>, DV>, Opts> : DefaultTReturn<Opts>;
interface SelectorFn<Source, Target, Opts extends SelectorOptions<unknown>> {
  (translations: Select<Source, Opts['context']>): Target;
}
type ApplyKeyPrefix<T extends [any], KPrefix> = KPrefix extends `${infer Head}${_KeySeparator}${infer Tail}` ? ApplyKeyPrefix<[T[0][Head]], Tail> : T[0][KPrefix & string];
type ApplyTarget<Target, Opts extends {
  returnObjects?: unknown;
}> = Opts['returnObjects'] extends true ? unknown : Target;
type ConstrainTarget<Opts extends SelectorOptions<any>> = _ReturnObjects extends true ? unknown : Opts['returnObjects'] extends true ? unknown : $IsResourcesDefined extends false ? unknown : string;
type ProcessReturnValue<Target, DefaultValue> = $Turtles extends Target ? string : [DefaultValue] extends [never] ? Target : unknown extends DefaultValue ? Target : Target | DefaultValue;
type PickNamespaces<T, K extends keyof any> = { [P in K as P extends keyof T ? P : never]: T[P & keyof T]; };
/** Extracts the sub-tree returned by a selector function used as keyPrefix. */
type SelectorReturnSource<KPrefix, Fallback> = KPrefix extends ((...args: any[]) => infer R) ? R extends object ? R : Fallback : Fallback;
type GetSource<Ns extends Namespace, KPrefix, Res = NsResource<Ns>> = KPrefix extends ((...args: any[]) => any) ? SelectorReturnSource<KPrefix, Res> : KPrefix extends keyof Res ? Res[KPrefix] : undefined extends KPrefix ? Res : ApplyKeyPrefix<[Res], KPrefix>;
type Select<T, Context> = $IsResourcesDefined extends false ? $Turtles : [_EnableSelector] extends ['optimize'] ? T : FilterKeys<T, Context>;
/**
 * Context-variant keys that are actually present (not JSON-union phantoms typed
 * as optional `undefined`, e.g. `transKey1_withContext?: undefined`).
 */
type _DefinedContextKeys<T, Pattern extends string> = { [P in keyof T as P extends Pattern ? ([T[P]] extends [undefined] ? never : P) : never]: true; };
type _HasContextVariant<T, K extends string, Context> = [keyof _DefinedContextKeys<T, `${K}${_ContextSeparator}${Context & string}` | `${K}${_ContextSeparator}${Context & string}${_PluralSeparator}${PluralSuffix}`>] extends [never] ? false : true;
/** Checks whether key K has **any** context variant in T (excluding pure plural suffixes). */
type _IsContextualKey<T, K extends string> = [Exclude<keyof _DefinedContextKeys<T, `${K}${_ContextSeparator}${string}`>, `${K}${_PluralSeparator}${PluralSuffix}` | `${K}${_PluralSeparator}ordinal${_PluralSeparator}${PluralSuffix}`>] extends [never] ? false : true;
/**
 * Distributes {@link FilterKeysObject} over unions so heterogeneous JSON array
 * element types (each object literal in the array) are filtered independently,
 * then re-unified. Without distribution, `keyof (A | B)` is only the common keys
 * and context variants that exist on a single element are invisible, which
 * produced partial element unions for `returnObjects` + `context` (#2398).
 */
type FilterKeys<T, Context> = [T] extends [readonly any[]] ? { [I in keyof T]: FilterKeys<T[I], Context>; } : T extends any ? FilterKeysObject<T, Context> : never;
type FilterKeysObject<T, Context> = $Prune<{ [
// Mapped type 1: object-valued keys (recurse) + plain leaf keys (non-plural, non-context)
K in keyof T as T[K] extends object ? K : [Context] extends [string] ? K extends `${string}${_ContextSeparator}${Context}` | `${string}${_ContextSeparator}${Context}${_PluralSeparator}${PluralSuffix}` ? never // context keys handled by mapped type 3
 : K extends `${string}${_PluralSeparator}${PluralSuffix}` ? never // plural keys handled by mapped type 2
 : K extends string ? _HasContextVariant<T, K, Context> extends true ? never // context variant exists, drop base key (type 3 handles it)
 : _IsContextualKey<T, K> extends true ? never // key has context variants but not for this context
 : K // no context variants at all, keep base key
 : K : K extends `${string}${_PluralSeparator}${PluralSuffix}` ? never : K]: T[K] extends object ? FilterKeys<T[K], Context> : T[K]; } & { [
// Mapped type 2: plural collapsing (active regardless of context)
K in keyof T as T[K] extends object ? never : [Context] extends [string] ? K extends `${string}${_ContextSeparator}${Context}` | `${string}${_ContextSeparator}${Context}${_PluralSeparator}${PluralSuffix}` ? never // context keys handled by mapped type 3
 : K extends `${infer Prefix}${_PluralSeparator}${PluralSuffix}` | `${infer Prefix}${_PluralSeparator}ordinal${_PluralSeparator}${PluralSuffix}` ? Prefix : never : K extends `${infer Prefix}${_PluralSeparator}${PluralSuffix}` | `${infer Prefix}${_PluralSeparator}ordinal${_PluralSeparator}${PluralSuffix}` ? Prefix : never]: T[K] extends object ? FilterKeys<T[K], Context> : PluralValue<T[K] & string>; } & { [
// Mapped type 3: context key collapsing (skip JSON-union phantoms typed as `undefined`)
K in keyof T as T[K] extends object ? never : [T[K]] extends [undefined] ? never : [Context] extends [string] ? K extends `${infer Prefix}${_ContextSeparator}${Context}` | `${infer Prefix}${_ContextSeparator}${Context}${_PluralSeparator}${PluralSuffix}` ? Prefix : never : never]: T[K] extends object ? FilterKeys<T[K], Context> : T[K]; }>;
//#endregion
//#region ../../node_modules/.pnpm/i18next@26.4.5_typescript@5.9.3/node_modules/i18next/index.d.ts
interface Interpolator {
  init(options: InterpolationOptions, reset: boolean): undefined;
  reset(): undefined;
  resetRegExp(): undefined;
  interpolate(str: string, data: object, lng: string, options: InterpolationOptions): string;
  nest(str: string, fc: (...args: any[]) => any, options: InterpolationOptions): string;
}
declare class ResourceStore {
  constructor(data: Resource, options: InitOptions);
  public data: Resource;
  public options: InitOptions;
  /**
   * Gets fired when resources got added or removed
   */
  on(event: 'added' | 'removed', callback: (lng: string, ns: string) => void): void;
  /**
   * Remove event listener
   * removes all callback when callback not specified
   */
  off(event: 'added' | 'removed', callback?: (lng: string, ns: string) => void): void;
  /**
   * Subscribe to an event, but only once. The listener is removed after the first call.
   */
  once(event: 'added' | 'removed', callback: (lng: string, ns: string) => void): this;
}
interface Formatter {
  init(services: Services, i18nextOptions: InitOptions): void;
  add(name: string, fc: (value: any, lng: string | undefined, options: any) => string): void;
  addCached(name: string, fc: (lng: string | undefined, options: any) => (value: any) => string): void;
  format: FormatFunction;
}
interface Services {
  backendConnector: any;
  i18nFormat: any;
  interpolator: Interpolator;
  languageDetector: any;
  languageUtils: any;
  logger: any;
  pluralResolver: any;
  resourceStore: ResourceStore;
  formatter?: Formatter;
}
type ModuleType = 'backend' | 'logger' | 'languageDetector' | 'postProcessor' | 'i18nFormat' | 'formatter' | '3rdParty';
interface Module {
  type: ModuleType;
}
type CallbackError = Error | string | null | undefined;
type ReadCallback = (err: CallbackError, data: ResourceKey | boolean | null | undefined) => void;
type MultiReadCallback = (err: CallbackError, data: Resource | null | undefined) => void;
/**
 * Used to load data for i18next.
 * Can be provided as a singleton or as a prototype constructor (preferred for supporting multiple instances of i18next).
 * For singleton set property `type` to `'backend'` For a prototype constructor set static property.
 */
interface BackendModule<Options = object> extends Module {
  type: 'backend';
  init(services: Services, backendOptions: Options, i18nextOptions: InitOptions): void;
  read(language: string, namespace: string, callback: ReadCallback): void;
  /** Save the missing translation */
  create?(languages: readonly string[], namespace: string, key: string, fallbackValue: string): void;
  /** Load multiple languages and namespaces. For backends supporting multiple resources loading */
  readMulti?(languages: readonly string[], namespaces: readonly string[], callback: MultiReadCallback): void;
  /** Store the translation. For backends acting as cache layer */
  save?(language: string, namespace: string, data: ResourceLanguage): void;
}
/**
 * Used to detect language in user land.
 * Can be provided as a singleton or as a prototype constructor (preferred for supporting multiple instances of i18next).
 * For singleton set property `type` to `'languageDetector'` For a prototype constructor set static property.
 */
interface LanguageDetectorModule extends Module {
  type: 'languageDetector';
  init?(services: Services, detectorOptions: object, i18nextOptions: InitOptions): void;
  /** Must return detected language */
  detect(): string | readonly string[] | undefined;
  cacheUserLanguage?(lng: string): void;
}
/**
 * Used to detect language in user land.
 * Can be provided as a singleton or as a prototype constructor (preferred for supporting multiple instances of i18next).
 * For singleton set property `type` to `'languageDetector'` For a prototype constructor set static property.
 */
interface LanguageDetectorAsyncModule extends Module {
  type: 'languageDetector';
  /** Set to true to enable async detection */
  async: true;
  init?(services: Services, detectorOptions: object, i18nextOptions: InitOptions): void;
  /** Must call callback passing detected language or return a Promise */
  detect(callback: (lng: string | readonly string[] | undefined) => void | undefined): void | Promise<string | readonly string[] | undefined>;
  cacheUserLanguage?(lng: string): void | Promise<void>;
}
/**
 * Override the built-in console logger.
 * Do not need to be a prototype function.
 */
interface LoggerModule extends Module {
  type: 'logger';
  log(...args: any[]): void;
  warn(...args: any[]): void;
  error(...args: any[]): void;
}
interface I18nFormatModule extends Module {
  type: 'i18nFormat';
}
interface FormatterModule extends Module, Formatter {
  type: 'formatter';
}
interface ThirdPartyModule extends Module {
  type: '3rdParty';
  init(i18next: i18n$1): void;
}
interface Modules {
  backend?: BackendModule;
  logger?: LoggerModule;
  languageDetector?: LanguageDetectorModule | LanguageDetectorAsyncModule;
  i18nFormat?: I18nFormatModule;
  formatter?: FormatterModule;
  external: ThirdPartyModule[];
}
// helper to identify class https://stackoverflow.com/a/45983481/2363935
interface Newable<T> {
  new (...args: any[]): T;
}
interface NewableModule<T extends Module> extends Newable<T> {
  type: T['type'];
}
type Callback = (error: any, t: TFunction) => void;
interface CloneOptions extends InitOptions {
  /**
   * Will create a new instance of the resource store and import the existing translation resources.
   * This way it will not shared the resource store instance.
   * @default false
   */
  forkResourceStore?: boolean;
}
interface CustomInstanceExtensions$1 {}
// Used just here to exclude `DefaultNamespace` which can be both string or array from `FlatNamespace`
// in TFunction declaration below.
// Due to this only very special usage I'm not moving this inside helpers.
type InferArrayValuesElseReturnType<T> = T extends (infer A)[] ? A : T;
interface i18n$1 extends CustomInstanceExtensions$1 {
  // Expose parameterized t in the i18next interface hierarchy
  t: TFunction<[...$NormalizeIntoArray<DefaultNamespace>, ...Exclude<FlatNamespace, InferArrayValuesElseReturnType<DefaultNamespace>>[]]>;
  /**
   * The default of the i18next module is an i18next instance ready to be initialized by calling init.
   * You can create additional instances using the createInstance function.
   *
   * @param options - Initial options.
   * @param callback - will be called after all translations were loaded or with an error when failed (in case of using a backend).
   */
  init(callback?: Callback): Promise<TFunction>;
  init<T>(options: InitOptions<T>, callback?: Callback): Promise<TFunction>;
  loadResources(callback?: (err: any) => void): void;
  /**
   * The use function is there to load additional plugins to i18next.
   * For available module see the plugins page and don't forget to read the documentation of the plugin.
   *
   * @param module Accepts a class or object
   */
  use<T extends Module>(module: T | NewableModule<T> | Newable<T>): this;
  /**
   * List of modules used
   */
  modules: Modules;
  /**
   * Internal container for all used plugins and implementation details like languageUtils, pluralResolvers, etc.
   */
  services: Services;
  /**
   * Internal container for translation resources
   */
  store: ResourceStore;
  /**
   * Uses similar args as the t function and returns true if a key exists.
   * Acts as a type guard on single-key calls, narrowing the key to
   * {@link SelectorKey} so it can be passed to `t()`.
   */
  exists: {
    <K extends string>(key: K, options?: TOptions): key is K & SelectorKey;
    (key: string | string[], options?: TOptions): boolean;
  };
  /**
   * Returns a resource data by language.
   */
  getDataByLanguage(lng: string): {
    [key: string]: {
      [key: string]: string;
    };
  } | undefined;
  /**
   * Returns a t function that defaults to given language or namespace.
   * Both params could be arrays of languages or namespaces and will be treated as fallbacks in that case.
   * On the returned function you can like in the t function override the languages or namespaces by passing them in options or by prepending namespace.
   *
   * Accepts optional keyPrefix that will be automatically applied to returned t function.
   */
  getFixedT<Ns extends Namespace | null, const TKPrefixFn extends (TypeOptions['enableSelector'] extends true | 'optimize' | 'strict' ? KeyPrefixSelector<ActualNs> : never), ActualNs extends Namespace = Ns extends null ? DefaultNamespace : Ns>(lng: string | readonly string[] | null, ns: Ns, keyPrefix: TKPrefixFn): TFunction<ActualNs, TKPrefixFn>;
  getFixedT<Ns extends Namespace | null = DefaultNamespace, TKPrefix extends KeyPrefix<ActualNs> = undefined, ActualNs extends Namespace = Ns extends null ? DefaultNamespace : Ns>(...args: [lng: string | readonly string[], ns?: Ns, keyPrefix?: TKPrefix | (($: any) => any)] | [lng: null, ns: Ns, keyPrefix?: TKPrefix | (($: any) => any)]): TFunction<ActualNs, TKPrefix>;
  /**
   * Changes the language. The callback will be called as soon translations were loaded or an error occurs while loading.
   * HINT: For easy testing - setting lng to 'cimode' will set t function to always return the key.
   */
  changeLanguage(lng?: string, callback?: Callback): Promise<TFunction>;
  /**
   * Is set to the current detected or set language.
   * If you need the primary used language depending on your configuration (supportedLngs, load) you will prefer using i18next.languages[0].
   */
  language: string;
  /**
   * Is set to an array of language-codes that will be used it order to lookup the translation value.
   */
  languages: readonly string[];
  /**
   * Is set to the current resolved language.
   * It can be used as primary used language, for example in a language switcher.
   */
  resolvedLanguage?: string;
  /**
   * Checks if namespace has loaded yet.
   * i.e. used by react-i18next
   */
  hasLoadedNamespace(ns: string | readonly string[], options?: {
    lng?: string | readonly string[];
    fallbackLng?: InitOptions['fallbackLng'];
    /**
     * if `undefined` is returned default checks are performed.
     */
    precheck?: (i18n: i18n$1,
    /**
     * Check if the language namespace provided are not in loading status:
     * returns `true` if load is completed successfully or with an error.
     */
    loadNotPending: (lng: string | readonly string[], ns: string | readonly string[]) => boolean) => boolean | undefined;
  }): boolean;
  /**
   * Loads additional namespaces not defined in init options.
   */
  loadNamespaces(ns: string | readonly string[], callback?: Callback): Promise<void>;
  /**
   * Loads additional languages not defined in init options (preload).
   */
  loadLanguages(lngs: string | readonly string[], callback?: Callback): Promise<void>;
  /**
   * Reloads resources on given state. Optionally you can pass an array of languages and namespaces as params if you don't want to reload all.
   */
  reloadResources(lngs?: string | readonly string[], ns?: string | readonly string[], callback?: () => void): Promise<void>;
  reloadResources(lngs: null, ns: string | readonly string[], callback?: () => void): Promise<void>;
  /**
   * Changes the default namespace.
   */
  setDefaultNamespace(ns: string | readonly string[]): void;
  /**
   * Returns rtl or ltr depending on languages read direction.
   */
  dir(lng?: string): 'ltr' | 'rtl';
  /**
   * Exposes interpolation.format function added on init.
   */
  format: FormatFunction;
  /**
   * Will return a new i18next instance.
   * Please read the options page for details on configuration options.
   * Providing a callback will automatically call init.
   * The callback will be called after all translations were loaded or with an error when failed (in case of using a backend).
   */
  createInstance(options?: InitOptions, callback?: Callback): i18n$1;
  /**
   * Creates a clone of the current instance. Shares store, plugins and initial configuration.
   * Can be used to create an instance sharing storage but being independent on set language or namespaces.
   */
  cloneInstance(options?: CloneOptions, callback?: Callback): i18n$1;
  /**
   * Returns a JSON representation of the i18next instance for serialization.
   */
  toJSON(): {
    options: InitOptions;
    store: ResourceStore;
    language: string;
    languages: readonly string[];
    resolvedLanguage?: string;
  };
  /**
   * Gets fired after initialization.
   */
  on(event: 'initialized', callback: (options: InitOptions) => void): this;
  /**
   * Gets fired on loaded resources.
   */
  on(event: 'loaded', callback: (loaded: {
    [language: string]: {
      [namespace: string]: boolean;
    };
  }) => void): this;
  /**
   * Gets fired if loading resources failed.
   */
  on(event: 'failedLoading', callback: (lng: string, ns: string, msg: string) => void): this;
  /**
   * Gets fired on accessing a key not existing.
   */
  on(event: 'missingKey', callback: (lngs: readonly string[], namespace: string, key: string, res: string) => void): this;
  /**
   * Gets fired when changeLanguage got called.
   */
  on(event: 'languageChanged', callback: (lng: string) => void): this;
  /**
   * Event listener
   */
  on(event: string, listener: (...args: any[]) => void): this;
  /**
   * Remove event listener
   * removes all callback when callback not specified
   */
  off(event: string, listener?: (...args: any[]) => void): void;
  /**
   * Subscribe to an event, but only once. The listener is removed after the first call.
   */
  once(event: string, listener: (...args: any[]) => void): this;
  /**
   * Gets one value by given key.
   */
  getResource(lng: string, ns: string, key: string, options?: Pick<InitOptions, 'keySeparator' | 'ignoreJSONStructure'>): any;
  /**
   * Adds one key/value.
   */
  addResource(lng: string, ns: string, key: string, value: string, options?: {
    keySeparator?: string;
    silent?: boolean;
  }): i18n$1;
  /**
   * Adds multiple key/values.
   */
  addResources(lng: string, ns: string, resources: any): i18n$1;
  /**
   * Adds a complete bundle.
   * Setting deep param to true will extend existing translations in that file.
   * Setting overwrite to true it will overwrite existing translations in that file.
   */
  addResourceBundle(lng: string, ns: string, resources: any, deep?: boolean, overwrite?: boolean, options?: {
    silent?: boolean;
    skipCopy?: boolean;
  }): i18n$1;
  /**
   * Checks if a resource bundle exists.
   */
  hasResourceBundle(lng: string, ns: string): boolean;
  /**
   * Returns a resource bundle.
   */
  getResourceBundle(lng: string, ns: string): any;
  /**
   * Removes an existing bundle.
   */
  removeResourceBundle(lng: string, ns: string): i18n$1;
  /**
   * Current options
   */
  options: InitOptions;
  /**
   * Is initialized
   */
  isInitialized: boolean;
  /**
   * Is initializing
   */
  isInitializing: boolean;
  /**
   * Store was initialized
   */
  initializedStoreOnce: boolean;
  /**
   * Language was initialized
   */
  initializedLanguageOnce: boolean;
  /**
   * Emit event
   */
  emit(eventName: string, ...args: any[]): void;
}
//#endregion
//#region ../../node_modules/.pnpm/i18next@26.4.5_typescript@5.9.3/node_modules/i18next/index.d.mts
interface CustomInstanceExtensions {}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface i18n extends i18n$1, CustomInstanceExtensions {}
//#endregion
//#region src/translations/i18n.d.ts
/** i18n engine exported from the `@labirthermal/webcomponents` package */
declare const i18webcomponents: i18n;
//#endregion
//#region src/styles/defaultStyles.d.ts
export declare const addInlineStyles: () => void;
//#endregion
//#region src/translations/Languages.d.ts
/**
 * Keys of all translation keys.
 *
 * In the comment is the englis version. Use only the keys in any t() function.
 */
declare enum T {
  moreoptions = "moreoptions",
  loading = "loading",
  config = "config",
  temperature = "temperature",
  upload = "upload",
  uploadafile = "uploadafile",
  selectfile = "selectfile",
  addfiles = "addfiles",
  clear = "clear",
  dragorselectfile = "dragorselectfile",
  share = "share",
  fileloadingerror = "fileloadingerror",
  embedhint = "embedhint",
  embedlibrary = "embedlibrary",
  embedcomponent = "embedcomponent",
  copy = "copy",
  create = "create",
  remotefoldersbrowseraddfolderhint = "remotefoldersbrowseraddfolderhint",
  file = "file",
  layout_simple = "layout_simple",
  layout_advanced = "layout_advanced",
  layout_nogui = "layout_nogui",
  layout_lesson = "layout_lesson",
  /** Next */
  next = "next",
  /** Previous */
  prev = "prev",
  /** Back */
  back = "back",
  /** Close */
  close = "close",
  open = "open",
  detail = "detail",
  showeverything = "showeverything",
  palette = "palette",
  /** Description */
  description = "description",
  /** Author */
  author = "author",
  /** License */
  license = "license",
  /** Recorded at */
  recordedat = "recordedat",
  /** Display settings */
  displaysettings = "displaysettings",
  /** File rendering */
  filerendering = "filerendering",
  /** Pixelated */
  pixelated = "pixelated",
  /** Smooth */
  smooth = "smooth",
  /** 'Pixelated' mode disables antialising of the thermogram and enables you to see its pixels as they are. */
  filerenderinghint = "filerenderinghint",
  /** Adjust time scale */
  adjusttimescale = "adjusttimescale",
  automaticrange = "automaticrange",
  fullrange = "fullrange",
  /** Adjust the time scale automatically (based on histogram) or set its values to the full range (min and max). */
  adjusttimescalehint = "adjusttimescalehint",
  /** Select colour palette of thermal display. */
  colourpalettehint = "colourpalettehint",
  /** Palette {name} */
  palettename = "palettename",
  /** File info */
  fileinfo = "fileinfo",
  /** IR file name */
  thermalfilename = "thermalfilename",
  /** IR file URL */
  thermalfileurl = "thermalfileurl",
  /** Download the IR file */
  thermalfiledownload = "thermalfiledownload",
  /** Visible file name */
  visiblefilename = "visiblefilename",
  /** Visible file URL */
  visiblefileurl = "visiblefileurl",
  /** Download visible file */
  visiblefiledownload = "visiblefiledownload",
  togglevisibleimage = "togglevisibleimage",
  /** Time */
  time = "time",
  /** Duration */
  duration = "duration",
  /** Resolution */
  resolution = "resolution",
  /** Bytesize */
  bytesize = "bytesize",
  /** Minimal temperature */
  minimaltemperature = "minimaltemperature",
  /** Maximal temperature */
  maximaltemperature = "maximaltemperature",
  /** File type */
  filetype = "filetype",
  /** Type */
  type = "type",
  /** Supported devices */
  supporteddevices = "supporteddevices",
  numfiles = "numfiles",
  download = "download",
  downloadoriginalfiles = "downloadoriginalfiles",
  downloadoriginalfileshint = "downloadoriginalfileshint",
  downloadoriginalfile = "downloadoriginalfile",
  exportcurrentframeaspng = "exportcurrentframeaspng",
  convertentiresequencetovideo = "convertentiresequencetovideo",
  pngofindividualimages = "pngofindividualimages",
  pngofindividualimageshint = "pngofindividualimageshint",
  pngofentiregroup = "pngofentiregroup",
  pngofentiregrouphint = "pngofentiregrouphint",
  csvofanalysisdata = "csvofanalysisdata",
  csvofanalysisdatahint = "csvofanalysisdatahint",
  exportimagewidth = "exportimagewidth",
  exportimagefontsize = "exportimagefontsize",
  exportgroupname = "exportgroupname",
  exportfilenames = "exportfilenames",
  numberofcolumns = "numberofcolumns",
  exportdimensions = "exportdimensions",
  exportgroup = "exportgroup",
  thermalscale = "thermalscale",
  thermalrange = "thermalrange",
  filedate = "filedate",
  folder = "folder",
  folders = "folders",
  showingfolder = "showingfolder",
  showingfolders = "showingfolders",
  and = "and",
  or = "or",
  doyouwanttoadd = "doyouwanttoadd",
  youmayalsoadd = "youmayalsoadd",
  range = "range",
  info = "info",
  note = "note",
  group = "group",
  donotgroup = "donotgroup",
  groupby = "groupby",
  groupped = "groupped",
  bydays = "bydays",
  byhours = "byhours",
  byweeks = "byweeks",
  bymonths = "bymonths",
  byyears = "byyears",
  play = "play",
  pause = "pause",
  stop = "stop",
  date = "date",
  frame = "frame",
  playbackspeed = "playbackspeed",
  graphlines = "graphlines",
  straightlines = "straightlines",
  smoothlines = "smoothlines",
  graphlineshint = "graphlineshint",
  reload = "reload",
  analysis = "analysis",
  analyses = "analyses",
  avg = "avg",
  min = "min",
  max = "max",
  size = "size",
  edit = "edit",
  editsth = "editsth",
  remove = "remove",
  addpoint = "addpoint",
  addrectangle = "addrectangle",
  addellipsis = "addellipsis",
  analysishint = "analysishint",
  graph = "graph",
  graphhint1 = "graphhint1",
  graphhint2 = "graphhint2",
  rectangle = "rectangle",
  ellipsis = "ellipsis",
  point = "point",
  name = "name",
  color = "color",
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom",
  columns = "columns",
  fromto = "fromto",
  downloadgraphdataascsv = "downloadgraphdataascsv",
  apparenttemperature = "apparenttemperature",
  airtemperature = "airtemperature",
  relativeairhumidity = "relativeairhumidity",
  windspeed = "windspeed",
  inpercent = "inpercent",
  apparenttemperatureverbose = "apparenttemperatureverbose",
  youfeelwarmer = "youfeelwarmer",
  youfeelcolder = "youfeelcolder",
  apparenttemperaturehint = "apparenttemperaturehint",
  analysissync = "analysissync",
  /** Inspect tool */
  inspecttemperatures = "inspecttemperatures",
  usemousetoinspecttemperaturevalues = "usemousetoinspecttemperaturevalues",
  /**  Edit analysis tool */
  editanalysis = "editanalysis",
  dragcornersofselectedanalysis = "dragcornersofselectedanalysis",
  /** Add point tool */
  addpointanalysis = "addpointanalysis",
  clickandaddpoint = "clickandaddpoint",
  /** Add rectangle tool */
  addrectangleanalysis = "addrectangleanalysis",
  clickandaddrectangle = "clickandaddrectangle",
  /** Add ellipsis tool */
  addellipsisanalysis = "addellipsisanalysis",
  clickandaddellipsis = "clickandaddellipsis",
  /** Tutorial */
  tutorial = "tutorial",
  /** Colour Palette */
  colourpalette = "colourpalette",
  /** Use the dropdown to change the palette */
  palettehint = "palettehint",
  remotefoldersbrowser = "remotefoldersbrowser",
  /** Server */
  server = "server",
  networklog = "networklog",
  editfile = "editfile",
  editfolder = "editfolder",
  editcomment = "editcomment",
  user = "user",
  griddisplay = "griddisplay",
  tabledisplay = "tabledisplay",
  deletefile = "deletefile",
  deletefolder = "deletefolder",
  comments = "comments",
  deletecomment = "deletecomment",
  savecomment = "savecomment",
  addcomment = "addcomment",
  nocomments = "nocomments",
  savechanges = "savechanges",
  uploadfile = "uploadfile",
  compactview = "compactview",
  showdiscussion = "showdiscussion",
  edittags = "edittags",
  assignedtags = "assignedtags",
  availabletags = "availabletags",
  connectioninformation = "connectioninformation",
  serverurl = "serverurl",
  servername = "servername",
  login = "login",
  logout = "logout",
  logoutmessage = "logoutmessage",
  loginerror = "logineerror",
  password = "password",
  accessibletologgedinusers = "accessibletologgedinusers",
  display = "display",
  content = "content",
  syncanalyses = "syncanalyses",
  overviewofyourfolders = "overviewofyourfolders",
  uploadedby = "uploadedby",
  uploadeddat = "uploadeddat",
  createfolder = "createfolder",
  subfolder = "subfolder",
  createsubfolder = "createsubfolder",
  delete = "delete",
  export = "export",
  exportcontent = "exportcontent",
  histogram = "histogram",
  timeline = "timeline",
  exportwidth = "exportwidth",
  exportmargin = "exportmargin",
  exportgap = "exportgap",
  exportgrahpheight = "exportgrahpheight",
  imagecompression = "imagecompression",
  videoquality = "videoquality",
  exportvideo = "exportvideo",
  exportpng = "exportpng",
  exportrecordingframes = "exportrecordingframes",
  exportencodingfile = "exportencodingfile",
  exportdonotclosewindowhint = "exportdonotclosewindowhint",
  theme = "theme",
  light = "light",
  dark = "dark",
  foldermayhavefiles = "foldermayhavefiles",
  foldermayhavesubfolders = "foldermayhavesubfolders"
}
//#endregion
//#region src/controllers/AbstractReactiveController.d.ts
/**
 * This is the abstract class for all reactive controllers from the `@labirthermal/webcomponents` package.
 * @module @labirthermal/webcomponents
 */
export declare abstract class AbstractReactiveController<T extends AbstractThermalElement> implements ReactiveController {
  host: T;
  /** Implement this method somehow to combine the host UUID and a unique marker of the controller. */
  abstract get UUID(): string;
  constructor(host: T);
  abstract hostConnected(): void;
  abstract hostDisconnected(): void;
  /** Logs anything using the host's logging mechanism. Adds the controller's className as the first argument. */
  protected log(...args: any[]): void;
}
//#endregion
//#region src/controllers/AbstractHierarchyController.d.ts
/**
 * Common internal state for host elements that should be only internal states.
 * @module @labirthermal/core
 * @author Jan Jáchim <jachim@zcu.cz>
 * @see {@link AbstractReactiveController}
 */
export declare const INTERNAL_STATE_DECLARATION: PropertyDeclaration;
/**
 * A declaration of the host property for the purpose of its reactive properties.
 *
 * Used in the static properties of the particular controller:
 *
 * ```ts
 *
 * export interface IElementWithMyController extends IBaseElement {
 *  aPublicProperty: string | undefined;
 * }
 *
 * export class MyController extends AbstractHierarchyController<IElementWithMyController> {
 *
 *  public static HOST_PROPERTIES: HostReactiveProperties<IElementWithMyController> = {
 *      aPublicProperty: { reflect: true, attribute: "a-public-property" }
 * }
 *
 * }
 * ```
 *
 * Once the reactive property is defined this way, it can be accessed from the outside this way:
 *
 * ```html
 * <my-element a-public-property="value"></my-element>
 * ```
 *
 */
type HostReactiveProperties<T> = { [key in keyof T]: PropertyDeclaration; };
/**
 * Abstract base class for controllers related to the hierarchy of `@labirthermal/core`.
 *
 * This type of controllers has a special way of updating depending on the lifecycle of its host element.
 *
 * In the constructor of this controller, the constructor is added to the {@link HierarchyUpdatesHub} and therefore all the updates are trigged directly by the corresponding `willUpdate` and `updated` methods of the host.
 *
 * When working with various side effects and callbacks, it is important to split operations correctly in
 * - a) `hostWillUpdateWatcher` - for setting properties/states as side effects before render
 * - b) `hostUpdatedWatcher` - for binding listeners & other stuff after the host is rendered.
 *
 */
export declare abstract class AbstractHierarchyController<T extends AbstractThermalElement> extends AbstractReactiveController<T> {
  constructor(host: T);
  /**
   * This method will be called automatically by the host element in its `willUpdate` method.
   * @see {@link AbstractThermalElement}
   */
  abstract hostWillUpdateWatcher(value: PropertyValues<T>): void;
  /**
   * This method will be called automatically by the host element in its `updated` method.
   * @see {@link AbstractThermalElement}*/
  abstract hostUpdatedWatcher(value: PropertyValues<T>): void;
  /** Retrieve the default slug from the host element, falling back to the element UUID. Should be called only in host connected. */
  protected _getDefaultSlugFromHost(primaryAttributeName: string): string;
}
//#endregion
//#region src/controllers/HierarchyUpdatesHub.d.ts
/** Perform updates in the hierarchy for all registered controllers */
export declare class HierarchyUpdatesHub {
  private _controllers;
  /** Zaregistruje controller do hubu */
  register<C extends AbstractHierarchyController<AbstractThermalElement>>(controller: C): C;
  /** Zavolá willUpdate na všech zaregistrovaných controllerech */
  willUpdate(changedProperties: PropertyValues<AbstractThermalElement>): void;
  /** Zavolá updated na všech zaregistrovaných controllerech */
  updated(changedProperties: PropertyValues<AbstractThermalElement>): void;
}
//#endregion
//#region src/hierarchy/AbstractThermalElement.d.ts
/**
 * All the webcomponents of \@labirthermal/embed (and its extensions) should be based on the abstract class `AbstractThermalElement`.
 *
 * Functionality:
 * - listens to the locale context for rerender
 * - is able to handle hierarchy controllers through the `HierarchyUpdatesHub` mechanism
 * - generates a short unique identifier (`UUID`) for each instance
 * - provides helpers such as:
 *   - `t` for translation
 *   - `i` for rendering SVG strings safely
 *   - `log` for standardized logging with tag name and UUID
 *   - `getUUID` for generating unique identifiers with a message
 *
 * @see {@link HierarchyUpdatesHub}
 *
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@ntc.zcu.cz>
 */
export declare abstract class AbstractThermalElement extends LitElement {
  private _hierarchy?;
  /**
   * Get the hierarchy for the purpose of managing updates using hierarchy controllers
   * @see {@link HierarchyUpdatesHub}
   * @internal
   */
  initHierarchy(): HierarchyUpdatesHub;
  private _UUID?;
  /**
   * A short identifier of this instance, generated lazily.
   * It is guaranteed to be unique within the current document.
   * @see {@link generateShortId}
   */
  get UUID(): string;
  getUUID(msg: string): string;
  /** A standardised way to log messages to the console prepending this webcomponent's tag name and UUID for easier identification */
  log(...args: unknown[]): void;
  static shadowRootOptions: ShadowRootInit;
  /** Consume the locale context for rerendering whenever a language changes globally. */
  private _locale?;
  /** Stable callback so the global language subscription can be removed on disconnect. */
  private readonly languageChanged;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /**
   * Renders an SVG string safely using the unsafeSVG directive
   * @see {@link unsafeSVG}
   */
  protected i(str: string): unknown;
  /**
   * Returns a translated string
   * @see {@link T}
   */
  protected t(key: keyof typeof T): string;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
}
//#endregion
//#region src/controllers/ManagerController.d.ts
interface IHostProperties$7 {
  /** Element property for the manager slug. It is absolutely required. Recommended property name: manager-slug */
  managerSlug: string;
  /** Core manager object. Exposed in managerContext. */
  managerObject: ThermalManager;
  /** Manager controoller exposed as context. Recommended property */
  managerController: ManagerController;
  /** Element property for thermal palette. Converted internally to a rich value and exposed in managerPaletteContext.Recommended property name: palette */
  palette: AvailableThermalPalette;
  /** Advances palettes property from the host element. Exposed as managerAdvancedPalettesContext. Recommended property: advanced-palettes */
  advancedPalettes: boolean;
  /** Smooth thermograms flag accessed directly from the host element. Recommended property name: smooth-thermograms */
  smoothThermograms: boolean;
  /** Smooth graph flag accessed directly from the host element. Recommended property name: smooth-graph */
  smoothGraph: boolean;
  /** Tool property accessed from the host element. Exposed in the toolContext. Recommended property name: tool */
  tool: keyof ThermalManager["tool"]["tools"];
}
interface IElementWithManagerController extends AbstractThermalElement, IHostProperties$7 {}
type ManagerPaletteContextType = {
  key: AvailableThermalPalette;
  data: ThermalPaletteType;
};
/** Exposes the main manager controller with all its setters and direct access to the host element values. */
export declare const managerControllerContext: {
  __context__: ManagerController;
};
export declare const managerContext: {
  __context__: ThermalManager;
};
export declare const managerPaletteContext: {
  __context__: ManagerPaletteContextType;
};
export declare const managerAdvancedPalettesContext: {
  __context__: boolean;
};
export declare const managerSmoothContext: {
  __context__: boolean;
};
export declare const managerGraphFunctionContext: {
  __context__: boolean;
};
export declare const managerToolContext: {
  __context__: ThermalTool;
};
export declare const managerInteractiveAnalysesContext: {
  __context__: boolean;
};
export declare class ManagerController extends AbstractHierarchyController<IElementWithManagerController> {
  private _UUID;
  get UUID(): string;
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$7>;
  /** Accessor to the manageer slug from the host */
  get slug(): string;
  private readonly managerControllerContextProvider;
  /** Accessor to the manager object from the host */
  get managerObject(): ThermalManager;
  private readonly managerObjectContextPtovider;
  /** Palette property value accessed from the host element */
  get palette(): AvailableThermalPalette;
  private readonly paletteContextProvider;
  readonly advancedPalettesContextProvider: ContextProvider<typeof managerAdvancedPalettesContext, IElementWithManagerController>;
  /** Smooth thermograms flag accessed from the host element */
  get smoothThermograms(): boolean;
  private readonly smoothThermogramsContextProvider;
  /** Tool property accessed from the host element */
  get tool(): keyof ThermalManager["tool"]["tools"];
  get toolObject(): ThermalTool;
  private readonly toolContextProvider;
  /** Graph smoothing flag accessed from the host element */
  get smoothGraph(): boolean;
  private readonly smoothGraphContextProvider;
  /** Callbacks called upon the internal registry object creation */
  readonly onInternalObject: CallbacksManager<(manager: ThermalManager) => void>;
  constructor(host: IElementWithManagerController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostUpdate(): void;
  hostWillUpdateWatcher(value: PropertyValues<IElementWithManagerController>): void;
  hostUpdatedWatcher(): void;
  /**
   * Create or get a registry by its slug from the internal manager object.
   */
  createRegistry(slug: string): ThermalRegistry;
  private _paletteStringToContextValue;
  /**
   * This is the recommended way to set the advanced palettes flag - updates the value in the context provider and the host element. All updates are performed only when the new value differs from the current one.
   */
  setAdvancedPalettes(value: boolean): void;
  /**
   * This is the recommended way to set the palette - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one.
   */
  setPalette(value: AvailableThermalPalette): void;
  /**
   * This is the recommended way to set the smooth thermograms flag - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one.
   */
  setSmoothThermograms(value: boolean): void;
  /**
   * This is the recommended way to set the tool - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one.
   */
  setTool(value: ThermalTool): void;
  private _setToolByKey;
  private _toolStringToObject;
  /**
   * This is the recommended way to set the smooth graph option - updates the value and the context provider. All updates are performed only when the new value differs from the current one.
   */
  setSmoothGraph(value: boolean): void;
}
//#endregion
//#region src/controllers/RegistryController.d.ts
type IHostProperties$6 = {
  /** This object is obligatory and it comes either from:
   * - directly from the host's `ManagerController` instance - in case this `RegistryController` is on the same element as the `ManagerController`
   * - from the `managerControllerContext` - for elements that are nested lower in the hierarchy, under an element with `ManagerController`
   */
  managerController: ManagerController;
  registrySlug: string;
  registryObject: ThermalRegistry;
  registryController: RegistryController;
  opacity: number;
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  highlight?: ThermalRangeOrUndefined;
  loading: boolean;
};
interface IElementWithRegistryController extends AbstractThermalElement, IHostProperties$6 {}
/** Exposes the current `RegistryController`. This is very important. */
export declare const registryControllerContext: {
  __context__: RegistryController;
};
/** Exposes the current `ThermalRegistry` object from the `RegistryController`. */
export declare const registryObjectContext: {
  __context__: ThermalRegistry;
};
/** Exposes the current opacity value context from the `RegistryController`. */
export declare const registryOpacityContext: {
  __context__: number;
};
/** Exposes the current range from value from the `RegistryController`. */
export declare const registryRangeFromContext: {
  __context__: number | undefined;
};
/** Exposes the current range to value from the `RegistryController`. */
export declare const registryRangeToContext: {
  __context__: number | undefined;
};
/** Exposes the current registry loading value from the `RegistryController`. */
export declare const registryLoadingContext: {
  __context__: boolean;
};
/** Exposes the current registry min context from the `RegistryController` */
export declare const registryMinContext: {
  __context__: number | undefined;
};
/** Exposes the current registry max value from the `RegistryController` */
export declare const registryMaxContext: {
  __context__: number | undefined;
};
/**
 * Highlight is an optional range of temperatures highlighted graphically on the thermal scale. It is used to indicate for example:
 * - what is the range of a file within min/max of the entire group
 * - what is the range of an analysis within the min/max of a file
 * - what is the min/max of a group of files within multiple groups of files
 *
 * This context is exposed by a registry provider. It need to be consumed manually.
 */
export declare const registryHighlightContext: {
  __context__: ThermalRangeOrUndefined;
};
export declare class RegistryController extends AbstractHierarchyController<IElementWithRegistryController> {
  private _UUID;
  get UUID(): string;
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$6>;
  get registryObject(): ThermalRegistry;
  /** Callbacks called upon the internal registry object creation */
  readonly onInternalObject: CallbacksManager<(manager: ThermalRegistry) => void>;
  get slug(): string;
  get opacity(): number;
  get min(): number | undefined;
  get max(): number | undefined;
  get from(): number | undefined;
  get to(): number | undefined;
  get loading(): boolean;
  private readonly registryControllerContextProvider;
  private readonly registryObjectContextProvider;
  private readonly opacityContextProvider;
  private readonly minContextProvider;
  private readonly maxContextProvider;
  private readonly fromContextProvider;
  private readonly toContextProvider;
  private readonly loadingContextProvider;
  private readonly highlightContextProvider;
  constructor(host: IElementWithRegistryController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostWillUpdateWatcher(value: PropertyValues<IElementWithRegistryController>): void;
  hostUpdatedWatcher(): void;
  addOrGetGroup(slug: string): ThermalGroup;
  removeGroup(group: ThermalGroup): void;
  /**
   * This is the recommended way to set the opacity. Calling this method will
   * - update the context provider element's attribute `opacity`
   * - set the internal value to `@labirthermal/core`
   * - update the context provider
   */
  setOpacity(value: number): void;
  setRange(from: number, to: number): void;
  setRangeFull(): void;
  private _rangeListener;
  private _clearRange;
  private _loadingListener;
  setHighlight(value: ThermalRangeOrUndefined): void;
}
//#endregion
//#region src/controllers/GroupController.d.ts
type IHostProperties$5 = {
  managerController: ManagerController;
  registryController: RegistryController;
  groupSlug: string;
  groupObject: ThermalGroup;
  groupController: GroupController;
  autoclearGroup: boolean;
};
/**
 * Host properties required by the `GroupController`.
 *
 * @see {@link GroupController}
 * @see {@link GroupController.HOST_PROPERTIES}
 */
interface IElementWithGroupController extends IHostProperties$5, AbstractThermalElement {}
/**
 * Exposes the `GroupController` instance to the `AbstractGroupConsumer` elements.
 * @see {@link GroupController}
 * @module @labirthermal/embed
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare const groupControllerContext: {
  __context__: GroupController;
};
/**
 * Exposes the internal `ThermalGroup` object from the `GroupController`.
 *
 * @see {@link GroupController}
 * @see {@link ThermalGroup}
 * @module @labirthermal/embed
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare const groupObjectContext: {
  __context__: ThermalGroup;
};
export declare class GroupController extends AbstractHierarchyController<IElementWithGroupController> {
  private _UUID;
  get UUID(): string;
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$5>;
  get groupObject(): ThermalGroup;
  get registryController(): RegistryController;
  get slug(): string;
  get autoclearGroup(): boolean;
  private groupControllerContextProvider;
  private groupObjectContextProvider;
  readonly onInternalObject: CallbacksManager<(manager: ThermalGroup) => void>;
  constructor(host: IElementWithGroupController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostWillUpdateWatcher(): void;
  hostUpdatedWatcher(): void;
}
//#endregion
//#region src/controllers/FileController.d.ts
type IHostProperties$4 = {
  managerController: ManagerController;
  registryController: RegistryController;
  groupController: GroupController;
  fileController: FileController;
  file?: ThermalFileInstance;
  failure?: ThermalFileFailure;
  loading: boolean;
  ms: number;
  playbackSpeed: PlaybackSpeeds;
  analysis1?: string;
  analysis2?: string;
  analysis3?: string;
  analysis4?: string;
  analysis5?: string;
  analysis6?: string;
  analysis7?: string;
  autoHighlight: boolean;
};
interface IElementWithFileController extends AbstractThermalElement, IHostProperties$4 {}
/** A crucial context for exporting the `FileController` object. */
export declare const fileControllerContext: {
  __context__: FileController;
};
/** A crucial context exposing the `ThermalFileInstance` object from `FileController`. */
export declare const fileContext: {
  __context__: ThermalFileInstance | undefined;
};
/** Expose the file error value from the `FileController`. */
export declare const fileFailureContext: {
  __context__: ThermalFileFailure | undefined;
};
/** Whether a file request is in progress; independent of readiness or an existing instance. */
export declare const fileLoadingContext: {
  __context__: boolean;
};
/**. Current file MS value exposed as context. */
export declare const fileMsContext: {
  __context__: number;
};
/** File time cursor indicvates the MS on which an arbitrary HTML may be recplaced. Undended to share across elements such as timeline ang graph. In those, the context shall be set on hover using `FileController.setFileTimeCursorPercentage()` */
export declare const fileTimeCursorContext: {
  __context__: number | undefined;
};
/** The `FileController` exposes the current file frame values as context. Current time is not possible to set by modification of this context. To change the current frame, it is necessary to use either:
 * - a) the `FileController.setMs()`
 * - b) the internal methods of `@labirthermal/core` `ThermalFileInstance["timeline"]` methods such as play, pause, setTimeRelative etc..
 */
type FileControllerCurrentFrameType = {
  index: number;
  ms: number;
  time: string;
  percentage: number;
  absolute: number;
};
export declare const fileCurrentFrameContext: {
  __context__: FileControllerCurrentFrameType | undefined;
};
/** The duration of the file is exposed from the `FileController` with the value pre-calculated for consumers */
type FileControllerDurationContextType = {
  /** The file duration in ms */
  ms: number;
  /** The file formatted duration as string */
  time: string;
};
/** Exposes the current file duration from `FileController` */
export declare const fileDurationContext: {
  __context__: FileControllerDurationContextType | undefined;
};
/** Exposes the current playing state from `FileController`.  */
export declare const filePlayingContext: {
  __context__: boolean;
};
/** Exposes the current playback speed value from `FileController`. */
export declare const filePlaybackSpeedContext: {
  __context__: 1 | 2 | 0.5 | 3 | 5 | 10 | undefined;
};
/** Exposes the current recording state from `FileController`. */
export declare const fileRecordingContext: {
  __context__: boolean;
};
/** Exposes the current may stop state from the `FileController` */
export declare const fileMayStopContext: {
  __context__: boolean;
};
/** Exposes the array of current analyses from the `FileController` */
export declare const fileAnalysisListContext: {
  __context__: AbstractAnalysis[];
};
/** The `FileController` is responsible for managing the state and interactions related to a file within the hierarchy.
 *
 * @author Jan Jáchim <jachim@zcu.cz>
 * @module @labirthermal/webcomponents
 */
export declare class FileController extends AbstractHierarchyController<IElementWithFileController> {
  private _UUID;
  get UUID(): string;
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$4>;
  get fileObject(): ThermalFileInstance | undefined;
  get failure(): ThermalFileFailure | undefined;
  get ms(): number;
  get playbackSpeed(): 1 | 2 | 0.5 | 3 | 5 | 10;
  get analysis1(): string | undefined;
  get analysis2(): string | undefined;
  get analysis3(): string | undefined;
  get analysis4(): string | undefined;
  get analysis5(): string | undefined;
  get analysis6(): string | undefined;
  get analysis7(): string | undefined;
  get autoHighlight(): boolean;
  get ready(): boolean;
  get recording(): boolean;
  get playing(): boolean;
  get mayStop(): boolean;
  get cursor(): number | undefined;
  get currentFrame(): FileControllerCurrentFrameType | undefined;
  get analyses(): AbstractAnalysis[];
  get duration(): FileControllerDurationContextType | undefined;
  readonly onLoadingStart: CallbacksManager<() => void>;
  readonly onSuccess: CallbacksManager<(instance: ThermalFileInstance) => void>;
  readonly onFailure: CallbacksManager<(error: ThermalFileFailure) => void>;
  private fileControllerContextProvider;
  private fileContextProvider;
  private fileFailureContextProvider;
  private readonly loadingContextProvider;
  private readyContextProvider;
  private fileDurationContextProvider;
  private fileCurrentFrameContextProvider;
  private fileCursorContextProvider;
  private fileMsContextProvider;
  private filePlaybackSpeedContextProvider;
  private filePlayingContextProvider;
  private fileRecordingContextProvider;
  private fileMayStopContextProvider;
  private fileAnalysesContextProvider;
  private _analysisSynchronisators;
  private _propagateHighlightCache;
  private _unpropagateHighlightCache;
  constructor(host: IElementWithFileController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostWillUpdateWatcher(value: PropertyValueMap<IElementWithFileController>): void;
  hostUpdatedWatcher(): void;
  private _propagateContexts;
  private _resetAllContexts;
  private _attached?;
  private _syncAssignment;
  private _attach;
  private _detach;
  private _bindListeners;
  private _unbindListeners;
  /**
   * This is crucial - once the instance is loaded or retrieved somewhere, all the magic happens. Existence of this method enables controller to change the instance at any time.
   */
  receiveInstance(instance: ThermalFileInstance): void;
  removeInstance(): void;
  receiveFailure(failure: ThermalFileFailure): void;
  private _propagateInstanceCurrentFrame;
  private _propagateInstanceAnalysesArray;
  setTimeCursorPercentage(percentage: number | undefined): void;
  setTimePercentage(percentage: number): void;
  play(): void;
  stop(): void;
  pause(): void;
  setMs(value: number): void;
  /** Impose this file's highlight into the registry */
  private _propagateHighlight;
  /** Remove the highlight from the registry */
  private _unpropagateHighlight;
  startLoading(): void;
  /** Publishes loading independently of whether an old file is still available. */
  private setLoading;
  private endLoading;
}
//#endregion
//#region src/controllers/FileLoadController.d.ts
type IHostProperties$3 = {
  thermal: string | undefined;
  visible: string | undefined;
};
/**
 * An element that implements `FileLoadController`
 * @see {@link FileLoadController}
 */
interface IElementWithFileLoadController extends AbstractThermalElement, IHostProperties$3 {
  fileController: FileController;
  fileLoadController: FileLoadController;
}
/**
 * When appended to an element with `FileController`, takes care of loading the file from the host attributes such as `thermal` and `visible`.
 *
 * The element using `FileLoadController` needs to implement `IElementWithFileLoadController`
 *
 * Public reactive properties of the host:
 * - `thermal`: The thermal file to be loaded.
 * - `visible`: The visibility setting for the thermal file.
 *
 * @see {@link FileLoadController.HOST_PROPERTIES}
 *
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@gmail.com>
 * */
export declare class FileLoadController extends AbstractHierarchyController<IElementWithFileLoadController> {
  private _UUID;
  get UUID(): string;
  private get group();
  private get registry();
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$3>;
  constructor(host: IElementWithFileLoadController);
  hostWillUpdateWatcher(value: PropertyValueMap<IElementWithFileLoadController>): void;
  hostUpdatedWatcher(): void;
  hostConnected(): void;
  hostDisconnected(): void;
  private _load;
}
//#endregion
//#region src/controllers/GroupListingController.d.ts
/**
 * Indicates how to order the files in a group. Used by {@link GroupListingController}
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare enum GroupOrderby {
  DATE = "date",
  LABEL = "label",
  MANUAL = "manual"
}
/**
 * Indicates how to order the files in a group. Used by {@link GroupListingController}
 * @module @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare enum GroupOrdering {
  ASC = "asc",
  DESC = "desc"
}
/** @internal */
interface GroupListingRenderOptions {
  allowFileChanges?: boolean;
  onOpenDetail?: (instance: ThermalFileInstance) => void;
  onCloseDetail?: () => void;
}
type IHostProperties$2 = {
  orderby: GroupOrderby;
  ordering: GroupOrdering;
};
interface IElementWithGroupListingController extends AbstractThermalElement, IHostProperties$2 {
  groupController: GroupController;
  fileController: FileController;
  groupListingController: GroupListingController;
}
export declare class GroupListingController extends AbstractHierarchyController<IElementWithGroupListingController> {
  private _UUID;
  get UUID(): string;
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$2>;
  private get group();
  private backup;
  get hasBackup(): boolean;
  constructor(host: IElementWithGroupListingController);
  clearBackup(): void;
  backupReadersFromInstances(instances: ThermalFileInstance[]): void;
  backupReaders(readers: ThermalFileReader[]): void;
  restoreTheEntireBackup(): Promise<void>;
  showOneAndBackup(instance: ThermalFileInstance): Promise<void>;
  static CLASS_TABLE: string;
  static CLASS_COLUMNS: string;
  static readonly styles: import("lit").CSSResult;
  private _numColumns;
  private _asTable;
  private _previewWidth;
  setPreviewWidth(width: number): void;
  setNumColumns(numColumns: number): void;
  setAsTable(asTable: boolean): void;
  renderListContainer(children: unknown): unknown;
  private _renderButton;
  renderLayoutSwitch(slot?: string): unknown;
  renderColumnsSlider(slot?: string): unknown;
  hostConnected(): void;
  hostDisconnected(): void;
  hostWillUpdateWatcher(): void;
  hostUpdatedWatcher(): void;
  private _orderFiles;
  renderList(fileRendererFn: (file: ThermalFileInstance) => unknown, emptyRendererFn?: () => unknown): unknown;
  private handleFileDropAdd;
  renderListHeader(slot?: string, options?: GroupListingRenderOptions): unknown;
  renderThumbnail(instance: ThermalFileInstance, options?: GroupListingRenderOptions): import("lit").TemplateResult<1>;
  renderDetailHeader(instance: ThermalFileInstance, slot?: string, options?: GroupListingRenderOptions): unknown;
  /** Assumes the contexts to be provided by the host element */
  renderDetailBody(): unknown;
}
//#endregion
//#region src/controllers/GroupLoadController.d.ts
type IHostProperties$1 = {
  /**
   * The string of file requests for the `GroupLoadController`. Property name is `group-files`. Reactivity is defined by `GroupLoadController.HOST_PROPERTIES`.
   *
   * - Decoding of the attribute is handled internally by `GroupLoadController.decodeAttribute`.
   * - Encoding of the the attribute can be done using `GroupLoadController.encodeAttribute`.
   *
   * How it works:
   * - The `group-files` attribute takes the encoded list of file requests.
   * - Whenever the `group-files` attribute changes, the `GroupLoadController` will load the files.
   * - Internal changes to the files ARE NOT synced to the `group-files` attribute. Meaning: any internal state changes will not be reflected to the attribute. But the attribute change will always trigger the reload.
   */
  filesString?: string;
};
/**
 * An element with `GroupLoadController` needs to implement the host properties of a `GroupController`. To implement this controller properly, the class needs to have the following:
 * @example
 * ```ts
 * class MyClass extends AbstractThermalElement implements IElementWithGroupLoadController {
 *
 *     filesString?: string;
 *
 *     groupController: GroupController; // Created here or inherited from parent context
 *     groupListingController: GroupListingController; // Created here or inherited from parent context
 *     groupLoadController = new GroupLoadController(this);
 *
 *
 * }
 * ```
 */
interface IElementWithGroupLoadController extends AbstractThermalElement, IHostProperties$1 {
  groupController: GroupController;
  groupListingController: GroupListingController;
  groupLoadController: GroupLoadController;
}
/** One file request - internal object for the purpose of `GroupLoadController` */
type GroupLoaderFileRequest = {
  thermal: string;
  visible?: string;
  label?: string;
};
/**
 * Reactive controller for loading thermal and visible files into a {@link ThermalGroup}
 * driven by the host element's `group-files` attribute.
 *
 * ### Functionality & Data Flow
 * - **Declarative & Reactive:** Watches the host property `filesString` (reflected from `group-files`).
 *   Whenever the attribute or property value changes, this controller parses the request string and loads
 *   all requested files through the registry's `FilesService`.
 * - **Unidirectional Synchronization:** Changes to the `group-files` attribute/property are propagated
 *   inward to the group's internal files collection. Subsequent runtime changes to the group (such as files
 *   added via drag-and-drop, deleted via UI, or reordered) are intentionally **NOT** reflected back to
 *   the attribute, preventing unwanted update loops.
 * - **Clearing on Empty:** If the attribute is removed or set to empty, all instances are removed from the group.
 * - **Backup & Listing Integration:** Automatically backs up file readers into the host's
 *   {@link GroupListingController} and restores them so that the group listing stays synchronized.
 *
 * ### Attribute Format (`group-files`)
 * The attribute encodes an array of file requests into a compact delimited string without requiring JSON:
 * - Records are delimited by `;` ({@link GroupLoadController.FILE_RECORD_SEPARATOR}).
 * - Key-value segments inside each record are delimited by `|` ({@link GroupLoadController.FILE_SEGMENT_SEPAROATOR}).
 * - Keys and values are separated by `~` ({@link GroupLoadController.FILE_COMPONENT_SEPAROATOR}).
 * - Recognized keys:
 *   - `thermal` (required): URL of the thermal file (`.lrc`).
 *   - `visible` (optional): URL of the corresponding visible spectrum image.
 *   - `label` (optional): Human-readable label assigned to the file instance.
 *
 * @example Format syntax
 * ```text
 * thermal~<url>[|visible~<url>][|label~<text>];thermal~<url>[|label~<text>]
 * ```
 *
 * @example Single file
 * ```html
 * <thermal-group-app group-files="thermal~./record.lrc|label~Engine"></thermal-group-app>
 * ```
 *
 * @example Multiple files with visual pairs and labels
 * ```html
 * <thermal-group-app
 *   group-files="thermal~./t1.lrc|visible~./v1.jpg|label~Pre-test;thermal~./t2.lrc|label~Post-test">
 * </thermal-group-app>
 * ```
 *
 * @example Programmatic encoding and decoding
 * ```ts
 * // Decode an attribute string to structured requests:
 * const requests = GroupLoadController.decodeAttribute("thermal~file.lrc|label~Motor");
 *
 * // Encode structured requests back into an attribute string:
 * const attrValue = GroupLoadController.encodeFileRequests([
 *   { thermal: "file1.lrc", visible: "file1.png", label: "Front" },
 *   { thermal: "file2.lrc", label: "Rear" }
 * ]);
 * host.setAttribute("group-files", attrValue!);
 * ```
 *
 * @see {@link IElementWithGroupLoadController} for host requirements.
 * @see {@link GroupListingController} for how the loaded files are displayed and ordered.
 */
export declare class GroupLoadController extends AbstractHierarchyController<IElementWithGroupLoadController> {
  private _UUID;
  get UUID(): string;
  /** Necessary reactive properties of the host element needed by `GroupLoadController` */
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties$1>;
  static readonly FILE_RECORD_SEPARATOR = ";";
  static readonly FILE_SEGMENT_SEPAROATOR = "|";
  static readonly FILE_COMPONENT_SEPAROATOR = "~";
  static readonly FILE_THERMAL_KEY = "thermal";
  static readonly FILE_VISIBLE_KEY = "visible";
  static readonly FILE_LABEL_KEY = "label";
  static readonly FILE_NOTE_KEY = "note";
  private get group();
  errors: string[];
  /** Makes sure the value is either a non-empty string or undefined. */
  private static stringOrUndefined;
  /** Encodes one attribute to a string segment. */
  private static encodeAttribute;
  /** Encodes a file request into a string suitable for the fileString attribute (publically known as `group-files`) */
  private static encodeFileRequest;
  /** Encode multiple files into a string suitable for the public attribute `group-files` of a webcomponent with `GroupLoadController` */
  encodeFileRequests(requests: GroupLoaderFileRequest[]): string | undefined;
  /** Takes a string and convert it into an array of `GroupLoaderFileRequest` that can be used by `GroupLoadController._load( requests )` */
  static decodeAttribute(value: string): GroupLoaderFileRequest[];
  constructor(host: IElementWithGroupLoadController);
  hostConnected(): void;
  hostDisconnected(): void;
  hostWillUpdateWatcher(value: PropertyValueMap<IElementWithGroupLoadController>): void;
  hostUpdatedWatcher(): void;
  private _loadFromAttributes;
  /** Loads the files  specified in the `requests` array. */
  private _load;
}
//#endregion
//#region src/controllers/GroupAnalysisSyncController.d.ts
declare const SLOT_NUMBERS: readonly [1, 2, 3, 4, 5, 6, 7];
type SlotNumber = typeof SLOT_NUMBERS[number];
type AnalysisProperty = `analysis${SlotNumber}`;
type IHostProperties = {
  groupAnalysisSyncOn: boolean;
} & Record<AnalysisProperty, string | undefined>;
interface IElementWithGroupAnalysisSyncController extends AbstractThermalElement, IHostProperties {
  groupController: GroupController;
}
export declare const groupAnalysisSyncContext: {
  __context__: boolean;
};
/**
 * Binds analysis1-analysis7 to group slots while groupAnalysisSyncOn is true.
 * Initial nonempty host values win; otherwise existing file slots are adopted.
 * Later empty values delete slots. Analyses without slots are left untouched.
 */
export declare class GroupAnalysisSyncController extends AbstractHierarchyController<IElementWithGroupAnalysisSyncController> {
  get UUID(): string;
  private static readonly ANALYSIS_PROPERTY_DECLARATION;
  static readonly HOST_PROPERTIES: HostReactiveProperties<IHostProperties>;
  private readonly _onContextProvider;
  private _group?;
  private readonly _files;
  private readonly _values;
  private readonly _fileValues;
  private _applying;
  private _changingCore;
  private _initialized;
  get on(): boolean;
  constructor(host: IElementWithGroupAnalysisSyncController);
  private _property;
  private _hostValue;
  private _setOn;
  hostConnected(): void;
  hostDisconnected(): void;
  hostWillUpdateWatcher(changed: PropertyValueMap<IElementWithGroupAnalysisSyncController>): void;
  hostUpdatedWatcher(changed: PropertyValueMap<IElementWithGroupAnalysisSyncController>): void;
  private _syncFiles;
  private _unbindFile;
  private _getFirstInstanceWithAnalyses;
  private _initialize;
  private _enableCore;
  private _applyHostValues;
  private _applySlot;
  onLoaded(): void;
  _analysesFromInstanceToGroup(instance: ThermalFileInstance): void;
  turnOnOnFirstInstanceWithAnalyses(): void;
  turnOnWithAttributeAnalyses(): void;
  turnOn(instance: ThermalFileInstance): void;
  turnOff(): void;
}
//#endregion
//#region src/controllers/ConfigController.d.ts
interface PngExportSettings {
  readonly width: number;
  readonly fontSize: number;
  readonly analyses: boolean;
  readonly thermalScale: boolean;
  readonly license: boolean;
  readonly fileName: boolean;
  readonly fileDate: boolean;
}
interface GroupExportSettings {
  readonly groupName: boolean;
  readonly columns: number;
}
interface ConfigSettings {
  readonly export: {
    readonly png: PngExportSettings;
    readonly group: GroupExportSettings;
  };
  readonly visibility: {
    readonly showAllOptions: boolean;
  };
}
/** Exposes the general configuration context for the application. Setters are here. */
export declare const configContext: {
  __context__: ConfigController;
};
/** Handles the global configuration related to the PNG exports */
export declare class ConfigController extends AbstractReactiveController<AbstractThermalElement> {
  private readonly _UUID;
  get UUID(): string;
  private _settings;
  private readonly contextProvider;
  constructor(host: AbstractThermalElement);
  hostConnected(): void;
  hostDisconnected(): void;
  get settings(): ConfigSettings;
  setPngWidth(value: number): void;
  setPngFontSize(value: number): void;
  setPngAnalyses(value: boolean): void;
  setPngThermalScale(value: boolean): void;
  setPngFileName(value: boolean): void;
  setPngFileDate(value: boolean): void;
  setPngLicense(value: boolean): void;
  setGroupColumns(value: number): void;
  setGroupGroupName(value: boolean): void;
  setShowAllOptions(value: boolean): void;
  private _setPngSetting;
  private _setGroupSetting;
  private _publish;
}
//#endregion
//#region src/translations/localeContext.d.ts
type Locales = "en" | "cs" | "fr" | "cy" | "de";
interface IWithlocale {
  locale: Locales;
}
//#endregion
//#region src/apps/AbstractApp.d.ts
export declare abstract class AbstractApp extends AbstractThermalElement implements IWithlocale {
  protected readonly configController: ConfigController;
  locale: Locales;
  label?: string;
  author?: string;
  license?: string;
  showFullscreen: boolean;
  firstUpdated(_changedProperties: PropertyValues): void;
}
//#endregion
//#region src/ui/Btn.d.ts
type BtnVariants = "primary" | "foreground" | "background" | "default" | "breadcrumb";
type BtnSizes = "sm" | "md" | "lg" | "xl";
export declare class ThermalBtnElement extends AbstractThermalElement {
  tooltipPlacement: Placement;
  pre?: string;
  variant?: BtnVariants;
  size?: BtnSizes;
  icon?: string;
  iconStyle: string;
  disabled?: string;
  interactive?: string;
  plain?: boolean;
  tooltip?: string;
  tabindex: number;
  badge?: string;
  align: string;
  private tooltipElement?;
  private arrowElement?;
  private cleanupAutoUpdate?;
  private highlightTimeout?;
  firstUpdated(): void;
  updated(changedProperties: Map<string | number | symbol, unknown>): void;
  private removeTooltip;
  private showTooltip;
  private hideTooltip;
  private handleClick;
  private handleKeydown;
  disconnectedCallback(): void;
  static styles: import("lit").CSSResult;
  private renderBadge;
  /**
   * Apply a temporary highlight animation to the button. The animation
   * will pulse the element with a gentle scale up/down effect for the
   * specified duration (milliseconds).
   */
  highlight(durationMs: number): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-btn": ThermalBtnElement;
  }
}
//#endregion
//#region src/ui/App.d.ts
export declare class ThermalAppElement extends AbstractThermalElement {
  language: string;
  private _overflowCount;
  private _overflowOpen;
  private _hasPre;
  private _hasContent;
  private _hasPreBar;
  private _hasBarHeader;
  fullscreen: string;
  showfullscreen: boolean;
  author?: string;
  recorded?: string;
  license?: string;
  label?: string;
  labelIcon?: string;
  labelIconStyle?: string;
  labelTooltip?: string;
  labelVariant: BtnVariants;
  onlabel?: () => void;
  protected headerRef: Ref<HTMLDivElement>;
  protected contentRef: Ref<HTMLDivElement>;
  protected barItemsRef: Ref<HTMLDivElement>;
  /** Owns host resize observation; not reactive and released when disconnected. */
  protected observer?: ResizeObserver;
  /** Owns toolbar resize observation; recreated after the component reconnects. */
  private _overflowObserver;
  /** Pending overflow measurement, coalesced and cancelled when disconnected. */
  private _rafId;
  /** Final slot assignments from our last measurement, used to ignore self-induced slotchange events. */
  private readonly _barSlotAssignments;
  /** Stable callback so language changes do not accumulate subscriptions on reconnect. */
  private readonly _handleLanguageChange;
  private _handleFullscreenChange;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private _toggleOverflow;
  private _setSlotFlag;
  private _onSlotChange;
  private _syncSlotFlags;
  willUpdate(changedProperties: PropertyValues): void;
  /** Ignores our own slot redistribution but measures externally changed toolbar contents. */
  private _onBarSlotChange;
  private _scheduleOverflowUpdate;
  private _doOverflowUpdate;
  toggleFullscreen(): void;
  updated(changedProperties: PropertyValues): void;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
  static styles: import("lit").CSSResult;
  private renderLabel;
  private renderCreditField;
  private renderCredits;
  private static readonly languages;
  private renderLanguageSwitcher;
  private renderFullscreenButton;
  private renderOverflowToggle;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-app": ThermalAppElement;
  }
}
//#endregion
//#region src/ui/Bar.d.ts
export declare class ThermalBarElement extends LitElement {
  static styles: import("lit").CSSResult;
  protected collapsed: boolean;
  protected lastContentWidth: number;
  protected drawerRef: Ref<HTMLDivElement>;
  protected contentRef: Ref<HTMLDivElement>;
  protected rulerContentRef: Ref<HTMLDivElement>;
  protected observer: ResizeObserver;
  connectedCallback(): void;
  protected firstUpdated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void;
  private hydrateObserver;
  disconnectedCallback(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-bar": ThermalBarElement;
  }
}
//#endregion
//#region src/ui/Dialog.d.ts
export declare class ThermalDialogElement extends LitElement {
  static shadowRootOptions: ShadowRootInit;
  button: string;
  protected dialogRef: Ref<HTMLDialogElement>;
  protected closeButtonRef: Ref<HTMLButtonElement>;
  protected invokerRef: Ref<HTMLSlotElement>;
  isFullscreen: boolean;
  label?: string;
  beforeClose?: () => Promise<boolean>;
  private _open;
  get open(): boolean;
  onCloseEveryTime?: () => void;
  setClose(): void;
  setOpen(): void;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
  connectedCallback(): void;
  static styles: import("lit").CSSResult;
  render(): import("lit").TemplateResult<1>;
  closeFromTheOutside(): Promise<void>;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-dialog": ThermalDialogElement;
  }
}
//#endregion
//#region src/ui/Dropdown.d.ts
export declare class ThermalDropdownElement extends AbstractThermalElement {
  static shadowRootOptions: ShadowRootInit;
  _options: Array<HTMLElement>;
  protected dropdownRef: Ref<HTMLDialogElement>;
  protected invokerRef: Ref<HTMLDialogElement>;
  protected optionsRef: Ref<HTMLButtonElement>;
  isOpen: string;
  interactive: "on" | "off";
  variant?: BtnVariants;
  size?: BtnSizes;
  plain?: boolean;
  tooltip?: string;
  icon?: string;
  iconStyle?: string;
  setOpen(): void;
  setClose(): void;
  toggle(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private placeOptions;
  protected updated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void;
  protected firstUpdated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void;
  attributeChangedCallback(name: string, _old: string | null, value: string | null): void;
  static styles: import("lit").CSSResult;
  render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-dropdown": ThermalDropdownElement;
  }
}
//#endregion
//#region src/ui/Dropin.d.ts
export declare class ThermalDropinElement extends AbstractThermalElement {
  prompt?: string;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-dropin": ThermalDropinElement;
  }
}
//#endregion
//#region src/ui/Expandable.d.ts
export declare class ThermalExpandableElement extends AbstractThermalElement {
  label?: string;
  closeIcon: boolean;
  variant?: BtnVariants;
  variantExpanded?: BtnVariants;
  size?: BtnSizes;
  icon?: string;
  iconStyle: string;
  disabled?: boolean;
  interactive?: boolean;
  plain?: boolean;
  tooltip?: string;
  expanded?: boolean;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-expandable": ThermalExpandableElement;
  }
}
//#endregion
//#region src/ui/Field.d.ts
export declare class ThermalFieldElement extends LitElement {
  label: string;
  hint?: string;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-field": ThermalFieldElement;
  }
}
//#endregion
//#region src/ui/Icon.d.ts
export declare class ThermalIconElement extends AbstractThermalElement {
  icon?: string;
  variant?: string;
  classes?: string;
  css?: string;
  protected element?: string;
  connectedCallback(): void;
  updated(_changedProperties: PropertyValues): void;
  protected updateIcon(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-icon": ThermalIconElement;
  }
}
//#endregion
//#region src/ui/Loading.d.ts
export declare class ThermalPosterElement extends AbstractThermalElement {
  protected loaded: boolean;
  loading: boolean;
  icon?: string;
  iconStyle?: string;
  message?: string;
  bordercolor: string;
  bgcolor: string;
  textcolor: string;
  protected updated(_changedProperties: PropertyValues): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-loading": ThermalPosterElement;
  }
}
//#endregion
//#region src/ui/Radio.d.ts
export declare class ThermalRadioElement extends AbstractThermalElement {
  type: "radio" | "checkbox";
  checked: boolean;
  onChange?: (checked: boolean) => void;
  protected handleChange(event: Event): void;
  updated(changedProperties: PropertyValues<ThermalRadioElement>): void;
  protected handleClick(event: Event): void;
  connectedCallback(): void;
  static styles: import("lit").CSSResult;
  render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-radio": ThermalRadioElement;
  }
}
//#endregion
//#region src/ui/Slot.d.ts
export declare class ThermalSlotElement extends AbstractThermalElement {
  label?: string;
  private _slottedElements;
  protected get slottedElements(): Element[];
  private handleSlotChange;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-slot": ThermalSlotElement;
  }
}
//#endregion
//#region src/ui/Spinner.d.ts
export declare class ThermalSpinnerElement extends AbstractThermalElement {
  message?: string;
  color: string;
  static shadowRootOptions: ShadowRootInit;
  static styles: import("lit").CSSResult;
  protected render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-spinner": ThermalSpinnerElement;
  }
}
//#endregion
//#region src/ui/Tip.d.ts
export declare class ThermalTipElement extends AbstractThermalElement {
  icon: string;
  iconStyle: string;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-tip": ThermalTipElement;
  }
}
//#endregion
//#region src/hierarchy/consumers/AbstractManagerConsumer.d.ts
/**
 * A webcomponent consuming a `ThermalManager` exposed by a parent `ManagerController`.
 *
 * Subscribes to the `ManagerController` that is exposed by a parent. Typically, this can be either:
 * - a top-level app extending `AbstractApp`
 * - or a `ManagerProviderElement` nested lower within the component tree.
 *
 * For particular value access, this component can consume specialised contexts such as:
 * - `managerPaletteContext` for opacity values
 * - `managerAdvancedPaletteContext` for the actual thermal scale value
 * - `managerToolContext` for the starting value of the thermal scale
 * - etc.
 *
 * Whenever the value in any consumed context changes, this component will automatically update and rerender.
 *
 * If this component needs to manipulate the values, the recommanded way to do so is to use the methods of `ManagerController`.
 *
 * @see {@link ManagerController}
 * @see {@link ThermalManager}
 *
 * @example
 * ```js
import { AbstractManagerConsumer, managerPaletteContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
class MyComponent extends AbstractManagerConsumer {

    // If the value changes in the context, this webcomponent will update
    \@consume({ context: managerToolContext, subscribe: true })
    private toolValue!: ThermalTool;

    // Set the tool value using the controller
    private setTool(value: ThermalTool) {
        this.managerController.setTool(value);
    }

    // Tool can also be set directly in the `ThermalManager`,
    // but this is not recommended.
    private setToolDirectly(value: ThermalTool) {
        this.managerObject.tool.selectTool(value);
    }

}
 * ```
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare abstract class AbstractManagerConsumer extends AbstractThermalElement {
  /** Alias to the `ThermalManager` from the `ManagerController` */
  get managerObject(): ThermalManager;
  /**
   * Inherited from the `ManagerController` context. This controller provides direct access to:
   * - the `ThermalManager` instance
   * - various methods to manipulate the manager's state
   * @see {@link ManagerController}
   * @see {@link ThermalManager}
   */
  managerController: ManagerController;
}
//#endregion
//#region src/hierarchy/consumers/AbstractRegistryConsumer.d.ts
/**
 * A webcomponent consuming a `ThermalRegistry` exposed by a parent `RegistryController`.
 *
 * Subscribes to the `RegistryController` that is exposed by a parent. Typically, this can be either:
 * - a top-level app extending `AbstractApp`
 * - or a `RegistryProviderElement` nested lower within the component tree.
 *
 * For particular value access, this component can consume specialised contexts such as:
 * - `registryOpacityContext` for opacity values
 * - `registryRangeToContext` for the actual thermal scale value
 * - `registryRangeFromContext` for the starting value of the thermal scale
 * - etc.
 *
 * Whenever the value in any consumed context changes, this component will automatically update and rerender.
 *
 * If this component needs to manipulate the values, the recommanded way to do so is to use the methods of `RegistryController`.
 *
 * @see {@link RegistryController}
 * @see {@link ThermalRegistry}
 *
 * @example
 * ```js
import { AbstractRegistryConsumer, registryOpacityContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
class MyComponent extends AbstractRegistryConsumer {

    // If the value changes in the context, this webcomponent will update
    \@consume({ context: registryOpacityContext, subscribe: true })
    private opacityValue!: number;

    // Set the opacity calue using the controller
    private setOpacityValue(value: number) {
        this.registryController.setOpacity(value);
    }

    // Opacity can also be set directly in the `ThermalRegistry`,
    // but this is not recommended.
    private setOpacityValueDirectly(value: number) {
        this.registryObject.opacity.setOpacity(value);
    }

}
 * ```
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare abstract class AbstractRegistryConsumer extends AbstractManagerConsumer {
  /** Alias to the `ThermalRegistry` from the `RegistryController` */
  get registryObject(): ThermalRegistry;
  /**
   * Inherited `RegistryController` from the context. This controller provides a direct access to:
   * - the @labirthermal/core `ThermalRegistry`
   * - the properties and methods of `RegistryController` and the host
   * @see {@link RegistryController}
   * @see {@link ThermalRegistry}
   */
  registryController: RegistryController;
}
//#endregion
//#region src/hierarchy/consumers/AbstractGroupConsumer.d.ts
/**
 * A webcomponent consuming a `ThermalGroup` exposed by a parent `GroupController`.
 *
 * Subscribes to the `GroupController` that is exposed by a parent. Typically, this can be either:
 * - a top-level app extending `AbstractApp`
 * - or a `RegistryProviderElement` nested lower within the component tree.
 *
 * @see {@link GroupController}
 * @see {@link ThermalGroup}
 *
 * @example
 * ```js
import { AbstractGroupConsumer, registryOpacityContext } from "@labirthermal/webcomponents";
import { consume } from "@lit/context";
class MyComponent extends AbstractGroupConsumer {

    // The `ThermalGroup` object does not have any value contexts
    
}
 * ```
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare abstract class AbstractGroupConsumer extends AbstractRegistryConsumer {
  /** Alias to the `ThermalGroup` object from the `groupController` */
  get groupObject(): ThermalGroup;
  /**
   * Inherited `GroupController` from the context. This controller provides a direct access to:
   * - the @labirthermal/core `ThermalGroup`
   * - the properties and methods of `GroupController` and the host
   * @see {@link GroupController}
   * @see {@link ThermalGroup}
   */
  groupController: GroupController;
}
//#endregion
//#region src/hierarchy/abstraction/AbstractFileProvider.d.ts
export declare abstract class AbstractFileProvider extends AbstractGroupConsumer implements IElementWithFileController {
  static properties: {
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    fileController: import("lit").PropertyDeclaration<unknown, unknown>;
    file?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    failure?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
    ms: import("lit").PropertyDeclaration<unknown, unknown>;
    playbackSpeed: import("lit").PropertyDeclaration<unknown, unknown>;
    analysis1?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis2?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis3?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis4?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis5?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis6?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis7?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    autoHighlight: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  fileController: FileController;
  file?: ThermalFileInstance;
  failure?: ThermalFileFailure;
  /** Loading is managed and published by FileController, independently of file presence. */
  loading: boolean;
  protected ready: boolean;
  ms: number;
  playbackSpeed: PlaybackSpeeds;
  recording: boolean;
  playing: boolean;
  /** List of all analyses taken from the `ThermalFileInstance.analysis.layers.all` */
  analyses: AbstractAnalysis[];
  analysis1?: string;
  analysis2?: string;
  analysis3?: string;
  analysis4?: string;
  analysis5?: string;
  analysis6?: string;
  analysis7?: string;
  autoHighlight: boolean;
  /** Register instance callback listeners. @deprecated */
  recieveInstance(instance: ThermalFileInstance): void;
  /** @deprecated */
  removeInstance(): void;
  deleteFile(): void;
  protected render(): unknown;
}
//#endregion
//#region src/hierarchy/abstraction/AbstractGroupProvider.d.ts
export declare abstract class AbstractGroupProvider extends AbstractRegistryConsumer implements IElementWithGroupController {
  static properties: {
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    groupObject: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    autoclearGroup: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  groupSlug: string;
  groupController: GroupController;
  groupObject: ThermalGroup;
  autoclearGroup: boolean;
  protected render(): unknown;
}
//#endregion
//#region src/hierarchy/abstraction/AbstractManagerProvider.d.ts
export declare abstract class AbstractManagerProvider extends AbstractThermalElement implements IElementWithManagerController {
  static properties: {
    managerSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    managerObject: import("lit").PropertyDeclaration<unknown, unknown>;
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    palette: import("lit").PropertyDeclaration<unknown, unknown>;
    advancedPalettes: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothThermograms: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothGraph: import("lit").PropertyDeclaration<unknown, unknown>;
    tool: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  managerSlug: string;
  managerObject: ThermalManager;
  managerController: ManagerController;
  palette: AvailableThermalPalette;
  advancedPalettes: boolean;
  smoothThermograms: boolean;
  smoothGraph: boolean;
  tool: keyof ThermalManager["tool"]["tools"];
  autoclear: boolean;
  disconnectedCallback(): void;
  protected render(): unknown;
}
//#endregion
//#region src/hierarchy/abstraction/AbstractRegistryProvider.d.ts
export declare abstract class AbstractRegistryProvider extends AbstractManagerConsumer implements IElementWithRegistryController {
  static properties: {
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registrySlug: import("lit").PropertyDeclaration<unknown, unknown>;
    registryObject: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    opacity: import("lit").PropertyDeclaration<unknown, unknown>;
    min?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    max?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    from?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    to?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    highlight?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  registrySlug: string;
  registryObject: ThermalRegistry;
  registryController: RegistryController;
  opacity: number;
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  loading: boolean;
  autoclear: boolean;
  highlight: ThermalRangeOrUndefined;
  disconnectedCallback(): void;
  protected render(): unknown;
}
//#endregion
//#region src/hierarchy/consumers/AbstractFileConsumer.d.ts
/**
 * Abstract base class for web components that consume a file `ThermalFileInstance` and
 * related state from a parent `FileController`.
 *
 * The controller is typically provided by an ancestor application or file
 * provider. This class consumes the controller, current instance, loading and
 * recording states, and load failures. Subclasses can consume additional
 * contexts such as `fileMsContext` and `fileDurationContext` when needed.
 * Changes to subscribed contexts trigger reactive updates in the consuming
 * element.
 *
 * Use `FileController` methods for file operations such as changing the
 * playback position rather than modifying the instance directly.
 *
 * @see {@link AbstractGroupConsumer}
 * @see {@link FileController}
 * @see {@link ThermalFileInstance}
 *
 * @example
 * ```ts
 * import { consume } from "@lit/context";
 * import { AbstractFileConsumer, fileMsContext } from "@labirthermal/webcomponents";
 *
 * class MyComponent extends AbstractFileConsumer {
 *     @consume({ context: fileMsContext, subscribe: true })
 *     protected msValue!: number;
 *
 *     protected seekTo(percentage: number): void {
 *         this.fileController.setTimePercentage(percentage);
 *     }
 * }
 * ```
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare abstract class AbstractFileConsumer extends AbstractGroupConsumer {
  fileController: FileController;
  /**
   * Returns a stable callback key unique to this consumer.
   *
   * @returns The consumer's UUID with an internal-callback suffix.
   */
  getUUID(): string;
  /** Consume the `FileController` context indicating whether the file is currently being loaded. */
  protected fileIsLoading: boolean;
  /** Consume the `FileController` context providing the actual file instance. */
  file?: ThermalFileInstance;
  /** Consume the `FileController` context providing the failure information if the file loading fails. */
  protected failure?: ThermalFileFailure;
  /** Consume the `FileController` context indicating whether the file is currently being recorded. */
  protected fileIsRecording: boolean;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** Internal method binding the default callbacks to the parent `FileController`. */
  private hookCallbacks;
  /**
   * Handles a file instance after the parent `FileController` has loaded it
   * successfully.
   *
   * @param instance The successfully loaded file instance.
   */
  abstract onInstanceCreated(instance: ThermalFileInstance): void;
  /**
   * Handles a failure reported by the parent `FileController` while loading
   * a file.
   *
   * @param error Details of the file-loading failure.
   */
  abstract onFailure(error: ThermalFileFailure): void;
}
//#endregion
//#region src/controls/independent/AppInfoButton.d.ts
export declare class AppInfoButton extends AbstractThermalElement {
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
//#endregion
//#region src/controls/independent/DisplayPanel.d.ts
export declare class DisplayPanel extends AbstractThermalElement {
  static styles?: CSSResultGroup | undefined;
  advancedPalettes: boolean;
  managerController: ManagerController;
  protected render(): unknown;
}
//#endregion
//#region src/controls/independent/ConfigDialog.d.ts
export declare class ConfigDialog extends AbstractThermalElement {
  protected render(): unknown;
}
//#endregion
//#region src/hierarchy/providers/FileCopy.d.ts
/**
 * This element creates a completely isolated hierarchy tree for the given original file. The file is copied and all contexts are exposed independently of the original context.
 *
 * This element therefore implements all the hierarchy controllers, because the context is completely isolated from the parent:
 * - `ManagerController` and `ThermalManager`
 * - `RegistryController` and `ThermalRegistry`
 * - `GroupController` and `ThermalGroup`
 * - `FileController` and `ThermalFileInstance`
 *
 * @tag file-copy
 *
 * @param originalFile The original file instance to be copied.
 * @param withAnalyses Whether to copy the analyses from the original file.
 *
 * Initialisation of this element does not require any specification of slugs - they will be automatically generated from the original file.
 *
 * Whenever this element is disconnected, all the internal context is removed for good.
 *
 * @example
 * <file-copy .originalFile="path/to/original/file">
 *  <file-canvas></file-canvas>
 * </file-copy>
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 *
 */
export declare class FileCopyElement extends AbstractThermalElement implements IElementWithManagerController, IElementWithRegistryController, IElementWithGroupController, IElementWithFileController {
  static properties: {
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    fileController: import("lit").PropertyDeclaration<unknown, unknown>;
    file?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    failure?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
    ms: import("lit").PropertyDeclaration<unknown, unknown>;
    playbackSpeed: import("lit").PropertyDeclaration<unknown, unknown>;
    analysis1?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis2?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis3?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis4?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis5?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis6?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis7?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    autoHighlight: import("lit").PropertyDeclaration<unknown, unknown>;
    groupSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    groupObject: import("lit").PropertyDeclaration<unknown, unknown>;
    autoclearGroup: import("lit").PropertyDeclaration<unknown, unknown>;
    registrySlug: import("lit").PropertyDeclaration<unknown, unknown>;
    registryObject: import("lit").PropertyDeclaration<unknown, unknown>;
    opacity: import("lit").PropertyDeclaration<unknown, unknown>;
    min?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    max?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    from?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    to?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    highlight?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    managerSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    managerObject: import("lit").PropertyDeclaration<unknown, unknown>;
    palette: import("lit").PropertyDeclaration<unknown, unknown>;
    advancedPalettes: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothThermograms: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothGraph: import("lit").PropertyDeclaration<unknown, unknown>;
    tool: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  originalFile: ThermalFileInstance;
  /** Mirror the analyses of the original file to the copy. Changing the value at runtime copies or clears the analyses. */
  withAnalyses: boolean;
  managerSlug: string;
  managerObject: ThermalManager;
  managerController: ManagerController;
  palette: AvailableThermalPalette;
  advancedPalettes: boolean;
  smoothThermograms: boolean;
  smoothGraph: boolean;
  tool: string;
  registrySlug: string;
  registryObject: ThermalRegistry;
  registryController: RegistryController;
  opacity: number;
  min?: number | undefined;
  max?: number | undefined;
  from?: number | undefined;
  to?: number | undefined;
  highlight?: ThermalRangeOrUndefined;
  loading: boolean;
  groupSlug: string;
  groupObject: ThermalGroup;
  groupController: GroupController;
  autoclearGroup: boolean;
  fileController: FileController;
  file?: ThermalFileInstance | undefined;
  failure?: ThermalFileFailure | undefined;
  ms: number;
  playbackSpeed: PlaybackSpeeds;
  analysis1?: string | undefined;
  analysis2?: string | undefined;
  analysis3?: string | undefined;
  analysis4?: string | undefined;
  analysis5?: string | undefined;
  analysis6?: string | undefined;
  analysis7?: string | undefined;
  autoHighlight: boolean;
  private _canRenderChildren;
  private _slugBase;
  private getSlugManager;
  private getSlugRegistry;
  private getSlugGroup;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** Take the current analyses of the original file. The file controller propagates them to the copied file. */
  copyAnalysesFromParent(): void;
  /** Remove all analyses from the copied file. */
  clearAnalyses(): void;
  updated(_changedProperties: PropertyValues<FileCopyElement>): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-copy": FileCopyElement;
  }
}
//#endregion
//#region src/hierarchy/providers/FileProvider.d.ts
/**
 * A webcomponent providing the file that is specified by its URL's.
 *
 * Exterior attributes are:
 * - `thermal`: the thermal file URL
 * - `visible`: the visible file URL
 * These are specified by the `FileLoadController` that is implemented here.
 *
 * All the standard contexts of `FileController` are being handled by the `AbstractFileProvider`.
 *
 * @tag file-provider
 *
 * @param thermal The URL of the thermal file.
 * @param visible The URL of the visible file.
 *
 * @example
 * <file-provider thermal="path/to/thermal/file" visible="path/to/visible/file">
 *  <file-canvas></file-canvas>
 * </file-provider>
 *
 * @module \@labirthermal/webcomponents
 * @author Jan Jáchim <jachim@zcu.cz>
 */
export declare class FileProviderElement extends AbstractFileProvider implements IElementWithFileLoadController {
  static properties: {
    thermal: import("lit").PropertyDeclaration<unknown, unknown>;
    visible: import("lit").PropertyDeclaration<unknown, unknown>;
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    fileController: import("lit").PropertyDeclaration<unknown, unknown>;
    file?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    failure?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
    ms: import("lit").PropertyDeclaration<unknown, unknown>;
    playbackSpeed: import("lit").PropertyDeclaration<unknown, unknown>;
    analysis1?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis2?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis3?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis4?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis5?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis6?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis7?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    autoHighlight: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  fileLoadController: FileLoadController;
  thermal: string | undefined;
  visible: string | undefined;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-provider": FileProviderElement;
  }
}
//#endregion
//#region src/hierarchy/providers/GroupProvider.d.ts
export declare class GroupProviderElement extends AbstractGroupProvider {}
declare global {
  interface HTMLElementTagNameMap {
    "group-provider": GroupProviderElement;
  }
}
//#endregion
//#region src/hierarchy/providers/ManagerProvider.d.ts
export declare class ManagerProviderElement extends AbstractManagerProvider {}
declare global {
  interface HTMLElementTagNameMap {
    "manager-provider": ManagerProviderElement;
  }
}
//#endregion
//#region src/hierarchy/providers/RegistryProvider.d.ts
export declare class RegistryProviderElement extends AbstractRegistryProvider {}
declare global {
  interface HTMLElementTagNameMap {
    "registry-provider": RegistryProviderElement;
  }
}
//#endregion
//#region src/controls/manager/ManagerExportPanel.d.ts
export declare class ManagerExportPanel extends AbstractThermalElement {
  protected configController?: ConfigController;
  protected renderRow(label: string, content: ReturnType<typeof html>, hint?: ReturnType<typeof html> | string): import("lit").TemplateResult<1>;
  protected renderGroup(label: string, content: ReturnType<typeof html>): import("lit").TemplateResult<1>;
  protected formatTip(value?: ReturnType<typeof html> | string): import("lit").TemplateResult<1> | "";
  protected renderCheckbox(key: string, label: string, value: boolean, onChange: (value: boolean) => void): import("lit").TemplateResult<1>;
  protected renderSlider(key: string, label: string, value: number, unit: string, min: number, max: number, step: number, onChange: (value: number) => void, hint?: ReturnType<typeof html> | string): import("lit").TemplateResult<1>;
  static styles?: CSSResultGroup | undefined;
  updated(_changedProperties: PropertyValues): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-export-panel": ManagerExportPanel;
  }
}
//#endregion
//#region src/controls/manager/ManagerGraphSmoothSwitch.d.ts
export declare class ManagerGraphSmoothSwitch extends AbstractManagerConsumer {
  smooth: boolean;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-graph-smooth-switch": ManagerGraphSmoothSwitch;
  }
}
//#endregion
//#region src/controls/manager/ManagerImageSmoothSwitch.d.ts
export declare class ManagerImageSmoothSwitch extends AbstractManagerConsumer {
  smooth: boolean;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-image-smooth-switch": ManagerImageSmoothSwitch;
  }
}
//#endregion
//#region src/controls/manager/AbstractPaletteSwitch.d.ts
declare abstract class AbstractPaletteSwitch extends AbstractManagerConsumer {
  protected static BASIC_PALETTES: string[];
  protected advancedPalettesContext: boolean;
  advancedPalettesProperty?: boolean;
  protected palettes: ThermalPaletteType[];
  protected value: ManagerPaletteContextType;
  willUpdate(changedProperties: PropertyValues): void;
  /** Handle user input events */
  protected onSelect(palette: AvailableThermalPalette): void;
}
//#endregion
//#region src/controls/manager/ManagerPaletteButtons.d.ts
export declare class ManagerPaletteButtons extends AbstractPaletteSwitch {
  static styles: import("lit").CSSResult;
  private paletteTemplate;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-palette-buttons": ManagerPaletteButtons;
  }
}
//#endregion
//#region src/controls/manager/ManagerPaletteDropdown.d.ts
export declare class ManagerPaletteDropdown extends AbstractPaletteSwitch {
  static styles: import("lit").CSSResult;
  protected paletteTemplate(palette: ThermalPaletteType): import("lit").TemplateResult<1>;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-palette-dropdown": ManagerPaletteDropdown;
  }
}
//#endregion
//#region src/controls/manager/ManagerToolsBar.d.ts
/**
 * A standard toolbar that is either horizontal or vertical.
 */
export declare class ManagerToolBar extends AbstractManagerConsumer {
  protected value: ThermalTool;
  /** Handle user input events */
  protected onSelect(tool: ThermalTool): void;
  static styles: import("lit").CSSResult;
  protected renderTool(key: string, tool: ThermalTool): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-tool-bar": ManagerToolBar;
  }
}
//#endregion
//#region src/controls/registry/RegistryRangeForm.d.ts
/**
 * Form control for editing a thermal registry's active range. It keeps its
 * inputs synchronized with registry range data and provides range presets,
 * bounded stepping, and rounding.
 *
 * @see AbstractRegistryConsumer
 * @see RegistryController
 */
export declare class RegistryRangeForm extends AbstractRegistryConsumer {
  /**
   * Whether to arrange the form controls in a stacked layout. Reflected to
   * the `stacked` attribute; defaults to `false`.
   */
  stacked: boolean;
  /** The registry minimum, or `undefined` until bounds are available. */
  protected min: number | undefined;
  /** The registry maximum, or `undefined` until bounds are available. */
  protected max: number | undefined;
  /** The active range's lower endpoint, or `undefined` before synchronization. */
  protected from: number | undefined;
  /** The active range's upper endpoint, or `undefined` before synchronization. */
  protected to: number | undefined;
  /** The increment used by the endpoint step controls; defaults to `1`. */
  protected step: number;
  /** Step sizes offered by the endpoint controls; defaults to `[0.01, 0.1, 0.5, 1, 5, 10]`. */
  protected availableSteps: number[];
  /** Input text for each endpoint; both values default to empty strings. */
  protected inputValues: {
    from: string;
    to: string;
  };
  /** Whether a registry range is being applied; defaults to `false`. */
  protected isUpdatingFromRegistry: boolean;
  /** Timer used to debounce endpoint input updates; initially `undefined`. */
  private debounceTimer;
  /** The latest automatic range, or `undefined` until one is available. */
  protected autoValue: ThermalRangeOrUndefined;
  /** Registry currently observed by this form, initially unset. */
  private subscribedRegistry?;
  /** Whether the automatic-range control is active; defaults to `false`. */
  private autoRangeHovered;
  connectedCallback(): void;
  willUpdate(changedProperties: PropertyValues<this>): void;
  disconnectedCallback(): void;
  /**
   * Synchronizes local form state with the current registry and subscribes to
   * its range updates.
   */
  private hydrate;
  /**
   * Removes this form's listeners from the subscribed registry and clears the
   * subscription reference.
   */
  private dehydrate;
  /**
   * Updates the displayed registry bounds and clears range inputs when bounds
   * are unavailable.
   *
   * @param value The registry's current minimum and maximum, or `undefined`
   * when unavailable.
   */
  private recieveMinmax;
  /**
   * Synchronizes the form's range values and input text with the registry.
   *
   * @param value The registry's active range, or `undefined` when no range is set.
   */
  private recieveRange;
  /**
   * Stores the latest automatic range and refreshes its highlight when hovered.
   *
   * @param value The registry's current automatic range, or `undefined` when
   * unavailable.
   */
  private recieveAutoValue;
  /**
   * Highlights the registry's full bounds while the full-range control is
   * hovered or focused.
   */
  private handleFullRangeMouseEnter;
  /** Applies the registry's full minimum-to-maximum range. */
  private handleFullRangeClick;
  /** Highlights the automatic range while its control is hovered or focused. */
  private handleAutoRangeMouseEnter;
  /** Applies the registry's automatically calculated range. */
  private handleAutoRangeClick;
  /** Clears the automatic-range hover state and removes the registry highlight. */
  private handleHighlightMouseLeave;
  /**
   * Updates the lower endpoint and imposes the resulting range on the registry
   * when both endpoints are available.
   *
   * @param value The new lower endpoint.
   */
  private updateFrom;
  /**
   * Updates the upper endpoint and imposes the resulting range on the registry
   * when both endpoints are available.
   *
   * @param value The new upper endpoint.
   */
  private updateTo;
  /**
   * Debounces input edits, validates the parsed value, and applies it to the
   * selected endpoint.
   *
   * @param type The endpoint being edited.
   * @param value The current text entered by the user.
   */
  private debouncedUpdate;
  /**
   * Checks whether a lower-endpoint value is within the known minimum and
   * upper endpoint.
   *
   * @param value The candidate lower endpoint.
   * @returns `true` if the value is valid; otherwise, `false`.
   */
  private isValidFromValue;
  /**
   * Checks whether an upper-endpoint value is within the known lower endpoint
   * and maximum.
   *
   * @param value The candidate upper endpoint.
   * @returns `true` if the value is valid; otherwise, `false`.
   */
  private isValidToValue;
  /**
   * Determines whether the lower endpoint can move one configured step in the
   * given direction.
   *
   * @param direction The direction in which to step.
   * @returns `true` if the stepped value is valid; otherwise, `false`.
   */
  private canStepFrom;
  /**
   * Determines whether the upper endpoint can move one configured step in the
   * given direction.
   *
   * @param direction The direction in which to step.
   * @returns `true` if the stepped value is valid; otherwise, `false`.
   */
  private canStepTo;
  /**
   * Checks whether the registry minimum can replace the current lower endpoint.
   *
   * @returns `true` if the minimum can be applied; otherwise, `false`.
   */
  private canSetMin;
  /**
   * Checks whether the registry maximum can replace the current upper endpoint.
   *
   * @returns `true` if the maximum can be applied; otherwise, `false`.
   */
  private canSetMax;
  /**
   * Moves the lower endpoint by one configured step and applies the rounded
   * value when valid.
   *
   * @param direction The direction in which to move the endpoint.
   */
  private stepFrom;
  /**
   * Moves the upper endpoint by one configured step and applies the rounded
   * value when valid.
   *
   * @param direction The direction in which to move the endpoint.
   */
  private stepTo;
  /** Sets the lower endpoint to the registry minimum when the range permits it. */
  private setMinValue;
  /** Sets the upper endpoint to the registry maximum when the range permits it. */
  private setMaxValue;
  /**
   * Sets the increment used when stepping range endpoints.
   *
   * @param newStep The step size to use.
   */
  private setStep;
  /**
   * Rounds the selected range endpoint to the nearest valid integer and applies it.
   *
   * @param type The endpoint to round.
   */
  private roundToNearestInteger;
  /**
   * Returns step sizes that can move at least one current endpoint in either
   * direction.
   *
   * @returns The available step sizes.
   */
  private getAvailableSteps;
  /**
   * Checks whether a defined value is an integer.
   *
   * @param value The value to check.
   * @returns `true` if the value is an integer; otherwise, `false`.
   */
  private isWholeNumber;
  /**
   * Parses endpoint input and clamps it to the currently valid range, falling
   * back to the current value when input is empty or invalid.
   *
   * @param inputValue The text entered in the endpoint input.
   * @param type The endpoint being validated.
   * @returns The parsed, clamped value, or the current endpoint value.
   */
  private getClosestValidValue;
  /**
   * Normalizes an endpoint input on blur and applies the corrected value to
   * the registry.
   *
   * @param type The endpoint whose input lost focus.
   * @param inputValue The input text to normalize.
   */
  private handleInputBlur;
  /** Styles the range inputs, step controls, and range preset buttons. */
  static styles?: CSSResultGroup | undefined;
  /**
   * Renders one range endpoint input with its step controls and interaction
   * handlers.
   *
   * @param type The endpoint represented by the input.
   * @param before Optional content rendered before the input controls.
   * @param after Optional content rendered after the input controls.
   * @returns The Lit template for the endpoint input.
   */
  protected renderInput(type: 'from' | 'to', before?: unknown, after?: unknown): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-range-form": RegistryRangeForm;
  }
}
//#endregion
//#region src/controls/registry/RegistryTicksBar.d.ts
type TickType = {
  percentage: number;
  value: number;
};
export declare class RegistryTicksBar extends AbstractRegistryConsumer {
  static TICK_WIDTH: number;
  static TICK_FIXED: number;
  protected ticksRef: Ref<HTMLDivElement>;
  /** Owns DOM size observation; not reactive because the observer itself is not rendered. */
  protected observer?: ResizeObserver;
  /** Actual subscription target, retained to remove listeners even after the provided registry changes. */
  private boundRegistry?;
  /** Actual observed DOM node, retained for cleanup and observer restoration after reconnecting. */
  private observedTicks?;
  private ticksWidth;
  protected highlight?: ThermalRangeOrUndefined;
  placement: string;
  protected minmax: ThermalMinmaxOrUndefined;
  protected ticks: TickType[];
  protected containerRef: Ref<HTMLElement>;
  connectedCallback(): void;
  disconnectedCallback(): void;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  /** Subscribes once to the current registry while connected, replacing the previous range listener. */
  private bindRegistry;
  /** Removes the listener from the actual subscribed registry rather than the current context value. */
  private unbindRegistry;
  /** Observes the rendered ticks container and restores observation after reconnecting. */
  private observeTicks;
  /** Releases observation without requiring the old node to remain in the Lit ref. */
  private disconnectObserver;
  protected clamp(input: number, min: number, max: number): number;
  protected map(current: number, in_min: number, in_max: number, out_min: number, out_max: number): number;
  protected calculateTicks(minmax: ThermalMinmaxOrUndefined, width: number): void;
  protected calculateOneTick(minmax: ThermalMinmaxOrUndefined, percent: number): TickType | undefined;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-ticks-bar": RegistryTicksBar;
  }
}
//#endregion
//#region src/controls/registry/RegistryRangeSlider.d.ts
export declare class RegistryRangeSlider extends AbstractRegistryConsumer {
  height: string | null;
  private heightStyle;
  min?: number;
  max?: number;
  from?: number;
  to?: number;
  protected palette?: ManagerPaletteContextType;
  protected loading: boolean;
  private draft?;
  private activeHandle;
  private drag?;
  protected getClassName(): string;
  disconnectedCallback(): void;
  willUpdate(changed: PropertyValues): void;
  private get values();
  private percent;
  private constrain;
  private commit;
  private cancelDrag;
  private pointerDown;
  private pointerMove;
  private pointerUp;
  private pointerCancel;
  private keyDown;
  private wheel;
  private renderHandle;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-range-slider": RegistryRangeSlider;
  }
}
//#endregion
//#region src/controls/registry/RegistryHistogram.d.ts
export declare class RegistryHistogram extends AbstractRegistryConsumer {
  protected histogram: ThermalRegistry["histogram"]["value"];
  height: string;
  heightExpanded: string;
  expandable: boolean;
  protected expanded: boolean;
  protected loading: boolean;
  protected error: boolean;
  protected getClassName(): string;
  connectedCallback(): void;
  protected firstUpdated(_changedProperties: PropertyValueMap<this> | Map<PropertyKey, unknown>): void;
  disconnectedCallback(): void;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-histogram": RegistryHistogram;
  }
}
//#endregion
//#region src/controls/registry/RegistryRangeFullButton.d.ts
export declare class RegistryRangeFullButton extends AbstractRegistryConsumer {
  protected buttonRef: Ref<HTMLElement>;
  private value?;
  connectedCallback(): void;
  private setValue;
  doAction(): void;
  mouseenter(): void;
  mouseleave(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-range-full-button": RegistryRangeFullButton;
  }
}
//#endregion
//#region src/controls/registry/RegistryRangeAutoButton.d.ts
export declare class RegistryRangeAutoButton extends AbstractRegistryConsumer {
  private value?;
  connectedCallback(): void;
  private setValue;
  doAction(): void;
  private onHighlight;
  private onOut;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-range-auto-button": RegistryRangeAutoButton;
  }
}
//#endregion
//#region src/controls/registry/RegistryRangeDisplay.d.ts
export declare class RegistryRangeDisplay extends AbstractRegistryConsumer {
  protected from?: number;
  protected to?: number;
  fixed: number;
  separator: string;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-range-display": RegistryRangeDisplay;
  }
}
//#endregion
//#region src/controls/registry/RegistryOpacitySlider.d.ts
export declare class RegistryOpacitySlider extends AbstractRegistryConsumer {
  value: number;
  protected containerRef: Ref<HTMLElement>;
  /** Handle user input events */
  handleUserChangeEvent(event: {
    target: {
      value: string;
    };
  }): void;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "registry-opacity-slider": RegistryOpacitySlider;
  }
}
//#endregion
//#region src/controls/group/GroupChartElement.d.ts
export declare class GroupChartElement extends AbstractGroupConsumer {
  protected instances: ThermalFileInstance[];
  protected timeout?: NodeJS.Timeout;
  protected data: [string[], ...[Date, ...number[]][]] | undefined;
  protected colors?: string[];
  protected on: boolean;
  protected firstUpdated(_changedProperties: PropertyValues): void;
  static styles?: CSSResultGroup | undefined;
  download(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-chart": GroupChartElement;
  }
}
//#endregion
//#region src/controls/group/GroupAnalysisSyncButton.d.ts
export declare class GroupAnalysisSyncButton extends AbstractGroupConsumer {
  on: boolean;
  connectedCallback(): void;
  turnOn(): void;
  turnOff(): void;
  toggle(): void;
  static styles?: CSSResultGroup | undefined;
  render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-analysis-sync-button": GroupAnalysisSyncButton;
  }
}
//#endregion
//#region src/controls/group/GroupDownloadDropdown.d.ts
export declare class GroupDownloadDropdown extends AbstractGroupConsumer {
  static styles?: CSSResultGroup | undefined;
  private configController?;
  icon?: string;
  iconStyle?: string;
  variant?: string;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-download-dropdown": GroupDownloadDropdown;
  }
}
//#endregion
//#region src/controls/group/GroupDownloadButtons.d.ts
export declare class GroupDownloadButtons extends AbstractGroupConsumer {
  label?: string;
  protected configController?: ConfigController;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-download-buttons": GroupDownloadButtons;
  }
}
//#endregion
//#region src/controls/group/AbstractGroupDropin.d.ts
declare abstract class AbstractGroupDropin extends AbstractGroupConsumer {
  ip?: string;
  onDrop?: (instances: AbstractFileResult$1[]) => Promise<void>;
  connectedCallback(): void;
  private _getUserInfo;
  emitMultipleUpload(fileNames?: string[] | undefined): void;
  protected emitSingleUpload(fileName: string, fileSize: number): void;
}
//#endregion
//#region src/controls/group/GroupDropinElement.d.ts
export declare class GroupDropinElement extends AbstractGroupDropin {
  protected container: Ref<HTMLVideoElement>;
  protected hover: boolean;
  protected uploading: boolean;
  protected firstUpdated(_changedProperties: PropertyValues): void;
  static styles: import("lit").CSSResult;
  render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-dropin-element": GroupDropinElement;
  }
}
//#endregion
//#region src/controls/group/GroupDropinInput.d.ts
export declare class GroupDropinInputElement extends AbstractGroupDropin {
  icon?: string;
  iconStyle?: string;
  tooltip?: string;
  variant?: string;
  protected container: Ref<HTMLVideoElement>;
  protected hover: boolean;
  protected uploading: boolean;
  listener?: DropinElementListener;
  static styles: import("lit").CSSResult;
  protected firstUpdated(_changedProperties: PropertyValues): void;
  render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-dropin-input": GroupDropinInputElement;
  }
}
//#endregion
//#region src/controls/group/GroupRangePropagator.d.ts
export declare class GroupRangePropagatorElement extends AbstractGroupConsumer {
  static styles: import("lit").CSSResultGroup | undefined;
  private value?;
  connectedCallback(): void;
  private setValue;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-range-propagator": GroupRangePropagatorElement;
  }
}
//#endregion
//#region src/utils/timelineTicks.d.ts
declare enum TICK {
  MINOR = "minor",
  MAJOR = "major",
  BOUND = "bound"
}
type Tick = {
  ms: number;
  percent: number;
  type: TICK;
  label: string;
};
//#endregion
//#region src/controls/group/GroupTimeline.d.ts
export declare class GroupTimelineElement extends AbstractGroupConsumer {
  static TICK_WIDTH: number;
  static TICK_POINTER_HEIGHT: number;
  longestDurationInMs?: number;
  ms: number;
  pointerMs?: number;
  playing: boolean;
  instances: ThermalFileInstance[];
  has: boolean;
  ticks: Tick[];
  protected timelineRef: Ref<HTMLDivElement>;
  protected indicatorRef: Ref<HTMLDivElement>;
  listener?: ReturnType<typeof setTimeout>;
  connectedCallback(): void;
  updated(_changedProperties: PropertyValues): void;
  protected onRegistryBatchEnded(results: (ThermalFileInstance | ThermalFileFailure)[]): void;
  protected calculateTicks(width: number, duration: number): void;
  protected forEveryAffectedInstance(fn: (instance: ThermalFileInstance) => void): void;
  protected percentToMs(percent: number): number | undefined;
  protected msToPercent(ms: number): number | undefined;
  protected getValueFromEvent(event: MouseEvent): {
    ms: number | undefined;
    percent: number;
  };
  protected handlePlayButtonClick(): void;
  protected handleTimelineClick(event: MouseEvent): void;
  protected handleTimelineEnter(event: MouseEvent): void;
  protected handleTimelineMove(event: MouseEvent): void;
  protected handleTimelineLeave(): void;
  static styles?: CSSResultGroup | undefined;
  protected getTimelineElement(): HTMLDivElement | null;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "group-timeline": GroupTimelineElement;
  }
}
//#endregion
//#region src/controls/file/FileCanvas.d.ts
/**
 * The component rendering the file canvas through `@labirthermal/core` functionality.
 *
 * Extends `AbstractFileConsumer`, therefore needs to be in a webcomponent providing the necessary contexts.
 *
 * @package @labirthermal/webcomponents
 * @author Jan Jáchim <jachim@ntc.zcu.cz>
 */
export declare class FileCanvasElement extends AbstractFileConsumer {
  /** Dedicated core-owned mount target; must not contain any Lit-managed child parts. */
  container: Ref<HTMLDivElement>;
  /** Actual DOM-mounted instance, retained for cleanup even before a pending file update completes. Not reactive. */
  private mountedInstance?;
  /** Indicates whether the component prefers to use GPU for rendering... */
  prefersGpu: boolean;
  onInstanceCreated(): void;
  onFailure(): void;
  connectedCallback(): void;
  updated(_changedProperties: PropertyValues<FileCanvasElement>): void;
  /** Releases the actual mount rather than a possibly newer file context value. */
  private unmountInstance;
  disconnectedCallback(): void;
  static readonly styles: import("lit").CSSResult;
  private renderPlaceholder;
  private renderError;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-canvas": FileCanvasElement;
  }
}
//#endregion
//#region src/controls/file/FileVideoExportButton.d.ts
export declare class FileVideoExportButton extends AbstractFileConsumer {
  variant?: BtnVariants;
  size?: BtnSizes;
  icon?: string;
  iconStyle?: string;
  plain?: boolean;
  tooltip?: string;
  label: string;
  pre?: string;
  private dialogRef;
  private panelRef?;
  protected slug: string;
  protected isOpen: boolean;
  onInstanceCreated(): void;
  onFailure(): void;
  renderDialog(): unknown;
  private renderVideoExportButton;
  private renderCurrentFrameExportButton;
  renderTriggerButton(): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-video-export-button": FileVideoExportButton;
  }
}
//#endregion
//#region src/controls/file/FilePlaybackSpeedDropdown.d.ts
export declare class FilePlaybackSpeedDropdown extends AbstractFileConsumer {
  enabled: "on" | "off";
  protected playbackSpeed: PlaybackSpeeds;
  onInstanceCreated(): void;
  onFailure(): void;
  protected handleEntryClick(event: MouseEvent, key: string): void;
  protected renderEntry(key: string): unknown;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-playback-speed-dropdown": FilePlaybackSpeedDropdown;
  }
}
//#endregion
//#region src/controls/file/FileDownloadDropdown.d.ts
export declare class FileDownloadButton extends AbstractFileConsumer {
  protected configController?: ConfigController;
  protected hasGraphs: boolean;
  variant?: string;
  icon?: string;
  iconStyle?: string;
  protected recordingGraphRef: Ref<ThermalDialogElement>;
  protected dropdownRef: Ref<ThermalDropdownElement>;
  onInstanceCreated(instance: ThermalFileInstance): void;
  onFailure(): void;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-download-dropdown": FileDownloadButton;
  }
}
//#endregion
//#region src/controls/file/buttons/AbstractFileButton.d.ts
declare abstract class AbstractFileButton extends AbstractFileConsumer {
  variant?: BtnVariants;
  size?: BtnSizes;
  icon?: string;
  iconStyle?: string;
  plain?: boolean;
  protected abstract tooltip?: string;
  protected ref: import("lit/directives/ref.js").Ref<HTMLElement>;
  abstract getDefaultLabel(): string;
  abstract enter(): void;
  abstract action(): void;
  abstract leave(): void;
  onFailure(): void;
  private isWithinButton;
  private handleMouseOver;
  private handleMouseOut;
  private handleFocusIn;
  private handleFocusOut;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
//#endregion
//#region src/controls/file/buttons/FileButton.d.ts
export declare class FileButtonElement extends AbstractFileButton {
  tooltip: undefined;
  label: string;
  onEnter?: (instance: ThermalFileInstance) => void;
  onLeave?: (instance: ThermalFileInstance) => void;
  onAction?: (instance: ThermalFileInstance) => void;
  onInstanceCreated(): void;
  enter(): void;
  leave(): void;
  action(): void;
  getDefaultLabel(): string;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-button": FileButtonElement;
  }
}
//#endregion
//#region src/controls/file/buttons/FileDropdown.d.ts
export declare class FileDropdown extends AbstractThermalElement {
  label?: string;
  protected expanded: boolean;
  protected toggle(): void;
  protected expand(): void;
  protected collapse(): void;
  updated(_changedProperties: PropertyValues): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-dropdown-elt": FileDropdown;
  }
}
//#endregion
//#region src/controls/file/buttons/FileLrcButton.d.ts
export declare class FileLrcButton extends AbstractFileButton {
  tooltip: undefined;
  onInstanceCreated(): void;
  enter(): void;
  leave(): void;
  action(): void;
  getDefaultLabel(): string;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-download-lrc": FileLrcButton;
  }
}
//#endregion
//#region src/controls/file/buttons/FilePngButton.d.ts
export declare class FilePngButton extends AbstractFileButton {
  tooltip: undefined;
  protected configController?: ConfigController;
  onInstanceCreated(): void;
  enter(): void;
  leave(): void;
  action(): void;
  getDefaultLabel(): string;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-download-png": FilePngButton;
  }
}
//#endregion
//#region src/controls/file/buttons/FileRangePropagator.d.ts
export declare class FileRangePropagator extends AbstractFileButton {
  protected tooltip: string;
  hideLabel: boolean;
  onInstanceCreated(file: ThermalFileInstance): void;
  enter(): void;
  leave(): void;
  action(): void;
  getDefaultLabel(): string;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-range-propagator": FileRangePropagator;
  }
}
//#endregion
//#region src/controls/file/analysis/AnalysisTableOptions.d.ts
type AnalysisTableMode = "full" | "compact";
//#endregion
//#region src/controls/file/analysis/FileAnalysisComplex.d.ts
export declare class FileAnalysisComplexElement extends AbstractFileConsumer {
  tableMode: AnalysisTableMode;
  forceinteractiveanalysis: boolean;
  graphActivationEnabled: boolean;
  protected mayHaveGraph: boolean;
  protected hasAnalysis: boolean;
  protected isDrawingAnalysis: boolean;
  protected hasGraph: boolean;
  protected graphRef: Ref<HTMLDivElement>;
  protected graphWidth: number;
  protected graphHeight: number;
  protected observer?: ResizeObserver;
  private boundFile?;
  private readonly watchedAnalyses;
  private listenerLayer?;
  private observedGraph?;
  showhint: boolean;
  connectedCallback(): void;
  disconnectedCallback(): void;
  onInstanceCreated(): void;
  onFailure(): void;
  /** Derives render state from the current file without registering listeners. */
  private refreshFileState;
  /** Binds the current file and its existing analyses, replacing subscriptions to the previous file. */
  protected hydrate(): void;
  /** Keeps graph subscriptions and the pointer listener aligned with the current analysis list. */
  private syncAnalyses;
  /** Observes graph activation once per analysis; rendering state is refreshed by external events. */
  protected watchAnalysis(analysis: AbstractAnalysis): void;
  private pointerUpListener;
  /** Removes file, analysis and pointer listeners from the actual subscribed objects. */
  protected dehydrate(): void;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  /** Observes the rendered graph container, including after reconnecting or replacing the DOM node. */
  private observeGraph;
  /** Releases the observer even when Lit has already cleared the graph reference. */
  private disconnectObserver;
  protected renderButtons(): import("lit").TemplateResult<1>;
  protected renderCurrentTooltip(): import("lit").TemplateResult<1>;
  protected renderAddAnalysis(): import("lit").TemplateResult<1>;
  protected renderGraph(): import("lit").TemplateResult<1> | typeof nothing;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-analysis-complex": FileAnalysisComplexElement;
  }
}
//#endregion
//#region src/controls/file/analysis/FileAnalysisDisplay.d.ts
/** Display the analysis state for the purpose of exporting. */
export declare class FileAnalysisDisplayElement extends AbstractFileConsumer {
  protected container: Ref<HTMLDivElement>;
  protected analysis: AbstractAnalysis[];
  private boundFile?;
  onFailure(): void;
  onInstanceCreated(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  /**
   * Observes analysis-list and frame changes on the current file while connected.
   * Removes previous subscriptions and avoids registering twice for the same file.
   */
  private bindFile;
  /** Removes both listeners from the actual subscribed file when replacing it or disconnecting. */
  private unbindFile;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
  private renderAnalysisRow;
  private renderAnalysisRowTemperatureCell;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-analysis-display": FileAnalysisDisplayElement;
  }
}
//#endregion
//#region src/controls/file/analysis/FileAnalysisEdit.d.ts
/** Trigger the edit dialog for an analysis */
export declare class FileAnalisisEditDialog extends AbstractThermalElement {
  analysis: AbstractAnalysis;
  protected name?: string;
  protected type?: string;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-analysis-edit": FileAnalisisEditDialog;
  }
}
//#endregion
//#region src/controls/file/analysis/chart/loader.d.ts
/** Types that can be converted to `DataTable`. */
type DataTableLike = unknown[][] | {
  cols: unknown[];
  rows?: unknown[][];
} | google.visualization.DataTable;
//#endregion
//#region src/controls/file/analysis/chart/chart.d.ts
/**
 * `google-chart` encapsulates Google Charts as a web component, allowing you to
 * easily visualize data. From simple line charts to complex hierarchical tree
 * maps, the chart element provides a number of ready-to-use chart types.
 *
 * ```html
 * <google-chart
 *     type='pie'
 *     options='{"title": "Distribution of days in 2001Q1"}'
 *     cols='[{"label":"Month", "type":"string"}, {"label":"Days",
 *         "type":"number"}]' rows='[["Jan", 31],["Feb", 28],["Mar", 31]]'>
 *   </google-chart>
 * ```
 *
 * Note: if you're passing JSON as attributes, single quotes are necessary to be
 * valid JSON. See
 * https://www.polymer-project.org/1.0/docs/devguide/properties#configuring-object-and-array-properties.
 *
 * Height and width are specified as style attributes:
 * ```css
 * google-chart {
 *   height: 300px;
 *   width: 50em;
 * }
 * ```
 *
 * Data can be provided in one of three ways:
 *
 * - Via the `cols` and `rows` attributes:
 *   ```
 *   cols='[{"label":"Mth", "type":"string"},{"label":"Days", "type":"number"}]'
 *   rows='[["Jan", 31],["Feb", 28],["Mar", 31]]'
 *   ```
 *
 * - Via the `data` attribute, passing in the data directly:
 *   ```
 *   data='[["Month", "Days"], ["Jan", 31], ["Feb", 28], ["Mar", 31]]'
 *   ```
 *
 * - Via the `data` attribute, passing in the URL to a resource containing the
 *   data, in JSON format:
 *   ```
 *   data='http://example.com/chart-data.json'
 *   ```
 *
 * - Via the `data` attribute, passing in a Google DataTable object:
 *   ```
 *   data='{{dataTable}}'
 *   ```
 *
 * - Via the `view` attribute, passing in a Google DataView object:
 *   ```
 *   view='{{dataView}}'
 *   ```
 *
 * You can display the charts in locales other than "en" by setting the `lang`
 * attribute on the `html` tag of your document:
 * ```
 * <html lang="ja">
 * ```
 *
 * @demo demo/index.html
 */
export declare class ThermalChartElement extends LitElement {
  /** @nocollapse */
  static styles: import("lit").CSSResult;
  /**
   * Fired after a chart type is rendered and ready for interaction.
   *
   * @event google-chart-ready
   * @param {{chart: !Object}} detail The raw chart object.
   */
  /**
   * Fired when the user makes a selection in the chart.
   *
   * @event google-chart-select
   * @param {{chart: !Object}} detail The raw chart object.
   */
  /**
   * Type of the chart.
   *
   * Should be one of:
   * - `area`
   * - `(md-)bar`
   * - `bubble`
   * - `calendar`
   * - `candlestick`
   * - `column`
   * - `combo`
   * - `gantt`
   * - `gauge`
   * - `geo`
   * - `histogram`
   * - `(md-)line`
   * - `org`
   * - `pie`
   * - `sankey`
   * - `(md-)scatter`
   * - `stepped-area`
   * - `table`
   * - `timeline`
   * - `treemap`
   * - `wordtree`
   *
   * See <a
   * href="https://google-developers.appspot.com/chart/interactive/docs/gallery">Google
   * Visualization API reference (Chart Gallery)</a> for details.
   */
  type: string;
  /**
   * Enumerates the chart events that should be fired.
   *
   * Charts support a variety of events. By default, this element only
   * fires on `ready` and `select`. If you would like to be notified of
   * other chart events, use this property to list them.
   * Events `ready` and `select` are always fired.
   *
   * Changes to this property are _not_ observed. Events are attached only
   * at chart construction time.
   */
  events: string[];
  /**
   * Sets the options for the chart.
   *
   * Example:
   * ```
   * {
   *   title: "Chart title goes here",
   *   hAxis: {title: "Categories"},
   *   vAxis: {title: "Values", minValue: 0, maxValue: 2},
   *   legend: "none"
   * }
   * ```
   * See <a
   * href="https://google-developers.appspot.com/chart/interactive/docs/gallery">Google
   * Visualization API reference (Chart Gallery)</a> for the options available
   * to each chart type.
   *
   * Setting this property always redraws the chart. If you would like to make
   * changes to a sub-property, be sure to reassign the property:
   * ```
   * const options = googleChart.options;
   * options.vAxis.logScale = true;
   * googleChart.options = options;
   * ```
   * (Note: Missing parent properties are not automatically created.)
   */
  options: object | undefined;
  /**
   * Sets the data columns for this object.
   *
   * When specifying data with `cols` you must also specify `rows`, and
   * not specify `data`.
   *
   * Example:
   * <pre>[{label: "Categories", type: "string"},
   *  {label: "Value", type: "number"}]</pre>
   * See <a
   * href="https://google-developers.appspot.com/chart/interactive/docs/reference#DataTable_addColumn">Google
   * Visualization API reference (addColumn)</a> for column definition format.
   */
  cols: unknown[] | undefined;
  /**
   * Sets the data rows for this object.
   *
   * When specifying data with `rows` you must also specify `cols`, and
   * not specify `data`.
   *
   * Example:
   * <pre>[["Category 1", 1.0],
   *  ["Category 2", 1.1]]</pre>
   * See <a
   * href="https://google-developers.appspot.com/chart/interactive/docs/reference#addrow">Google
   * Visualization API reference (addRow)</a> for row format.
   */
  rows: unknown[][] | undefined;
  /**
   * Sets the entire dataset for this object.
   * Can be used to provide the data directly, or to provide a URL from
   * which to request the data.
   *
   * The data format can be a two-dimensional array or the DataTable format
   * expected by Google Charts.
   * See <a
   * href="https://google-developers.appspot.com/chart/interactive/docs/reference#DataTable">Google
   * Visualization API reference (DataTable constructor)</a> for data table
   * format details.
   *
   * When specifying data with `data` you must not specify `cols` or `rows`.
   *
   * Example:
   * ```
   * [["Categories", "Value"],
   *  ["Category 1", 1.0],
   *  ["Category 2", 1.1]]
   * ```
   */
  data: DataTableLike | string | undefined;
  /**
   * Sets the entire dataset for this object to a Google DataView.
   *
   * See <a
   * href="https://google-developers.appspot.com/chart/interactive/docs/reference#dataview-class">Google
   * Visualization API reference (DataView)</a> for details.
   *
   * When specifying data with `view` you must not specify `data`, `cols` or
   * `rows`.
   */
  view: google.visualization.DataView | undefined;
  /**
   * Selected datapoint(s) in the chart.
   *
   * An array of objects, each with a numeric row and/or column property.
   * `row` and `column` are the zero-based row or column number of an item
   * in the data table to select.
   *
   * To select a whole column, set row to null;
   * to select a whole row, set column to null.
   *
   * Example:
   * ```
   * [{row:0,column:1}, {row:1, column:null}]
   * ```
   */
  selection: google.visualization.ChartSelection[] | undefined;
  onGraphClick?: (relativeTimeMs: number) => void;
  onGraphHover?: (percentage: number | undefined) => void;
  /**
   * Whether the chart is currently rendered.
   * @export
   */
  drawn: boolean;
  /**
   * Internal data displayed on the chart.
   */
  _data: google.visualization.DataTable | google.visualization.DataView | undefined;
  /**
   * Internal chart object.
   */
  chartWrapper: google.visualization.ChartWrapper | null;
  private redrawTimeoutId;
  protected chartRef: Ref<HTMLDivElement>;
  protected render(): import("lit").TemplateResult<1>;
  private getGraphLayout;
  private isGraphVisualizationPoint;
  private handleGraphPointerMove;
  private handleGraphClickEvent;
  private handleGraphPointerLeave;
  getRef(): HTMLDivElement | undefined;
  readonly onWrapper: CallbacksManager<(wrapper: google.visualisation.ChartWrapper) => void>;
  left: number;
  top: number;
  w: number;
  h: number;
  visualisation?: google.visualisation;
  protected firstUpdated(): void;
  protected updated(changedProperties: Map<string, unknown>): void;
  /** Reacts to chart type change. */
  private typeChanged;
  /**
   * Adds listeners to propagate events from the chart.
   */
  private propagateEvents;
  /** Sets the selectiton on the chart. */
  private selectionChanged;
  /**
   * Redraws the chart.
   *
   * Called automatically when data/type/selection attributes change.
   * Call manually to handle view updates, page resizes, etc.
   */
  redraw(): void;
  /**
   * Returns the chart serialized as an image URI.
   *
   * Call this after the chart is drawn (`google-chart-ready` event).
   */
  get imageURI(): string | null;
  /** Handles changes to the `view` attribute. */
  private viewChanged;
  /** Handles changes to the rows & columns attributes. */
  private rowsOrColumnsChanged;
  /**
   * Handles changes to the `data` attribute.
   */
  private dataChanged;
  /**
   * Queries global document head for Google Charts `link#load-css-*` and clones
   * them into the local root's `div#styles` element for shadow dom support.
   */
  private localizeGlobalStylesheets;
}
declare global {
  interface HTMLElementTagNameMap {
    'thermal-chart': ThermalChartElement;
  }
}
//#endregion
//#region src/controls/file/analysis/FileAnalysisGraph.d.ts
/** High level component around `thermal-chart` that provides the functionality of a file analysis graph */
export declare class FileAnalysisGraphElement extends AbstractFileConsumer {
  protected hydrated: boolean;
  graphWidth: number;
  graphHeight: number;
  hasDownloads: boolean;
  standalone: boolean;
  container: Ref<HTMLDivElement>;
  graphRef: Ref<ThermalChartElement>;
  protected graphs: AnalysisDataStateValue;
  private chartDataSource?;
  private chartDataCache?;
  private chartOptionsCache?;
  private chartOptionsCacheKey?;
  private boundFile?;
  private observer?;
  private observedContainer?;
  private readonly receiveGraphData;
  protected currentFrame?: FileControllerCurrentFrameType;
  protected cursor: typeof fileTimeCursorContext["__context__"];
  protected shadowLeft: number;
  protected shadowTop: number;
  protected shadowWidth: number;
  protected shadowHeight: number;
  protected graphSmooth: boolean;
  onInstanceCreated(instance: ThermalFileInstance): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  onFailure(): void;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  private bindFile;
  private unbindFile;
  private observeContainer;
  private disconnectObserver;
  private readonly syncChartArea;
  protected downloadSVG: (svgEl: SVGElement, fileName: string) => void;
  protected downloadPNG: (svgEl: SVGElement, fileName: string) => void;
  private getChartData;
  private getChartOptions;
  private getDurationAxisTicks;
  private escapeHtml;
  private handleGraphClick;
  private handleGraphHover;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
  private renderDownloads;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-analysis-graph": FileAnalysisGraphElement;
  }
}
//#endregion
//#region src/controls/file/analysis/FileAnalysisRow.d.ts
export declare class FileAnalysisRowElement extends AbstractThermalElement {
  analysis?: AbstractAnalysis;
  tableMode: AnalysisTableMode;
  interactiveanalysis: boolean;
  editEnabled?: boolean;
  graphActivationEnabled: boolean;
  showRangePropagator: boolean;
  protected selected: boolean;
  private registryController;
  /** Actual subscription target, retained so old listeners can be removed after analysis changes. Not reactive. */
  private boundAnalysis?;
  /** Tracks pointer presence to preserve highlighting while focus moves within the row. Not reactive. */
  private hovered;
  /** Tracks focus presence to preserve highlighting while the pointer leaves the row. Not reactive. */
  private focused;
  protected get allowsEdit(): boolean;
  private readonly refresh;
  willUpdate(changedProperties: PropertyValues): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  /** Replaces subscriptions to the previous analysis and refreshes the row when a new binding is established. */
  private bindAnalysis;
  /** Removes all subscriptions from the actual bound analysis, not necessarily the current property value. */
  private unbindAnalysis;
  private isWithinRow;
  private get range();
  private highlightAnalysis;
  private readonly handleMouseOver;
  private readonly handleMouseOut;
  private readonly handleFocusIn;
  private readonly handleFocusOut;
  static styles: import("lit").CSSResult;
  private renderActions;
  private renderName;
  private renderValue;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-analysis-table-row": FileAnalysisRowElement;
  }
}
//#endregion
//#region src/controls/file/analysis/FileAnalysisTable.d.ts
export declare class FileAnalysisTableElement extends AbstractFileConsumer {
  tableMode: AnalysisTableMode;
  showRangePropagator?: boolean;
  selectionEnabled?: boolean;
  editEnabled?: boolean;
  graphActivationEnabled: boolean;
  interactiveanalysis: boolean;
  forceinteractiveanalysis: boolean;
  protected analysis: AbstractAnalysis[];
  private boundFile?;
  private readonly selectionChanged;
  protected get interactive(): boolean;
  protected get allowsSelection(): boolean;
  protected get allowsEdit(): boolean;
  protected get showsRangePropagator(): boolean;
  private get allSelected();
  onInstanceCreated(): void;
  onFailure(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  updated(changedProperties: PropertyValues): void;
  /**
   * Subscribes to selection changes on the current file.
   * Avoids duplicate subscriptions and replaces any listener attached to a previous file.
   */
  private bindFile;
  /** Removes this component's selection listener from the file it is currently bound to. */
  private unbindFile;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-analysis-table": FileAnalysisTableElement;
  }
}
//#endregion
//#region src/controls/file/analysis/edit/analysisColorDropdown.d.ts
/**
 * Render the dropdown for color selection of an analysis. Property `analysis` needs to be passed down from the parent component
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */
export declare class AnalysisColorDropdown extends AbstractThermalElement {
  analysis: AbstractAnalysis;
  protected color?: string;
  willUpdate(_changedProperties: PropertyValues): void;
  updated(_changedProperties: PropertyValues): void;
  static styles?: CSSResultGroup | undefined;
  protected renderColor(value: string): import("lit").TemplateResult<1>;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "analysis-color": AnalysisColorDropdown;
  }
}
//#endregion
//#region src/controls/file/analysis/edit/analysisNameInput.d.ts
/**
 * Render the input for editing the analysis name. Property `analysis` needs to be passed down from the parent component
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */
export declare class AnalysisNameInput extends AbstractThermalElement {
  analysis: AbstractAnalysis;
  protected name?: string;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "analysis-name": AnalysisNameInput;
  }
}
//#endregion
//#region src/controls/file/analysis/edit/editAreaTable.d.ts
/**
 * The full table and form for editing an area analysis properties. Enables editing of name, color and dimensions (top, left, width, height, right, bottom). Property `analysis` needs to be passed down from the parent component
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */
export declare class AreaEditTable extends AbstractThermalElement {
  analysis: AbstractAreaAnalysis;
  protected color?: string;
  protected top?: number;
  protected left?: number;
  protected width?: number;
  protected height?: number;
  protected type?: string;
  protected right?: number;
  protected bottom?: number;
  protected maxX?: number;
  protected maxY?: number;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  protected handleInput(event: InputEvent, callback: (value: number) => void): void;
  static styles: import("lit").CSSResult;
  protected render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "edit-area": AreaEditTable;
  }
}
//#endregion
//#region src/controls/file/analysis/edit/editPointTable.d.ts
/**
 * The full table and form for editing a point analysis properties. Enables editing of name, color and coordinates (top, left). Property `analysis` needs to be passed down from the parent component
 * @package \@labirthermal/embed
 * @author Jan Jáchim
 */
export declare class EditpointTable extends AbstractThermalElement {
  analysis: PointAnalysis;
  protected top?: number;
  protected left?: number;
  protected maxX: number;
  protected maxY: number;
  topInputRef: Ref<HTMLInputElement>;
  leftInputRef: Ref<HTMLInputElement>;
  willUpdate(changedProperties: PropertyValues): void;
  updated(changedProperties: PropertyValues): void;
  handleInput(event: InputEvent, callback: (value: number) => void): void;
  static styles: import("lit").CSSResult;
  protected render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "edit-point": EditpointTable;
  }
}
//#endregion
//#region src/utils/iife.d.ts
type ComponentsCatalog = Record<string, CustomElementConstructor>;
/**
 * Registers and defines all custom elements from a provided list
 *
 * @module @labirthermal/webcomponents
 *
 */
export declare const defineAllWebcomponents: (name: string, version: string, catalog: ComponentsCatalog) => void;
/**
 * Registers a custom element and defines it right away.
 *
 * @module @labirthermal/webcomponents
 */
export declare const defineWebcomponent: (name: string, version: string, tag: string, cls: CustomElementConstructor) => void;
//#endregion
//#region src/apps/AustralianApparentTemperature.d.ts
declare enum VUNIT {
  mps = "mps",
  kph = "kph"
}
declare class AatAppElement extends AbstractThermalElement implements IWithlocale {
  tRef: Ref<HTMLInputElement>;
  vRef: Ref<HTMLInputElement>;
  vunitsRef: Ref<HTMLSelectElement>;
  haRef: Ref<HTMLInputElement>;
  /** Air temperature in degree celsius */
  temperature?: number;
  /** Wind speed in m/s */
  v?: number;
  /** Air humidity in percent */
  ha?: number;
  /** Result apparent temperature */
  protected ta?: number;
  vunits: VUNIT;
  locale: Locales;
  protected kphToMps(kph: number): number;
  protected calculateE(h: number, t: number): number;
  protected calculateTa(t: number, e: number, v: number): number;
  protected firstUpdated(_changedProperties: PropertyValues): void;
  protected processValueChange(_changedProperties: PropertyValues<AatAppElement>, key: keyof AatAppElement): void;
  protected recalculateVa(): void;
  protected shouldUpdate(_changedProperties: PropertyValues<AatAppElement>): boolean;
  willUpdate(_changedProperties: PropertyValues<AatAppElement>): void;
  static styles?: CSSResultGroup | undefined;
  protected renderNumberField(inputRef: Ref<HTMLInputElement>, id: "temperature" | "v" | "ha", label: string, unit: string | ReturnType<typeof html> | typeof nothing, value?: number, min?: number, max?: number, step?: number, hint?: string): import("lit").TemplateResult<1>;
  protected renderResult(apparentTemperature: number, temperature: number): import("lit").TemplateResult<1>;
  protected render(): import("lit").TemplateResult<1>;
}
//#endregion
//#region src/apps/ThermalDropinApp.d.ts
declare enum Mode {
  INPUT = "input",
  LIST = "list",
  DETAIL = "detail"
}
declare class DropinAppElement extends AbstractApp implements IWithlocale, IElementWithManagerController, IElementWithRegistryController, IElementWithGroupController, IElementWithFileController, IElementWithGroupListingController {
  static properties: {
    orderby: import("lit").PropertyDeclaration<unknown, unknown>;
    ordering: import("lit").PropertyDeclaration<unknown, unknown>;
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    fileController: import("lit").PropertyDeclaration<unknown, unknown>;
    file?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    failure?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
    ms: import("lit").PropertyDeclaration<unknown, unknown>;
    playbackSpeed: import("lit").PropertyDeclaration<unknown, unknown>;
    analysis1?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis2?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis3?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis4?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis5?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis6?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis7?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    autoHighlight: import("lit").PropertyDeclaration<unknown, unknown>;
    groupSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    groupObject: import("lit").PropertyDeclaration<unknown, unknown>;
    autoclearGroup: import("lit").PropertyDeclaration<unknown, unknown>;
    registrySlug: import("lit").PropertyDeclaration<unknown, unknown>;
    registryObject: import("lit").PropertyDeclaration<unknown, unknown>;
    opacity: import("lit").PropertyDeclaration<unknown, unknown>;
    min?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    max?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    from?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    to?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    highlight?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    managerSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    managerObject: import("lit").PropertyDeclaration<unknown, unknown>;
    palette: import("lit").PropertyDeclaration<unknown, unknown>;
    advancedPalettes: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothThermograms: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothGraph: import("lit").PropertyDeclaration<unknown, unknown>;
    tool: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  managerSlug: string;
  managerObject: ThermalManager;
  palette: AvailableThermalPalette;
  advancedPalettes: boolean;
  smoothThermograms: boolean;
  smoothGraph: boolean;
  tool: string;
  managerController: ManagerController;
  registrySlug: string;
  registryObject: ThermalRegistry;
  opacity: number;
  min?: number | undefined;
  max?: number | undefined;
  from?: number | undefined;
  to?: number | undefined;
  highlight?: ThermalRangeOrUndefined;
  loading: boolean;
  registryController: RegistryController;
  groupSlug: string;
  groupObject: ThermalGroup;
  autoclearGroup: boolean;
  groupController: GroupController;
  file?: ThermalFileInstance | undefined;
  failure?: ThermalFileFailure | undefined;
  ms: number;
  playbackSpeed: PlaybackSpeeds;
  analysis1?: string | undefined;
  analysis2?: string | undefined;
  analysis3?: string | undefined;
  analysis4?: string | undefined;
  analysis5?: string | undefined;
  analysis6?: string | undefined;
  analysis7?: string | undefined;
  autoHighlight: boolean;
  fileController: FileController;
  orderby: GroupOrderby;
  ordering: GroupOrdering;
  groupListingController: GroupListingController;
  displayMode: Mode;
  get manager(): ThermalManager;
  protected ip?: string;
  toDisplay: ThermalFileInstance[];
  locale: Locales;
  connectedCallback(): void;
  willUpdate(_changedProperties: PropertyValues<DropinAppElement>): void;
  /**
   * Postprocess the registry and reset its range to apply min and max values.
   */
  private postLoadedProcessingAndApplyMinmax;
  private onValueChangeTimeout;
  protected handleClear(): void;
  static styles: import("lit").CSSResult;
  handleDropAndClear(results: AbstractFileResult[]): Promise<void>;
  protected renderIntroScene(): import("lit").TemplateResult<1>;
  protected renderLayout(children: unknown): import("lit").TemplateResult<1>;
  protected renderHeader(): unknown[];
  protected renderContent(): void;
  protected renderDetail(): import("lit").TemplateResult<1>;
  renderList(): import("lit").TemplateResult<1>;
  protected renderAuto(): import("lit").TemplateResult<1>;
  protected render(): unknown;
}
//#endregion
//#region src/apps/ThermalFileApp.d.ts
declare class ThermalFileAppElement extends AbstractApp implements IElementWithManagerController, IElementWithRegistryController, IElementWithGroupController, IElementWithFileController, IElementWithFileLoadController {
  static properties: {
    thermal: import("lit").PropertyDeclaration<unknown, unknown>;
    visible: import("lit").PropertyDeclaration<unknown, unknown>;
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    fileController: import("lit").PropertyDeclaration<unknown, unknown>;
    file?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    failure?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
    ms: import("lit").PropertyDeclaration<unknown, unknown>;
    playbackSpeed: import("lit").PropertyDeclaration<unknown, unknown>;
    analysis1?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis2?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis3?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis4?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis5?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis6?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis7?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    autoHighlight: import("lit").PropertyDeclaration<unknown, unknown>;
    groupSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    groupObject: import("lit").PropertyDeclaration<unknown, unknown>;
    autoclearGroup: import("lit").PropertyDeclaration<unknown, unknown>;
    registrySlug: import("lit").PropertyDeclaration<unknown, unknown>;
    registryObject: import("lit").PropertyDeclaration<unknown, unknown>;
    opacity: import("lit").PropertyDeclaration<unknown, unknown>;
    min?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    max?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    from?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    to?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    highlight?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    managerSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    managerObject: import("lit").PropertyDeclaration<unknown, unknown>;
    palette: import("lit").PropertyDeclaration<unknown, unknown>;
    advancedPalettes: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothThermograms: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothGraph: import("lit").PropertyDeclaration<unknown, unknown>;
    tool: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  /** Enables selecting, editing and removing the analyses in the tables. Provided to all descendants. */
  interactiveanalysis: boolean;
  managerSlug: string;
  managerObject: ThermalManager;
  managerController: ManagerController;
  palette: AvailableThermalPalette;
  advancedPalettes: boolean;
  smoothThermograms: boolean;
  smoothGraph: boolean;
  tool: string;
  registrySlug: string;
  registryObject: ThermalRegistry;
  registryController: RegistryController;
  opacity: number;
  min?: number | undefined;
  max?: number | undefined;
  from?: number | undefined;
  to?: number | undefined;
  highlight?: ThermalRangeOrUndefined;
  loading: boolean;
  groupSlug: string;
  groupObject: ThermalGroup;
  groupController: GroupController;
  autoclearGroup: boolean;
  fileController: FileController;
  file?: ThermalFileInstance | undefined;
  failure?: ThermalFileFailure | undefined;
  ms: number;
  playbackSpeed: PlaybackSpeeds;
  analysis1?: string | undefined;
  analysis2?: string | undefined;
  analysis3?: string | undefined;
  analysis4?: string | undefined;
  analysis5?: string | undefined;
  analysis6?: string | undefined;
  analysis7?: string | undefined;
  autoHighlight: boolean;
  fileLoadController: FileLoadController;
  thermal: string | undefined;
  visible: string | undefined;
  /** Observes the interactive layout's content width; released on disconnect. */
  private layoutObserver?;
  connectedCallback(): void;
  firstUpdated(changedProperties: PropertyValues): void;
  disconnectedCallback(): void;
  /** Applies responsive classes to the rendered layout without recreating its interactive children. */
  private observeLayout;
  static styles: import("lit").CSSResult;
  render(): import("lit").TemplateResult<1>;
}
//#endregion
//#region src/apps/ThermalGroupApp.d.ts
declare class ThermalGroupAppElement extends AbstractApp implements IElementWithManagerController, IElementWithRegistryController, IElementWithGroupController, IElementWithFileController, IElementWithGroupListingController, IElementWithGroupLoadController {
  static properties: {
    filesString?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    managerController: import("lit").PropertyDeclaration<unknown, unknown>;
    registryController: import("lit").PropertyDeclaration<unknown, unknown>;
    groupController: import("lit").PropertyDeclaration<unknown, unknown>;
    fileController: import("lit").PropertyDeclaration<unknown, unknown>;
    file?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    failure?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    loading: import("lit").PropertyDeclaration<unknown, unknown>;
    ms: import("lit").PropertyDeclaration<unknown, unknown>;
    playbackSpeed: import("lit").PropertyDeclaration<unknown, unknown>;
    analysis1?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis2?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis3?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis4?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis5?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis6?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    analysis7?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    autoHighlight: import("lit").PropertyDeclaration<unknown, unknown>;
    groupSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    groupObject: import("lit").PropertyDeclaration<unknown, unknown>;
    autoclearGroup: import("lit").PropertyDeclaration<unknown, unknown>;
    registrySlug: import("lit").PropertyDeclaration<unknown, unknown>;
    registryObject: import("lit").PropertyDeclaration<unknown, unknown>;
    opacity: import("lit").PropertyDeclaration<unknown, unknown>;
    min?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    max?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    from?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    to?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    highlight?: import("lit").PropertyDeclaration<unknown, unknown> | undefined;
    managerSlug: import("lit").PropertyDeclaration<unknown, unknown>;
    managerObject: import("lit").PropertyDeclaration<unknown, unknown>;
    palette: import("lit").PropertyDeclaration<unknown, unknown>;
    advancedPalettes: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothThermograms: import("lit").PropertyDeclaration<unknown, unknown>;
    smoothGraph: import("lit").PropertyDeclaration<unknown, unknown>;
    tool: import("lit").PropertyDeclaration<unknown, unknown>;
  };
  managerSlug: string;
  managerObject: ThermalManager;
  managerController: ManagerController;
  palette: AvailableThermalPalette;
  advancedPalettes: boolean;
  smoothThermograms: boolean;
  smoothGraph: boolean;
  tool: string;
  registrySlug: string;
  registryObject: ThermalRegistry;
  registryController: RegistryController;
  opacity: number;
  min?: number | undefined;
  max?: number | undefined;
  from?: number | undefined;
  to?: number | undefined;
  highlight?: ThermalRangeOrUndefined;
  loading: boolean;
  groupSlug: string;
  groupObject: ThermalGroup;
  groupController: GroupController;
  autoclearGroup: boolean;
  fileController: FileController;
  file?: ThermalFileInstance | undefined;
  failure?: ThermalFileFailure | undefined;
  ms: number;
  playbackSpeed: PlaybackSpeeds;
  analysis1?: string | undefined;
  analysis2?: string | undefined;
  analysis3?: string | undefined;
  analysis4?: string | undefined;
  analysis5?: string | undefined;
  analysis6?: string | undefined;
  analysis7?: string | undefined;
  autoHighlight: boolean;
  groupListingController: GroupListingController;
  orderby: GroupOrderby;
  ordering: GroupOrdering;
  groupLoadController: GroupLoadController;
  filesString?: string | undefined;
  private subscribedGroup?;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private openDetail;
  private closeDetail;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
//#endregion
//#region src/controls/file/FileInfoButton.d.ts
declare class FileInfoButton extends AbstractFileConsumer {
  protected onFileLoaded(): void;
  onInstanceCreated(): void;
  onFailure(): void;
  static styles: import("lit").CSSResult;
  protected renderRow(label: string, value: string): string;
  protected renderNumericalRow(label: string, value: number, fixed?: number, unit?: string): string;
  protected renderDownloadRow(label: string, text: string, href: string, title: string): string;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-info-button": FileInfoButton;
  }
}
//#endregion
//#region src/controls/file/fileLabel.d.ts
declare class FileLabelElement extends AbstractFileConsumer {
  grouping?: GridGrouping;
  label?: string;
  onInstanceCreated(): void;
  onFailure(): void;
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-label": FileLabelElement;
  }
}
//#endregion
//#region src/controls/file/FileTimelineElement.d.ts
declare class FileTimelineElement extends AbstractFileConsumer {
  protected playing: boolean;
  protected currentFrame?: FileControllerCurrentFrameType;
  protected duration?: FileControllerDurationContextType;
  protected mayStop: boolean;
  protected cursor: typeof fileTimeCursorContext["__context__"];
  protected timelineRef: Ref<HTMLDivElement>;
  protected barRef: Ref<HTMLDivElement>;
  protected containerRef: Ref<HTMLDivElement>;
  protected observer: ResizeObserver;
  hasPlayButton: boolean;
  hasInfo: boolean;
  interactive: boolean;
  protected collapsed: boolean;
  static collapseWidth: number;
  protected ticks: Tick[];
  protected pointerMs?: number;
  onInstanceCreated(instance: ThermalFileInstance): void;
  onFailure(): void;
  protected update(changedProperties: PropertyValues): void;
  /** Handlers */
  /** Handle playback buttons */
  protected handlePlayButtonClick(): void;
  handleBarClick(event: MouseEvent): void;
  /** Take a MouseEvent on `this.timelineRef` and calculate the percentage out of it. */
  protected getValueFromEvent(event: MouseEvent): {
    percent: number;
    ms: number;
  } | undefined;
  handleBarEnter(event: MouseEvent): void;
  handleBarHover(event: MouseEvent): void;
  handleBarMouseLeave(): void;
  static styles: import("lit").CSSResult;
  private renderControls;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-timeline": FileTimelineElement;
  }
}
//#endregion
//#region src/controls/file/video/ISingleVideoExportElement.d.ts
declare enum VideoExportSkin {
  LIGHT = "light",
  DARK = "dark",
  SOLARIZED = "solarized"
}
type SingleVideoRenderProps = {
  hasHistogram: boolean;
  hasThermalScale: boolean;
  hasAnalysis: boolean;
  hasTimeline: boolean;
  isVertical: boolean;
  previewScale: number;
  autoScale: boolean;
  exportFrameWidth: number;
  exportFramePadding: number;
  exportFrameGap: number;
  exportGraphHeight: number;
  fileName: string;
  mp4Quality: Quality;
  skin: VideoExportSkin;
};
declare enum RecordingPhase {
  IDLE = 0,
  RECORDING = 1,
  ENCODING = 2,
  CLEANUP = 3
}
interface ISingleVideoExportElement {
  recordingPhase: RecordingPhase;
  recordingPhaseProgress: number;
  setRecordingPhase(phase: RecordingPhase): void;
  setRecordingPhaseProgress(progress: number): void;
  get innerFile(): ThermalFileInstance | undefined;
  get exportedElement(): HTMLElement | undefined;
  renderProps: SingleVideoRenderProps;
  setHasHistogram(value: boolean): void;
  setHasThermalScale(value: boolean): void;
  setHasTimeline(value: boolean): void;
  setHasAnalysis(value: boolean): void;
  setIsVertical(value: boolean): void;
  setExportFrameWidth(value: number): void;
  setExportFramePadding(value: number): void;
  setExportFrameGap(value: number): void;
  setExportGraphHeight(value: number): void;
  setFileName(value: string): void;
  setMp4Quality(value: Quality): void;
  setSkin(value: VideoExportSkin): void;
  setPreviewScale(value: number): void;
  setAutoScale(value: boolean): void;
}
//#endregion
//#region src/controls/file/video/AbstractSingleVideoExport.d.ts
declare abstract class AbstractSingleVideoExport extends AbstractFileConsumer implements ISingleVideoExportElement {
  fileCopyElementRef: Ref<FileCopyElement>;
  exportedDivRef: Ref<HTMLElement>;
  get slug(): string;
  get outerFile(): ThermalFileInstance | undefined;
  get innerFile(): ThermalFileInstance | undefined;
  get exportedElement(): HTMLElement | undefined;
  parentHasAnalyses: boolean;
  recordingPhase: RecordingPhase;
  recordingPhaseProgress: number;
  setRecordingPhase(phase: RecordingPhase): void;
  setRecordingPhaseProgress(progress: number): void;
  renderProps: SingleVideoRenderProps;
  /** Voláno při změně vlastností ovlivňujících layout exportu.
   *  Lze přepsat v potomcích pro reakci na změny (např. přepočet autoScale).
   */
  protected onLayoutAffectingPropertyChanged(): void;
  setHasHistogram(value: boolean): void;
  setHasThermalScale(value: boolean): void;
  setPreviewScale(value: number): void;
  setAutoScale(value: boolean): void;
  /** The analyses are mirrored to the copy by the `withAnalyses` property of the `file-copy` element (see the providers directive). */
  setHasAnalysis(value: boolean): void;
  setHasTimeline(value: boolean): void;
  setIsVertical(value: boolean): void;
  setExportFramePadding(value: number): void;
  setExportFrameGap(value: number): void;
  setExportFrameWidth(value: number): void;
  setExportGraphHeight(value: number): void;
  setFileName(value: string): void;
  setMp4Quality(value: Quality): void;
  setSkin(value: VideoExportSkin): void;
  updated(_changedProperties: PropertyValues): void;
  record(): Promise<void>;
  currentFrame(): Promise<void>;
}
//#endregion
//#region src/controls/file/video/FileVideoExportPanel.d.ts
declare class FileVideoExportPanel extends AbstractSingleVideoExport {
  /** Reference na preview sekci pro měření výšky */
  private previewSectionRef;
  /** ResizeObserver pro automatické škálování */
  private previewResizeObserver?;
  /** ResizeObserver pro sledování rozměrů exportovaného elementu */
  private exportSizeObserver?;
  /** Reálná šířka exportu v pixelech */
  private exportRealWidth;
  /** Reálná výška exportu v pixelech */
  private exportRealHeight;
  onInstanceCreated(instance: ThermalFileInstance): void;
  onFailure(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  updated(_changedProperties: PropertyValues): void;
  /** Nastaví ResizeObserver pro automatické škálování */
  private setupResizeObserver;
  /** Nastaví ResizeObserver pro sledování rozměrů exportovaného elementu */
  private setupExportSizeObserver;
  /** Přepsaná metoda z AbstractSingleVideoExport - reaguje na změny layout vlastností */
  protected onLayoutAffectingPropertyChanged(): void;
  /** Spustí přepočet autoScale na základě aktuální velikosti preview sekce */
  private triggerAutoScaleRecalculation;
  /** Vypočítá scale na základě dostupné výšky */
  private calculateAutoScale;
  static styles?: CSSResultGroup | undefined;
  private renderHeader;
  private renderPreview;
  private renderOverview;
  private renderFooter;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "file-video-export-panel": FileVideoExportPanel;
  }
}
//#endregion
//#region src/controls/manager/ManagerAdvancedPaletteSwitch.d.ts
declare class ManagerAdvancedPaletteSwitch extends AbstractManagerConsumer {
  private advancedPalettes;
  render(): import("lit").TemplateResult<1>;
}
declare global {
  interface HTMLElementTagNameMap {
    "manager-advanced-palette-switch": ManagerAdvancedPaletteSwitch;
  }
}
//#endregion
//#region src/renderers/FileDetail.d.ts
declare class FileDetailElement extends AbstractFileConsumer {
  onback?: () => void;
  norender: boolean;
  label?: string;
  grouping?: GridGrouping;
  onInstanceCreated(): void;
  onFailure(): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
//#endregion
//#region src/renderers/FileThumbnail.d.ts
declare class FileThumbnailElement extends AbstractFileConsumer {
  ondetail?: (file: ThermalFileInstance) => void;
  norender: boolean;
  label?: string;
  grouping?: GridGrouping;
  onInstanceCreated(): void;
  onFailure(): void;
  static styles?: CSSResultGroup | undefined;
  protected render(): unknown;
}
//#endregion
//#region src/ui/BtnGroup.d.ts
declare class BtnGroupElement extends AbstractThermalElement {
  static styles: import("lit").CSSResult;
  protected render(): unknown;
}
declare global {
  interface HTMLElementTagNameMap {
    "thermal-btn-group": BtnGroupElement;
  }
}
//#endregion
//#region src/iifeCatalog.d.ts
export declare const independentElements: {};
/**
 * List of provider components
 */
export declare const elementsProviders: {
  readonly "manager-provider": typeof ManagerProviderElement;
  readonly "registry-provider": typeof RegistryProviderElement;
  readonly "group-provider": typeof GroupProviderElement;
  readonly "file-provider": typeof FileProviderElement;
  readonly "file-copy": typeof FileCopyElement;
};
/**
 * All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
 * @see {@link defineBaseWebcomponents}
 */
export declare const elementsAll: {
  readonly "apparent-temperature-aat": typeof AatAppElement;
  readonly "thermal-dropin-app": typeof DropinAppElement;
  readonly "thermal-file-app": typeof ThermalFileAppElement;
  readonly "thermal-group-app": typeof ThermalGroupAppElement;
  readonly "file-canvas": typeof FileCanvasElement;
  readonly "file-download-dropdown": typeof FileDownloadButton;
  readonly "file-info-button": typeof FileInfoButton;
  readonly "file-playback-speed-dropdown": typeof FilePlaybackSpeedDropdown;
  readonly "file-timeline": typeof FileTimelineElement;
  readonly "file-video-export-button": typeof FileVideoExportButton;
  readonly "file-video-export-panel": typeof FileVideoExportPanel;
  readonly "file-label": typeof FileLabelElement;
  readonly "file-button": typeof FileButtonElement;
  readonly "file-dropdown-elt": typeof FileDropdown;
  readonly "file-download-lrc": typeof FileLrcButton;
  readonly "file-download-png": typeof FilePngButton;
  readonly "file-range-propagator": typeof FileRangePropagator;
  readonly "file-analysis-complex": typeof FileAnalysisComplexElement;
  readonly "file-analysis-display": typeof FileAnalysisDisplayElement;
  readonly "file-analysis-edit": typeof FileAnalisisEditDialog;
  readonly "file-analysis-graph": typeof FileAnalysisGraphElement;
  readonly "file-analysis-table-row": typeof FileAnalysisRowElement;
  readonly "file-analysis-table": typeof FileAnalysisTableElement;
  readonly "analysis-color": typeof AnalysisColorDropdown;
  readonly "analysis-name": typeof AnalysisNameInput;
  readonly "edit-area": typeof AreaEditTable;
  readonly "edit-point": typeof EditpointTable;
  readonly "thermal-chart": typeof ThermalChartElement;
  readonly "file-detail": typeof FileDetailElement;
  readonly "file-thumbnail": typeof FileThumbnailElement;
  readonly "group-analysis-sync-button": typeof GroupAnalysisSyncButton;
  readonly "group-chart": typeof GroupChartElement;
  readonly "group-download-buttons": typeof GroupDownloadButtons;
  readonly "group-download-dropdown": typeof GroupDownloadDropdown;
  readonly "group-dropin-element": typeof GroupDropinElement;
  readonly "group-dropin-input": typeof GroupDropinInputElement;
  readonly "group-range-propagator": typeof GroupRangePropagatorElement;
  readonly "group-timeline": typeof GroupTimelineElement;
  readonly "registry-histogram": typeof RegistryHistogram;
  readonly "registry-opacity-slider": typeof RegistryOpacitySlider;
  readonly "registry-range-auto-button": typeof RegistryRangeAutoButton;
  readonly "registry-range-full-button": typeof RegistryRangeFullButton;
  readonly "registry-range-display": typeof RegistryRangeDisplay;
  readonly "registry-range-form": typeof RegistryRangeForm;
  readonly "registry-range-slider": typeof RegistryRangeSlider;
  readonly "registry-ticks-bar": typeof RegistryTicksBar;
  readonly "manager-image-smooth-switch": typeof ManagerImageSmoothSwitch;
  readonly "manager-graph-smooth-switch": typeof ManagerGraphSmoothSwitch;
  readonly "manager-advanced-palette-switch": typeof ManagerAdvancedPaletteSwitch;
  readonly "manager-palette-dropdown": typeof ManagerPaletteDropdown;
  readonly "manager-palette-buttons": typeof ManagerPaletteButtons;
  readonly "manager-tool-bar": typeof ManagerToolBar;
  /** @deprecated This sort of export should never be used. Please, do export thermal images only through the LIT components instead of the `@labirthermal/core` export. */
  readonly "manager-export-panel": typeof ManagerExportPanel;
  readonly "manager-provider": typeof ManagerProviderElement;
  readonly "registry-provider": typeof RegistryProviderElement;
  readonly "group-provider": typeof GroupProviderElement;
  readonly "file-provider": typeof FileProviderElement;
  readonly "file-copy": typeof FileCopyElement;
  readonly "thermal-app": typeof ThermalAppElement;
  readonly "thermal-bar": typeof ThermalBarElement;
  readonly "thermal-btn": typeof ThermalBtnElement;
  readonly "thermal-btn-group": typeof BtnGroupElement;
  readonly "thermal-dialog": typeof ThermalDialogElement;
  readonly "thermal-dropdown": typeof ThermalDropdownElement;
  readonly "thermal-dropin": typeof ThermalDropinElement;
  readonly "thermal-expandable": typeof ThermalExpandableElement;
  readonly "thermal-field": typeof ThermalFieldElement;
  readonly "thermal-icon": typeof ThermalIconElement;
  readonly "thermal-loading": typeof ThermalPosterElement;
  readonly "thermal-radio": typeof ThermalRadioElement;
  readonly "thermal-slot": typeof ThermalSlotElement;
  readonly "thermal-spinner": typeof ThermalSpinnerElement;
  readonly "thermal-tip": typeof ThermalTipElement;
};
export declare const isLabirthermalWebcomponent: (tag: string) => boolean;
/** Define all webcomponents from the @labirthermal/webcomponents package */
export declare const defineBaseWebcomponents: () => void;
//#endregion
export { type BtnSizes, type BtnVariants, type ConfigSettings, type FileControllerCurrentFrameType, type FileControllerDurationContextType, type GroupExportSettings, type HostReactiveProperties, type IElementWithFileLoadController, type IElementWithGroupAnalysisSyncController, type IElementWithGroupController, type IElementWithGroupListingController, type IElementWithGroupLoadController, type IElementWithManagerController, type IElementWithRegistryController, type ManagerPaletteContextType, type PngExportSettings, i18webcomponents as i18nWebcomponents, icons };
//# sourceMappingURL=index.export.d.cts.map