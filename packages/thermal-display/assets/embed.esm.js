Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule || !__hasOwnProp.call(mod, "default") ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
let _labirthermal_core = require("@labirthermal/core");
let lit = require("lit");
let lit_i18n = require("lit-i18n");
let i18next_browser_languagedetector = require("i18next-browser-languagedetector");
i18next_browser_languagedetector = __toESM(i18next_browser_languagedetector, 1);
let _lit_context = require("@lit/context");
let lit_directives_unsafe_svg_js = require("lit/directives/unsafe-svg.js");
let lit_directives_if_defined_js = require("lit/directives/if-defined.js");
let lit_directives_ref_js = require("lit/directives/ref.js");
let lit_directives_repeat_js = require("lit/directives/repeat.js");
let lit_directives_style_map_js = require("lit/directives/style-map.js");
let lit_decorators_js = require("lit/decorators.js");
let lit_directives_cache_js = require("lit/directives/cache.js");
let lit_directives_map_js = require("lit/directives/map.js");
let _floating_ui_dom = require("@floating-ui/dom");
let lit_directives_class_map_js = require("lit/directives/class-map.js");
let lit_decorators_state_js = require("lit/decorators/state.js");
let lit_directives_live_js = require("lit/directives/live.js");
let public_ip = require("public-ip");
let date_fns = require("date-fns");
let lit_directives_when_js = require("lit/directives/when.js");
let lit_directives_unsafe_html_js = require("lit/directives/unsafe-html.js");
let lit_directives_guard_js = require("lit/directives/guard.js");
let mediabunny = require("mediabunny");
let lit_directive_js = require("lit/directive.js");
//#region src/utils/converters/numberRangeConverter.ts
const numberRangeConverter = (emptyValue, min, max) => {
	const fromAttribute = (value) => {
		if (value === void 0 || value === null || typeof value === "string" || typeof value === "number") return emptyValue;
		const valueNumber = Number(value);
		if (isNaN(valueNumber)) return emptyValue;
		if (valueNumber < min) return min;
		if (valueNumber > max) return max;
		return valueNumber;
	};
	const toAttribute = (value) => {
		return String(value);
	};
	return {
		fromAttribute,
		toAttribute
	};
};
//#endregion
//#region src/utils/converters/booleanConverter.ts
/**
* 
* @deprecated Use the recommended boolean conventions by LIT.
*/
const booleanConverter = (emptyValue) => {
	const fromAttribute = (value) => {
		if (value === void 0 || value === null || value?.trim().length === 0) return emptyValue;
		return value === "true";
	};
	const toAttribute = (value) => {
		if (value === true) return "true";
		return "false";
	};
	return {
		fromAttribute,
		toAttribute
	};
};
//#endregion
//#region src/utils/converters/paletteConverter.ts
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
const paletteConverter = {
	fromAttribute: (value) => {
		if (value === void 0 || value === null || typeof value !== "string" || value === "" || !(value in _labirthermal_core.ThermalPalettes)) return "iron";
		return value;
	},
	toAttribute: (value) => value
};
//#endregion
//#region src/utils/converters/stringOrUndefinedConverter.ts
const stringOrUndefinedConverter = {
	fromAttribute(value) {
		if (typeof value !== "string") return;
		const trimmed = value.trim();
		if (trimmed.length === 0) return;
		return trimmed;
	},
	toAttribute(value) {
		const trimmed = value?.trim();
		return trimmed?.length ? trimmed : void 0;
	}
};
//#endregion
//#region src/utils/converters/durationConverter.ts
/** Converts a duration property indicated as string to millis and back */
const durationConverter = {
	fromAttribute: (value) => {
		if (value) {
			const parts = value.split(":").map(Number);
			if (parts.some(isNaN)) return void 0;
			if (parts.length === 3) {
				const [minutes, seconds, milliseconds] = parts;
				return minutes * 6e4 + seconds * 1e3 + milliseconds;
			} else if (parts.length === 4) {
				const [hours, minutes, seconds, milliseconds] = parts;
				return hours * 36e5 + minutes * 6e4 + seconds * 1e3 + milliseconds;
			}
		}
	},
	toAttribute: (value) => {
		if (value !== void 0) {
			const hours = Math.floor(value / 36e5);
			const minutes = Math.floor(value % 36e5 / 6e4);
			const seconds = Math.floor(value % 6e4 / 1e3);
			const milliseconds = value % 1e3;
			const formattedSeconds = String(seconds).padStart(2, "0");
			const formattedMilliseconds = String(milliseconds).padStart(3, "0");
			if (hours > 0) return `${hours}:${minutes}:${formattedSeconds}:${formattedMilliseconds}`;
			return `${minutes}:${formattedSeconds}:${formattedMilliseconds}`;
		}
	}
};
//#endregion
//#region src/utils/getContrastColor.ts
const contrastColors = /* @__PURE__ */ new Map();
/** Choose the higher WCAG contrast against an opaque CSS background color. */
function getContrastColor(backgroundColor) {
	const cached = contrastColors.get(backgroundColor);
	if (cached) return cached;
	const probe = document.createElement("span");
	probe.style.color = backgroundColor;
	if (!probe.style.color) throw new Error(`Invalid background color: ${backgroundColor}`);
	probe.style.display = "none";
	document.body.append(probe);
	const normalized = getComputedStyle(probe).color;
	probe.remove();
	const match = normalized.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/);
	if (!match || match[4] !== void 0 && Number(match[4]) !== 1) throw new Error(`Expected an opaque RGB background color: ${backgroundColor}`);
	const linear = [
		Number(match[1]),
		Number(match[2]),
		Number(match[3])
	].map((channel) => {
		const srgb = channel / 255;
		return srgb <= .04045 ? srgb / 12.92 : ((srgb + .055) / 1.055) ** 2.4;
	});
	const luminance = .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
	const result = (luminance + .05) / .05 >= 1.05 / (luminance + .05) ? "#000000" : "#FFFFFF";
	contrastColors.set(backgroundColor, result);
	return result;
}
//#endregion
//#region src/utils/icons.ts
/**
* Definice SVG ikon s jejich variantami
* Každá ikona může mít více variant (outline, solid, mini, micro)
* Použití: přidejte novou ikonu s jejími variantami zde
*/
const svg = {
	lock: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M8 1a3.5 3.5 0 0 0-3.5 3.5V7A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7V4.5A3.5 3.5 0 0 0 8 1Zm2 6V4.5a2 2 0 1 0-4 0V7h4Z" clip-rule="evenodd" />
</svg>
` },
	document: { outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
</svg>` },
	eye: { solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clip-rule="evenodd" />
        </svg>` },
	play: { solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
        </svg>` },
	pause: { solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
        </svg>` },
	info: {
		mini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z" clip-rule="evenodd" />
        </svg>`,
		solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clip-rule="evenodd" />
        </svg>`,
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
</svg>`
	},
	settings: {
		solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
  <path fill-rule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z" clip-rule="evenodd" />
</svg>`,
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
</svg>
`
	},
	back: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M12.5 9.75A2.75 2.75 0 0 0 9.75 7H4.56l2.22 2.22a.75.75 0 1 1-1.06 1.06l-3.5-3.5a.75.75 0 0 1 0-1.06l3.5-3.5a.75.75 0 0 1 1.06 1.06L4.56 5.5h5.19a4.25 4.25 0 0 1 0 8.5h-1a.75.75 0 0 1 0-1.5h1a2.75 2.75 0 0 0 2.75-2.75Z" clip-rule="evenodd" />
</svg>` },
	share: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M12 6a2 2 0 1 0-1.994-1.842L5.323 6.5a2 2 0 1 0 0 3l4.683 2.342a2 2 0 1 0 .67-1.342L5.995 8.158a2.03 2.03 0 0 0 0-.316L10.677 5.5c.353.311.816.5 1.323.5Z" />
        </svg>`,
		mini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path d="M13 4.5a2.5 2.5 0 1 1 .702 1.737L6.97 9.604a2.518 2.518 0 0 1 0 .792l6.733 3.367a2.5 2.5 0 1 1-.671 1.341l-6.733-3.367a2.5 2.5 0 1 1 0-3.475l6.733-3.366A2.52 2.52 0 0 1 13 4.5Z" />
        </svg>`
	},
	folder: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" /></svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M2 3.5A1.5 1.5 0 0 1 3.5 2h2.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 9.62 4H12.5A1.5 1.5 0 0 1 14 5.5v1.401a2.986 2.986 0 0 0-1.5-.401h-9c-.546 0-1.059.146-1.5.401V3.5ZM2 9.5v3A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-3A1.5 1.5 0 0 0 12.5 8h-9A1.5 1.5 0 0 0 2 9.5Z" />
        </svg>`
	},
	wifi: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M14.188 7.063a8.75 8.75 0 0 0-12.374 0 .75.75 0 0 1-1.061-1.06c4.003-4.004 10.493-4.004 14.496 0a.75.75 0 1 1-1.061 1.06Zm-2.121 2.121a5.75 5.75 0 0 0-8.132 0 .75.75 0 0 1-1.06-1.06 7.25 7.25 0 0 1 10.252 0 .75.75 0 0 1-1.06 1.06Zm-2.122 2.122a2.75 2.75 0 0 0-3.889 0 .75.75 0 1 1-1.06-1.061 4.25 4.25 0 0 1 6.01 0 .75.75 0 0 1-1.06 1.06Zm-2.828 1.06a1.25 1.25 0 0 1 1.768 0 .75.75 0 0 1 0 1.06l-.355.355a.75.75 0 0 1-1.06 0l-.354-.354a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
        </svg>` },
	user: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0Zm-5-2a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM8 9c-1.825 0-3.422.977-4.295 2.437A5.49 5.49 0 0 0 8 13.5a5.49 5.49 0 0 0 4.294-2.063A4.997 4.997 0 0 0 8 9Z" clip-rule="evenodd" />
        </svg>` },
	image: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M2 4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4Zm10.5 5.707a.5.5 0 0 0-.146-.353l-1-1a.5.5 0 0 0-.708 0L9.354 9.646a.5.5 0 0 1-.708 0L6.354 7.354a.5.5 0 0 0-.708 0l-2 2a.5.5 0 0 0-.146.353V12a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5V9.707ZM12 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z" clip-rule="evenodd" />
        </svg>`
	},
	upwards: { outline: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
        <path fill-rule="evenodd" d="M20.24 20.249a.75.75 0 0 0-.75-.75H8.989V5.56l2.47 2.47a.75.75 0 0 0 1.06-1.061l-3.75-3.75a.75.75 0 0 0-1.06 0l-3.75 3.75a.75.75 0 1 0 1.06 1.06l2.47-2.469V20.25c0 .414.335.75.75.75h11.25a.75.75 0 0 0 .75-.75Z" clip-rule="evenodd" />
        </svg>` },
	copy: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
        </svg>`,
		mini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path d="M7 3.5A1.5 1.5 0 0 1 8.5 2h3.879a1.5 1.5 0 0 1 1.06.44l3.122 3.12A1.5 1.5 0 0 1 17 6.622V12.5a1.5 1.5 0 0 1-1.5 1.5h-1v-3.379a3 3 0 0 0-.879-2.121L10.5 5.379A3 3 0 0 0 8.379 4.5H7v-1Z" />
            <path d="M4.5 6A1.5 1.5 0 0 0 3 7.5v9A1.5 1.5 0 0 0 4.5 18h7a1.5 1.5 0 0 0 1.5-1.5v-5.879a1.5 1.5 0 0 0-.44-1.06L9.44 6.439A1.5 1.5 0 0 0 8.378 6H4.5Z" />
        </svg>`
	},
	right: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M2 8a.75.75 0 0 1 .75-.75h8.69L8.22 4.03a.75.75 0 0 1 1.06-1.06l4.5 4.5a.75.75 0 0 1 0 1.06l-4.5 4.5a.75.75 0 0 1-1.06-1.06l3.22-3.22H2.75A.75.75 0 0 1 2 8Z" clip-rule="evenodd" />
        </svg>`
	},
	trash: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M5 3.25V4H2.75a.75.75 0 0 0 0 1.5h.3l.815 8.15A1.5 1.5 0 0 0 5.357 15h5.285a1.5 1.5 0 0 0 1.493-1.35l.815-8.15h.3a.75.75 0 0 0 0-1.5H11v-.75A2.25 2.25 0 0 0 8.75 1h-1.5A2.25 2.25 0 0 0 5 3.25Zm2.25-.75a.75.75 0 0 0-.75.75V4h3v-.75a.75.75 0 0 0-.75-.75h-1.5ZM6.05 6a.75.75 0 0 1 .787.713l.275 5.5a.75.75 0 0 1-1.498.075l-.275-5.5A.75.75 0 0 1 6.05 6Zm3.9 0a.75.75 0 0 1 .712.787l-.275 5.5a.75.75 0 0 1-1.498-.075l.275-5.5a.75.75 0 0 1 .786-.711Z" clip-rule="evenodd" />
        </svg>` },
	addfolder: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path fill-rule="evenodd" d="M3.5 2A1.5 1.5 0 0 0 2 3.5v9A1.5 1.5 0 0 0 3.5 14h9a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 12.5 4H9.621a1.5 1.5 0 0 1-1.06-.44L7.439 2.44A1.5 1.5 0 0 0 6.38 2H3.5ZM8 6a.75.75 0 0 1 .75.75v1.5h1.5a.75.75 0 0 1 0 1.5h-1.5v1.5a.75.75 0 0 1-1.5 0v-1.5h-1.5a.75.75 0 0 1 0-1.5h1.5v-1.5A.75.75 0 0 1 8 6Z" clip-rule="evenodd" />
        </svg>` },
	upload: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M7.25 10.25a.75.75 0 0 0 1.5 0V4.56l2.22 2.22a.75.75 0 1 0 1.06-1.06l-3.5-3.5a.75.75 0 0 0-1.06 0l-3.5 3.5a.75.75 0 0 0 1.06 1.06l2.22-2.22v5.69Z" />
            <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
        </svg>` },
	clock: { outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>` },
	close: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M5.28 4.22a.75.75 0 0 0-1.06 1.06L6.94 8l-2.72 2.72a.75.75 0 1 0 1.06 1.06L8 9.06l2.72 2.72a.75.75 0 1 0 1.06-1.06L9.06 8l2.72-2.72a.75.75 0 0 0-1.06-1.06L8 6.94 5.28 4.22Z" />
        </svg>`
	},
	edit: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
        <path d="M13.488 2.513a1.75 1.75 0 0 0-2.475 0L6.75 6.774a2.75 2.75 0 0 0-.596.892l-.848 2.047a.75.75 0 0 0 .98.98l2.047-.848a2.75 2.75 0 0 0 .892-.596l4.261-4.262a1.75 1.75 0 0 0 0-2.474Z" />
        <path d="M4.75 3.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h6.5c.69 0 1.25-.56 1.25-1.25V9A.75.75 0 0 1 14 9v2.25A2.75 2.75 0 0 1 11.25 14h-6.5A2.75 2.75 0 0 1 2 11.25v-6.5A2.75 2.75 0 0 1 4.75 2H7a.75.75 0 0 1 0 1.5H4.75Z" />
        </svg>` },
	comment: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Zm3-3.49a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5A.75.75 0 0 1 4 5.25ZM4.75 7a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
        </svg>` },
	grid: {
		solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M3 6a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3v2.25a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3V6ZM3 15.75a3 3 0 0 1 3-3h2.25a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3v-2.25Zm9.75 0a3 3 0 0 1 3-3H18a3 3 0 0 1 3 3V18a3 3 0 0 1-3 3h-2.25a3 3 0 0 1-3-3v-2.25Z" clip-rule="evenodd" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v2A1.5 1.5 0 0 0 3.5 7h2A1.5 1.5 0 0 0 7 5.5v-2A1.5 1.5 0 0 0 5.5 2h-2ZM3.5 9A1.5 1.5 0 0 0 2 10.5v2A1.5 1.5 0 0 0 3.5 14h2A1.5 1.5 0 0 0 7 12.5v-2A1.5 1.5 0 0 0 5.5 9h-2ZM9 3.5A1.5 1.5 0 0 1 10.5 2h2A1.5 1.5 0 0 1 14 3.5v2A1.5 1.5 0 0 1 12.5 7h-2A1.5 1.5 0 0 1 9 5.5v-2ZM10.5 9A1.5 1.5 0 0 0 9 10.5v2a1.5 1.5 0 0 0 1.5 1.5h2a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 12.5 9h-2Z" />
        </svg>`
	},
	list: {
		solid: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z" clip-rule="evenodd" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M3 4.75a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM6.25 3a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 7.25a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM6.25 11.5a.75.75 0 0 0 0 1.5h7a.75.75 0 0 0 0-1.5h-7ZM4 12.25a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>`
	},
	check: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path fill-rule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clip-rule="evenodd" />
        </svg>` },
	"check-circle": { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14Zm3.844-8.791a.75.75 0 0 0-1.188-.918l-3.7 4.79-1.649-1.833a.75.75 0 1 0-1.114 1.004l2.25 2.5a.75.75 0 0 0 1.15-.043l4.25-5.5Z" clip-rule="evenodd" />
</svg>` },
	"circle-dots": { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM8 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2ZM5.5 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm6 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
</svg>` },
	save: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 3h11l3 3v13H5V3Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M7 3v4h8V3M7 10h10M7 12h8" />
            <circle cx="17" cy="15" r="1.5" stroke="currentColor" fill="none" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" class="size-4">
            <path d="M2 2h9l3 3v8H2V2Zm2 1v3h6V3H4Zm0 4h8v1H4V7Zm0 2h6v1H4V9Zm8 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" />
        </svg>`
	},
	restore: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
  <path fillRule="evenodd" d="M6.25 12.5A2.75 2.75 0 0 0 9 9.75V4.56L6.78 6.78a.75.75 0 0 1-1.06-1.06l3.5-3.5a.75.75 0 0 1 1.06 0l3.5 3.5a.75.75 0 0 1-1.06 1.06L10.5 4.56v5.19a4.25 4.25 0 0 1-8.5 0v-1a.75.75 0 0 1 1.5 0v1a2.75 2.75 0 0 0 2.75 2.75Z" clipRule="evenodd" />
</svg>`
	},
	unlink: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.181 8.68a4.503 4.503 0 0 1 1.903 6.405m-9.768-2.782L3.56 14.06a4.5 4.5 0 0 0 6.364 6.365l3.129-3.129m5.614-5.615 1.757-1.757a4.5 4.5 0 0 0-6.364-6.365l-4.5 4.5c-.258.26-.479.541-.661.84m1.903 6.405a4.495 4.495 0 0 1-1.242-.88 4.483 4.483 0 0 1-1.062-1.683m6.587 2.345 5.907 5.907m-5.907-5.907L8.898 8.898M2.991 2.99 8.898 8.9" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path fill-rule="evenodd" d="M2.22 2.22a.75.75 0 0 1 1.06 0l4.46 4.46c.128-.178.272-.349.432-.508l3-3a4 4 0 0 1 5.657 5.656l-1.225 1.225a.75.75 0 1 1-1.06-1.06l1.224-1.225a2.5 2.5 0 0 0-3.536-3.536l-3 3a2.504 2.504 0 0 0-.406.533l2.59 2.59a2.49 2.49 0 0 0-.79-1.254.75.75 0 1 1 .977-1.138 3.997 3.997 0 0 1 1.306 3.886l4.871 4.87a.75.75 0 1 1-1.06 1.061l-5.177-5.177-.006-.005-4.134-4.134a.65.65 0 0 1-.005-.006L2.22 3.28a.75.75 0 0 1 0-1.06Zm3.237 7.727a.75.75 0 0 1 0 1.06l-1.225 1.225a2.5 2.5 0 0 0 3.536 3.536l1.879-1.879a.75.75 0 1 1 1.06 1.06L8.83 16.83a4 4 0 0 1-5.657-5.657l1.224-1.225a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
        </svg>`
	},
	link: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
            <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
            <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
        </svg>`
	},
	zoom: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607ZM10.5 7.5v6m3-3h-6" />
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M6.25 8.75v-1h-1a.75.75 0 0 1 0-1.5h1v-1a.75.75 0 0 1 1.5 0v1h1a.75.75 0 0 1 0 1.5h-1v1a.75.75 0 0 1-1.5 0Z" />
            <path fill-rule="evenodd" d="M7 12c1.11 0 2.136-.362 2.965-.974l2.755 2.754a.75.75 0 1 0 1.06-1.06l-2.754-2.755A5 5 0 1 0 7 12Zm0-1.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" clip-rule="evenodd" />
        </svg>`
	},
	adjustment: {
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
            <path d="M6.5 2.25a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0V4.5h6.75a.75.75 0 0 0 0-1.5H6.5v-.75ZM11 6.5a.75.75 0 0 0-1.5 0v3a.75.75 0 0 0 1.5 0v-.75h2.25a.75.75 0 0 0 0-1.5H11V6.5ZM5.75 10a.75.75 0 0 1 .75.75v.75h6.75a.75.75 0 0 1 0 1.5H6.5v.75a.75.75 0 0 1-1.5 0v-3a.75.75 0 0 1 .75-.75ZM2.75 7.25H8.5v1.5H2.75a.75.75 0 0 1 0-1.5ZM4 3H2.75a.75.75 0 0 0 0 1.5H4V3ZM2.75 11.5H4V13H2.75a.75.75 0 0 1 0-1.5Z" />
        </svg>`,
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
        </svg>`
	},
	range: {
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <g>
                <line x1="5" y1="12" x2="19" y2="12" stroke="currentColor" stroke-width="1.5"/>
                <line x1="5" y1="9" x2="5" y2="15" stroke="currentColor" stroke-width="2"/>
                <line x1="19" y1="9" x2="19" y2="15" stroke="currentColor" stroke-width="2"/>
            </g>
        </svg>`,
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" class="size-4">
            <g>
                <line x1="3" y1="8" x2="13" y2="8" stroke="currentColor" stroke-width="1"/>
                <line x1="3" y1="6" x2="3" y2="10" stroke="currentColor" stroke-width="1.5"/>
                <line x1="13" y1="6" x2="13" y2="10" stroke="currentColor" stroke-width="1.5"/>
            </g>
        </svg>`
	},
	bigger: { mini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="m13.28 7.78 3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 0 0 1.06 1.06ZM2 17.25v-4.5a.75.75 0 0 1 1.5 0v2.69l3.22-3.22a.75.75 0 0 1 1.06 1.06L4.56 16.5h2.69a.75.75 0 0 1 0 1.5h-4.5a.747.747 0 0 1-.75-.75ZM12.22 13.28l3.22 3.22h-2.69a.75.75 0 0 0 0 1.5h4.5a.747.747 0 0 0 .75-.75v-4.5a.75.75 0 0 0-1.5 0v2.69l-3.22-3.22a.75.75 0 1 0-1.06 1.06ZM3.5 4.56l3.22 3.22a.75.75 0 0 0 1.06-1.06L4.56 3.5h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0V4.56Z" />
</svg>
` },
	smaller: { mini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path d="M3.28 2.22a.75.75 0 0 0-1.06 1.06L5.44 6.5H2.75a.75.75 0 0 0 0 1.5h4.5A.75.75 0 0 0 8 7.25v-4.5a.75.75 0 0 0-1.5 0v2.69L3.28 2.22ZM13.5 2.75a.75.75 0 0 0-1.5 0v4.5c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-2.69l3.22-3.22a.75.75 0 0 0-1.06-1.06L13.5 5.44V2.75ZM3.28 17.78l3.22-3.22v2.69a.75.75 0 0 0 1.5 0v-4.5a.75.75 0 0 0-.75-.75h-4.5a.75.75 0 0 0 0 1.5h2.69l-3.22 3.22a.75.75 0 1 0 1.06 1.06ZM13.5 14.56l3.22 3.22a.75.75 0 1 0 1.06-1.06l-3.22-3.22h2.69a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75v4.5a.75.75 0 0 0 1.5 0v-2.69Z" />
</svg>` },
	ellipsis: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path d="M2 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM6.5 8a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM12.5 6.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
</svg>` },
	download: {
		micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path d="M8.75 2.75a.75.75 0 0 0-1.5 0v5.69L5.03 6.22a.75.75 0 0 0-1.06 1.06l3.5 3.5a.75.75 0 0 0 1.06 0l3.5-3.5a.75.75 0 0 0-1.06-1.06L8.75 8.44V2.75Z" />
  <path d="M3.5 9.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 14h6.5A2.75 2.75 0 0 0 14 11.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25h-6.5c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
</svg>`,
		outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
</svg>`
	},
	clipboard: { outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.8" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25ZM6.75 12h.008v.008H6.75V12Zm0 3h.008v.008H6.75V15Zm0 3h.008v.008H6.75V18Z" />
</svg>` },
	bulb: { outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
</svg>` },
	reload: { micro: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
  <path fill-rule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clip-rule="evenodd" />
</svg>` },
	warning: { outline: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
</svg>` },
	move: { mini: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-5">
  <path fill-rule="evenodd" d="M3 4.25A2.25 2.25 0 0 1 5.25 2h5.5A2.25 2.25 0 0 1 13 4.25v2a.75.75 0 0 1-1.5 0v-2a.75.75 0 0 0-.75-.75h-5.5a.75.75 0 0 0-.75.75v11.5c0 .414.336.75.75.75h5.5a.75.75 0 0 0 .75-.75v-2a.75.75 0 0 1 1.5 0v2A2.25 2.25 0 0 1 10.75 18h-5.5A2.25 2.25 0 0 1 3 15.75V4.25Z" clip-rule="evenodd" />
  <path fill-rule="evenodd" d="M6 10a.75.75 0 0 1 .75-.75h9.546l-1.048-.943a.75.75 0 1 1 1.004-1.114l2.5 2.25a.75.75 0 0 1 0 1.114l-2.5 2.25a.75.75 0 1 1-1.004-1.114l1.048-.943H6.75A.75.75 0 0 1 6 10Z" clip-rule="evenodd" />
</svg>` }
};
/**
* Základní funkce pro vykreslení ikony
* @param name - název ikony (např. 'folder')
* @param variant - varianta ikony (např. 'outline')
* @param className - CSS třídy pro přidání
* @param styles - inline styly
*/
const icon = (name, variant, className, styles) => {
	const iconSvg = svg[name][variant];
	if (!iconSvg) {
		console.warn(`Icon variant "${String(variant)}" not found for icon "${String(name)}"`);
		return lit.html``;
	}
	let modifiedSvg = iconSvg;
	if (className || styles) {
		if (modifiedSvg.includes("class=\"")) modifiedSvg = modifiedSvg.replace(/class="([^"]*)"/, `class="$1 ${className || ""}"`);
		else modifiedSvg = modifiedSvg.replace(/<svg([^>]*)>/, `<svg$1 class="${className || ""}">`);
		if (styles) {
			if (modifiedSvg.includes("style=\"")) modifiedSvg = modifiedSvg.replace(/style="([^"]*)"/, `style="$1; ${styles}"`);
			else modifiedSvg = modifiedSvg.replace(/<svg([^>]*)>/, `<svg$1 style="${styles}">`);
		}
	}
	return modifiedSvg;
};
/**
* Automatické generování objektu ikon z definice svg
* Vytváří strukturu: icons.nazevIkony.varianta(className?, styles?)
*/
const createIcons = () => {
	const result = {};
	for (const iconName in svg) {
		const iconKey = iconName;
		result[iconKey] = {};
		const iconVariants = svg[iconKey];
		for (const variant in iconVariants) result[iconKey][variant] = (className, styles) => {
			return icon(iconName, variant, className, styles);
		};
	}
	return result;
};
/**
* Exportovaný objekt ikon s typovou bezpečností
* Použití: icons.folder.outline("my-class", "color: red")
*/
const icons = createIcons();
//#endregion
//#region ../../node_modules/.pnpm/i18next@26.4.5_typescript@5.9.3/node_modules/i18next/dist/esm/i18next.js
const isString = (obj) => typeof obj === "string";
const defer = () => {
	let res;
	let rej;
	const promise = new Promise((resolve, reject) => {
		res = resolve;
		rej = reject;
	});
	promise.resolve = res;
	promise.reject = rej;
	return promise;
};
const makeString = (object) => {
	if (object == null) return "";
	return String(object);
};
const copy = (a, s, t) => {
	a.forEach((m) => {
		if (s[m]) t[m] = s[m];
	});
};
const lastOfPathSeparatorRegExp = /###/g;
const cleanKey = (key) => key && key.includes("###") ? key.replace(lastOfPathSeparatorRegExp, ".") : key;
const canNotTraverseDeeper = (object) => !object || isString(object);
const getLastOfPath = (object, path, Empty) => {
	const stack = !isString(path) ? path : path.split(".");
	let stackIndex = 0;
	while (stackIndex < stack.length - 1) {
		if (canNotTraverseDeeper(object)) return {};
		const key = cleanKey(stack[stackIndex]);
		if (!object[key] && Empty) object[key] = new Empty();
		if (Object.prototype.hasOwnProperty.call(object, key)) object = object[key];
		else object = {};
		++stackIndex;
	}
	if (canNotTraverseDeeper(object)) return {};
	return {
		obj: object,
		k: cleanKey(stack[stackIndex])
	};
};
const setPath = (object, path, newValue) => {
	const { obj, k } = getLastOfPath(object, path, Object);
	if (obj !== void 0 || path.length === 1) {
		obj[k] = newValue;
		return;
	}
	let e = path[path.length - 1];
	let p = path.slice(0, path.length - 1);
	let last = getLastOfPath(object, p, Object);
	while (last.obj === void 0 && p.length) {
		e = `${p[p.length - 1]}.${e}`;
		p = p.slice(0, p.length - 1);
		last = getLastOfPath(object, p, Object);
		if (last?.obj && typeof last.obj[`${last.k}.${e}`] !== "undefined") last.obj = void 0;
	}
	last.obj[`${last.k}.${e}`] = newValue;
};
const pushPath = (object, path, newValue, concat) => {
	const { obj, k } = getLastOfPath(object, path, Object);
	obj[k] = obj[k] || [];
	obj[k].push(newValue);
};
const getPath = (object, path) => {
	const { obj, k } = getLastOfPath(object, path);
	if (!obj) return void 0;
	if (!Object.prototype.hasOwnProperty.call(obj, k)) return void 0;
	return obj[k];
};
const getPathWithDefaults = (data, defaultData, key) => {
	const value = getPath(data, key);
	if (value !== void 0) return value;
	return getPath(defaultData, key);
};
const deepExtend = (target, source, overwrite) => {
	for (const prop in source) if (prop !== "__proto__" && prop !== "constructor") {
		if (Object.prototype.hasOwnProperty.call(target, prop)) {
			if (isString(target[prop]) || target[prop] instanceof String || isString(source[prop]) || source[prop] instanceof String) {
				if (overwrite) target[prop] = source[prop];
			} else deepExtend(target[prop], source[prop], overwrite);
		} else target[prop] = source[prop];
	}
	return target;
};
const regexEscape = (str) => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
const _entityMap = {
	"&": "&amp;",
	"<": "&lt;",
	">": "&gt;",
	"\"": "&quot;",
	"'": "&#39;",
	"/": "&#x2F;"
};
const escape = (data) => {
	if (isString(data)) return data.replace(/[&<>"'\/]/g, (s) => _entityMap[s]);
	return data;
};
var RegExpCache = class {
	constructor(capacity) {
		this.capacity = capacity;
		this.regExpMap = /* @__PURE__ */ new Map();
		this.regExpQueue = [];
	}
	getRegExp(pattern) {
		const regExpFromCache = this.regExpMap.get(pattern);
		if (regExpFromCache !== void 0) return regExpFromCache;
		const regExpNew = new RegExp(pattern);
		if (this.regExpQueue.length === this.capacity) this.regExpMap.delete(this.regExpQueue.shift());
		this.regExpMap.set(pattern, regExpNew);
		this.regExpQueue.push(pattern);
		return regExpNew;
	}
};
const chars = [
	" ",
	",",
	"?",
	"!",
	";"
];
const looksLikeObjectPathRegExpCache = new RegExpCache(20);
const looksLikeObjectPath = (key, nsSeparator, keySeparator) => {
	nsSeparator = nsSeparator || "";
	keySeparator = keySeparator || "";
	const possibleChars = chars.filter((c) => !nsSeparator.includes(c) && !keySeparator.includes(c));
	if (possibleChars.length === 0) return true;
	const r = looksLikeObjectPathRegExpCache.getRegExp(`(${possibleChars.map((c) => c === "?" ? "\\?" : c).join("|")})`);
	let matched = !r.test(key);
	if (!matched) {
		const ki = key.indexOf(keySeparator);
		if (ki > 0 && !r.test(key.substring(0, ki))) matched = true;
	}
	return matched;
};
const deepFind = (obj, path, keySeparator = ".") => {
	if (!obj) return void 0;
	if (obj[path]) {
		if (!Object.prototype.hasOwnProperty.call(obj, path)) return void 0;
		return obj[path];
	}
	const tokens = path.split(keySeparator);
	let current = obj;
	for (let i = 0; i < tokens.length;) {
		if (!current || typeof current !== "object") return;
		let next;
		let nextPath = "";
		for (let j = i; j < tokens.length; ++j) {
			if (j !== i) nextPath += keySeparator;
			nextPath += tokens[j];
			next = current[nextPath];
			if (next !== void 0) {
				if ([
					"string",
					"number",
					"boolean"
				].includes(typeof next) && j < tokens.length - 1) continue;
				i += j - i + 1;
				break;
			}
		}
		current = next;
	}
	return current;
};
const getCleanedCode = (code) => code?.replace(/_/g, "-");
const consoleLogger = {
	type: "logger",
	log(args) {
		this.output("log", args);
	},
	warn(args) {
		this.output("warn", args);
	},
	error(args) {
		this.output("error", args);
	},
	output(type, args) {
		console?.[type]?.apply?.(console, args);
	}
};
var baseLogger = new class Logger {
	constructor(concreteLogger, options = {}) {
		this.init(concreteLogger, options);
	}
	init(concreteLogger, options = {}) {
		this.prefix = options.prefix || "i18next:";
		this.logger = concreteLogger || consoleLogger;
		this.options = options;
		this.debug = options.debug;
	}
	log(...args) {
		return this.forward(args, "log", "", true);
	}
	warn(...args) {
		return this.forward(args, "warn", "", true);
	}
	error(...args) {
		return this.forward(args, "error", "");
	}
	deprecate(...args) {
		return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
	}
	forward(args, lvl, prefix, debugOnly) {
		if (debugOnly && !this.debug) return null;
		args = args.map((a) => isString(a) ? a.replace(/[\r\n\x00-\x1F\x7F]/g, " ") : a);
		if (isString(args[0])) args[0] = `${prefix}${this.prefix} ${args[0]}`;
		return this.logger[lvl](args);
	}
	create(moduleName) {
		return new Logger(this.logger, {
			prefix: `${this.prefix}:${moduleName}:`,
			...this.options
		});
	}
	clone(options) {
		options = options || this.options;
		options.prefix = options.prefix || this.prefix;
		return new Logger(this.logger, options);
	}
}();
var EventEmitter = class {
	constructor() {
		this.observers = {};
	}
	on(events, listener) {
		events.split(" ").forEach((event) => {
			if (!this.observers[event]) this.observers[event] = /* @__PURE__ */ new Map();
			const numListeners = this.observers[event].get(listener) || 0;
			this.observers[event].set(listener, numListeners + 1);
		});
		return this;
	}
	off(event, listener) {
		if (!this.observers[event]) return;
		if (!listener) {
			delete this.observers[event];
			return;
		}
		this.observers[event].delete(listener);
	}
	once(event, listener) {
		const wrapper = (...args) => {
			listener(...args);
			this.off(event, wrapper);
		};
		this.on(event, wrapper);
		return this;
	}
	emit(event, ...args) {
		if (this.observers[event]) Array.from(this.observers[event].entries()).forEach(([observer, numTimesAdded]) => {
			for (let i = 0; i < numTimesAdded; i++) observer(...args);
		});
		if (this.observers["*"]) Array.from(this.observers["*"].entries()).forEach(([observer, numTimesAdded]) => {
			for (let i = 0; i < numTimesAdded; i++) observer(event, ...args);
		});
	}
};
const nonEmptyBundles = /* @__PURE__ */ new WeakSet();
var ResourceStore = class extends EventEmitter {
	constructor(data, options = {
		ns: ["translation"],
		defaultNS: "translation"
	}) {
		super();
		this.data = data || {};
		this.options = options;
		if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
		if (this.options.ignoreJSONStructure === void 0) this.options.ignoreJSONStructure = true;
	}
	addNamespaces(ns) {
		if (!this.options.ns.includes(ns)) this.options.ns.push(ns);
	}
	removeNamespaces(ns) {
		const index = this.options.ns.indexOf(ns);
		if (index > -1) this.options.ns.splice(index, 1);
	}
	getResource(lng, ns, key, options = {}) {
		const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
		const ignoreJSONStructure = options.ignoreJSONStructure !== void 0 ? options.ignoreJSONStructure : this.options.ignoreJSONStructure;
		let path;
		if (lng.includes(".")) path = lng.split(".");
		else {
			path = [lng, ns];
			if (key) {
				if (Array.isArray(key)) path.push(...key);
				else if (isString(key) && keySeparator) path.push(...key.split(keySeparator));
				else path.push(key);
			}
		}
		const result = getPath(this.data, path);
		if (!result && !ns && !key && lng.includes(".")) {
			lng = path[0];
			ns = path[1];
			key = path.slice(2).join(".");
		}
		if (result || !ignoreJSONStructure || !isString(key)) return result;
		return deepFind(this.data?.[lng]?.[ns], key, keySeparator);
	}
	addResource(lng, ns, key, value, options = { silent: false }) {
		const keySeparator = options.keySeparator !== void 0 ? options.keySeparator : this.options.keySeparator;
		let path = [lng, ns];
		if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
		if (lng.includes(".")) {
			path = lng.split(".");
			value = ns;
			ns = path[1];
		}
		this.addNamespaces(ns);
		setPath(this.data, path, value);
		if (!options.silent) this.emit("added", lng, ns, key, value);
	}
	addResources(lng, ns, resources, options = { silent: false }) {
		for (const m in resources) if (isString(resources[m]) || Array.isArray(resources[m])) this.addResource(lng, ns, m, resources[m], { silent: true });
		if (!options.silent) this.emit("added", lng, ns, resources);
	}
	addResourceBundle(lng, ns, resources, deep, overwrite, options = {
		silent: false,
		skipCopy: false
	}) {
		let path = [lng, ns];
		if (lng.includes(".")) {
			path = lng.split(".");
			deep = resources;
			resources = ns;
			ns = path[1];
		}
		this.addNamespaces(ns);
		let pack = getPath(this.data, path) || {};
		if (!options.skipCopy) resources = JSON.parse(JSON.stringify(resources));
		if (deep) deepExtend(pack, resources, overwrite);
		else pack = {
			...pack,
			...resources
		};
		setPath(this.data, path, pack);
		if (!options.silent) this.emit("added", lng, ns, resources);
	}
	removeResourceBundle(lng, ns) {
		if (this.hasResourceBundle(lng, ns)) delete this.data[lng][ns];
		this.removeNamespaces(ns);
		this.emit("removed", lng, ns);
	}
	hasResourceBundle(lng, ns) {
		return this.getResource(lng, ns) !== void 0;
	}
	getResourceBundle(lng, ns) {
		if (!ns) ns = this.options.defaultNS;
		return this.getResource(lng, ns);
	}
	getDataByLanguage(lng) {
		return this.data[lng];
	}
	hasLanguageSomeTranslations(lng) {
		const data = this.getDataByLanguage(lng);
		return !!(data && Object.keys(data) || []).find((v) => {
			const bundle = data[v];
			if (nonEmptyBundles.has(bundle)) return true;
			if (!bundle || Object.keys(bundle).length === 0) return false;
			if (typeof bundle === "object") nonEmptyBundles.add(bundle);
			return true;
		});
	}
	toJSON() {
		return this.data;
	}
};
var postProcessor = {
	processors: {},
	addPostProcessor(module) {
		this.processors[module.name] = module;
	},
	handle(processors, value, key, options, translator) {
		processors.forEach((processor) => {
			value = this.processors[processor]?.process(value, key, options, translator) ?? value;
		});
		return value;
	}
};
const PATH_KEY = Symbol("i18next/PATH_KEY");
function createProxy() {
	const state = [];
	const handler = Object.create(null);
	let proxy;
	handler.get = (target, key) => {
		proxy?.revoke?.();
		if (key === PATH_KEY) return state;
		state.push(key);
		proxy = Proxy.revocable(target, handler);
		return proxy.proxy;
	};
	return Proxy.revocable(Object.create(null), handler).proxy;
}
function keysFromSelector(selector, opts) {
	const { [PATH_KEY]: path } = selector(createProxy());
	const keySeparator = opts?.keySeparator ?? ".";
	const nsSeparator = opts?.nsSeparator ?? ":";
	const strict = opts?.enableSelector === "strict";
	if (path.length > 1 && nsSeparator) {
		const ns = opts?.ns;
		const nsList = strict ? Array.isArray(ns) ? ns : ns ? [ns] : null : Array.isArray(ns) ? ns : null;
		if (nsList) {
			if ((strict ? nsList : nsList.length > 1 ? nsList.slice(1) : []).includes(path[0])) return `${path[0]}${nsSeparator}${path.slice(1).join(keySeparator)}`;
		}
	}
	return path.join(keySeparator);
}
const shouldHandleAsObject = (res) => !isString(res) && typeof res !== "boolean" && typeof res !== "number";
var Translator = class Translator extends EventEmitter {
	constructor(services, options = {}) {
		super();
		copy([
			"resourceStore",
			"languageUtils",
			"pluralResolver",
			"interpolator",
			"backendConnector",
			"i18nFormat",
			"utils"
		], services, this);
		this.options = options;
		if (this.options.keySeparator === void 0) this.options.keySeparator = ".";
		this.logger = baseLogger.create("translator");
		this.checkedLoadedFor = {};
	}
	changeLanguage(lng) {
		if (lng) this.language = lng;
	}
	exists(key, o = { interpolation: {} }) {
		const opt = { ...o };
		if (key == null) return false;
		const resolved = this.resolve(key, opt);
		if (resolved?.res === void 0) return false;
		const isObject = shouldHandleAsObject(resolved.res);
		if (opt.returnObjects === false && isObject) return false;
		return true;
	}
	extractFromKey(key, opt) {
		let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
		if (nsSeparator === void 0) nsSeparator = ":";
		const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
		let namespaces = opt.ns || this.options.defaultNS || [];
		const wouldCheckForNsInKey = nsSeparator && key.includes(nsSeparator);
		const seemsNaturalLanguage = !this.options.userDefinedKeySeparator && !opt.keySeparator && !this.options.userDefinedNsSeparator && !opt.nsSeparator && !looksLikeObjectPath(key, nsSeparator, keySeparator);
		if (wouldCheckForNsInKey && !seemsNaturalLanguage) {
			const m = key.match(this.interpolator.nestingRegexp);
			if (m && m.length > 0) return {
				key,
				namespaces: isString(namespaces) ? [namespaces] : namespaces
			};
			const parts = key.split(nsSeparator);
			if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.includes(parts[0])) namespaces = parts.shift();
			key = parts.join(keySeparator);
		}
		return {
			key,
			namespaces: isString(namespaces) ? [namespaces] : namespaces
		};
	}
	translate(keys, o, lastKey) {
		let opt = typeof o === "object" ? { ...o } : o;
		if (typeof opt !== "object" && this.options.overloadTranslationOptionHandler) opt = this.options.overloadTranslationOptionHandler(arguments);
		if (typeof opt === "object") opt = { ...opt };
		if (!opt) opt = {};
		if (keys == null) return "";
		if (typeof keys === "function") keys = keysFromSelector(keys, {
			...this.options,
			...opt
		});
		if (!Array.isArray(keys)) keys = [String(keys)];
		keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
			...this.options,
			...opt
		}) : String(k));
		const returnDetails = opt.returnDetails !== void 0 ? opt.returnDetails : this.options.returnDetails;
		const keySeparator = opt.keySeparator !== void 0 ? opt.keySeparator : this.options.keySeparator;
		const { key, namespaces } = this.extractFromKey(keys[keys.length - 1], opt);
		const namespace = namespaces[namespaces.length - 1];
		let nsSeparator = opt.nsSeparator !== void 0 ? opt.nsSeparator : this.options.nsSeparator;
		if (nsSeparator === void 0) nsSeparator = ":";
		const lng = opt.lng || this.language;
		const appendNamespaceToCIMode = opt.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
		if (lng?.toLowerCase() === "cimode") {
			if (appendNamespaceToCIMode) {
				if (returnDetails) return {
					res: `${namespace}${nsSeparator}${key}`,
					usedKey: key,
					exactUsedKey: key,
					usedLng: lng,
					usedNS: namespace,
					usedParams: this.getUsedParamsDetails(opt)
				};
				return `${namespace}${nsSeparator}${key}`;
			}
			if (returnDetails) return {
				res: key,
				usedKey: key,
				exactUsedKey: key,
				usedLng: lng,
				usedNS: namespace,
				usedParams: this.getUsedParamsDetails(opt)
			};
			return key;
		}
		const resolved = this.resolve(keys, opt);
		let res = resolved?.res;
		const resUsedKey = resolved?.usedKey || key;
		const resExactUsedKey = resolved?.exactUsedKey || key;
		const noObject = [
			"[object Number]",
			"[object Function]",
			"[object RegExp]"
		];
		const joinArrays = opt.joinArrays !== void 0 ? opt.joinArrays : this.options.joinArrays;
		const handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
		const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
		const hasDefaultValue = Translator.hasDefaultValue(opt);
		const defaultValueSuffix = needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, opt) : "";
		const defaultValueSuffixOrdinalFallback = opt.ordinal && needsPluralHandling ? this.pluralResolver.getSuffix(lng, opt.count, { ordinal: false }) : "";
		const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
		const defaultValue = needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] || opt[`defaultValue${defaultValueSuffix}`] || opt[`defaultValue${defaultValueSuffixOrdinalFallback}`] || opt.defaultValue;
		let resForObjHndl = res;
		if (handleAsObjectInI18nFormat && !res && hasDefaultValue) resForObjHndl = defaultValue;
		const handleAsObject = shouldHandleAsObject(resForObjHndl);
		const resType = Object.prototype.toString.apply(resForObjHndl);
		if (handleAsObjectInI18nFormat && resForObjHndl && handleAsObject && !noObject.includes(resType) && !(isString(joinArrays) && Array.isArray(resForObjHndl))) {
			if (!opt.returnObjects && !this.options.returnObjects) {
				if (!this.options.returnedObjectHandler) this.logger.warn("accessing an object - but returnObjects options is not enabled!");
				const r = this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, resForObjHndl, {
					...opt,
					ns: namespaces
				}) : `key '${key} (${this.language})' returned an object instead of string.`;
				if (returnDetails) {
					resolved.res = r;
					resolved.usedParams = this.getUsedParamsDetails(opt);
					return resolved;
				}
				return r;
			}
			if (keySeparator) {
				const resTypeIsArray = Array.isArray(resForObjHndl);
				const copy = resTypeIsArray ? [] : {};
				const newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
				for (const m in resForObjHndl) if (Object.prototype.hasOwnProperty.call(resForObjHndl, m)) {
					const deepKey = `${newKeyToUse}${keySeparator}${m}`;
					if (hasDefaultValue && !res) copy[m] = this.translate(deepKey, {
						...opt,
						defaultValue: shouldHandleAsObject(defaultValue) ? defaultValue[m] : void 0,
						joinArrays: false,
						ns: namespaces
					});
					else copy[m] = this.translate(deepKey, {
						...opt,
						joinArrays: false,
						ns: namespaces
					});
					if (copy[m] === deepKey) copy[m] = resForObjHndl[m];
				}
				res = copy;
			}
		} else if (handleAsObjectInI18nFormat && isString(joinArrays) && Array.isArray(res)) {
			res = res.join(joinArrays);
			if (res) res = this.extendTranslation(res, keys, opt, lastKey);
		} else {
			let usedDefault = false;
			let usedKey = false;
			if (!this.isValidLookup(res) && hasDefaultValue) {
				usedDefault = true;
				res = defaultValue;
			}
			if (!this.isValidLookup(res)) {
				usedKey = true;
				res = key;
			}
			const resForMissing = (opt.missingKeyNoValueFallbackToKey || this.options.missingKeyNoValueFallbackToKey) && usedKey ? void 0 : res;
			const updateMissing = hasDefaultValue && defaultValue !== res && this.options.updateMissing;
			if (usedKey || usedDefault || updateMissing) {
				this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, needsPluralHandling && !updateMissing ? `${key}${this.pluralResolver.getSuffix(lng, opt.count, opt)}` : key, updateMissing ? defaultValue : res);
				if (keySeparator) {
					const fk = this.resolve(key, {
						...opt,
						keySeparator: false
					});
					if (fk && fk.res) this.logger.warn("Seems the loaded translations were in flat JSON format instead of nested. Either set keySeparator: false on init or make sure your translations are published in nested format.");
				}
				let lngs = [];
				const fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, opt.lng || this.language);
				if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) for (let i = 0; i < fallbackLngs.length; i++) lngs.push(fallbackLngs[i]);
				else if (this.options.saveMissingTo === "all") lngs = this.languageUtils.toResolveHierarchy(opt.lng || this.language);
				else lngs.push(opt.lng || this.language);
				const send = (l, k, specificDefaultValue) => {
					const defaultForMissing = hasDefaultValue && specificDefaultValue !== res ? specificDefaultValue : resForMissing;
					if (this.options.missingKeyHandler) this.options.missingKeyHandler(l, namespace, k, defaultForMissing, updateMissing, opt);
					else if (this.backendConnector?.saveMissing) this.backendConnector.saveMissing(l, namespace, k, defaultForMissing, updateMissing, opt);
					this.emit("missingKey", l, namespace, k, res);
				};
				if (this.options.saveMissing) {
					if (this.options.saveMissingPlurals && needsPluralHandling) lngs.forEach((language) => {
						const suffixes = this.pluralResolver.getSuffixes(language, opt);
						if (needsZeroSuffixLookup && opt[`defaultValue${this.options.pluralSeparator}zero`] && !suffixes.includes(`${this.options.pluralSeparator}zero`)) suffixes.push(`${this.options.pluralSeparator}zero`);
						suffixes.forEach((suffix) => {
							send([language], key + suffix, opt[`defaultValue${suffix}`] || defaultValue);
						});
					});
					else send(lngs, key, defaultValue);
				}
			}
			res = this.extendTranslation(res, keys, opt, resolved, lastKey);
			if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = `${namespace}${nsSeparator}${key}`;
			if ((usedKey || usedDefault) && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(this.options.appendNamespaceToMissingKey ? `${namespace}${nsSeparator}${key}` : key, usedDefault ? res : void 0, opt);
		}
		if (returnDetails) {
			resolved.res = res;
			resolved.usedParams = this.getUsedParamsDetails(opt);
			return resolved;
		}
		return res;
	}
	extendTranslation(res, key, opt, resolved, lastKey) {
		if (this.i18nFormat?.parse) res = this.i18nFormat.parse(res, {
			...this.options.interpolation.defaultVariables,
			...opt
		}, opt.lng || this.language || resolved.usedLng, resolved.usedNS, resolved.usedKey, { resolved });
		else if (!opt.skipInterpolation) {
			if (opt.interpolation) this.interpolator.init({
				...opt,
				interpolation: {
					...this.options.interpolation,
					...opt.interpolation
				}
			});
			const skipOnVariables = isString(res) && (opt?.interpolation?.skipOnVariables !== void 0 ? opt.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables);
			let nestBef;
			if (skipOnVariables) {
				const nb = res.match(this.interpolator.nestingRegexp);
				nestBef = nb && nb.length;
			}
			let data = opt.replace && !isString(opt.replace) ? opt.replace : opt;
			if (this.options.interpolation.defaultVariables) data = {
				...this.options.interpolation.defaultVariables,
				...data
			};
			res = this.interpolator.interpolate(res, data, opt.lng || this.language || resolved.usedLng, opt);
			if (skipOnVariables) {
				const na = res.match(this.interpolator.nestingRegexp);
				const nestAft = na && na.length;
				if (nestBef < nestAft) opt.nest = false;
			}
			if (!opt.lng && resolved && resolved.res) opt.lng = this.language || resolved.usedLng;
			if (opt.nest !== false) res = this.interpolator.nest(res, (...args) => {
				if (lastKey?.[0] === args[0] && !opt.context) {
					this.logger.warn(`It seems you are nesting recursively key: ${args[0]} in key: ${key[0]}`);
					return null;
				}
				return this.translate(...args, key);
			}, opt);
			if (opt.interpolation) this.interpolator.reset();
		}
		const postProcess = opt.postProcess || this.options.postProcess;
		const postProcessorNames = isString(postProcess) ? [postProcess] : postProcess;
		if (res != null && postProcessorNames?.length && opt.applyPostProcessor !== false) res = postProcessor.handle(postProcessorNames, res, key, this.options && this.options.postProcessPassResolved ? {
			i18nResolved: {
				...resolved,
				usedParams: this.getUsedParamsDetails(opt)
			},
			...opt
		} : opt, this);
		return res;
	}
	resolve(keys, opt = {}) {
		let found;
		let usedKey;
		let exactUsedKey;
		let usedLng;
		let usedNS;
		if (isString(keys)) keys = [keys];
		if (Array.isArray(keys)) keys = keys.map((k) => typeof k === "function" ? keysFromSelector(k, {
			...this.options,
			...opt
		}) : k);
		keys.forEach((k) => {
			if (this.isValidLookup(found)) return;
			const extracted = this.extractFromKey(k, opt);
			const key = extracted.key;
			usedKey = key;
			let namespaces = extracted.namespaces;
			if (this.options.fallbackNS) namespaces = namespaces.concat(this.options.fallbackNS);
			const needsPluralHandling = opt.count !== void 0 && !isString(opt.count);
			const needsZeroSuffixLookup = needsPluralHandling && !opt.ordinal && opt.count === 0;
			const needsContextHandling = opt.context !== void 0 && (isString(opt.context) || typeof opt.context === "number") && opt.context !== "";
			const codes = opt.lngs ? opt.lngs : this.languageUtils.toResolveHierarchy(opt.lng || this.language, opt.fallbackLng);
			namespaces.forEach((ns) => {
				if (this.isValidLookup(found)) return;
				usedNS = ns;
				if (!this.checkedLoadedFor[`${codes[0]}-${ns}`] && this.utils?.hasLoadedNamespace && !this.utils?.hasLoadedNamespace(usedNS)) {
					this.checkedLoadedFor[`${codes[0]}-${ns}`] = true;
					this.logger.warn(`key "${usedKey}" for languages "${codes.join(", ")}" won't get resolved as namespace "${usedNS}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
				}
				codes.forEach((code) => {
					if (this.isValidLookup(found)) return;
					usedLng = code;
					const finalKeys = [key];
					if (this.i18nFormat?.addLookupKeys) this.i18nFormat.addLookupKeys(finalKeys, key, code, ns, opt);
					else {
						let pluralSuffix;
						if (needsPluralHandling) pluralSuffix = this.pluralResolver.getSuffix(code, opt.count, opt);
						const zeroSuffix = `${this.options.pluralSeparator}zero`;
						const ordinalPrefix = `${this.options.pluralSeparator}ordinal${this.options.pluralSeparator}`;
						if (needsPluralHandling) {
							if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(key + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
							finalKeys.push(key + pluralSuffix);
							if (needsZeroSuffixLookup) finalKeys.push(key + zeroSuffix);
						}
						if (needsContextHandling) {
							const contextKey = `${key}${this.options.contextSeparator || "_"}${opt.context}`;
							finalKeys.push(contextKey);
							if (needsPluralHandling) {
								if (opt.ordinal && pluralSuffix.startsWith(ordinalPrefix)) finalKeys.push(contextKey + pluralSuffix.replace(ordinalPrefix, this.options.pluralSeparator));
								finalKeys.push(contextKey + pluralSuffix);
								if (needsZeroSuffixLookup) finalKeys.push(contextKey + zeroSuffix);
							}
						}
					}
					let possibleKey;
					while (possibleKey = finalKeys.pop()) if (!this.isValidLookup(found)) {
						exactUsedKey = possibleKey;
						found = this.getResource(code, ns, possibleKey, opt);
					}
				});
			});
		});
		return {
			res: found,
			usedKey,
			exactUsedKey,
			usedLng,
			usedNS
		};
	}
	isValidLookup(res) {
		return res !== void 0 && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
	}
	getResource(code, ns, key, options = {}) {
		if (this.i18nFormat?.getResource) return this.i18nFormat.getResource(code, ns, key, options);
		return this.resourceStore.getResource(code, ns, key, options);
	}
	getUsedParamsDetails(options = {}) {
		const optionsKeys = [
			"defaultValue",
			"ordinal",
			"context",
			"replace",
			"lng",
			"lngs",
			"fallbackLng",
			"ns",
			"keySeparator",
			"nsSeparator",
			"returnObjects",
			"returnDetails",
			"joinArrays",
			"postProcess",
			"interpolation"
		];
		const useOptionsReplaceForData = options.replace && !isString(options.replace);
		let data = useOptionsReplaceForData ? options.replace : options;
		if (useOptionsReplaceForData && typeof options.count !== "undefined") data = {
			...data,
			count: options.count
		};
		if (this.options.interpolation.defaultVariables) data = {
			...this.options.interpolation.defaultVariables,
			...data
		};
		if (!useOptionsReplaceForData) {
			data = { ...data };
			for (const key of optionsKeys) delete data[key];
		}
		return data;
	}
	static hasDefaultValue(options) {
		const prefix = "defaultValue";
		for (const option in options) if (Object.prototype.hasOwnProperty.call(options, option) && option.startsWith(prefix) && void 0 !== options[option]) return true;
		return false;
	}
};
var LanguageUtil = class {
	constructor(options) {
		this.options = options;
		this.supportedLngs = this.options.supportedLngs || false;
		this.logger = baseLogger.create("languageUtils");
		this.resolveHierarchyCache = {};
	}
	clearCache() {
		this.resolveHierarchyCache = {};
	}
	getScriptPartFromCode(code) {
		code = getCleanedCode(code);
		if (!code || !code.includes("-")) return null;
		const p = code.split("-");
		if (p.length === 2) return null;
		p.pop();
		if (p[p.length - 1].toLowerCase() === "x") return null;
		return this.formatLanguageCode(p.join("-"));
	}
	getLanguagePartFromCode(code) {
		code = getCleanedCode(code);
		if (!code || !code.includes("-")) return code;
		const p = code.split("-");
		return this.formatLanguageCode(p[0]);
	}
	formatLanguageCode(code) {
		if (isString(code) && code.includes("-")) {
			let formattedCode;
			try {
				formattedCode = Intl.getCanonicalLocales(code)[0];
			} catch (e) {}
			if (formattedCode && this.options.lowerCaseLng) formattedCode = formattedCode.toLowerCase();
			if (formattedCode) return formattedCode;
			if (this.options.lowerCaseLng) return code.toLowerCase();
			return code;
		}
		return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
	}
	isSupportedCode(code) {
		if (this.options.load === "languageOnly" || this.options.nonExplicitSupportedLngs) code = this.getLanguagePartFromCode(code);
		return !this.supportedLngs || !this.supportedLngs.length || this.supportedLngs.includes(code);
	}
	getBestMatchFromCodes(codes) {
		if (!codes) return null;
		let found;
		codes.forEach((code) => {
			if (found) return;
			const cleanedLng = this.formatLanguageCode(code);
			if (!this.options.supportedLngs || this.isSupportedCode(cleanedLng)) found = cleanedLng;
		});
		if (!found && this.options.supportedLngs) codes.forEach((code) => {
			if (found) return;
			const lngScOnly = this.getScriptPartFromCode(code);
			if (this.isSupportedCode(lngScOnly)) return found = lngScOnly;
			const lngOnly = this.getLanguagePartFromCode(code);
			if (this.isSupportedCode(lngOnly)) return found = lngOnly;
			found = this.options.supportedLngs.find((supportedLng) => {
				if (supportedLng === lngOnly) return true;
				if (!supportedLng.includes("-") && !lngOnly.includes("-")) return false;
				if (supportedLng.includes("-") && !lngOnly.includes("-") && supportedLng.slice(0, supportedLng.indexOf("-")) === lngOnly) return true;
				if (supportedLng.startsWith(lngOnly) && lngOnly.length > 1) return true;
				return false;
			});
		});
		if (!found) found = this.getFallbackCodes(this.options.fallbackLng)[0];
		return found;
	}
	getFallbackCodes(fallbacks, code) {
		if (!fallbacks) return [];
		if (typeof fallbacks === "function") fallbacks = fallbacks(code);
		if (isString(fallbacks)) fallbacks = [fallbacks];
		if (Array.isArray(fallbacks)) return fallbacks;
		if (!code) return fallbacks.default || [];
		let found = fallbacks[code];
		if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
		if (!found) found = fallbacks[this.formatLanguageCode(code)];
		if (!found) found = fallbacks[this.getLanguagePartFromCode(code)];
		if (!found) found = fallbacks.default;
		return found || [];
	}
	toResolveHierarchy(code, fallbackCode) {
		const fallbackLng = this.options.fallbackLng;
		const fallbackLngKey = Array.isArray(fallbackLng) ? fallbackLng.join("|") : fallbackLng;
		if (fallbackLngKey !== this._cachedFallbackLng) {
			this.resolveHierarchyCache = {};
			this._cachedFallbackLng = fallbackLngKey;
		}
		const hasCacheableFallback = fallbackCode === void 0 || fallbackCode === false || isString(fallbackCode);
		const usesUncacheableOptionsFallback = fallbackCode === void 0 && typeof this.options.fallbackLng === "function";
		const cacheable = isString(code) && hasCacheableFallback && !usesUncacheableOptionsFallback;
		let cacheKey = null;
		if (cacheable) {
			let fallbackCacheKey;
			if (fallbackCode === void 0) fallbackCacheKey = "undefined";
			else if (fallbackCode === false) fallbackCacheKey = "boolean:false";
			else fallbackCacheKey = `string:${fallbackCode}`;
			cacheKey = `${code.length}:${code}|${fallbackCacheKey}`;
		}
		if (cacheKey !== null) {
			const cached = this.resolveHierarchyCache[cacheKey];
			if (cached !== void 0) return cached.slice();
		}
		const fallbackCodes = this.getFallbackCodes((fallbackCode === false ? [] : fallbackCode) || this.options.fallbackLng || [], code);
		const codes = [];
		const addCode = (c) => {
			if (!c) return;
			if (this.isSupportedCode(c)) codes.push(c);
			else this.logger.warn(`rejecting language code not found in supportedLngs: ${c}`);
		};
		if (isString(code) && (code.includes("-") || code.includes("_"))) {
			if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
			if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
			if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
		} else if (isString(code)) addCode(this.formatLanguageCode(code));
		fallbackCodes.forEach((fc) => {
			if (!codes.includes(fc)) addCode(this.formatLanguageCode(fc));
		});
		if (cacheKey !== null) {
			this.resolveHierarchyCache[cacheKey] = codes;
			return codes.slice();
		}
		return codes;
	}
};
const suffixesOrder = {
	zero: 0,
	one: 1,
	two: 2,
	few: 3,
	many: 4,
	other: 5
};
const dummyRule = {
	select: (count) => count === 1 ? "one" : "other",
	resolvedOptions: () => ({ pluralCategories: ["one", "other"] })
};
var PluralResolver = class {
	constructor(languageUtils, options = {}) {
		this.languageUtils = languageUtils;
		this.options = options;
		this.logger = baseLogger.create("pluralResolver");
		this.pluralRulesCache = {};
	}
	clearCache() {
		this.pluralRulesCache = {};
	}
	getRule(code, options = {}) {
		const cleanedCode = getCleanedCode(code === "dev" ? "en" : code);
		const type = options.ordinal ? "ordinal" : "cardinal";
		const cacheKey = JSON.stringify({
			cleanedCode,
			type
		});
		if (cacheKey in this.pluralRulesCache) return this.pluralRulesCache[cacheKey];
		let rule;
		try {
			rule = new Intl.PluralRules(cleanedCode, { type });
		} catch (err) {
			if (typeof Intl === "undefined") {
				this.logger.error("No Intl support, please use an Intl polyfill!");
				return dummyRule;
			}
			if (!code.match(/-|_/)) return dummyRule;
			const lngPart = this.languageUtils.getLanguagePartFromCode(code);
			rule = this.getRule(lngPart, options);
		}
		this.pluralRulesCache[cacheKey] = rule;
		return rule;
	}
	needsPlural(code, options = {}) {
		let rule = this.getRule(code, options);
		if (!rule) rule = this.getRule("dev", options);
		return rule?.resolvedOptions().pluralCategories.length > 1;
	}
	getPluralFormsOfKey(code, key, options = {}) {
		return this.getSuffixes(code, options).map((suffix) => `${key}${suffix}`);
	}
	getSuffixes(code, options = {}) {
		let rule = this.getRule(code, options);
		if (!rule) rule = this.getRule("dev", options);
		if (!rule) return [];
		return rule.resolvedOptions().pluralCategories.sort((pluralCategory1, pluralCategory2) => suffixesOrder[pluralCategory1] - suffixesOrder[pluralCategory2]).map((pluralCategory) => `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${pluralCategory}`);
	}
	getSuffix(code, count, options = {}) {
		const rule = this.getRule(code, options);
		if (rule) return `${this.options.prepend}${options.ordinal ? `ordinal${this.options.prepend}` : ""}${rule.select(count)}`;
		this.logger.warn(`no plural rule found for: ${code}`);
		return this.getSuffix("dev", count, options);
	}
};
const deepFindWithDefaults = (data, defaultData, key, keySeparator = ".", ignoreJSONStructure = true) => {
	let path = getPathWithDefaults(data, defaultData, key);
	if (!path && ignoreJSONStructure && isString(key)) {
		path = deepFind(data, key, keySeparator);
		if (path === void 0) path = deepFind(defaultData, key, keySeparator);
	}
	return path;
};
const regexSafe = (val) => val.replace(/\$/g, "$$$$");
var Interpolator = class {
	constructor(options = {}) {
		this.logger = baseLogger.create("interpolator");
		this.options = options;
		this.format = options?.interpolation?.format || ((value) => value);
		this.init(options);
	}
	init(options = {}) {
		if (!options.interpolation) options.interpolation = { escapeValue: true };
		const { escape: escape$1, escapeValue, useRawValueToEscape, prefix, prefixEscaped, suffix, suffixEscaped, formatSeparator, unescapeSuffix, unescapePrefix, nestingPrefix, nestingPrefixEscaped, nestingSuffix, nestingSuffixEscaped, nestingOptionsSeparator, maxReplaces, alwaysFormat } = options.interpolation;
		this.escape = escape$1 !== void 0 ? escape$1 : escape;
		this.escapeValue = escapeValue !== void 0 ? escapeValue : true;
		this.useRawValueToEscape = useRawValueToEscape !== void 0 ? useRawValueToEscape : false;
		this.prefix = prefix ? regexEscape(prefix) : prefixEscaped || "{{";
		this.suffix = suffix ? regexEscape(suffix) : suffixEscaped || "}}";
		this.formatSeparator = formatSeparator || ",";
		this.unescapePrefix = unescapeSuffix ? "" : unescapePrefix ? regexEscape(unescapePrefix) : "-";
		this.unescapeSuffix = this.unescapePrefix ? "" : unescapeSuffix ? regexEscape(unescapeSuffix) : "";
		this.nestingPrefix = nestingPrefix ? regexEscape(nestingPrefix) : nestingPrefixEscaped || regexEscape("$t(");
		this.nestingSuffix = nestingSuffix ? regexEscape(nestingSuffix) : nestingSuffixEscaped || regexEscape(")");
		this.nestingOptionsSeparator = nestingOptionsSeparator || ",";
		this.maxReplaces = maxReplaces || 1e3;
		this.alwaysFormat = alwaysFormat !== void 0 ? alwaysFormat : false;
		this.resetRegExp();
	}
	reset() {
		if (this.options) this.init(this.options);
	}
	resetRegExp() {
		const getOrResetRegExp = (existingRegExp, pattern) => {
			if (existingRegExp?.source === pattern) {
				existingRegExp.lastIndex = 0;
				return existingRegExp;
			}
			return new RegExp(pattern, "g");
		};
		this.regexp = getOrResetRegExp(this.regexp, `${this.prefix}(.+?)${this.suffix}`);
		this.regexpUnescape = getOrResetRegExp(this.regexpUnescape, `${this.prefix}${this.unescapePrefix}(.+?)${this.unescapeSuffix}${this.suffix}`);
		this.nestingRegexp = getOrResetRegExp(this.nestingRegexp, `${this.nestingPrefix}((?:[^()"']|"[^"]*"|'[^']*'|\\((?:[^()"']|"[^"]*"|'[^']*')*\\))*?)${this.nestingSuffix}`);
	}
	interpolate(str, data, lng, options) {
		let match;
		let value;
		let replaces;
		const defaultData = this.options && this.options.interpolation && this.options.interpolation.defaultVariables || {};
		const handleFormat = (key) => {
			if (!key.includes(this.formatSeparator)) {
				const path = deepFindWithDefaults(data, defaultData, key, this.options.keySeparator, this.options.ignoreJSONStructure);
				return this.alwaysFormat ? this.format(path, void 0, lng, {
					...options,
					...data,
					interpolationkey: key
				}) : path;
			}
			const p = key.split(this.formatSeparator);
			const k = p.shift().trim();
			const f = p.join(this.formatSeparator).trim();
			return this.format(deepFindWithDefaults(data, defaultData, k, this.options.keySeparator, this.options.ignoreJSONStructure), f, lng, {
				...options,
				...data,
				interpolationkey: k
			});
		};
		this.resetRegExp();
		if (!this.escapeValue && typeof str === "string" && /\$t\([^)]*\{[^}]*\{\{/.test(str)) this.logger.warn("nesting options string contains interpolated variables with escapeValue: false — if any of those values are attacker-controlled they can inject additional nesting options (e.g. redirect lng/ns). Sanitise untrusted input before passing it to t(), or keep escapeValue: true.");
		const missingInterpolationHandler = options?.missingInterpolationHandler || this.options.missingInterpolationHandler;
		const skipOnVariables = options?.interpolation?.skipOnVariables !== void 0 ? options.interpolation.skipOnVariables : this.options.interpolation.skipOnVariables;
		[{
			regex: this.regexpUnescape,
			safeValue: (val) => val
		}, {
			regex: this.regexp,
			safeValue: (val) => this.escapeValue ? this.escape(val) : val
		}].forEach((todo) => {
			replaces = 0;
			while (match = todo.regex.exec(str)) {
				const matchedVar = match[1].trim();
				value = handleFormat(matchedVar);
				if (value === void 0) {
					if (typeof missingInterpolationHandler === "function") {
						const temp = missingInterpolationHandler(str, match, options);
						value = isString(temp) ? temp : "";
					} else if (options && Object.prototype.hasOwnProperty.call(options, matchedVar)) value = "";
					else if (skipOnVariables) {
						value = match[0];
						continue;
					} else {
						this.logger.warn(`missed to pass in variable ${matchedVar} for interpolating ${str}`);
						value = "";
					}
				} else if (!isString(value) && !this.useRawValueToEscape) value = makeString(value);
				const safeValue = todo.safeValue(value);
				str = str.replace(match[0], regexSafe(safeValue));
				if (skipOnVariables) {
					todo.regex.lastIndex += safeValue.length;
					todo.regex.lastIndex -= match[0].length;
				} else todo.regex.lastIndex = 0;
				replaces++;
				if (replaces >= this.maxReplaces) break;
			}
		});
		return str;
	}
	nest(str, fc, options = {}) {
		let match;
		let value;
		let clonedOptions;
		const handleHasOptions = (key, inheritedOptions) => {
			const sep = this.nestingOptionsSeparator;
			if (!key.includes(sep)) return key;
			const c = key.split(new RegExp(`${regexEscape(sep)}[ ]*{`));
			let optionsString = `{${c[1]}`;
			key = c[0];
			optionsString = this.interpolate(optionsString, clonedOptions);
			const matchedSingleQuotes = optionsString.match(/'/g);
			const matchedDoubleQuotes = optionsString.match(/"/g);
			if ((matchedSingleQuotes?.length ?? 0) % 2 === 0 && !matchedDoubleQuotes || (matchedDoubleQuotes?.length ?? 0) % 2 !== 0) optionsString = optionsString.replace(/'/g, "\"");
			try {
				clonedOptions = JSON.parse(optionsString);
				if (inheritedOptions) clonedOptions = {
					...inheritedOptions,
					...clonedOptions
				};
			} catch (e) {
				this.logger.warn(`failed parsing options string in nesting for key ${key}`, e);
				return `${key}${sep}${optionsString}`;
			}
			if (clonedOptions.defaultValue && clonedOptions.defaultValue.includes(this.prefix)) delete clonedOptions.defaultValue;
			return key;
		};
		const nestingRegexp = new RegExp(this.nestingRegexp);
		let out = "";
		let lastEnd = 0;
		while (match = nestingRegexp.exec(str)) {
			let formatters = [];
			clonedOptions = { ...options };
			clonedOptions = clonedOptions.replace && !isString(clonedOptions.replace) ? clonedOptions.replace : clonedOptions;
			clonedOptions.applyPostProcessor = false;
			delete clonedOptions.defaultValue;
			const keyEndIndex = /{.*}/s.test(match[1]) ? match[1].lastIndexOf("}") + 1 : match[1].indexOf(this.formatSeparator);
			if (keyEndIndex !== -1) {
				formatters = match[1].slice(keyEndIndex).split(this.formatSeparator).map((elem) => elem.trim()).filter(Boolean);
				match[1] = match[1].slice(0, keyEndIndex);
			}
			value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
			if (value && match[0] === str && !isString(value)) return value;
			if (!isString(value)) value = makeString(value);
			if (!value) {
				this.logger.warn(`missed to resolve ${match[1]} for nesting ${str}`);
				value = "";
			}
			if (formatters.length) value = formatters.reduce((v, f) => this.format(v, f, options.lng, {
				...options,
				interpolationkey: match[1].trim()
			}), value.trim());
			out += str.slice(lastEnd, match.index) + makeString(value);
			lastEnd = nestingRegexp.lastIndex;
			this.regexp.lastIndex = 0;
		}
		return lastEnd ? out + str.slice(lastEnd) : str;
	}
};
const parseFormatStr = (formatStr) => {
	let formatName = formatStr.toLowerCase().trim();
	const formatOptions = {};
	if (formatStr.includes("(")) {
		const p = formatStr.split("(");
		formatName = p[0].toLowerCase().trim();
		const optStr = p[1].slice(0, -1);
		if (formatName === "currency" && !optStr.includes(":")) {
			if (!formatOptions.currency) formatOptions.currency = optStr.trim();
		} else if (formatName === "relativetime" && !optStr.includes(":")) {
			if (!formatOptions.range) formatOptions.range = optStr.trim();
		} else optStr.split(";").forEach((opt) => {
			if (opt) {
				const [key, ...rest] = opt.split(":");
				const val = rest.join(":").trim().replace(/^'+|'+$/g, "");
				const trimmedKey = key.trim();
				if (!formatOptions[trimmedKey]) formatOptions[trimmedKey] = val;
				if (val === "false") formatOptions[trimmedKey] = false;
				if (val === "true") formatOptions[trimmedKey] = true;
				if (!isNaN(val)) formatOptions[trimmedKey] = parseInt(val, 10);
			}
		});
	}
	return {
		formatName,
		formatOptions
	};
};
const createCachedFormatter = (fn) => {
	const cache = {};
	return (v, l, o) => {
		let optForCache = o;
		if (o && o.interpolationkey && o.formatParams && o.formatParams[o.interpolationkey] && o[o.interpolationkey]) optForCache = {
			...optForCache,
			[o.interpolationkey]: void 0
		};
		const key = l + JSON.stringify(optForCache);
		let frm = cache[key];
		if (!frm) {
			frm = fn(getCleanedCode(l), o);
			cache[key] = frm;
		}
		return frm(v);
	};
};
const createNonCachedFormatter = (fn) => (v, l, o) => fn(getCleanedCode(l), o)(v);
var Formatter = class {
	constructor(options = {}) {
		this.logger = baseLogger.create("formatter");
		this.options = options;
		this.init(options);
	}
	init(services, options = { interpolation: {} }) {
		this.formatSeparator = options.interpolation.formatSeparator || ",";
		const cf = options.cacheInBuiltFormats ? createCachedFormatter : createNonCachedFormatter;
		this.formats = {
			number: cf((lng, opt) => {
				const formatter = new Intl.NumberFormat(lng, { ...opt });
				return (val) => formatter.format(val);
			}),
			currency: cf((lng, opt) => {
				const formatter = new Intl.NumberFormat(lng, {
					...opt,
					style: "currency"
				});
				return (val) => formatter.format(val);
			}),
			datetime: cf((lng, opt) => {
				const formatter = new Intl.DateTimeFormat(lng, { ...opt });
				return (val) => formatter.format(val);
			}),
			relativetime: cf((lng, opt) => {
				const formatter = new Intl.RelativeTimeFormat(lng, { ...opt });
				return (val) => formatter.format(val, opt.range || "day");
			}),
			list: cf((lng, opt) => {
				const formatter = new Intl.ListFormat(lng, { ...opt });
				return (val) => formatter.format(val);
			})
		};
	}
	add(name, fc) {
		this.formats[name.toLowerCase().trim()] = fc;
	}
	addCached(name, fc) {
		this.formats[name.toLowerCase().trim()] = createCachedFormatter(fc);
	}
	format(value, format, lng, options = {}) {
		if (!format) return value;
		if (value == null) return value;
		const rawFormats = format.split(this.formatSeparator);
		const formats = [];
		for (let i = 0; i < rawFormats.length; i++) {
			let f = rawFormats[i];
			while (f.indexOf("(") > -1 && !f.includes(")") && i + 1 < rawFormats.length) f = `${f}${this.formatSeparator}${rawFormats[++i]}`;
			formats.push(f);
		}
		return formats.reduce((mem, f) => {
			const { formatName, formatOptions } = parseFormatStr(f);
			if (this.formats[formatName]) {
				let formatted = mem;
				try {
					const valOptions = options?.formatParams?.[options.interpolationkey] || {};
					const l = valOptions.locale || valOptions.lng || options.locale || options.lng || lng;
					formatted = this.formats[formatName](mem, l, {
						...formatOptions,
						...options,
						...valOptions
					});
				} catch (error) {
					this.logger.warn(error);
				}
				return formatted;
			} else this.logger.warn(`there was no format function for ${formatName}`);
			return mem;
		}, value);
	}
};
const removePending = (q, name) => {
	if (q.pending[name] !== void 0) {
		delete q.pending[name];
		q.pendingCount--;
	}
};
var Connector = class extends EventEmitter {
	constructor(backend, store, services, options = {}) {
		super();
		this.backend = backend;
		this.store = store;
		this.services = services;
		this.languageUtils = services.languageUtils;
		this.options = options;
		this.logger = baseLogger.create("backendConnector");
		this.waitingReads = [];
		this.maxParallelReads = options.maxParallelReads || 10;
		this.readingCalls = 0;
		this.maxRetries = options.maxRetries >= 0 ? options.maxRetries : 5;
		this.retryTimeout = options.retryTimeout >= 1 ? options.retryTimeout : 350;
		this.state = {};
		this.queue = [];
		this.backend?.init?.(services, options.backend, options);
	}
	queueLoad(languages, namespaces, options, callback) {
		const toLoad = {};
		const pending = {};
		const toLoadLanguages = {};
		const toLoadNamespaces = {};
		languages.forEach((lng) => {
			let hasAllNamespaces = true;
			namespaces.forEach((ns) => {
				const name = `${lng}|${ns}`;
				if (!options.reload && this.store.hasResourceBundle(lng, ns)) this.state[name] = 2;
				else if (this.state[name] < 0);
				else if (this.state[name] === 1) {
					if (pending[name] === void 0) pending[name] = true;
				} else {
					this.state[name] = 1;
					hasAllNamespaces = false;
					if (pending[name] === void 0) pending[name] = true;
					if (toLoad[name] === void 0) toLoad[name] = true;
					if (toLoadNamespaces[ns] === void 0) toLoadNamespaces[ns] = true;
				}
			});
			if (!hasAllNamespaces) toLoadLanguages[lng] = true;
		});
		if (Object.keys(toLoad).length || Object.keys(pending).length) this.queue.push({
			pending,
			pendingCount: Object.keys(pending).length,
			loaded: {},
			errors: [],
			callback
		});
		return {
			toLoad: Object.keys(toLoad),
			pending: Object.keys(pending),
			toLoadLanguages: Object.keys(toLoadLanguages),
			toLoadNamespaces: Object.keys(toLoadNamespaces)
		};
	}
	loaded(name, err, data) {
		const s = name.split("|");
		const lng = s[0];
		const ns = s[1];
		if (err) this.emit("failedLoading", lng, ns, err);
		if (!err && data) this.store.addResourceBundle(lng, ns, data, void 0, void 0, { skipCopy: true });
		this.state[name] = err ? -1 : 2;
		if (err && data) this.state[name] = 0;
		const loaded = {};
		this.queue.forEach((q) => {
			pushPath(q.loaded, [lng], ns);
			removePending(q, name);
			if (err) q.errors.push(err);
			if (q.pendingCount === 0 && !q.done) {
				Object.keys(q.loaded).forEach((l) => {
					if (!loaded[l]) loaded[l] = {};
					const loadedKeys = q.loaded[l];
					if (loadedKeys.length) loadedKeys.forEach((n) => {
						if (loaded[l][n] === void 0) loaded[l][n] = true;
					});
				});
				q.done = true;
				if (q.errors.length) q.callback(q.errors);
				else q.callback();
			}
		});
		this.emit("loaded", loaded);
		this.queue = this.queue.filter((q) => !q.done);
	}
	read(lng, ns, fcName, tried = 0, wait = this.retryTimeout, callback) {
		if (!lng.length) return callback(null, {});
		if (this.readingCalls >= this.maxParallelReads) {
			this.waitingReads.push({
				lng,
				ns,
				fcName,
				tried,
				wait,
				callback
			});
			return;
		}
		this.readingCalls++;
		const resolver = (err, data) => {
			this.readingCalls--;
			if (this.waitingReads.length > 0) {
				const next = this.waitingReads.shift();
				this.read(next.lng, next.ns, next.fcName, next.tried, next.wait, next.callback);
			}
			if (err && data && tried < this.maxRetries) {
				setTimeout(() => {
					this.read(lng, ns, fcName, tried + 1, wait * 2, callback);
				}, wait);
				return;
			}
			callback(err, data);
		};
		const fc = this.backend[fcName].bind(this.backend);
		if (fc.length === 2) {
			try {
				const r = fc(lng, ns);
				if (r && typeof r.then === "function") r.then((data) => resolver(null, data)).catch(resolver);
				else resolver(null, r);
			} catch (err) {
				resolver(err);
			}
			return;
		}
		return fc(lng, ns, resolver);
	}
	prepareLoading(languages, namespaces, options = {}, callback) {
		if (!this.backend) {
			this.logger.warn("No backend was added via i18next.use. Will not load resources.");
			return callback && callback();
		}
		if (isString(languages)) languages = this.languageUtils.toResolveHierarchy(languages);
		if (isString(namespaces)) namespaces = [namespaces];
		const toLoad = this.queueLoad(languages, namespaces, options, callback);
		if (!toLoad.toLoad.length) {
			if (!toLoad.pending.length) callback();
			return null;
		}
		toLoad.toLoad.forEach((name) => {
			this.loadOne(name);
		});
	}
	load(languages, namespaces, callback) {
		this.prepareLoading(languages, namespaces, {}, callback);
	}
	reload(languages, namespaces, callback) {
		this.prepareLoading(languages, namespaces, { reload: true }, callback);
	}
	loadOne(name, prefix = "") {
		const s = name.split("|");
		const lng = s[0];
		const ns = s[1];
		this.read(lng, ns, "read", void 0, void 0, (err, data) => {
			if (err) this.logger.warn(`${prefix}loading namespace ${ns} for language ${lng} failed`, err);
			if (!err && data) this.logger.log(`${prefix}loaded namespace ${ns} for language ${lng}`, data);
			this.loaded(name, err, data);
		});
	}
	saveMissing(languages, namespace, key, fallbackValue, isUpdate, options = {}, clb = () => {}) {
		if (this.services?.utils?.hasLoadedNamespace && !this.services?.utils?.hasLoadedNamespace(namespace)) {
			this.logger.warn(`did not save key "${key}" as the namespace "${namespace}" was not yet loaded`, "This means something IS WRONG in your setup. You access the t function before i18next.init / i18next.loadNamespace / i18next.changeLanguage was done. Wait for the callback or Promise to resolve before accessing it!!!");
			return;
		}
		if (key === void 0 || key === null || key === "") return;
		if (this.backend?.create) {
			const opts = {
				...options,
				isUpdate
			};
			const fc = this.backend.create.bind(this.backend);
			if (fc.length < 6) try {
				let r;
				if (fc.length === 5) r = fc(languages, namespace, key, fallbackValue, opts);
				else r = fc(languages, namespace, key, fallbackValue);
				if (r && typeof r.then === "function") r.then((data) => clb(null, data)).catch(clb);
				else clb(null, r);
			} catch (err) {
				clb(err);
			}
			else fc(languages, namespace, key, fallbackValue, clb, opts);
		}
		if (!languages || !languages[0]) return;
		this.store.addResource(languages[0], namespace, key, fallbackValue);
	}
};
const get = () => ({
	debug: false,
	initAsync: true,
	ns: ["translation"],
	defaultNS: ["translation"],
	fallbackLng: ["dev"],
	fallbackNS: false,
	supportedLngs: false,
	nonExplicitSupportedLngs: false,
	load: "all",
	preload: false,
	keySeparator: ".",
	nsSeparator: ":",
	pluralSeparator: "_",
	contextSeparator: "_",
	enableSelector: false,
	partialBundledLanguages: false,
	saveMissing: false,
	updateMissing: false,
	saveMissingTo: "fallback",
	saveMissingPlurals: true,
	missingKeyHandler: false,
	missingInterpolationHandler: false,
	postProcess: false,
	postProcessPassResolved: false,
	returnNull: false,
	returnEmptyString: true,
	returnObjects: false,
	joinArrays: false,
	returnedObjectHandler: false,
	parseMissingKeyHandler: false,
	appendNamespaceToMissingKey: false,
	appendNamespaceToCIMode: false,
	overloadTranslationOptionHandler: (args) => {
		let ret = {};
		if (typeof args[1] === "object") ret = args[1];
		if (isString(args[1])) ret.defaultValue = args[1];
		if (isString(args[2])) ret.tDescription = args[2];
		if (typeof args[2] === "object" || typeof args[3] === "object") {
			const options = args[3] || args[2];
			Object.keys(options).forEach((key) => {
				ret[key] = options[key];
			});
		}
		return ret;
	},
	interpolation: {
		escapeValue: true,
		prefix: "{{",
		suffix: "}}",
		formatSeparator: ",",
		unescapePrefix: "-",
		nestingPrefix: "$t(",
		nestingSuffix: ")",
		nestingOptionsSeparator: ",",
		maxReplaces: 1e3,
		skipOnVariables: true
	},
	cacheInBuiltFormats: true
});
const transformOptions = (options) => {
	if (isString(options.ns)) options.ns = [options.ns];
	if (isString(options.fallbackLng)) options.fallbackLng = [options.fallbackLng];
	if (isString(options.fallbackNS)) options.fallbackNS = [options.fallbackNS];
	if (options.supportedLngs && !options.supportedLngs.includes("cimode")) options.supportedLngs = options.supportedLngs.concat(["cimode"]);
	return options;
};
const noop = () => {};
const bindMemberFunctions = (inst) => {
	Object.getOwnPropertyNames(Object.getPrototypeOf(inst)).forEach((mem) => {
		if (typeof inst[mem] === "function") inst[mem] = inst[mem].bind(inst);
	});
};
const instance = class I18n extends EventEmitter {
	constructor(options = {}, callback) {
		super();
		this.options = transformOptions(options);
		this.services = {};
		this.logger = baseLogger;
		this.modules = { external: [] };
		bindMemberFunctions(this);
		if (callback && !this.isInitialized && !options.isClone) {
			if (!this.options.initAsync) {
				this.init(options, callback);
				return this;
			}
			setTimeout(() => {
				this.init(options, callback);
			}, 0);
		}
	}
	init(options = {}, callback) {
		this.isInitializing = true;
		if (typeof options === "function") {
			callback = options;
			options = {};
		}
		if (options.defaultNS == null && options.ns) {
			if (isString(options.ns)) options.defaultNS = options.ns;
			else if (!options.ns.includes("translation")) options.defaultNS = options.ns[0];
		}
		const defOpts = get();
		this.options = {
			...defOpts,
			...this.options,
			...transformOptions(options)
		};
		this.options.interpolation = {
			...defOpts.interpolation,
			...this.options.interpolation
		};
		if (options.keySeparator !== void 0) this.options.userDefinedKeySeparator = options.keySeparator;
		if (options.nsSeparator !== void 0) this.options.userDefinedNsSeparator = options.nsSeparator;
		if (typeof this.options.overloadTranslationOptionHandler !== "function") this.options.overloadTranslationOptionHandler = defOpts.overloadTranslationOptionHandler;
		const createClassOnDemand = (ClassOrObject) => {
			if (!ClassOrObject) return null;
			if (typeof ClassOrObject === "function") return new ClassOrObject();
			return ClassOrObject;
		};
		if (!this.options.isClone) {
			if (this.modules.logger) baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
			else baseLogger.init(null, this.options);
			let formatter;
			if (this.modules.formatter) formatter = this.modules.formatter;
			else formatter = Formatter;
			const lu = new LanguageUtil(this.options);
			this.store = new ResourceStore(this.options.resources, this.options);
			const s = this.services;
			s.logger = baseLogger;
			s.resourceStore = this.store;
			s.languageUtils = lu;
			s.pluralResolver = new PluralResolver(lu, { prepend: this.options.pluralSeparator });
			if (formatter) {
				s.formatter = createClassOnDemand(formatter);
				if (s.formatter.init) s.formatter.init(s, this.options);
				this.options.interpolation.format = s.formatter.format.bind(s.formatter);
			}
			s.interpolator = new Interpolator(this.options);
			s.utils = { hasLoadedNamespace: this.hasLoadedNamespace.bind(this) };
			s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
			s.backendConnector.on("*", (event, ...args) => {
				this.emit(event, ...args);
			});
			if (this.modules.languageDetector) {
				s.languageDetector = createClassOnDemand(this.modules.languageDetector);
				if (s.languageDetector.init) s.languageDetector.init(s, this.options.detection, this.options);
			}
			if (this.modules.i18nFormat) {
				s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
				if (s.i18nFormat.init) s.i18nFormat.init(this);
			}
			this.translator = new Translator(this.services, this.options);
			this.translator.on("*", (event, ...args) => {
				this.emit(event, ...args);
			});
			this.modules.external.forEach((m) => {
				if (m.init) m.init(this);
			});
		}
		this.format = this.options.interpolation.format;
		if (!callback) callback = noop;
		if (this.options.fallbackLng && !this.services.languageDetector && !this.options.lng) {
			const codes = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
			if (codes.length > 0 && codes[0] !== "dev") this.options.lng = codes[0];
		}
		if (!this.services.languageDetector && !this.options.lng) this.logger.warn("init: no languageDetector is used and no lng is defined");
		[
			"getResource",
			"hasResourceBundle",
			"getResourceBundle",
			"getDataByLanguage"
		].forEach((fcName) => {
			this[fcName] = (...args) => this.store[fcName](...args);
		});
		[
			"addResource",
			"addResources",
			"addResourceBundle",
			"removeResourceBundle"
		].forEach((fcName) => {
			this[fcName] = (...args) => {
				this.store[fcName](...args);
				return this;
			};
		});
		const deferred = defer();
		const load = () => {
			const finish = (err, t) => {
				this.isInitializing = false;
				if (this.isInitialized && !this.initializedStoreOnce) this.logger.warn("init: i18next is already initialized. You should call init just once!");
				this.isInitialized = true;
				if (!this.options.isClone) this.logger.log("initialized", this.options);
				this.emit("initialized", this.options);
				deferred.resolve(t);
				callback(err, t);
			};
			if ((this.languages || this.isLanguageChangingTo) && !this.isInitialized) return finish(null, this.t.bind(this));
			this.changeLanguage(this.options.lng, finish);
		};
		if (this.options.resources || !this.options.initAsync) load();
		else setTimeout(load, 0);
		return deferred;
	}
	loadResources(language, callback = noop) {
		let usedCallback = callback;
		const usedLng = isString(language) ? language : this.language;
		if (typeof language === "function") usedCallback = language;
		if (!this.options.resources || this.options.partialBundledLanguages) {
			if (usedLng?.toLowerCase() === "cimode" && (!this.options.preload || this.options.preload.length === 0)) return usedCallback();
			const toLoad = [];
			const append = (lng) => {
				if (!lng) return;
				if (lng === "cimode") return;
				this.services.languageUtils.toResolveHierarchy(lng).forEach((l) => {
					if (l === "cimode") return;
					if (!toLoad.includes(l)) toLoad.push(l);
				});
			};
			if (!usedLng) this.services.languageUtils.getFallbackCodes(this.options.fallbackLng).forEach((l) => append(l));
			else append(usedLng);
			this.options.preload?.forEach?.((l) => append(l));
			this.services.backendConnector.load(toLoad, this.options.ns, (e) => {
				if (!e && !this.resolvedLanguage && this.language) this.setResolvedLanguage(this.language);
				usedCallback(e);
			});
		} else usedCallback(null);
	}
	reloadResources(lngs, ns, callback) {
		const deferred = defer();
		if (typeof lngs === "function") {
			callback = lngs;
			lngs = void 0;
		}
		if (typeof ns === "function") {
			callback = ns;
			ns = void 0;
		}
		if (!lngs) lngs = this.languages;
		if (!ns) ns = this.options.ns;
		if (!callback) callback = noop;
		this.services.backendConnector.reload(lngs, ns, (err) => {
			deferred.resolve();
			callback(err);
		});
		return deferred;
	}
	use(module) {
		if (!module) throw new Error("You are passing an undefined module! Please check the object you are passing to i18next.use()");
		if (!module.type) throw new Error("You are passing a wrong module! Please check the object you are passing to i18next.use()");
		if (module.type === "backend") this.modules.backend = module;
		if (module.type === "logger" || module.log && module.warn && module.error) this.modules.logger = module;
		if (module.type === "languageDetector") this.modules.languageDetector = module;
		if (module.type === "i18nFormat") this.modules.i18nFormat = module;
		if (module.type === "postProcessor") postProcessor.addPostProcessor(module);
		if (module.type === "formatter") this.modules.formatter = module;
		if (module.type === "3rdParty") this.modules.external.push(module);
		return this;
	}
	setResolvedLanguage(l) {
		if (!l || !this.languages) return;
		if (["cimode", "dev"].includes(l)) return;
		for (let li = 0; li < this.languages.length; li++) {
			const lngInLngs = this.languages[li];
			if (["cimode", "dev"].includes(lngInLngs)) continue;
			if (this.store.hasLanguageSomeTranslations(lngInLngs)) {
				this.resolvedLanguage = lngInLngs;
				break;
			}
		}
		if (!this.resolvedLanguage && !this.languages.includes(l) && this.store.hasLanguageSomeTranslations(l)) {
			this.resolvedLanguage = l;
			this.languages.unshift(l);
		}
	}
	changeLanguage(lng, callback) {
		this.isLanguageChangingTo = lng;
		const deferred = defer();
		this.emit("languageChanging", lng);
		const setLngProps = (l) => {
			this.language = l;
			this.languages = this.services.languageUtils.toResolveHierarchy(l);
			this.resolvedLanguage = void 0;
			this.setResolvedLanguage(l);
		};
		const done = (err, l) => {
			if (l) {
				if (this.isLanguageChangingTo === lng) {
					setLngProps(l);
					this.translator.changeLanguage(l);
					this.isLanguageChangingTo = void 0;
					this.emit("languageChanged", l);
					this.logger.log("languageChanged", l);
				}
			} else this.isLanguageChangingTo = void 0;
			deferred.resolve((...args) => this.t(...args));
			if (callback) callback(err, (...args) => this.t(...args));
		};
		const setLng = (lngs) => {
			if (!lng && !lngs && this.services.languageDetector) lngs = [];
			const fl = isString(lngs) ? lngs : lngs && lngs[0];
			const l = this.store.hasLanguageSomeTranslations(fl) ? fl : this.services.languageUtils.getBestMatchFromCodes(isString(lngs) ? [lngs] : lngs);
			if (l) {
				if (!this.language) setLngProps(l);
				if (!this.translator.language) this.translator.changeLanguage(l);
				this.services.languageDetector?.cacheUserLanguage?.(l);
			}
			this.loadResources(l, (err) => {
				done(err, l);
			});
		};
		if (!lng && this.services.languageDetector && !this.services.languageDetector.async) setLng(this.services.languageDetector.detect());
		else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
			if (this.services.languageDetector.detect.length === 0) this.services.languageDetector.detect().then(setLng);
			else this.services.languageDetector.detect(setLng);
		} else setLng(lng);
		return deferred;
	}
	getFixedT(lng, ns, keyPrefix, fixedOpts) {
		const scopeNs = fixedOpts?.scopeNs;
		const fixedT = (key, opts, ...rest) => {
			let o;
			if (typeof opts !== "object") o = this.options.overloadTranslationOptionHandler([key, opts].concat(rest));
			else o = { ...opts };
			o.lng = o.lng || fixedT.lng;
			o.lngs = o.lngs || fixedT.lngs;
			const explicitCallNs = o.ns !== void 0 && o.ns !== null;
			o.ns = o.ns || fixedT.ns;
			if (o.keyPrefix !== "") o.keyPrefix = o.keyPrefix || keyPrefix || fixedT.keyPrefix;
			const selectorOpts = {
				...this.options,
				...o
			};
			if (Array.isArray(scopeNs) && !explicitCallNs) selectorOpts.ns = scopeNs;
			if (typeof o.keyPrefix === "function") o.keyPrefix = keysFromSelector(o.keyPrefix, selectorOpts);
			const keySeparator = this.options.keySeparator || ".";
			let resultKey;
			if (o.keyPrefix && Array.isArray(key)) resultKey = key.map((k) => {
				if (typeof k === "function") k = keysFromSelector(k, selectorOpts);
				return `${o.keyPrefix}${keySeparator}${k}`;
			});
			else {
				if (typeof key === "function") key = keysFromSelector(key, selectorOpts);
				resultKey = o.keyPrefix ? `${o.keyPrefix}${keySeparator}${key}` : key;
			}
			return this.t(resultKey, o);
		};
		if (isString(lng)) fixedT.lng = lng;
		else fixedT.lngs = lng;
		fixedT.ns = ns;
		fixedT.keyPrefix = keyPrefix;
		return fixedT;
	}
	t(...args) {
		return this.translator?.translate(...args);
	}
	exists(...args) {
		return this.translator?.exists(...args);
	}
	setDefaultNamespace(ns) {
		this.options.defaultNS = ns;
	}
	hasLoadedNamespace(ns, options = {}) {
		if (!this.isInitialized) {
			this.logger.warn("hasLoadedNamespace: i18next was not initialized", this.languages);
			return false;
		}
		if (!this.languages || !this.languages.length) {
			this.logger.warn("hasLoadedNamespace: i18n.languages were undefined or empty", this.languages);
			return false;
		}
		const lng = options.lng || this.resolvedLanguage || this.languages[0];
		const fallbackLng = this.options ? this.options.fallbackLng : false;
		const lastLng = this.languages[this.languages.length - 1];
		if (lng.toLowerCase() === "cimode") return true;
		const loadNotPending = (l, n) => {
			const loadState = this.services.backendConnector.state[`${l}|${n}`];
			return loadState === -1 || loadState === 0 || loadState === 2;
		};
		if (options.precheck) {
			const preResult = options.precheck(this, loadNotPending);
			if (preResult !== void 0) return preResult;
		}
		if (this.hasResourceBundle(lng, ns)) return true;
		if (!this.services.backendConnector.backend || this.options.resources && !this.options.partialBundledLanguages) return true;
		const { languageUtils } = this.services;
		const loadLng = !options.lng ? lng : languageUtils.isSupportedCode(lng) && languageUtils.toResolveHierarchy(lng, false)[0];
		if ((!loadLng || loadNotPending(loadLng, ns)) && (!fallbackLng || loadNotPending(lastLng, ns))) return true;
		return false;
	}
	loadNamespaces(ns, callback) {
		const deferred = defer();
		if (!this.options.ns) {
			if (callback) callback();
			return Promise.resolve();
		}
		if (isString(ns)) ns = [ns];
		ns.forEach((n) => {
			if (!this.options.ns.includes(n)) this.options.ns.push(n);
		});
		this.loadResources((err) => {
			deferred.resolve();
			if (callback) callback(err);
		});
		return deferred;
	}
	loadLanguages(lngs, callback) {
		const deferred = defer();
		if (isString(lngs)) lngs = [lngs];
		const preloaded = this.options.preload || [];
		const newLngs = lngs.filter((lng) => !preloaded.includes(lng) && this.services.languageUtils.isSupportedCode(lng));
		if (!newLngs.length) {
			if (callback) callback();
			return Promise.resolve();
		}
		this.options.preload = preloaded.concat(newLngs);
		this.loadResources((err) => {
			deferred.resolve();
			if (callback) callback(err);
		});
		return deferred;
	}
	dir(lng) {
		if (!lng) lng = this.resolvedLanguage || (this.languages?.length > 0 ? this.languages[0] : this.language);
		if (!lng) return "rtl";
		try {
			const l = new Intl.Locale(lng);
			if (l && l.getTextInfo) {
				const ti = l.getTextInfo();
				if (ti && ti.direction) return ti.direction;
			}
		} catch (e) {}
		const rtlLngs = [
			"ar",
			"shu",
			"sqr",
			"ssh",
			"xaa",
			"yhd",
			"yud",
			"aao",
			"abh",
			"abv",
			"acm",
			"acq",
			"acw",
			"acx",
			"acy",
			"adf",
			"ads",
			"aeb",
			"aec",
			"afb",
			"ajp",
			"apc",
			"apd",
			"arb",
			"arq",
			"ars",
			"ary",
			"arz",
			"auz",
			"avl",
			"ayh",
			"ayl",
			"ayn",
			"ayp",
			"bbz",
			"pga",
			"he",
			"iw",
			"ps",
			"pbt",
			"pbu",
			"pst",
			"prp",
			"prd",
			"ug",
			"ur",
			"ydd",
			"yds",
			"yih",
			"ji",
			"yi",
			"hbo",
			"men",
			"xmn",
			"fa",
			"jpr",
			"peo",
			"pes",
			"prs",
			"dv",
			"sam",
			"ckb"
		];
		const languageUtils = this.services?.languageUtils || new LanguageUtil(get());
		if (lng.toLowerCase().indexOf("-latn") > 1) return "ltr";
		return rtlLngs.includes(languageUtils.getLanguagePartFromCode(lng)) || lng.toLowerCase().indexOf("-arab") > 1 ? "rtl" : "ltr";
	}
	static createInstance(options = {}, callback) {
		const instance = new I18n(options, callback);
		instance.createInstance = I18n.createInstance;
		return instance;
	}
	cloneInstance(options = {}, callback = noop) {
		const forkResourceStore = options.forkResourceStore;
		if (forkResourceStore) delete options.forkResourceStore;
		const mergedOptions = {
			...this.options,
			...options,
			isClone: true
		};
		const clone = new I18n(mergedOptions);
		if (options.debug !== void 0 || options.prefix !== void 0) clone.logger = clone.logger.clone(options);
		[
			"store",
			"services",
			"language"
		].forEach((m) => {
			clone[m] = this[m];
		});
		clone.services = { ...this.services };
		clone.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
		if (forkResourceStore) {
			clone.store = new ResourceStore(Object.keys(this.store.data).reduce((prev, l) => {
				prev[l] = { ...this.store.data[l] };
				prev[l] = Object.keys(prev[l]).reduce((acc, n) => {
					acc[n] = { ...prev[l][n] };
					return acc;
				}, prev[l]);
				return prev;
			}, {}), mergedOptions);
			clone.services.resourceStore = clone.store;
		}
		if (options.interpolation) {
			const mergedInterpolation = {
				...get().interpolation,
				...this.options.interpolation,
				...options.interpolation
			};
			const mergedForInterpolator = {
				...mergedOptions,
				interpolation: mergedInterpolation
			};
			clone.services.interpolator = new Interpolator(mergedForInterpolator);
		}
		clone.translator = new Translator(clone.services, mergedOptions);
		clone.translator.on("*", (event, ...args) => {
			clone.emit(event, ...args);
		});
		clone.init(mergedOptions, callback);
		clone.translator.options = mergedOptions;
		clone.translator.backendConnector.services.utils = { hasLoadedNamespace: clone.hasLoadedNamespace.bind(clone) };
		return clone;
	}
	toJSON() {
		return {
			options: this.options,
			store: this.store,
			language: this.language,
			languages: this.languages,
			resolvedLanguage: this.resolvedLanguage
		};
	}
}.createInstance();
instance.createInstance;
instance.dir;
instance.init;
instance.loadResources;
instance.reloadResources;
instance.use;
instance.changeLanguage;
instance.getFixedT;
const t$1 = instance.t;
instance.exists;
instance.setDefaultNamespace;
instance.hasLoadedNamespace;
instance.loadNamespaces;
instance.loadLanguages;
//#endregion
//#region src/translations/i18n.ts
/** initialise the I18n object */
instance.use(lit_i18n.initLitI18n).use(i18next_browser_languagedetector.default).init({
	fallbackLng: "en",
	resources: {
		cs: { translation: {
			moreoptions: "Více možností",
			delete: "Smazat",
			create: "Vytvořit",
			createfolder: "Vytvořit složku",
			createsubfolder: "Vytvořit podsložku",
			subfolder: "Podsložka",
			display: "Zobrazení",
			syncanalyses: "Synchronizovat analýzy",
			uploadedby: "Nahráno uživatelem",
			uploadeddat: "Nahráno dne",
			overviewofyourfolders: "Přehled vašich složek",
			content: "Obsah",
			palette: "Paleta",
			loading: "Načítám",
			config: "Nastavení",
			layout_simple: "Jednoduché rozvržení",
			layout_advanced: "Analytické rozvržení",
			layout_nogui: "Bez GUI",
			layout_lesson: "Rozvržení lekce",
			share: "Sdílet",
			fileloadingerror: "Chyba při načítání souboru",
			embedhint: "Chcete-li vložit tento blok na jinou webovou stránku, použijte následující kód:",
			embedlibrary: "Vložte knihovnu – jednou v HTML hlavičce",
			embedcomponent: "Použijte následující kód kdekoli v HTML těle",
			copy: "Kopírovat",
			remotefoldersbrowseraddfolderhint: "Pokud v úložišti přidáte další složku, uvidíte zde další možnosti vyhodnocení.",
			temperature: "Teplota",
			upload: "Nahrát",
			uploadafile: "Nahrát soubor",
			selectfile: "Vybrat soubor",
			addfiles: "Přidat soubor(y)",
			clear: "Smazat",
			dragorselectfile: "Přetáhněte LRC soubor nebo jej vyberte z disku",
			file: "soubor",
			detail: "Detail",
			showeverything: "Zobrazit vše",
			next: "Další",
			prev: "Předchozí",
			back: "Zpět",
			close: "Zavřít",
			reload: "Načíst znovu",
			open: "Otevřít",
			description: "Popis",
			author: "Autor",
			license: "Licence",
			recordedat: "Nahráno",
			displaysettings: "Nastavení zobrazení",
			filerendering: "Vykreslování termogramu",
			pixelated: "Pixelované",
			smooth: "Vyhlazené",
			filerenderinghint: "Režim 'Pixelované' vypne vyhlazování a zobrazí pixely termogramu přesně tak, jak jsou",
			adjusttimescale: "Teplotní rozsah",
			automaticrange: "Automatický rozsah",
			fullrange: "Plný rozsah",
			adjusttimescalehint: "Nastavit teplotní škálu automaticky (nejčastější teploty z histogramu) anebo ji roztáhnout na minimální a maximální teploty.",
			palettename: "Paleta {{name}}",
			colourpalettehint: "Zvolte barevnou paletu",
			numfiles: "{{num}} souborů",
			fileinfo: "Informace o souboru",
			thermalfilename: "Název IR souboru",
			thermalfileurl: "URL IR souboru",
			thermalfiledownload: "Stáhnout IR soubor",
			visiblefilename: "Název visible souboru",
			visiblefileurl: "URL visible souboru",
			visiblefiledownload: "Stáhnout visible obrázek",
			togglevisibleimage: "Přepnout IR / VIS obraz",
			time: "Čas",
			duration: "Délka sekvence",
			resolution: "Rozlišení",
			bytesize: "Bytů",
			minimaltemperature: "Minimální teplota",
			maximaltemperature: "Maximální teplota",
			filetype: "Typ souboru",
			type: "Typ",
			supporteddevices: "Kompatibilní zařízení",
			download: "Stáhnout",
			downloadoriginalfiles: "- jednotlivé soubory",
			downloadoriginalfileshint: "Stáhnout jednotlivé zdrojové termogramy",
			downloadoriginalfile: "- Původní IR soubor {{type}}",
			exportcurrentframeaspng: "- Aktuální snímek",
			convertentiresequencetovideo: "- Převést celou sekvenci do videa",
			pngofindividualimages: "- jednotlivé soubory",
			pngofindividualimageshint: "Exportovat všechny soubor po jednom, každý do samostatného obrázku.",
			pngofentiregroup: "- skupina",
			pngofentiregrouphint: "Exportovat celou skupinu do 1 obrázku.",
			csvofanalysisdata: "- data analýz",
			csvofanalysisdatahint: "Tabulka s teplotami v aktuálně nastavených analýzách",
			exportimagewidth: "Šířka exportovaných obrázků",
			exportimagefontsize: "Velikost písma v exportovaných obrázcích",
			exportgroupname: "Název skupiny",
			exportfilenames: "Názvy souborů",
			exportdimensions: "Rozměry exportu",
			exportgroup: "Export skupiny",
			exportcontent: "Obsah exportu",
			numberofcolumns: "Počet sloupců",
			thermalscale: "Teplotní škála",
			thermalrange: "Teplotní rozsah",
			analyses: "Analýzy",
			filedate: "File date",
			folder: "Složka",
			folders: "Složky",
			range: "Rozsah",
			info: "Info",
			note: "Pozn.",
			group: "Skupina",
			donotgroup: "Neseskupovat",
			groupby: "Seskupit {{era}}",
			groupped: "seskupené",
			showingfolder: "Zobrazuji složku",
			showingfolders: "Zobrazuji složky",
			and: "a",
			or: "či",
			doyouwanttoadd: "Chcete přidat ještě",
			youmayalsoadd: "Můžete přidat ještě",
			bydays: "po dnech",
			byhours: "po hodinách",
			byweeks: "po týdnech",
			bymonths: "po měsících",
			byyears: "po rocích",
			play: "Přehrát",
			pause: "Pozastavit",
			stop: "Stop",
			date: "Datum",
			frame: "Snímek",
			playbackspeed: "Rychlost přehrávání",
			graphlines: "Čáry v grafu",
			straightlines: "Přímé linie",
			smoothlines: "Hladké linie",
			graphlineshint: "'Hladké linie' mohou lépe ilustrovat trendy, ale jsou méně přesné. Potřebujete-li vidět přesně to, co v termogramu je, zvolte 'Přímé linie'.",
			analysis: "Analýza",
			avg: "PRŮM",
			min: "MIN",
			max: "MAX",
			size: "Velikost",
			edit: "Upravit",
			editsth: "Upravit {{what}}",
			remove: "Odstranit",
			addpoint: "Přidat bod",
			addellipsis: "Přidat elipsu",
			addrectangle: "Přidat obdélník",
			analysishint: "Vyznačte oblast v termogramu a zde uvidíte přehled jejích teplot.",
			graph: "Graf",
			graphhint1: "Nejprve přidejte analýzu!",
			graphhint2: "Pro zobrazení grafu klikněte na <thermal-btn variant='background' non-interactive tooltip='Najdete je v tabulce výše...'>hodnotu</thermal-btn> některé analýzy!",
			rectangle: "obdélník",
			ellipsis: "elipsu",
			point: "bod",
			name: "Název",
			color: "Barva",
			top: "Horní strana",
			left: "Levá strana",
			right: "Pravá strana",
			bottom: "Spodní strana",
			columns: "{{num}} souborů na řádku",
			fromto: "Od {{from}} do {{to}}",
			downloadgraphdataascsv: "Stáhnout data grafu jako CSV",
			analysissync: "Synchronizovat analýzy",
			apparenttemperature: "Pocitová teplota",
			apparenttemperaturehint: "Tento převodník využívá model pocitové teploty <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.",
			airtemperature: "Teplota vzduchu",
			relativeairhumidity: "Relativní vlhkost vzduchu",
			windspeed: "Rychlost větru",
			inpercent: "v procentech",
			apparenttemperatureverbose: "Na teploměru vidíte {{t}} °C, ale vlivem vlhkosti a větru se venku cítíte jako by bylo {{app}} °C.",
			youfeelwarmer: "Pocitová teplota je o {{diff}} °C vyšší než teplota vzduchu.",
			youfeelcolder: "Pocitová teplota je o {{diff}} °C nižší než teplota vzduchu.",
			inspecttemperatures: "Prohlížet teploty",
			usemousetoinspecttemperaturevalues: "S pomocí kurzoru prohlížejte teploty v termogramu.",
			editanalysis: "Upravit analýzu",
			dragcornersofselectedanalysis: "Klikněte a táhněte roh aktivní analýzy.",
			addpointanalysis: "Přidat bodovou analýzu",
			clickandaddpoint: "Klikněte na termogram a přidejte bodovou analýzu.",
			addrectangleanalysis: "Přidat obdélníkovou analýzu",
			clickandaddrectangle: "Klikněte a táhněte na termogramu pro přidání obdélníkové analýzy.",
			addellipsisanalysis: "Přidat eliptickou analýzu",
			clickandaddellipsis: "Klikněte a táhněte na termogramu pro přidání eliptické analýzy.",
			tutorial: "Tutorial",
			colourpalette: "Barevná paleta",
			palettehint: "Rozbalovací nabídka pro přepínání barevné palety.",
			remotefoldersbrowser: "Prohlížeč vzdálených složek",
			server: "Server",
			networklog: "Síťový záznam",
			editfile: "Upravit soubor",
			editfolder: "Upravit složku",
			editcomment: "Upravit komentář",
			user: "Uživatel",
			griddisplay: "Zobrazit jako mřížku",
			tabledisplay: "Zobrazit jako tabulku",
			deletefile: "Smazat soubor",
			deletefolder: "Smazat složku",
			comments: "Komentáře",
			deletecomment: "Smazat komentář",
			savecomment: "Uložit komentář",
			addcomment: "Přidat komentář",
			nocomments: "Žádné komentáře",
			savechanges: "Uložit změny",
			uploadfile: "Nahrát soubor",
			compactview: "Kompaktní zobrazení",
			showdiscussion: "Zobrazit diskuzi",
			edittags: "Upravit štítky",
			availabletags: "Dostupné štítky",
			assignedtags: "Přiřazené štítky",
			connectioninformation: "Informace o připojení",
			serverurl: "URL serveru",
			servername: "Název serveru",
			login: "Přihlášení",
			logout: "Odhlášení",
			password: "Heslo",
			logoutmessage: "Opravdu se chcete odhlásit?",
			loginerror: "Nelze se přihlásit.",
			accessibletologgedinusers: "Tato stránka je přístupná pouze přihlášeným uživatelům.",
			export: "Export",
			exportvideo: "Exportovat video",
			exportpng: "Exportovat obrázek",
			exportdonotclosewindowhint: "Nezavírejte toto okno, soubor se stáhne automaticky.",
			exportencodingfile: "Enkóduji video soubor...",
			exportrecordingframes: "Zaznamenávám snímky...",
			histogram: "Histogram",
			timeline: "Časová osa",
			exportwidth: "Šířka ",
			exportmargin: "Okraje",
			exportgap: "Mezera",
			exportgrahpheight: "Výška grafu",
			videoquality: "Kvalita videa",
			imagecompression: "Komprese obrázku",
			theme: "Motiv",
			light: "Světlý",
			dark: "Tmavý",
			foldermayhavefiles: "Složka pro soubory",
			foldermayhavesubfolders: "Složka pro podsložky"
		} },
		cy: { translation: {
			moreoptions: "Mwy o opsiynau",
			delete: "Dileu",
			create: "Creu",
			createfolder: "Creu ffolder",
			createsubfolder: "Creu is-ffolder",
			subfolder: "Is-ffolder",
			display: "Arddangos",
			syncanalyses: "Cydamseru dadansoddiadau",
			uploadedby: "Wedi'i lwytho i fyny gan",
			uploadeddat: "Wedi'i lwytho i fyny ar",
			overviewofyourfolders: "Trosolwg o'ch ffolderi",
			content: "Cynnwys",
			palette: "Palet",
			loading: "Llwytho",
			config: "Gosodiadau",
			temperature: "Tymheredd",
			upload: "Llwytho i fyny",
			uploadafile: "Llwytho ffeil i fyny",
			selectfile: "Dewis ffeil",
			addfiles: "Ychwanegu ffeil(iau)",
			clear: "Clirio",
			dragorselectfile: "Llusgwch ffeil LRC neu dewiswch hi o'r ddisg",
			share: "Rhannu",
			fileloadingerror: "Gwall wrth lwytho'r ffeil",
			embedhint: "I fewnosod y bloc hwn mewn gwefan arall, defnyddiwch y cod canlynol:",
			embedlibrary: "Mewnosodwch y llyfrgell – unwaith yn pennyn HTML",
			embedcomponent: "Defnyddiwch y cod canlynol yn unrhyw le yn y corff HTML",
			copy: "Copïo",
			remotefoldersbrowseraddfolderhint: "Os ychwanegwch ffolder arall yn y gadwrfa, fe welwch opsiynau gwerthuso ychwanegol yma.",
			analysissync: "Cydamseru dadansoddiadau",
			file: "ffeil",
			detail: "Manylder",
			open: "Agor",
			showeverything: "Dangos popeth",
			layout_simple: "Cynllun syml",
			layout_advanced: "Cynllun dadansoddi",
			layout_nogui: "Dim GUI",
			layout_lesson: "Cynllun gwers",
			next: "Nesaf",
			prev: "Blaenorol",
			back: "Yn ôl",
			close: "Cau",
			reload: "Ail-lwytho",
			description: "Disgrifiad",
			author: "Awdur",
			license: "Trwydded",
			recordedat: "Wedi recordio yn",
			displaysettings: "Gosodiadau arddangos",
			filerendering: "Rendro ffeil",
			pixelated: "Picselaidd",
			smooth: "Llyfn",
			filerenderinghint: "Mae modd 'Picselaidd' yn analluogi gwrth-alwio'r delwedd isgoch ac yn eich galluogi i weld ei bicseli fel ag y maent.",
			adjusttimescale: "Graddfa tymheredd",
			automaticrange: "Ystod awtomatig",
			fullrange: "Ystod llawn",
			adjusttimescalehint: "Addaswch yr ystod thermol yn awtomatig neu cyflewch yr ystod i fand lawn.",
			palettename: "Palet {{name}}",
			colourpalettehint: "Dewiswch balet lliw o arddangos thermol.",
			fileinfo: "Gwybodaeth ffeil",
			thermalfilename: "Enw ffeil isgoch",
			thermalfileurl: "URL ffeil isgoch",
			thermalfiledownload: "Lawrlwythwch y ffeil isgoch",
			visiblefilename: "Enw ffeil weledol",
			visiblefileurl: "URL ffeil weledol",
			visiblefiledownload: "Lawrlwythwch y ffeil weledol",
			togglevisibleimage: "Newid delwedd IR/VIS",
			time: "Amser",
			duration: "Hyd",
			resolution: "Datrysiad",
			bytesize: "Maint",
			minimaltemperature: "Tymheredd lleiaf",
			maximaltemperature: "Tymheredd uchaf",
			filetype: "Math o ffeil",
			type: "Math",
			supporteddevices: "Dyfeisiau a gefnogir",
			numfiles: "{{num}} ffeil",
			download: "Lawrlwythwch",
			downloadoriginalfiles: "- ffeiliau thermol wreiddiol unigol",
			downloadoriginalfileshint: "Lawrlwythwch ffeiliau isgoch unigol.",
			downloadoriginalfile: "- Ffeil thermol wreiddiol {{type}}",
			exportcurrentframeaspng: "- Ffrâm gyfredol fel delwedd",
			convertentiresequencetovideo: "- Trosi dilyniant cyfan i fideo",
			pngofindividualimages: "- ffeiliau unigol",
			pngofindividualimageshint: "Allforio pob ffeil yn unigol.",
			pngofentiregroup: "- grwp",
			pngofentiregrouphint: "Allforio'r grŵp cyfan fel un ddelwedd",
			csvofanalysisdata: "- data dadansoddi",
			csvofanalysisdatahint: "Tabl tymheredd mewn dadansoddiadau",
			exportimagewidth: "Lled delwedd wedi'i hallforio",
			exportimagefontsize: "Maint ffont delwedd wedi'i hallforio",
			exportgroupname: "Enw'r grŵp allforio",
			exportfilenames: "Enwau'r ffeiliau allforio",
			exportdimensions: "Dimensiynau allforio",
			exportgroup: "Allforio'r grŵp",
			exportcontent: "Allforio'r cynnwys",
			numberofcolumns: "Nifer y colofnau",
			thermalscale: "Graddfa thermol",
			thermalrange: "Ystod thermol",
			analyses: "Dadansoddiadau",
			filedate: "Dyddiad y ffeil",
			folder: "Ffolder",
			folders: "Ffolderi",
			range: "Ystod",
			info: "Gwybodaeth",
			note: "Nodyn",
			group: "Grwp",
			donotgroup: "Peidiwch â grwpio",
			groupby: "grwpio {{era}}",
			groupped: "wedi'u cetegoreiddio",
			showingfolder: "Yn dangos y ffolder",
			showingfolders: "Yn dangos y ffolderi",
			and: "a",
			or: "neu",
			doyouwanttoadd: "Ydych chi eisiau arddangos hefyd",
			youmayalsoadd: "Gallwch hefyd ddangos",
			bydays: "yn ôl dydd",
			byhours: "yn ôl awr",
			byweeks: "yn ôl wythnos",
			bymonths: "yn ôl mis",
			byyears: "yn ôl blwyddyn",
			play: "Chwarae",
			pause: "Oedwch",
			stop: "Stopio",
			date: "Dyddiad",
			frame: "Ffrâm",
			playbackspeed: "Cyflymder chwarae",
			graphlines: "Llinellau graff",
			straightlines: "Llinellau syth",
			smoothlines: "Llinellau llyfn",
			graphlineshint: "Gall 'llinellau llyfn' ddangos tueddiadau'n well, ond maent yn llai manwl gywir. Os oes angen i chi weld yn union beth sydd yn y lliw thermol, defnyddiwch 'Llinellau syth'.",
			analysis: "Dadansoddi",
			avg: "Cyfartaledd",
			min: "Lleiaf",
			max: "Uchafswm",
			size: "Maint",
			edit: "Golygu",
			editsth: "Golygu {{what}}",
			remove: "Dileu",
			addpoint: "Addio pwynt",
			addellipsis: "Addio elips",
			addrectangle: "Addio petryal",
			analysishint: "Gallwch ddewis ardal yn y ddelwedd IR i weld ei thymhereddau.",
			graph: "Graff",
			graphhint1: "Addio ddadansoddiad yn gyntaf i weld y graff!",
			graphhint2: "Cliciwch ar <thermal-btn variant='background' non-interactive  tooltip='Fe welwch nhw yn y tabl uchod...'>werth</thermal-btn> dadansoddiad i weld ei graff yma!",
			rectangle: "petryal",
			ellipsis: "elipsis",
			point: "pwynt",
			name: "Enw",
			color: "Lliw",
			top: "Ochr uchaf",
			left: "Ochr chwith",
			right: "Ochr dde",
			bottom: "Ochr gwaelod",
			columns: "{{num}} delwedd mewn rhes",
			fromto: "O {{from}} i {{to}}",
			downloadgraphdataascsv: "Lawrlwythwch data graff fel CSV",
			apparenttemperature: "Tymheredd tebygol",
			apparenttemperaturehint: "Mae'r trawsnewidydd hwn yn defnyddio'r model tymheredd tebygol <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.",
			airtemperature: "Tymheredd aer",
			relativeairhumidity: "Lleithder cymharol aer",
			windspeed: "Cyflymder gwynt",
			inpercent: "mewn canran",
			apparenttemperatureverbose: "Mae'r thermomedr yn dangos {{t}} °C, ond oherwydd lleithder a gwynt, mae'n teimlo fel {{app}} °C y tu allan.",
			youfeelwarmer: "Mae'r tymheredd teimladol yn {{diff}} °C yn uwch na thymheredd yr aer.",
			youfeelcolder: "Mae'r tymheredd teimladol yn {{diff}} °C yn is na thymheredd yr aer.",
			inspecttemperatures: "Archwilio'r tymheredd",
			usemousetoinspecttemperaturevalues: "Defnyddiwch y llygoden i archwilio gwerthoedd tymheredd.",
			editanalysis: "Golygu dadansoddiad",
			dragcornersofselectedanalysis: "Llusgwch gorneli'r dadansoddiad a ddewiswyd.",
			addpointanalysis: "Adio dadansoddiad pwynt",
			clickandaddpoint: "Cliciwch ar y delwedd isgoch i ychwanegu dadansoddiad pwynt.",
			addrectangleanalysis: "Adio dadansoddiad petryal",
			clickandaddrectangle: "Cliciwch a dragiwuch ar y delwedd isgoch i ychwanegu dadansoddiad petryal.",
			addellipsisanalysis: "Adio dadansoddiad eliptig",
			clickandaddellipsis: "Cliciwch a dragiwuch ar y delwedd isgoch i ychwanegu dadansoddiad eliptig.",
			tutorial: "Tiwtorial",
			colourpalette: "Palet lliw",
			palettehint: "Defnyddiwch y gwymplen i newid y palet.",
			remotefoldersbrowser: "Porwr o ffolderi anghysbell",
			server: "Gweinydd",
			networklog: "Log rhwydwaith",
			editfile: "Golygu ffeil",
			editfolder: "Golygu ffolder",
			editcomment: "Golygu sylw",
			user: "Defnyddiwr",
			griddisplay: "Dangos fel grid",
			tabledisplay: "Dangos fel tabl",
			deletefile: "Dileu ffeil",
			deletefolder: "Dileu ffolder",
			comments: "Sylwadau",
			deletecomment: "Dileu sylw",
			savecomment: "Cadw sylw",
			addcomment: "Ychwanegu sylw",
			nocomments: "Dim sylwadau",
			savechanges: "Cadw newidiadau",
			uploadfile: "Uwchlwytho ffeil",
			compactview: "Golwg gryno",
			showdiscussion: "Dangos trafodaeth",
			edittags: "Golygu tagiau",
			availabletags: "Tagiau ar gael",
			assignedtags: "Tagiau a neilltuwyd",
			connectioninformation: "Gwybodaeth cysylltiad",
			serverurl: "URL y gweinydd",
			servername: "Enw'r gweinydd",
			login: "Mewngofnodi",
			logout: "Allgofnodi",
			password: "Cyfrinair",
			logoutmessage: "Ydych chi’n siŵr eich bod eisiau allgofnodi?",
			loginerror: "Methu mewngofnodi.",
			accessibletologgedinusers: "Mae'r dudalen hon ar gael i ddefnyddwyr sydd wedi mewngofnodi yn unig.",
			export: "Allforio",
			exportvideo: "Allforio fideo",
			exportpng: "Allforio delwedd",
			exportdonotclosewindowhint: "Peidiwch â chau'r ffenestr hon, bydd y ffeil yn cael ei lawrlwytho'n awtomatig.",
			exportencodingfile: "Wrthi'n amgodio'r ffeil fideo...",
			exportrecordingframes: "Wrthi'n cofnodi fframiau...",
			histogram: "Histogram",
			timeline: "Llinell amser",
			exportwidth: "Lled",
			exportmargin: "Ymylon",
			exportgap: "Bwlch",
			exportgrahpheight: "Uchder y graff",
			videoquality: "Ansawdd fideo",
			imagecompression: "Cywasgu delwedd",
			theme: "Thema",
			light: "Golau",
			dark: "Tywyll",
			foldermayhavefiles: "Ffolder ar gyfer ffeiliau",
			foldermayhavesubfolders: "Ffolder ar gyfer is-ffolderi"
		} },
		de: { translation: {
			moreoptions: "Mehr Optionen",
			delete: "Löschen",
			create: "Erstellen",
			createfolder: "Einen Ordner erstellen",
			createsubfolder: "Einen Unterordner erstellen",
			subfolder: "Unterordner",
			display: "Anzeige",
			syncanalyses: "Analysen synchronisieren",
			uploadedby: "Hochgeladen von",
			uploadeddat: "Hochgeladen am",
			overviewofyourfolders: "Übersicht Ihrer Ordner",
			content: "Inhalt",
			palette: "Palette",
			loading: "Loading",
			config: "Paramètres",
			layout_simple: "Einfaches Layout",
			layout_advanced: "Analyse-Layout",
			layout_nogui: "Kein GUI",
			layout_lesson: "Lektions-Layout",
			share: "Teilen",
			fileloadingerror: "Fehler beim Laden der Datei",
			embedhint: "Um diesen Block in eine andere Website einzubetten, verwenden Sie den folgenden Code:",
			embedlibrary: "Bibliothek einfügen – einmal im HTML-Head",
			embedcomponent: "Verwenden Sie den folgenden Code überall im HTML-Body",
			copy: "Kopieren",
			remotefoldersbrowseraddfolderhint: "Wenn Sie einen weiteren Ordner im Repository hinzufügen, werden Ihnen hier zusätzliche Auswertungsmöglichkeiten angezeigt.",
			temperature: "Temperatur",
			upload: "Hochladen",
			uploadafile: "Datei hochladen",
			selectfile: "Datei auswählen",
			addfiles: "Datei(en) hinzufügen",
			clear: "Löschen",
			dragorselectfile: "Ziehen Sie eine LRC-Datei hierher oder wählen Sie sie von der Festplatte aus",
			analysissync: "Analysen synchronisieren",
			file: "Datei",
			detail: "Detail",
			showeverything: "Alles anzeigen",
			next: "Weiter",
			prev: "Zurück",
			back: "Zurück",
			close: "Schließen",
			reload: "Neu laden",
			open: "Öffnen",
			description: "Beschreibung",
			author: "Autor",
			license: "Lizenz",
			recordedat: "Aufgenommen am",
			displaysettings: "Anzeigeeinstellungen",
			filerendering: "Thermogramm-Wiedergabe",
			pixelated: "Pixelig",
			smooth: "Glatt",
			filerenderinghint: "Der Modus 'Pixelig' deaktiviert das Glätten und zeigt die Pixel des Thermogramms exakt so, wie sie sind.",
			adjusttimescale: "Temperaturbereich",
			automaticrange: "Automatischer Bereich",
			fullrange: "Voller Bereich",
			adjusttimescalehint: "Temperaturskala automatisch (häufigste Temperaturen im Histogramm) oder auf die minimalen und maximalen Temperaturen erweitern.",
			palettename: "Palette {{name}}",
			colourpalettehint: "Wählen Sie eine Farbpalette",
			numfiles: "{{num}} Dateien",
			fileinfo: "Dateiinformationen",
			thermalfilename: "Name der IR-Datei",
			thermalfileurl: "URL der IR-Datei",
			thermalfiledownload: "IR-Datei herunterladen",
			visiblefilename: "Name der sichtbaren Datei",
			visiblefileurl: "URL der sichtbaren Datei",
			visiblefiledownload: "Sichtbares Bild herunterladen",
			togglevisibleimage: "IR/VIS-Bild umschalten",
			time: "Zeit",
			duration: "Sequenzdauer",
			resolution: "Auflösung",
			bytesize: "Bytes",
			minimaltemperature: "Minimale Temperatur",
			maximaltemperature: "Maximale Temperatur",
			filetype: "Dateityp",
			type: "Typ",
			supporteddevices: "Kompatible Geräte",
			download: "Herunterladen",
			downloadoriginalfiles: "- Einzelne Dateien",
			downloadoriginalfileshint: "Laden Sie alle Original-IR-Dateien herunter",
			downloadoriginalfile: "- Original-IR-Datei {{type}}",
			exportcurrentframeaspng: "- Aktuelles Bild",
			convertentiresequencetovideo: "- Gesamte Sequenz in Video umwandeln",
			pngofindividualimages: "- Einzelne Dateien",
			pngofindividualimageshint: "Exportieren Sie jede Datei einzeln als Bild.",
			pngofentiregroup: "- Gruppe",
			pngofentiregrouphint: "Exportieren Sie die gesamte Gruppe in eine einzelne Datei.",
			csvofanalysisdata: "- Analysedaten",
			csvofanalysisdatahint: "Tabelle mit Temperaturen aus den aktuell festgelegten Analysen",
			exportimagewidth: "Exportierte Bildbreite",
			exportimagefontsize: "Exportierte Bildschriftgröße",
			exportgroupname: "Exportgruppenname",
			exportfilenames: "Dateinamen exportieren",
			exportdimensions: "Exportabmessungen",
			exportgroup: "Gruppe exportieren",
			exportcontent: "Inhalt exportieren",
			numberofcolumns: "Anzahl der Spalten",
			thermalscale: "Thermische Skala",
			thermalrange: "Temperaturbereich",
			analyses: "Analysen",
			filedate: "Dateidatum",
			folder: "Ordner",
			folders: "Ordner",
			range: "Bereich",
			info: "Info",
			note: "Hinweis",
			group: "Gruppe",
			donotgroup: "Nicht gruppieren",
			groupby: "Gruppieren nach {{era}}",
			groupped: "grupiert",
			showingfolder: "Ordner anzeigen",
			showingfolders: "Ordner anzeigen",
			and: "und",
			or: "oder",
			doyouwanttoadd: "Möchten Sie auch anzeigen",
			youmayalsoadd: "Sie können auch anzeigen",
			bydays: "nach Tagen",
			byhours: "nach Stunden",
			byweeks: "nach Wochen",
			bymonths: "nach Monaten",
			byyears: "nach Jahren",
			play: "Abspielen",
			pause: "Pause",
			stop: "Stopp",
			date: "Datum",
			frame: "Bild",
			playbackspeed: "Abspielgeschwindigkeit",
			graphlines: "Grafiklinien",
			straightlines: "Gerade Linien",
			smoothlines: "Glatte Linien",
			graphlineshint: "'Glatte Linien' können Trends besser darstellen, sind jedoch weniger präzise. Wenn Sie genau sehen möchten, was im Thermogramm ist, wählen Sie 'Gerade Linien'.",
			analysis: "Analyse",
			avg: "MITTL",
			min: "MIN",
			max: "MAX",
			size: "Größe",
			edit: "Bearbeiten",
			editsth: "{{what}} bearbeiten",
			remove: "Entfernen",
			addpoint: "Punkt hinzufügen",
			addellipsis: "Ellipse hinzufügen",
			addrectangle: "Rechteck hinzufügen",
			analysishint: "Markieren Sie einen Bereich im Thermogramm, um hier eine Übersicht seiner Temperaturen zu sehen.",
			graph: "Grafik",
			graphhint1: "Fügen Sie zuerst eine Analyse hinzu!",
			graphhint2: "Klicken Sie auf einen <thermal-btn variant='background' non-interactive tooltip='Sie finden sie in der obigen Tabelle...'>Wert</thermal-btn> einer Analyse, um hier die Grafik zu sehen!",
			rectangle: "Rechteck",
			ellipsis: "Ellipse",
			point: "Punkt",
			name: "Name",
			color: "Farbe",
			top: "Oben",
			left: "Links",
			right: "Rechts",
			bottom: "Unten",
			columns: "{{num}} Bilder in einer Reihe",
			fromto: "Von {{from}} bis {{to}}",
			downloadgraphdataascsv: "Grafikdaten als CSV herunterladen",
			apparenttemperature: "Gefühlte Temperatur",
			apparenttemperaturehint: "Dieser Konverter verwendet das Modell der gefühlten Temperatur <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.",
			airtemperature: "Lufttemperatur",
			relativeairhumidity: "Relative Luftfeuchtigkeit",
			windspeed: "Windgeschwindigkeit",
			inpercent: "in Prozent",
			apparenttemperatureverbose: "Das Thermometer zeigt {{t}} °C, aber durch Feuchtigkeit und Wind fühlt es sich wie {{app}} °C an.",
			youfeelwarmer: "Die gefühlte Temperatur ist {{diff}} °C höher als die Lufttemperatur.",
			youfeelcolder: "Die gefühlte Temperatur ist {{diff}} °C niedriger als die Lufttemperatur.",
			inspecttemperatures: "Temperaturen inspizieren",
			usemousetoinspecttemperaturevalues: "Verwenden Sie die Maus, um Temperaturwerte zu inspizieren.",
			editanalysis: "Analyse bearbeiten",
			dragcornersofselectedanalysis: "Ziehen Sie die Ecken der ausgewählten Analyse.",
			addpointanalysis: "Punktanalyse hinzufügen",
			clickandaddpoint: "Klicken Sie auf das Thermogramm, um eine Punktanalyse hinzuzufügen.",
			addrectangleanalysis: "Rechteckanalyse hinzufügen",
			clickandaddrectangle: "Klicken und ziehen Sie auf dem Thermogramm, um eine Rechteckanalyse hinzuzufügen.",
			addellipsisanalysis: "Elliptische Analyse hinzufügen",
			clickandaddellipsis: "Klicken und ziehen Sie auf dem Thermogramm, um eine elliptische Analyse hinzuzufügen.",
			tutorial: "Tutorial",
			colourpalette: "Farbpalette",
			palettehint: "Dropdown-Menü zum Wechseln der Farbpalette.",
			remotefoldersbrowser: "Browser für Remote-Ordner",
			server: "Server",
			networklog: "Netzwerkprotokoll",
			editfile: "Datei bearbeiten",
			editfolder: "Ordner bearbeiten",
			editcomment: "Kommentar bearbeiten",
			user: "Benutzer",
			griddisplay: "Als Raster anzeigen",
			tabledisplay: "Als Tabelle anzeigen",
			deletefile: "Datei löschen",
			deletefolder: "Ordner löschen",
			comments: "Kommentare",
			deletecomment: "Kommentar löschen",
			savecomment: "Kommentar speichern",
			addcomment: "Kommentar hinzufügen",
			nocomments: "Keine Kommentare",
			savechanges: "Änderungen speichern",
			uploadfile: "Datei hochladen",
			compactview: "Kompaktansicht",
			showdiscussion: "Diskussion anzeigen",
			edittags: "Tags bearbeiten",
			availabletags: "Verfügbare Tags",
			assignedtags: "Zugewiesene Tags",
			connectioninformation: "Verbindungsinformationen",
			serverurl: "Server-URL",
			servername: "Servername",
			login: "Anmelden",
			logout: "Abmelden",
			password: "Passwort",
			logoutmessage: "Möchten Sie sich wirklich abmelden?",
			loginerror: "Anmeldung nicht möglich.",
			accessibletologgedinusers: "Diese Seite ist nur für angemeldete Benutzer zugänglich.",
			export: "Export",
			exportvideo: "Video exportieren",
			exportpng: "Bild exportieren",
			exportdonotclosewindowhint: "Schließen Sie dieses Fenster nicht, die Datei wird automatisch heruntergeladen.",
			exportencodingfile: "Videodatei wird kodiert...",
			exportrecordingframes: "Frames werden aufgezeichnet...",
			histogram: "Histogramm",
			timeline: "Zeitleiste",
			exportwidth: "Breite",
			exportmargin: "Ränder",
			exportgap: "Abstand",
			exportgrahpheight: "Grafikhöhe",
			videoquality: "Videoqualität",
			imagecompression: "Bildkompression",
			theme: "Design",
			light: "Hell",
			dark: "Dunkel",
			foldermayhavefiles: "Ordner für Dateien",
			foldermayhavesubfolders: "Ordner für Unterordner"
		} },
		en: { translation: {
			moreoptions: "More options",
			delete: "Delete",
			create: "Create",
			createfolder: "Create a folder",
			createsubfolder: "Create a subfolder",
			subfolder: "Subfolder",
			display: "Display",
			syncanalyses: "Synchronise analyses",
			uploadedby: "Uploaded by",
			uploadeddat: "Uploaded at",
			overviewofyourfolders: "Overview of your folders",
			content: "Content",
			palette: "Palette",
			layout_simple: "Simple layout",
			layout_advanced: "Evaluation layout",
			layout_nogui: "No GUI",
			layout_lesson: "Lesson layout",
			share: "Share",
			fileloadingerror: "File loading error",
			embedhint: "To embed this block in another website, use the following code:",
			embedlibrary: "Insert the library - once in HTML head",
			embedcomponent: "Use the following code anywhere in HTML body",
			copy: "Copy",
			remotefoldersbrowseraddfolderhint: "If you add another folder in the storage, you will see additional evaluation options here.",
			loading: "Loading",
			config: "Settings",
			temperature: "Temperature",
			file: "File",
			upload: "Upload",
			uploadafile: "Upload a file",
			selectfile: "Select a file",
			addfiles: "Add file(s)",
			clear: "Clear",
			dragorselectfile: "Drag and drop an LRC file or select it from disk",
			detail: "Detail",
			showeverything: "Show everything",
			next: "Next",
			prev: "Previous",
			back: "Back",
			close: "Close",
			reload: "Reload",
			open: "Open",
			description: "Description",
			author: "Author",
			license: "License",
			recordedat: "Recorded at",
			displaysettings: "Display settings",
			filerendering: "File rendering",
			pixelated: "Pixelated",
			smooth: "Smooth",
			filerenderinghint: "'Pixelated' mode disables antialising of the thermogram and enables you to see its pixels as they are.",
			adjusttimescale: "Adjust temperature scale",
			automaticrange: "Automatic range",
			fullrange: "Full range",
			adjusttimescalehint: "Adjust the time scale automatically (based on histogram) or set its values to the full range (min and max).",
			palettename: "{{name}} palette",
			colourpalettehint: "Select colour palette of thermal display.",
			fileinfo: "File info",
			thermalfilename: "IR file name",
			thermalfileurl: "IR file URL",
			thermalfiledownload: "Download the IR file",
			visiblefilename: "Visual file name",
			visiblefileurl: "Visual file URL",
			visiblefiledownload: "Visual file download",
			togglevisibleimage: "Switch IR / VIS image",
			time: "Time",
			duration: "Duration",
			resolution: "Resolution",
			bytesize: "Bytesize",
			minimaltemperature: "Minimal temperature",
			maximaltemperature: "Maximal temperature",
			filetype: "File type",
			type: "Type",
			supporteddevices: "Supported devices",
			numfiles: "{{num}} files",
			download: "Download",
			downloadoriginalfiles: "- individual files",
			downloadoriginalfileshint: "Download all source IR files",
			downloadoriginalfile: "- Original thermal file {{type}}",
			exportcurrentframeaspng: "- Current frame",
			convertentiresequencetovideo: "- Convert entire sequence to video",
			pngofindividualimages: "- individual files",
			pngofindividualimageshint: "Export all files individually.",
			pngofentiregroup: "- group",
			pngofentiregrouphint: "Export the entire group as one image",
			csvofanalysisdata: "- analysis data",
			csvofanalysisdatahint: "Table of temperatures in analyses",
			exportimagewidth: "Exported image width",
			exportimagefontsize: "Exported image font size",
			exportgroupname: "Export group name",
			exportfilenames: "Export file names",
			exportdimensions: "Export dimensions",
			exportgroup: "Export group",
			exportcontent: "Export content",
			numberofcolumns: "Number of columns",
			thermalscale: "Thermal scale",
			thermalrange: "Thermal range",
			filedate: "File date",
			folder: "Folder",
			folders: "Folders",
			range: "Range",
			info: "Info",
			note: "Note",
			group: "Group",
			donotgroup: "Do not group",
			groupby: "Group {{era}}",
			groupped: "groupped",
			showingfolder: "Displaying the folder",
			showingfolders: "Displaying folders",
			and: "and",
			or: "or",
			doyouwanttoadd: "Do you want to diaplay also",
			youmayalsoadd: "You may also display",
			bydays: "by day",
			byhours: "by hour",
			byweeks: "by week",
			bymonths: "by month",
			byyears: "by year",
			play: "Play",
			pause: "Pause",
			stop: "Stop",
			date: "Date",
			frame: "Frame",
			playbackspeed: "Playback speed",
			graphlines: "Graph lines",
			straightlines: "Straight lines",
			smoothlines: "Smooth lines",
			graphlineshint: "'Smooth lines' can illustrate trends better, but are less precise. If you need to see exactly what is in the thermogram, use 'Straight lines'.",
			analysis: "Analysis",
			analyses: "Analyses",
			avg: "AVG",
			min: "MIN",
			max: "MAX",
			size: "Size",
			edit: "Edit",
			editsth: "Edit {{what}}",
			remove: "Remove",
			addpoint: "Add point",
			addellipsis: "Add ellipsis",
			addrectangle: "Add rectangle",
			analysishint: "You may select area in the IR image to see its temperatures.",
			graph: "Graph",
			graphhint1: "Add analysis first to see the graph!",
			graphhint2: "Click on an analysis <thermal-btn variant='background' interactive='false' tooltip='You can see them in the table above...'>value</thermal-btn> to see its graph here!",
			rectangle: "rectangle",
			ellipsis: "ellipsis",
			point: "point",
			name: "Name",
			color: "Color",
			top: "Top",
			left: "Left",
			right: "Right",
			bottom: "Bottom",
			columns: "{{num}} images in a row",
			fromto: "From {{from}} to {{to}}",
			downloadgraphdataascsv: "Download graph data as CSV",
			apparenttemperature: "Apparent temperature",
			apparenttemperaturehint: "This converter uses the apparent temperature model <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.",
			airtemperature: "Air temperature",
			relativeairhumidity: "Relative air humidity",
			windspeed: "Wind speed",
			inpercent: "in percent",
			analysissync: "Synchronise analyses",
			apparenttemperatureverbose: "The thermometer shows {{t}} °C, but due to humidity and wind, it feels like {{app}} °C outside.",
			youfeelwarmer: "The apparent temperature is {{diff}} °C higher than the air temperature.",
			youfeelcolder: "The apparent temperature is {{diff}} °C lower than the air temperature.",
			inspecttemperatures: "Inspect temperatures",
			usemousetoinspecttemperaturevalues: "Use mouse to inspect temperature values.",
			editanalysis: "Edit analysis",
			dragcornersofselectedanalysis: "Drag corners of any selected analysis.",
			addpointanalysis: "Add a point analysis",
			clickandaddpoint: "Click on the IR image to add a point analysis",
			addrectangleanalysis: "Add a rectangular analysis",
			clickandaddrectangle: "Click and drag on the IR image to add a rectangular analysis.",
			addellipsisanalysis: "Add an elyptical analysis",
			clickandaddellipsis: "Click and drag on the thermogram to add an elyptical analysis.",
			tutorial: "Tutorial",
			colourpalette: "Colour palette",
			palettehint: "Use the menu to change the colour palette.",
			remotefoldersbrowser: "Remote folders browser",
			server: "Server",
			networklog: "Network Log",
			editfile: "Edit File",
			editfolder: "Edit Folder",
			editcomment: "Edit Comment",
			user: "User",
			griddisplay: "Grid display",
			tabledisplay: "Table display",
			deletefile: "Delete File",
			deletefolder: "Delete Folder",
			comments: "Comments",
			deletecomment: "Delete Comment",
			savecomment: "Save Comment",
			addcomment: "Add Comment",
			nocomments: "No comments",
			savechanges: "Save Changes",
			uploadfile: "Upload File",
			compactview: "Compact View",
			showdiscussion: "Show Discussion",
			edittags: "Edit Tags",
			availabletags: "Available Tags",
			assignedtags: "Assigned Tags",
			connectioninformation: "Connection Information",
			serverurl: "Server URL",
			servername: "Server Name",
			login: "Login",
			logout: "Logout",
			password: "Password",
			logoutmessage: "Are you sure you want to log out?",
			loginerror: "Unable to log in.",
			accessibletologgedinusers: "This page is accessible only to logged-in users.",
			export: "Export",
			exportvideo: "Export Video",
			exportpng: "Export Image",
			exportdonotclosewindowhint: "Do not close this window, the file will download automatically.",
			exportencodingfile: "Encoding video file...",
			exportrecordingframes: "Recording frames...",
			histogram: "Histogram",
			timeline: "Timeline",
			exportwidth: "Width",
			exportmargin: "Margins",
			exportgap: "Gap",
			exportgrahpheight: "Graph height",
			videoquality: "Video quality",
			imagecompression: "Image compression",
			theme: "Theme",
			light: "Light",
			dark: "Dark",
			foldermayhavefiles: "Folder for files",
			foldermayhavesubfolders: "Folder for subfolders"
		} },
		fr: { translation: {
			moreoptions: "Plus d'options",
			delete: "Supprimer",
			create: "Créer",
			createfolder: "Créer un dossier",
			createsubfolder: "Créer un sous-dossier",
			subfolder: "Sous-dossier",
			display: "Affichage",
			syncanalyses: "Synchroniser les analyses",
			uploadedby: "Téléversé par",
			uploadeddat: "Téléversé le",
			overviewofyourfolders: "Aperçu de vos dossiers",
			content: "Contenu",
			palette: "Palette",
			loading: "Chargement",
			config: "Einstellungen",
			temperature: "Temperature",
			upload: "Téléverser",
			uploadafile: "Téléverser un fichier",
			selectfile: "Sélectionner un fichier",
			addfiles: "Ajouter un/des fichier(s)",
			clear: "Effacer",
			dragorselectfile: "Glissez-déposez un fichier LRC ou sélectionnez-le depuis le disque",
			share: "Partager",
			fileloadingerror: "Erreur de chargement du fichier",
			embedhint: "Pour intégrer ce bloc dans un autre site Web, utilisez le code suivant :",
			embedlibrary: "Insérez la bibliothèque – une seule fois dans l'en-tête HTML",
			embedcomponent: "Utilisez le code suivant n'importe où dans le corps HTML",
			copy: "Copier",
			remotefoldersbrowseraddfolderhint: "Si vous ajoutez un autre dossier dans le référentiel, vous verrez ici des options d'évaluation supplémentaires.",
			file: "fichier",
			detail: "Détail",
			showeverything: "Montrer tout",
			analysissync: "Synchroniser les analyses",
			layout_simple: "Disposition simple",
			layout_advanced: "Disposition d'analyse",
			layout_nogui: "Pas d'interface graphique",
			layout_lesson: "Disposition de leçon",
			next: "Avancer",
			prev: "Rétourner",
			back: "Au derriére",
			close: "Fermer",
			reload: "Recharger",
			open: "Ouvrir",
			description: "Description",
			author: "Auteur",
			license: "License",
			recordedat: "Enrégistré à",
			displaysettings: "Paramètres d'affichage",
			filerendering: "Rendu de l'image",
			pixelated: "Pixelisé",
			smooth: "Lisse",
			filerenderinghint: "Le mode 'Pixelisé' désactives le anticrénelage de l'image et monttres les pixels tels qu'ils sont.",
			adjusttimescale: "Ajuster l'échelle de température",
			automaticrange: "Gamme automatique",
			fullrange: "Gamme compléte",
			adjusttimescalehint: "Ajustez l'échelle de temps automatiquement (en fonction de l'histogramme) ou définissez ses valeurs sur la plage complète (min et max).",
			palettename: "Palette {{name}}",
			colourpalettehint: "Sélectionnez la palette de couleurs de l'affichage thermique.",
			fileinfo: "Informations sur le fichier",
			thermalfilename: "Nom du fichier IR",
			thermalfileurl: "URL du fichier IR",
			thermalfiledownload: "Télécharger le fichier IR",
			visiblefilename: "Nom de l'image visuel",
			visiblefileurl: "URL de l'image visuel",
			visiblefiledownload: "Télécharger l'image visuel",
			togglevisibleimage: "Commuter l'image IR / VIS",
			time: "Temps",
			duration: "Durée",
			resolution: "Résolution",
			minimaltemperature: "Température minimale",
			maximaltemperature: "Température maximale",
			filetype: "Genre du fichier",
			type: "Genre",
			supporteddevices: "Appareils compatibles",
			bytesize: "Taille en octets",
			numfiles: "{{num}} fichiers",
			download: "Télécharger",
			downloadoriginalfiles: "- fichiers individuels",
			downloadoriginalfileshint: "Téléchargez tous les fichiers IR sources",
			downloadoriginalfile: "- Fichier thermique original {{type}}",
			exportcurrentframeaspng: "- Cadre actuel en tant qu'image",
			convertentiresequencetovideo: "- Convertir la séquence entière en vidéo",
			pngofindividualimages: "- fichiers individuels",
			pngofindividualimageshint: "Exporter tous les fichiers individuellement.",
			pngofentiregroup: "- groupe",
			pngofentiregrouphint: "Exporter l'ensemble du groupe sous forme d'une seule image",
			csvofanalysisdata: "- données d'analyse",
			csvofanalysisdatahint: "Tableau des températures dans les analyses",
			exportimagewidth: "Largeur de l'image exportée",
			exportimagefontsize: "Taille de la police de l'image exportée",
			exportgroupname: "Nom du groupe exporté",
			exportfilenames: "Noms de fichiers exportés",
			exportdimensions: "Dimensions d'exportation",
			exportgroup: "Exporter le groupe",
			exportcontent: "Exporter le contenu",
			numberofcolumns: "Nombre de colonnes",
			thermalscale: "Échelle thermique",
			thermalrange: "Plage thermique",
			analyses: "Analyses",
			filedate: "Date du fichier",
			folder: "Dossier",
			folders: "Dossiers",
			range: "Gamme",
			info: "Info",
			note: "Note",
			group: "Groupe",
			donotgroup: "Ne pas groupper",
			groupby: "Groupe {{era}}",
			groupped: "groupés",
			showingfolder: "Affichage du dossier",
			showingfolders: "Affichage des dossiers",
			and: "et",
			or: "ou",
			doyouwanttoadd: "Voulez-vous afficher aussi",
			youmayalsoadd: "Vous pouvez afficher aussi",
			bydays: "par jour",
			byhours: "par heure",
			byweeks: "par semaine",
			bymonths: "par mois",
			byyears: "par année",
			play: "Lecture",
			pause: "Pause",
			stop: "Arrêter",
			date: "Date",
			frame: "Image",
			playbackspeed: "Vitesse de lecture",
			graphlines: "Lignes graphiques",
			straightlines: "Lignes droites",
			smoothlines: "Lignes lisses",
			graphlineshint: "Les « lignes lisses » peuvent mieux illustrer les tendances, mais sont moins précises. Si vous avez besoin de voir exactement ce qui se trouve sur le thermogramme, utilisez « Lignes droites ».",
			analysis: "Analyse",
			avg: "AVG",
			min: "MIN",
			max: "MAX",
			size: "Taille",
			edit: "Modifier",
			editsth: "Modifier {{what}}",
			remove: "Retirer",
			addpoint: "Ajouter un point",
			addellipsis: "Ajouter une ellipse",
			addrectangle: "Ajouter un rectangle",
			analysishint: "Vous pouvez sélectionner une zone dans l'image IR pour voir ses températures.",
			graph: "Graphique",
			graphhint1: "Ajoutez d'abord une analyse pour voir le graphique !",
			graphhint2: "Cliquez sur une <thermal-btn variant='background' interactive='false' tooltip='Vous pouvez les voir dans le tableau ci-dessus...'>valeur</thermal-btn> d'analyse pour voir son graphique ici !",
			rectangle: "rectangle",
			ellipsis: "ellipse",
			point: "point",
			name: "Nom",
			color: "Couleur",
			top: "Côté supérieure",
			left: "Côté gauche",
			right: "Côté droite",
			bottom: "Côté inférieure",
			columns: "{{num}} images par ligne",
			fromto: "De {{from}} à {{to}}",
			downloadgraphdataascsv: "Télécharger les données graphiques au format CSV",
			apparenttemperature: "Température ressentie",
			apparenttemperaturehint: "Ce convertisseur utilise le modèle de température ressentie <a href='{{href}}' target='_blank'>Australian Apparent Temperature</a>.",
			airtemperature: "Température de l'air",
			relativeairhumidity: "Humidité relative de l'air",
			windspeed: "Vitesse du vent",
			inpercent: "en pourcentage",
			apparenttemperatureverbose: "Le thermomètre indique {{t}} °C, mais en raison de l'humidité et du vent, la température ressentie est de {{app}} °C.",
			youfeelwarmer: "La température ressentie est de {{diff}} °C supérieure à la température de l'air.",
			youfeelcolder: "La température ressentie est de {{diff}} °C inférieure à la température de l'air.",
			inspecttemperatures: "Inspecter les températures",
			usemousetoinspecttemperaturevalues: "Utilisez la souris pour inspecter les valeurs de température.",
			editanalysis: "Modifier l'analyse",
			dragcornersofselectedanalysis: "Faites glisser les coins de l'analyse sélectionnée.",
			addpointanalysis: "Ajouter une analyse de point",
			clickandaddpoint: "Cliquez sur le thermogramme pour ajouter une analyse de point.",
			addrectangleanalysis: "Ajouter une analyse rectangulaire",
			clickandaddrectangle: "Cliquez et faites glisser sur le thermogramme pour ajouter une analyse rectangulaire.",
			addellipsisanalysis: "Ajouter une analyse elliptique",
			clickandaddellipsis: "Cliquez et faites glisser sur le thermogramme pour ajouter une analyse elliptique.",
			tutorial: "Tutoriel",
			colourpalette: "Palette",
			palettehint: "Utilisez le menu pour changer le palette.",
			remotefoldersbrowser: "Navigateur de dossiers distants",
			server: "Serveur",
			networklog: "Journal réseau",
			editfile: "Modifier le fichier",
			editfolder: "Modifier le dossier",
			editcomment: "Modifier le commentaire",
			user: "Utilisateur",
			griddisplay: "Afficher en grille",
			tabledisplay: "Afficher en tableau",
			deletefile: "Supprimer le fichier",
			deletefolder: "Supprimer le dossier",
			comments: "Commentaires",
			deletecomment: "Supprimer le commentaire",
			savecomment: "Enregistrer le commentaire",
			addcomment: "Ajouter un commentaire",
			nocomments: "Aucun commentaire",
			savechanges: "Enregistrer les modifications",
			uploadfile: "Téléverser un fichier",
			compactview: "Vue compacte",
			showdiscussion: "Afficher la discussion",
			edittags: "Modifier les tags",
			assignedtags: "Tags assignés",
			availabletags: "Tags disponibles",
			connectioninformation: "Informations de connexion",
			serverurl: "URL du serveur",
			servername: "Nom du serveur",
			login: "Connexion",
			logout: "Déconnexion",
			password: "Mot de passe",
			logoutmessage: "Êtes-vous sûr de vouloir vous déconnecter ?",
			loginerror: "Impossible de se connecter.",
			accessibletologgedinusers: "Cette page est accessible uniquement aux utilisateurs connectés.",
			export: "Exporter",
			exportvideo: "Exporter la vidéo",
			exportpng: "Exporter l'image",
			exportdonotclosewindowhint: "Ne fermez pas cette fenêtre, le fichier sera téléchargé automatiquement.",
			exportencodingfile: "Encodage du fichier vidéo...",
			exportrecordingframes: "Enregistrement des images...",
			histogram: "Histogramme",
			timeline: "Chronologie",
			exportwidth: "Largeur",
			exportmargin: "Marges",
			exportgap: "Espace",
			exportgrahpheight: "Hauteur du graphique",
			videoquality: "Qualité vidéo",
			imagecompression: "Compression d'image",
			theme: "Thème",
			light: "Clair",
			dark: "Sombre",
			foldermayhavefiles: "Dossier pour les fichiers",
			foldermayhavesubfolders: "Dossier pour les sous-dossiers"
		} }
	}
});
window.i18next = instance;
/** i18n engine exported from the `@labirthermal/webcomponents` package */
const i18webcomponents = instance;
//#endregion
//#region package.json
var name = "@labirthermal/webcomponents";
var version$1 = "2.0.0";
window.matchMedia("(prefers-color-scheme: dark)");
const DARK_MODE_CLASS = "thermal-dark-mode";
//#endregion
//#region src/styles/defaultStyles.ts
const version = version$1.toString().replaceAll(".", "-");
const getStylesheetId = (scope) => {
	return `labirthermal__${scope}__${version}`;
};
const cssStyleIsAppended = (scope) => {
	return document.getElementById(getStylesheetId(scope)) !== null;
};
const appendHeadCss = (scope, styles) => {
	if (!cssStyleIsAppended(scope)) {
		const element = document.createElement("style");
		element.setAttribute("id", getStylesheetId(scope));
		element.innerHTML = styles;
		document.head.appendChild(element);
	}
};
const addInlineStyles = () => {
	appendHeadCss("rootVariables", `

        :root {

            /** Colors */
            --thermal-foreground: black;
            --thermal-background: white;

            /** Primary - base */
            --thermal-primary-base: blue;
            --thermal-primary-base-dark: navy;
            --thermal-primary-base-light: lightblue;

            /** Primary */
            --thermal-primary: var( --thermal-primary-base );
            --thermal-primary-light: var( --thermal-primary-base-light );
            --thermal-primary-dark: var( --thermal-primary-base-dark );

            /** Slate -base */
            --thermal-slate-base: #8e8c8f;
            --thermal-slate-base-light: #dad7db;
            --thermal-slate-base-dark: #49474a;

            /** Slate */
            --thermal-slate: var( --thermal-slate-base );
            --thermal-slate-light: var( --thermal-slate-base-light );
            --thermal-slate-dark: var( --thermal-slate-base-dark );

            /** Gaps */
            --thermal-gap-base: 16px;
            --thermal-gap-sm: 17px;
            --thermal-gap-md: 18px;
            --thermal-gap-lg: 19px;
            --thermal-gap-xl: 20px; 
            --thermal-gap: var( --thermal-gap-base );

            /** Font sizes */
            --thermal-fs-base: 16px;
            --thermal-fs-sm: 16px;
            --thermal-fs-md: 16px;
            --thermal-fs-lg: 16px;
            --thermal-fs-xl: 16px; 
            --thermal-fs: var( --thermal-fs-base );
            --thermal-fs-small: calc( var( --thermal-fs ) * 0.9 );
            --thermal-fs-large: calc( var( --thermal-fs ) * 1.2 );

            /** Round corners */
            --thermal-radius-base: 5px;
            --thermal-radius-sm: 6px;
            --thermal-radius-md: 7px;
            --thermal-radius-lg: 8px;
            --thermal-radius-xl: 9px;
            --thermal-radius: var( --thermal-radius-base );

            /** Shadows */
            --thermal-shadow: 0px 0px 5px var( --thermal-slate-dark );
            --thermal-shadow-none: 0px 0px 0px transparent;

            --thermal-border-width: 1px;
            --thermal-border-style: solid;
        
        }

        :root {
        
            @media ( min-width: 640px ) {
                --thermal-gap: var( --thermal-gap-sm );
                --thermal-fs: var( --thermal-fs-sm );
                --thermal-radius: var( --thermal-radius-sm );
            }

            @media ( min-width: 960px ) {
                --thermal-gap: var( --thermal-gap-md );
                --thermal-fs: var( --thermal-fs-md );
                --thermal-radius: var( --thermal-radius-md );
            }
            
            @media ( min-width: 1250px ) {
                --thermal-gap: var( --thermal-gap-lg );
                --thermal-fs: var( --thermal-fs-lg );
                --thermal-radius: var( --thermal-radius-lg );
            }

            @media ( min-width: 1440px ) {
                --thermal-gap: var( --thermal-gap-xl );
                --thermal-fs: var( --thermal-fs-xl );
                --thermal-radius: var( --thermal-radius-xl );
            }
        
        }


            
        
        `);
	appendHeadCss("darkModeOverrides", `
        
            body.${DARK_MODE_CLASS} {

                --thermal-primary: aqua;
                --thermal-foreground: white;
                --thermal-background: black;
            
                --thermal-primary-light: var( --thermal-primary-base-dark );
                --thermal-primary-dark: var( --thermal-primary-base-light );

                --thermal-slate-light: var( --thermal-slate-base-dark );
                --thermal-slate-dark: var( --thermal-slate-base-light );
            
            }
            
        `);
	appendHeadCss("solarizedSkin", `*[skin="solarized"] {
--thermal-foreground: #cef0faff;
--thermal-background: #1d5766ff;

--thermal-slate-dark: #39aaa1ff;
--thermal-slate: #27888bff;
--thermal-slate-light: #073642;

--thermal-primary-dark: #defdffff;
--thermal-primary: #9de9f3ff;
--thermal-primary-light: #67bcddff;
}`);
	appendHeadCss("systemSkin", `*[skin="system"] {
--thermal-foreground: buttontext;
--thermal-background: field;
        
--thermal-slate: ButtonBorder;
--thermal-slate-dark: GrayText;
--thermal-slate-light: ButtonFace;

--thermal-primary: accentcolor;
--thermal-primary-dark: linktext;
--thermal-primary-light: selecteditem;
}`);
	appendHeadCss("darkSkin", `*[skin="dark"] {
--thermal-primary: aqua;
--thermal-foreground: white;
--thermal-background: black;

--thermal-primary-light: var( --thermal-primary-base-dark );
--thermal-primary-dark: var( --thermal-primary-base-light );

--thermal-slate-light: var( --thermal-slate-base-dark );
--thermal-slate-dark: var( --thermal-slate-base-light );
}`);
	appendHeadCss("darkHC", `*[skin="darkhc"] {
--thermal-foreground: black;
--thermal-background: white;
        
--thermal-slate: gray;
--thermal-slate-dark: #454545;
--thermal-slate-light: lightgray;

--thermal-primary: blue;
--thermal-primary-dark: navy;
--thermal-primary-light: lightblue;

}`);
	appendHeadCss("narrowCorners", `*[corners="narrow"] {
--thermal-radius: 0px;
`);
	appendHeadCss("lineStyles", `*[lines="big"] {
--thermal-border-width: 3px;
`);
};
//#endregion
//#region src/translations/Languages.ts
/**
* Keys of all translation keys.
* 
* In the comment is the englis version. Use only the keys in any t() function.
*/
let T = /* @__PURE__ */ function(T) {
	T["moreoptions"] = "moreoptions";
	T["loading"] = "loading";
	T["config"] = "config";
	T["temperature"] = "temperature";
	T["upload"] = "upload";
	T["uploadafile"] = "uploadafile";
	T["selectfile"] = "selectfile";
	T["addfiles"] = "addfiles";
	T["clear"] = "clear";
	T["dragorselectfile"] = "dragorselectfile";
	T["share"] = "share";
	T["fileloadingerror"] = "fileloadingerror";
	T["embedhint"] = "embedhint";
	T["embedlibrary"] = "embedlibrary";
	T["embedcomponent"] = "embedcomponent";
	T["copy"] = "copy";
	T["create"] = "create";
	T["remotefoldersbrowseraddfolderhint"] = "remotefoldersbrowseraddfolderhint";
	T["file"] = "file";
	T["layout_simple"] = "layout_simple";
	T["layout_advanced"] = "layout_advanced";
	T["layout_nogui"] = "layout_nogui";
	T["layout_lesson"] = "layout_lesson";
	/** Next */
	T["next"] = "next";
	/** Previous */
	T["prev"] = "prev";
	/** Back */
	T["back"] = "back";
	/** Close */
	T["close"] = "close";
	T["open"] = "open";
	T["detail"] = "detail";
	T["showeverything"] = "showeverything";
	T["palette"] = "palette";
	/** Description */
	T["description"] = "description";
	/** Author */
	T["author"] = "author";
	/** License */
	T["license"] = "license";
	/** Recorded at */
	T["recordedat"] = "recordedat";
	/** Display settings */
	T["displaysettings"] = "displaysettings";
	/** File rendering */
	T["filerendering"] = "filerendering";
	/** Pixelated */
	T["pixelated"] = "pixelated";
	/** Smooth */
	T["smooth"] = "smooth";
	/** 'Pixelated' mode disables antialising of the thermogram and enables you to see its pixels as they are. */
	T["filerenderinghint"] = "filerenderinghint";
	/** Adjust time scale */
	T["adjusttimescale"] = "adjusttimescale";
	T["automaticrange"] = "automaticrange";
	T["fullrange"] = "fullrange";
	/** Adjust the time scale automatically (based on histogram) or set its values to the full range (min and max). */
	T["adjusttimescalehint"] = "adjusttimescalehint";
	/** Select colour palette of thermal display. */
	T["colourpalettehint"] = "colourpalettehint";
	/** Palette {name} */
	T["palettename"] = "palettename";
	/** File info */
	T["fileinfo"] = "fileinfo";
	/** IR file name */
	T["thermalfilename"] = "thermalfilename";
	/** IR file URL */
	T["thermalfileurl"] = "thermalfileurl";
	/** Download the IR file */
	T["thermalfiledownload"] = "thermalfiledownload";
	/** Visible file name */
	T["visiblefilename"] = "visiblefilename";
	/** Visible file URL */
	T["visiblefileurl"] = "visiblefileurl";
	/** Download visible file */
	T["visiblefiledownload"] = "visiblefiledownload";
	T["togglevisibleimage"] = "togglevisibleimage";
	/** Time */
	T["time"] = "time";
	/** Duration */
	T["duration"] = "duration";
	/** Resolution */
	T["resolution"] = "resolution";
	/** Bytesize */
	T["bytesize"] = "bytesize";
	/** Minimal temperature */
	T["minimaltemperature"] = "minimaltemperature";
	/** Maximal temperature */
	T["maximaltemperature"] = "maximaltemperature";
	/** File type */
	T["filetype"] = "filetype";
	/** Type */
	T["type"] = "type";
	/** Supported devices */
	T["supporteddevices"] = "supporteddevices";
	T["numfiles"] = "numfiles";
	T["download"] = "download";
	T["downloadoriginalfiles"] = "downloadoriginalfiles";
	T["downloadoriginalfileshint"] = "downloadoriginalfileshint";
	T["downloadoriginalfile"] = "downloadoriginalfile";
	T["exportcurrentframeaspng"] = "exportcurrentframeaspng";
	T["convertentiresequencetovideo"] = "convertentiresequencetovideo";
	T["pngofindividualimages"] = "pngofindividualimages";
	T["pngofindividualimageshint"] = "pngofindividualimageshint";
	T["pngofentiregroup"] = "pngofentiregroup";
	T["pngofentiregrouphint"] = "pngofentiregrouphint";
	T["csvofanalysisdata"] = "csvofanalysisdata";
	T["csvofanalysisdatahint"] = "csvofanalysisdatahint";
	T["exportimagewidth"] = "exportimagewidth";
	T["exportimagefontsize"] = "exportimagefontsize";
	T["exportgroupname"] = "exportgroupname";
	T["exportfilenames"] = "exportfilenames";
	T["numberofcolumns"] = "numberofcolumns";
	T["exportdimensions"] = "exportdimensions";
	T["exportgroup"] = "exportgroup";
	T["thermalscale"] = "thermalscale";
	T["thermalrange"] = "thermalrange";
	T["filedate"] = "filedate";
	T["folder"] = "folder";
	T["folders"] = "folders";
	T["showingfolder"] = "showingfolder";
	T["showingfolders"] = "showingfolders";
	T["and"] = "and";
	T["or"] = "or";
	T["doyouwanttoadd"] = "doyouwanttoadd";
	T["youmayalsoadd"] = "youmayalsoadd";
	T["range"] = "range";
	T["info"] = "info";
	T["note"] = "note";
	T["group"] = "group";
	T["donotgroup"] = "donotgroup";
	T["groupby"] = "groupby";
	T["groupped"] = "groupped";
	T["bydays"] = "bydays";
	T["byhours"] = "byhours";
	T["byweeks"] = "byweeks";
	T["bymonths"] = "bymonths";
	T["byyears"] = "byyears";
	T["play"] = "play";
	T["pause"] = "pause";
	T["stop"] = "stop";
	T["date"] = "date";
	T["frame"] = "frame";
	T["playbackspeed"] = "playbackspeed";
	T["graphlines"] = "graphlines";
	T["straightlines"] = "straightlines";
	T["smoothlines"] = "smoothlines";
	T["graphlineshint"] = "graphlineshint";
	T["reload"] = "reload";
	T["analysis"] = "analysis";
	T["analyses"] = "analyses";
	T["avg"] = "avg";
	T["min"] = "min";
	T["max"] = "max";
	T["size"] = "size";
	T["edit"] = "edit";
	T["editsth"] = "editsth";
	T["remove"] = "remove";
	T["addpoint"] = "addpoint";
	T["addrectangle"] = "addrectangle";
	T["addellipsis"] = "addellipsis";
	T["analysishint"] = "analysishint";
	T["graph"] = "graph";
	T["graphhint1"] = "graphhint1";
	T["graphhint2"] = "graphhint2";
	T["rectangle"] = "rectangle";
	T["ellipsis"] = "ellipsis";
	T["point"] = "point";
	T["name"] = "name";
	T["color"] = "color";
	T["top"] = "top";
	T["left"] = "left";
	T["right"] = "right";
	T["bottom"] = "bottom";
	T["columns"] = "columns";
	T["fromto"] = "fromto";
	T["downloadgraphdataascsv"] = "downloadgraphdataascsv";
	T["apparenttemperature"] = "apparenttemperature";
	T["airtemperature"] = "airtemperature";
	T["relativeairhumidity"] = "relativeairhumidity";
	T["windspeed"] = "windspeed";
	T["inpercent"] = "inpercent";
	T["apparenttemperatureverbose"] = "apparenttemperatureverbose";
	T["youfeelwarmer"] = "youfeelwarmer";
	T["youfeelcolder"] = "youfeelcolder";
	T["apparenttemperaturehint"] = "apparenttemperaturehint";
	T["analysissync"] = "analysissync";
	/** Inspect tool */
	T["inspecttemperatures"] = "inspecttemperatures";
	T["usemousetoinspecttemperaturevalues"] = "usemousetoinspecttemperaturevalues";
	/**  Edit analysis tool */
	T["editanalysis"] = "editanalysis";
	T["dragcornersofselectedanalysis"] = "dragcornersofselectedanalysis";
	/** Add point tool */
	T["addpointanalysis"] = "addpointanalysis";
	T["clickandaddpoint"] = "clickandaddpoint";
	/** Add rectangle tool */
	T["addrectangleanalysis"] = "addrectangleanalysis";
	T["clickandaddrectangle"] = "clickandaddrectangle";
	/** Add ellipsis tool */
	T["addellipsisanalysis"] = "addellipsisanalysis";
	T["clickandaddellipsis"] = "clickandaddellipsis";
	/** Tutorial */
	T["tutorial"] = "tutorial";
	/** Colour Palette */
	T["colourpalette"] = "colourpalette";
	/** Use the dropdown to change the palette */
	T["palettehint"] = "palettehint";
	T["remotefoldersbrowser"] = "remotefoldersbrowser";
	/** Server */
	T["server"] = "server";
	T["networklog"] = "networklog";
	T["editfile"] = "editfile";
	T["editfolder"] = "editfolder";
	T["editcomment"] = "editcomment";
	T["user"] = "user";
	T["griddisplay"] = "griddisplay";
	T["tabledisplay"] = "tabledisplay";
	T["deletefile"] = "deletefile";
	T["deletefolder"] = "deletefolder";
	T["comments"] = "comments";
	T["deletecomment"] = "deletecomment";
	T["savecomment"] = "savecomment";
	T["addcomment"] = "addcomment";
	T["nocomments"] = "nocomments";
	T["savechanges"] = "savechanges";
	T["uploadfile"] = "uploadfile";
	T["compactview"] = "compactview";
	T["showdiscussion"] = "showdiscussion";
	T["edittags"] = "edittags";
	T["assignedtags"] = "assignedtags";
	T["availabletags"] = "availabletags";
	T["connectioninformation"] = "connectioninformation";
	T["serverurl"] = "serverurl";
	T["servername"] = "servername";
	T["login"] = "login";
	T["logout"] = "logout";
	T["logoutmessage"] = "logoutmessage";
	T["loginerror"] = "logineerror";
	T["password"] = "password";
	T["accessibletologgedinusers"] = "accessibletologgedinusers";
	T["display"] = "display";
	T["content"] = "content";
	T["syncanalyses"] = "syncanalyses";
	T["overviewofyourfolders"] = "overviewofyourfolders";
	T["uploadedby"] = "uploadedby";
	T["uploadeddat"] = "uploadeddat";
	T["createfolder"] = "createfolder";
	T["subfolder"] = "subfolder";
	T["createsubfolder"] = "createsubfolder";
	T["delete"] = "delete";
	T["export"] = "export";
	T["exportcontent"] = "exportcontent";
	T["histogram"] = "histogram";
	T["timeline"] = "timeline";
	T["exportwidth"] = "exportwidth";
	T["exportmargin"] = "exportmargin";
	T["exportgap"] = "exportgap";
	T["exportgrahpheight"] = "exportgrahpheight";
	T["imagecompression"] = "imagecompression";
	T["videoquality"] = "videoquality";
	T["exportvideo"] = "exportvideo";
	T["exportpng"] = "exportpng";
	T["exportrecordingframes"] = "exportrecordingframes";
	T["exportencodingfile"] = "exportencodingfile";
	T["exportdonotclosewindowhint"] = "exportdonotclosewindowhint";
	T["theme"] = "theme";
	T["light"] = "light";
	T["dark"] = "dark";
	T["foldermayhavefiles"] = "foldermayhavefiles";
	T["foldermayhavesubfolders"] = "foldermayhavesubfolders";
	return T;
}({});
const languagesObject = Object.fromEntries([
	{
		code: "cs",
		name: "Čeština",
		flag: "🇨🇿"
	},
	{
		code: "cy",
		name: "Cymraeg",
		flag: "🏴󠁧󠁢󠁷󠁬󠁳󠁿",
		disabled: true
	},
	{
		code: "de",
		name: "Deutsch",
		flag: "🇩🇪"
	},
	{
		code: "en",
		name: "English",
		flag: "🇬🇧"
	},
	{
		code: "fr",
		name: "Français",
		flag: "🇫🇷"
	}
].map((l) => [l.code, l]));
//#endregion
//#region src/translations/localeContext.ts
const localeContext = (0, _lit_context.createContext)("localeContext");
const initLocalesInTopLevelElement = (element) => {
	instance.on("languageChanged", (locale) => {
		element.locale = locale;
	});
	if (element.locale === void 0) element.locale = instance.language;
	else instance.changeLanguage(element.locale);
};
const localeMap = {
	cs: [
		"cs",
		"cz",
		"cs_CZ",
		"cs_CS"
	],
	fr: [
		"fr",
		"fr_FR",
		"fr_CA"
	],
	de: [
		"de",
		"de_DE",
		"de_AT",
		"de_CH"
	],
	cy: [
		"cy",
		"cy_GB",
		"cy"
	],
	en: [
		"en",
		"en_US",
		"en_GB",
		"en_CA",
		"en_AU",
		"en_NZ",
		"en_IE",
		"en_ZA"
	]
};
const localeConverter = {
	fromAttribute: (value) => {
		let safe = void 0;
		let index = 0;
		while (index < Object.keys(localeMap).length && safe === void 0) {
			const key = Object.keys(localeMap)[index];
			if (localeMap[key].includes(value)) safe = key;
			index++;
		}
		return safe ?? "en";
	},
	toAttribute: (value) => {
		return value;
	}
};
//#endregion
//#region src/utils/shortId.ts
/**
* Generation of short, collision-free identifiers used instead of full-length UUIDs.
*
* The identifiers are only ever used at runtime (as map keys, DOM ids and log prefixes),
* they are never persisted nor shared between pages. Therefore a short random string
* is sufficient - and uniqueness within the current document is guaranteed by keeping
* a registry of all identifiers issued so far.
*
* @module \@labirthermal/webcomponents
* @author Jan Jáchim <jachim@ntc.zcu.cz>
*/
/** Alphabet used for the generated identifiers. Lowercase letters and digits only, so that the ids are safe to use in DOM ids, CSS selectors and slugs. */
const ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";
/** Default length of a generated identifier. 8 characters of the 36-letter alphabet give ~2.8e12 combinations. */
const DEFAULT_LENGTH = 8;
/** All identifiers issued within the current document. Guarantees that no two identifiers ever collide. */
const issuedIds = /* @__PURE__ */ new Set();
/** Fill the given array with random values, preferring the Web Crypto API and falling back to `Math.random`. */
const fillRandom = (buffer) => {
	const cryptoObject = typeof globalThis !== "undefined" ? globalThis.crypto : void 0;
	if (cryptoObject && typeof cryptoObject.getRandomValues === "function") {
		cryptoObject.getRandomValues(buffer);
		return buffer;
	}
	for (let i = 0; i < buffer.length; i++) buffer[i] = Math.floor(Math.random() * 256);
	return buffer;
};
/** Generate a random string of the given length using the {@link ALPHABET}. */
const randomString = (length) => {
	const buffer = fillRandom(new Uint8Array(length));
	let result = "";
	for (let i = 0; i < length; i++) result += ALPHABET[buffer[i] % 36];
	return result;
};
/**
* Generate a short identifier that is guaranteed to be unique within the current document.
*
* Should the random value happen to be taken already, a new one is generated. After
* a few unsuccessful attempts the identifier is lengthened, so that the function
* always terminates even when an extreme number of identifiers is in use.
*
* @param length The requested number of characters. Defaults to 8.
* @returns A unique lowercase alphanumeric identifier.
*/
const generateShortId = (length = DEFAULT_LENGTH) => {
	let currentLength = Math.max(1, Math.floor(length));
	let attempts = 0;
	while (true) {
		const candidate = randomString(currentLength);
		if (!issuedIds.has(candidate)) {
			issuedIds.add(candidate);
			return candidate;
		}
		attempts++;
		if (attempts % 5 === 0) currentLength++;
	}
};
//#endregion
//#region src/controllers/HierarchyUpdatesHub.ts
/** Perform updates in the hierarchy for all registered controllers */
var HierarchyUpdatesHub = class {
	constructor() {
		this._controllers = [];
	}
	/** Zaregistruje controller do hubu */
	register(controller) {
		this._controllers.push(controller);
		return controller;
	}
	/** Zavolá willUpdate na všech zaregistrovaných controllerech */
	willUpdate(changedProperties) {
		for (const controller of this._controllers) controller.hostWillUpdateWatcher?.(changedProperties);
	}
	/** Zavolá updated na všech zaregistrovaných controllerech */
	updated(changedProperties) {
		for (const controller of this._controllers) controller.hostUpdatedWatcher?.(changedProperties);
	}
};
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorateMetadata.js
function __decorateMetadata(k, v) {
	if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}
//#endregion
//#region \0@oxc-project+runtime@0.154.0/helpers/esm/decorate.js
function __decorate(decorators, target, key, desc) {
	var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
	if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
	else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
	return c > 3 && r && Object.defineProperty(target, key, r), r;
}
//#endregion
//#region src/hierarchy/AbstractThermalElement.ts
/** 
* All the webcomponents of \@labirthermal/webcomponents (and its extensions) should be based on the abstract class `AbstractThermalElement`. 
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
var AbstractThermalElement = class extends lit.LitElement {
	constructor(..._args) {
		super(..._args);
		this.languageChanged = (locale) => {
			this._locale = locale;
		};
	}
	/** 
	* Get the hierarchy for the purpose of managing updates using hierarchy controllers 
	* @see {@link HierarchyUpdatesHub}
	* @internal
	*/
	initHierarchy() {
		if (!this._hierarchy) this._hierarchy = new HierarchyUpdatesHub();
		return this._hierarchy;
	}
	/** 
	* A short identifier of this instance, generated lazily. 
	* It is guaranteed to be unique within the current document.
	* @see {@link generateShortId}
	*/
	get UUID() {
		if (this._UUID === void 0) this._UUID = generateShortId();
		return this._UUID;
	}
	getUUID(msg) {
		return this.UUID + "_" + msg;
	}
	/** A standardised way to log messages to the console prepending this webcomponent's tag name and UUID for easier identification */
	log(...args) {
		console.log(this.tagName, this.UUID, ...args);
	}
	static {
		this.shadowRootOptions = {
			...lit.LitElement.shadowRootOptions,
			mode: "open"
		};
	}
	connectedCallback() {
		super.connectedCallback();
		this._locale = instance.language;
		instance.on("languageChanged", this.languageChanged);
	}
	disconnectedCallback() {
		instance.off("languageChanged", this.languageChanged);
		super.disconnectedCallback();
	}
	/** 
	* Renders an SVG string safely using the unsafeSVG directive 
	* @see {@link unsafeSVG}
	*/
	i(str) {
		return lit.html`${(0, lit_directives_unsafe_svg_js.unsafeSVG)(str)}`;
	}
	/** 
	* Returns a translated string 
	* @see {@link T}
	*/
	t(key) {
		return t$1(T[key]);
	}
	willUpdate(changedProperties) {
		super.willUpdate?.(changedProperties);
		this._hierarchy?.willUpdate(changedProperties);
	}
	updated(changedProperties) {
		super.updated?.(changedProperties);
		this._hierarchy?.updated(changedProperties);
	}
};
__decorate([(0, _lit_context.consume)({
	context: localeContext,
	subscribe: true
}), __decorateMetadata("design:type", String)], AbstractThermalElement.prototype, "_locale", void 0);
//#endregion
//#region src/controllers/AbstractReactiveController.ts
/** 
* This is the abstract class for all reactive controllers from the `@labirthermal/webcomponents` package. 
* @module @labirthermal/webcomponents
*/
var AbstractReactiveController = class {
	constructor(host) {
		this.host = host;
		host.addController(this);
	}
	/** Logs anything using the host's logging mechanism. Adds the controller's className as the first argument. */
	log(...args) {
		this.host.log(this.constructor.name, ...args);
	}
};
//#endregion
//#region src/controllers/AbstractHierarchyController.ts
/** 
* Common internal state for host elements that should be only internal states. 
* @module @labirthermal/core
* @author Jan Jáchim <jachim@zcu.cz>
* @see {@link AbstractReactiveController}
*/
const INTERNAL_STATE_DECLARATION = {
	reflect: false,
	state: true
};
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
var AbstractHierarchyController = class extends AbstractReactiveController {
	constructor(host) {
		super(host);
		this.host.initHierarchy().register(this);
	}
	/** Retrieve the default slug from the host element, falling back to the element UUID. Should be called only in host connected. */
	_getDefaultSlugFromHost(primaryAttributeName) {
		return this.host.getAttribute(primaryAttributeName) ?? this.host.getAttribute("slug") ?? this.UUID;
	}
};
//#endregion
//#region src/controllers/FileAnalysisSynchronisator.ts
var FileAnalysisSynchronisator = class FileAnalysisSynchronisator {
	/** Lit.js is using null for removed attributes - we need normalize the value to either string or undefined. */
	static normalize(value) {
		return value?.trim() || void 0;
	}
	get _attributeValue() {
		return this._controller.host[this._attribute];
	}
	set _attributeValue(value) {
		if (value !== this._controller.host[this._attribute]) this._controller.host[this._attribute] = value;
	}
	get _mountKey() {
		return `${this._controller.UUID}_slot_${this._slotNumber}`;
	}
	get _internalSerialized() {
		return this._slotObject?.serialized;
	}
	get _slotObject() {
		return this._fileObject?.slots.getSlot(this._slotNumber);
	}
	constructor(_controller, _slotNumber) {
		this._controller = _controller;
		this._slotNumber = _slotNumber;
		this._attribute = `analysis${this._slotNumber}`;
	}
	/** Enables the listeners and internal objects necessary for synchronisation of the file analysis slot */
	fileAssigned(instance, coreWins = false) {
		this._fileObject = instance;
		instance.slots.getOnSerializeManager(this._slotNumber)?.set(this._controller.UUID, (value) => {
			if (value !== this._attributeValue) this._attributeValue = value;
		});
		const syncAction = () => {
			const attribute = FileAnalysisSynchronisator.normalize(this._attributeValue);
			if (coreWins || attribute === void 0) this._attributeValue = this._slotObject?.serialized;
			else this._applyToCore(attribute);
		};
		if (instance.dom?.built) syncAction();
		else instance.onMount.set(this._mountKey, () => {
			syncAction();
		});
	}
	/** Deactivates the listeners and internal objects - stopping the synchronisation of analyses */
	fileUnassigned() {
		this._fileObject?.slots.getOnSerializeManager(this._slotNumber)?.delete(this._controller.UUID);
		this._fileObject?.onMount.delete(this._mountKey);
		this._fileObject = void 0;
	}
	/** Looks for the changed attributes of the host and propagates them to internal state if necessary */
	handleHostUpdate(changedValues) {
		if (changedValues.has(this._attribute)) {
			const value = FileAnalysisSynchronisator.normalize(this._attributeValue);
			if (this._internalSerialized !== value) {
				if (this._fileObject?.dom?.built) this._applyToCore(value);
			}
		}
	}
	/** Very carrefully propagate the host attribute value to the analysis slot - this method manipulates the internal state of @labirthermal/core */
	_applyToCore(value) {
		const file = this._fileObject;
		if (!file) return;
		const slot = this._slotObject;
		if (value === void 0) {
			if (slot) file.slots.removeSlotAndAnalysis(this._slotNumber);
		} else if (slot) {
			slot.recieveSerialized(value);
			const canvasRoot = file.dom?.canvasLayer?.getLayerRoot();
			if (canvasRoot && !canvasRoot.contains(slot.analysis.layerRoot)) canvasRoot.appendChild(slot.analysis.layerRoot);
		} else file.slots.createAnalysisFromSerialized(value, this._slotNumber)?.setSelected();
	}
};
//#endregion
//#region src/controllers/FileAnalysisSynchronisators.ts
var FileAnalysisSynchronisators = class {
	constructor(_controller) {
		this._controller = _controller;
		this._synchronisators = [];
		for (let i = 1; i <= 7; i++) this._synchronisators.push(new FileAnalysisSynchronisator(this._controller, i));
	}
	_forEach(callback) {
		for (const synchronisator of this._synchronisators) callback(synchronisator);
	}
	/** Every synchronisator object will look into the changed properties and update its internal state accordingly */
	handleHostUpdate(changedValues) {
		this._forEach((synchronisator) => synchronisator.handleHostUpdate(changedValues));
	}
	/** Every synchronisator will be notified that a file has been assigned */
	handleFileAssigned(instance, coreWins = false) {
		this._forEach((synchronisator) => synchronisator.fileAssigned(instance, coreWins));
	}
	/** Every synchronisator will be notified that a file has been removed */
	handleFileUnassigned() {
		this._forEach((synchronisator) => synchronisator.fileUnassigned());
	}
};
//#endregion
//#region src/controllers/FileController.ts
/** A crucial context for exporting the `FileController` object. */
const fileControllerContext = (0, _lit_context.createContext)("file-controller-context");
/** A crucial context exposing the `ThermalFileInstance` object from `FileController`. */
const fileContext = (0, _lit_context.createContext)("file-object-context");
/** Expose the file error value from the `FileController`. */
const fileFailureContext = (0, _lit_context.createContext)("file-failure-object");
/** Whether a file request is in progress; independent of readiness or an existing instance. */
const fileLoadingContext = (0, _lit_context.createContext)("file-loading");
/** File ready value from the `FileController` */
const fileReadyContext = (0, _lit_context.createContext)("file-ready-context");
/**. Current file MS value exposed as context. */
const fileMsContext = (0, _lit_context.createContext)("file-ms-context");
/** File time cursor indicvates the MS on which an arbitrary HTML may be recplaced. Undended to share across elements such as timeline ang graph. In those, the context shall be set on hover using `FileController.setFileTimeCursorPercentage()` */
const fileTimeCursorContext = (0, _lit_context.createContext)("file-time-cursor");
const fileCurrentFrameContext = (0, _lit_context.createContext)("file-current-frame-context");
/** Exposes the current file duration from `FileController` */
const fileDurationContext = (0, _lit_context.createContext)("file-duration-context");
/** Exposes the current playing state from `FileController`.  */
const filePlayingContext = (0, _lit_context.createContext)("file-playing-context");
/** Exposes the current playback speed value from `FileController`. */
const filePlaybackSpeedContext = (0, _lit_context.createContext)("file-playback-speed");
/** Exposes the current recording state from `FileController`. */
const fileRecordingContext = (0, _lit_context.createContext)("file-is-recording-state");
/** Exposes the current may stop state from the `FileController` */
const fileMayStopContext = (0, _lit_context.createContext)("file-may-stop-state");
/** Exposes the array of current analyses from the `FileController` */
const fileAnalysisListContext = (0, _lit_context.createContext)("file-analysis-list");
/** Unified properties of an analysis attribute of the host webcomponent */
const ANALYSIS_STATE_DECLARATION = {
	type: String,
	reflect: true
};
/** The `FileController` is responsible for managing the state and interactions related to a file within the hierarchy. 
* 
* @author Jan Jáchim <jachim@zcu.cz>
* @module @labirthermal/webcomponents
*/
var FileController = class extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	static {
		this.HOST_PROPERTIES = {
			managerController: INTERNAL_STATE_DECLARATION,
			registryController: INTERNAL_STATE_DECLARATION,
			groupController: INTERNAL_STATE_DECLARATION,
			fileController: INTERNAL_STATE_DECLARATION,
			file: INTERNAL_STATE_DECLARATION,
			failure: INTERNAL_STATE_DECLARATION,
			loading: INTERNAL_STATE_DECLARATION,
			ms: {
				type: Number,
				reflect: true,
				attribute: "ms"
			},
			playbackSpeed: {
				type: Number,
				reflect: true,
				attribute: "speed"
			},
			analysis1: ANALYSIS_STATE_DECLARATION,
			analysis2: ANALYSIS_STATE_DECLARATION,
			analysis3: ANALYSIS_STATE_DECLARATION,
			analysis4: ANALYSIS_STATE_DECLARATION,
			analysis5: ANALYSIS_STATE_DECLARATION,
			analysis6: ANALYSIS_STATE_DECLARATION,
			analysis7: ANALYSIS_STATE_DECLARATION,
			autoHighlight: {
				type: Boolean,
				reflect: true,
				attribute: "autohighlight"
			}
		};
	}
	get fileObject() {
		return this.host.file;
	}
	get failure() {
		return this.host.failure;
	}
	get ms() {
		return this.host.ms;
	}
	get playbackSpeed() {
		return this.host.playbackSpeed;
	}
	get analysis1() {
		return this.host.analysis1;
	}
	get analysis2() {
		return this.host.analysis2;
	}
	get analysis3() {
		return this.host.analysis3;
	}
	get analysis4() {
		return this.host.analysis4;
	}
	get analysis5() {
		return this.host.analysis5;
	}
	get analysis6() {
		return this.host.analysis6;
	}
	get analysis7() {
		return this.host.analysis7;
	}
	get autoHighlight() {
		return this.host.autoHighlight;
	}
	get ready() {
		return this.readyContextProvider.value;
	}
	get recording() {
		return this.fileRecordingContextProvider.value;
	}
	get playing() {
		return this.filePlayingContextProvider.value;
	}
	get mayStop() {
		return this.fileMayStopContextProvider.value;
	}
	get cursor() {
		return this.fileCursorContextProvider.value;
	}
	get currentFrame() {
		return this.fileCurrentFrameContextProvider.value;
	}
	get analyses() {
		return this.fileAnalysesContextProvider.value;
	}
	get duration() {
		return this.fileDurationContextProvider.value;
	}
	constructor(host) {
		super(host);
		this.onLoadingStart = new _labirthermal_core.CallbacksManager();
		this.onSuccess = new _labirthermal_core.CallbacksManager();
		this.onFailure = new _labirthermal_core.CallbacksManager();
		this._analysisSynchronisators = new FileAnalysisSynchronisators(this);
		this._UUID = host.UUID + "_file-controller";
		this.fileControllerContextProvider = new _lit_context.ContextProvider(this.host, {
			context: fileControllerContext,
			initialValue: this
		});
		this.fileContextProvider = new _lit_context.ContextProvider(this.host, { context: fileContext });
		this.fileFailureContextProvider = new _lit_context.ContextProvider(this.host, { context: fileFailureContext });
		this.loadingContextProvider = new _lit_context.ContextProvider(this.host, {
			context: fileLoadingContext,
			initialValue: false
		});
		this.readyContextProvider = new _lit_context.ContextProvider(this.host, {
			context: fileReadyContext,
			initialValue: false
		});
		this.fileDurationContextProvider = new _lit_context.ContextProvider(this.host, { context: fileDurationContext });
		this.fileCurrentFrameContextProvider = new _lit_context.ContextProvider(this.host, { context: fileCurrentFrameContext });
		this.fileCursorContextProvider = new _lit_context.ContextProvider(this.host, { context: fileTimeCursorContext });
		this.fileMsContextProvider = new _lit_context.ContextProvider(this.host, { context: fileMsContext });
		this.filePlaybackSpeedContextProvider = new _lit_context.ContextProvider(this.host, { context: filePlaybackSpeedContext });
		this.filePlayingContextProvider = new _lit_context.ContextProvider(this.host, { context: filePlayingContext });
		this.fileRecordingContextProvider = new _lit_context.ContextProvider(this.host, { context: fileRecordingContext });
		this.fileMayStopContextProvider = new _lit_context.ContextProvider(this.host, { context: fileMayStopContext });
		this.fileAnalysesContextProvider = new _lit_context.ContextProvider(this.host, {
			context: fileAnalysisListContext,
			initialValue: []
		});
		this._propagateHighlightCache = () => this._propagateHighlight();
		this._unpropagateHighlightCache = () => this._unpropagateHighlight();
	}
	hostConnected() {
		this.host.addEventListener("mouseenter", this._propagateHighlightCache);
		this.host.addEventListener("focus", this._propagateHighlightCache);
		this.host.addEventListener("mouseleave", this._unpropagateHighlightCache);
		this.host.addEventListener("blur", this._unpropagateHighlightCache);
		if (this._attached) {
			this._propagateContexts(this._attached);
			this._bindListeners(this._attached, true);
		}
	}
	hostDisconnected() {
		this.host.removeEventListener("mouseenter", this._propagateHighlightCache);
		this.host.removeEventListener("focus", this._propagateHighlightCache);
		this.host.removeEventListener("mouseleave", this._unpropagateHighlightCache);
		this.host.removeEventListener("blur", this._unpropagateHighlightCache);
		this._unpropagateHighlight();
		if (this._attached) this._unbindListeners(this._attached);
	}
	hostWillUpdateWatcher(value) {
		if (value.has("file")) this._syncAssignment();
		this._analysisSynchronisators.handleHostUpdate(value);
		if (value.has("ms")) this.setMs(this.host.ms);
		if (value.has("playbackSpeed") && this.host.file && this.host.file.timeline.isSequence) {
			if (this.host.playbackSpeed !== this.host.file.timeline.playbackSpeed) this.host.file.timeline.playbackSpeed = this.host.playbackSpeed;
		}
	}
	hostUpdatedWatcher() {}
	_propagateContexts(instance) {
		this.fileContextProvider.setValue(instance);
		this.readyContextProvider.setValue(true);
		this.fileDurationContextProvider.setValue({
			ms: instance.timeline.duration,
			time: instance.timeline.formatDuration(instance.timeline.duration)
		});
		this._propagateInstanceCurrentFrame(instance);
		this._propagateInstanceAnalysesArray(instance);
		this.fileMsContextProvider.setValue(instance.timeline.currentMs);
		this.filePlaybackSpeedContextProvider.setValue(instance.timeline.playbackSpeed);
		this.filePlayingContextProvider.setValue(instance.timeline.isPlaying);
		this.fileMayStopContextProvider.setValue(instance.recording.mayStop);
		this.fileRecordingContextProvider.setValue(instance.recording.value);
	}
	_resetAllContexts() {
		this.readyContextProvider.setValue(false);
		this.fileDurationContextProvider.setValue(void 0);
		this.fileCurrentFrameContextProvider.setValue(void 0);
		this.fileAnalysesContextProvider.setValue([]);
		this.fileContextProvider.setValue(void 0);
		this.fileRecordingContextProvider.setValue(false);
		this.filePlayingContextProvider.setValue(false);
		this.fileMayStopContextProvider.setValue(true);
		this.fileMsContextProvider.setValue(0);
		this.fileCursorContextProvider.setValue(void 0);
	}
	_syncAssignment() {
		const next = this.host.file;
		if (next === this._attached) return;
		const previous = this._attached;
		if (previous) this._detach(previous);
		if (next) this._attach(next, previous !== void 0);
		else {
			this._resetAllContexts();
			this.host.ms = 0;
		}
	}
	_attach(instance, isReplacement) {
		this._attached = instance;
		this.fileContextProvider.setValue(instance);
		this.host.failure = void 0;
		this.fileFailureContextProvider.setValue(void 0);
		if (this.host.playbackSpeed !== void 0) instance.timeline.playbackSpeed = this.host.playbackSpeed;
		this._propagateContexts(instance);
		this._bindListeners(instance);
		if (!isReplacement && this.host.ms > 0 && instance.timeline.isSequence) this.setMs(this.host.ms);
		else this.host.ms = instance.timeline.currentMs;
		this.setLoading(false);
		this.onSuccess.call(instance);
	}
	_detach(instance) {
		this._unbindListeners(instance);
		this._unpropagateHighlight();
		this._attached = void 0;
		instance.unmountFromDom();
	}
	_bindListeners(instance, coreWins = false) {
		instance.timeline.callbacksPlay.set(this.UUID, () => {
			this.filePlayingContextProvider.setValue(true);
		});
		instance.timeline.callbacksPause.set(this.UUID, () => {
			this.filePlayingContextProvider.setValue(false);
		});
		instance.timeline.callbacksStop?.set(this.UUID, () => {
			this.filePlayingContextProvider.setValue(false);
		});
		instance.timeline.callbacksEnd?.set(this.UUID, () => {
			this.filePlayingContextProvider.setValue(false);
		});
		instance.timeline.callbacksChangeFrame.set(this.UUID, (frame) => {
			const value = {
				ms: frame.relative,
				time: instance.timeline.currentTime,
				percentage: instance.timeline.currentPercentage,
				index: frame.index,
				absolute: frame.absolute
			};
			this.fileCurrentFrameContextProvider.setValue(value);
			this.host.ms = frame.relative;
			this.fileMsContextProvider.setValue(frame.relative);
		});
		instance.timeline.callbackdPlaybackSpeed.set(this.UUID, (speed) => {
			this.host.playbackSpeed = speed;
			this.filePlaybackSpeedContextProvider.setValue(speed);
		});
		instance.recording.callbackMayStop.set(this.UUID, (value) => {
			this.fileMayStopContextProvider.setValue(value);
		});
		instance.recording.addListener(this.UUID, (value) => {
			this.fileRecordingContextProvider.setValue(value);
		});
		instance.analysis.addListener(this.UUID, (value) => {
			this.fileAnalysesContextProvider.setValue(value);
		});
		this._analysisSynchronisators.handleFileAssigned(instance, coreWins);
	}
	_unbindListeners(instance) {
		instance.timeline.callbacksPlay.delete(this.UUID);
		instance.timeline.callbacksPause.delete(this.UUID);
		instance.timeline.callbacksStop.delete(this.UUID);
		instance.timeline.callbacksEnd.delete(this.UUID);
		instance.timeline.callbacksChangeFrame.delete(this.UUID);
		instance.timeline.callbackdPlaybackSpeed.delete(this.UUID);
		instance.recording.removeListener(this.UUID);
		instance.recording.callbackMayStop?.delete(this.UUID);
		instance.analysis.removeListener(this.UUID);
		this._analysisSynchronisators.handleFileUnassigned();
	}
	/** 
	* This is crucial - once the instance is loaded or retrieved somewhere, all the magic happens. Existence of this method enables controller to change the instance at any time. 
	*/
	receiveInstance(instance) {
		this.host.file = instance;
		this._syncAssignment();
		this.setLoading(false);
	}
	removeInstance() {
		this.host.file = void 0;
		this._syncAssignment();
		this.setLoading(false);
	}
	receiveFailure(failure) {
		this.removeInstance();
		this.host.failure = failure;
		this.fileFailureContextProvider.setValue(failure);
		this.setLoading(false);
		this.onFailure.call(failure);
	}
	_propagateInstanceCurrentFrame(instance) {
		this.fileCurrentFrameContextProvider.setValue({
			ms: instance.timeline.currentMs,
			time: instance.timeline.currentTime,
			percentage: instance.timeline.currentPercentage,
			index: instance.timeline.currentStep.index,
			absolute: instance.timeline.currentStep.absolute
		});
	}
	_propagateInstanceAnalysesArray(instance) {
		this.fileAnalysesContextProvider.setValue(instance.analysis.layers.all);
	}
	setTimeCursorPercentage(percentage) {
		if (percentage !== void 0 && !Number.isFinite(percentage)) return;
		const value = percentage === void 0 ? void 0 : Math.max(0, Math.min(percentage, 100));
		if (value !== this.fileCursorContextProvider.value) this.fileCursorContextProvider.setValue(value);
	}
	setTimePercentage(percentage) {
		const file = this._attached;
		if (!file?.timeline.isSequence) return;
		const clampedPercentage = Math.max(0, Math.min(percentage, 100));
		if (clampedPercentage !== file.timeline.currentPercentage) file.timeline.setValueByPercent(clampedPercentage);
	}
	play() {
		this._attached?.timeline.play();
	}
	stop() {
		this._attached?.timeline.stop();
	}
	pause() {
		this._attached?.timeline.pause();
	}
	setMs(value) {
		const file = this._attached;
		if (!file?.timeline.isSequence) return;
		const clampedRelativeTime = Math.max(0, Math.min(value, file.timeline.duration));
		if (clampedRelativeTime !== file.timeline.currentMs) file.timeline.setRelativeTime(clampedRelativeTime);
	}
	/** Impose this file's highlight into the registry */
	_propagateHighlight() {
		if (this.autoHighlight && this.fileObject) {
			this.host.setAttribute("is-highlight", "true");
			this.host.registryController.setHighlight({
				from: this.fileObject.min,
				to: this.fileObject.max
			});
		}
	}
	/** Remove the highlight from the registry */
	_unpropagateHighlight() {
		if (this.host.hasAttribute("is-highlight")) {
			this.host.removeAttribute("is-highlight");
			this.host.registryController.setHighlight(void 0);
		}
	}
	startLoading() {
		this.host.failure = void 0;
		this.fileFailureContextProvider.setValue(void 0);
		this.setLoading(true);
		this.onLoadingStart.call();
		this.readyContextProvider.setValue(false);
	}
	/** Publishes loading independently of whether an old file is still available. */
	setLoading(loading) {
		if (this.host.loading !== loading) this.host.loading = loading;
		this.loadingContextProvider.setValue(loading);
	}
	endLoading() {
		this.readyContextProvider.setValue(true);
	}
};
//#endregion
//#region src/controllers/FileLoadController.ts
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
var FileLoadController = class extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	get group() {
		return this.host.fileController.host.groupController.groupObject;
	}
	get registry() {
		return this.group.registry;
	}
	static {
		this.HOST_PROPERTIES = {
			thermal: {
				type: String,
				reflect: true,
				attribute: "thermal"
			},
			visible: {
				type: String,
				reflect: true,
				attribute: "visible"
			}
		};
	}
	constructor(host) {
		super(host);
		this._UUID = host.UUID;
	}
	hostWillUpdateWatcher(value) {
		if (value.has("thermal") && this.host.thermal) this._load(this.host.thermal, this.host.visible);
	}
	hostUpdatedWatcher() {}
	hostConnected() {}
	hostDisconnected() {}
	async _load(lrc, visible) {
		if (this.host.fileController.fileObject) this.group.files.removeFile(this.host.fileController.fileObject);
		this.host.fileController.startLoading();
		return this.registry.batch.request(lrc, visible, this.group, async (result) => {
			if (result instanceof _labirthermal_core.ThermalFileInstance) this.host.fileController.receiveInstance(result);
			else if (result instanceof _labirthermal_core.ThermalFileFailure) this.host.fileController.receiveFailure(result);
		});
	}
};
//#endregion
//#region src/controllers/GroupController.ts
/**
* Exposes the `GroupController` instance to the `AbstractGroupConsumer` elements.
* @see {@link GroupController}
* @module @labirthermal/webcomponents
* @author Jan Jáchim <jachim@zcu.cz>
*/
const groupControllerContext = (0, _lit_context.createContext)("group-controller-context");
/**
* Exposes the internal `ThermalGroup` object from the `GroupController`.
* 
* @see {@link GroupController}
* @see {@link ThermalGroup}
* @module @labirthermal/webcomponents
* @author Jan Jáchim <jachim@zcu.cz>
*/
const groupObjectContext = (0, _lit_context.createContext)("group-object-context");
var GroupController = class extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	static {
		this.HOST_PROPERTIES = {
			managerController: INTERNAL_STATE_DECLARATION,
			registryController: INTERNAL_STATE_DECLARATION,
			groupSlug: {
				type: String,
				reflect: false,
				attribute: "group-slug"
			},
			groupObject: INTERNAL_STATE_DECLARATION,
			autoclearGroup: {
				type: Boolean,
				reflect: true,
				attribute: "autoclear-group"
			},
			groupController: INTERNAL_STATE_DECLARATION
		};
	}
	get groupObject() {
		return this.host.groupObject;
	}
	get registryController() {
		return this.host.registryController;
	}
	get slug() {
		return this.host.groupSlug;
	}
	get autoclearGroup() {
		return this.host.autoclearGroup;
	}
	constructor(host) {
		super(host);
		this.onInternalObject = new _labirthermal_core.CallbacksManager();
		this._UUID = host.UUID + "_group-controller";
		this.groupControllerContextProvider = new _lit_context.ContextProvider(this.host, {
			context: groupControllerContext,
			initialValue: this
		});
		this.groupObjectContextProvider = new _lit_context.ContextProvider(this.host, { context: groupObjectContext });
	}
	hostConnected() {
		const slug = this._getDefaultSlugFromHost("group-slug");
		this.host.groupSlug = slug;
		this.host.groupObject = this.host.registryController.addOrGetGroup(slug);
		this.onInternalObject.call(this.host.groupObject);
		this.groupObjectContextProvider.setValue(this.host.groupObject);
	}
	hostDisconnected() {
		if (this.autoclearGroup && this.host.groupObject) this.host.registryController.removeGroup(this.host.groupObject);
	}
	hostWillUpdateWatcher() {}
	hostUpdatedWatcher() {}
};
//#endregion
//#region src/controllers/GroupLoadController.ts
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
var GroupLoadController = class GroupLoadController extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	static {
		this.HOST_PROPERTIES = { filesString: {
			type: String,
			reflect: true,
			attribute: "group-files"
		} };
	}
	static {
		this.FILE_RECORD_SEPARATOR = ";";
	}
	static {
		this.FILE_SEGMENT_SEPAROATOR = "|";
	}
	static {
		this.FILE_COMPONENT_SEPAROATOR = "~";
	}
	static {
		this.FILE_THERMAL_KEY = "thermal";
	}
	static {
		this.FILE_VISIBLE_KEY = "visible";
	}
	static {
		this.FILE_LABEL_KEY = "label";
	}
	static {
		this.FILE_NOTE_KEY = "note";
	}
	get group() {
		return this.host.groupController.groupObject;
	}
	/** Makes sure the value is either a non-empty string or undefined. */
	static stringOrUndefined(value) {
		if (typeof value === "string") value = value.trim();
		return value ?? void 0;
	}
	/** Encodes one attribute to a string segment. */
	static encodeAttribute(key, value) {
		return `${key}${this.FILE_COMPONENT_SEPAROATOR}${value ?? ""}`;
	}
	/** Encodes a file request into a string suitable for the fileString attribute (publically known as `group-files`) */
	static encodeFileRequest(thermalUrl, visibleUrl, label) {
		const thermal = this.stringOrUndefined(thermalUrl);
		visibleUrl = this.stringOrUndefined(visibleUrl);
		label = this.stringOrUndefined(label);
		if (!thermal) return;
		if (!visibleUrl || !label) return this.encodeAttribute(this.FILE_THERMAL_KEY, thermalUrl);
		let value = this.encodeAttribute(this.FILE_THERMAL_KEY, thermalUrl);
		if (visibleUrl) value += this.FILE_SEGMENT_SEPAROATOR + this.encodeAttribute(this.FILE_VISIBLE_KEY, visibleUrl);
		if (label) value += this.FILE_SEGMENT_SEPAROATOR + this.encodeAttribute(this.FILE_LABEL_KEY, label);
		return value;
	}
	/** Encode multiple files into a string suitable for the public attribute `group-files` of a webcomponent with `GroupLoadController` */
	encodeFileRequests(requests) {
		if (!requests || requests.length === 0) return;
		return requests.map((request) => GroupLoadController.encodeFileRequest(request.thermal, request.visible, request.label)).filter((encoded) => encoded !== void 0).join(GroupLoadController.FILE_RECORD_SEPARATOR) || void 0;
	}
	/** Takes a string and convert it into an array of `GroupLoaderFileRequest` that can be used by `GroupLoadController._load( requests )` */
	static decodeAttribute(value) {
		return value.split(GroupLoadController.FILE_RECORD_SEPARATOR).map((record) => {
			let thermal;
			let visible;
			let label;
			record.trim().split(GroupLoadController.FILE_SEGMENT_SEPAROATOR).forEach((segment) => {
				let [key, value] = segment.split(GroupLoadController.FILE_COMPONENT_SEPAROATOR);
				key = key.trim();
				value = value?.trim();
				switch (key) {
					case GroupLoadController.FILE_THERMAL_KEY:
						thermal = value;
						break;
					case GroupLoadController.FILE_VISIBLE_KEY:
						visible = value;
						break;
					case GroupLoadController.FILE_LABEL_KEY: label = value;
				}
			});
			if (!thermal) return;
			return {
				thermal,
				visible,
				label
			};
		}).filter((item) => item !== void 0);
	}
	constructor(host) {
		super(host);
		this.errors = [];
		this._UUID = host.UUID + "_group-load-controller";
	}
	hostConnected() {}
	hostDisconnected() {}
	hostWillUpdateWatcher(value) {
		if (value.has("filesString")) this._loadFromAttributes();
	}
	hostUpdatedWatcher() {}
	_loadFromAttributes() {
		const requests = this.host.filesString ? GroupLoadController.decodeAttribute(this.host.filesString) : [];
		this._load(requests);
	}
	/** Loads the files  specified in the `requests` array. */
	async _load(requests) {
		if (requests.length === 0) {
			this.group.files.removeAllInstances();
			return;
		}
		const registry = this.group.registry;
		const service = registry.service;
		this.errors = [];
		registry.loading.markAsLoading();
		try {
			const results = await Promise.all(requests.map(async (request) => ({
				result: await service.loadFile(request.thermal, request.visible),
				label: request.label
			})));
			for (const item of results) if (item.result instanceof _labirthermal_core.ThermalFileFailure) this.errors.push(`${item.result.thermalUrl}: ${item.result.message}`);
			const filteredResults = results.filter((item) => item.result instanceof _labirthermal_core.ThermalFileReader);
			this.host.groupListingController.backupReaders(filteredResults.map((item) => item.result));
			await this.host.groupListingController.restoreTheEntireBackup();
			for (const file of this.group.files.value) {
				const matchingResult = filteredResults.find((item) => item.result === file.reader);
				if (matchingResult?.label !== void 0) file.setLabel(matchingResult.label);
			}
			await registry.postLoadedProcessing();
			registry.range.applyMinmax();
		} catch (error) {
			this.errors.push(error instanceof Error ? error.message : String(error));
		} finally {
			registry.loading.markAsLoaded();
			this.host.requestUpdate();
		}
	}
};
//#endregion
//#region src/controllers/GroupListingController.ts
/**
* Indicates how to order the files in a group. Used by {@link GroupListingController}
* @module @labirthermal/webcomponents
* @author Jan Jáchim <jachim@zcu.cz>
*/
let GroupOrderby = /* @__PURE__ */ function(GroupOrderby) {
	GroupOrderby["DATE"] = "date";
	GroupOrderby["LABEL"] = "label";
	GroupOrderby["MANUAL"] = "manual";
	return GroupOrderby;
}({});
/**
* Indicates how to order the files in a group. Used by {@link GroupListingController}
* @module @labirthermal/webcomponents
* @author Jan Jáchim <jachim@zcu.cz>
*/
let GroupOrdering = /* @__PURE__ */ function(GroupOrdering) {
	GroupOrdering["ASC"] = "asc";
	GroupOrdering["DESC"] = "desc";
	return GroupOrdering;
}({});
var GroupListingController = class extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	static {
		this.HOST_PROPERTIES = {
			orderby: {
				type: String,
				reflect: true,
				attribute: "group-order-by"
			},
			ordering: {
				type: String,
				reflect: true,
				attribute: "group-ordering"
			}
		};
	}
	get group() {
		return this.host.groupController.groupObject;
	}
	get hasBackup() {
		return this.backup.size > 0;
	}
	constructor(host) {
		super(host);
		this.backup = /* @__PURE__ */ new Set();
		this.temperatureScaleRef = (0, lit_directives_ref_js.createRef)();
		this.temperatureScaleWrapped = false;
		this._numColumns = 3;
		this._asTable = false;
		this._previewWidth = 50;
		this.observeTemperatureScaleItems = () => {
			const slot = this.temperatureScaleSlot;
			const row = slot?.parentElement;
			if (!slot || !row || !this.temperatureScaleObserver) return;
			this.temperatureScaleObserver.disconnect();
			this.temperatureScaleObserver.observe(row);
			for (const item of slot.assignedElements({ flatten: true })) if (item !== this.temperatureScaleRef.value) this.temperatureScaleObserver.observe(item);
			this.scheduleTemperatureScaleLayout();
		};
		this.scheduleTemperatureScaleLayout = () => {
			if (!this.host.isConnected || this.temperatureScaleFrame !== void 0) return;
			this.temperatureScaleFrame = requestAnimationFrame(() => {
				this.temperatureScaleFrame = void 0;
				this.updateTemperatureScaleLayout();
			});
		};
		this._UUID = host.UUID + "_group-display-controller";
	}
	clearBackup() {
		this.backup.clear();
	}
	backupReadersFromInstances(instances) {
		this.backup.clear();
		instances.forEach((instance) => this.backup.add(instance.reader));
	}
	backupReaders(readers) {
		this.backup.clear();
		readers.forEach((reader) => this.backup.add(reader));
		this.log("backup", this.backup);
	}
	async restoreTheEntireBackup() {
		return this.group.files.batchCreateInstances(Array.from(this.backup), true);
	}
	async showOneAndBackup(instance) {
		const reader = instance.reader;
		this.backup.clear();
		this.backupReadersFromInstances(this.group.files.value);
		this.host.fileController.host.registryController.setHighlight(void 0);
		this.host.fileController.removeInstance();
		this.group.files.removeAllInstances();
		await reader.createInstance(this.group);
	}
	static {
		this.CLASS_TABLE = "group-listing-table";
	}
	static {
		this.CLASS_COLUMNS = "group-listing-columns";
	}
	static {
		this.styles = lit.css`
        .group-listing {
            display: grid;
            width: 100%;
            min-width: 0;
            gap: 1em;
            align-items: start;
            grid-template-columns: repeat(var(--group-listing-columns, 3), minmax(0, 1fr));
        }

        .group-listing[data-layout="table"] {
            grid-template-columns: minmax(0, 1fr);
            overflow-x: auto;
        }

        .group-listing .file-card {
            display: grid;
            min-width: 0;
            box-sizing: border-box;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: "header" "canvas" "analysis" "timeline";
            background: var(--thermal-background);
            border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
        }

        .group-listing[data-layout="grid"] .file-media,
        .group-listing[data-layout="grid"] .file-details,
        .group-listing[data-layout="grid"] .file-details-content {
            display: contents;
        }

        .file-card .file-header {
            grid-area: header;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-start;
            align-items: center;
            gap: .5em;
            padding: .5em;
            min-width: 0;
            box-sizing: border-box;
        }

        .file-card .file-label {
            cursor: pointer;
            min-width: 0;
            overflow-wrap: anywhere;
        }

        .file-card file-canvas {
            grid-area: canvas;
            min-width: 0;
        }

        .file-card file-timeline {
            grid-area: timeline;
            display: block;
            min-width: 0;
        }

        .file-card .file-analysis {
            grid-area: analysis;
            min-width: 0;
            box-sizing: border-box;
        }

        .group-listing[data-layout="table"] .file-card {
            grid-template-columns: var(--thermal-list-preview-width, 50%) minmax(0, 1fr);
            grid-template-areas: "media details";
            align-items: stretch;
            background: transparent;
        }

        .group-listing[data-layout="table"] .file-media {
            grid-area: media;
            min-width: 0;
            padding: 0;
        }

        .group-listing[data-layout="table"] .file-details {
            grid-area: details;
            position: relative;
            min-width: 0;
            min-height: 0;
            background: var(--thermal-background);
            border-radius: var(--thermal-radius) var(--thermal-radius) 0 0;
        }

        /* Only the media determines the row height; longer details scroll inside it. */
        .group-listing[data-layout="table"] .file-details-content {
            position: absolute;
            inset: 0;
            display: flex;
            flex-direction: column;
            overflow: auto;
        }

        .group-listing[data-layout="table"] .file-details-content > * {
            flex: none;
        }
    `;
	}
	setPreviewWidth(width) {
		if (!Number.isInteger(width) || width < 20 || width > 80) throw new RangeError("Preview width must be an integer from 20 to 80 percent.");
		this._previewWidth = width;
		this.host.requestUpdate();
	}
	setNumColumns(numColumns) {
		this._numColumns = numColumns;
		this.host.requestUpdate();
	}
	setAsTable(asTable) {
		this._asTable = asTable;
		this.host.requestUpdate();
	}
	renderListContainer(children) {
		return lit.html`
            <div
                class="group-listing"
                data-layout=${this._asTable ? "table" : "grid"}
                style=${(0, lit_directives_style_map_js.styleMap)({
			"--group-listing-columns": String(this._numColumns),
			"--thermal-list-preview-width": `${this._previewWidth}%`
		})}
            >
                ${children}
            </div>
        `;
	}
	_renderButton(icon, iconStyle, tooltip, active, onClick, slot) {
		return lit.html`
            <thermal-btn
                icon="${icon}"
                iconStyle="${iconStyle}"
                tooltip=${(0, lit_directives_if_defined_js.ifDefined)(active ? void 0 : tooltip)}
                variant=${active ? "background" : "default"}
                @click=${onClick}
                slot=${(0, lit_directives_if_defined_js.ifDefined)(slot)}
            >
            </thermal-btn>
        `;
	}
	renderLayoutSwitch(slot) {
		return lit.html`<thermal-btn-group>
            ${this._renderButton("list", "micro", "Switch to table view", this._asTable, () => this.setAsTable(true), slot)}
            ${this._renderButton("grid", "micro", "Switch to grid view", !this._asTable, () => this.setAsTable(false), slot)}
        </thermal-btn-group>`;
	}
	renderColumnsSlider(slot) {
		const min = this._asTable ? 20 : 1;
		const max = this._asTable ? 80 : Math.min(3, this.group.files.value.length);
		const value = this._asTable ? this._previewWidth : this._numColumns;
		const label = this._asTable ? "Šířka náhledu" : "Počet sloupců";
		return lit.html`<div slot=${(0, lit_directives_if_defined_js.ifDefined)(slot)} style=${(0, lit_directives_style_map_js.styleMap)({
			display: "flex",
			flexDirection: "column",
			fontSize: "small"
		})}>
        <input type="range" aria-label=${label} min=${min} max=${max} step="1" .value=${String(value)} @input=${(e) => {
			const target = e.target;
			const next = parseInt(target.value, 10);
			if (this._asTable) this.setPreviewWidth(next);
			else this.setNumColumns(next);
		}}>
        <div style=${(0, lit_directives_style_map_js.styleMap)({
			textAlign: "center",
			fontSize: ".7em",
			opacity: ".7",
			marginTop: "-0.2rem"
		})}>${label}: ${value}${this._asTable ? " %" : ""}</div>
        </div>`;
	}
	hostConnected() {
		if (this.host.hasUpdated) this.host.requestUpdate();
	}
	hostDisconnected() {
		this.disconnectTemperatureScale();
	}
	hostWillUpdateWatcher() {}
	hostUpdatedWatcher() {
		this.observeTemperatureScale();
	}
	renderTemperatureScale() {
		return lit.html`<div
            ${(0, lit_directives_ref_js.ref)(this.temperatureScaleRef)}
            slot=${this.temperatureScaleWrapped ? "pre-bar-wrap" : "pre-bar"}
            style=${(0, lit_directives_style_map_js.styleMap)({
			flex: "1 1 0",
			minWidth: "0",
			boxSizing: "border-box",
			width: this.temperatureScaleWrapped ? "100%" : void 0,
			paddingLeft: this.temperatureScaleWrapped ? "0" : "1em"
		})}
        >
            <registry-histogram height="15px" ?expandable=${true}></registry-histogram>
            <registry-range-slider height="10px"></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
        </div>`;
	}
	async observeTemperatureScale() {
		const scale = this.temperatureScaleRef.value;
		const app = this.host.shadowRoot?.querySelector("thermal-app");
		if (!scale || !app || scale.parentElement !== app) {
			this.disconnectTemperatureScale();
			return;
		}
		await app.updateComplete;
		if (!this.host.isConnected || this.temperatureScaleRef.value !== scale) return;
		const slot = app.shadowRoot?.querySelector("slot[name=\"pre-bar\"]");
		if (!slot?.parentElement) return;
		if (this.temperatureScaleSlot !== slot) {
			this.disconnectTemperatureScale();
			this.temperatureScaleSlot = slot;
			this.temperatureScaleObserver = new ResizeObserver(this.scheduleTemperatureScaleLayout);
			slot.addEventListener("slotchange", this.observeTemperatureScaleItems);
			this.observeTemperatureScaleItems();
		} else this.scheduleTemperatureScaleLayout();
	}
	updateTemperatureScaleLayout() {
		const scale = this.temperatureScaleRef.value;
		const slot = this.temperatureScaleSlot;
		const row = slot?.parentElement;
		if (!this.host.isConnected || !scale || !slot || !row) return;
		const rowStyle = getComputedStyle(row);
		const pixels = (value) => parseFloat(value) || 0;
		let available = row.getBoundingClientRect().width - pixels(rowStyle.borderLeftWidth) - pixels(rowStyle.borderRightWidth) - pixels(rowStyle.paddingLeft) - pixels(rowStyle.paddingRight);
		const gap = pixels(rowStyle.columnGap);
		for (const item of slot.assignedElements({ flatten: true })) {
			if (item === scale) continue;
			const style = getComputedStyle(item);
			if (style.display !== "none") available -= item.getBoundingClientRect().width + pixels(style.marginLeft) + pixels(style.marginRight) + gap;
		}
		available -= pixels(getComputedStyle(scale).fontSize);
		const wrapped = available < 200;
		if (wrapped !== this.temperatureScaleWrapped) {
			this.temperatureScaleWrapped = wrapped;
			this.host.requestUpdate();
		}
	}
	disconnectTemperatureScale() {
		this.temperatureScaleObserver?.disconnect();
		this.temperatureScaleObserver = void 0;
		this.temperatureScaleSlot?.removeEventListener("slotchange", this.observeTemperatureScaleItems);
		this.temperatureScaleSlot = void 0;
		if (this.temperatureScaleFrame !== void 0) {
			cancelAnimationFrame(this.temperatureScaleFrame);
			this.temperatureScaleFrame = void 0;
		}
	}
	_orderFiles() {
		const files = Array.from(this.group.files.value);
		switch (this.host.orderby) {
			case "label":
				if (this.host.ordering === "asc") files.sort((a, b) => (a.label ?? "").localeCompare(b.label ?? ""));
				else files.sort((a, b) => (b.label ?? "").localeCompare(a.label ?? ""));
				break;
			case "date": if (this.host.ordering === "asc") files.sort((a, b) => a.timestamp - b.timestamp);
			else files.sort((a, b) => b.timestamp - a.timestamp);
		}
		return files;
	}
	renderList(fileRendererFn, emptyRendererFn) {
		if (this.group.files.value.length === 0) return emptyRendererFn?.();
		return (0, lit_directives_repeat_js.repeat)(this._orderFiles(), (file) => file.id, fileRendererFn);
	}
	async handleFileDropAdd(results) {
		const fileReaders = [];
		for (const result of results) if (result instanceof _labirthermal_core.ThermalFileReader) {
			fileReaders.push(result);
			this.backup.add(result);
		}
		await this.group.files.batchCreateInstances(fileReaders, false);
	}
	renderListHeader(slot, options = {}) {
		return lit.html`<div slot="${(0, lit_directives_if_defined_js.ifDefined)(slot)}" style=${(0, lit_directives_style_map_js.styleMap)({
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "center",
			boxSizing: "border-box",
			gap: "0.5em"
		})}>

            <thermal-btn 
                variant="default" 
                style="cursor: default; font-size: .9em;"
                icon="folder"
                iconStyle="micro"
                variant="background" 
            >${options.allowFileChanges === false ? `Počet souborů: ${this.group.files.value.length}` : `${this.group.files.value.length} nahraných souborů`}</thermal-btn>

            ${options.allowFileChanges === false ? void 0 : lit.html`<thermal-btn
                tooltip="Smazat všechny soubory a nahrát nové"
                icon="trash"
                iconStyle="micro"
                variant="background"
                @click=${() => {
			this.host.fileController.host.registryController.setHighlight(void 0);
			this.clearBackup();
			this.group.files.removeAllInstances();
		}}
            ></thermal-btn>
            <group-dropin-input 
                slot="bar-pre"
                variant="background"
                icon="upload"
                iconStyle="micro"
                tooltip="Nahrát další soubory"
                .onDrop=${async (results) => {
			await this.handleFileDropAdd(results);
		}}
            ></group-dropin-input>`}
            <group-download-dropdown 
                variant="background"
                icon="download"
                iconStyle="micro"
            >
                <span slot="invoker">Stáhnout skupinu</span>
            </group-download-dropdown>
            <div style="flex-grow: 1;"></div>
            ${this.renderLayoutSwitch()}
            ${this.renderColumnsSlider()}
        </div>`;
	}
	renderThumbnail(instance, options = {}) {
		const showDetail = () => {
			if (options.onOpenDetail) options.onOpenDetail(instance);
			else this.showOneAndBackup(instance);
		};
		return lit.html`<file-provider
            class="file-card"
            .file=${instance}
            @mouseenter=${() => {
			this.host.groupController.registryController.setHighlight({
				from: instance.min,
				to: instance.max
			});
		}}
            @mouseleave=${() => {
			this.host.groupController.registryController.setHighlight(void 0);
		}}
        >
            <div class="file-media">
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>
            <div class="file-details">
                <div class="file-details-content">
                    <header class="file-header">
                        <div class="file-label" @click=${showDetail}>
                            <div>${_labirthermal_core.TimeFormat.human(instance.timestamp)}</div>
                            <div style="font-size: small; opacity: .5;">${instance.fileName}</div>
                        </div>

                        <div style="flex-grow: 1;"></div>
                        ${options.allowFileChanges === false ? void 0 : lit.html`<thermal-btn
                            tooltip="Smazat soubor"
                            icon="trash"
                            iconStyle="micro"
                            @click=${async () => {
			this.backup.delete(instance.reader);
			this.group.files.removeAllInstances();
			await this.restoreTheEntireBackup();
			this.host.requestUpdate();
		}}
                        ></thermal-btn>`}
                        <file-download-dropdown>
                            <thermal-icon
                                icon="download"
                                variant="micro"
                                slot="invoker"
                                style="width: 1.1em;"
                            ></thermal-icon>
                        </file-download-dropdown>
                        <thermal-btn
                            icon="range"
                            iconStyle="outline"
                            @click=${() => {
			this.host.groupController.registryController.registryObject.range.imposeRange({
				from: instance.min,
				to: instance.max
			});
		}}
                        ></thermal-btn>
                        <thermal-btn
                            tooltip="Zobrazit detail"
                            icon="eye"
                            iconStyle="solid"
                            @click=${showDetail}
                        ></thermal-btn>
                    </header>
                    <div class="file-analysis">
                        <file-analysis-table
                            table-mode="compact"
                            ?interactive-analysis=${true}
                            ?graph-activation-enabled=${true}
                        ></file-analysis-table>
                        <file-analysis-graph ?standalone=${true}></file-analysis-graph>
                    </div>
                </div>
            </div>
        </file-provider>`;
	}
	renderDetailHeader(instance, slot, options = {}) {
		const divStyles = {
			display: "flex",
			flexDirection: "row",
			justifyContent: "flex-start",
			alignItems: "center",
			boxSizing: "border-box",
			gap: "0.5em"
		};
		const isSingular = !options.onCloseDetail && this.backup.size <= 1;
		const fileCount = options.onCloseDetail ? this.group.files.value.length : this.backup.size;
		const backLabel = isSingular ? "Zavřít" : "Zpět";
		const backTooltip = options.allowFileChanges === false ? "Zpět na seznam souborů" : isSingular ? "Zavřít soubor a nahrát nový/é" : `Zpět na Vašich ${fileCount} souborů`;
		const backIcon = isSingular ? "close" : "back";
		const backIconStyle = isSingular ? "micro" : "micro";
		return lit.html`<div style=${(0, lit_directives_style_map_js.styleMap)(divStyles)} slot=${(0, lit_directives_if_defined_js.ifDefined)(slot)}>

            <thermal-btn 
                variant="background" 
                tooltip="Název souboru" 
                style="cursor: default; font-size: .9em;"
                icon="image"
                iconStyle="micro"
            >${instance.fileName}</thermal-btn>

            <thermal-btn 
                variant="background" 
                tooltip="Čas pořízení snímku" 
                style="cursor: default; font-size: .9em;"
                icon="clock"
                iconStyle="outline"
            >${_labirthermal_core.TimeFormat.human(instance.timestamp)}</thermal-btn>

            <thermal-btn
                icon=${backIcon}
                iconStyle=${backIconStyle}
                tooltip="${backTooltip}"
                variant="foreground"
                @click=${() => {
			if (options.onCloseDetail) options.onCloseDetail();
			else if (this.backup.size <= 1) {
				this.group.files.removeAllInstances();
				this.host.fileController.removeInstance();
				this.host.requestUpdate();
			} else this.restoreTheEntireBackup();
		}}
            >${backLabel}</thermal-btn>
            <file-info-button>
                <thermal-btn 
                    slot="invoker" 
                    icon="info" 
                    iconStyle="solid"
                    variant="background"
                >Informace o souboru</thermal-btn>
            </file-info-button>

            <file-download-dropdown
                icon="download"
                iconStyle="micro"
                variant="background"
            ></file-download-dropdown>

        </div>`;
	}
	/** Assumes the contexts to be provided by the host element */
	renderDetailBody() {
		return lit.html`<div style=${(0, lit_directives_style_map_js.styleMap)({
			display: "grid",
			gridTemplateColumns: "1fr 1fr",
			gap: "1em",
			width: "100%"
		})}>
            <div>
                <file-canvas></file-canvas>
                <file-timeline></file-timeline>
            </div>
            <file-analysis-complex
                table-mode="full"
                ?interactive-analysis=${true}
                ?graph-activation-enabled=${true}
            ></file-analysis-complex>
        </div>`;
	}
};
//#endregion
//#region src/controllers/GroupAnalysisSyncController.ts
const SLOT_NUMBERS = [
	1,
	2,
	3,
	4,
	5,
	6,
	7
];
const groupAnalysisSyncContext = (0, _lit_context.createContext)("group-analysis-sync-context");
/**
* Binds analysis1-analysis7 to group slots while groupAnalysisSyncOn is true.
* Initial nonempty host values win; otherwise existing file slots are adopted.
* Later empty values delete slots. Analyses without slots are left untouched.
*/
var GroupAnalysisSyncController = class GroupAnalysisSyncController extends AbstractHierarchyController {
	get UUID() {
		return this.host.UUID + "_group-analysis-sync-controller";
	}
	static {
		this.ANALYSIS_PROPERTY_DECLARATION = {
			type: String,
			reflect: true,
			converter: stringOrUndefinedConverter
		};
	}
	static {
		this.HOST_PROPERTIES = {
			groupAnalysisSyncOn: {
				type: Boolean,
				reflect: true,
				attribute: "group-analysis-sync-on"
			},
			analysis1: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
			analysis2: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
			analysis3: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
			analysis4: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
			analysis5: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
			analysis6: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION,
			analysis7: GroupAnalysisSyncController.ANALYSIS_PROPERTY_DECLARATION
		};
	}
	get on() {
		return this._onContextProvider.value;
	}
	constructor(host) {
		super(host);
		this._files = /* @__PURE__ */ new Set();
		this._values = /* @__PURE__ */ new Map();
		this._fileValues = /* @__PURE__ */ new Map();
		this._applying = false;
		this._changingCore = false;
		this._initialized = false;
		this._onContextProvider = new _lit_context.ContextProvider(this.host, {
			context: groupAnalysisSyncContext,
			initialValue: false
		});
	}
	_property(slot) {
		return `analysis${slot}`;
	}
	_hostValue(slot) {
		return this.host[this._property(slot)]?.trim() || void 0;
	}
	_setOn(value) {
		this.host.groupAnalysisSyncOn = value;
		this._onContextProvider.setValue(value);
	}
	hostConnected() {
		this._group = this.host.groupController.groupObject;
		const group = this._group;
		group.analysisSync.addListener(this.UUID, (value) => {
			if (this._changingCore) return;
			this._setOn(value);
			if (!value) {
				this._initialized = false;
				return;
			}
			queueMicrotask(() => {
				if (this._group === group && this.on && group.analysisSync.value) this._initialize();
			});
		});
		group.files.addListener(this.UUID, () => this._syncFiles());
		group.registry.onProcessingEnd.set(this.UUID, () => this.onLoaded());
		this._setOn(this.host.groupAnalysisSyncOn || group.analysisSync.value);
		this._syncFiles();
		if (this.on) this._initialize();
	}
	hostDisconnected() {
		this._group?.analysisSync.removeListener(this.UUID);
		this._group?.files.removeListener(this.UUID);
		this._group?.registry.onProcessingEnd.delete(this.UUID);
		for (const file of this._files) this._unbindFile(file);
		this._files.clear();
		this._fileValues.clear();
		this._group = void 0;
		this._initialized = false;
	}
	hostWillUpdateWatcher(changed) {
		if (!this._group) return;
		if (changed.has("groupAnalysisSyncOn")) {
			if (!this.host.groupAnalysisSyncOn) {
				this.turnOff();
				return;
			}
			if (!this.on || !this._initialized) this._initialize();
		}
	}
	hostUpdatedWatcher(changed) {
		if (!this._group) return;
		if (!this.on) return;
		const slots = SLOT_NUMBERS.filter((slot) => changed.has(this._property(slot)) && this._hostValue(slot) !== this._values.get(slot));
		if (slots.length) this._applyHostValues(slots);
	}
	_syncFiles() {
		const group = this._group;
		if (!group) return;
		for (const file of this._files) if (!group.files.value.includes(file)) {
			this._unbindFile(file);
			this._files.delete(file);
		}
		for (const file of group.files.value) {
			if (this._files.has(file)) continue;
			this._files.add(file);
			const values = /* @__PURE__ */ new Map();
			this._fileValues.set(file, values);
			for (const slot of SLOT_NUMBERS) file.slots.getOnSerializeManager(slot)?.set(this.UUID, (value) => {
				const unchanged = values.has(slot) && values.get(slot) === value;
				values.set(slot, value);
				if (unchanged) return;
				if (!this.on || this._applying || file !== group.analysisSync.currentPointer) return;
				this._values.set(slot, value);
				this.host[this._property(slot)] = value;
			});
			file.onMount.set(this.UUID, () => this.onLoaded());
		}
		if (this.on) this.onLoaded();
	}
	_unbindFile(file) {
		for (const slot of SLOT_NUMBERS) file.slots.getOnSerializeManager(slot)?.delete(this.UUID);
		file.onMount.delete(this.UUID);
		this._fileValues.delete(file);
	}
	_getFirstInstanceWithAnalyses() {
		return this._group?.files.value.find((file) => SLOT_NUMBERS.some((slot) => file.slots.hasSlot(slot)));
	}
	_initialize() {
		const group = this._group;
		if (!group) return;
		this._setOn(true);
		if (!this._initialized) {
			const hasAttributes = SLOT_NUMBERS.some((slot) => this._hostValue(slot) !== void 0);
			const pointer = group.analysisSync.currentPointer;
			const source = pointer && group.files.value.includes(pointer) ? pointer : this._getFirstInstanceWithAnalyses() ?? group.files.value[0];
			if (!hasAttributes && source) this._analysesFromInstanceToGroup(source);
			this._initialized = hasAttributes || source !== void 0;
		}
		this._enableCore();
		if (this._initialized) this._applyHostValues(SLOT_NUMBERS);
	}
	_enableCore() {
		const group = this._group;
		if (!group) return;
		const pointer = group.analysisSync.currentPointer;
		const source = pointer && group.files.value.includes(pointer) ? pointer : group.files.value.find((file) => file.dom?.built) ?? group.files.value[0];
		if (!source) {
			group.analysisSync.setCurrentPointer(void 0);
			return;
		}
		this._changingCore = true;
		try {
			if (!group.analysisSync.value) group.analysisSync.turnOn(source);
			else if (source !== pointer) group.analysisSync.setCurrentPointer(source);
		} finally {
			this._changingCore = false;
		}
	}
	_applyHostValues(slots) {
		const group = this._group;
		if (!group) return;
		for (const slot of slots) this._values.set(slot, this._hostValue(slot));
		this._applying = true;
		const pointer = group.analysisSync.currentPointer;
		group.analysisSync.setCurrentPointer(void 0);
		try {
			for (const file of this._files) {
				if (!file.dom?.built) continue;
				for (const slot of slots) {
					this._applySlot(file, slot, this._values.get(slot));
					this._fileValues.get(file)?.set(slot, file.slots.getSlot(slot)?.analysis.toSerialized());
				}
			}
		} finally {
			if (pointer && group.files.value.includes(pointer)) group.analysisSync.setCurrentPointer(pointer);
			this._applying = false;
		}
	}
	_applySlot(file, slotNumber, value) {
		const slot = file.slots.getSlot(slotNumber);
		if (value === void 0) {
			if (slot) file.slots.removeSlotAndAnalysis(slotNumber);
			return;
		}
		const sameType = slot?.analysis.toSerialized().split(";")[1]?.trim() === value.split(";")[1]?.trim();
		if (slot && sameType) {
			if (!slot.analysis.serializedIsValid(value)) {
				this.log("Invalid group analysis slot value", slotNumber, file.id);
				return;
			}
			if (slot.analysis.toSerialized() !== value) slot.recieveSerialized(value);
			const root = file.dom?.canvasLayer?.getLayerRoot();
			if (root && !root.contains(slot.analysis.layerRoot)) root.appendChild(slot.analysis.layerRoot);
		} else if (!file.slots.createAnalysisFromSerialized(value, slotNumber)) this.log("Unable to create group analysis slot", slotNumber, file.id);
	}
	onLoaded() {
		if (!this.on || this._applying) return;
		if (!this._initialized) this._initialize();
		else {
			this._enableCore();
			this._applyHostValues(SLOT_NUMBERS);
		}
	}
	_analysesFromInstanceToGroup(instance) {
		for (const slot of SLOT_NUMBERS) {
			const value = instance.slots.getSlot(slot)?.analysis.toSerialized();
			this._values.set(slot, value);
			this.host[this._property(slot)] = value;
		}
	}
	turnOnOnFirstInstanceWithAnalyses() {
		const instance = this._getFirstInstanceWithAnalyses();
		if (instance) this.turnOn(instance);
	}
	turnOnWithAttributeAnalyses() {
		this._setOn(true);
		this._initialized = true;
		this._enableCore();
		this._applyHostValues(SLOT_NUMBERS);
	}
	turnOn(instance) {
		if (!this._group?.files.value.includes(instance)) {
			this.log("Cannot synchronize analyses from a file outside the group", instance.id);
			return;
		}
		this._analysesFromInstanceToGroup(instance);
		this._setOn(true);
		this._initialized = true;
		this._changingCore = true;
		try {
			this._group.analysisSync.turnOn(instance);
		} finally {
			this._changingCore = false;
		}
		this._applyHostValues(SLOT_NUMBERS);
	}
	turnOff() {
		this._setOn(false);
		this._initialized = false;
		this._changingCore = true;
		try {
			if (this._group?.analysisSync.value) this._group.analysisSync.turnOff();
		} finally {
			this._changingCore = false;
		}
	}
};
//#endregion
//#region src/controllers/RegistryController.ts
/** Exposes the current `RegistryController`. This is very important. */
const registryControllerContext = (0, _lit_context.createContext)("registry-controller-context");
/** Exposes the current `ThermalRegistry` object from the `RegistryController`. */
const registryObjectContext = (0, _lit_context.createContext)("registry-object-context");
/** Exposes the current opacity value context from the `RegistryController`. */
const registryOpacityContext = (0, _lit_context.createContext)("registry-opacity");
/** Exposes the current range from value from the `RegistryController`. */
const registryRangeFromContext = (0, _lit_context.createContext)("registry-range-from");
/** Exposes the current range to value from the `RegistryController`. */
const registryRangeToContext = (0, _lit_context.createContext)("registry-range-to");
/** Exposes the current registry loading value from the `RegistryController`. */
const registryLoadingContext = (0, _lit_context.createContext)("registry-loading");
/** Exposes the current registry min context from the `RegistryController` */
const registryMinContext = (0, _lit_context.createContext)("registry-min");
/** Exposes the current registry max value from the `RegistryController` */
const registryMaxContext = (0, _lit_context.createContext)("registry-max");
/**
* Highlight is an optional range of temperatures highlighted graphically on the thermal scale. It is used to indicate for example:
* - what is the range of a file within min/max of the entire group
* - what is the range of an analysis within the min/max of a file
* - what is the min/max of a group of files within multiple groups of files
*
* This context is exposed by a registry provider. It need to be consumed manually.
*/
const registryHighlightContext = (0, _lit_context.createContext)("registry-highlight");
var RegistryController = class extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	static {
		this.HOST_PROPERTIES = {
			managerController: INTERNAL_STATE_DECLARATION,
			registrySlug: {
				type: String,
				reflect: false,
				attribute: "registry-slug"
			},
			registryObject: INTERNAL_STATE_DECLARATION,
			registryController: INTERNAL_STATE_DECLARATION,
			opacity: {
				type: Number,
				reflect: true,
				attribute: "opacity"
			},
			min: {
				type: Number,
				reflect: false,
				state: true
			},
			max: {
				type: Number,
				reflect: false,
				state: true
			},
			from: {
				type: Number,
				reflect: true,
				attribute: "from"
			},
			to: {
				type: Number,
				reflect: true,
				attribute: "to"
			},
			loading: {
				type: Boolean,
				attribute: "is-loading",
				reflect: true
			},
			highlight: {
				type: Object,
				reflect: false,
				state: true
			}
		};
	}
	get registryObject() {
		return this.host.registryObject;
	}
	get slug() {
		return this.host.registrySlug;
	}
	get opacity() {
		return this.host.opacity;
	}
	get min() {
		return this.host.min;
	}
	get max() {
		return this.host.max;
	}
	get from() {
		return this.host.from;
	}
	get to() {
		return this.host.to;
	}
	get loading() {
		return this.host.loading;
	}
	constructor(host) {
		super(host);
		this.onInternalObject = new _labirthermal_core.CallbacksManager();
		this._UUID = host.UUID + "_registry-controller";
		this.registryControllerContextProvider = new _lit_context.ContextProvider(this.host, {
			context: registryControllerContext,
			initialValue: this
		});
		this.registryObjectContextProvider = new _lit_context.ContextProvider(this.host, { context: registryObjectContext });
		this.opacityContextProvider = new _lit_context.ContextProvider(this.host, { context: registryOpacityContext });
		this.minContextProvider = new _lit_context.ContextProvider(this.host, { context: registryMinContext });
		this.maxContextProvider = new _lit_context.ContextProvider(this.host, { context: registryMaxContext });
		this.fromContextProvider = new _lit_context.ContextProvider(this.host, { context: registryRangeFromContext });
		this.toContextProvider = new _lit_context.ContextProvider(this.host, { context: registryRangeToContext });
		this.loadingContextProvider = new _lit_context.ContextProvider(this.host, { context: registryLoadingContext });
		this.highlightContextProvider = new _lit_context.ContextProvider(this.host, { context: registryHighlightContext });
	}
	hostConnected() {
		const slug = this._getDefaultSlugFromHost("registry-slug");
		this.host.registrySlug = slug;
		this.host.registryObject = this.host.managerController.createRegistry(slug);
		this.registryObjectContextProvider.setValue(this.host.registryObject);
		this.onInternalObject.call(this.host.registryObject);
		this.setOpacity(this.host.opacity ?? 1);
		this.registryObject.opacity.addListener(this.UUID, this.setOpacity.bind(this));
		this.registryObject.minmax.addListener(this.UUID, (value) => {
			if (value === void 0) {
				this.host.min = void 0;
				this.host.max = void 0;
				this.minContextProvider.setValue(void 0);
				this.maxContextProvider.setValue(void 0);
			} else {
				if (value.min !== this.host.min) this.host.min = value.min;
				if (value.max !== this.host.max) this.host.max = value.max;
				if (value.min !== this.minContextProvider.value) this.minContextProvider.setValue(value.min);
				if (value.max !== this.maxContextProvider.value) this.maxContextProvider.setValue(value.max);
			}
		});
		this.registryObject.range.addListener(this.UUID, this._rangeListener.bind(this));
		this.registryObject.loading.addListener(this.UUID, this._loadingListener.bind(this));
	}
	hostDisconnected() {
		this.registryObject.opacity.removeListener(this.UUID);
		this.registryObject.minmax.removeListener(this.UUID);
		this.registryObject.range.removeListener(this.UUID);
		this.registryObject.loading.removeListener(this.UUID);
	}
	hostWillUpdateWatcher(value) {
		if (value.has("opacity")) this.setOpacity(this.host.opacity ?? 1);
		if (value.has("from") || value.has("to")) {
			if (this.host.from === void 0 || this.host.to === void 0) this._clearRange();
			else this.setRange(this.host.from, this.host.to);
		}
	}
	hostUpdatedWatcher() {}
	addOrGetGroup(slug) {
		return this.registryObject.groups.addOrGetGroup(slug);
	}
	removeGroup(group) {
		this.registryObject.groups.removeGroup(group.id);
	}
	/**
	* This is the recommended way to set the opacity. Calling this method will 
	* - update the context provider element's attribute `opacity`
	* - set the internal value to `@labirthermal/core`
	* - update the context provider
	*/
	setOpacity(value) {
		const safeValue = isNaN(value) ? 1 : Math.max(0, Math.min(1, value));
		if (this.host.opacity !== safeValue) this.host.opacity = safeValue;
		if (this.registryObject && this.registryObject.opacity.value !== safeValue) this.registryObject.opacity.imposeOpacity(safeValue);
		if (this.opacityContextProvider.value !== safeValue) this.opacityContextProvider.setValue(safeValue);
	}
	setRange(from, to) {
		if (this.registryObject.range.value === void 0 || this.registryObject.range.value.from !== from || this.registryObject.range.value.to !== to) this.registryObject.range.imposeRange({
			from,
			to
		});
		const currentInternalRange = this.registryObject.range.value;
		if (currentInternalRange === void 0) this._clearRange();
		else {
			this.host.from = currentInternalRange.from;
			this.host.to = currentInternalRange.to;
			this.fromContextProvider.setValue(currentInternalRange.from);
			this.toContextProvider.setValue(currentInternalRange.to);
		}
	}
	setRangeFull() {
		if (this.host.min !== void 0 && this.host.max !== void 0) this.setRange(this.host.min, this.host.max);
	}
	_rangeListener(value) {
		if (value !== void 0) this.setRange(value.from, value.to);
		else this._clearRange();
	}
	_clearRange() {
		this.host.from = void 0;
		this.host.to = void 0;
		this.fromContextProvider.setValue(void 0);
		this.toContextProvider.setValue(void 0);
	}
	_loadingListener(value) {
		if (value !== this.host.loading) this.host.loading = value;
		if (value !== this.loadingContextProvider.value) this.loadingContextProvider.setValue(value);
	}
	setHighlight(value) {
		if (this.highlightContextProvider.value !== value) this.highlightContextProvider.setValue(value);
	}
};
//#endregion
//#region src/hierarchy/providers/getters.ts
const defaultManager = new _labirthermal_core.ThermalManager();
window.Thermal = { managers: /* @__PURE__ */ new Map() };
window.Thermal.managers.set("default", defaultManager);
/** Create or get a manager instance from the global window object. */
const createOrGetManager = (slug, options) => {
	if (slug === void 0) return window.Thermal.managers.get("default");
	else if (window.Thermal.managers.has(slug)) return window.Thermal.managers.get(slug);
	else {
		const manager = new _labirthermal_core.ThermalManager(void 0, options);
		window.Thermal.managers.set(slug, manager);
		return manager;
	}
};
/** Remove the manager along with all its contents. */
const removeManager = (manager) => {
	let slug = void 0;
	window.Thermal.managers.forEach((m, key) => {
		if (m.id === manager.id) slug = key;
	});
	console.log("removing", manager);
	if (slug !== void 0) {
		console.log("found and removing", slug);
		const foundManager = window.Thermal.managers.get(slug);
		if (foundManager) {
			foundManager.forEveryRegistry((registry) => foundManager.removeRegistry(registry.id));
			window.Thermal.managers.delete(slug);
		}
	}
};
//#endregion
//#region src/controllers/ManagerController.ts
/** Exposes the main manager controller with all its setters and direct access to the host element values. */
const managerControllerContext = (0, _lit_context.createContext)("manager-controller-context");
const managerContext = (0, _lit_context.createContext)("manager-instance");
const managerPaletteContext = (0, _lit_context.createContext)("manager-palette-context");
const managerAdvancedPalettesContext = (0, _lit_context.createContext)("manager-advanced-palettes-context");
const managerSmoothContext = (0, _lit_context.createContext)("manager-smooth-context");
const managerGraphFunctionContext = (0, _lit_context.createContext)("manager-graph-function-context");
const managerToolContext = (0, _lit_context.createContext)("manager-tool-context");
const managerInteractiveAnalysesContext = (0, _lit_context.createContext)("manager-interactive-analysis-context");
var ManagerController = class extends AbstractHierarchyController {
	get UUID() {
		return this._UUID;
	}
	static {
		this.HOST_PROPERTIES = {
			managerSlug: {
				type: String,
				reflect: false,
				attribute: "manager-slug"
			},
			managerObject: INTERNAL_STATE_DECLARATION,
			managerController: INTERNAL_STATE_DECLARATION,
			palette: {
				type: String,
				reflect: true,
				attribute: "palette",
				converter: paletteConverter
			},
			advancedPalettes: {
				reflect: true,
				attribute: "advanced-palettes",
				type: Boolean
			},
			smoothThermograms: {
				reflect: true,
				attribute: "smooth-thermograms",
				type: Boolean
			},
			smoothGraph: {
				reflect: true,
				attribute: "smooth-graph",
				type: Boolean
			},
			tool: {
				type: String,
				reflect: true,
				attribute: "tool"
			}
		};
	}
	/** Accessor to the manageer slug from the host */
	get slug() {
		return this.host.managerSlug;
	}
	/** Accessor to the manager object from the host */
	get managerObject() {
		return this.host.managerObject;
	}
	/** Palette property value accessed from the host element */
	get palette() {
		return this.host.palette;
	}
	/** Smooth thermograms flag accessed from the host element */
	get smoothThermograms() {
		return this.host.smoothThermograms;
	}
	/** Tool property accessed from the host element */
	get tool() {
		return this.host.tool;
	}
	get toolObject() {
		return this.managerObject.tool.value;
	}
	/** Graph smoothing flag accessed from the host element */
	get smoothGraph() {
		return this.host.smoothGraph;
	}
	constructor(host) {
		super(host);
		this.onInternalObject = new _labirthermal_core.CallbacksManager();
		this._UUID = host.UUID + "_manager-controller";
		this.managerControllerContextProvider = new _lit_context.ContextProvider(this.host, {
			context: managerControllerContext,
			initialValue: this
		});
		this.managerObjectContextPtovider = new _lit_context.ContextProvider(this.host, { context: managerContext });
		this.paletteContextProvider = new _lit_context.ContextProvider(this.host, { context: managerPaletteContext });
		this.advancedPalettesContextProvider = new _lit_context.ContextProvider(this.host, { context: managerAdvancedPalettesContext });
		this.smoothThermogramsContextProvider = new _lit_context.ContextProvider(this.host, { context: managerSmoothContext });
		this.toolContextProvider = new _lit_context.ContextProvider(this.host, { context: managerToolContext });
		this.smoothGraphContextProvider = new _lit_context.ContextProvider(this.host, { context: managerGraphFunctionContext });
	}
	hostConnected() {
		const slug = this._getDefaultSlugFromHost("manager-slug");
		this.host.managerSlug = slug;
		this.host.managerObject = createOrGetManager(slug);
		this.managerObjectContextPtovider.setValue(this.host.managerObject);
		this.onInternalObject.call(this.host.managerObject);
		const initialPaletteValue = paletteConverter.fromAttribute(this.host.palette);
		this.setPalette(initialPaletteValue);
		this.managerObject.palette.addListener(this.UUID, this.setPalette.bind(this));
		this.setAdvancedPalettes(this.host.advancedPalettes);
		this.setSmoothThermograms(this.host.smoothThermograms);
		this.managerObject.smooth.addListener(this.UUID, this.setSmoothThermograms.bind(this));
		this.setSmoothGraph(this.host.smoothGraph);
		this.managerObject.graphSmooth.addListener(this.UUID, this.setSmoothGraph.bind(this));
		this._setToolByKey(this.host.tool);
		this.managerObject.tool.addListener(this.UUID, this.setTool.bind(this));
	}
	hostDisconnected() {
		this.managerObject.palette.removeListener(this.UUID);
		this.managerObject.smooth.removeListener(this.UUID);
		this.managerObject.graphSmooth.removeListener(this.UUID);
		this.managerObject.tool.removeListener(this.UUID);
	}
	hostUpdate() {}
	hostWillUpdateWatcher(value) {
		if (!value) return;
		if (value.has("palette")) this.setPalette(this.host.palette);
		if (value.has("advancedPalettes")) this.setAdvancedPalettes(this.host.advancedPalettes);
		if (value.has("smoothThermograms")) this.setSmoothThermograms(this.host.smoothThermograms);
		if (value.has("smoothGraph")) this.setSmoothGraph(this.host.smoothGraph);
		if (value.has("tool")) this._setToolByKey(this.host.tool);
	}
	hostUpdatedWatcher() {}
	/** 
	* Create or get a registry by its slug from the internal manager object. 
	*/
	createRegistry(slug) {
		return this.managerObject.addOrGetRegistry(slug);
	}
	_paletteStringToContextValue(palette) {
		return {
			key: palette,
			data: _labirthermal_core.ThermalPalettes[palette]
		};
	}
	/** 
	* This is the recommended way to set the advanced palettes flag - updates the value in the context provider and the host element. All updates are performed only when the new value differs from the current one. 
	*/
	setAdvancedPalettes(value) {
		if (this.host.advancedPalettes !== value) this.host.advancedPalettes = value;
		if (this.advancedPalettesContextProvider.value !== value) this.advancedPalettesContextProvider.setValue(value);
	}
	/** 
	* This is the recommended way to set the palette - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
	*/
	setPalette(value) {
		const sanitizedValue = paletteConverter.fromAttribute(value);
		if (this.managerObject.palette.value !== sanitizedValue) this.managerObject.palette.setPalette(sanitizedValue);
		if (!this.paletteContextProvider.value) this.paletteContextProvider.setValue(this._paletteStringToContextValue(sanitizedValue));
		else if (this.paletteContextProvider.value.key !== sanitizedValue) this.paletteContextProvider.setValue(this._paletteStringToContextValue(sanitizedValue));
		if (this.host.palette !== sanitizedValue) this.host.palette = sanitizedValue;
	}
	/** 
	* This is the recommended way to set the smooth thermograms flag - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
	*/
	setSmoothThermograms(value) {
		if (this.host.smoothThermograms !== value) this.host.smoothThermograms = value;
		if (this.smoothThermogramsContextProvider.value !== value) this.smoothThermogramsContextProvider.setValue(value);
		if (this.managerObject.smooth.value !== value) this.managerObject.smooth.setSmooth(value);
	}
	/** 
	* This is the recommended way to set the tool - updates the value in the core manager object, the context provider, and the host element. All updates are performed only when the new value differs from the current one. 
	*/
	setTool(value) {
		value = this._toolStringToObject(value.key);
		if (value && value.key !== this.host.tool) this.host.tool = value.key;
		if (this.toolContextProvider.value !== value) this.toolContextProvider.setValue(value);
		if (this.managerObject.tool.value !== value) this.managerObject.tool.selectTool(value);
	}
	_setToolByKey(value) {
		const toolObject = this._toolStringToObject(value);
		this.setTool(toolObject);
	}
	_toolStringToObject(value = "inspect") {
		const selectedTool = this.managerObject.tool.tools[value];
		if (!selectedTool) return this.managerObject.tool.tools["inspect"];
		return selectedTool;
	}
	/**
	* This is the recommended way to set the smooth graph option - updates the value and the context provider. All updates are performed only when the new value differs from the current one.
	*/
	setSmoothGraph(value) {
		if (this.host.smoothGraph !== value) this.host.smoothGraph = value;
		if (this.smoothGraphContextProvider.value !== value) this.smoothGraphContextProvider.setValue(value);
		if (this.managerObject.graphSmooth.value !== value) this.managerObject.graphSmooth.setGraphSmooth(value);
	}
};
//#endregion
//#region src/controllers/ConfigController.ts
/** Exposes the general configuration context for the application. Setters are here. */
const configContext = (0, _lit_context.createContext)("config-context");
/** Handles the global configuration related to the PNG exports */
var ConfigController = class extends AbstractReactiveController {
	get UUID() {
		return this._UUID;
	}
	constructor(host) {
		super(host);
		this._settings = {
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
			visibility: { showAllOptions: false }
		};
		this._UUID = this.host.UUID + "__config-controller";
		this.contextProvider = new _lit_context.ContextProvider(host, {
			context: configContext,
			initialValue: this
		});
	}
	hostConnected() {}
	hostDisconnected() {}
	get settings() {
		return this._settings;
	}
	setPngWidth(value) {
		const width = Math.max(100, value);
		this._setPngSetting("width", width);
	}
	setPngFontSize(value) {
		const fontSize = Math.max(6, value);
		this._setPngSetting("fontSize", fontSize);
	}
	setPngAnalyses(value) {
		this._setPngSetting("analyses", value);
	}
	setPngThermalScale(value) {
		this._setPngSetting("thermalScale", value);
	}
	setPngFileName(value) {
		this._setPngSetting("fileName", value);
	}
	setPngFileDate(value) {
		this._setPngSetting("fileDate", value);
	}
	setPngLicense(value) {
		this._setPngSetting("license", value);
	}
	setGroupColumns(value) {
		const columns = Math.max(1, value);
		this._setGroupSetting("columns", columns);
	}
	setGroupGroupName(value) {
		this._setGroupSetting("groupName", value);
	}
	setShowAllOptions(value) {
		this._settings = {
			...this._settings,
			visibility: {
				...this._settings.visibility,
				showAllOptions: value
			}
		};
		this._publish();
	}
	_setPngSetting(key, value) {
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
	}
	_setGroupSetting(key, value) {
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
	}
	_publish() {
		this.contextProvider.setValue(this, true);
	}
};
//#endregion
//#region src/apps/AbstractApp.ts
var AbstractApp = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.configController = new ConfigController(this);
		this.showFullscreen = false;
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		initLocalesInTopLevelElement(this);
	}
};
__decorate([
	(0, _lit_context.provide)({ context: localeContext }),
	(0, lit_decorators_js.property)({
		reflect: true,
		converter: localeConverter
	}),
	__decorateMetadata("design:type", Object)
], AbstractApp.prototype, "locale", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "label"
}), __decorateMetadata("design:type", String)], AbstractApp.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "author"
}), __decorateMetadata("design:type", String)], AbstractApp.prototype, "author", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "license"
}), __decorateMetadata("design:type", String)], AbstractApp.prototype, "license", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "show-fullscreen"
}), __decorateMetadata("design:type", Boolean)], AbstractApp.prototype, "showFullscreen", void 0);
//#endregion
//#region src/ui/App.ts
var ThermalAppElement = class ThermalAppElement extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.language = instance.language;
		this._overflowCount = 0;
		this._overflowOpen = false;
		this._hasPre = false;
		this._hasContent = false;
		this._hasPreBar = false;
		this._hasBarHeader = false;
		this.fullscreen = "off";
		this.showFullscreen = false;
		this.labelVariant = "foreground";
		this.headerRef = (0, lit_directives_ref_js.createRef)();
		this.contentRef = (0, lit_directives_ref_js.createRef)();
		this.barItemsRef = (0, lit_directives_ref_js.createRef)();
		this._overflowObserver = null;
		this._rafId = null;
		this._barSlotAssignments = /* @__PURE__ */ new Map();
		this._handleLanguageChange = (language) => {
			this.language = language;
		};
		this._handleFullscreenChange = () => {
			this.fullscreen = document.fullscreenElement === this ? "on" : "off";
		};
		this._onSlotChange = (event) => {
			const slot = event.target;
			this._setSlotFlag(slot.name, slot.assignedElements({ flatten: true }).length > 0);
		};
		this._onBarSlotChange = () => {
			for (const name of [
				"bar-pre",
				"bar-post",
				"bar-overflow"
			]) {
				const current = this.shadowRoot?.querySelector(`slot[name="${name}"]`)?.assignedElements() ?? [];
				const previous = this._barSlotAssignments.get(name);
				if (!previous || previous.length !== current.length || current.some((item, index) => item !== previous[index])) {
					this._scheduleOverflowUpdate();
					return;
				}
			}
		};
	}
	connectedCallback() {
		super.connectedCallback();
		document.addEventListener("fullscreenchange", this._handleFullscreenChange);
		if (instance.language !== void 0) this.language = instance.language;
		instance.on("languageChanged", this._handleLanguageChange);
		this.requestUpdate();
	}
	disconnectedCallback() {
		document.removeEventListener("fullscreenchange", this._handleFullscreenChange);
		instance.off("languageChanged", this._handleLanguageChange);
		this.observer?.disconnect();
		this.observer = void 0;
		if (this._overflowObserver) {
			this._overflowObserver.disconnect();
			this._overflowObserver = null;
		}
		if (this._rafId !== null) {
			cancelAnimationFrame(this._rafId);
			this._rafId = null;
		}
		this._barSlotAssignments.clear();
		super.disconnectedCallback();
	}
	_toggleOverflow() {
		this._overflowOpen = !this._overflowOpen;
	}
	_setSlotFlag(name, has) {
		switch (name) {
			case "pre":
				this._hasPre = has;
				break;
			case "content":
				this._hasContent = has;
				break;
			case "pre-bar":
				this._hasPreBar = has;
				break;
			case "bar-header": this._hasBarHeader = has;
		}
	}
	_syncSlotFlags() {
		const shadow = this.shadowRoot;
		if (!shadow) return;
		for (const name of [
			"pre",
			"content",
			"pre-bar",
			"bar-header"
		]) {
			const slot = shadow.querySelector(`slot[name="${name}"]`);
			const has = slot ? slot.assignedElements({ flatten: true }).length > 0 : Array.from(this.children).some((child) => {
				if (child.slot !== name) return false;
				return !(child instanceof HTMLSlotElement) || child.assignedElements({ flatten: true }).length > 0;
			});
			this._setSlotFlag(name, has);
		}
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		this._syncSlotFlags();
	}
	_scheduleOverflowUpdate() {
		if (!this.isConnected || this._rafId !== null) return;
		this._rafId = requestAnimationFrame(() => {
			this._rafId = null;
			if (!this.isConnected) return;
			this._doOverflowUpdate();
			for (const name of [
				"bar-pre",
				"bar-post",
				"bar-overflow"
			]) {
				const items = this.shadowRoot?.querySelector(`slot[name="${name}"]`)?.assignedElements() ?? [];
				this._barSlotAssignments.set(name, items);
			}
		});
	}
	_doOverflowUpdate() {
		const shadow = this.shadowRoot;
		if (!shadow) return;
		const overflowSlot = shadow.querySelector("slot[name=\"bar-overflow\"]");
		if (overflowSlot) {
			const items = [...overflowSlot.assignedElements()];
			for (const item of items) {
				item.slot = item.dataset.originalSlot ?? "bar-pre";
				delete item.dataset.originalSlot;
			}
		}
		const barItems = this.barItemsRef.value;
		if (!barItems) return;
		const preSlot = shadow.querySelector("slot[name=\"bar-pre\"]");
		const postSlot = shadow.querySelector("slot[name=\"bar-post\"]");
		const allItems = [...preSlot?.assignedElements({ flatten: true }) ?? [], ...postSlot?.assignedElements({ flatten: true }) ?? []];
		if (allItems.length === 0) {
			this._overflowCount = 0;
			this._overflowOpen = false;
			return;
		}
		const GAP = 5;
		const HAMBURGER_W = 44;
		const totalItemsWidth = allItems.reduce((sum, el, i) => sum + el.offsetWidth + (i > 0 ? GAP : 0), 0);
		const containerWidth = barItems.offsetWidth;
		if (totalItemsWidth <= containerWidth) {
			this._overflowCount = 0;
			this._overflowOpen = false;
			return;
		}
		const availableWidth = containerWidth - HAMBURGER_W;
		let used = 0;
		let firstOverflow = allItems.length;
		for (let i = 0; i < allItems.length; i++) {
			const itemWidth = allItems[i].offsetWidth + (i > 0 ? GAP : 0);
			if (used + itemWidth > availableWidth) {
				firstOverflow = i;
				break;
			}
			used += itemWidth;
		}
		for (let i = firstOverflow; i < allItems.length; i++) {
			const item = allItems[i];
			item.dataset.originalSlot = item.slot;
			item.slot = "bar-overflow";
		}
		const newCount = allItems.length - firstOverflow;
		this._overflowCount = newCount;
		if (newCount === 0) this._overflowOpen = false;
	}
	toggleFullscreen() {
		if (this.fullscreen === "on") this.fullscreen = "off";
		else this.fullscreen = "on";
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (!this.isConnected) return;
		if (this.observer === void 0 && this.contentRef.value !== void 0) {
			this.observer = new ResizeObserver(() => {
				if (this.isConnected && this.fullscreen === "off" && this.contentRef.value) this.contentRef.value.removeAttribute("style");
			});
			this.observer.observe(this);
		}
		if (!this._overflowObserver && this.barItemsRef.value) {
			this._overflowObserver = new ResizeObserver(() => {
				this._scheduleOverflowUpdate();
			});
			this._overflowObserver.observe(this.barItemsRef.value);
			this._scheduleOverflowUpdate();
		}
	}
	attributeChangedCallback(name, _old, value) {
		super.attributeChangedCallback(name, _old, value);
		if (name === "fullscreen" && _old !== value) {
			if (value === "on") {
				if (document.fullscreenElement === this) return;
				if (typeof this.requestFullscreen !== "function") {
					this.log("Fullscreen API is unavailable");
					this.fullscreen = "off";
					return;
				}
				this.requestFullscreen().catch((error) => {
					this.log("Unable to enter fullscreen", error);
					this._handleFullscreenChange();
				});
			} else if (value === "off" && _old !== null) {
				if (document.fullscreenElement === this) document.exitFullscreen().catch((error) => {
					this.log("Unable to exit fullscreen", error);
					this._handleFullscreenChange();
				});
			}
		}
	}
	static {
		this.styles = lit.css`

        :host {
            font-family: sans-serif;
            font-weight: normal;
            font-size: var( --thermal-fs );
            line-height: 1em;
            color: var( --thermal-foreground );

            display: block;

            padding: calc( var( --thermal-gap ) / 3 );
            background-color: var( --thermal-slate-light );
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );    
            position: relative; 
        }

        .bar {
            padding-bottom: calc( var( --thermal-gap ) * 0.5 );
            display: flex;
            gap: 5px;
            align-items: center;
        }

        .bar-label {
            flex: 0 1 auto;
            min-width: 50px;
            overflow: hidden;
            display: flex;
            align-items: center;
        }

        .bar-header,
        .pre-bar {
            display: flex;
            gap: 5px;
            align-items: flex-start;
        }

        .pre-bar {
            width: 100%;
        }

        .bar-header[hidden],
        .pre-bar[hidden],
        .pre[hidden] {
            display: none;
        }

        .bar-items {
            flex: 1 1 0;
            min-width: 0;
            display: flex;
            gap: 5px;
            align-items: center;
            --thermal-direction: row;
        }

        .bar-items ::slotted([slot="bar-pre"]),
        .bar-items ::slotted([slot="bar-post"]) {
            flex-shrink: 0;
        }

        .bar-spacer {
            flex: 1 1 0;
            min-width: 0;
        }

        .bar-overflow-toggle {
            flex-shrink: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            background: none;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            border-radius: var(--thermal-radius);
            color: var(--thermal-foreground);
            cursor: pointer;
            padding: 0.3em 0.5em;
            line-height: 0;
        }

        .bar-overflow-toggle:hover {
            background-color: var(--thermal-slate-light);
        }

        .bar-overflow-panel {
            
            display: flex;
            flex-wrap: wrap;
            gap: 5px;
            align-items: center;
            padding: calc( var(--thermal-gap) * 0.4 ) 0;
            
            border-top: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            --thermal-direction: row;

            padding: .3em;
            
            background: var(--thermal-slate);
            border-radius: var(--thermal-radius);
            
            margin-bottom: .5em;

            > slot > * {
                width: 100%; 
            }

        }

        .bar-overflow-panel[hidden] {
            display: none;
        }

        :host([fullscreen="on"]) {
            box-sizing: border-box;
            width: 100vw;
            height: 100vh;
            overflow: auto;
            padding: calc( var( --thermal-gap ) / 3 );
            border: 0;
            border-radius: 0;
        }


        .credits {

            display: flex;
            width: 100%;
            flex-wrap: wrap;
            font-size: calc( var(--thermal-fs-sm) * 0.8 );

            & > div {
                padding-top: calc( var(--thermal-gap) * .5 );
                padding-right: var( --thermal-gap );
            }
        
        }

        .credits-field {
            display: inline;
            opacity: .5;
        }

        .credit-value {
            display: inline;
        }

        .content {
            width: 100%;
            box-sizing: border-box;
        }

        .has-content {
            margin-top: calc( var(--thermal-gap) * .5);
            &::before {
                opacity: .5;
                font-size: calc( var(--thermal-fs-sm) * 0.8 );
                display: block;
                padding-bottom: calc( var(--thermal-gap) * .5);
            }
        }

        .app-header {
            position: sticky;
            top: 0;
            z-index: 9999;
            background: var(--thermal-slate-light);
            background: linear-gradient(var(--thermal-slate-light) calc(100% - 10px), transparent);
        }
    
    `;
	}
	renderLabel() {
		const nonInteractive = !this.onlabel;
		const slotInner = this.label ? lit.html`<thermal-btn
    variant="${this.labelVariant}"
    ?non-interactive=${nonInteractive}
    icon=${(0, lit_directives_if_defined_js.ifDefined)(this.labelIcon)}
    iconStyle=${(0, lit_directives_if_defined_js.ifDefined)(this.labelIconStyle)}
    tooltip=${(0, lit_directives_if_defined_js.ifDefined)(this.labelTooltip)}
    @click=${this.onlabel}
>${this.label}</thermal-btn>` : lit.nothing;
		return lit.html`
    <slot name="label">
        ${slotInner}
    </slot>`;
	}
	renderCreditField(label, value) {
		if (value === void 0 || value.trim().length === 0) return lit.nothing;
		return lit.html`<div>
    <div class="credits-field">${label}:</div>
    <div class="credit-value">${value}</div>
</div>`;
	}
	renderCredits() {
		if (this.author || this.license || this.recorded) return lit.html`<div class="credits">
    ${this.renderCreditField(t$1("recordedat"), this.recorded)}
    ${this.renderCreditField(t$1("author"), this.author)}
    ${this.renderCreditField(t$1("license"), this.license)}
</div>`;
		return lit.nothing;
	}
	static {
		this.languages = [
			"en",
			"cs",
			"de",
			"fr",
			"cy"
		];
	}
	renderLanguageSwitcher() {
		return lit.html`<thermal-dropdown>
    <span slot="invoker">${this.language.toUpperCase()}</span>
    ${(0, lit_directives_cache_js.cache)((0, lit_directives_map_js.map)(ThermalAppElement.languages, (lang) => lit.html`<div slot="option">
        <thermal-btn
            @click=${() => {
			instance.changeLanguage(lang);
			this.language = lang;
		}}
        >${languagesObject[lang].flag} ${languagesObject[lang].name}</thermal-btn>
    </div>`))}
</thermal-dropdown>`;
	}
	renderFullscreenButton() {
		if (this.showFullscreen === false) return lit.nothing;
		return lit.html`<thermal-btn
    class="app-fullscreen-button"
    @click=${this.toggleFullscreen.bind(this)}
    icon=${this.fullscreen === "on" ? "smaller" : "bigger"}
    iconStyle="mini"
    tooltip=${this.fullscreen === "on" ? t$1("close") : "Fullscreen"}
></thermal-btn>`;
	}
	renderOverflowToggle() {
		if (this._overflowCount === 0) return lit.nothing;
		let icon = "adjustment";
		let iconStyle = "outline";
		let variant = "default";
		if (this._overflowOpen) {
			icon = "close";
			iconStyle = "outline";
			variant = "background";
		}
		return lit.html`<thermal-btn 
    @click=${this._toggleOverflow} 
    tooltip="${this.t("moreoptions")}" 
    icon=${icon} 
    iconStyle=${iconStyle} 
    variant=${variant}
></thermal-btn>`;
	}
	render() {
		return lit.html`<header ${(0, lit_directives_ref_js.ref)(this.headerRef)} class="app-header">

        <div class="bar">

            <div class="bar-label">
                ${this.renderLabel()}
            </div>

            <div class="bar-header" ?hidden=${!this._hasBarHeader}>
                <slot name="bar-header" @slotchange=${this._onSlotChange}></slot>
            </div>

            <div class="bar-items" ${(0, lit_directives_ref_js.ref)(this.barItemsRef)}>

                <slot name="bar-pre" @slotchange=${this._onBarSlotChange}></slot>
                <div class="bar-spacer"></div>
                <slot name="bar-post" @slotchange=${this._onBarSlotChange}></slot>

                ${this.renderOverflowToggle()}

            </div>

            <slot name="close"></slot>

            ${this.renderFullscreenButton()}

            ${this.renderLanguageSwitcher()}

        </div>

        <div class="bar-overflow-panel" ?hidden=${this._overflowCount === 0 || !this._overflowOpen}>
            <slot name="bar-overflow" @slotchange=${this._onBarSlotChange}></slot>
        </div>

        <div class="pre" ?hidden=${!this._hasPre}>
            <slot name="pre" @slotchange=${this._onSlotChange}></slot>
        </div>

        <div class="pre-bar" ?hidden=${!this._hasPreBar}>
            <slot name="pre-bar" @slotchange=${this._onSlotChange}></slot>
        </div>
        <slot name="pre-bar-wrap"></slot>

    </header>

    <div class="content" part="app-content" ${(0, lit_directives_ref_js.ref)(this.contentRef)}>
        <slot></slot>
    </div>

    <div class="post">
        <slot name="post"></slot>
    </div>

    ${this.renderCredits()}

    <div class="content ${this._hasContent ? "has-content" : ""}">
        <slot name="content" @slotchange=${this._onSlotChange}></slot>
    </div>
`;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "language", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ThermalAppElement.prototype, "_overflowCount", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalAppElement.prototype, "_overflowOpen", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalAppElement.prototype, "_hasPre", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalAppElement.prototype, "_hasContent", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalAppElement.prototype, "_hasPreBar", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalAppElement.prototype, "_hasBarHeader", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "fullscreen", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "show-fullscreen"
}), __decorateMetadata("design:type", Boolean)], ThermalAppElement.prototype, "showFullscreen", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "author", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "recorded", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "license", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "labelIcon", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "labelIconStyle", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalAppElement.prototype, "labelTooltip", void 0);
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", Object)], ThermalAppElement.prototype, "labelVariant", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], ThermalAppElement.prototype, "onlabel", void 0);
//#endregion
//#region src/ui/Bar.ts
var ThermalBarElement = class extends lit.LitElement {
	constructor(..._args) {
		super(..._args);
		this.collapsed = false;
		this.drawerRef = (0, lit_directives_ref_js.createRef)();
		this.contentRef = (0, lit_directives_ref_js.createRef)();
		this.rulerContentRef = (0, lit_directives_ref_js.createRef)();
	}
	static {
		this.styles = lit.css`

        .container {
            // width: 100%;
            display: flex;
            gap: 5px;
            position: relative;
        }


        .ruler {
            width: 100%;
            position: absolute;
            height: 0;
            top: 0;
            left: 0;
        }

        .ruler-item {}

        .ruler-item__current {
            border: var(--thermal-border-width) var(--thermal-border-style) transparent;
            height: 0;
            margin-top: -1px;
            content: "";
        }

        .ruler-item__content {
            border: var(--thermal-border-width) var(--thermal-border-style) red;
            position: absolute;
            display: none;
        }


        .content {
            
            display: flex;
            gap: calc( 5px );
            width: max-content;

            align-items: center;
        
        }



        .icon {
            width: var( --thermal-gap );
            line-height: 0;
        }

        .collapsed-menu {
            --thermal-direction: column;
            --thermal-collapsible-display: block !important;
            --thermal-collapsible-width: 100%;
            --thermal-collapsible-grow: 1;
        }

    `;
	}
	connectedCallback() {
		super.connectedCallback();
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		this.hydrateObserver();
	}
	hydrateObserver() {
		if (this.drawerRef.value && this.observer === void 0) {
			this.observer = new ResizeObserver((entries) => {
				if (this.collapsed === false) {
					const contentWidth = this.contentRef.value.clientWidth;
					this.lastContentWidth = contentWidth;
				}
				const entry = entries[0];
				if (this.lastContentWidth < entry.contentRect.width) {
					if (this.collapsed) this.collapsed = false;
				} else if (this.collapsed === false) this.collapsed = true;
			});
			this.observer.observe(this.drawerRef.value);
		}
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.drawerRef.value) this.observer.unobserve(this.drawerRef.value);
		if (this.observer) this.observer.disconnect();
	}
	render() {
		return lit.html`

            <div class="container">

                <div class="ruler">
                    <div class="ruler-item ruler-item__current" ${(0, lit_directives_ref_js.ref)(this.drawerRef)}></div>
                    <div class="ruler-item ruler-item__content" ${(0, lit_directives_ref_js.ref)(this.rulerContentRef)} style="width: ${this.lastContentWidth + 1}px"></div>
                </div>
                <div class="content" ${(0, lit_directives_ref_js.ref)(this.contentRef)}>

                    ${this.collapsed === false ? lit.html`
                        <slot></slot>    
                    ` : lit.nothing}
                
                </div>

            </div>

            ${this.collapsed ? lit.html`
                <thermal-dropdown class="collapsed-menu">
                    <div slot="invoker" class="icon">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                    </svg>
                    </div>

                    <slot slot="option" stacked="true"></slot>
                </thermal-dropdown>
            ` : lit.nothing}
        
        `;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalBarElement.prototype, "collapsed", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], ThermalBarElement.prototype, "lastContentWidth", void 0);
//#endregion
//#region src/ui/Btn.ts
var ThermalBtnElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.tooltipPlacement = "top";
		this.iconStyle = "outline";
		this.disabled = false;
		this.nonInteractive = false;
		this.tabindex = 0;
		this.align = "center";
		this.showTooltip = async () => {
			if (!this.tooltipElement || !this.arrowElement) return;
			this.tooltipElement.style.display = "block";
			this.tooltipElement.style.visibility = "visible";
			this.tooltipElement.style.opacity = "1";
			const updatePosition = async () => {
				if (!this.tooltipElement || !this.arrowElement) return;
				const { x, y, placement, middlewareData } = await (0, _floating_ui_dom.computePosition)(this, this.tooltipElement, {
					placement: this.tooltipPlacement,
					strategy: "fixed",
					middleware: [
						(0, _floating_ui_dom.offset)(6),
						(0, _floating_ui_dom.flip)(),
						(0, _floating_ui_dom.shift)({ padding: 8 }),
						(0, _floating_ui_dom.arrow)({ element: this.arrowElement })
					]
				});
				Object.assign(this.tooltipElement.style, {
					left: `${x}px`,
					top: `${y}px`
				});
				const { x: arrowX, y: arrowY } = middlewareData.arrow || {};
				const staticSide = {
					top: "bottom",
					right: "left",
					bottom: "top",
					left: "right"
				}[placement.split("-")[0]];
				Object.assign(this.arrowElement.style, {
					left: arrowX != null ? `${arrowX}px` : "",
					top: arrowY != null ? `${arrowY}px` : "",
					right: "",
					bottom: "",
					[staticSide]: "-4px"
				});
			};
			updatePosition();
			this.cleanupAutoUpdate = (0, _floating_ui_dom.autoUpdate)(this, this.tooltipElement, updatePosition);
		};
		this.hideTooltip = () => {
			if (!this.tooltipElement) return;
			this.tooltipElement.style.opacity = "0";
			this.tooltipElement.style.visibility = "hidden";
			this.tooltipElement.style.display = "none";
			if (this.cleanupAutoUpdate) {
				this.cleanupAutoUpdate();
				this.cleanupAutoUpdate = void 0;
			}
		};
		this.handleClick = (event) => {
			if (this.disabled) {
				event.preventDefault();
				event.stopImmediatePropagation();
			}
		};
		this.handleKeydown = (event) => {
			if (this.disabled) return;
			if (event.key === "Enter" || event.key === " ") {
				event.preventDefault();
				this.click();
			}
		};
	}
	connectedCallback() {
		super.connectedCallback();
		this.addEventListener("click", this.handleClick, { capture: true });
	}
	firstUpdated() {
		if (!this.hasAttribute("tabindex")) this.setAttribute("tabindex", "0");
		this.addEventListener("keydown", this.handleKeydown);
		if (this.tooltip) {
			this.addEventListener("mouseenter", this.showTooltip);
			this.addEventListener("mouseleave", this.hideTooltip);
			this.addEventListener("focus", this.showTooltip);
			this.addEventListener("blur", this.hideTooltip);
		}
	}
	updated(changedProperties) {
		if (changedProperties.has("tooltip")) {
			if (this.tooltip) {
				this.addEventListener("mouseenter", this.showTooltip);
				this.addEventListener("mouseleave", this.hideTooltip);
				this.addEventListener("focus", this.showTooltip);
				this.addEventListener("blur", this.hideTooltip);
			} else {
				this.removeEventListener("mouseenter", this.showTooltip);
				this.removeEventListener("mouseleave", this.hideTooltip);
				this.removeEventListener("focus", this.showTooltip);
				this.removeEventListener("blur", this.hideTooltip);
			}
		}
	}
	removeTooltip() {
		this.tooltipElement = void 0;
		this.arrowElement = void 0;
		if (this.cleanupAutoUpdate) {
			this.cleanupAutoUpdate();
			this.cleanupAutoUpdate = void 0;
		}
		this.removeEventListener("mouseenter", this.showTooltip);
		this.removeEventListener("mouseleave", this.hideTooltip);
		this.removeEventListener("focus", this.showTooltip);
		this.removeEventListener("blur", this.hideTooltip);
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener("keydown", this.handleKeydown);
		this.removeEventListener("click", this.handleClick, { capture: true });
		this.removeTooltip();
		if (this.highlightTimeout) {
			clearTimeout(this.highlightTimeout);
			this.highlightTimeout = void 0;
		}
		this.classList.remove("highlight");
	}
	static {
		this.styles = lit.css`

        :host {

            font-family: var( --thermal-font-family );
            font-size: calc( var( --thermal-fs ) * .8);
            line-height: var( --thermal-line-height );
        
            --color: var( --thermal-foreground );
            --color-hover: var( --color );

            --bg: var( --thermal-slate-light );
            --bg-hover: var( --bg );

            --border-width: var(--thermal-border-width);
            --border-style: var(--thermal-border-style);
            --border-color: var( --thermal-slate );
            --border-color-hover: var( --border-color );

            --radius: var( --custom-radius, var( --thermal-radius ) );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );
            
            --padding: .5em .7em;
            --icon-size: 1em;
            --gap: .5em;
            --opacity: 1;
            --letter-spacing: normal;

            --cursor: pointer;
            --transition-duration: .15s;

            --tooltip-bg: var(--thermal-foreground, black);
            --tooltip-color: var( --thermal-background, white);
            --tooltip-padding: 0.5em 0.75em;
            --tooltip-border-radius: var(--thermal-radius, 4px);
            --tooltip-font-size: 0.9em;
            --tooltip-box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);

        }



        :host {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-grow: 0;
            gap: var(--gap);
            vertical-align: middle;
            
            position: relative;

            margin: 0;
            padding: var(--padding);
            width: fit-content;
            box-sizing: border-box;

            border-width: var( --border-width );
            border-style: var( --border-style );
            border-color: var( --border-color );
            border-radius: var( --radius );
            
            background-color: var(--bg);
            color: var(--color);

            box-shadow: var( --shadow ); 
            
            cursor: var( --cursor );
            opacity: var( --opacity );
            
            --letter-spacing: var( --letter-spacing );
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;

            transition: all var(--transition-duration) ease-in-out;

            /* Focus styling */
            outline: none;

            
        }

        :host([align="left"]) {
            justify-content: flex-start;
        }


        :host(:focus),
        :host(:focus-visible),
        :host(:hover) {
            outline: none;
            box-shadow: var( --shadow-hover );
            background-color: var(--bg-hover);
            color: var(--color-hover);
            border-color: var( --border-color-hover );
        }

        svg,
        span {
            vertical-align: middle;
            display: inline-block;
        }



        :host([disabled]),
        :host([disabled]:hover),
        :host([disabled]:focus) {

            cursor: not-allowed;
            color: color-mix(in srgb, var(--color) 50%, transparent);
            background: color-mix(in srgb, var(--bg) 50%, transparent);
            border-color: color-mix(in srgb, var(--border-color) 50%, transparent);
            --cursor: not-allowed;
            --shadow: none;
            --shadow-hover: none;
        }


        :host([non-interactive]),
        :host([non-interactive]:hover),
        :host([non-interactive]:focus) {
            --shadow-hover: none;
            --cursor: text;
            --color-hover: var( --color );
            --bg-hover: var( --bg );
        }





        :host([size="sm"]),
        :host([size=sm]) {
            --padding: .1em .2em;
            line-height: 1.2;
            --letter-spacing: 0.5px;
            font-size: .7em;
        }

        :host([size="lg"]),
        :host([size=lg]) {
            --padding: .7em .9em;
            line-height: 1.2;
            font-size: 1em;
        }

        :host([size="xl"]),
        :host([size=xl]) {
            line-height: 1.2;
            font-size: 2em;
        }

        :host([plain]) {
            --border-color: transparent;
            --border-color-hover: transparent;
            --border-width: 0px;
            border: none !important;
        }







        :host([variant="primary"]),
        :host([variant=primary]) {
            
            --color: var( --thermal-background );
            --color-hover: var( --thermal-background );
            
            --bg: var( --thermal-primary );
            --bg-hover: var( --thermal-primary-dark );

            --border-color: var( --thermal-slate );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );

        }

        :host([variant="foreground"]),
        :host([variant=foreground]) {

            --color: var( --thermal-background );
            --color-hover: var( --thermal-background );
            
            --bg: var( --thermal-foreground );
            --bg-hover: var( --thermal-slate-dark );

            --border-color: var( --thermal-slate );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );
        }


        :host([variant="background"]),
        :host([variant=background]) {

            --color: var( --thermal-foreground );
            --color-hover: var( --thermal-foreground );
            
            --bg: var( --thermal-background );
            --bg-hover: var( --bg );

            --border-color: var( --thermal-slate );
            
            --shadow: none;
            --shadow-hover: var( --thermal-shadow );
        }



        :host([variant="text"]),
        :host([variant=text]) {

            --bg: transparent;
            --bg-hover: transparent;

            --border-color: transparent;
            --border-color-hover: transparent;

            --border-width: 0px;
            border: none !important;

            --shadow: none;
            --shadow-hover: none;

            --padding: 0px;
            --letter-spacing: normal;
        }

        



        .btn-icon {
            width: 1.3em;
        }


        /* Global tooltip styles */

        .thermal-tooltip {
            background-color: var(--tooltip-bg, #334155);
            color: var(--tooltip-color, white);
            padding: var(--tooltip-padding, 0.5em 0.75em);
            border-radius: var(--tooltip-border-radius, 4px);
            font-size: var(--tooltip-font-size, 1em);
            box-shadow: var(--tooltip-box-shadow, 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06));
            z-index: 9999;
            pointer-events: none;
            word-wrap: break-word;
            font-size: calc( var( --thermal-fs ) * 0.8 );
        }

        .thermal-tooltip-arrow {
            position: absolute;
            width: 8px;
            height: 8px;
            background: inherit;
            transform: rotate(45deg);
        }

        .prefix {
            font-weight: bold;
            padding-right: 0.25em;
        }

        .badge {
            position: absolute;
            top: 0;
            right: 0;
            width: .5em;
            height: .5em;
            background: red;
            border-radius: 50%;
        }

        /* highlight animation for attention-grabbing effect */
        @keyframes thermal-highlight {
            0%,100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
        :host(.highlight) {
            animation: thermal-highlight 0.4s ease-in-out infinite;
            box-shadow: var(--thermal-shadow);
        }

    `;
	}
	renderBadge() {
		if (!this.badge) return lit.nothing;
		return lit.html`<span class="badge" style="background-color: ${this.badge}"></span>`;
	}
	/**
	* Apply a temporary highlight animation to the button. The animation
	* will pulse the element with a gentle scale up/down effect for the
	* specified duration (milliseconds).
	*/
	highlight(durationMs) {
		if (durationMs <= 0) return;
		if (this.highlightTimeout) {
			clearTimeout(this.highlightTimeout);
			this.highlightTimeout = void 0;
		}
		this.classList.add("highlight");
		const cleanup = () => {
			this.classList.remove("highlight");
			if (this.highlightTimeout) {
				clearTimeout(this.highlightTimeout);
				this.highlightTimeout = void 0;
			}
			this.removeEventListener("mouseenter", cleanup);
			this.removeEventListener("focus", cleanup);
		};
		this.addEventListener("mouseenter", cleanup);
		this.addEventListener("focus", cleanup);
		this.highlightTimeout = window.setTimeout(cleanup, durationMs);
	}
	render() {
		let icon = lit.nothing;
		if (this.icon && this.icon in icons) {
			const i = icons[this.icon];
			if (typeof i[this.iconStyle] === "function") icon = i[this.iconStyle]("btn-icon");
		}
		let tooltipHtml = lit.nothing;
		if (this.tooltip) tooltipHtml = lit.html`
                <div
                    class="thermal-tooltip"
                    style="display: none; position: fixed; top: 0; left: 0; visibility: hidden; opacity: 0; transition: opacity 0.2s ease-in-out;"
                    @mouseenter=${this.showTooltip}
                    @mouseleave=${this.hideTooltip}
                    @focus=${this.showTooltip}
                    @blur=${this.hideTooltip}
                    ${(0, lit_directives_ref_js.ref)((el) => {
			this.tooltipElement = el;
		})}
                >
                    ${this.tooltip}
                    <div class="thermal-tooltip-arrow" ${(0, lit_directives_ref_js.ref)((el) => {
			this.arrowElement = el;
		})}></div>
                </div>
            `;
		return lit.html`
            ${(0, lit_directives_unsafe_svg_js.unsafeSVG)(icon)}${this.pre ? lit.html`<span class="prefix">${this.pre}</span>` : lit.nothing}<slot></slot>
            ${tooltipHtml}
            ${this.renderBadge()}
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "tooltip-placement"
}), __decorateMetadata("design:type", Object)], ThermalBtnElement.prototype, "tooltipPlacement", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalBtnElement.prototype, "pre", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: true,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalBtnElement.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: true,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalBtnElement.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalBtnElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalBtnElement.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalBtnElement.prototype, "disabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "non-interactive"
}), __decorateMetadata("design:type", Boolean)], ThermalBtnElement.prototype, "nonInteractive", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: true,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalBtnElement.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalBtnElement.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], ThermalBtnElement.prototype, "tabindex", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "badge",
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalBtnElement.prototype, "badge", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalBtnElement.prototype, "align", void 0);
//#endregion
//#region src/ui/Dialog.ts
var ThermalDialogElement = class extends lit.LitElement {
	constructor(..._args) {
		super(..._args);
		this.button = t$1("close");
		this.dialogRef = (0, lit_directives_ref_js.createRef)();
		this.closeButtonRef = (0, lit_directives_ref_js.createRef)();
		this.invokerRef = (0, lit_directives_ref_js.createRef)();
		this.isFullscreen = false;
		this._open = false;
	}
	static {
		this.shadowRootOptions = {
			...lit.LitElement.shadowRootOptions,
			mode: "open"
		};
	}
	get open() {
		return this._open;
	}
	setClose() {
		this.dialogRef.value?.close();
		window.document.body.style.removeProperty("overflow-y");
		window.document.body.style.removeProperty("height");
		this.removeAttribute("open");
		this._open = false;
		if (this.onCloseEveryTime) this.onCloseEveryTime();
	}
	setOpen() {
		this.dialogRef.value?.showModal();
		window.document.body.style.overflowY = "hidden";
		window.document.body.style.height = "100vh";
		this.setAttribute("open", "true");
		this._open = true;
	}
	attributeChangedCallback(name, _old, value) {
		super.attributeChangedCallback(name, _old, value);
		if (name === "open") {
			if (value === "true") this.setOpen();
			else this.setClose();
		}
	}
	connectedCallback() {
		super.connectedCallback();
	}
	static {
		this.styles = lit.css`

        :host {

            display: contents;

        }

        .dialog {
            background: var( --thermal-slate-light );
            color: var( --thermal-foreground );
            border-style: var( --thermal-border-style );
            border-radius: var( --thermal-radius );
            border-color: var( --thermal-slate );
            border-width: var(--thermal-border-width);
            padding: calc( var( --thermal-gap ) * 1.5 );
            font-size: var( --thermal-fs-small );

            &::backdrop {
                backdrop-filter: blur(3px);
            }

            min-width: 150px;
            box-sizing: border-box;

            @media ( min-width: 300px ) {
                min-width: 250px;
            }

            @media ( min-width: 600px ) {
                min-width: 450px;
            }
        }

        .dialog-header {
            display: flex;
            flex-wrap: nowrap;
            justify-content: space-between; 
        }

        .dialog-title {
            margin: 0;
            padding: 0;
        }

        .dialog-content {
            padding: var( --thermal-gap ) 0;
            white-space: normal;
        }

        .dialog-footer {

            width: 100%;
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 10px;

        }

        

        .dialog-close {

            margin: 0;
            padding: 0;
            border: 0;
            background: transparent;
            color: var( --thermal-foreground );
            cursor: pointer;

            width: calc( var( --thermal-gap ) * 1.5);

            &:hover {
                color: var( --thermal-primary );
            }
        
        }

        :host([is-fullscreen="true"][open]) .dialog {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
            display: grid;
            grid-template-rows: auto 1fr auto;

            .dialog-content {
                overflow: auto;
            }
        }

        
    
    `;
	}
	render() {
		return lit.html`
            <slot name="invoker" ${(0, lit_directives_ref_js.ref)(this.invokerRef)} @click=${this.setOpen}></slot>
            <dialog ${(0, lit_directives_ref_js.ref)(this.dialogRef)} class="dialog">

                <header class="dialog-header">

                    <h2 class="dialog-title">${this.label}</h2>

                    <button class="dialog-close" ${(0, lit_directives_ref_js.ref)(this.closeButtonRef)} @click=${this.setClose}>

                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>

                    </button>
                
                
                </header>
                	
                <div class="dialog-content">
                    ${this._open ? lit.html`<slot name="content"></slot>` : lit.nothing}
                </div>

                <div class="dialog-footer">
                    <slot name="button"></slot>
                    <thermal-btn variant="foreground" @click=${async () => {
			if (this.beforeClose) {
				if (await this.beforeClose()) this.setClose();
			} else this.setClose();
		}}>
                        ${this.button}
                    </thermal-btn>
                </div>
                
            
            </dialog>
        `;
	}
	async closeFromTheOutside() {
		if (this.beforeClose) {
			if (await this.beforeClose()) this.setClose();
		} else this.setClose();
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: false
}), __decorateMetadata("design:type", String)], ThermalDialogElement.prototype, "button", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "is-fullscreen"
}), __decorateMetadata("design:type", Boolean)], ThermalDialogElement.prototype, "isFullscreen", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalDialogElement.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], ThermalDialogElement.prototype, "beforeClose", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalDialogElement.prototype, "_open", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], ThermalDialogElement.prototype, "onCloseEveryTime", void 0);
//#endregion
//#region src/ui/Dropdown.ts
var ThermalDropdownElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.dropdownRef = (0, lit_directives_ref_js.createRef)();
		this.invokerRef = (0, lit_directives_ref_js.createRef)();
		this.optionsRef = (0, lit_directives_ref_js.createRef)();
		this.isOpen = "close";
		this.interactive = "on";
	}
	static {
		this.shadowRootOptions = { ...lit.LitElement.shadowRootOptions };
	}
	setOpen() {
		this.isOpen = "open";
	}
	setClose() {
		this.isOpen = "close";
	}
	toggle() {
		if (this.interactive === "off") return;
		if (this.isOpen === "open") this.isOpen = "close";
		else this.isOpen = "open";
	}
	connectedCallback() {
		super.connectedCallback();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
	}
	placeOptions() {
		if (!this.invokerRef.value || !this.optionsRef.value) return;
		(0, _floating_ui_dom.computePosition)(this.invokerRef.value, this.optionsRef.value, {
			middleware: [
				(0, _floating_ui_dom.offset)(2),
				(0, _floating_ui_dom.flip)(),
				(0, _floating_ui_dom.inline)(),
				(0, _floating_ui_dom.shift)()
			],
			placement: "bottom-start",
			strategy: "fixed"
		}).then(({ x, y }) => {
			if (this.optionsRef.value) {
				this.optionsRef.value.style.left = `${x}px`;
				this.optionsRef.value.style.top = `${y}px`;
			}
		});
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("isOpen")) this.placeOptions();
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		this._options.forEach((option) => {
			option.childNodes.forEach((child) => child.addEventListener("click", () => {
				this.setClose();
			}));
		});
	}
	attributeChangedCallback(name, _old, value) {
		super.attributeChangedCallback(name, _old, value);
		if (name === "isopen") {
			if (value === "open") {
				this.optionsRef.value?.classList.add("dropdown-options__show");
				this.dropdownRef.value?.classList.add("dropdown__open");
			} else {
				this.optionsRef.value?.classList.remove("dropdown-options__show");
				this.dropdownRef.value?.classList.remove("dropdown__open");
			}
		}
	}
	static {
		this.styles = lit.css`

        .mayNot {
            opacity: .5;
            cursor: not-allowed;
        }

        .dropdown {
            width: max-content;
        }

        .dropdown-invoker {
            width: max-content;
            display: flex;
        }

        .dropdown-invoker-wrapper {
            display: flex;
            align-items: center;
        }

        .dropdown-invoker-wrapper-icon {
            width: calc( var( --thermal-gap ) * .856 );
            line-height: 0;
            padding-left: calc( var( --thermal-gap ) * .5 );
        }

        .dropdown-options {

            z-index: 9999;

            width: max-content;
            /** position: absolute; */
            position: fixed;
            top: 0;
            left: 0;
            
            padding: 5px 10px;

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );

            background-color: var( --thermal-slate-light );

            box-shadow: var( --thermal-shadow );

            display: none;

            ::slotted( div:not(:last-child) ) {
                margin-bottom: calc( var( --thermal-gap ) * .5 );
            }

        }

        .dropdown-options__show {
            display: block;
        }

        .clicker {
            display: none;
        }

        .dropdown__open {
        
            .clicker {
                z-index: 9998;
                display: block;
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
            }
        }

        slot[name="option"]::slotted(*) {

            width: 100%;

            margin-top: 5px;
            margin-bottom: 5px;
            width: 100%;

        }


    
    `;
	}
	render() {
		const invokerClasses = {
			"dropdown-invoker": true,
			may: this.interactive === "on",
			mayNot: this.interactive === "off"
		};
		const disabled = this.interactive === "off";
		return lit.html`

            <div class="dropdown" ${(0, lit_directives_ref_js.ref)(this.dropdownRef)}>
                <thermal-btn 
                    ${(0, lit_directives_ref_js.ref)(this.invokerRef)} 
                    class="${(0, lit_directives_class_map_js.classMap)(invokerClasses)}" 
                    @click=${this.toggle.bind(this)} 
                    variant=${(0, lit_directives_if_defined_js.ifDefined)(this.variant)}
                    size=${(0, lit_directives_if_defined_js.ifDefined)(this.size)}
                    icon="${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}"
                    iconStyle="${(0, lit_directives_if_defined_js.ifDefined)(this.iconStyle)}"
                    ?plain=${this.plain}
                    ?disabled=${disabled}
                    tooltip="${this.tooltip !== void 0 ? this.tooltip : ""}"
                    part="invoker"
                >
                    <div class="dropdown-invoker-wrapper">
                        <slot name="invoker">
                            <div>Dropdown</div>
                        </slot>
                        <div class="dropdown-invoker-wrapper-icon">
                        ${this.isOpen === "close" ? lit.html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>` : lit.html`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                            </svg>`}
                        </div>
                    </div>
                </thermal-btn>
                <div class="clicker" @click=${this.setClose}></div>
                <div class="dropdown-options" ${(0, lit_directives_ref_js.ref)(this.optionsRef)} >
                    <slot name="option"></slot>
                </div>
            
            </div>
        `;
	}
};
__decorate([(0, lit_decorators_js.queryAssignedElements)({ slot: "option" }), __decorateMetadata("design:type", typeof Array === "undefined" ? Object : Array)], ThermalDropdownElement.prototype, "_options", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalDropdownElement.prototype, "isOpen", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true
}), __decorateMetadata("design:type", String)], ThermalDropdownElement.prototype, "interactive", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalDropdownElement.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true
}), __decorateMetadata("design:type", Object)], ThermalDropdownElement.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Boolean }), __decorateMetadata("design:type", Boolean)], ThermalDropdownElement.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: true
}), __decorateMetadata("design:type", String)], ThermalDropdownElement.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalDropdownElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalDropdownElement.prototype, "iconStyle", void 0);
//#endregion
//#region src/ui/Dropin.ts
var ThermalDropinElement = class extends AbstractThermalElement {
	static {
		this.styles = lit.css`
    
        :host {
            display: block;
            box-sizing: border-box;

            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);

            

            border: var(--thermal-border-width) var(--thermal-slate)var(--thermal-border-style);
            border-radius: var(--thermal-radius);

            transition: all .5s ease-in-out;

            position: relative;
            overflow: hidden;

            cursor: pointer;
            
        }

        .bg {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            transition: all .3s ease-in-out;

            background: radial-gradient(circle, var(--thermal-slate-light) 0%, var(--thermal-slate) 100%);
        }

        .content {
            position: relative;
            z-index: 1;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;

            padding: var(--thermal-gap);
            box-sizing: border-box;
        }

        :host {
        
            &:hover,
            &:focus {
            
                .bg {
                    transform: scale(1.05);
                }
            
            }
        
        }

        :host(:hover),
        :host(:focus) {
        
            .bg {
                transform: scale(1.05);
            }

        
        }
    
    `;
	}
	render() {
		return lit.html`
            <div class="bg"></div>
            <div class="content">
                <div>Thermal Dropin Component</div>
            </div>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalDropinElement.prototype, "prompt", void 0);
//#endregion
//#region src/ui/Expandable.ts
var ThermalExpandableElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.closeIcon = false;
		this.iconStyle = "outline";
		this.disabled = false;
		this.nonInteractive = false;
		this.plain = false;
		this.expanded = false;
	}
	static {
		this.styles = lit.css`
:host {
    --color: var(--thermal-foreground);
    --background: var(--thermal-slate-light);
    --font-size: var(--thermal-fs);
    --border-color: var(--thermal-slate);
    --border-radius: var(--thermal-radius);
    --display: block;
    --position: relative;
    --width: 100%;
    --padding: var(--thermal-gap);
    --spacing: var(--thermal-gap);
    --box-shadow: none;

    font-size: var(--font-size);
    color: var(--color);
}

aside.content {

    display: none;
    position: var(--position);

    box-sizing: border-box;
    width: var(--width);
    box-sizing: border-box;

    background: var(--background);
    border: var(--thermal-border-width) var(--thermal-border-style) var(--border-color);
    border-radius: var(--border-radius);
    padding: var(--padding);
    box-shadow: var(--box-shadow);

}

:host([expanded="true"]) aside.content {
    display: var(--display);
    margin-top: var(--spacing);
}

thermal-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
}
`;
	}
	render() {
		const variant = this.expanded && this.variantExpanded ? this.variantExpanded : this.variant;
		return lit.html`<thermal-btn
    variant=${(0, lit_directives_if_defined_js.ifDefined)(variant)}
    size=${(0, lit_directives_if_defined_js.ifDefined)(this.size)}
    icon=${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}
    iconStyle=${this.iconStyle}
    ?disabled=${this.disabled}
    ?plain=${this.plain}
    tooltip=${(0, lit_directives_if_defined_js.ifDefined)(this.tooltip)}
    ?non-interactive=${this.nonInteractive}
    @click=${() => this.expanded = !this.expanded}
>${(0, lit_directives_if_defined_js.ifDefined)(this.label)}${this.closeIcon && this.expanded ? lit.html`<thermal-icon
    icon="close"
    variant="micro"
></thermal-icon>` : lit.nothing}</thermal-btn>
<aside class="content">
    <slot></slot>
</aside>
`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalExpandableElement.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "close-icon",
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalExpandableElement.prototype, "closeIcon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: true,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalExpandableElement.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: true,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalExpandableElement.prototype, "variantExpanded", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: true,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalExpandableElement.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalExpandableElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalExpandableElement.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalExpandableElement.prototype, "disabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "non-interactive"
}), __decorateMetadata("design:type", Boolean)], ThermalExpandableElement.prototype, "nonInteractive", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: true
}), __decorateMetadata("design:type", Boolean)], ThermalExpandableElement.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalExpandableElement.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalExpandableElement.prototype, "expanded", void 0);
//#endregion
//#region src/ui/Field.ts
var ThermalFieldElement = class extends lit.LitElement {
	static {
		this.styles = lit.css`
    
        :host {

            display: table-row;
            width: 100%;
            font-size: var( --thermal-fs );

        }

        .cell {

            display: table-cell;
            padding: calc( var( --thermal-gap ) * .5 );
        
        }

        .label {

        }

        .content {

        }

        .hint {
            font-size: calc( var( --thermal-fs-sm ) * .75 );
            padding-top: .5em;
            opacity: .5;
            max-width: 300px;
        }

    `;
	}
	render() {
		return lit.html`

            <div class="cell">${this.label}</div>

            <div class="cell">

                <div class="content">
                    <slot></slot>
                </div>

                ${this.hint && lit.html`
                <div class="hint">
                    ${this.hint}
                </div>`}

            </div>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalFieldElement.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalFieldElement.prototype, "hint", void 0);
//#endregion
//#region src/ui/Icon.ts
var ThermalIconElement = class extends AbstractThermalElement {
	connectedCallback() {
		super.connectedCallback();
		this.updateIcon();
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		this.updateIcon();
	}
	updateIcon() {
		if (this.icon === void 0 || this.icon.trim() === "" || this.variant === void 0 || this.variant.trim() === "") {
			this.element = void 0;
			return;
		} else {
			const icon = this.icon && this.icon.trim() !== "" ? this.icon : false;
			const factory = icons[icon];
			if (factory) {
				if (this.variant in factory) {
					const fn = factory[this.variant];
					this.element = fn(this.classes, this.css);
				}
			}
		}
	}
	render() {
		if (!this.element) return lit.nothing;
		else return lit.html`${(0, lit_directives_unsafe_svg_js.unsafeSVG)(this.element)}`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalIconElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalIconElement.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalIconElement.prototype, "classes", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalIconElement.prototype, "css", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], ThermalIconElement.prototype, "element", void 0);
//#endregion
//#region src/ui/Loading.ts
var ThermalPosterElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.loaded = false;
		this.loading = true;
		this.bordercolor = "var(--thermal-slate)";
		this.bgcolor = "var(--thermal-slate-light)";
		this.textcolor = "var(--thermal-slate-dark)";
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		this.style.borderColor = this.bordercolor;
		this.style.backgroundColor = this.bgcolor;
		this.style.color = this.textcolor;
	}
	static {
		this.styles = lit.css`
    
        :host {
            font-size: var(--thermal-fs);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: .5em;
            width: 100%;
            min-height: 300px;

            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            
            box-sizing: border-box;
            padding: var(--thermal-gap);
            color: var(--thermal-slate-dark);
            background: var(--thermal-slate-light);
            
        }
    
    `;
	}
	render() {
		const content = [];
		if (this.loading) content.push(lit.html`<thermal-spinner style="display: block"></thermal-spinner>`);
		else {
			content.push(lit.html`<thermal-icon icon="${this.icon}" variant="${this.iconStyle}" style="height: 2em; aspect-ratio: 1 / 1; display: block;"></thermal-icon>`);
			if (this.message) content.push(lit.html`<div>${this.message}</div>`);
		}
		content.push(lit.html`<slot></slot>`);
		return content;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], ThermalPosterElement.prototype, "loaded", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalPosterElement.prototype, "loading", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalPosterElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalPosterElement.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalPosterElement.prototype, "message", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalPosterElement.prototype, "bordercolor", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalPosterElement.prototype, "bgcolor", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalPosterElement.prototype, "textcolor", void 0);
//#endregion
//#region src/ui/Radio.ts
var ThermalRadioElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.type = "radio";
		this.checked = false;
	}
	handleChange(event) {
		const input = event.target;
		this.checked = input.checked;
		if (this.onChange) this.onChange(this.checked);
		this.requestUpdate();
	}
	updated(changedProperties) {
		if (changedProperties.has("checked")) {
			const input = this.shadowRoot?.querySelector("input");
			if (input) input.checked = this.checked;
		}
	}
	handleClick(event) {
		event.preventDefault();
		this.checked = !this.checked;
		if (this.onChange) this.onChange(this.checked);
		this.requestUpdate();
	}
	connectedCallback() {
		super.connectedCallback();
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: contents;
            font-size: var(--thermal-fs);
            color: var(--thermal-foreground);
        }

        .radio {

            display: flex;
            align-items: center;
            gap: .25em;

            cursor: pointer;

            input,
            span {
                display: block;
            }

            span {
                font-size: .8em;
            }

            input[type="radio"] {
                transform: translateY(-.15em);
                pointer-events: none;
            }
        }

        input {    
            pointer-events: none;
        }
    
    `;
	}
	render() {
		return lit.html`
            <label class="radio" @click=${this.handleClick}>
                <input
                    type="${this.type}"
                    checked="${this.checked}"
                />
                <span><slot></slot></span>
            </label>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], ThermalRadioElement.prototype, "type", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], ThermalRadioElement.prototype, "checked", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], ThermalRadioElement.prototype, "onChange", void 0);
//#endregion
//#region src/ui/Slot.ts
var ThermalSlotElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this._slottedElements = [];
	}
	get slottedElements() {
		return Array.from(this.children);
	}
	handleSlotChange(e) {
		const slot = e.target;
		this._slottedElements = slot.assignedElements();
		this.requestUpdate();
	}
	static {
		this.styles = lit.css`

        :host {
            font-size: var( --thermal-fs );
        }
    
        h3 {

            margin: 0 0 .5em 0;
            padding: 0;
            
            font-weight: normal;
            font-size: .7em;
            text-transform: uppercase;

            color: var(--thermal-slate);
            
            display: flex;
            align-items: center;
            gap: .5em;

            &::after {
                content: "";
                flex: 1;
                height: var(--thermal-border-width);
                background: var(--thermal-slate-light);
            }

        }

        .content {
            display: flex;
            flex-wrap: wrap;
            gap: .5em;
        }

        :host(:hover) {
            h3 {
                color: var(--thermal-foreground);
                &::after {
                    background: var(--thermal-slate);
                }
            }


        }
    
    `;
	}
	render() {
		if (this.slottedElements.length === 0) return lit.nothing;
		return lit.html`<section>

            ${this.label ? lit.html`<h3>${this.label}</h3>` : lit.nothing}
            <div class="content">
                <slot @slotchange=${this.handleSlotChange}></slot>
            </div>
        </section>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)(), __decorateMetadata("design:type", String)], ThermalSlotElement.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], ThermalSlotElement.prototype, "_slottedElements", void 0);
//#endregion
//#region src/ui/Spinner.ts
var ThermalSpinnerElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.color = "var(--thermal-primary)";
	}
	static {
		this.shadowRootOptions = {
			...lit.LitElement.shadowRootOptions,
			mode: "open"
		};
	}
	static {
		this.styles = lit.css`
        :host {
            display: block;
            width: 100%;
            height: 100%;
            position: relative;
            text-align: center;
        }
        .spinner {
            display: inline-block;
            width: 50px;
            height: 50px;
            border: 5px solid var(--thermal-primary);
            border-top-color: transparent;
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% {
                transform: rotate(0deg);
            }
            100% {
                transform: rotate(360deg);
            }
        }
        .message {
            margin-top: var(--thermal-gap);
            color: var(--thermal-slate-dark);
        }
    `;
	}
	render() {
		return lit.html`
            <div class="spinner" style="border-color: ${this.color}; border-top-color: transparent;"></div>
            ${this.message ? lit.html`<div class="message">${this.message}</div>` : lit.nothing}
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalSpinnerElement.prototype, "message", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalSpinnerElement.prototype, "color", void 0);
//#endregion
//#region src/ui/Tip.ts
var ThermalTipElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.icon = "bulb";
		this.iconStyle = "outline";
	}
	static {
		this.styles = lit.css`
:host {

    --color: var(--thermal-foreground);
    --background: var(--thermal-slate-light);
    --font-size: var(--thermal-fs);
    --border-color: var(--thermal-slate);
    --icon-size: 1.5em;
    --radius: var(--thermal-radius);
    --padding: .5em;
    --spacing: var(--thermal-gap);
    --align-items: flex-start;

    font-size: var(--font-size);
    color: var(--color);
    background: var(--background);
    
    border: var(--thermal-border-width) var(--thermal-border-style) var(--border-color);
    border-radius: var(--radius);

    width: 100%;
    box-sizing: border-box;
    padding: var(--padding);

    display: flex;
    align-items: var(--align-items);
    gap: var(--spacing);

}

thermal-icon {
    display: block;
    width: var(--icon-size);
    height: var(--icon-size);
    color: var(--border-color);
}

:host( [variant="info"] ) {
    --background: #bed5fdff;
    --color: #0e46a1;
    --border-color: var(--color);
}

:host([variant="error"]) {
    --background: #e2b1b1ff;
    --color: #a10e0e;
    --border-color: var(--color);
}
`;
	}
	render() {
		return lit.html`<thermal-icon 
    icon=${this.icon} 
    variant=${this.iconStyle}
></thermal-icon>
<div class="tip-content">
    <slot></slot>
</div>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalTipElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], ThermalTipElement.prototype, "iconStyle", void 0);
//#endregion
//#region src/hierarchy/consumers/AbstractManagerConsumer.ts
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
var AbstractManagerConsumer = class extends AbstractThermalElement {
	/** Alias to the `ThermalManager` from the `ManagerController` */
	get managerObject() {
		return this.managerController.managerObject;
	}
};
__decorate([(0, _lit_context.consume)({
	context: managerControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractManagerConsumer.prototype, "managerController", void 0);
//#endregion
//#region src/hierarchy/consumers/AbstractRegistryConsumer.ts
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
var AbstractRegistryConsumer = class extends AbstractManagerConsumer {
	/** Alias to the `ThermalRegistry` from the `RegistryController` */
	get registryObject() {
		return this.registryController.registryObject;
	}
};
__decorate([(0, _lit_context.consume)({
	context: registryControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractRegistryConsumer.prototype, "registryController", void 0);
//#endregion
//#region src/hierarchy/consumers/AbstractGroupConsumer.ts
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
var AbstractGroupConsumer = class extends AbstractRegistryConsumer {
	/** Alias to the `ThermalGroup` object from the `groupController` */
	get groupObject() {
		return this.groupController.groupObject;
	}
};
__decorate([(0, _lit_context.consume)({
	context: groupControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractGroupConsumer.prototype, "groupController", void 0);
//#endregion
//#region src/hierarchy/abstraction/AbstractFileProvider.ts
var AbstractFileProvider = class extends AbstractGroupConsumer {
	constructor(..._args) {
		super(..._args);
		this.fileController = new FileController(this);
		this.loading = false;
		this.ready = false;
		this.ms = 0;
		this.playbackSpeed = 1;
		this.recording = false;
		this.playing = false;
		this.analyses = [];
		this.autoHighlight = false;
	}
	static {
		this.properties = { ...FileController.HOST_PROPERTIES };
	}
	/** Register instance callback listeners. @deprecated */
	recieveInstance(instance) {
		this.fileController.receiveInstance(instance);
	}
	/** @deprecated */
	removeInstance() {
		this.fileController.removeInstance();
	}
	deleteFile() {
		if (this.file) this.removeInstance();
	}
	render() {
		return lit.html`
            <slot></slot>
            <slot name="mark"></slot>
            <slot name="analysis"></slot>
        `;
	}
};
//#endregion
//#region src/hierarchy/abstraction/AbstractGroupProvider.ts
var AbstractGroupProvider = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.groupController = new GroupController(this);
		this.autoclearGroup = true;
	}
	static {
		this.properties = { ...GroupController.HOST_PROPERTIES };
	}
	render() {
		return lit.html`<slot></slot>`;
	}
};
//#endregion
//#region src/hierarchy/abstraction/AbstractManagerProvider.ts
var AbstractManagerProvider = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.managerController = new ManagerController(this);
		this.palette = "jet";
		this.advancedPalettes = false;
		this.smoothThermograms = false;
		this.smoothGraph = false;
		this.autoclear = false;
	}
	static {
		this.properties = { ...ManagerController.HOST_PROPERTIES };
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.autoclear === true && this.managerObject !== void 0) removeManager(this.managerObject);
	}
	render() {
		return lit.html`<slot></slot>`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], AbstractManagerProvider.prototype, "palette", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractManagerProvider.prototype, "advancedPalettes", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractManagerProvider.prototype, "smoothThermograms", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractManagerProvider.prototype, "smoothGraph", void 0);
//#endregion
//#region src/hierarchy/abstraction/AbstractRegistryProvider.ts
var AbstractRegistryProvider = class extends AbstractManagerConsumer {
	constructor(..._args) {
		super(..._args);
		this.registryController = new RegistryController(this);
		this.opacity = 1;
		this.loading = false;
		this.autoclear = false;
	}
	static {
		this.properties = { ...RegistryController.HOST_PROPERTIES };
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.autoclear === true && this.registryObject !== void 0) this.managerObject.removeRegistry(this.registryObject.id);
	}
	render() {
		return lit.html`<slot></slot>`;
	}
};
//#endregion
//#region src/hierarchy/consumers/AbstractFileConsumer.ts
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
var AbstractFileConsumer = class extends AbstractGroupConsumer {
	constructor(..._args) {
		super(..._args);
		this.fileIsLoading = false;
		this.fileIsRecording = false;
	}
	/**
	* Returns a stable callback key unique to this consumer.
	*
	* @returns The consumer's UUID with an internal-callback suffix.
	*/
	getUUID() {
		return `${this.UUID}__internal_callback`;
	}
	connectedCallback() {
		super.connectedCallback();
		this.hookCallbacks();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		if (this.fileController) {
			this.fileController.onSuccess.delete(this.UUID);
			this.fileController.onFailure.delete(this.UUID);
		}
	}
	/** Internal method binding the default callbacks to the parent `FileController`. */
	hookCallbacks() {
		if (this.fileController) {
			this.fileController.onSuccess.set(this.UUID, (instance) => {
				this.onInstanceCreated(instance);
			});
			this.fileController.onFailure.set(this.UUID, (error) => {
				this.onFailure(error);
			});
		} else throw new Error("Tento komponent není v souboru!");
	}
};
__decorate([(0, _lit_context.consume)({
	context: fileControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], AbstractFileConsumer.prototype, "fileController", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileLoadingContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], AbstractFileConsumer.prototype, "fileIsLoading", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], AbstractFileConsumer.prototype, "file", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileFailureContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], AbstractFileConsumer.prototype, "failure", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileRecordingContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], AbstractFileConsumer.prototype, "fileIsRecording", void 0);
//#endregion
//#region src/controls/independent/AppInfoButton.ts
var AppInfoButton = class extends AbstractThermalElement {
	static {
		this.styles = lit.css`

        .content {
            color: var( --thermal-foreground );
        }

        hr {
            border-top-color: currentcolor;
            border-bottom-width: 0;
        }

        small {
            opacity: .5;
        }

        a {
            color: var( --thermal-primary );
        }

        .logo {
            max-width: 200px;
            margin: 0 auto;
            padding: var( --thermal-gap ) 0;
            svg {
                width: 100%;
                height: auto;
            }
        }

        .row {

            &:not(:last-child) {
                padding-bottom: var( --thermal-gap );
                padding-top: var( --thermal-gap );
            }
        
        }

        @media ( min-width: 700px ) {
            .row {

                display: flex;
                flex-wrap: wrap;

                margin: 0 calc( var( --thermal-gap ) * -1 );

                & > div {

                    box-sizing: border-box;
                    width: 50%;
                    padding: 0 var( --thermal-gap );

                }
            
            }
        
        }
    
    `;
	}
	render() {
		return lit.html`
            <thermal-dialog label="Thermal images in the browser">
                <thermal-btn slot="invoker">About</thermal-btn>
                <div slot="content">
                    <div class="content">
                        <div class="logo">
                            <svg xmlns="http://www.w3.org/2000/svg" width="531.66" height="166.67" viewBox="0 0 531.66 166.67">
                                <g id="Vrstva_2" data-name="Vrstva 2">
                                    <g id="Podkres">
                                        <path
                                            d="M286.47,78.12c-1.77-1.54-4.43-2.32-8-2.32H261.56V95.59H278.5c3.54,0,6.2-.78,8-2.36s2.66-4.14,2.66-7.68S288.25,79.66,286.47,78.12Z" 
                                            fill="currentcolor"
                                            />
                                        <path
                                            d="M262,0,186,29.54h-.21V166.67h152V29.54H338ZM232.52,134.09H217.06V63.79h15.46Zm58.68,0a27.45,27.45,0,0,1-1.58-8c-.19-3.08-.49-6-.88-8.86-.53-3.67-1.64-6.36-3.35-8.07s-4.5-2.56-8.37-2.56H261.56v27.47H246.11V63.79H284a22.61,22.61,0,0,1,8.52,1.53A19.8,19.8,0,0,1,299,69.5a18.2,18.2,0,0,1,4.13,6.16,19.75,19.75,0,0,1,1.43,7.53A21.14,21.14,0,0,1,302,93.92a16.37,16.37,0,0,1-8.52,6.89v.2a11.89,11.89,0,0,1,4.73,2.41,13.28,13.28,0,0,1,3.05,3.84,17.8,17.8,0,0,1,1.72,4.87,42.51,42.51,0,0,1,.74,5.32c.07,1.12.13,2.43.2,3.94s.18,3,.35,4.63a30.6,30.6,0,0,0,.78,4.47,10.2,10.2,0,0,0,1.63,3.6Z"
                                            fill="currentcolor"
                                         />
                                        <path d="M414,63.79v13H376.89V91.85H411v12H376.89v17.23H414.8v13H361.43V63.79Z" fill="currentcolor" />
                                        <path
                                            d="M459.89,127.59a14.43,14.43,0,0,1-6.45,6,23.53,23.53,0,0,1-19.05-.4,20,20,0,0,1-7.14-6,27.21,27.21,0,0,1-4.23-8.72,36.59,36.59,0,0,1-1.43-10.23A34.4,34.4,0,0,1,423,98.3a25.75,25.75,0,0,1,4.23-8.42,20.53,20.53,0,0,1,16.89-8.07,20,20,0,0,1,8.61,1.92,15,15,0,0,1,6.45,5.66h.2V63.79h14v70.3H460.09v-6.5Zm-.59-25.15a14.68,14.68,0,0,0-2-5.12,11.34,11.34,0,0,0-3.69-3.6,10.83,10.83,0,0,0-5.71-1.38,11.33,11.33,0,0,0-5.81,1.38,10.93,10.93,0,0,0-3.79,3.64,16.39,16.39,0,0,0-2.07,5.17,27.93,27.93,0,0,0-.64,6.06,25.91,25.91,0,0,0,.69,5.91,16,16,0,0,0,2.22,5.26,12,12,0,0,0,3.84,3.74,10.29,10.29,0,0,0,5.56,1.43,11.12,11.12,0,0,0,5.76-1.38,10.36,10.36,0,0,0,3.69-3.69,16.42,16.42,0,0,0,2-5.27,31.24,31.24,0,0,0,.59-6.1A30.51,30.51,0,0,0,459.3,102.44Z" fill="currentcolor" />
                                        <path
                                            d="M518.37,134.09V127h-.29a15.75,15.75,0,0,1-6.9,6.4,20.37,20.37,0,0,1-8.66,2,24.39,24.39,0,0,1-9.21-1.48,13.32,13.32,0,0,1-5.66-4.18,16.59,16.59,0,0,1-2.9-6.6,40.82,40.82,0,0,1-.84-8.61V83.19h14v28.75q0,6.3,2,9.4t7,3.1q5.72,0,8.27-3.4t2.56-11.17V83.19h14v50.9Z" fill="currentcolor"/>
                                        <path d="M15.46,63.79v57.3H49.72v13H0V63.79Z" fill="currentcolor"/>
                                        <path
                                            d="M56.32,98.84a16.13,16.13,0,0,1,2.46-8.17,16.77,16.77,0,0,1,5.51-5.22,23.86,23.86,0,0,1,7.53-2.8,42.71,42.71,0,0,1,8.42-.84,57.28,57.28,0,0,1,7.78.54,23.87,23.87,0,0,1,7.19,2.12,14.2,14.2,0,0,1,5.31,4.38,12.23,12.23,0,0,1,2.07,7.43v26.49a53.68,53.68,0,0,0,.39,6.59,12.18,12.18,0,0,0,1.38,4.73H90.18a21.91,21.91,0,0,1-.64-2.41,20.76,20.76,0,0,1-.34-2.51A18.29,18.29,0,0,1,81.32,134a31.55,31.55,0,0,1-9.25,1.38,25,25,0,0,1-6.79-.89,15.64,15.64,0,0,1-5.52-2.75A13,13,0,0,1,56.07,127a15.91,15.91,0,0,1-1.33-6.79,14.81,14.81,0,0,1,1.53-7.14,12.72,12.72,0,0,1,3.94-4.48,17.47,17.47,0,0,1,5.51-2.51A58.91,58.91,0,0,1,72,104.75q3.15-.5,6.2-.79a36.91,36.91,0,0,0,5.42-.89,9.35,9.35,0,0,0,3.74-1.72,3.79,3.79,0,0,0,1.28-3.3,7.44,7.44,0,0,0-.74-3.59,5.45,5.45,0,0,0-2-2.07,7.7,7.7,0,0,0-2.85-1,22.69,22.69,0,0,0-3.5-.25,10.63,10.63,0,0,0-6.5,1.77c-1.57,1.19-2.49,3.15-2.75,5.91Zm32.29,10.34a6.25,6.25,0,0,1-2.22,1.23,22.33,22.33,0,0,1-2.85.74c-1,.2-2.09.36-3.2.49s-2.23.3-3.35.49a25.6,25.6,0,0,0-3.1.79,9.21,9.21,0,0,0-2.66,1.33,6.34,6.34,0,0,0-1.82,2.12,6.78,6.78,0,0,0-.69,3.25,6.61,6.61,0,0,0,.69,3.15,5.25,5.25,0,0,0,1.87,2,7.85,7.85,0,0,0,2.76,1,17.31,17.31,0,0,0,3.25.29,12.37,12.37,0,0,0,6.4-1.37,9.19,9.19,0,0,0,3.34-3.3,10.36,10.36,0,0,0,1.33-3.89,25.55,25.55,0,0,0,.25-3.15Z" fill="currentcolor"/>
                                        <path
                                            d="M127.4,63.79v25.6h.2a15,15,0,0,1,6.94-5.76,23.54,23.54,0,0,1,9.1-1.82A19.34,19.34,0,0,1,158,88.21a24.53,24.53,0,0,1,4.87,8.32,34.8,34.8,0,0,1,1.87,12.06,34.8,34.8,0,0,1-1.87,12.06A24.62,24.62,0,0,1,158,129a19.44,19.44,0,0,1-14.33,6.4,26.9,26.9,0,0,1-10-1.77,12.8,12.8,0,0,1-6.69-6h-.2v6.5H113.42V63.79ZM150,102.48a16.35,16.35,0,0,0-2.16-5.21,11.52,11.52,0,0,0-3.69-3.6,11.41,11.41,0,0,0-10.69,0,11.28,11.28,0,0,0-3.74,3.6,16.13,16.13,0,0,0-2.16,5.21,27.23,27.23,0,0,0-.69,6.21,26.72,26.72,0,0,0,.69,6.1,16.09,16.09,0,0,0,2.16,5.22,11.15,11.15,0,0,0,3.74,3.59,11.41,11.41,0,0,0,10.69,0,11.38,11.38,0,0,0,3.69-3.59,16.32,16.32,0,0,0,2.16-5.22,26.72,26.72,0,0,0,.69-6.1A27.23,27.23,0,0,0,150,102.48Z" fill="currentcolor" />
                                    </g>
                                </g>
                            </svg>
                    </div>
                    
                    <div style="text-align: center">
                        <p>A webapp reading thermal images from infrared cameras TIMI Edu.</p>
                        <p>version ${version$1}</p>
                    </div>


                    <hr />

                    <div class="row">

                        <div>
                            <h3>Source code</h3>
                            <p>
                                <a href="https://github.com/moichim/labir" target="_blank">github.com/moichim/labir</a>
                            </p>
                        </div>


                        <div>
                            <h3>Authors</h3>
                            <p>The code is being developed by the <a href="https://irt.zcu.cz/" target="_blank">Infrared technologies</a> research team at <a href="https://ntc.zcu.cz" target="_blank">NTC UWB</a> in Pilsen.</p>
                        </div>

                    </div>
                </div>
                </div>
            </thermal-dialog>

        `;
	}
};
//#endregion
//#region src/controls/independent/DisplayPanel.ts
var DisplayPanel = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.advancedPalettes = false;
	}
	static {
		this.styles = lit.css`
    
        :host {
            display: contents;
        }
    
    `;
	}
	render() {
		return lit.html`
        <thermal-field label="${t$1("colourpalette")}" hint="Zvolte, jaké chcete používat palety.">
            <thermal-btn-group>
                <thermal-btn 
                    variant="${!this.advancedPalettes ? "foreground" : "default"}"
                    @click=${() => this.managerController.setAdvancedPalettes(false)}
                    tooltip="IRON, JET, White hot, Black hot"
                >Základní</thermal-btn>
                <thermal-btn 
                    variant="${this.advancedPalettes ? "foreground" : "default"}"
                    @click=${() => this.managerController.setAdvancedPalettes(true)}
                    tooltip="Všechny dostupné palety"
                >Pokročilé</thermal-btn>
            </thermal-btn-group>
        </thermal-field>
        <thermal-field label="${t$1("filerendering")}" hint="${t$1("filerenderinghint")}">
            <manager-image-smooth-switch></manager-image-smooth-switch>
        </thermal-field>
        <thermal-field label="${t$1("graphlines")}" hint="${t$1("graphlineshint")}">
            <manager-graph-smooth-switch></manager-graph-smooth-switch>
        </thermal-field>
        `;
	}
};
__decorate([
	(0, _lit_context.consume)({
		context: managerAdvancedPalettesContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], DisplayPanel.prototype, "advancedPalettes", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: managerControllerContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], DisplayPanel.prototype, "managerController", void 0);
//#endregion
//#region src/controls/independent/ConfigDialog.ts
var ConfigDialog = class extends AbstractThermalElement {
	render() {
		return lit.html`<thermal-dialog
            label="Nastavení aplikace"
        >
            <thermal-btn 
                slot="invoker"
                icon="settings"
                iconStyle="solid"
                tooltip=${this.t("config")}
            ></thermal-btn>

            <div slot="content">
                <manager-export-panel></manager-export-panel>
                <display-panel></display-panel>
            </div>
        </thermal-dialog>`;
	}
};
//#endregion
//#region src/hierarchy/providers/FileCopy.ts
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
var FileCopyElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.withAnalyses = true;
		this.managerController = new ManagerController(this);
		this.advancedPalettes = true;
		this.smoothThermograms = false;
		this.smoothGraph = false;
		this.tool = "edit";
		this.registryController = new RegistryController(this);
		this.opacity = 1;
		this.loading = false;
		this.groupController = new GroupController(this);
		this.autoclearGroup = true;
		this.fileController = new FileController(this);
		this.ms = 0;
		this.playbackSpeed = 1;
		this.autoHighlight = false;
		this._canRenderChildren = false;
	}
	static {
		this.properties = {
			...ManagerController.HOST_PROPERTIES,
			...RegistryController.HOST_PROPERTIES,
			...GroupController.HOST_PROPERTIES,
			...FileController.HOST_PROPERTIES
		};
	}
	getSlugManager() {
		return this._slugBase + "__copy-manager";
	}
	getSlugRegistry() {
		return this._slugBase + "__copy-registry";
	}
	getSlugGroup() {
		return this._slugBase + "__copy-group";
	}
	connectedCallback() {
		const originalFile = this.originalFile;
		const slugBase = originalFile.thermalUrl + "__" + this.UUID;
		this._slugBase = slugBase;
		this.setAttribute("manager-slug", this.getSlugManager());
		this.setAttribute("group-slug", this.getSlugGroup());
		this.setAttribute("registry-slug", this.getSlugRegistry());
		this.palette = this.originalFile.group.registry.manager.palette.value;
		this.opacity = this.originalFile.group.registry.opacity.value;
		this.ms = originalFile.timeline.currentMs;
		if (this.withAnalyses) this.copyAnalysesFromParent();
		super.connectedCallback();
		this.originalFile.reader.createInstance(this.groupObject).then((copiedInstance) => {
			if (!this.isConnected) return;
			this.registryObject.postLoadedProcessing();
			this.fileController.receiveInstance(copiedInstance);
			const range = originalFile.group.registry.range.value;
			if (range) this.registryObject?.range.imposeRange(range);
			this._canRenderChildren = true;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this._canRenderChildren = false;
		this.fileController.removeInstance();
		this.registryController.removeGroup(this.groupObject);
		this.managerObject.removeRegistry(this.registryObject.id);
		window.Thermal.managers.delete(this.managerSlug);
	}
	/** Take the current analyses of the original file. The file controller propagates them to the copied file. */
	copyAnalysesFromParent() {
		const slots = this.originalFile.slots;
		this.analysis1 = slots.getSlot(1)?.serialized;
		this.analysis2 = slots.getSlot(2)?.serialized;
		this.analysis3 = slots.getSlot(3)?.serialized;
		this.analysis4 = slots.getSlot(4)?.serialized;
		this.analysis5 = slots.getSlot(5)?.serialized;
		this.analysis6 = slots.getSlot(6)?.serialized;
		this.analysis7 = slots.getSlot(7)?.serialized;
	}
	/** Remove all analyses from the copied file. */
	clearAnalyses() {
		this.analysis1 = void 0;
		this.analysis2 = void 0;
		this.analysis3 = void 0;
		this.analysis4 = void 0;
		this.analysis5 = void 0;
		this.analysis6 = void 0;
		this.analysis7 = void 0;
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("withAnalyses") && _changedProperties.get("withAnalyses") !== void 0) {
			if (this.withAnalyses) this.copyAnalysesFromParent();
			else this.clearAnalyses();
		}
	}
	static {
		this.styles = lit.css`
    
        :host,
        registry-provider,
        group-provider {
            display: contents;
        }

    `;
	}
	render() {
		return lit.html`${this._canRenderChildren ? lit.html`<slot></slot>` : lit.nothing}`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: Object,
	attribute: false
}), __decorateMetadata("design:type", Object)], FileCopyElement.prototype, "originalFile", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: false
}), __decorateMetadata("design:type", Boolean)], FileCopyElement.prototype, "withAnalyses", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileCopyElement.prototype, "_canRenderChildren", void 0);
//#endregion
//#region src/hierarchy/providers/FileProvider.ts
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
var FileProviderElement = class extends AbstractFileProvider {
	constructor(..._args) {
		super(..._args);
		this.fileLoadController = new FileLoadController(this);
	}
	static {
		this.properties = {
			...AbstractFileProvider.properties,
			...FileLoadController.HOST_PROPERTIES
		};
	}
};
//#endregion
//#region src/hierarchy/providers/GroupProvider.ts
var GroupProviderElement = class extends AbstractGroupProvider {};
//#endregion
//#region src/hierarchy/providers/ManagerProvider.ts
var ManagerProviderElement = class extends AbstractManagerProvider {};
//#endregion
//#region src/hierarchy/providers/RegistryProvider.ts
var RegistryProviderElement = class extends AbstractRegistryProvider {};
//#endregion
//#region src/controls/manager/ManagerExportPanel.ts
var ManagerExportPanel = class extends AbstractThermalElement {
	renderRow(label, content, hint) {
		return lit.html`<thermal-field label="${label}">
                <div>${content}</div>
                ${hint ? hint : lit.nothing}
            </thermal-field>`;
	}
	renderGroup(label, content) {
		return lit.html`<fieldset>
            <legend>${label}</legend>
            ${content}
        </fieldset>`;
	}
	formatTip(value) {
		return value ? lit.html`<div class="hint">${value}</div>` : "";
	}
	renderCheckbox(key, label, value, onChange) {
		const content = lit.html`<input name="${key}" type="checkbox" ?checked="${value}" @input=${(event) => {
			const value = event.target.checked;
			onChange(value);
		}}>`;
		return lit.html`<div>${content}<label for="${key}">${label}</label></div>`;
	}
	renderSlider(key, label, value, unit, min, max, step, onChange, hint) {
		const content = lit.html`<input 
                name="${key}"
                value="${value}"
                min="${min}"
                max="${max}"
                step="${step}"
                type="range"
                @input="${(event) => {
			onChange(Math.min(max, Math.max(0, parseFloat(event.target.value))));
		}}"
            ></input>`;
		const help = lit.html`<strong>${value} ${unit}</strong> (${min} - ${max} ${unit})${hint ? "<br />" + hint : ""}`;
		const tip = this.formatTip(help);
		return this.renderRow(label, content, tip);
	}
	static {
		this.styles = lit.css`
        
            :host {
                display: contents;
            }

            .hint {
                font-size: calc( var( --thermal-fs-sm ) * .75 );
                padding-top: .2em;
            }

            fieldset {
                border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                border-radius: var(--thermal-radius);
                margin-bottom: var(--thermal-gap);

                legend {
                    border-radius: var(--thermal-radius);
                    border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                    padding: 0.3em 0.5em;
                }

            }

            
        
        `;
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (!this.configController || !_changedProperties.has("config")) return;
		const settings = this.configController.settings.export.png;
		const values = [["pngWidth", settings.width], ["pngFs", settings.fontSize]];
		for (const [key, value] of values) {
			const element = this.shadowRoot?.querySelector(`input[name="${key}"]`);
			if (element && Number(element.value) !== value) element.value = value.toString();
		}
	}
	render() {
		if (!this.configController) return lit.nothing;
		const { png, group } = this.configController.settings.export;
		return lit.html`

        ${this.renderGroup(t$1("exportcontent"), lit.html`
            ${this.renderCheckbox("pngExportAnalyses", t$1("analyses"), png.analyses, (value) => this.configController.setPngAnalyses(value))}
            ${this.renderCheckbox("pngExportScale", t$1("thermalscale"), png.thermalScale, (value) => this.configController.setPngThermalScale(value))}
            ${this.renderCheckbox("pngExportFileName", t$1("exportfilenames"), png.fileName, (value) => this.configController.setPngFileName(value))}
            ${this.renderCheckbox("pngExportFileDate", t$1("filedate"), png.fileDate, (value) => this.configController.setPngFileDate(value))}
        `)}

        ${this.renderGroup(t$1("exportdimensions"), lit.html`
            ${this.renderSlider("pngWidth", t$1("exportimagewidth"), png.width, "px", 500, 2e3, 50, (value) => this.configController.setPngWidth(value))}

            ${this.renderSlider("pngFs", t$1("exportimagefontsize"), png.fontSize, "px", 10, 50, 1, (value) => this.configController.setPngFontSize(value))}
        `)}

        ${this.renderGroup(t$1("exportgroup"), lit.html`
            ${this.renderCheckbox("pngExportGroupName", t$1("exportgroupname"), group.groupName, (value) => this.configController.setGroupGroupName(value))}
            ${this.renderSlider("pngColumns", t$1("exportfilenames"), group.columns, "sloupců", 1, 5, 1, (value) => this.configController.setGroupColumns(value))}
        `)}

        `;
	}
};
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: configContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], ManagerExportPanel.prototype, "configController", void 0);
//#endregion
//#region src/controls/manager/ManagerGraphSmoothSwitch.ts
var ManagerGraphSmoothSwitch = class extends AbstractManagerConsumer {
	static {
		this.styles = lit.css`
    
        :host {
            display: inline-block;
        }

    `;
	}
	render() {
		return lit.html`
            <thermal-btn-group>
                <thermal-btn
                    variant=${this.smooth ? "default" : "foreground"}
                    @click=${() => this.managerObject.graphSmooth.setGraphSmooth(false)}
                >${t$1("straightlines")}</thermal-btn>
                <thermal-btn
                    variant=${this.smooth ? "foreground" : "default"}
                    @click=${() => this.managerObject.graphSmooth.setGraphSmooth(true)}
                >${t$1("smoothlines")}</thermal-btn>
            </thermal-btn-group>
        `;
	}
};
__decorate([(0, _lit_context.consume)({
	context: managerGraphFunctionContext,
	subscribe: true
}), __decorateMetadata("design:type", Boolean)], ManagerGraphSmoothSwitch.prototype, "smooth", void 0);
//#endregion
//#region src/controls/manager/ManagerImageSmoothSwitch.ts
var ManagerImageSmoothSwitch = class extends AbstractManagerConsumer {
	static {
		this.styles = lit.css`
    
        :host {
            display: block;
        }

    `;
	}
	render() {
		return lit.html`<thermal-btn-group>
            <thermal-btn
    variant=${this.smooth ? "default" : "foreground"}
    @click=${() => this.managerObject.smooth.setSmooth(false)}
>${t$1("pixelated")}</thermal-btn>

<thermal-btn
    variant=${this.smooth ? "foreground" : "default"}
    @click=${() => this.managerObject.smooth.setSmooth(true)}
>${t$1("smooth")}</thermal-btn>
        </thermal-btn-group>`;
	}
};
__decorate([(0, _lit_context.consume)({
	context: managerSmoothContext,
	subscribe: true
}), __decorateMetadata("design:type", Boolean)], ManagerImageSmoothSwitch.prototype, "smooth", void 0);
//#endregion
//#region src/controls/manager/AbstractPaletteSwitch.ts
var AbstractPaletteSwitch = class AbstractPaletteSwitch extends AbstractManagerConsumer {
	constructor(..._args) {
		super(..._args);
		this.advancedPalettesContext = false;
		this.palettes = [];
	}
	static {
		this.BASIC_PALETTES = [
			"iron",
			"jet",
			"white_hot",
			"black_hot"
		];
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		const showAdvancedPalettes = this.advancedPalettesProperty ?? this.advancedPalettesContext;
		const basicPalettes = AbstractPaletteSwitch.BASIC_PALETTES;
		const optionsChanged = changedProperties.has("advancedPalettesContext") || changedProperties.has("advancedPalettesProperty");
		if (optionsChanged) {
			if (showAdvancedPalettes) this.palettes = Object.values(_labirthermal_core.ThermalPalettes);
			else this.palettes = Object.entries(_labirthermal_core.ThermalPalettes).filter(([key]) => AbstractPaletteSwitch.BASIC_PALETTES.includes(key)).map(([, palette]) => palette);
		}
		if ((optionsChanged || changedProperties.has("value")) && this.value !== void 0 && !showAdvancedPalettes && !basicPalettes.includes(this.value.key)) this.onSelect("iron");
	}
	/** Handle user input events */
	onSelect(palette) {
		this.managerObject.palette.setPalette(palette);
	}
};
__decorate([
	(0, _lit_context.consume)({
		context: managerAdvancedPalettesContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], AbstractPaletteSwitch.prototype, "advancedPalettesContext", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "advanced-palettes"
}), __decorateMetadata("design:type", Boolean)], AbstractPaletteSwitch.prototype, "advancedPalettesProperty", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], AbstractPaletteSwitch.prototype, "palettes", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: managerPaletteContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], AbstractPaletteSwitch.prototype, "value", void 0);
//#endregion
//#region src/controls/manager/ManagerPaletteButtons.ts
var ManagerPaletteButtons = class extends AbstractPaletteSwitch {
	static {
		this.styles = lit.css`
:host {
    display: flex;
    width: content-width;
    gap: 5px;
}

.palette {
    width: calc( var( --thermal-gap ) * 2 );
    height: calc( var( --thermal-fs ) * .8 );
    border-radius: var( --thermal-fs-small );
}`;
	}
	paletteTemplate(palette) {
		return lit.html`<span class="palette" style="background:${palette.gradient}"></span>`;
	}
	render() {
		return this.palettes.map(((palette) => lit.html`<thermal-btn 
    @click=${() => this.onSelect(palette.slug)} 
    variant="${palette.name === this.managerObject.palette.currentPalette.name ? "background" : "default"}"
    tooltip="${t$1("palettename", { name: palette.name })}"
>
    ${this.paletteTemplate(palette)}
</thermal-btn>`));
	}
};
//#endregion
//#region src/controls/manager/ManagerPaletteDropdown.ts
var ManagerPaletteDropdown = class extends AbstractPaletteSwitch {
	static {
		this.styles = lit.css`

    .palette {
        display: block;
        width: calc( var( --thermal-gap ) * 2 );
        height: calc( var( --thermal-fs ) * .8 );
        border-radius: var( --thermal-fs-small );
    }

    thermal-btn {
        width: 100%;
        justify-content: flex-start;
    }

    `;
	}
	paletteTemplate(palette) {
		return lit.html`<span class="palette" style="background:${palette.gradient}"></span><span>${palette.name}</span>`;
	}
	render() {
		return lit.html`

            <thermal-dropdown .tooltip=${t$1("colourpalette")}>
                    <span slot="invoker" class="palette" style="background:${this.managerObject.palette.currentPalette.gradient}"></span>

                ${this.palettes.map((palette) => lit.html`
                    <div slot="option"><thermal-btn @click=${() => this.onSelect(palette.slug)} variant="${palette.name === this.managerObject.palette.currentPalette.name ? "background" : "default"}">
                        ${this.paletteTemplate(palette)}
                    </thermal-btn></div>
                `)}
            
            </thermal-dropdown>

            <slot></slot>

        `;
	}
};
//#endregion
//#region src/controls/manager/ManagerToolsBar.ts
/**
* A standard toolbar that is either horizontal or vertical.
*/
var ManagerToolBar = class extends AbstractManagerConsumer {
	/** Handle user input events */
	onSelect(tool) {
		this.managerObject.tool.selectTool(tool);
	}
	static {
		this.styles = lit.css`
:host {
    display: flex;
    font-size: var(--thermal-fs);
    flex-direction: column;
    gap: 0.25em;
}

:host([horizontal]) {
    flex-direction: row;
}

.active {
    color: var( --thermal-foreground );
}

thermal-btn {
    width: 2.5em;
    padding: 3px;
    &:hover {
        color: var(--thermal-primary);
    }
}`;
	}
	renderTool(key, tool) {
		const classes = {
			[key]: true,
			button: true,
			active: tool.key === this.value.key
		};
		return lit.html`<thermal-btn 
    tooltip=${t$1(T[tool.name])}
    tooltip-placement="right"
    class=${(0, lit_directives_class_map_js.classMap)(classes)} 
    @click=${() => {
			this.managerObject.tool.selectTool(tool);
		}}
    variant=${tool.key === this.value.key ? "background" : "default"}
>
    ${(0, lit_directives_unsafe_svg_js.unsafeSVG)(tool.icon)}
</thermal-btn>`;
	}
	render() {
		if (this.managerObject === void 0) return lit.nothing;
		return Object.entries(this.managerObject.tool.tools).map(([key, tool]) => {
			return this.renderTool(key, tool);
		});
	}
};
__decorate([
	(0, _lit_context.consume)({
		context: managerToolContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], ManagerToolBar.prototype, "value", void 0);
//#endregion
//#region src/controls/registry/RegistryRangeForm.ts
/**
* Form control for editing a thermal registry's active range. It keeps its
* inputs synchronized with registry range data and provides range presets,
* bounded stepping, and rounding.
*
* @see AbstractRegistryConsumer
* @see RegistryController
*/
var RegistryRangeForm = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.stacked = false;
		this.step = 1;
		this.availableSteps = [
			.01,
			.1,
			.5,
			1,
			5,
			10
		];
		this.inputValues = {
			from: "",
			to: ""
		};
		this.isUpdatingFromRegistry = false;
		this.autoRangeHovered = false;
		this.recieveMinmax = (value) => {
			if (value) {
				if (this.min !== value.min) this.min = value.min;
				if (this.max !== value.max) this.max = value.max;
			} else {
				this.min = void 0;
				this.max = void 0;
				this.from = void 0;
				this.to = void 0;
				this.inputValues = {
					from: "",
					to: ""
				};
			}
		};
		this.recieveRange = (value) => {
			this.isUpdatingFromRegistry = true;
			if (value) {
				if (this.from !== value.from) {
					this.from = value.from;
					this.inputValues = {
						...this.inputValues,
						from: value.from?.toFixed(2) ?? ""
					};
				}
				if (this.to !== value.to) {
					this.to = value.to;
					this.inputValues = {
						...this.inputValues,
						to: value.to?.toFixed(2) ?? ""
					};
				}
			} else {
				this.from = void 0;
				this.to = void 0;
				this.inputValues = {
					from: "",
					to: ""
				};
			}
			this.isUpdatingFromRegistry = false;
		};
		this.recieveAutoValue = (value) => {
			this.autoValue = value;
			if (this.autoRangeHovered) this.registryController.setHighlight(value);
		};
		this.handleFullRangeMouseEnter = () => {
			const minmax = this.registryObject.minmax.value;
			if (minmax !== void 0) this.registryController.setHighlight({
				from: minmax.min,
				to: minmax.max
			});
		};
		this.handleFullRangeClick = () => {
			this.registryObject.range.applyMinmax();
		};
		this.handleAutoRangeMouseEnter = () => {
			this.autoRangeHovered = true;
			this.registryController.setHighlight(this.autoValue);
		};
		this.handleAutoRangeClick = () => {
			this.registryObject.range.applyAuto();
		};
		this.handleHighlightMouseLeave = () => {
			this.autoRangeHovered = false;
			this.registryController.setHighlight(void 0);
		};
	}
	connectedCallback() {
		super.connectedCallback();
		this.hydrate();
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		this.hydrate();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.dehydrate();
		if (this.debounceTimer) clearTimeout(this.debounceTimer);
	}
	/**
	* Synchronizes local form state with the current registry and subscribes to
	* its range updates.
	*/
	hydrate() {
		const registry = this.registryController?.registryObject;
		if (registry === void 0 || registry === this.subscribedRegistry) return;
		this.dehydrate();
		this.subscribedRegistry = registry;
		this.recieveMinmax(registry.minmax.value);
		this.recieveRange(registry.range.value);
		this.recieveAutoValue(registry.range.autoValue);
		registry.minmax.addListener(this.UUID, this.recieveMinmax);
		registry.range.addListener(this.UUID, this.recieveRange);
		registry.range.onAutoValueChanged.set(this.UUID, this.recieveAutoValue);
	}
	/**
	* Removes this form's listeners from the subscribed registry and clears the
	* subscription reference.
	*/
	dehydrate() {
		const registry = this.subscribedRegistry;
		if (registry === void 0) return;
		registry.minmax.removeListener(this.UUID);
		registry.range.removeListener(this.UUID);
		registry.range.onAutoValueChanged.delete(this.UUID);
		this.subscribedRegistry = void 0;
	}
	/**
	* Updates the lower endpoint and imposes the resulting range on the registry
	* when both endpoints are available.
	*
	* @param value The new lower endpoint.
	*/
	updateFrom(value) {
		if (this.registryObject && value !== void 0 && this.to !== void 0) {
			this.from = value;
			this.registryObject.range.imposeRange({
				from: value,
				to: this.to
			});
		}
	}
	/**
	* Updates the upper endpoint and imposes the resulting range on the registry
	* when both endpoints are available.
	*
	* @param value The new upper endpoint.
	*/
	updateTo(value) {
		if (this.registryObject && value !== void 0 && this.from !== void 0) {
			this.to = value;
			this.registryObject.range.imposeRange({
				from: this.from,
				to: value
			});
		}
	}
	/**
	* Debounces input edits, validates the parsed value, and applies it to the
	* selected endpoint.
	*
	* @param type The endpoint being edited.
	* @param value The current text entered by the user.
	*/
	debouncedUpdate(type, value) {
		if (this.debounceTimer) clearTimeout(this.debounceTimer);
		this.debounceTimer = window.setTimeout(() => {
			if (this.isUpdatingFromRegistry) return;
			const numValue = parseFloat(value);
			if (isNaN(numValue)) return;
			if (type === "from" && this.isValidFromValue(numValue)) this.updateFrom(numValue);
			else if (type === "to" && this.isValidToValue(numValue)) this.updateTo(numValue);
		}, 300);
	}
	/**
	* Checks whether a lower-endpoint value is within the known minimum and
	* upper endpoint.
	*
	* @param value The candidate lower endpoint.
	* @returns `true` if the value is valid; otherwise, `false`.
	*/
	isValidFromValue(value) {
		if (this.min !== void 0 && value < this.min) return false;
		if (this.to !== void 0 && value > this.to) return false;
		return true;
	}
	/**
	* Checks whether an upper-endpoint value is within the known lower endpoint
	* and maximum.
	*
	* @param value The candidate upper endpoint.
	* @returns `true` if the value is valid; otherwise, `false`.
	*/
	isValidToValue(value) {
		if (this.max !== void 0 && value > this.max) return false;
		if (this.from !== void 0 && value < this.from) return false;
		return true;
	}
	/**
	* Determines whether the lower endpoint can move one configured step in the
	* given direction.
	*
	* @param direction The direction in which to step.
	* @returns `true` if the stepped value is valid; otherwise, `false`.
	*/
	canStepFrom(direction) {
		if (this.from === void 0) return false;
		const newValue = direction === "up" ? this.from + this.step : this.from - this.step;
		return this.isValidFromValue(newValue);
	}
	/**
	* Determines whether the upper endpoint can move one configured step in the
	* given direction.
	*
	* @param direction The direction in which to step.
	* @returns `true` if the stepped value is valid; otherwise, `false`.
	*/
	canStepTo(direction) {
		if (this.to === void 0) return false;
		const newValue = direction === "up" ? this.to + this.step : this.to - this.step;
		return this.isValidToValue(newValue);
	}
	/**
	* Checks whether the registry minimum can replace the current lower endpoint.
	*
	* @returns `true` if the minimum can be applied; otherwise, `false`.
	*/
	canSetMin() {
		return this.min !== void 0 && this.to !== void 0 && this.min <= this.to && this.from !== this.min;
	}
	/**
	* Checks whether the registry maximum can replace the current upper endpoint.
	*
	* @returns `true` if the maximum can be applied; otherwise, `false`.
	*/
	canSetMax() {
		return this.max !== void 0 && this.from !== void 0 && this.max >= this.from && this.to !== this.max;
	}
	/**
	* Moves the lower endpoint by one configured step and applies the rounded
	* value when valid.
	*
	* @param direction The direction in which to move the endpoint.
	*/
	stepFrom(direction) {
		if (this.from === void 0 || !this.canStepFrom(direction)) return;
		const newValue = direction === "up" ? this.from + this.step : this.from - this.step;
		const roundedValue = parseFloat(newValue.toFixed(2));
		this.inputValues.from = roundedValue.toFixed(2);
		this.updateFrom(roundedValue);
	}
	/**
	* Moves the upper endpoint by one configured step and applies the rounded
	* value when valid.
	*
	* @param direction The direction in which to move the endpoint.
	*/
	stepTo(direction) {
		if (this.to === void 0 || !this.canStepTo(direction)) return;
		const newValue = direction === "up" ? this.to + this.step : this.to - this.step;
		const roundedValue = parseFloat(newValue.toFixed(2));
		this.inputValues.to = roundedValue.toFixed(2);
		this.updateTo(roundedValue);
	}
	/** Sets the lower endpoint to the registry minimum when the range permits it. */
	setMinValue() {
		if (!this.canSetMin() || this.min === void 0) return;
		this.inputValues.from = this.min.toFixed(2);
		this.updateFrom(this.min);
	}
	/** Sets the upper endpoint to the registry maximum when the range permits it. */
	setMaxValue() {
		if (!this.canSetMax() || this.max === void 0) return;
		this.inputValues.to = this.max.toFixed(2);
		this.updateTo(this.max);
	}
	/**
	* Sets the increment used when stepping range endpoints.
	*
	* @param newStep The step size to use.
	*/
	setStep(newStep) {
		this.step = newStep;
	}
	/**
	* Rounds the selected range endpoint to the nearest valid integer and applies it.
	*
	* @param type The endpoint to round.
	*/
	roundToNearestInteger(type) {
		const currentValue = type === "from" ? this.from : this.to;
		if (currentValue === void 0) return;
		const rounded = Math.round(currentValue);
		let safeValue = rounded;
		if (type === "from" && rounded < this.min) safeValue = Math.ceil(currentValue);
		if (type === "to" && rounded > this.max) safeValue = Math.floor(currentValue);
		if (type === "from" ? this.isValidFromValue(safeValue) : this.isValidToValue(safeValue)) {
			if (type === "from") {
				this.inputValues.from = safeValue.toFixed(2);
				this.updateFrom(safeValue);
			} else {
				this.inputValues.to = safeValue.toFixed(2);
				this.updateTo(safeValue);
			}
		}
	}
	/**
	* Returns step sizes that can move at least one current endpoint in either
	* direction.
	*
	* @returns The available step sizes.
	*/
	getAvailableSteps() {
		return this.availableSteps.filter((step) => {
			const fromCanStep = this.from !== void 0 && (this.isValidFromValue(this.from + step) || this.isValidFromValue(this.from - step));
			const toCanStep = this.to !== void 0 && (this.isValidToValue(this.to + step) || this.isValidToValue(this.to - step));
			return fromCanStep || toCanStep;
		});
	}
	/**
	* Checks whether a defined value is an integer.
	*
	* @param value The value to check.
	* @returns `true` if the value is an integer; otherwise, `false`.
	*/
	isWholeNumber(value) {
		return value !== void 0 && Math.round(value) === value;
	}
	/**
	* Parses endpoint input and clamps it to the currently valid range, falling
	* back to the current value when input is empty or invalid.
	*
	* @param inputValue The text entered in the endpoint input.
	* @param type The endpoint being validated.
	* @returns The parsed, clamped value, or the current endpoint value.
	*/
	getClosestValidValue(inputValue, type) {
		if (!inputValue.trim()) return type === "from" ? this.from : this.to;
		const numValue = parseFloat(inputValue);
		if (isNaN(numValue)) return type === "from" ? this.from : this.to;
		if (type === "from") {
			const minBound = this.min ?? Number.NEGATIVE_INFINITY;
			const maxBound = this.to ?? Number.POSITIVE_INFINITY;
			if (numValue < minBound) return minBound;
			if (numValue > maxBound) return maxBound;
			return numValue;
		} else {
			const minBound = this.from ?? Number.NEGATIVE_INFINITY;
			const maxBound = this.max ?? Number.POSITIVE_INFINITY;
			if (numValue < minBound) return minBound;
			if (numValue > maxBound) return maxBound;
			return numValue;
		}
	}
	/**
	* Normalizes an endpoint input on blur and applies the corrected value to
	* the registry.
	*
	* @param type The endpoint whose input lost focus.
	* @param inputValue The input text to normalize.
	*/
	handleInputBlur(type, inputValue) {
		const correctedValue = this.getClosestValidValue(inputValue, type);
		if (correctedValue !== void 0) {
			this.inputValues = {
				...this.inputValues,
				[type]: correctedValue.toFixed(2)
			};
			if (type === "from") this.updateFrom(correctedValue);
			else this.updateTo(correctedValue);
		}
	}
	static {
		this.styles = lit.css`

        :host {
            font-family: inherit;
            font-style: normal;
            font-size: var(--font-size);
            display: flex !important;
            flex-wrap: wrap;
            flex-direction: var( --thermal-direction, row );
            gap: .5em;
        }

        .fields {

            display: flex;
            flex-wrap: no-wrap;
            gap: 0em;
        
        }

        .fields__buttons {

            thermal-btn {
                min-height: 2em;
                flex-grow: var(--thermal-collapsible-grow, 0);
            }
        
        }

        .fields__separated {
            gap: .5em;
        }


        .separator {
            width: .5em;
            &.separator__line {
                display: flex;
                align-items: center;
                &::after {
                    content: "";
                    display: block;
                    height: var(--thermal-border-width);
                    width: 100%;
                    background: var( --thermal-slate );
                }
            }
        }

        .input-group {
            position: relative;
        }
    
        .input-group-inner {
            display: flex;
            align-items: stretch;
            height: 2em;
            position: relative;
            z-index: 1;
        }


        .input-group-outer {
            position: absolute;
            z-index: 0;
            text-align: center;
            width: 100%;

            font-size: .75em;
            height: 2em;
            background: var( --thermal-slate-light );

            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );

            opacity: 0;

            transition: all .25s ease-in-out;

            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: .25em;

            &.input-group-outer__top {
                top: 3px;
                padding-bottom: .5em;
                border-radius: var( --thermal-radius ) var( --thermal-radius ) 0 0;
            }

            &.input-group-outer__bottom {
                bottom: 3px;
                padding-top: .5em;
                border-radius: 0 0 var( --thermal-radius ) var( --thermal-radius );
            }
        }

        .input-group:focus-within .input-group-outer {

            opacity: 1;

            &.input-group-outer__top {
                top: -1.5em;
            }

            &.input-group-outer__bottom {
                bottom: -1.5em;
            }
        }

        .input-group.is-whole-number .input-group-outer__bottom {
            opacity: 0;
            bottom: 3px;
        }

        .input-group button,
        .input-group aside,
        .input-group input {

            border: 0;
            border-top: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            border-bottom: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );

            color: var( --thermal-foreground );
            background: var( --thermal-background );
            
            font-family: inherit;
            font-size: 1em;
            line-height: 1em;

            transition: all .25s ease-in-out;
        
        }

        .input-group-inner input, 
        .input-group-inner aside {
            display: block;
            vertical-align: middle;
        }

        .input-group-inner aside {
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: .3em;
        }

        .input-group-inner input {

            outline: 0;
            padding: 0;
            margin: 0;

            text-align: right;

            width: 3.5em;

            &:hover,
            &:focus {
                color: var( --thermal-primary );
            }

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {
                /* display: none; <- Crashes Chrome on hover */
                -webkit-appearance: none;
                margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
            }

            &[type=number] {
                -moz-appearance:textfield; /* Firefox */
            }
            
        }

        .input-group-inner > button {

            cursor: pointer;

            outline: 0;

            display: flex;
            align-items: center;
            justify-content: center;

            &.left {
                border-right: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            }

            &.right {
                border-left: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
            }

            &:hover,
            &:focus {
                background: var( --thermal-slate-light );
            }

            &:disabled {
                
                cursor: not-allowed;
                color: var( --thermal-slate-light );
                
                &:hover,
                &:focus {
                    background: var( --thermal-background );
                }
            }

            &:first-child {
                border-left: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
                border-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            }

            &:last-child {
                border-right: var(--thermal-border-width)var(--thermal-border-style) var( --thermal-slate );
                border-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
            }

            svg {
                display: block;
            }
        
        }

        .step-button {
            
            color: var( --thermal-slate ) !important;
            cursor: pointer;
            font-size: .7em;
            padding: .2em .3em;
            transition: all .25s ease-in-out;

            background: transparent !important;
            border: none !important;

            &:hover:not(:disabled) {
                color: var( --thermal-primary );
            }

            &.active {
                font-weight: bold;
                color: var( --thermal-foreground ) !important;
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }

        .round-button {
            
            color: var( --thermal-foreground );
            cursor: pointer;
            font-size: .8em;
            padding: .3em .6em;
            transition: all .25s ease-in-out;
            border: 0 !important;
            background: transparent !important;

            &:hover:not(:disabled) {
                color: var( --thermal-primary );
            }

            &:disabled {
                opacity: 0.3;
                cursor: not-allowed;
            }
        }
    
    `;
	}
	/**
	* Renders one range endpoint input with its step controls and interaction
	* handlers.
	*
	* @param type The endpoint represented by the input.
	* @param before Optional content rendered before the input controls.
	* @param after Optional content rendered after the input controls.
	* @returns The Lit template for the endpoint input.
	*/
	renderInput(type, before = void 0, after = void 0) {
		const value = type === "from" ? this.from : this.to;
		const inputValue = this.inputValues[type];
		const canStepDown = type === "from" ? this.canStepFrom("down") : this.canStepTo("down");
		const canStepUp = type === "from" ? this.canStepFrom("up") : this.canStepTo("up");
		const availableSteps = this.getAvailableSteps();
		const isWhole = this.isWholeNumber(value);
		return lit.html`
        <div class="input-group ${isWhole ? "is-whole-number" : ""}">
            <div class="input-group-outer input-group-outer__top">
                ${availableSteps.map((stepValue) => lit.html`
                    <button 
                        class="step-button ${stepValue === this.step ? "active" : ""}"
                        ?disabled=${!availableSteps.includes(stepValue)}
                        @click=${() => this.setStep(stepValue)}
                    >
                        ${stepValue}
                    </button>
                `)}
            </div>
            <div class="input-group-inner">
                ${before}
                <button 
                    class="left"
                    ?disabled=${!canStepDown}
                    @click=${() => type === "from" ? this.stepFrom("down") : this.stepTo("down")}
                >-</button>
                <input
                    .value=${inputValue}
                    type="number"
                    step=${this.step}
                    min=${(0, lit_directives_if_defined_js.ifDefined)(type === "from" ? this.min : this.from)}
                    max=${(0, lit_directives_if_defined_js.ifDefined)(type === "from" ? this.to : this.max)}
                    @input=${(e) => {
			const target = e.target;
			this.inputValues = {
				...this.inputValues,
				[type]: target.value
			};
			this.debouncedUpdate(type, target.value);
		}}
                    @blur=${(e) => {
			const target = e.target;
			this.handleInputBlur(type, target.value);
		}}
                    @keydown=${(e) => {
			if (e.key === "ArrowUp" || e.key === "ArrowDown") {
				e.preventDefault();
				const direction = e.key === "ArrowUp" ? "up" : "down";
				if (type === "from") this.stepFrom(direction);
				else this.stepTo(direction);
			}
		}}
                ></input>
                <aside>°C</aside>
                <button 
                    class="right"
                    ?disabled=${!canStepUp}
                    @click=${() => type === "from" ? this.stepFrom("up") : this.stepTo("up")}
                >+</button>
                ${after}
            </div>
            <div class="input-group-outer input-group-outer__bottom">
                <button 
                    class="round-button"
                    @click=${() => this.roundToNearestInteger(type)}
                >
                    Zaokrouhlit
                </button>
            </div>
        </div>
        `;
	}
	render() {
		return lit.html`
        <div class="fields">

            ${this.renderInput("from", lit.html`<button 
                    class="left"
                    ?disabled=${!this.canSetMin()}
                    @click=${() => this.setMinValue()}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <line x1="5" y1="2" x2="5" y2="14" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="10" y2="4" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1"/>
                        <line x1="5" y1="8" x2="16" y2="8" stroke="currentColor" stroke-width="1"/>
                    </svg>
                </button>`, void 0)}
            <div class="separator separator__line"></div>
            ${this.renderInput("to", void 0, lit.html`<button 
                    class="right"
                    ?disabled=${!this.canSetMax()}
                    @click=${() => this.setMaxValue()}
                >
                    <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                        <line x1="15" y1="2" x2="15" y2="14" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="10" y2="4" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="10" y2="12" stroke="currentColor" stroke-width="1"/>
                        <line x1="15" y1="8" x2="4" y2="8" stroke="currentColor" stroke-width="1"/>
                    </svg>
                </button>`)}

        </div>

        <div class="fields fields__separated fields__buttons">
            <thermal-btn
                tooltip=${t$1("fullrange")}
                @click=${this.handleFullRangeClick}
                @mouseenter=${this.handleFullRangeMouseEnter}
                @mouseleave=${this.handleHighlightMouseLeave}
                @focusin=${this.handleFullRangeMouseEnter}
                @focusout=${this.handleHighlightMouseLeave}
                style="padding: 0 0.5em; display: flex; align-items: center; justify-content: center;"
                ?disabled=${!this.canSetMin() && !this.canSetMax()}
            >
                <svg width="35" height="16" viewBox="0 0 35 16" fill="none" style="display: block;" stroke-linecap="butt" stroke-linejoin="miter">
                    <!-- Minimum-bound icon. -->
                    <line x1="3" y1="2" x2="3" y2="14" stroke="currentColor" stroke-width="1"/>
                    <line x1="3" y1="8" x2="8" y2="3" stroke="currentColor" stroke-width="1"/>
                    <line x1="3" y1="8" x2="8" y2="13" stroke="currentColor" stroke-width="1"/>
                    <!-- Line connecting the endpoint arrows. -->
                    <line x1="3" y1="8" x2="32" y2="8" stroke="currentColor" stroke-width="1"/>
                    <!-- Maximum-bound icon. -->
                    <line x1="32" y1="2" x2="32" y2="14" stroke="currentColor" stroke-width="1"/>
                    <line x1="32" y1="8" x2="27" y2="3" stroke="currentColor" stroke-width="1"/>
                    <line x1="32" y1="8" x2="27" y2="13" stroke="currentColor" stroke-width="1"/>
                </svg>
            </thermal-btn>
            
            <thermal-btn
                tooltip=${t$1("automaticrange")}
                @click=${this.handleAutoRangeClick}
                @mouseenter=${this.handleAutoRangeMouseEnter}
                @mouseleave=${this.handleHighlightMouseLeave}
                @focusin=${this.handleAutoRangeMouseEnter}
                @focusout=${this.handleHighlightMouseLeave}
                ?disabled=${this.autoValue === void 0}
                style="padding: 0 0.5em; display: flex; align-items: center; justify-content: center;"
            >
                <svg width="56" height="16" viewBox="0 0 56 16" fill="none" style="display: block;">
                    <!-- All bars sorted by X coordinate - background (slate color) -->
                    <rect x="2" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="4" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="6" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="8" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="10" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="12" y="9" width="2" height="5" fill="var(--thermal-slate)"/>
                    <rect x="14" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="16" y="11" width="2" height="3" fill="var(--thermal-slate)"/>
                    <rect x="18" y="6" width="2" height="8" fill="var(--thermal-slate)"/>
                    <rect x="20" y="2" width="2" height="12" fill="var(--thermal-slate)"/>
                    <rect x="22" y="3" width="2" height="11" fill="var(--thermal-slate)"/>
                    <rect x="24" y="1" width="2" height="13" fill="var(--thermal-slate)"/>
                    <rect x="26" y="2" width="2" height="12" fill="var(--thermal-slate)"/>
                    <rect x="28" y="4" width="2" height="10" fill="var(--thermal-slate)"/>
                    <rect x="30" y="8" width="2" height="6" fill="var(--thermal-slate)"/>
                    <rect x="32" y="10" width="2" height="4" fill="var(--thermal-slate)"/>
                    <rect x="34" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="36" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="38" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="40" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="42" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="44" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="46" y="11" width="2" height="3" fill="var(--thermal-slate)"/>
                    <rect x="48" y="12" width="2" height="2" fill="var(--thermal-slate)"/>
                    <rect x="50" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <rect x="52" y="13" width="2" height="1" fill="var(--thermal-slate)"/>
                    <!-- Highlighted section - foreground color (sorted by X) -->
                    <rect x="18" y="6" width="2" height="8" fill="var(--thermal-foreground)"/>
                    <rect x="20" y="2" width="2" height="12" fill="var(--thermal-foreground)"/>
                    <rect x="22" y="3" width="2" height="11" fill="var(--thermal-foreground)"/>
                    <rect x="24" y="1" width="2" height="13" fill="var(--thermal-foreground)"/>
                    <rect x="26" y="2" width="2" height="12" fill="var(--thermal-foreground)"/>
                    <rect x="28" y="4" width="2" height="10" fill="var(--thermal-foreground)"/>
                    <!-- Bottom line with offset -->
                    <line x1="17" y1="15.5" x2="31" y2="15.5" stroke="currentColor" stroke-width="1"/>
                </svg>
            </thermal-btn>
        </div>

        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], RegistryRangeForm.prototype, "stacked", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeForm.prototype, "min", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeForm.prototype, "max", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeForm.prototype, "from", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeForm.prototype, "to", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], RegistryRangeForm.prototype, "step", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], RegistryRangeForm.prototype, "availableSteps", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeForm.prototype, "inputValues", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], RegistryRangeForm.prototype, "isUpdatingFromRegistry", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeForm.prototype, "autoValue", void 0);
//#endregion
//#region src/controls/registry/RegistryTicksBar.ts
var RegistryTicksBar = class RegistryTicksBar extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.ticksRef = (0, lit_directives_ref_js.createRef)();
		this.ticksWidth = 0;
		this.placement = "top";
		this.minmax = void 0;
		this.ticks = [];
		this.containerRef = (0, lit_directives_ref_js.createRef)();
	}
	static {
		this.TICK_WIDTH = 40;
	}
	static {
		this.TICK_FIXED = 2;
	}
	connectedCallback() {
		super.connectedCallback();
		this.bindRegistry();
		this.minmax = this.boundRegistry?.minmax.value;
		this.ticksWidth = this.ticksRef.value?.clientWidth ?? 0;
		this.requestUpdate();
	}
	disconnectedCallback() {
		this.unbindRegistry();
		this.disconnectObserver();
		super.disconnectedCallback();
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (this.boundRegistry !== this.registryController?.registryObject && this.isConnected) {
			this.bindRegistry();
			this.minmax = this.boundRegistry?.minmax.value;
		}
		if (changedProperties.has("minmax") || changedProperties.has("ticksWidth")) this.calculateTicks(this.minmax, this.ticksWidth);
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		this.observeTicks();
	}
	/** Subscribes once to the current registry while connected, replacing the previous range listener. */
	bindRegistry() {
		const registry = this.registryController?.registryObject;
		if (!this.isConnected || registry === this.boundRegistry) return;
		this.unbindRegistry();
		this.boundRegistry = registry;
		registry?.minmax.addListener(this.UUID, (value) => {
			this.minmax = value;
		});
	}
	/** Removes the listener from the actual subscribed registry rather than the current context value. */
	unbindRegistry() {
		this.boundRegistry?.minmax.removeListener(this.UUID);
		this.boundRegistry = void 0;
	}
	/** Observes the rendered ticks container and restores observation after reconnecting. */
	observeTicks() {
		const ticks = this.isConnected ? this.ticksRef.value : void 0;
		if (ticks === this.observedTicks) return;
		this.disconnectObserver();
		if (!ticks) return;
		this.observedTicks = ticks;
		this.observer = new ResizeObserver((entries) => {
			if (!this.isConnected || this.observedTicks !== ticks) return;
			const entry = entries.find((entry) => entry.target === ticks);
			if (entry) this.ticksWidth = entry.contentRect.width;
		});
		this.observer.observe(ticks);
	}
	/** Releases observation without requiring the old node to remain in the Lit ref. */
	disconnectObserver() {
		this.observer?.disconnect();
		this.observer = void 0;
		this.observedTicks = void 0;
	}
	clamp(input, min, max) {
		return input < min ? min : input > max ? max : input;
	}
	map(current, in_min, in_max, out_min, out_max) {
		const mapped = (current - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
		return this.clamp(mapped, out_min, out_max);
	}
	calculateTicks(minmax, width) {
		if (minmax === void 0) this.ticks = [];
		else {
			const ticksPercentageBuffer = [0];
			const numTicks = Math.floor(width / RegistryTicksBar.TICK_WIDTH) - 2;
			const step = 100 / numTicks;
			for (let i = 1; i < numTicks; i++) ticksPercentageBuffer.push(step * i);
			ticksPercentageBuffer.push(100);
			this.ticks = ticksPercentageBuffer.map((percent) => this.calculateOneTick(minmax, percent)).filter((value) => value !== void 0);
		}
	}
	calculateOneTick(minmax, percent) {
		if (minmax === void 0) return;
		else return {
			percentage: percent,
			value: this.map(percent, 0, 100, minmax.min, minmax.max)
		};
	}
	static {
		this.styles = lit.css`

        .container {
            padding: 0 calc( var( --thermal-gap ) * .5 );
            height: var( --thermal-fs );
            
        }

        .skeleton {
            height: 100%;
            background: var( --thermal-slate-light );
        }

        .ready {
            .skeleton {
                display: none;
            }
        }

        .ticks {
            display: flex;
            justify-content: space-between;
            font-size: 10px;
            width: 100%;
            position: relative;
            color: var( --thermal-slate-dark );
            font-family: sans-serif;
            height: 1em;
        }

        .tick {

            position: relative;

        }

        .tick-marker {
            display: block;
            width: 1px;
            height: 10px;
            background: var(--thermal-slate);
        }

        .placement-top {
            margin-top: 10x;
            padding-bottom: var( --thermal-gap );
        }

        .placement-bottom {
            .tick-marker {
                height: 5px;
                background: currentcolor;
                position: absolute;
                top: 12px;
            }
        }

        .tick-value {

            position: absolute;
            width: 40px;
            left: -20px;
            text-align: center;
        
        }


    `;
	}
	render() {
		let highlightLeft = void 0;
		let highlightWidth = void 0;
		if (this.minmax && this.highlight) {
			const min = this.minmax.min;
			const minmax = this.minmax.max - min;
			highlightLeft = (this.highlight.from - min) / minmax * 100;
			highlightWidth = (this.highlight.to - min) / minmax * 100 - highlightLeft;
		}
		return lit.html`

            <div class="container ${this.minmax !== void 0 ? "ready" : "loading"} placement-${this.placement}" ${(0, lit_directives_ref_js.ref)(this.containerRef)}>

                <div class="skeleton" data-video-ignore></div>

                <div class="ticks" ${(0, lit_directives_ref_js.ref)(this.ticksRef)}>

                    ${highlightLeft !== void 0 && highlightWidth !== void 0 ? lit.html`<div class="highlight" style="position: absolute; top: 0px; height: 5px; left:${highlightLeft}%; width: ${highlightWidth}%; background-color: var(--thermal-foreground)"></div>` : lit.nothing}

                    ${this.ticks.map((tick) => {
			return lit.html`
                    <div class="tick" >
                        <div class="tick-marker"></div>
                        <div class="tick-value">
                            ${tick.value.toFixed(RegistryTicksBar.TICK_FIXED)}
                        </div>
                    </div>
                        `;
		})}

                </div>                

            </div>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], RegistryTicksBar.prototype, "ticksWidth", void 0);
__decorate([(0, _lit_context.consume)({
	context: registryHighlightContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], RegistryTicksBar.prototype, "highlight", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], RegistryTicksBar.prototype, "placement", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryTicksBar.prototype, "minmax", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], RegistryTicksBar.prototype, "ticks", void 0);
//#endregion
//#region src/controls/registry/RegistryRangeSlider.ts
var RegistryRangeSlider = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.height = null;
		this.heightStyle = null;
		this.loading = false;
		this.activeHandle = "from";
	}
	getClassName() {
		return "RangeSliderElement";
	}
	disconnectedCallback() {
		this.cancelDrag();
		super.disconnectedCallback();
	}
	willUpdate(changed) {
		super.willUpdate(changed);
		if (changed.has("height") || changed.has("heightStyle")) {
			const height = this.height?.trim();
			const style = document.createElement("div").style;
			if (height) style.height = height;
			const current = this.style.getPropertyValue("--_range-slider-attribute-height");
			if (height && style.height && !/^(auto|inherit|initial|unset|revert|revert-layer|min-content|max-content|fit-content|stretch|contain)$/i.test(height)) {
				if (current !== height) this.style.setProperty("--_range-slider-attribute-height", height);
			} else {
				if (current) this.style.removeProperty("--_range-slider-attribute-height");
				if (height && changed.has("height")) this.log("Invalid range slider height", { height: this.height });
			}
		}
		if ([
			"min",
			"max",
			"from",
			"to",
			"loading",
			"registryController"
		].some((key) => changed.has(key))) {
			this.cancelDrag();
			if (this.min !== void 0 && this.max !== void 0 && this.from !== void 0 && this.to !== void 0 && !this.values) this.log("Invalid range slider values", {
				min: this.min,
				max: this.max,
				from: this.from,
				to: this.to
			});
		}
	}
	get values() {
		const { min, max, from, to } = this;
		if (min === void 0 || max === void 0 || from === void 0 || to === void 0) return void 0;
		if (![
			min,
			max,
			from,
			to,
			max - min
		].every(Number.isFinite) || min > max || from < min || to > max || from > to) return void 0;
		return {
			min,
			max,
			from,
			to
		};
	}
	percent(value, values) {
		return values.max === values.min ? 0 : (value - values.min) / (values.max - values.min) * 100;
	}
	constrain(handle, value, values, range) {
		return handle === "from" ? {
			from: Math.max(values.min, Math.min(range.to, value)),
			to: range.to
		} : {
			from: range.from,
			to: Math.min(values.max, Math.max(range.from, value))
		};
	}
	commit(range) {
		this.cancelDrag();
		if (range.from === this.from && range.to === this.to) return;
		this.registryController.setRange(range.from, range.to);
		this.from = this.registryController.from;
		this.to = this.registryController.to;
	}
	cancelDrag() {
		const drag = this.drag;
		this.drag = void 0;
		this.draft = void 0;
		if (drag?.element.hasPointerCapture(drag.pointerId)) drag.element.releasePointerCapture(drag.pointerId);
	}
	pointerDown(event) {
		const values = this.values;
		if (!values || this.loading || values.min === values.max || this.drag || event.button !== 0) return;
		const track = event.currentTarget;
		const target = event.target;
		if (!(track instanceof HTMLElement) || !(target instanceof HTMLElement)) return;
		const rect = track.getBoundingClientRect();
		if (rect.width === 0) return;
		const pointerPercent = (event.clientX - rect.left) / rect.width * 100;
		const clickedHandle = target.closest("[data-handle]")?.dataset.handle;
		let handle;
		if (clickedHandle === "from" || clickedHandle === "to") handle = clickedHandle;
		else {
			const fromDistance = Math.abs(pointerPercent - this.percent(values.from, values));
			const toDistance = Math.abs(pointerPercent - this.percent(values.to, values));
			handle = fromDistance === toDistance ? this.activeHandle : fromDistance < toDistance ? "from" : "to";
		}
		event.preventDefault();
		this.activeHandle = handle;
		track.querySelector(`[data-handle="${handle}"]`)?.focus({ preventScroll: true });
		this.draft = {
			from: values.from,
			to: values.to
		};
		const offset = clickedHandle ? event.clientX - rect.left - this.percent(values[handle], values) / 100 * rect.width : 0;
		this.drag = {
			pointerId: event.pointerId,
			handle,
			offset,
			element: track,
			values,
			controller: this.registryController
		};
		track.setPointerCapture(event.pointerId);
		this.pointerMove(event);
	}
	pointerMove(event) {
		const drag = this.drag;
		const values = this.values;
		if (!drag || event.pointerId !== drag.pointerId) return;
		if (!values || !this.draft || this.loading || this.registryController !== drag.controller || values.min !== drag.values.min || values.max !== drag.values.max || values.from !== drag.values.from || values.to !== drag.values.to) {
			this.cancelDrag();
			return;
		}
		const rect = drag.element.getBoundingClientRect();
		if (rect.width === 0) return;
		const fraction = Math.max(0, Math.min(1, (event.clientX - rect.left - drag.offset) / rect.width));
		const value = fraction === 0 ? values.min : fraction === 1 ? values.max : values.min + fraction * (values.max - values.min);
		this.draft = this.constrain(drag.handle, value, values, this.draft);
	}
	pointerUp(event) {
		if (this.drag?.pointerId !== event.pointerId) return;
		this.pointerMove(event);
		const range = this.draft;
		if (range) this.commit(range);
		else this.cancelDrag();
	}
	pointerCancel(event) {
		if (this.drag?.pointerId === event.pointerId) this.cancelDrag();
	}
	keyDown(event, handle) {
		const values = this.values;
		if (!values || this.loading || values.min === values.max) return;
		let value;
		switch (event.key) {
			case "ArrowLeft":
				value = Number((values[handle] - (values.max - values.min) / 100).toPrecision(15));
				break;
			case "ArrowRight":
				value = Number((values[handle] + (values.max - values.min) / 100).toPrecision(15));
				break;
			case "ArrowUp":
			case "Home":
				value = values.min;
				break;
			case "ArrowDown":
			case "End":
				value = values.max;
				break;
			default: return;
		}
		event.preventDefault();
		event.stopPropagation();
		this.activeHandle = handle;
		this.commit(this.constrain(handle, value, values, values));
	}
	wheel(event, handle) {
		const values = this.values;
		if (!values || this.loading || values.min === values.max || event.deltaY === 0 || this.drag) return;
		event.preventDefault();
		event.stopPropagation();
		this.activeHandle = handle;
		const value = Number((values[handle] + Math.sign(event.deltaY) * (values.max - values.min) / 100).toPrecision(15));
		this.commit(this.constrain(handle, value, values, values));
	}
	renderHandle(handle, values, range) {
		const disabled = values.min === values.max;
		return lit.html`
            <div class="handle-position ${this.activeHandle === handle ? "active" : ""}"
                style=${(0, lit_directives_style_map_js.styleMap)({ left: `${this.percent(range[handle], values)}%` })}>
                <button type="button" class="handle" data-handle=${handle} role="slider"
                    aria-label=${this.t(handle === "from" ? "minimaltemperature" : "maximaltemperature")}
                    aria-orientation="horizontal"
                    aria-valuemin=${handle === "from" ? values.min : range.from}
                    aria-valuemax=${handle === "from" ? range.to : values.max}
                    aria-valuenow=${range[handle]}
                    aria-valuetext=${`${range[handle].toFixed(2)} \u00b0C`}
                    ?disabled=${disabled}
                    style=${(0, lit_directives_style_map_js.styleMap)({ background: handle === "from" ? this.palette?.data.pixels[0] : this.palette?.data.pixels[this.palette.data.pixels.length - 1] })}
                    @focus=${() => {
			this.activeHandle = handle;
		}}
                    @keydown=${(event) => this.keyDown(event, handle)}
                    @wheel=${(event) => this.wheel(event, handle)}>
                </button>
                <span class="tooltip" aria-hidden="true">${range[handle].toFixed(2)}</span>
            </div>`;
	}
	static {
		this.styles = lit.css`
        :host {
            display: block; box-sizing: content-box;
            --_range-slider-attribute-height: initial;
            height: var(--_range-slider-attribute-height, var(--thermal-range-slider-height, 15px));
            padding-bottom: max(0px, calc(var(--thermal-gap) - 15px));
            margin-bottom: -6px;
        }
        .container {
            height: 100%;
            padding: 0 calc(var(--thermal-gap) * .5);
            color: var(--thermal-slate-dark);
            font-size: 12px;
        }
        .slider-row { display: flex; align-items: center; height: 100%; }
        .track {
            position: relative; flex: 1; min-width: 0; height: 100%;
            background: var(--thermal-slate); cursor: pointer; touch-action: none;
        }
        .fill { position: absolute; height: 100%; pointer-events: none; }
        .handle-position { position: absolute; top: 0; height: 100%; z-index: 20; }
        .handle-position.active { z-index: 21; }
        .handle {
            position: absolute; top: 50%; transform: translate(-50%, -50%);
            box-sizing: border-box; width: 14px; height: calc(100% + 5px); padding: 0; border-radius: 0;
            border: 2px solid var(--thermal-primary); background: var(--thermal-background);
            box-shadow: 0 0 5px var(--thermal-primary); cursor: grab; touch-action: none;
        }
        .handle:hover, .handle:focus-visible { box-shadow: 0 0 10px var(--thermal-primary); }
        .handle:focus-visible { outline: 2px solid var(--thermal-primary); outline-offset: 2px; }
        .handle:active { cursor: grabbing; }
        .handle:disabled { cursor: default; }
        .tooltip {
            position: absolute; transform: translate(-50%, -50%); white-space: nowrap; pointer-events: none;
            top: calc(100% + 16.5px); min-width: 40px; height: 20px; line-height: 20px; text-align: center;
            padding: 0 3px; background: var(--thermal-slate-dark); color: var(--thermal-background);
            border: 1px solid var(--thermal-slate-dark); border-radius: 3px;
        }
        .tooltip::before {
            content: ""; position: absolute; top: -4px; left: calc(50% - 4px);
            width: 7px; height: 7px; transform: rotate(45deg);
            background: var(--thermal-slate-dark);
        }
        .skeleton { height: 100%; background: var(--thermal-slate); }
    `;
	}
	render() {
		const values = this.values;
		if (this.loading || !values) return lit.html`<div class="container loading" aria-busy=${this.loading}><div class="skeleton"></div></div><slot></slot>`;
		const range = this.draft ?? values;
		const left = this.percent(range.from, values);
		const right = this.percent(range.to, values);
		return lit.html`
            <div class="container ready">
                <div class="slider-row">
                    <div class="track"
                        @pointerdown=${this.pointerDown}
                        @pointermove=${this.pointerMove}
                        @pointerup=${this.pointerUp}
                        @pointercancel=${this.pointerCancel}
                        @lostpointercapture=${this.pointerCancel}
                        @wheel=${(event) => this.wheel(event, this.activeHandle)}>
                        <div class="fill" style=${(0, lit_directives_style_map_js.styleMap)({
			left: `${left}%`,
			width: `${right - left}%`,
			background: this.palette?.data.gradient
		})}></div>
                        ${this.renderHandle("from", values, range)}
                        ${this.renderHandle("to", values, range)}
                    </div>
                </div>
            </div>
            <slot></slot>`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], RegistryRangeSlider.prototype, "height", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	attribute: "style"
}), __decorateMetadata("design:type", Object)], RegistryRangeSlider.prototype, "heightStyle", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: registryMinContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Number)
], RegistryRangeSlider.prototype, "min", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: registryMaxContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Number)
], RegistryRangeSlider.prototype, "max", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: registryRangeFromContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Number)
], RegistryRangeSlider.prototype, "from", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: registryRangeToContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Number)
], RegistryRangeSlider.prototype, "to", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: managerPaletteContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], RegistryRangeSlider.prototype, "palette", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: registryLoadingContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], RegistryRangeSlider.prototype, "loading", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeSlider.prototype, "draft", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryRangeSlider.prototype, "activeHandle", void 0);
//#endregion
//#region src/controls/registry/RegistryHistogram.ts
var RegistryHistogram = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.histogram = [];
		this.height = "calc( var( --thermal-gap ) * 1.5 )";
		this.heightExpanded = "400px";
		this.expandable = false;
		this.expanded = false;
		this.loading = false;
		this.error = false;
	}
	getClassName() {
		return "HistogramElement";
	}
	connectedCallback() {
		super.connectedCallback();
		this.loading = this.registryObject.histogram.loading;
		this.histogram = this.registryObject.histogram.value;
		this.registryObject.histogram.addListener(this.UUID, (value) => {
			this.histogram = value;
		});
		this.registryObject.histogram.onCalculationStart.set(this.UUID, () => {
			this.loading = true;
			this.error = false;
		});
		this.registryObject.histogram.onCalculationEnd.set(this.UUID, (success) => {
			this.loading = false;
			this.error = !success;
		});
		this.registryObject.loading.addListener(this.UUID, (value) => {
			if (value === true) this.loading = true;
		});
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.registryObject.loading.removeListener(this.UUID);
		this.registryObject.histogram.removeListener(this.UUID);
		this.registryObject.histogram.onCalculationStart.delete(this.UUID);
		this.registryObject.histogram.onCalculationEnd.delete(this.UUID);
	}
	static {
		this.styles = lit.css`

        @keyframes spinner {
            0% {left: 0px; width: 0%;}
            50% {left: 25%; width: 50%;}
            100% {left: 100%; width: 0%;}
        }

        .container {
            padding: 0 calc( var( --thermal-gap ) * .5 );
            position: relative;

            .spinner {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: none;
                align-items: center;
                justify-content: center;
                

                span {
                    width: calc( 100% - var(--thermal-gap) );
                    height: 6px;
                    display: block;
                    position: relative;
                    overflow: hidden;
                    border-radius: 3px;

                    &::after {
                        content: "";
                        display: block;
                        background: var(--thermal-slate-dark);
                        position: absolute;
                        opacity: .2;
                        height: 100%;
                        animation-name: spinner;
                        animation-duration: 1s;
                        animation-iteration-count: infinite;
                        animation-timing-function: linear
                    }
                }

            }

            &.loading:not(.has-error) {

                .spinner {
                    display: flex;
                }

                .histogram {
                    opacity: .8;
                }
            }

        }

        .histogram {
            display: flex;
            width: 100%;
            background:  transparent;
            transition: opacity .3s ease-in-out;

            &.expandable {
                transition: all .2s ease-in-out;
                cursor: pointer;
                &:hover {
                    background: var(--thermal-background);
                }
            }
        }

        .histogram-bar {
            flex-grow: 1;
            position: relative;
            height: 100%;

            &:hover {
                .histogram-bar-inner {
                    background: var(--thermal-foreground);
                }
            }
        }

        .histogram-bar-inner {
            position: absolute;
            bottom: 0px;
            left: 0px;
            width: 100%;
            background: var(--thermal-slate-dark);
            transition: height .5s ease-in-out;
        }

        .error {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--thermal-slate-light);
            color: var(--thermal-slate);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 10px;
        }


    `;
	}
	render() {
		const isLoading = this.histogram.length > 0 && this.loading === false;
		const containerClasses = {
			"container": true,
			"ready": isLoading,
			"loading": !isLoading,
			"has-error": this.error === true,
			"is-ok": this.error !== true
		};
		const histogramClasses = {
			"histogram": true,
			"expandable": this.expandable === true
		};
		return lit.html`

            <div class="${(0, lit_directives_class_map_js.classMap)(containerClasses)}">

                <div class="${(0, lit_directives_class_map_js.classMap)(histogramClasses)}" style="height: ${this.expanded ? this.heightExpanded : this.height}" part="bg" @click=${() => {
			if (this.expandable === true) this.expanded = !this.expanded;
		}}>

                    ${this.histogram.map((item) => {
			return lit.html`
                            <div class="histogram-bar" data-height="${item.height}" data-percentage="${item.percentage}" data-count="${item.count}" data-from="${item.from}" data-to="${item.to}">
                                <div style="height: ${item.height}%" class="histogram-bar-inner"></div>
                            </div
                        `;
		})}

                </div>

                ${this.error === true ? lit.html`<div class="error">Unable to calculate the histogram</div>` : lit.nothing}

                <div class="spinner">
                    <span></span>
                </div>

            </div>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], RegistryHistogram.prototype, "histogram", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], RegistryHistogram.prototype, "height", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], RegistryHistogram.prototype, "heightExpanded", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], RegistryHistogram.prototype, "expandable", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], RegistryHistogram.prototype, "expanded", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], RegistryHistogram.prototype, "loading", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], RegistryHistogram.prototype, "error", void 0);
//#endregion
//#region src/controls/registry/RegistryRangeFullButton.ts
var RegistryRangeFullButton = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.buttonRef = (0, lit_directives_ref_js.createRef)();
	}
	connectedCallback() {
		super.connectedCallback();
		this.registryObject.minmax.addListener(this.UUID, () => this.setValue());
	}
	setValue() {
		const value = this.registryController.registryObject.minmax.value;
		if (value) this.value = `${value.min.toFixed(2)} — ${value.max.toFixed(2)} °C`;
		else this.value = void 0;
	}
	doAction() {
		this.registryObject.range.applyMinmax();
	}
	mouseenter() {
		if (this.registryObject.minmax.value !== void 0 && this.registryController) this.registryController.setHighlight({
			from: this.registryObject.minmax.value.min,
			to: this.registryObject.minmax.value.max
		});
	}
	mouseleave() {
		if (this.registryController) this.registryController.setHighlight(void 0);
	}
	render() {
		return lit.html`<thermal-btn 
    ${(0, lit_directives_ref_js.ref)(this.buttonRef)} 
    @click=${this.doAction} 
    @mouseenter="${this.mouseenter}" 
    @mouseleave="${this.mouseleave}"
    @focus="${this.mouseenter}"
    @blur="${this.mouseleave}"
    tooltip="${(0, lit_directives_if_defined_js.ifDefined)(this.value)}"
>${t$1("fullrange")}</thermal-btn>`;
	}
};
__decorate([(0, lit_decorators_state_js.state)(), __decorateMetadata("design:type", String)], RegistryRangeFullButton.prototype, "value", void 0);
//#endregion
//#region src/controls/registry/RegistryRangeAutoButton.ts
var RegistryRangeAutoButton = class extends AbstractRegistryConsumer {
	connectedCallback() {
		super.connectedCallback();
		this.registryObject.histogram.addListener(this.UUID, () => this.setValue());
	}
	setValue() {
		const value = this.registryController.registryObject.range.autoValue;
		if (value) this.value = `${value.from.toFixed(2)} — ${value.to.toFixed(2)} °C`;
		else this.value = void 0;
	}
	doAction() {
		this.registryObject.range.applyAuto();
	}
	onHighlight() {
		if (this.registryController.registryObject.range.autoValue) this.registryController.setHighlight(this.registryController.registryObject.range.autoValue);
	}
	onOut() {
		this.registryController.setHighlight(void 0);
	}
	render() {
		return lit.html`<thermal-btn 
            @click=${this.doAction}
            @mouseenter=${this.onHighlight}
            @mouseleave=${this.onOut}
            @onfocus=${this.onHighlight}
            @onblur=${this.onOut}
            tooltip="${(0, lit_directives_if_defined_js.ifDefined)(this.value)}"
        >${t$1("automaticrange")}</thermal-btn>`;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], RegistryRangeAutoButton.prototype, "value", void 0);
//#endregion
//#region src/controls/registry/RegistryRangeDisplay.ts
var RegistryRangeDisplay = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.fixed = 2;
		this.separator = "-";
	}
	render() {
		if (this.from === void 0 || this.to === void 0) return lit.nothing;
		return lit.html`
            <div>
                <span>${this.from?.toFixed(this.fixed)} °C</span>
                <span>${this.separator}</span>
                <span>${this.to?.toFixed(this.fixed)} °C</span>
            </div>
        `;
	}
};
__decorate([(0, _lit_context.consume)({
	context: registryRangeFromContext,
	subscribe: true
}), __decorateMetadata("design:type", Number)], RegistryRangeDisplay.prototype, "from", void 0);
__decorate([(0, _lit_context.consume)({
	context: registryRangeToContext,
	subscribe: true
}), __decorateMetadata("design:type", Number)], RegistryRangeDisplay.prototype, "to", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true,
	converter: {
		fromAttribute: (value) => {
			return Math.round(parseFloat(value));
		},
		toAttribute: (value) => {
			return value.toString();
		}
	}
}), __decorateMetadata("design:type", Number)], RegistryRangeDisplay.prototype, "fixed", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true
}), __decorateMetadata("design:type", String)], RegistryRangeDisplay.prototype, "separator", void 0);
//#endregion
//#region src/controls/registry/RegistryOpacitySlider.ts
var RegistryOpacitySlider = class extends AbstractRegistryConsumer {
	constructor(..._args) {
		super(..._args);
		this.containerRef = (0, lit_directives_ref_js.createRef)();
	}
	/** Handle user input events */
	handleUserChangeEvent(event) {
		const value = parseFloat(event.target.value);
		this.registryObject.opacity.imposeOpacity(value);
	}
	static {
		this.styles = lit.css`

        :host {
        }

        .thermal-opacity-handler {
            display: block;
            width: 100%;
            max-width: 100px;
            min-width: 75px;
            cursor: pointer;
            accent-color: var(--thermal-primary);
            
        }
        
        .thermal-opacity-container {
            display: flex;
            width: 100%;
            align-items: space-between;
            justify-content: space-between;
            color: var( --thermal-slate-dark );
            font-size: calc( var( --thermal-fs-sm ) * .7 );
            max-width: 100px;
            min-width: 75px;
        }
    
    `;
	}
	render() {
		return lit.html`
            <div ${(0, lit_directives_ref_js.ref)(this.containerRef)}>
                <input
                    id="handler"
                    class="thermal-opacity-handler"
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    .value=${(0, lit_directives_live_js.live)(String(this.value))}
                    @input="${this.handleUserChangeEvent}"
                />
                <div class="thermal-opacity-container">
                    <div>VIS</div>
                    <div>${this.value}</div>
                    <div>IR</div>
                </div>
            </div>
            <slot></slot>
        `;
	}
};
__decorate([(0, _lit_context.consume)({
	context: registryOpacityContext,
	subscribe: true
}), __decorateMetadata("design:type", Number)], RegistryOpacitySlider.prototype, "value", void 0);
//#endregion
//#region src/controls/group/GroupChartElement.ts
/**
* @license
* Copyright 2014-2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
var GroupChartElement = class extends AbstractGroupConsumer {
	constructor(..._args) {
		super(..._args);
		this.instances = [];
		this.on = false;
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		this.groupObject.files.addListener(this.UUID, () => {
			this.groupObject.analysisGraph.turnOn();
		});
		this.groupObject.analysisGraph.addListener(this.UUID, (value) => {
			if (value !== void 0) {
				this.data = value.data;
				this.colors = value.colors;
				this.on = true;
			} else {
				this.data = void 0;
				this.colors = void 0;
				this.on = false;
			}
		});
	}
	static {
		this.styles = lit.css`
    
        .wrapper {
            transition: all 0.3s ease-in-out;
            width: 100%;
            overflow: hidden;
        }

        .on {
            height: 300px;
            border-bottom: 1px solid var( --thermalforeground );
        }

        .off {
            height: 0px;
        }

    `;
	}
	download() {
		const svg = this.shadowRoot?.querySelectorAll("google-chart");
		console.log(svg);
	}
	render() {
		return lit.html`
            <div class="wrapper ${this.on ? "on" : "off"}">

                ${this.on === true ? lit.html`
                    <google-chart 
                        .data=${this.data} 
                        .options=${{
			colors: this.colors,
			legend: { position: "bottom" },
			hAxis: { title: "Time" },
			vAxis: { title: "Temperature °C" },
			chartArea: { width: "90%" }
		}}
                        type="line"
                        width="100%"
                        style="width: 100%;height: 300px"
                    ></google-chart>
                ` : lit.nothing}
                
            </div>
        `;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], GroupChartElement.prototype, "instances", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", typeof NodeJS === "undefined" || typeof NodeJS.Timeout === "undefined" ? Object : NodeJS.Timeout)], GroupChartElement.prototype, "timeout", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], GroupChartElement.prototype, "data", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], GroupChartElement.prototype, "colors", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupChartElement.prototype, "on", void 0);
//#endregion
//#region src/controls/group/GroupAnalysisSyncButton.ts
var GroupAnalysisSyncButton = class extends AbstractGroupConsumer {
	constructor(..._args) {
		super(..._args);
		this.on = false;
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.on) {
			const id = this.UUID + "__initial";
			this.groupObject.files.addListener(id, (value) => {
				if (value.length > 0) {
					this.groupObject.analysisSync.turnOn(value[0]);
					this.groupObject.files.removeListener(id);
				}
			});
		} else this.on = this.groupObject.analysisSync.value;
		this.groupObject.analysisSync.addListener(this.UUID, (value) => {
			this.on = value;
		});
		this.addEventListener("click", () => {
			this.toggle();
		});
	}
	turnOn() {
		if (this.groupObject.files.value.length > 0) this.groupObject.analysisSync.turnOn(this.groupObject.files.value[0]);
	}
	turnOff() {
		this.groupObject.analysisSync.turnOff();
	}
	toggle() {
		if (this.on) this.turnOff();
		else this.turnOn();
	}
	static {
		this.styles = lit.css`
    
        :host {
            font-size: var(--thermal-fs);
            cursor: pointer;
        }

        :host(:hover) {
            span {

            }

        }

        :host([on=true]) {
            span i {
                background: var(--thermal-primary);
            }
        }

        :host([on=false]) {
            span i {
                background: var(--thermal-slate);
            }
        }

        span {
            transition: all .3s ease-in-out;
            display: inline-block;
            width: .8em;
            height: .8em;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            position: relative;
            overflow: hidden;
        }

        i {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 2px solid var(--thermal-background);
            box-sizing: border-box;
        }

        input {
            display: none;
        }

        div {
            font-size: .9em;
            pointer-events: visible;
            display: inline-block;
        }
    
    `;
	}
	render() {
		return lit.html`  
        <span><i></i></span>      
        <div>${t$1("analysissync")}</div>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], GroupAnalysisSyncButton.prototype, "on", void 0);
//#endregion
//#region src/controls/group/GroupDownloadDropdown.ts
var GroupDownloadDropdown = class extends AbstractGroupConsumer {
	static {
		this.styles = lit.css`
        thermal-btn {
            text-align: left;
        }
    `;
	}
	render() {
		const png = this.configController?.settings.export.png;
		const groupSettings = this.configController?.settings.export.group;
		const dropdownClass = this.classList.contains("small") ? "small" : "";
		return lit.html`
        
            <thermal-dropdown class="download ${dropdownClass}" .variant=${this.variant} .icon=${this.icon} .iconStyle=${this.iconStyle}>
            
                <span slot="invoker">${t$1("download")}</span>
            
                <thermal-btn 
                    slot="option" 
                    pre="ZIP" 
                    @click=${() => this.groupObject.files.downloadAllFiles()}
                    tooltip=${t$1("downloadoriginalfileshint")}
                    tooltip-placement="right"
                >
                    ${t$1("downloadoriginalfiles")}
                </thermal-btn>

                <thermal-btn 
                    slot="option" 
                    pre="PNG" 
                    @click=${() => this.groupObject.forEveryInstance((instance) => instance.export.downloadPng())}
                    tooltip=${t$1("pngofindividualimageshint")}
                    tooltip-placement="right"
                >
                    ${t$1("pngofindividualimages")}
                </thermal-btn>

                <thermal-btn 
                    slot="option"
                    pre="PNG" 
                    @click=${() => this.groupObject.analysisSync.png.downloadPng({
			columns: groupSettings?.columns ?? 3,
			showGroupName: groupSettings?.groupName ?? false,
			fontSize: png?.fontSize ?? 12,
			showAnalysis: png?.analyses ?? true,
			showFileDate: png?.fileDate ?? true,
			showFileName: png?.fileName ?? false,
			showThermalScale: png?.thermalScale ?? true,
			width: png?.width ?? 800
		})}
                    tooltip="${t$1("pngofentiregrouphint")}"
                    tooltip-placement="right"
                >
                    ${t$1("pngofentiregroup")}
                </thermal-btn>

                <thermal-btn 
                    slot="option" 
                    pre="CSV" 
                    @click=${() => {
			this.groupObject.analysisSync.csv.downloadAsCsv();
		}}
                    tooltip=${t$1("csvofanalysisdatahint")}
                    tooltip-placement="right"
                >
                    ${t$1("csvofanalysisdata")}
                </thermal-btn>
            
            </thermal-dropdown>
        
        `;
	}
};
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: configContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], GroupDownloadDropdown.prototype, "configController", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], GroupDownloadDropdown.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], GroupDownloadDropdown.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], GroupDownloadDropdown.prototype, "variant", void 0);
//#endregion
//#region src/controls/group/GroupDownloadButtons.ts
var GroupDownloadButtons = class extends AbstractGroupConsumer {
	static {
		this.styles = lit.css`

        :host {
        
            display: flex;
            flex-direction: column;
            gap: 5px;

        }

        button.default {
            font-size: calc( var(--thermal-fs) * .8 );
            color: var(--thermal-foreground);
            border-color: var(--thermal-slate);
            border-style: solid;
            border-width: 1px;
            border-radius: var( --thermal-radius );
            background-color: var(--thermal-slate-light);
            white-space: preserve nowrap;
            &:hover {
                cursor: pointer;
                background: var(--thermal-background);
            }
        }
    
    `;
	}
	render() {
		const png = this.configController?.settings.export.png;
		const group = this.configController?.settings.export.group;
		return lit.html`
        
                <button class="default" @click=${() => this.groupObject.files.downloadAllFiles()}>${t$1("downloadoriginalfiles")}</button>
            
                <button class="default" @click=${() => this.groupObject.forEveryInstance((instance) => instance.export.downloadPng())}>${t$1("pngofindividualimages")}</button>
            
            
                <button class="default" @click=${() => this.groupObject.analysisSync.png.downloadPng({
			columns: group?.columns,
			showAnalysis: png?.analyses,
			showFileDate: png?.fileDate,
			showFileName: png?.fileName,
			showThermalScale: png?.thermalScale,
			showGroupName: group?.groupName,
			label: this.label,
			fontSize: png?.fontSize
		})}>${t$1("pngofentiregroup")}</button>
            
                <button class="default" @click=${() => {
			this.groupObject.analysisSync.csv.downloadAsCsv();
		}}>${t$1("csvofanalysisdata")}</button>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], GroupDownloadButtons.prototype, "label", void 0);
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: configContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], GroupDownloadButtons.prototype, "configController", void 0);
//#endregion
//#region src/controls/group/AbstractGroupDropin.ts
var AbstractGroupDropin = class extends AbstractGroupConsumer {
	connectedCallback() {
		super.connectedCallback();
		(0, public_ip.publicIpv4)().then((ip) => this.ip = ip);
	}
	_getUserInfo() {
		return {
			ip: this.ip,
			userAgent: window.navigator.userAgent,
			windowWidth: window.innerWidth,
			windowHeight: window.innerHeight,
			time: (/* @__PURE__ */ new Date()).getTime()
		};
	}
	emitMultipleUpload(fileNames) {
		const event = new CustomEvent("multiple-upload", {
			bubbles: true,
			cancelable: false,
			detail: {
				...this._getUserInfo(),
				fileNames
			}
		});
		this.dispatchEvent(event);
	}
	emitSingleUpload(fileName, fileSize) {
		const event = new CustomEvent("uploaded", {
			bubbles: true,
			cancelable: false,
			detail: {
				...this._getUserInfo(),
				fileName,
				fileSize
			}
		});
		this.dispatchEvent(event);
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AbstractGroupDropin.prototype, "ip", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Function }), __decorateMetadata("design:type", Function)], AbstractGroupDropin.prototype, "onDrop", void 0);
//#endregion
//#region src/controls/group/GroupDropinElement.ts
var GroupDropinElement = class extends AbstractGroupDropin {
	constructor(..._args) {
		super(..._args);
		this.container = (0, lit_directives_ref_js.createRef)();
		this.hover = false;
		this.uploading = false;
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		if (this.container.value !== void 0) {
			const listener = this.managerObject.service.handleDropzone(this.container.value, true);
			listener.onMouseEnter.add(this.UUID, () => {
				console.log("mouseenter");
				this.hover = true;
			});
			listener.onMouseLeave.add(this.UUID, () => {
				console.log("mouseleave");
				this.hover = false;
			});
			listener.onDrop.set(this.UUID, () => {
				this.uploading = true;
			});
			listener.onProcessingEnd.add(this.UUID, async (results) => {
				if (this.onDrop !== void 0) await this.onDrop(results);
				this.uploading = false;
			});
		}
	}
	static {
		this.styles = lit.css`

        .container {
            color: var(--thermal-foreground);
        }

        .dropin {
            width: 100%;
            aspect-ratio: 4 / 3;
            max-height: 700px;
            transition: background .5s ease-in-out;
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            cursor: pointer;
            background: var( --thermal-slate );
            position: relative;
            overflow: hidden;

        }

        .dropin-gradient {
            position: absolute;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, var(--thermal-slate-light) 0%, var(--thermal-slate) 100%);
            opacity: 0;
            transition: opacity .5s ease-in-out;
        }

        .hover,
        .dropin:hover {
            .dropin-gradient {
                opacity: .5;
            }
        }

        .dropin-content {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var( --thermal-gap );
            transition: all .3s ease-in-out;
        }

        @-webkit-keyframes action {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }

        @keyframes action {
            0% { transform: translateY(0); }
            100% { transform: translateY(-10px); }
        }

        .dropin-uploading {
            transition: all .3s ease-in-out;
            position: absolute;
            
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            display: flex;
            align-items: center;
            justify-content: center;

            transform: translateY(100px);
            opacity: 0;

            color: var(--thermal-foreground);

            svg {
                width: 100px;
                -webkit-animation: action .5s infinite  alternate;
                animation: action .5s infinite  alternate;
            }

        }

        .dropin.uploading {
            .dropin-content {
                opacity: 0;
                transform: translateY( -100px );
            }
            .dropin-uploading {
                opacity: 1;
                transform: translateY(0);
            }
        }

    `;
	}
	render() {
		const dropinClasses = {
			dropin: true,
			hover: this.hover,
			uploading: this.uploading
		};
		return lit.html`

            <div class="container">
            
                <div ${(0, lit_directives_ref_js.ref)(this.container)} class="${(0, lit_directives_class_map_js.classMap)(dropinClasses)}">

                    <div class="dropin-gradient"></div>

                    <div class="dropin-content">
                        <div>${t$1("dragorselectfile")}</div>
                        <thermal-btn 
                            variant="foreground"
                            icon="upload"
                            iconStyle="micro"
                        >${t$1("selectfile")}</thermal-btn>
                    </div>

                    <div class="dropin-uploading">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
                        </svg>
                    </div>
                
                </div>

            </div>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], GroupDropinElement.prototype, "container", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupDropinElement.prototype, "hover", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupDropinElement.prototype, "uploading", void 0);
//#endregion
//#region src/controls/group/GroupDropinInput.ts
var GroupDropinInputElement = class extends AbstractGroupDropin {
	constructor(..._args) {
		super(..._args);
		this.container = (0, lit_directives_ref_js.createRef)();
		this.hover = false;
		this.uploading = false;
	}
	static {
		this.styles = lit.css`

        .container {
            display: none;
        }

        .dropin {
            background: var( --thermal-slate );
            width: 100%;
            aspect-ratio: 4 / 3;
        }

        .hover {
            background: var( --thermal-slate-light );
        }

        svg {
            width: 1em;
        }



.lds-ellipsis,
.lds-ellipsis div {
  box-sizing: border-box;
}
.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 21px;
  height: 1em;
}
.lds-ellipsis div {
  position: absolute;
  top: 50%;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: currentColor;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.lds-ellipsis div:nth-child(1) {
  left: 0px;
  animation: lds-ellipsis1 0.6s infinite;
}

.lds-ellipsis div:nth-child(2) {
  left: 7px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(3) {
  left: 14px;
  animation: lds-ellipsis2 0.6s infinite;
}

.lds-ellipsis div:nth-child(4) {
  left: 21px;
  animation: lds-ellipsis3 0.6s infinite;
}

@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(0px, 0);
  }
}


    
    `;
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		if (this.container.value !== void 0) {
			this.listener = this.managerObject.service.handleDropzone(this.container.value, true);
			this.listener.onMouseEnter.add(this.UUID, () => {
				this.hover = true;
			});
			this.listener.onMouseLeave.add(this.UUID, () => {
				this.hover = false;
			});
			this.listener.onDrop.set(this.UUID, () => {
				this.uploading = true;
			});
			this.listener.onProcessingEnd.add(this.UUID, async (results) => {
				if (this.onDrop !== void 0) await this.onDrop(results);
				this.uploading = false;
			});
		}
	}
	render() {
		const title = this.uploading === false ? t$1("uploadafile") : lit.html`<div class="lds-ellipsis">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>`;
		return lit.html`
            <thermal-btn 
              icon="${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}"
              iconStyle="${(0, lit_directives_if_defined_js.ifDefined)(this.iconStyle)}"
              tooltip="${(0, lit_directives_if_defined_js.ifDefined)(this.tooltip)}"
              variant="${(0, lit_directives_if_defined_js.ifDefined)(this.variant)}"
            @click="${() => {
			if (this.listener) this.listener.openFileDialog(true);
		}}"><slot>${title}</slot></thermal-btn>

            <div class="container">
            
                <div ${(0, lit_directives_ref_js.ref)(this.container)}></div>

            </div>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], GroupDropinInputElement.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], GroupDropinInputElement.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], GroupDropinInputElement.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], GroupDropinInputElement.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], GroupDropinInputElement.prototype, "container", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupDropinInputElement.prototype, "hover", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupDropinInputElement.prototype, "uploading", void 0);
//#endregion
//#region src/controls/file/buttons/AbstractFileButton.ts
var AbstractFileButton = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.size = "sm";
		this.plain = false;
		this.ref = (0, lit_directives_ref_js.createRef)();
		this.handleMouseOver = (event) => {
			if (!this.isWithinButton(event.relatedTarget)) this.enter();
		};
		this.handleMouseOut = (event) => {
			if (!this.isWithinButton(event.relatedTarget)) this.leave();
		};
		this.handleFocusIn = (event) => {
			if (!this.isWithinButton(event.relatedTarget)) this.enter();
		};
		this.handleFocusOut = (event) => {
			if (!this.isWithinButton(event.relatedTarget)) this.leave();
		};
	}
	onFailure() {}
	isWithinButton(target) {
		return target instanceof Node && (this.contains(target) || this.renderRoot.contains(target));
	}
	static {
		this.styles = lit.css`
slot {
    display: content;
}`;
	}
	render() {
		return lit.html`<slot 
    @click=${this.action} 
    @mouseover=${this.handleMouseOver}
    @mouseout=${this.handleMouseOut}
    @focusin=${this.handleFocusIn}
    @focusout=${this.handleFocusOut}
    ${(0, lit_directives_ref_js.ref)(this.ref)}
>
    <thermal-btn 
        variant=${this.variant || "default"}
        size=${this.size || "sm"}
        ?plain=${this.plain}
        class="default"
        tooltip=${(0, lit_directives_if_defined_js.ifDefined)(this.tooltip)}
        icon=${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}
        iconStyle=${(0, lit_directives_if_defined_js.ifDefined)(this.iconStyle)}
    >${this.getDefaultLabel()}</thermal-btn>
</slot>`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: false
}), __decorateMetadata("design:type", Object)], AbstractFileButton.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], AbstractFileButton.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], AbstractFileButton.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], AbstractFileButton.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Boolean }), __decorateMetadata("design:type", Boolean)], AbstractFileButton.prototype, "plain", void 0);
//#endregion
//#region src/controls/group/GroupRangePropagator.ts
var GroupRangePropagatorElement = class extends AbstractGroupConsumer {
	static {
		this.styles = AbstractFileButton.styles;
	}
	connectedCallback() {
		super.connectedCallback();
		this.onmouseenter = () => {
			if (this.groupObject && this.groupObject.minmax.value && this.registryController) this.registryController.setHighlight({
				from: this.groupObject.minmax.value.min,
				to: this.groupObject.minmax.value.max
			});
		};
		this.onmouseleave = () => {
			if (this.registryController) this.registryController.setHighlight(void 0);
		};
		this.onclick = () => {
			if (this.groupObject && this.groupObject.minmax.value) this.groupObject.registry.range.imposeRange({
				from: this.groupObject.minmax.value.min,
				to: this.groupObject.minmax.value.max
			});
		};
		this.groupObject.minmax.addListener(this.UUID, () => this.setValue());
	}
	setValue() {
		const value = this.groupObject.minmax.value;
		if (value) this.value = `${value.min.toFixed(2)} — ${value.min.toFixed(2)} °C`;
		else this.value = void 0;
	}
	render() {
		return lit.html`
            <slot>
                <thermal-btn 
                    class="default"
                    icon="range"
                    iconStyle="solid"
                    tooltip="${(0, lit_directives_if_defined_js.ifDefined)(this.value)}"
                >${t$1("range").toLowerCase()}</thermal-btn>
            </slot>
        `;
	}
};
__decorate([(0, lit_decorators_state_js.state)(), __decorateMetadata("design:type", String)], GroupRangePropagatorElement.prototype, "value", void 0);
//#endregion
//#region src/utils/timelineTicks.ts
/**
* Format data into a tick value
*/
const tick = (ms, duration, type) => ({
	ms,
	percent: ms / duration * 100,
	type,
	label: (0, date_fns.format)(ms, "m:ss")
});
/**
* Take a minute interval, divide it into a given number of segments and return array of `Tick` objects:
* - any number of TICK.MINOR for seconds
* - one last TICK.MAJOR for minute end
* All ticks are returned only when they are smaller than the overall duration.
*/
const processTickMinute = (from, to, count, duration) => {
	const ticks = [];
	let i = 1;
	const partial = (to - from) / count;
	while (i < count) {
		const value = from + i * partial;
		if (value < duration) ticks.push(tick(value, duration, "minor"));
		i += 1;
	}
	if (to < duration) ticks.push(tick(to, duration, "major"));
	return ticks;
};
const minute = 6e4;
const tickWidth = 50;
const tickPointerHeight = 3;
const calculateTicks = (width, duration) => {
	const ticksPerMinuteRaw = Math.floor(width / tickWidth) / Math.floor(duration / 6e4);
	let ticksPerMinute = 2;
	if (ticksPerMinuteRaw >= 2) ticksPerMinute = 4;
	if (ticksPerMinuteRaw >= 6) ticksPerMinute = 6;
	if (ticksPerMinuteRaw >= 12) ticksPerMinute = 12;
	if (ticksPerMinuteRaw >= 30) ticksPerMinute = 30;
	const ticks = [];
	let from = 0;
	let to = minute;
	while (from < duration) {
		processTickMinute(from, to, ticksPerMinute, duration).forEach((tick) => ticks.push(tick));
		from += minute;
		to += minute;
	}
	ticks.push(tick(0, duration, "bound"));
	ticks.push(tick(duration, duration, "bound"));
	return ticks;
};
const renderTick = (tick) => {
	return lit.html`<div
        class="tick tick-${tick.type}"
        style="left: ${tick.percent}%;"
    >
        <div class="tick-pointer"></div>
        <div class="tick-label">${tick.label}</div>
    </div>`;
};
const renderPointer = (percent, label, type) => {
	return lit.html`<div 
        class="indicator-cursor indicator-cursor__${type}"
        style="left: ${percent}%;"
        data-video-rerender
    >
        <div class="indicator-cursor-arrow"></div>
        <div class="indicator-cursor-label">${label}</div>
    </div>`;
};
const renderTicks = (duration, ticks, currentMs, pointerMs) => {
	const currentPercent = currentMs / duration * 100;
	const pointerPercent = pointerMs !== void 0 ? pointerMs / duration * 100 : void 0;
	return lit.html`<div class="ticks">
        
        ${ticks.map(renderTick)}

        ${renderPointer(currentPercent, (0, date_fns.format)(currentMs, "m:ss:SSS"), "primary")}

        ${pointerMs !== void 0 && pointerPercent !== void 0 ? renderPointer(pointerPercent, (0, date_fns.format)(pointerMs, "m:ss:SSS"), "pointer") : lit.nothing}

    </div>`;
};
const ticksCss = lit.css`

    :host {

            --tick-color: var( --thermal-slate );
            --tick-opacity: 1;

            --cursor-color: var( --thermal-primary );
            --cursor-bg: var( --thermal-background );

            --fs-sm: calc( var(--thermal-fs) * .7 );

    }

    .indicator-cursor {
        position: absolute;
        width: 0px;
        right: 0;
        font-size: var( --fs-sm );
        z-index: 11;        
    }

        .indicator-cursor__primary {
            --cursor-bg: var( --thermal-primary );
            --cursor-color: white;
        }

        .indicator-cursor__pointer {
            --cursor-bg: var( --thermal-foreground );
            --cursor-color: white;

            .indicator-cursor-arrow {
                position: absolute;
                top: calc( var( --thermal-fs ) * -1 - 6px);
            }

            .indicator-cursor-label {
                position: absolute;
                top: calc( var( --thermal-fs ) * -2 - 3px );
            }
        }

        .indicator-cursor-arrow {
            position: relative;
            width: 6px;
            height: 6px;
            content: "";
            background: var( --cursor-bg );
            left: -4px;
            rotate: 45deg;
        }

        .indicator-cursor-label {
            position: relative;
            top: -3px;
            width: ${tickWidth}px;
            left: -${tickWidth / 2}px;
            background: var( --cursor-bg );
            color: var(--cursor-color);
            text-align: center;
        }

        .ticks {
            width: 100%;
            height: calc( var(--thermal-fs) + ${tickPointerHeight}px);
            position: relative;
        }


        .ticks-horizontal-indent {
            padding-left: ${tickWidth / 2}px;
            padding-right: ${tickWidth / 2}px;
            box-sizing: border-box;
            width: 100%;
        }

        .tick {
            position: absolute;
            width: 0;
            color: var( --tick-color );
            opacity: var( --tick-opacity );
            font-size: var( --fs-sm );
        }

        .tick-bound {

            --tick-color: var( --thermal-foreground );

            .tick-label {
                background: var(--thermal-slate-dark);
                color: var(--thermal-background);
                position: relative;
                top: -${tickPointerHeight}px;
            }

            .tick-pointer {
                width: ${6}px;
                height: ${6}px;
                background: var( --thermal-slate-dark );
                position: relative;
                left: -${tickPointerHeight}px;
                rotate: 45deg;
            }
            
        }

    .tick-major {
        --tick-color: var( --thermal-slate-dark );
    }

    .tick-minor {
        --tick-color: var( --thermal-slate );
    }


    .tick-pointer {
            height: ${tickPointerHeight}px;
            width: 1px;
            content: "";
            background-color: currentcolor;
    }

    .tick-label {
            width: ${tickWidth}px;
            position: relative;
            left: -${tickWidth / 2}px;
            text-align: center;
            color: currentcolor;
    }

    

`;
//#endregion
//#region src/controls/group/GroupTimeline.ts
var GroupTimelineElement = class extends AbstractGroupConsumer {
	constructor(..._args) {
		super(..._args);
		this.ms = 0;
		this.playing = false;
		this.instances = [];
		this.has = false;
		this.ticks = [];
		this.timelineRef = (0, lit_directives_ref_js.createRef)();
		this.indicatorRef = (0, lit_directives_ref_js.createRef)();
	}
	static {
		this.TICK_WIDTH = 50;
	}
	static {
		this.TICK_POINTER_HEIGHT = 3;
	}
	connectedCallback() {
		super.connectedCallback();
		this.groupObject.registry.batch.onBatchComplete.set(this.UUID, this.onRegistryBatchEnded.bind(this));
		this.groupObject.files.addListener(this.UUID, (value) => {
			if (this.listener !== void 0) clearTimeout(this.listener);
			this.listener = setTimeout(async () => {
				this.onRegistryBatchEnded(value);
			}, 0);
		});
		this.groupObject.playback.addListener(this.UUID, (value) => this.ms = value);
		this.groupObject.playback.onPlayingStatusChange.set(this.UUID, (value) => this.playing = value);
		this.groupObject.playback.onHasAnyCallback.set(this.UUID, (value) => this.has = value);
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("ms")) {
			if (this.ms !== void 0) {
				if (this.ms !== this.groupObject.playback.value) this.groupObject.playback.setValueByRelativeMs(this.ms);
				if (this.indicatorRef.value) this.indicatorRef.value.style.width = this.msToPercent(this.ms) + "%";
			}
		}
	}
	onRegistryBatchEnded(results) {
		let length = 0;
		this.instances = results.filter((result) => {
			if (result instanceof _labirthermal_core.ThermalFileFailure) return false;
			return result.group.id === this.groupObject.id;
		});
		this.instances.forEach((result) => {
			if (result.timeline.duration > length) length = result.timeline.duration;
		});
		this.longestDurationInMs = length;
		setTimeout(() => {
			const timeline = this.getTimelineElement();
			if (timeline && this.longestDurationInMs !== void 0) {
				this.calculateTicks(timeline.clientWidth, this.longestDurationInMs);
				new ResizeObserver((entries) => {
					const e = entries[0];
					if (this.longestDurationInMs) this.calculateTicks(e.contentRect.width, this.longestDurationInMs);
				}).observe(timeline);
			}
		}, 0);
	}
	calculateTicks(width, duration) {
		this.ticks = calculateTicks(width, duration);
	}
	forEveryAffectedInstance(fn) {
		this.instances.forEach(fn);
	}
	percentToMs(percent) {
		if (this.longestDurationInMs === void 0) return;
		return Math.floor(this.longestDurationInMs * (percent / 100));
	}
	msToPercent(ms) {
		if (this.longestDurationInMs === void 0) return;
		return ms / this.longestDurationInMs * 100;
	}
	getValueFromEvent(event) {
		const percent = event.layerX / event.target.clientWidth * 100;
		return {
			percent,
			ms: this.percentToMs(percent)
		};
	}
	handlePlayButtonClick() {
		if (this.groupObject.playback.playing) this.groupObject.playback.stop();
		else this.groupObject.playback.play();
	}
	handleTimelineClick(event) {
		const percent = event.layerX / event.target.clientWidth * 100;
		const ms = this.percentToMs(percent);
		if (ms) this.ms = ms;
	}
	handleTimelineEnter(event) {
		const { ms } = this.getValueFromEvent(event);
		this.pointerMs = ms;
	}
	handleTimelineMove(event) {
		const { ms } = this.getValueFromEvent(event);
		this.pointerMs = ms;
	}
	handleTimelineLeave() {
		this.pointerMs = void 0;
	}
	static {
		this.styles = lit.css`


        :host {

            --tick-color: var( --thermal-slate );
            --tick-opacity: 1;

            --cursor-color: var( --thermal-primary );
            --cursor-bg: var( --thermal-background );

            --fs-sm: calc( var(--thermal-fs) * .7 );

        }

        .container {

            padding-top: calc( var(--thermal-fs) + 6px);

        }

        .timeline {
            width: 100%;
            height: var( --thermal-fs );
            position: relative;
            cursor: pointer;
            box-sizing: border-box;
        }

        .background {
            width: 100%;
            height: 100%;
            background-color: var( --thermal-slate );
            pointer-events: none;
        }

        .indicator {
            height: 100%;
            position: absolute;
            content:"";
            top: 0;
            left: 0;
            background-color: var( --thermal-primary );
            pointer-events: none;
        }


        ${ticksCss}
    
    `;
	}
	getTimelineElement() {
		return this.renderRoot.querySelector(".timeline");
	}
	render() {
		if (this.has === false) return lit.nothing;
		return lit.html`<div class="container ticks-horizontal-indent">

            <div 
                class="timeline" 
                ${(0, lit_directives_ref_js.ref)(this.timelineRef)}
                @click=${(event) => this.handleTimelineClick(event)}
                @mouseenter=${this.handleTimelineEnter}
                @mouseleave=${this.handleTimelineLeave}
                @mousemove=${this.handleTimelineMove}
            >
                <div class="background"></div>
                <div class="indicator" ${(0, lit_directives_ref_js.ref)(this.indicatorRef)}></div>
            </div>

            ${this.longestDurationInMs !== void 0 ? renderTicks(this.longestDurationInMs, this.ticks, this.ms, this.pointerMs) : lit.nothing}

        </div>`;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], GroupTimelineElement.prototype, "longestDurationInMs", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], GroupTimelineElement.prototype, "ms", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], GroupTimelineElement.prototype, "pointerMs", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupTimelineElement.prototype, "playing", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], GroupTimelineElement.prototype, "instances", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], GroupTimelineElement.prototype, "has", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], GroupTimelineElement.prototype, "ticks", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", typeof ReturnType === "undefined" ? Object : ReturnType)], GroupTimelineElement.prototype, "listener", void 0);
//#endregion
//#region src/controls/file/FileCanvas.ts
/**
* The component rendering the file canvas through `@labirthermal/core` functionality.
* 
* Extends `AbstractFileConsumer`, therefore needs to be in a webcomponent providing the necessary contexts.
* 
* @package @labirthermal/webcomponents
* @author Jan Jáchim <jachim@ntc.zcu.cz>
*/
var FileCanvasElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.container = (0, lit_directives_ref_js.createRef)();
		this.prefersGpu = true;
	}
	onInstanceCreated() {
		this.requestUpdate();
	}
	onFailure() {}
	connectedCallback() {
		super.connectedCallback();
		this.requestUpdate();
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (!this.isConnected || !this.container.value) return;
		if (this.mountedInstance !== this.file) {
			this.unmountInstance();
			if (this.file) {
				this.file.setPreferWebGl(this.prefersGpu);
				this.file.mountToDom(this.container.value);
				this.mountedInstance = this.file;
				this.file.draw();
			}
		} else if (_changedProperties.has("prefersGpu") && this.mountedInstance) {
			this.mountedInstance.setPreferWebGl(this.prefersGpu);
			this.mountedInstance.draw();
		}
	}
	/** Releases the actual mount rather than a possibly newer file context value. */
	unmountInstance() {
		this.mountedInstance?.unmountFromDom();
		this.mountedInstance = void 0;
	}
	disconnectedCallback() {
		this.unmountInstance();
		super.disconnectedCallback();
	}
	static {
		this.styles = lit.css`

        :host {
            display: block;
            width: 100%;
            font-size: var( --thermal-fs );
        }

        :host,
        .canvas-container {
            box-sizing: border-box;
        }

        .canvas-container {

            width: 100%;

            background-color: var( --thermal-slate );
            color: var( --thermal-background );

            transition: color .3s ease-in-out, background-color .3s ease-in-out;

            &.is-loading {

                aspect-ratio: 4 / 3;
                display: flex;
                align-items: center;
                justify-content: center;

            }

            &.is-loaded {
        
            }

            &.is-success {

            }

            &.is-error {

                display: flex;
                align-items: center;
                justify-content: center;
                padding: var( --thermal-gap );
                box-sizing: border-box;
            }

        }

        

        .error-wrapper {

            display: flex;
            gap: calc( var( --thermal-gap ) * 0.5 );
            flex-wrap: wrap;
            flex-direction: column;
            align-items: center;
            justify-content: center;

            box-sizing: border-box;
            width: 100%;
            height: 100%;

            border: 2px dashed currentcolor;
            border-radius: var( --thermal-radius );

            padding: var( --thermal-gap );

            thermal-icon {
                width: 2em;
                height: 2em;
            }

            .error-message {
                font-size: small;
                opacity: .5;
            }

        }
    `;
	}
	renderPlaceholder() {
		if (this.fileIsLoading === false) return lit.nothing;
		return lit.html`<div class="file-canvas-loading">
    <thermal-spinner color="var(--thermal-background)"></thermal-spinner>
</div>`;
	}
	renderError() {
		if (this.failure === void 0) return lit.nothing;
		return lit.html`<div class="error-wrapper">
    <thermal-icon 
        icon="warning"
        variant="outline"
    ></thermal-icon>

    <div class="error-title">
        ${t$1("fileloadingerror")}
    </div>
    <div class="error-url">
        ${this.failure?.thermalUrl}
    </div>
    <div class="error-message">
        ${this.failure?.message}
    </div>
</div>`;
	}
	render() {
		const isError = this.fileIsLoading === false && this.failure !== void 0;
		const isSuccess = this.fileIsLoading === false && this.file !== void 0;
		const classes = {
			"canvas-container": true,
			"is-loading": this.fileIsLoading,
			"is-loaded": this.fileIsLoading === false,
			"is-success": isSuccess,
			"is-error": isError
		};
		return lit.html`<div class=${(0, lit_directives_class_map_js.classMap)(classes)} part="file-canvas-container">
    <div ${(0, lit_directives_ref_js.ref)(this.container)}></div>
    ${this.renderPlaceholder()}
    ${this.renderError()}
</div>`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "prefers-gpu"
}), __decorateMetadata("design:type", Boolean)], FileCanvasElement.prototype, "prefersGpu", void 0);
//#endregion
//#region src/controls/file/FileVideoExportButton.ts
var FileVideoExportButton = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.size = "md";
		this.label = "Exportovat video";
		this.dialogRef = (0, lit_directives_ref_js.createRef)();
		this.panelRef = (0, lit_directives_ref_js.createRef)();
		this.slug = this.UUID + "__file-export";
		this.isOpen = false;
	}
	onInstanceCreated() {}
	onFailure() {}
	renderDialog() {
		const cnt = (0, lit_directives_when_js.when)(this.isOpen, () => lit.html`<file-video-export-panel ${(0, lit_directives_ref_js.ref)(this.panelRef)}></file-video-export-panel>`, () => lit.nothing);
		return lit.html`<thermal-dialog
            ${(0, lit_directives_ref_js.ref)(this.dialogRef)}
            label="${this.t("export")}"
            is-fullscreen="true"
            .onCloseEveryTime=${() => {
			this.isOpen = false;
			return true;
		}}
        >

            <div slot="content" style="height: 100%;">
                ${cnt}
            </div>

            ${this.renderCurrentFrameExportButton()}

            ${this.renderVideoExportButton()}
        
        </thermal-dialog>`;
	}
	renderVideoExportButton() {
		if (!this.file || this.file && this.file.timeline.isSequence === false) return lit.nothing;
		return lit.html`<thermal-btn
                variant="primary"
                slot="button"
                icon="download"
                iconStyle="micro"
                @click=${() => {
			if (this.panelRef?.value) (this.panelRef?.value).record();
		}}
            >${this.t("exportvideo")} (MP4)</thermal-btn>`;
	}
	renderCurrentFrameExportButton() {
		if (!this.file) return lit.nothing;
		const label = this.file.timeline.isSequence ? "Současný snímek" : this.t("exportpng");
		return lit.html`<thermal-btn
                variant="primary"
                slot="button"
                icon="download"
                iconStyle="micro"
                @click=${() => {
			if (this.panelRef?.value) (this.panelRef?.value).currentFrame();
		}}
            >${label} (PNG)</thermal-btn>`;
	}
	renderTriggerButton() {
		return lit.html`<thermal-btn
            @click=${() => {
			this.dialogRef.value?.setOpen();
			this.isOpen = true;
		}}
            variant=${this.variant || "default"}
            size=${this.size || "md"}
            plain="${this.plain || false}"
            icon=${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}
            iconStyle=${(0, lit_directives_if_defined_js.ifDefined)(this.iconStyle)}
            tooltip=${(0, lit_directives_if_defined_js.ifDefined)(this.tooltip)}
            pre=${(0, lit_directives_if_defined_js.ifDefined)(this.pre)}
            style="width: 100%; justify-content: flex-start;"
        >
            ${this.label}
        </thermal-btn>`;
	}
	render() {
		return lit.html`
            ${this.renderDialog()}
            ${this.renderTriggerButton()}
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], FileVideoExportButton.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], FileVideoExportButton.prototype, "size", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], FileVideoExportButton.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], FileVideoExportButton.prototype, "iconStyle", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Boolean }), __decorateMetadata("design:type", Boolean)], FileVideoExportButton.prototype, "plain", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileVideoExportButton.prototype, "tooltip", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileVideoExportButton.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileVideoExportButton.prototype, "pre", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileVideoExportButton.prototype, "isOpen", void 0);
//#endregion
//#region src/controls/file/FilePlaybackSpeedDropdown.ts
var FilePlaybackSpeedDropdown = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.enabled = "on";
		this.playbackSpeed = 1;
	}
	onInstanceCreated() {}
	onFailure() {}
	handleEntryClick(event, key) {
		if (this.file) this.file.timeline.playbackSpeed = parseFloat(key);
		const target = event.target;
		if (target && target.parentElement && target.parentElement instanceof ThermalDropdownElement) target.parentElement.setClose();
	}
	renderEntry(key) {
		return lit.html`<thermal-btn
            style="width: 100%;"
            slot="option"
            variant="${this.playbackSpeed.toString() === key ? "background" : "default"}"
            @click="${(event) => this.handleEntryClick(event, key)}"
        >
            ${key}x
        </thermal-btn>`;
	}
	render() {
		if (this.file === void 0) return lit.nothing;
		return lit.html`<thermal-dropdown 
            interactive="${this.enabled}" 
            .tooltip=${t$1("playbackspeed")}
        >

            <div slot="invoker" class="button">
                ${this.playbackSpeed}x
            </div>

            ${Object.entries(_labirthermal_core.playbackSpeed).map(([key]) => {
			return this.renderEntry(key);
		})}
            
        </thermal-dropdown>`;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FilePlaybackSpeedDropdown.prototype, "enabled", void 0);
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: filePlaybackSpeedContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], FilePlaybackSpeedDropdown.prototype, "playbackSpeed", void 0);
//#endregion
//#region src/controls/file/FileDownloadDropdown.ts
var FileDownloadButton = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.hasGraphs = false;
		this.recordingGraphRef = (0, lit_directives_ref_js.createRef)();
		this.dropdownRef = (0, lit_directives_ref_js.createRef)();
	}
	onInstanceCreated(instance) {
		instance.analysisData.onGraphsPresence.set(this.UUID, (value) => {
			this.hasGraphs = value;
		});
		this.hasGraphs = instance.analysisData.hasActiveGraphs;
	}
	onFailure() {}
	render() {
		if (this.file === void 0) return lit.nothing;
		return lit.html`

            <thermal-dropdown ${(0, lit_directives_ref_js.ref)(this.dropdownRef)} class="download"
                icon=${(0, lit_directives_if_defined_js.ifDefined)(this.icon)}
                iconStyle=${(0, lit_directives_if_defined_js.ifDefined)(this.iconStyle)}
                variant=${(0, lit_directives_if_defined_js.ifDefined)(this.variant)}
            >

                <slot name="invoker" slot="invoker">
                    <div class="button">
                        ${this.file ? t$1("download") : "..."}
                    </div>
                </slot>

                <thermal-btn 
                    slot="option"
                    @click="${() => window.open(this.file.thermalUrl)}"
                    pre=${this.file.reader.parser.extensions[0].extension.toUpperCase()}
                    align="left"
                >
                    ${t$1("downloadoriginalfile", { type: this.file.reader.parser.extensions[0].extension.toUpperCase() })}
                </thermal-btn>

                <thermal-btn 
                    slot="option"
                    @click=${() => this.file.export.downloadPng({
			width: this.configController?.settings.export.png.width ?? 1350,
			fontSize: this.configController?.settings.export.png.fontSize,
			showAnalysis: this.configController?.settings.export.png.analyses,
			showThermalScale: this.configController?.settings.export.png.thermalScale,
			showFileDate: this.configController?.settings.export.png.fileDate,
			showFileName: this.configController?.settings.export.png.fileName
		})}
                    pre="PNG"
                    align="left"
                >
                    ${t$1("exportcurrentframeaspng")}
                </thermal-btn>

                <file-video-export-button 
                    pre="${this.file.timeline.isSequence ? "MP4 / PNG" : "PNG"}" 
                    label="Pokročilý export" 
                    slot="option"
                    style="width: 100%"
                ></file-video-export-button>



                    ${this.hasGraphs === true ? lit.html`<thermal-btn 
                            slot="option"
                            @click=${() => this.file?.analysisData.downloadData()}
                            pre="CSV"
                            align="left"
                    >
                        ${t$1("csvofanalysisdata")}
                    </thermal-btn>` : lit.nothing}
            
            </thermal-dropdown>

            <thermal-dialog 
                ${(0, lit_directives_ref_js.ref)(this.recordingGraphRef)}
                label="Export souboru do videa"
                button="Začít nahrávat"
                .beforeClose=${async () => {
			this.file?.recording.recordEntireFile();
			return true;
		}}
            >

                <div slot="content">

                    <p>Export probíhá tak, že sekvenci ve Vašem prohlížeči přehrajeme a zaznamenáme do video souboru.</p>

                    <p>Součástí exportu <i>nejsou analýzy ani teplotní škála</i>.</p>

                    <p><strong>Při nahrávání bude použito aktuální nastavení:</strong></p>

                    <table>

                        <tr>
                            <td>Barevná paleta</td>
                            <td>
                                <manager-palette-dropdown></manager-palette-dropdown>
                            </td>
                        </tr>

                        <tr>
                            <td>Teplotní rozsah</td>
                            <td>
                                <registry-range-form></registry-range-form>
                            </td>
                        </tr>

                        <tr>
                            <td>Rychlost přehrávání</td>
                            <td>
                                <file-playback-speed-dropdown></file-playback-speed-dropdown>
                            </td>
                        </tr>

                    </table>

                    <p>Chcete zahájit nahrávání?</p>


                </div>

                <thermal-btn slot="button" @click=${() => this.dropdownRef.value?.setClose()}>
                    Zrušit
                </thermal-btn>

            </thermal-dialog>

        
        `;
	}
};
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: configContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], FileDownloadButton.prototype, "configController", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileDownloadButton.prototype, "hasGraphs", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileDownloadButton.prototype, "variant", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileDownloadButton.prototype, "icon", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileDownloadButton.prototype, "iconStyle", void 0);
//#endregion
//#region src/controls/file/buttons/FileButton.ts
var FileButtonElement = class extends AbstractFileButton {
	constructor(..._args) {
		super(..._args);
		this.tooltip = void 0;
	}
	onInstanceCreated() {}
	enter() {
		if (this.onEnter && this.file) this.onEnter(this.file);
	}
	leave() {
		if (this.onLeave && this.file) this.onLeave(this.file);
	}
	action() {
		if (this.onAction && this.file) this.onAction(this.file);
	}
	getDefaultLabel() {
		return this.label;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], FileButtonElement.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], FileButtonElement.prototype, "onEnter", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], FileButtonElement.prototype, "onLeave", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], FileButtonElement.prototype, "onAction", void 0);
//#endregion
//#region src/controls/file/buttons/FileDropdown.ts
var FileDropdown = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.expanded = false;
	}
	toggle() {
		this.expanded = !this.expanded;
	}
	expand() {
		this.expanded = true;
	}
	collapse() {
		this.expanded = false;
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("expanded")) {
			if (this.expanded === true) this.classList.add("expanded");
			else this.classList.remove("expanded");
		}
	}
	static {
		this.styles = lit.css`
        :host {
            
        }

        .container {
            display: block;
            position: relative;
        }

        .dropdown {

            z-index: 999;

            position: absolute;
            right: 0px;
            
            box-sizing: border-box;
            
            overflow: hidden;
            max-height: 0px;

            > div {
                padding: 5px; 
                background-color: var(--thermal-background);
                border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
                border-radius: var(--thermal-radius);

                display: flex;
                flex-direction: column;
                gap: 5px;
                align-items: flex-end;
                justify-content: flex-end;

            }

        }


        .backdrop {
            display: none;
            cursor: pointer;
        }


        button.default {
            font-size: calc( var(--thermal-fs) * .8 );
            color: var(--thermal-foreground);
            border-color: var(--thermal-slate);
            border-style: solid;
            border-width: 1px;
            border-radius: var( --thermal-radius );
            background-color: var(--thermal-slate-light);
            &:hover {
                cursor: pointer;
                background: var(--thermal-background);
            }
        }


        :host(.expanded) .dropdown {

            max-height: 500px;

        }

        :host(.expanded) .backdrop {

            display: block;
            position: fixed;
            top: -100vh;
            left: -100vw;
            height: 200vh;
            width: 200vw;
            z-index: 998;

        }



    `;
	}
	render() {
		return lit.html`
            <div class="backdrop" @click=${() => this.collapse()}></div>
            <div class="container">
                <thermal-btn variant="default" size="sm" icon="ellipsis" iconStyle="micro" @click=${() => {
			this.toggle();
		}}>${this.label ?? lit.nothing}</thermal-btn>
                <nav class="dropdown">
                    <div>
                        <slot></slot>
                    </div>
                </nav>
            </div>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], FileDropdown.prototype, "label", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileDropdown.prototype, "expanded", void 0);
//#endregion
//#region src/controls/file/buttons/FileLrcButton.ts
var FileLrcButton = class extends AbstractFileButton {
	constructor(..._args) {
		super(..._args);
		this.tooltip = void 0;
	}
	onInstanceCreated() {}
	enter() {}
	leave() {}
	action() {
		if (this.file) {
			const link = document.createElement("a");
			link.href = this.file.thermalUrl;
			link.download = this.file.fileName;
			link.click();
		}
	}
	getDefaultLabel() {
		return this.file?.reader.parser.extensions[0]?.extension ?? "lrc";
	}
};
//#endregion
//#region src/controls/file/buttons/FilePngButton.ts
var FilePngButton = class extends AbstractFileButton {
	constructor(..._args) {
		super(..._args);
		this.tooltip = void 0;
	}
	onInstanceCreated() {}
	enter() {}
	leave() {}
	action() {
		if (this.file) {
			const png = this.configController?.settings.export.png;
			this.file.export.downloadPng({
				width: png?.width,
				fontSize: png?.fontSize,
				showAnalysis: png?.analyses,
				showThermalScale: png?.thermalScale,
				showFileName: png?.fileName,
				showFileDate: png?.fileDate
			});
		}
	}
	getDefaultLabel() {
		return "png";
	}
};
__decorate([
	(0, lit_decorators_js.state)(),
	(0, _lit_context.consume)({
		context: configContext,
		subscribe: true
	}),
	__decorateMetadata("design:type", Object)
], FilePngButton.prototype, "configController", void 0);
//#endregion
//#region src/controls/file/buttons/FileRangePropagator.ts
var FileRangePropagator = class extends AbstractFileButton {
	constructor(..._args) {
		super(..._args);
		this.tooltip = t$1("range");
		this.hideLabel = false;
	}
	onInstanceCreated(file) {
		this.tooltip = [
			file.min.toFixed(2),
			"—",
			file.max.toFixed(2),
			"°C"
		].join(" ");
	}
	enter() {
		if (this.registryController && this.file) this.registryController.setHighlight({
			from: this.file.min,
			to: this.file.max
		});
	}
	leave() {
		if (this.registryController) this.registryController.setHighlight(void 0);
	}
	action() {
		if (this.file) this.file.group.registry.range.imposeRange({
			from: this.file.min,
			to: this.file.max
		});
	}
	getDefaultLabel() {
		if (this.hideLabel) return "";
		return t$1("range").toLowerCase();
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "hide-label"
}), __decorateMetadata("design:type", Boolean)], FileRangePropagator.prototype, "hideLabel", void 0);
//#endregion
//#region src/controls/file/analysis/FileAnalysisComplex.ts
var FileAnalysisComplexElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.tableMode = "full";
		this.interactiveAnalysis = false;
		this.graphActivationEnabled = true;
		this.mayHaveGraph = false;
		this.hasAnalysis = false;
		this.isDrawingAnalysis = false;
		this.hasGraph = false;
		this.graphRef = (0, lit_directives_ref_js.createRef)();
		this.graphWidth = 0;
		this.graphHeight = 0;
		this.watchedAnalyses = /* @__PURE__ */ new Set();
		this.hideHint = false;
		this.pointerUpListener = () => {
			this.isDrawingAnalysis = false;
		};
	}
	connectedCallback() {
		super.connectedCallback();
		this.refreshFileState();
		this.hydrate();
		this.requestUpdate();
	}
	disconnectedCallback() {
		this.dehydrate();
		this.disconnectObserver();
		super.disconnectedCallback();
	}
	onInstanceCreated() {
		this.requestUpdate();
	}
	onFailure() {}
	/** Derives render state from the current file without registering listeners. */
	refreshFileState() {
		this.mayHaveGraph = this.file?.timeline.isSequence ?? false;
		this.hasAnalysis = (this.file?.analysis.value.length ?? 0) > 0;
		this.hasGraph = this.file?.analysis.value.some((analysis) => {
			const { MIN, MAX, AVG } = analysis.graph.state;
			return MIN || MAX || AVG;
		}) ?? false;
		if (!this.hasAnalysis) this.isDrawingAnalysis = false;
	}
	/** Binds the current file and its existing analyses, replacing subscriptions to the previous file. */
	hydrate() {
		const instance = this.file;
		if (!this.isConnected || this.boundFile === instance) return;
		this.dehydrate();
		this.boundFile = instance;
		if (!instance) return;
		instance.analysis.addListener(this.UUID, (analyses) => {
			this.syncAnalyses(analyses);
			this.refreshFileState();
		});
		this.syncAnalyses(instance.analysis.value);
	}
	/** Keeps graph subscriptions and the pointer listener aligned with the current analysis list. */
	syncAnalyses(analyses) {
		for (const analysis of this.watchedAnalyses) if (!analyses.includes(analysis)) {
			analysis.graph.onGraphActivation.delete(this.UUID);
			this.watchedAnalyses.delete(analysis);
		}
		analyses.forEach((analysis) => this.watchAnalysis(analysis));
		const layer = analyses.length > 0 ? this.boundFile?.dom?.listenerLayer?.getLayerRoot() : void 0;
		if (layer !== this.listenerLayer) {
			this.listenerLayer?.removeEventListener("pointerup", this.pointerUpListener);
			this.listenerLayer = layer;
			this.listenerLayer?.addEventListener("pointerup", this.pointerUpListener);
		}
	}
	/** Observes graph activation once per analysis; rendering state is refreshed by external events. */
	watchAnalysis(analysis) {
		if (this.watchedAnalyses.has(analysis)) return;
		this.watchedAnalyses.add(analysis);
		analysis.graph.onGraphActivation.set(this.UUID, () => {
			this.refreshFileState();
		});
	}
	/** Removes file, analysis and pointer listeners from the actual subscribed objects. */
	dehydrate() {
		this.boundFile?.analysis.removeListener(this.UUID);
		for (const analysis of this.watchedAnalyses) analysis.graph.onGraphActivation.delete(this.UUID);
		this.watchedAnalyses.clear();
		this.listenerLayer?.removeEventListener("pointerup", this.pointerUpListener);
		this.listenerLayer = void 0;
		this.boundFile = void 0;
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("file")) {
			this.isDrawingAnalysis = false;
			this.refreshFileState();
		}
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has("file")) this.hydrate();
		this.observeGraph();
	}
	/** Observes the rendered graph container, including after reconnecting or replacing the DOM node. */
	observeGraph() {
		const graph = this.isConnected ? this.graphRef.value : void 0;
		if (graph === this.observedGraph) return;
		this.disconnectObserver();
		if (!graph) return;
		this.observedGraph = graph;
		this.observer = new ResizeObserver((entries) => {
			if (this.observedGraph !== graph || !this.isConnected) return;
			const entry = entries.find((entry) => entry.target === graph);
			if (entry) {
				this.graphWidth = entry.contentRect.width;
				this.graphHeight = entry.contentRect.height;
			}
		});
		this.observer.observe(graph);
	}
	/** Releases the observer even when Lit has already cleared the graph reference. */
	disconnectObserver() {
		this.observer?.disconnect();
		this.observer = void 0;
		this.observedGraph = void 0;
	}
	renderButtons() {
		const addTools = this.file !== void 0 ? Object.values(this.file.group.tool.tools).filter((tool) => tool instanceof _labirthermal_core.AbstractAddTool) : [];
		return lit.html`
            <div class="buttons">
                ${addTools.map((tool) => {
			return lit.html`<thermal-btn @click=${() => {
				this.isDrawingAnalysis = true;
				this.file?.group.tool.selectTool(tool);
			}}>
                    <div style="display: flex; align-items: center; gap: 10px">
                        <div style="width: 1.5em; display: inline-block;">
                            ${(0, lit_directives_unsafe_html_js.unsafeHTML)(tool.icon)}
                        </div>
                        <div>
                            ${t$1(T[tool.name])}
                        </div>
                    </div>
                </thermal-btn>`;
		})}
            </div>

            <slot></slot>
        
        `;
	}
	renderCurrentTooltip() {
		return lit.html`${t$1(T[this.managerObject.tool.value.description])}`;
	}
	renderAddAnalysis() {
		return lit.html`<div class="addanalysis">

            ${!this.hideHint ? lit.html`<div>
                    <strong>${t$1("analysis")}</strong>
                </div>

                <div>${t$1("analysishint")}</div>` : lit.nothing}


            ${this.isDrawingAnalysis === true ? this.renderCurrentTooltip() : this.renderButtons()}
        </div>`;
	}
	renderGraph() {
		if (!this.mayHaveGraph) return lit.nothing;
		if (this.hasGraph === true) return lit.html`
            
            <div class="graph" ${(0, lit_directives_ref_js.ref)(this.graphRef)}>
                <file-analysis-graph graphWidth=${this.graphWidth} graphHeight=${this.graphHeight}></file-analysis-graph>
            </div>`;
		else if (this.hasAnalysis === true) return lit.html`<div class="graph graph-prompt">
                    <div>
                        <strong>${t$1("graph")}</strong>
                    </div>
                    <div class="hint">${(0, lit_directives_unsafe_html_js.unsafeHTML)(t$1("graphhint2"))}</div>
                </div>`;
		else return lit.html`<div class="graph graph-prompt">
                    <div>
                        <strong>${t$1("graph")}</strong>
                    </div>
                    <div class="hint">${t$1("graphhint1")}</div>
                </div>`;
	}
	static {
		this.styles = lit.css`

        :host {
            display: block;
            min-width: 0;
            max-width: 100%;
        }

        .container {
            height: 100%;
            width: 100%;
            color: var(--thermal-foreground);
        }

        .container.may {
            display: flex;
            flex-direction: column;
            gap: var(--thermal-gap);

            > * {
                width: 100%;
            }

            .analysis {
                height: calc( 50% - var(--thermal-gap));
            }

        }

        .container.may-not {
            .analysis {
                height: 100%;
            }
        }

        .analysis {
            min-width: 0;
        }
    
        .addanalysis {
            padding: var(--thermal-gap);
            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--thermal-gap);
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            text-align: center;
        }

        .graph {
            height: 50%;
        }

        .graph-prompt {
            padding: var(--thermal-gap);
            border: var(--thermal-border-width) dashed var(--thermal-slate);
            border-radius: var(--thermal-radius);
            box-sizing: border-box;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--thermal-gap);
        }

        .hint {
            thermal-btn {
                display: inline-block;
                cursor: help;
            }
        }

        .buttons {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-wrap: wrap;
            gap: 5px;
        }

        file-analysis-table {
        }
    
    `;
	}
	render() {
		return lit.html`
            <div class="container ${this.mayHaveGraph === true ? "may" : "may-not"}">

            <div class="analysis">
                ${this.hasAnalysis === false || this.isDrawingAnalysis === true ? this.renderAddAnalysis() : lit.html`<file-analysis-table
                    .tableMode=${this.tableMode}
                    ?force-interactive=${this.interactiveAnalysis}
                    ?graph-activation-disabled=${!this.graphActivationEnabled}
                ></file-analysis-table>`}
            </div>
            ${this.renderGraph()}

            </div>

        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ attribute: "table-mode" }), __decorateMetadata("design:type", Object)], FileAnalysisComplexElement.prototype, "tableMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "interactive-analysis"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "interactiveAnalysis", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "graph-activation-enabled",
	reflect: true
}), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "graphActivationEnabled", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "mayHaveGraph", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "hasAnalysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "isDrawingAnalysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "hasGraph", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileAnalysisComplexElement.prototype, "graphWidth", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileAnalysisComplexElement.prototype, "graphHeight", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "hide-hint"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisComplexElement.prototype, "hideHint", void 0);
//#endregion
//#region src/controls/file/analysis/FileAnalysisDisplay.ts
/** Display the analysis state for the purpose of exporting. */
var FileAnalysisDisplayElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.container = (0, lit_directives_ref_js.createRef)();
		this.analysis = [];
	}
	onFailure() {}
	onInstanceCreated() {
		this.requestUpdate();
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.file) this.analysis = this.file.analysis.value;
		this.bindFile();
	}
	disconnectedCallback() {
		this.unbindFile();
		super.disconnectedCallback();
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("file")) this.analysis = this.file?.analysis.value ?? [];
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has("file")) this.bindFile();
	}
	/**
	* Observes analysis-list and frame changes on the current file while connected.
	* Removes previous subscriptions and avoids registering twice for the same file.
	*/
	bindFile() {
		if (!this.isConnected || this.boundFile === this.file) return;
		this.unbindFile();
		this.boundFile = this.file;
		const file = this.boundFile;
		if (!file) return;
		file.analysis.addListener(this.UUID, (analysis) => {
			this.analysis = analysis;
		});
		file.timeline.onFrame.add(this.UUID, () => {
			this.requestUpdate();
		});
	}
	/** Removes both listeners from the actual subscribed file when replacing it or disconnecting. */
	unbindFile() {
		this.boundFile?.analysis.removeListener(this.UUID);
		this.boundFile?.timeline.onFrame.delete(this.UUID);
		this.boundFile = void 0;
	}
	static {
		this.styles = lit.css`
    
        .overflow {
            overflow-x:auto;
            width: 100%;
        }

        table {
            display: table;
            min-width: 100%;
            border-collapse: collapse;
            color: var( --thermal-foreground );
            td, th {
                padding: calc( var( --thermal-fs ) * .5 )
            }

            td {
                border-top: var(--thermal-slate-light ) 1px solid;
            }
        }

        th {
            text-align: left;
        }

        th, td, button, thermal-btn {
            font-size: var( --thermal-fs-sm );
            font-size: 14px;
        }

        caption {
            display: none !important;
        }

        file-analysis-table-row {
            color: var( --thermal-foreground );
            transition: background-color .2s ease-in-out;
        }

        file-analysis-table-row:not(:last-child) {
            border-bottom: var(--thermal-border-width) dotted var( --thermal-foreground );
        }

        file-analysis-table-row[selected] {
            background-color: var( --thermal-background );
        }

        .all {

            &.interactive {
                cursor: pointer;
            }

            &.interactive:hover {
                color: var( --thermal-primary );
            }

            u, b, span {
                display: inline-block;
            }

            u {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            }

            &.yes u {
                background-color: var( --thermal-slate-dark );
            }

            button {
                margin: 0;
                padding: 0;
                border: 0;
                background: transparent;
                color: var( --thermal-primary );
                text-transform: lowercase;
                cursor: pointer;

                &:hover,
                &:focus {
                    color: var( --thermal-primary-dark );
                }
            }

        }

        .analysis-name {
            display: flex;
            align-items: center;
            gap: .5em;
            strong,
            span {
                display: inline-block;
            }

            strong {
                width: 1.5em;
                height: 2px;
            }
        }



    `;
	}
	render() {
		if (this.analysis.length === 0 || this.file === void 0) return lit.nothing;
		return lit.html`

        <div class="overflow" ${(0, lit_directives_ref_js.ref)(this.container)}>

            <table>

                <caption data-video-ignore>Table of analysis currently set on the file ${this.file.fileName}.</caption>

                <thead>

                    <tr>
                        <th></th>
                        <th>${t$1("avg")}</th>
                        <th>${t$1("min")}</th>
                        <th>${t$1("max")}</th>
                        <th>${t$1("size")}</th>
                    </tr>
                
                </thead>

                <tbody>

                    ${this.analysis.map((analysis) => this.renderAnalysisRow(analysis))}
                
                </tbody>

                </table>

            </div>
            
        `;
	}
	renderAnalysisRow(analysis) {
		const { MIN, MAX, AVG } = analysis.graph.state;
		return lit.html`<tr>
            <td class="analysis-name">
                <strong style="background: ${analysis.color};"></strong>
                <span>${analysis.name}</span>
            </td>
            ${this.renderAnalysisRowTemperatureCell(analysis.color, AVG, analysis.avg)}
            ${this.renderAnalysisRowTemperatureCell(analysis.color, MIN, analysis.min)}
            ${this.renderAnalysisRowTemperatureCell(analysis.color, MAX, analysis.max)}
            <td>${analysis.width} x ${analysis.height} px</td>
        </tr>`;
	}
	renderAnalysisRowTemperatureCell(color, inGraph, value) {
		const style = { padding: "4px 0px" };
		if (inGraph) {
			style.borderColor = color;
			style.borderStyle = "solid";
			style.borderWidth = "2px";
			style.padding = "2px 6px";
		}
		let valueDisplay = "-";
		if (value !== void 0) valueDisplay = value.toFixed(2) + " °C";
		return lit.html`
            <td>
                <span style=${(0, lit_directives_style_map_js.styleMap)(style)} data-video-dynamic>
                    ${valueDisplay}
                </span>
            </td>
        `;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], FileAnalysisDisplayElement.prototype, "analysis", void 0);
//#endregion
//#region src/controls/file/analysis/FileAnalysisEdit.ts
/** Trigger the edit dialog for an analysis */
var FileAnalisisEditDialog = class extends AbstractThermalElement {
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("analysis")) {
			this.name = this.analysis.name;
			this.type = this.analysis.getType();
		}
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has("analysis")) {
			const oldAnalysis = changedProperties.get("analysis");
			if (oldAnalysis) oldAnalysis.onSetName.delete(this.UUID);
			this.analysis.onSetName.set(this.UUID, (value) => {
				this.name = value;
			});
		}
	}
	static {
		this.styles = lit.css`
    
        :host {
        
            display: inline-block;

        }

    `;
	}
	render() {
		return lit.html`

            <thermal-dialog label="${t$1("editsth", { what: t$1(T[this.type]) })}">
                <slot name="invoker" slot="invoker">
                    <thermal-btn 
                        icon="settings" 
                        iconStyle="solid" 
                        size="md" 
                        tooltip="${t$1("editsth", { what: this.analysis.name })}"
                    >
                    </thermal-btn>
                </slot>

                <div slot="content">
                    ${this.analysis instanceof _labirthermal_core.PointAnalysis ? lit.html`<edit-point .analysis=${this.analysis}></edit-point>` : lit.html`<edit-area .analysis=${this.analysis}></edit-area>`}
                </div>

            </thermal-dialog>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], FileAnalisisEditDialog.prototype, "analysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], FileAnalisisEditDialog.prototype, "name", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], FileAnalisisEditDialog.prototype, "type", void 0);
//#endregion
//#region src/controls/file/analysis/FileAnalysisGraph.ts
/** High level component around `thermal-chart` that provides the functionality of a file analysis graph */
var FileAnalysisGraphElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.hydrated = false;
		this.graphWidth = 0;
		this.graphHeight = 0;
		this.hasDownloads = true;
		this.standalone = false;
		this.container = (0, lit_directives_ref_js.createRef)();
		this.graphRef = (0, lit_directives_ref_js.createRef)();
		this.graphs = {
			values: [[]],
			colors: []
		};
		this.receiveGraphData = (value) => {
			this.graphs = value;
		};
		this.shadowLeft = 0;
		this.shadowTop = 0;
		this.shadowWidth = 0;
		this.shadowHeight = 0;
		this.graphSmooth = false;
		this.syncChartArea = () => {
			const chart = this.graphRef.value;
			if (chart) {
				this.shadowLeft = chart.left;
				this.shadowTop = chart.top;
				this.shadowWidth = chart.w;
				this.shadowHeight = chart.h;
			}
		};
		this.downloadSVG = (svgEl, fileName) => {
			if (!svgEl.getAttribute("xmlns")) svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			const svgData = svgEl.outerHTML;
			const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = fileName;
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);
		};
		this.downloadPNG = (svgEl, fileName) => {
			if (!svgEl.getAttribute("xmlns")) svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
			const svgData = svgEl.outerHTML;
			const blob = new Blob([svgData], { type: "image/svg+xml;charset=utf-8" });
			const url = URL.createObjectURL(blob);
			const img = new Image();
			img.onload = () => {
				const canvas = document.createElement("canvas");
				canvas.width = img.width;
				canvas.height = img.height;
				canvas.getContext("2d")?.drawImage(img, 0, 0);
				const pngUrl = canvas.toDataURL("image/png");
				const a = document.createElement("a");
				a.href = pngUrl;
				a.download = fileName;
				document.body.appendChild(a);
				a.click();
				document.body.removeChild(a);
				URL.revokeObjectURL(url);
			};
			img.src = url;
		};
		this.handleGraphClick = (relativeTimeMs) => {
			const file = this.file;
			if (file?.timeline.isSequence) file.timeline.setRelativeTime(relativeTimeMs);
		};
		this.handleGraphHover = (percentage) => {
			this.fileController.setTimeCursorPercentage(percentage);
		};
	}
	onInstanceCreated(instance) {
		this.graphs = instance.analysisData.value;
		this.hydrated = true;
		this.requestUpdate();
	}
	connectedCallback() {
		super.connectedCallback();
		if (this.file) {
			this.graphs = this.file.analysisData.value;
			this.hydrated = true;
		}
		this.requestUpdate();
	}
	disconnectedCallback() {
		this.unbindFile();
		this.disconnectObserver();
		super.disconnectedCallback();
	}
	onFailure() {
		this.unbindFile();
		this.disconnectObserver();
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("file")) {
			this.graphs = this.file?.analysisData.value ?? {
				values: [[]],
				colors: []
			};
			this.hydrated = this.file !== void 0;
		}
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		this.bindFile();
		this.toggleAttribute("data-has-graphs", !!this.file?.timeline.isSequence && this.graphs.colors.length > 0);
		this.observeContainer();
	}
	bindFile() {
		if (!this.isConnected || this.boundFile === this.file) return;
		this.unbindFile();
		this.boundFile = this.file;
		this.boundFile?.analysisData.addListener(this.UUID, this.receiveGraphData);
	}
	unbindFile() {
		this.boundFile?.analysisData.removeListener(this.UUID);
		this.boundFile = void 0;
	}
	observeContainer() {
		const container = this.isConnected && this.standalone ? this.container.value : void 0;
		if (container === this.observedContainer) return;
		this.disconnectObserver();
		if (!container) return;
		this.observedContainer = container;
		this.observer = new ResizeObserver((entries) => {
			if (!this.isConnected || this.observedContainer !== container) return;
			const entry = entries.find((entry) => entry.target === container);
			if (entry) {
				this.graphWidth = entry.contentRect.width;
				this.graphHeight = entry.contentRect.height;
			}
		});
		this.observer.observe(container);
	}
	disconnectObserver() {
		this.observer?.disconnect();
		this.observer = void 0;
		this.observedContainer = void 0;
	}
	getChartData() {
		if (this.chartDataSource === this.graphs && this.chartDataCache) return this.chartDataCache;
		const [headers, ...rows] = this.graphs.values;
		this.chartDataSource = this.graphs;
		this.chartDataCache = [[{
			label: headers[0],
			type: "number"
		}, ...headers.slice(1).flatMap((label) => [{
			label,
			type: "number"
		}, {
			type: "string",
			role: "tooltip",
			p: { html: true }
		}])], ...rows.map((row) => {
			const relativeTime = row[0].getTime();
			return [relativeTime, ...row.slice(1).flatMap((value, index) => [value, `<div style="padding: 6px 8px"><div>${this.escapeHtml(t$1("time"))}: <strong>${_labirthermal_core.TimeFormat.duration(relativeTime)}</strong></div><div>${this.escapeHtml(headers[index + 1])}: <strong>${this.escapeHtml(String(value))} °C</strong></div></div>`])];
		})];
		return this.chartDataCache;
	}
	getChartOptions() {
		const duration = this.file?.duration ?? 0;
		const timeLabel = t$1("time");
		const temperatureLabel = `${t$1("temperature")} °C`;
		const key = JSON.stringify([
			this.graphs.colors,
			this.graphSmooth,
			this.graphWidth,
			this.graphHeight,
			duration,
			timeLabel,
			temperatureLabel
		]);
		if (this.chartOptionsCache && this.chartOptionsCacheKey === key) return this.chartOptionsCache;
		this.chartOptionsCacheKey = key;
		this.chartOptionsCache = {
			colors: this.graphs.colors,
			curveType: this.graphSmooth ? "function" : "default",
			legend: { position: "bottom" },
			hAxis: {
				title: timeLabel,
				ticks: this.getDurationAxisTicks(),
				viewWindow: {
					min: 0,
					max: duration
				}
			},
			vAxis: { title: temperatureLabel },
			tooltip: { isHtml: true },
			width: this.graphWidth,
			height: this.graphHeight,
			chartArea: { width: "80%" },
			backgroundColor: { fill: "transparent" }
		};
		return this.chartOptionsCache;
	}
	getDurationAxisTicks() {
		const duration = this.file?.duration ?? 0;
		if (duration <= 0) return [];
		const rawStep = duration / 5;
		const magnitude = 10 ** Math.floor(Math.log10(rawStep));
		const normalizedStep = rawStep / magnitude;
		const step = (normalizedStep <= 1 ? 1 : normalizedStep <= 2 ? 2 : normalizedStep <= 5 ? 5 : 10) * magnitude;
		const ticks = [];
		for (let value = 0; value <= duration; value += step) ticks.push({
			v: value,
			f: _labirthermal_core.TimeFormat.duration(value)
		});
		if (ticks[ticks.length - 1]?.v !== duration) ticks.push({
			v: duration,
			f: _labirthermal_core.TimeFormat.duration(duration)
		});
		return ticks;
	}
	escapeHtml(value) {
		return value.replace(/[&<>"']/g, (character) => ({
			"&": "&amp;",
			"<": "&lt;",
			">": "&gt;",
			"\"": "&quot;",
			"'": "&#39;"
		})[character] ?? character);
	}
	static {
		this.styles = lit.css`

        :host {
            position: relative;
        }

        :host([standalone="true"]) {
            display: block;
            height: var(--thermal-analysis-graph-height, 12rem);
            min-width: 0;
            margin-top: .5em;
        }

        :host([standalone="true"]:not([data-has-graphs])) {
            display: none;
        }

        :host([standalone="true"]) .chart-container {
            height: 100%;
            width: 100%;
        }
    
        google-chart {
            width: 100%;
            height: 100%;
        }

        .download {
            position: absolute;
            right: 0;
            top: 0;
            display: flex;
            gap: 0.25em;
        }

        thermal-icon {
            width: .8em;
            height: .8em;
            vertical-align: middle;
            margin-top: 1px;
        }
    `;
	}
	render() {
		if (this.file?.timeline.isSequence === false || this.standalone && (!this.file || this.graphs.colors.length === 0)) return lit.nothing;
		return lit.html`

            <div style="position: relative; background-color: white; border-radius: var(--thermal-radius); height: 100%;">

            

            <div data-video-style style="position: absolute; top:${this.shadowTop}px; left: ${this.shadowLeft}px; width: ${this.shadowWidth}px; height: ${this.shadowHeight}px; pointer-events: none;">
            ${this.currentFrame && lit.html`
                <div data-video-style style="position: absolute; height: 100%; background-color: #eee; left: 0px; width: ${this.currentFrame.percentage}%"></div>
            `}

                ${this.cursor !== void 0 ? lit.html`
                    <div data-video-style style="position: absolute; height: 100%; width: 1px; background-color: black; left: ${this.cursor}%"></div>
                ` : lit.nothing}
            </div>
        
            <div class="chart-container" ${(0, lit_directives_ref_js.ref)(this.container)}>
                ${this.graphs.colors.length > 0 ? lit.html`<thermal-chart 
                        ${(0, lit_directives_ref_js.ref)(this.graphRef)}
                        data-video-svg
                        type="line" 
                        .data=${(0, lit_directives_guard_js.guard)([this.graphs], () => this.getChartData())}
                        .onGraphClick=${this.handleGraphClick}
                        .onGraphHover=${this.handleGraphHover}
                        @google-chart-ready=${this.syncChartArea}
                        .options=${(0, lit_directives_guard_js.guard)([
			this.graphs.colors,
			this.graphSmooth,
			this.graphWidth,
			this.graphHeight,
			this.file?.duration,
			t$1("time"),
			t$1("temperature")
		], () => this.getChartOptions())}
                        ></thermal-chart>` : lit.nothing}
            </div>

            ${this.renderDownloads()}
            

            

            </div>
        
        `;
	}
	renderDownloads() {
		if (!this.hasDownloads) return lit.nothing;
		return lit.html`<div class="download">
                <thermal-icon icon="download" variant="micro"></thermal-icon>
                <thermal-btn
                    size="sm"
                    @click=${() => {
			if (this.graphRef.value) {
				const svgData = this.graphRef.value.getRef()?.querySelector("svg");
				if (svgData) this.downloadSVG(svgData, "graph.svg");
			}
		}}
                    variant="background"
                    plain
                    tooltip="Stáhnout graf jako obrázek SVG"
                >SVG</thermal-btn>
                <thermal-btn
                    size="sm"
                    @click=${() => {
			if (this.graphRef.value) {
				const svgData = this.graphRef.value.getRef()?.querySelector("svg");
				if (svgData) this.downloadPNG(svgData, "graph.png");
			}
		}}
                    variant="background"
                    plain
                    tooltip="Stáhnout graf jako obrázek PNG"
                >PNG</thermal-btn>
                <thermal-btn
                    size="sm"
                    @click=${() => this.file?.analysisData.downloadData()}
                    variant="background"
                    plain
                    tooltip="${t$1("downloadgraphdataascsv")}"
                >CSV</thermal-btn>
            </div>`;
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileAnalysisGraphElement.prototype, "hydrated", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], FileAnalysisGraphElement.prototype, "graphWidth", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], FileAnalysisGraphElement.prototype, "graphHeight", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], FileAnalysisGraphElement.prototype, "hasDownloads", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], FileAnalysisGraphElement.prototype, "standalone", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], FileAnalysisGraphElement.prototype, "graphs", void 0);
__decorate([(0, _lit_context.consume)({
	context: fileCurrentFrameContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], FileAnalysisGraphElement.prototype, "currentFrame", void 0);
__decorate([(0, _lit_context.consume)({
	context: fileTimeCursorContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], FileAnalysisGraphElement.prototype, "cursor", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileAnalysisGraphElement.prototype, "shadowLeft", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileAnalysisGraphElement.prototype, "shadowTop", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileAnalysisGraphElement.prototype, "shadowWidth", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileAnalysisGraphElement.prototype, "shadowHeight", void 0);
__decorate([(0, _lit_context.consume)({
	context: managerGraphFunctionContext,
	subscribe: true
}), __decorateMetadata("design:type", Boolean)], FileAnalysisGraphElement.prototype, "graphSmooth", void 0);
//#endregion
//#region src/controls/file/analysis/FileAnalysisRow.ts
var FileAnalysisRowElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.tableMode = "full";
		this.selectionDisabled = false;
		this.editDisabled = false;
		this.graphActivationDisabled = false;
		this.showRangePropagator = false;
		this.selected = false;
		this.hovered = false;
		this.focused = false;
		this.refresh = () => {
			this.selected = this.analysis?.selected ?? false;
			this.requestUpdate();
			if (this.hovered || this.focused) this.highlightAnalysis();
		};
		this.handleMouseOver = (event) => {
			if (event instanceof MouseEvent && !this.isWithinRow(event.relatedTarget)) {
				this.hovered = true;
				this.highlightAnalysis();
			}
		};
		this.handleMouseOut = (event) => {
			if (event instanceof MouseEvent && !this.isWithinRow(event.relatedTarget)) {
				this.hovered = false;
				if (!this.focused) this.registryController.setHighlight(void 0);
			}
		};
		this.handleFocusIn = (event) => {
			if (event instanceof FocusEvent && !this.isWithinRow(event.relatedTarget)) {
				this.focused = true;
				this.highlightAnalysis();
			}
		};
		this.handleFocusOut = (event) => {
			if (event instanceof FocusEvent && !this.isWithinRow(event.relatedTarget)) {
				this.focused = false;
				if (!this.hovered) this.registryController.setHighlight(void 0);
			}
		};
	}
	get allowsEdit() {
		return !this.editDisabled;
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("analysis")) {
			this.selected = this.analysis?.selected ?? false;
			this.bindAnalysis();
		}
	}
	connectedCallback() {
		super.connectedCallback();
		this.selected = this.analysis?.selected ?? false;
		this.bindAnalysis();
		this.renderRoot.addEventListener("mouseover", this.handleMouseOver);
		this.renderRoot.addEventListener("mouseout", this.handleMouseOut);
		this.renderRoot.addEventListener("focusin", this.handleFocusIn);
		this.renderRoot.addEventListener("focusout", this.handleFocusOut);
	}
	disconnectedCallback() {
		this.unbindAnalysis();
		if (this.hovered || this.focused) this.registryController.setHighlight(void 0);
		this.hovered = false;
		this.focused = false;
		this.renderRoot.removeEventListener("mouseover", this.handleMouseOver);
		this.renderRoot.removeEventListener("mouseout", this.handleMouseOut);
		this.renderRoot.removeEventListener("focusin", this.handleFocusIn);
		this.renderRoot.removeEventListener("focusout", this.handleFocusOut);
		super.disconnectedCallback();
	}
	/** Replaces subscriptions to the previous analysis and refreshes the row when a new binding is established. */
	bindAnalysis() {
		if (this.boundAnalysis === this.analysis || !this.isConnected) return;
		this.unbindAnalysis();
		this.boundAnalysis = this.analysis;
		const analysis = this.boundAnalysis;
		if (analysis) {
			analysis.onSelected.set(this.UUID, this.refresh);
			analysis.onDeselected.set(this.UUID, this.refresh);
			analysis.onValues.set(this.UUID, this.refresh);
			analysis.onSerializableChange.set(this.UUID, this.refresh);
			analysis.onMoveOrResize.set(this.UUID, this.refresh);
			analysis.onSetInitialColor.set(this.UUID, this.refresh);
			analysis.onSetName.set(this.UUID, this.refresh);
			analysis.graph.onGraphActivation.set(this.UUID, this.refresh);
		}
		this.refresh();
	}
	/** Removes all subscriptions from the actual bound analysis, not necessarily the current property value. */
	unbindAnalysis() {
		const analysis = this.boundAnalysis;
		if (analysis) {
			analysis.onSelected.delete(this.UUID);
			analysis.onDeselected.delete(this.UUID);
			analysis.onValues.delete(this.UUID);
			analysis.onSerializableChange.delete(this.UUID);
			analysis.onMoveOrResize.delete(this.UUID);
			analysis.onSetInitialColor.delete(this.UUID);
			analysis.onSetName.delete(this.UUID);
			analysis.graph.onGraphActivation.delete(this.UUID);
		}
		this.boundAnalysis = void 0;
	}
	isWithinRow(target) {
		return target instanceof Node && this.renderRoot.contains(target);
	}
	get range() {
		const min = this.analysis?.min;
		const max = this.analysis?.max;
		if (min !== void 0 && max !== void 0 && Number.isFinite(min) && Number.isFinite(max) && min <= max) return {
			from: min,
			to: max
		};
	}
	highlightAnalysis() {
		this.registryController.setHighlight(this.range);
	}
	static {
		this.styles = lit.css`
        :host {
            display: table-row;
            white-space: nowrap;
        }

        td {
            padding: .25em .5em;
            color: var(--thermal-foreground);
            font-size: var(--thermal-fs-sm);
        }

        td.compact {
            padding: .25em;
        }

        .identity, .name, .actions {
            display: inline-flex;
            align-items: center;
            gap: .5em;
        }

        .identity {
            width: max-content;
            min-width: 100%;
            justify-content: space-between;
        }

        .name, .actions {
            flex-shrink: 0;
        }

        .name {
            min-width: 0;
            color: inherit;
            font: inherit;
        }

        button.name {
            padding: 0;
            border: 0;
            background: transparent;
            cursor: pointer;
        }

        button.name:hover {
            color: var(--thermal-primary);
        }

        .color {
            display: inline-block;
            width: 1em;
            height: 1em;
            flex-shrink: 0;
        }

        .selection-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
        }

        :host([selected]) .selection-indicator {
            background: var(--thermal-slate-dark);
        }
    `;
	}
	renderActions() {
		const analysis = this.analysis;
		if (!analysis) return lit.nothing;
		const size = this.tableMode === "compact" ? "sm" : "md";
		return lit.html`<span class="actions">
            ${this.allowsEdit ? lit.html`
                <file-analysis-edit .analysis=${analysis}>
                    <thermal-btn
                        slot="invoker"
                        size=${size}
                        icon="settings"
                        iconStyle="solid"
                        tooltip=${t$1("editsth", { what: analysis.name })}
                    ></thermal-btn>
                </file-analysis-edit>
                <thermal-btn
                    size=${size}
                    icon="trash"
                    iconStyle="micro"
                    tooltip="${t$1("delete")} ${analysis.name}"
                    @click=${() => analysis.file.analysis.layers.removeAnalysis(analysis.key)}
                ></thermal-btn>
            ` : lit.nothing}
            ${this.showRangePropagator && !(analysis instanceof _labirthermal_core.PointAnalysis) ? lit.html`
                <thermal-btn
                    size=${size}
                    icon="range"
                    iconStyle="outline"
                    tooltip="${t$1("range")}: ${analysis.name}"
                    disabled=${this.range === void 0}
                    @click=${() => {
			const range = this.range;
			if (range) analysis.file.group.registry.range.imposeRange(range);
		}}
                ></thermal-btn>
            ` : lit.nothing}
        </span>`;
	}
	renderName() {
		const analysis = this.analysis;
		if (!analysis) return lit.nothing;
		const label = lit.html`
            <span class="color" aria-hidden="true" style="background-color: ${analysis.initialColor}"></span>
            <span>${analysis.name}</span>
        `;
		return !this.selectionDisabled ? lit.html`
            <button
                type="button"
                class="name"
                aria-pressed=${analysis.selected}
                @click=${() => {
			if (analysis.selected) analysis.setDeselected(true);
			else analysis.setSelected(false, true);
		}}
            >
                <span class="selection-indicator" aria-hidden="true"></span>
                ${label}
            </button>
        ` : lit.html`<span class="name">${label}</span>`;
	}
	renderValue(statistic) {
		const analysis = this.analysis;
		if (!analysis) return lit.nothing;
		const value = analysis[statistic];
		const text = value === void 0 ? "-" : `${value.toFixed(2)} \u00b0C`;
		const active = analysis.graph.state[statistic === "avg" ? "AVG" : statistic === "min" ? "MIN" : "MAX"];
		const canActivate = !this.graphActivationDisabled && analysis.file.timeline.isSequence && (statistic === "avg" || analysis instanceof _labirthermal_core.AbstractAreaAnalysis);
		const background = active ? analysis.initialColor : "transparent";
		const foreground = active ? getContrastColor(analysis.initialColor) : "var(--thermal-foreground)";
		return lit.html`<td class=${this.tableMode === "compact" ? "compact" : ""}>
            ${canActivate ? lit.html`
                <thermal-btn
                    size=${this.tableMode === "compact" ? "sm" : "md"}
                    aria-pressed=${active}
                    tooltip="${t$1("graph")}: ${t$1(T[statistic])}"
                    style="background-color: ${background}; color: ${foreground}; --bg: ${background}; --bg-hover: ${background}; --color: ${foreground}; --color-hover: ${foreground};"
                    @click=${() => {
			if (statistic === "avg") analysis.graph.setAvgActivation(!active);
			else if (statistic === "min") analysis.graph.setMinActivation(!active);
			else analysis.graph.setMaxActivation(!active);
		}}
                >${text}</thermal-btn>
            ` : text}
        </td>`;
	}
	render() {
		const analysis = this.analysis;
		if (!analysis) return lit.nothing;
		const compact = this.tableMode === "compact";
		const hasActions = this.allowsEdit || this.showRangePropagator;
		const dimension = analysis instanceof _labirthermal_core.AbstractAreaAnalysis ? `${analysis.width}x${analysis.height}` : "1x1";
		return lit.html`
            <td class=${compact ? "compact" : ""}>
                <span class="identity">
                    ${this.renderName()}
                    ${compact && hasActions ? this.renderActions() : lit.nothing}
                </span>
            </td>
            ${this.renderValue("avg")}
            ${this.renderValue("min")}
            ${this.renderValue("max")}
            ${compact ? lit.nothing : lit.html`<td>${dimension}</td>`}
            ${!compact && hasActions ? lit.html`<td>${this.renderActions()}</td>` : lit.nothing}
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ attribute: false }), __decorateMetadata("design:type", Object)], FileAnalysisRowElement.prototype, "analysis", void 0);
__decorate([(0, lit_decorators_js.property)({ attribute: "table-mode" }), __decorateMetadata("design:type", Object)], FileAnalysisRowElement.prototype, "tableMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "selection-disabled"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisRowElement.prototype, "selectionDisabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "edit-disabled"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisRowElement.prototype, "editDisabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "graph-activation-disabled"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisRowElement.prototype, "graphActivationDisabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "show-range-propagator"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisRowElement.prototype, "showRangePropagator", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], FileAnalysisRowElement.prototype, "selected", void 0);
__decorate([(0, _lit_context.consume)({
	context: registryControllerContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], FileAnalysisRowElement.prototype, "registryController", void 0);
//#endregion
//#region src/controls/file/analysis/FileAnalysisTable.ts
/**
* Table of the analyses of the enclosing file provider.
*
* The table is interactive when the manager context enables interactive
* analyses or when the `force-interactive` attribute is present. Selection
* and editing follow the interactivity unless opted out. The range
* propagator and the opt-outs are independent boolean attributes that
* default to `false`.
*/
var FileAnalysisTableElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.tableMode = "full";
		this.showRangePropagator = false;
		this.selectionDisabled = false;
		this.editDisabled = false;
		this.graphActivationDisabled = false;
		this.forceInteractive = false;
		this.interactiveFromContext = false;
		this.analysis = [];
		this.selectionChanged = () => this.requestUpdate();
	}
	get isInteractive() {
		return this.interactiveFromContext || this.forceInteractive;
	}
	get allowsSelection() {
		return this.isInteractive && !this.selectionDisabled;
	}
	get allowsEdit() {
		return this.isInteractive && !this.editDisabled;
	}
	get allSelected() {
		return this.analysis.length > 0 && this.analysis.every((analysis) => analysis.selected);
	}
	onInstanceCreated() {
		this.requestUpdate();
	}
	onFailure() {}
	connectedCallback() {
		super.connectedCallback();
		this.bindFile();
	}
	disconnectedCallback() {
		this.unbindFile();
		super.disconnectedCallback();
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		/** Rebinds the selection listener when the provided file instance changes. */
		if (changedProperties.has("file")) this.bindFile();
	}
	/**
	* Subscribes to selection changes on the current file.
	* Avoids duplicate subscriptions and replaces any listener attached to a previous file.
	*/
	bindFile() {
		if (this.boundFile === this.file || !this.isConnected) return;
		this.unbindFile();
		this.boundFile = this.file;
		this.boundFile?.analysis.layers.onSelectionChange.set(this.UUID, this.selectionChanged);
	}
	/** Removes this component's selection listener from the file it is currently bound to. */
	unbindFile() {
		this.boundFile?.analysis.layers.onSelectionChange.delete(this.UUID);
		this.boundFile = void 0;
	}
	static {
		this.styles = lit.css`
        :host {
            display: block;
            width: 100%;
            min-width: 0;
            max-width: 100%;
            contain: inline-size;
            box-sizing: border-box;
            color: var(--thermal-foreground);
        }

        .overflow {
            width: 100%;
            max-width: 100%;
            min-width: 0;
            box-sizing: border-box;
            overflow-x: auto;
            overflow-y: hidden;
        }

        table {
            width: max-content;
            min-width: 100%;
            margin: 0;
            table-layout: auto;
            box-sizing: border-box;
            border-collapse: collapse;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
            font-size: var(--thermal-fs-sm);
        }

        th {
            text-align: left;
            white-space: nowrap;
            padding: .5em;
        }

        table.compact th {
            padding: .25em;
        }

        file-analysis-table-row:not(:last-child) {
            border-bottom: var(--thermal-border-width) dotted var(--thermal-slate);
        }

        file-analysis-table-row[selected] {
            background-color: var(--thermal-background);
        }

        .selection {
            display: inline-flex;
            align-items: center;
            gap: .5em;
            padding: 0;
            border: 0;
            background: transparent;
            color: inherit;
            font: inherit;
            cursor: pointer;
        }

        .selection:hover {
            color: var(--thermal-primary);
        }

        .selection-indicator {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            border: var(--thermal-border-width) var(--thermal-border-style) var(--thermal-slate);
        }

        .selection[aria-pressed="true"] .selection-indicator {
            background: var(--thermal-slate-dark);
        }
    `;
	}
	render() {
		if (this.file === void 0 || this.analysis.length === 0) return lit.nothing;
		const compact = this.tableMode === "compact";
		return lit.html`
            <div class="overflow" tabindex="0" role="region" aria-label=${t$1("analysis")}>
                <table class=${compact ? "compact" : "full"} aria-label=${t$1("analysis")}>
                    <thead>
                        <tr>
                            <th scope="col">
                                ${this.allowsSelection ? lit.html`
                                    <button
                                        type="button"
                                        class="selection"
                                        aria-pressed=${this.allSelected}
                                        @click=${() => {
			if (this.allSelected) this.file?.analysis.layers.deselectAll();
			else this.file?.analysis.layers.selectAll();
		}}
                                    >
                                        <span class="selection-indicator" aria-hidden="true"></span>
                                        ${t$1("analysis")}
                                    </button>
                                ` : t$1("analysis")}
                            </th>
                            <th scope="col">${t$1("avg")}</th>
                            <th scope="col">${t$1("min")}</th>
                            <th scope="col">${t$1("max")}</th>
                            ${compact ? lit.nothing : lit.html`<th scope="col">${t$1("size")}</th>`}
                            ${!compact && (this.allowsEdit || this.showRangePropagator) ? lit.html`<th scope="col"></th>` : lit.nothing}
                        </tr>
                    </thead>
                    <tbody>
                        ${(0, lit_directives_repeat_js.repeat)(this.analysis, (analysis) => analysis.key, (analysis) => lit.html`
                            <file-analysis-table-row
                                .analysis=${analysis}
                                .tableMode=${this.tableMode}
                                .interactiveanalysis=${this.allowsSelection}
                                .editEnabled=${this.allowsEdit}
                                .graphActivationEnabled=${!this.graphActivationDisabled}
                                .showRangePropagator=${this.showRangePropagator}
                            ></file-analysis-table-row>
                        `)}
                    </tbody>
                </table>
            </div>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ attribute: "table-mode" }), __decorateMetadata("design:type", Object)], FileAnalysisTableElement.prototype, "tableMode", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "show-range-propagator"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisTableElement.prototype, "showRangePropagator", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "selection-disabled"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisTableElement.prototype, "selectionDisabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "edit-disabled"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisTableElement.prototype, "editDisabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "graph-activation-disabled"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisTableElement.prototype, "graphActivationDisabled", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	attribute: "force-interactive"
}), __decorateMetadata("design:type", Boolean)], FileAnalysisTableElement.prototype, "forceInteractive", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: managerInteractiveAnalysesContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], FileAnalysisTableElement.prototype, "interactiveFromContext", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileAnalysisListContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Array)
], FileAnalysisTableElement.prototype, "analysis", void 0);
//#endregion
//#region src/controls/file/analysis/edit/analysisColorDropdown.ts
/** 
* Render the dropdown for color selection of an analysis. Property `analysis` needs to be passed down from the parent component 
* @package \@labirthermal/webcomponents
* @author Jan Jáchim
*/
var AnalysisColorDropdown = class extends AbstractThermalElement {
	willUpdate(_changedProperties) {
		super.willUpdate(_changedProperties);
		if (_changedProperties.has("analysis")) this.color = this.analysis.initialColor;
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("analysis")) {
			const oldAnalysis = _changedProperties.get("analysis");
			if (oldAnalysis) oldAnalysis.onSetInitialColor.delete(this.UUID);
			this.analysis.onSetInitialColor.set(this.UUID, (value) => {
				this.color = value;
			});
		}
	}
	static {
		this.styles = lit.css`

        thermal-dropdown div {
            display: flex;
            gap: 0.5em;
            border-radius: var( --thermal-radius );
            cursor: pointer;
            align-items: center;
        }

        thermal-dropdown .option {
            margin-bottom: 0px;
            padding: 5px;
        }

        thermal-dropdown div i {
            width: 1em;
            height: 1em;
            border-radius: 50%;
        }

        thermal-dropdown .option:hover {
            background-color: var( --thermal-slate );
        }
    
    `;
	}
	renderColor(value) {
		return lit.html`<i style="background-color: ${value};" aria-hidden="true" aria-disabled="true"></i><span>${value}</span>`;
	}
	render() {
		if (this.color === void 0) return lit.nothing;
		return lit.html`

            <thermal-dropdown>
                <div slot="invoker">
                    ${this.renderColor(this.color)}
                </div>

                ${(0, lit_directives_map_js.map)(_labirthermal_core.availableAnalysisColors, (color) => lit.html`
                    <div class="option" slot="option" @click=${() => {
			this.analysis.setInitialColor(color);
		}}>
                        ${this.renderColor(color)}
                    </div>
                `)}
                    
            </thermal-dropdown>

        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], AnalysisColorDropdown.prototype, "analysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AnalysisColorDropdown.prototype, "color", void 0);
//#endregion
//#region src/controls/file/analysis/edit/analysisNameInput.ts
/** 
* Render the input for editing the analysis name. Property `analysis` needs to be passed down from the parent component 
* @package \@labirthermal/webcomponents
* @author Jan Jáchim
*/
var AnalysisNameInput = class extends AbstractThermalElement {
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("analysis")) this.name = this.analysis.name;
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has("analysis")) {
			changedProperties.get("analysis")?.onSetName.delete(this.UUID);
			this.analysis.onSetName.set(this.UUID, (value) => {
				this.name = value;
			});
		}
	}
	static {
		this.styles = lit.css`

    
    `;
	}
	render() {
		return lit.html`

            <input 
                type="text"
                value=${(0, lit_directives_if_defined_js.ifDefined)(this.name)}
                @change=${(event) => {
			const target = event.target;
			const value = target.value !== "" ? target.value : this.analysis.nameInitial;
			this.analysis.setName(value);
		}}
            />

        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], AnalysisNameInput.prototype, "analysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AnalysisNameInput.prototype, "name", void 0);
//#endregion
//#region src/controls/file/analysis/edit/editAreaTable.ts
/** 
* The full table and form for editing an area analysis properties. Enables editing of name, color and dimensions (top, left, width, height, right, bottom). Property `analysis` needs to be passed down from the parent component 
* @package \@labirthermal/webcomponents
* @author Jan Jáchim
*/
var AreaEditTable = class extends AbstractThermalElement {
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("analysis")) {
			const analysis = this.analysis;
			this.top = analysis.top;
			this.left = analysis.left;
			this.width = analysis.width;
			this.height = analysis.height;
			this.right = analysis.left + analysis.width;
			this.bottom = analysis.top + analysis.height;
			this.maxX = analysis.file.width;
			this.maxY = analysis.file.height;
		}
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has("analysis")) {
			const oldAnalysis = changedProperties.get("analysis");
			if (oldAnalysis) oldAnalysis.onSerializableChange.delete(this.UUID);
			this.analysis.onSerializableChange.set(this.UUID, (analysis) => {
				this.top = analysis.top;
				this.left = analysis.left;
				this.width = analysis.width;
				this.height = analysis.height;
				this.right = analysis.left + analysis.width;
				this.bottom = analysis.top + analysis.height;
			});
		}
	}
	handleInput(event, callback) {
		const target = event.target;
		const value = parseInt(target.value);
		if (!isNaN(value)) {
			callback(value);
			this.analysis.onMoveOrResize.call(this.analysis);
		}
	}
	static {
		this.styles = lit.css`
    
        .table {

            display: table;
            width: 100%;
        
        }
    
    `;
	}
	render() {
		return lit.html`

            <div class="table">

                <thermal-field label=${t$1("name")}>
                    <analysis-name .analysis=${this.analysis}></analysis-name>
                </thermal-field>

                <thermal-field label=${t$1("color")}>
                    <analysis-color .analysis=${this.analysis}></analysis-color>
                </thermal-field>

                <thermal-field label=${t$1("left")}>
                    <input 
                        name="left" 
                        value=${(0, lit_directives_if_defined_js.ifDefined)(this.left)} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${(0, lit_directives_if_defined_js.ifDefined)(this.right !== void 0 ? this.right - 1 : this.maxX)}
                        @change=${(event) => this.handleInput(event, (value) => {
			this.analysis.setLeft(value);
		})}
                    />
                </thermal-field>

                <thermal-field label=${t$1("right")}>
                    <input 
                        name="right" 
                        value=${(0, lit_directives_if_defined_js.ifDefined)(this.right)} 
                        type="number" 
                        step="1" 
                        min=${this.left !== void 0 ? this.left + 1 : 0} 
                        max=${(0, lit_directives_if_defined_js.ifDefined)(this.maxX)}
                        @change=${(event) => this.handleInput(event, (value) => {
			this.analysis.setRight(value);
		})}
                    />
                </thermal-field>

                <thermal-field label=${t$1("top")}>
                    <input 
                        name="top" 
                        value=${(0, lit_directives_if_defined_js.ifDefined)(this.top)} 
                        type="number" 
                        step="1" 
                        min="0"
                        max=${(0, lit_directives_if_defined_js.ifDefined)(this.bottom !== void 0 ? this.bottom - 1 : this.maxY)}
                        @change=${(event) => this.handleInput(event, (value) => {
			this.analysis.setTop(value);
		})}
                    />
                </thermal-field>

                <thermal-field label=${t$1("bottom")}>
                    <input 
                        name="bottom" 
                        value=${(0, lit_directives_if_defined_js.ifDefined)(this.bottom)} 
                        type="number" 
                        step="1" 
                        min=${this.top !== void 0 ? this.top + 1 : 0}
                        max=${(0, lit_directives_if_defined_js.ifDefined)(this.maxY)}
                        @change=${(event) => this.handleInput(event, (value) => {
			this.analysis.setBottom(value);
		})}
                    />
                </thermal-field>
                

            </div>
    
        
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], AreaEditTable.prototype, "analysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AreaEditTable.prototype, "color", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "top", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "left", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "width", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "height", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], AreaEditTable.prototype, "type", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "right", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "bottom", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "maxX", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AreaEditTable.prototype, "maxY", void 0);
//#endregion
//#region src/controls/file/analysis/edit/editPointTable.ts
/** 
* The full table and form for editing a point analysis properties. Enables editing of name, color and coordinates (top, left). Property `analysis` needs to be passed down from the parent component 
* @package \@labirthermal/webcomponents
* @author Jan Jáchim
*/
var EditpointTable = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.topInputRef = (0, lit_directives_ref_js.createRef)();
		this.leftInputRef = (0, lit_directives_ref_js.createRef)();
	}
	willUpdate(changedProperties) {
		super.willUpdate(changedProperties);
		if (changedProperties.has("analysis")) {
			const analysis = this.analysis;
			this.top = analysis.top;
			this.left = analysis.left;
			this.maxX = analysis.file.width;
			this.maxY = analysis.file.height;
		}
	}
	updated(changedProperties) {
		super.updated(changedProperties);
		if (changedProperties.has("analysis")) {
			const oldAnalysis = changedProperties.get("analysis");
			if (oldAnalysis) oldAnalysis.onSerializableChange.delete(this.UUID);
			this.analysis.onSerializableChange.set(this.UUID, (analysis) => {
				this.top = analysis.top;
				this.left = analysis.left;
			});
		}
	}
	handleInput(event, callback) {
		const target = event.target;
		const value = parseInt(target.value);
		if (!isNaN(value)) {
			callback(value);
			this.analysis.onMoveOrResize.call(this.analysis);
		}
	}
	static {
		this.styles = lit.css`
    
        .table {

            display: table;
            width: 100%;
        
        }
    
    `;
	}
	render() {
		return lit.html`

            <div class="table">

                <thermal-field label=${t$1("name")}>
                    <analysis-name .analysis=${this.analysis}></analysis-name>
                </thermal-field>

                <thermal-field label=${t$1("color")}>
                    <analysis-color .analysis=${this.analysis}></analysis-color>
                </thermal-field>

                <thermal-field label=${t$1("top")} hint=${t$1("fromto", {
			from: 0,
			to: this.maxX
		})}>
                    <input 
                        name="top" 
                        value=${(0, lit_directives_if_defined_js.ifDefined)(this.top)} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.maxY}
                        @change=${(event) => this.handleInput(event, (value) => {
			this.analysis.setTop(value);
		})}
                    />
                </thermal-field>

                <thermal-field label=${t$1("left")} hint=${t$1("fromto", {
			from: 0,
			to: this.maxX
		})}>
                    <input
                        name="left" 
                        value=${(0, lit_directives_if_defined_js.ifDefined)(this.left)} 
                        type="number" 
                        step="1" 
                        min="0" 
                        max=${this.maxX}
                        @change=${(event) => this.handleInput(event, (value) => {
			this.analysis.setLeft(value);
		})}
                    />
                </thermal-field>

            </div>
        
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], EditpointTable.prototype, "analysis", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], EditpointTable.prototype, "top", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], EditpointTable.prototype, "left", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], EditpointTable.prototype, "maxX", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], EditpointTable.prototype, "maxY", void 0);
//#endregion
//#region src/controls/file/analysis/chart/loader.ts
/**
* @license
* Copyright 2014-2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
* Promise that resolves when the gviz loader script is loaded, which
* provides access to the Google Charts loading API.
*/
const loaderPromise = new Promise((resolve, reject) => {
	if (typeof google !== "undefined" && google.charts && typeof google.charts.load === "function") resolve();
	else {
		let loaderScript = document.querySelector("script[src=\"https://www.gstatic.com/charts/loader.js\"]");
		if (!loaderScript) {
			loaderScript = document.createElement("script");
			loaderScript.src = "https://www.gstatic.com/charts/loader.js";
			document.head.appendChild(loaderScript);
		}
		loaderScript.addEventListener("load", resolve);
		loaderScript.addEventListener("error", reject);
	}
});
/**
* Loads Google Charts API with the selected settings or using defaults.
*
* The following settings are available:
* - version: which version of library to load, default: 'current',
* - packages: which chart packages to load, default: ['corechart'],
* - language: what language to load library in, default: `lang` attribute on
*   `<html>` or 'en' if not specified,
* - mapsApiKey: key to use for maps API.
*/
async function load(settings = {}) {
	await loaderPromise;
	const { version = "current", packages = ["corechart"], language = document.documentElement.lang || "en", mapsApiKey } = settings;
	return google.charts.load(version, {
		"packages": packages,
		"language": language,
		"mapsApiKey": mapsApiKey
	});
}
/**
* Creates a DataTable object for use with a chart.
*
* Multiple different argument types are supported. This is because the
* result of loading the JSON data URL is fed into this function for
* DataTable construction and its format is unknown.
*
* The data argument can be one of a few options:
*
* - null/undefined: An empty DataTable is created. Columns must be added
* - !DataTable: The object is simply returned
* - {{cols: !Array, rows: !Array}}: A DataTable in object format
* - {{cols: !Array}}: A DataTable in object format without rows
* - !Array<!Array>: A DataTable in 2D array format
*
* Un-supported types:
*
* - Empty !Array<!Array>: (e.g. `[]`) While technically a valid data
*   format, this is rejected as charts will not render empty DataTables.
*   DataTables must at least have columns specified. An empty array is most
*   likely due to a bug or bad data. If one wants an empty DataTable, pass
*   no arguments.
* - Anything else
*
* See <a
* href="https://developers.google.com/chart/interactive/docs/reference#datatable-class">the
* docs</a> for more details.
*
* @param data The data which we should use to construct new DataTable object
*/
async function dataTable(data) {
	await load();
	if (data == null) return new google.visualization.DataTable();
	else if (data.getNumberOfRows) return data;
	else if (data.cols) return new google.visualization.DataTable(data);
	else if (data.length > 0) return google.visualization.arrayToDataTable(data);
	else if (data.length === 0) throw new Error("Data was empty.");
	throw new Error("Data format was not recognized.");
}
/**
* Creates new `ChartWrapper`.
* @param container Element in which the chart will be drawn
*/
async function createChartWrapper(container) {
	await load();
	return new google.visualization.ChartWrapper({ "container": container });
}
//#endregion
//#region src/controls/file/analysis/chart/chart.ts
/**
* @license
* Copyright 2014-2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     https://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
const DEFAULT_EVENTS = ["ready", "select"];
/**
* Constructor names for supported chart types.
*
* `ChartWrapper` expects a constructor name and assumes `google.visualization`
*  as the default namespace.
*/
const CHART_TYPES = {
	"area": "AreaChart",
	"bar": "BarChart",
	"md-bar": "google.charts.Bar",
	"bubble": "BubbleChart",
	"calendar": "Calendar",
	"candlestick": "CandlestickChart",
	"column": "ColumnChart",
	"combo": "ComboChart",
	"gantt": "Gantt",
	"gauge": "Gauge",
	"geo": "GeoChart",
	"histogram": "Histogram",
	"line": "LineChart",
	"md-line": "google.charts.Line",
	"org": "OrgChart",
	"pie": "PieChart",
	"sankey": "Sankey",
	"scatter": "ScatterChart",
	"md-scatter": "google.charts.Scatter",
	"stepped-area": "SteppedAreaChart",
	"table": "Table",
	"timeline": "Timeline",
	"treemap": "TreeMap",
	"wordtree": "WordTree"
};
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
var ThermalChartElement = class extends lit.LitElement {
	constructor(..._args) {
		super(..._args);
		this.type = "column";
		this.events = [];
		this.options = void 0;
		this.cols = void 0;
		this.rows = void 0;
		this.data = void 0;
		this.view = void 0;
		this.selection = void 0;
		this.drawn = false;
		this._data = void 0;
		this.chartWrapper = null;
		this.redrawTimeoutId = void 0;
		this.chartRef = (0, lit_directives_ref_js.createRef)();
		this.handleGraphPointerMove = (event) => {
			const container = this.chartRef.value;
			const layout = this.onGraphClick || this.onGraphHover ? this.getGraphLayout() : void 0;
			const chartArea = layout?.getChartAreaBoundingBox();
			if (!container || !layout || !chartArea) {
				if (container) container.style.cursor = "";
				this.onGraphHover?.(void 0);
				return;
			}
			const bounds = container.getBoundingClientRect();
			const x = event.clientX - bounds.left;
			const y = event.clientY - bounds.top;
			const inVisualization = this.isGraphVisualizationPoint(x, y, layout);
			container.style.cursor = inVisualization && this.onGraphClick ? "pointer" : "";
			this.onGraphHover?.(inVisualization ? Math.max(0, Math.min(100, (x - chartArea.left) / chartArea.width * 100)) : void 0);
		};
		this.handleGraphClickEvent = (event) => {
			const container = this.chartRef.value;
			const layout = this.getGraphLayout();
			if (!container || !layout || !this.onGraphClick) return;
			const bounds = container.getBoundingClientRect();
			const x = event.clientX - bounds.left;
			const y = event.clientY - bounds.top;
			const chartArea = layout.getChartAreaBoundingBox();
			if (chartArea.width <= 0 || !this.isGraphVisualizationPoint(x, y, layout) || x < chartArea.left || x > chartArea.left + chartArea.width) return;
			const relativeTimeMs = layout.getHAxisValue?.(x);
			if (typeof relativeTimeMs === "number" && Number.isFinite(relativeTimeMs)) this.onGraphClick(relativeTimeMs);
		};
		this.handleGraphPointerLeave = () => {
			if (this.chartRef.value) this.chartRef.value.style.cursor = "";
			this.onGraphHover?.(void 0);
		};
		this.onWrapper = new _labirthermal_core.CallbacksManager();
		this.left = 0;
		this.top = 0;
		this.w = 0;
		this.h = 0;
	}
	static {
		this.styles = lit.css`
    :host {
      display: -webkit-flex;
      display: -ms-flex;
      display: flex;
      margin: 0;
      padding: 0;
      width: 400px;
      height: 300px;
    }

    :host([hidden]) {
      display: none;
    }

    :host([type="gauge"]) {
      width: 300px;
      height: 300px;
    }

    #chartdiv {
      width: 100%;
    }

    /* Workaround for slow initial ready event for tables. */
    .google-visualization-table-loadtest {
      padding-left: 6px;
    }
  `;
	}
	render() {
		return lit.html`
      <div id="styles"></div>
      <div
        ${(0, lit_directives_ref_js.ref)(this.chartRef)}
        id="chartdiv"
        @pointermove=${this.handleGraphPointerMove}
        @pointerleave=${this.handleGraphPointerLeave}
        @click=${this.handleGraphClickEvent}
      ></div>
    `;
	}
	getGraphLayout() {
		return (this.chartWrapper?.getChart())?.getChartLayoutInterface?.();
	}
	isGraphVisualizationPoint(x, y, layout) {
		const chartArea = layout.getChartAreaBoundingBox();
		const inChartArea = chartArea.width > 0 && chartArea.height > 0 && x >= chartArea.left && x <= chartArea.left + chartArea.width && y >= chartArea.top && y <= chartArea.top + chartArea.height;
		const axisLabels = layout.getBoundingBox?.("hAxis#0#labels");
		const axisBottom = Math.max(chartArea.top + chartArea.height, axisLabels ? axisLabels.top + axisLabels.height : 0);
		const inHorizontalAxis = x >= chartArea.left && x <= chartArea.left + chartArea.width && y >= chartArea.top && y <= axisBottom;
		return inChartArea || inHorizontalAxis;
	}
	getRef() {
		return this.chartRef.value;
	}
	firstUpdated() {
		createChartWrapper(this.shadowRoot.getElementById("chartdiv")).then((chartWrapper) => {
			this.chartWrapper = chartWrapper;
			this.onWrapper.call(chartWrapper);
			this.typeChanged();
			google.visualization.events.addListener(chartWrapper, "ready", () => {
				this.drawn = true;
				if (this.selection) this.selectionChanged();
			});
			google.visualization.events.addListener(chartWrapper, "select", () => {
				const selection = chartWrapper.getChart()?.getSelection() ?? [];
				this.selection = selection;
			});
			this.propagateEvents(DEFAULT_EVENTS, chartWrapper);
		});
	}
	updated(changedProperties) {
		if (changedProperties.has("type")) this.typeChanged();
		if (changedProperties.has("rows") || changedProperties.has("cols")) this.rowsOrColumnsChanged();
		if (changedProperties.has("data")) this.dataChanged();
		if (changedProperties.has("view")) this.viewChanged();
		if (changedProperties.has("_data") || changedProperties.has("options")) this.redraw();
		if (changedProperties.has("selection")) this.selectionChanged();
	}
	/** Reacts to chart type change. */
	typeChanged() {
		if (this.chartWrapper == null) return;
		this.chartWrapper.setChartType(CHART_TYPES[this.type] || this.type);
		const lastChart = this.chartWrapper.getChart();
		google.visualization.events.addOneTimeListener(this.chartWrapper, "ready", () => {
			const chart = this.chartWrapper.getChart();
			if (chart !== lastChart) this.propagateEvents(this.events.filter((eventName) => !DEFAULT_EVENTS.includes(eventName)), chart);
			const stylesDiv = this.shadowRoot.getElementById("styles");
			if (!stylesDiv.children.length) this.localizeGlobalStylesheets(stylesDiv);
		});
		this.redraw();
	}
	/**
	* Adds listeners to propagate events from the chart.
	*/
	propagateEvents(events, eventTarget) {
		for (const eventName of events) google.visualization.events.addListener(eventTarget, eventName, (event) => {
			this.dispatchEvent(new CustomEvent(`google-chart-${eventName}`, {
				bubbles: true,
				composed: true,
				detail: {
					chart: this.chartWrapper.getChart(),
					data: event
				}
			}));
		});
	}
	/** Sets the selectiton on the chart. */
	selectionChanged() {
		if (this.chartWrapper == null) return;
		const chart = this.chartWrapper.getChart();
		if (chart == null) return;
		if (chart.setSelection) {
			if (this.type === "timeline") {
				const oldSelection = JSON.stringify(chart.getSelection());
				if (JSON.stringify(this.selection) === oldSelection) return;
			}
			chart.setSelection(this.selection);
		}
	}
	/**
	* Redraws the chart.
	*
	* Called automatically when data/type/selection attributes change.
	* Call manually to handle view updates, page resizes, etc.
	*/
	redraw() {
		if (this.chartWrapper == null || this._data == null) return;
		this.chartWrapper.setDataTable(this._data);
		this.chartWrapper.setOptions(this.options || {});
		this.drawn = false;
		if (this.redrawTimeoutId !== void 0) clearTimeout(this.redrawTimeoutId);
		this.redrawTimeoutId = window.setTimeout(() => {
			this.chartWrapper.draw();
			const dimensions = this.chartWrapper.visualization.ha.O;
			this.left = dimensions.left;
			this.top = dimensions.top;
			this.w = dimensions.width;
			this.h = dimensions.height;
		}, 5);
	}
	/**
	* Returns the chart serialized as an image URI.
	*
	* Call this after the chart is drawn (`google-chart-ready` event).
	*/
	get imageURI() {
		if (this.chartWrapper == null) return null;
		const chart = this.chartWrapper.getChart();
		return chart && chart.getImageURI();
	}
	/** Handles changes to the `view` attribute. */
	viewChanged() {
		if (!this.view) return;
		this._data = this.view;
	}
	/** Handles changes to the rows & columns attributes. */
	async rowsOrColumnsChanged() {
		const { rows, cols } = this;
		if (!rows || !cols) return;
		try {
			const dt = await dataTable({ cols });
			dt.addRows(rows);
			this._data = dt;
		} catch (reason) {
			this.shadowRoot.getElementById("chartdiv").textContent = String(reason);
		}
	}
	/**
	* Handles changes to the `data` attribute.
	*/
	dataChanged() {
		let data = this.data;
		let dataPromise;
		if (!data) return;
		let isString = false;
		try {
			data = JSON.parse(data);
		} catch (e) {
			console.error(e);
			isString = typeof data === "string" || data instanceof String;
		}
		if (isString) dataPromise = fetch(data).then((response) => response.json());
		else dataPromise = Promise.resolve(data);
		dataPromise.then(dataTable).then((data) => {
			this._data = data;
		});
	}
	/**
	* Queries global document head for Google Charts `link#load-css-*` and clones
	* them into the local root's `div#styles` element for shadow dom support.
	*/
	localizeGlobalStylesheets(stylesDiv) {
		const stylesheets = Array.from(document.head.querySelectorAll("link[rel=\"stylesheet\"][type=\"text/css\"][id^=\"load-css-\"]"));
		for (const stylesheet of stylesheets) {
			const clonedStylesheet = document.createElement("link");
			clonedStylesheet.setAttribute("rel", "stylesheet");
			clonedStylesheet.setAttribute("type", "text/css");
			clonedStylesheet.setAttribute("href", stylesheet.getAttribute("href"));
			stylesDiv.appendChild(clonedStylesheet);
		}
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "type", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Array }), __decorateMetadata("design:type", Array)], ThermalChartElement.prototype, "events", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Object,
	hasChanged: () => true
}), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "options", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Array }), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "cols", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Array }), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "rows", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "data", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "view", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Array }), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "selection", void 0);
__decorate([(0, lit_decorators_js.property)({ attribute: false }), __decorateMetadata("design:type", Function)], ThermalChartElement.prototype, "onGraphClick", void 0);
__decorate([(0, lit_decorators_js.property)({ attribute: false }), __decorateMetadata("design:type", Function)], ThermalChartElement.prototype, "onGraphHover", void 0);
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Object)], ThermalChartElement.prototype, "_data", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], ThermalChartElement.prototype, "left", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], ThermalChartElement.prototype, "top", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], ThermalChartElement.prototype, "w", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Number,
	reflect: true
}), __decorateMetadata("design:type", Number)], ThermalChartElement.prototype, "h", void 0);
//#endregion
//#region src/utils/iife.ts
/**
* Registers and defines all custom elements from a provided list
* 
* @module @labirthermal/webcomponents
* 
*/
const defineAllWebcomponents = (name, version, catalog) => {
	for (const [tag, cls] of Object.entries(catalog)) defineWebcomponent(name, version, tag, cls);
};
/**
* Registers a custom element and defines it right away.
* 
* @module @labirthermal/webcomponents
*/
const defineWebcomponent = (name, version, tag, cls) => {
	if (customElements.get(tag)) {
		console.warn(name, version, "🟥", ...debugclsName(tag, cls));
		return;
	}
	customElements.define(tag, cls);
	console.info(name, version, "✅", ...debugclsName(tag, cls));
};
const tagNameMaxLength = 50;
const tagline = ".........................................................";
const debugclsName = (tag, cls) => {
	const tagLength = tag.length;
	if (tagLength > tagNameMaxLength) tag = tag.substring(0, 47) + "...";
	return [
		tag,
		tagline.substring(0, tagNameMaxLength - tagLength),
		cls.name
	];
};
//#endregion
//#region src/apps/AustralianApparentTemperature.ts
const converters = {
	fromAttribute(value) {
		if (typeof value === "string") {
			const trimmedValue = value.trim();
			if (trimmedValue.length > 0) return parseFloat(trimmedValue);
			else return;
		} else return;
	},
	toAttribute(value) {
		if (value !== void 0) return value.toString();
		else return;
	}
};
var AatAppElement = class extends AbstractThermalElement {
	constructor(..._args) {
		super(..._args);
		this.tRef = (0, lit_directives_ref_js.createRef)();
		this.vRef = (0, lit_directives_ref_js.createRef)();
		this.vunitsRef = (0, lit_directives_ref_js.createRef)();
		this.haRef = (0, lit_directives_ref_js.createRef)();
		this.vunits = "mps";
	}
	kphToMps(kph) {
		return kph * .2778;
	}
	calculateE(h, t) {
		return h * (6.105 / 100) * Math.exp(17.27 * t / (237.7 + t));
	}
	calculateTa(t, e, v) {
		return t + .33 * e - .7 * v - 4;
	}
	firstUpdated(_changedProperties) {
		super.firstUpdated(_changedProperties);
		initLocalesInTopLevelElement(this);
		if (this.tRef.value) this.tRef.value.addEventListener("change", (event) => {
			const target = event.target;
			const value = parseFloat(target.value);
			if (!isNaN(value)) this.temperature = Math.min(100, Math.max(-275.4, value));
		});
		if (this.haRef.value) this.haRef.value.addEventListener("change", (event) => {
			const target = event.target;
			const value = parseFloat(target.value);
			if (!isNaN(value)) this.ha = Math.min(100, Math.max(0, value));
		});
		if (this.vRef.value) this.vRef.value.addEventListener("change", (event) => {
			const target = event.target;
			const value = parseFloat(target.value);
			if (!isNaN(value)) this.v = Math.max(0, value);
		});
	}
	processValueChange(_changedProperties, key) {
		if (_changedProperties.has(key)) {
			const newValue = this[key];
			const inputRef = this[`${key}Ref`];
			if (inputRef.value) {
				if (newValue !== void 0 && newValue !== null) inputRef.value.value = newValue.toString();
				else inputRef.value.value = "";
			}
			this.recalculateVa();
		}
	}
	recalculateVa() {
		if (this.temperature !== void 0 && this.ha !== void 0 && this.v !== void 0) {
			const v = this.vunits === "mps" ? this.v : this.kphToMps(this.v);
			const e = this.calculateE(this.ha, this.temperature);
			const ta = this.calculateTa(this.temperature, e, v);
			this.ta = ta;
		} else this.ta = void 0;
	}
	shouldUpdate(_changedProperties) {
		super.shouldUpdate(_changedProperties);
		if (this.ha) {
			if (this.ha < 0) {
				this.ha = 0;
				if (this.haRef.value) this.haRef.value.value = "0";
			}
			if (this.ha > 100) {
				this.ha = 100;
				if (this.haRef.value) this.haRef.value.value = "100";
			}
		}
		return true;
	}
	willUpdate(_changedProperties) {
		super.willUpdate(_changedProperties);
		this.processValueChange(_changedProperties, "temperature");
		this.processValueChange(_changedProperties, "v");
		this.processValueChange(_changedProperties, "ha");
		if (_changedProperties.has("vunits")) {
			if (this.vunitsRef.value) {
				this.vunitsRef.value.value = this.vunits;
				this.recalculateVa();
			}
		}
	}
	static {
		this.styles = lit.css`

        .table {
            display: table;
            width: 100%;
            border-collapse: collapse;
        }
    
        .field {

            width: 100%;
            display: table-row;

        }

        .column {
            display: table-cell;
            padding: calc( var(--thermal-gap) * .5 );
        }

        .column__label {
            text-align: right;
        }

        .column__value {
        
        }

        .input_wrapper {

            background: var( --thermal-background );

            width: 200px;
            padding: calc( var( --thermal-gap ) / 2 );

            border-radius: var( --thermal-radius );
        
        }

        input {

            font-size: var(--thermal-fs);
            width: 120px;
            text-align: right;
            border: 0;
            border-bottom: 1px var(--thermal-border-style)var( --thermal-slate-light );
            background: transparent;
            color: var( --thermal-foreground );

            -moz-appearance: textfield;

            &:focus {
                outline: 0;
                border-bottom: 1px var(--thermal-border-style)var( --thermal-primary );
            }
        
        }

        select, option, input {
            font-size: var(--thermal-fs);
            color: var( --thermal-foreground );
            background: var( --thermal-background );
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate-light );
            border-radius: var( --thermal-radius );
        }



        .result {

            padding: calc(var(--thermal-gap) * .7);
            border: var(--thermal-border-width) var(--thermal-border-style) var( --thermal-slate );
            border-radius: var( --thermal-radius );
            text-align: center;

            & > p {
                margin: 0;
                padding: calc( var( --thermal-gap ) * .25 );
            }

        }

        .result_value {
            font-weight: bold;
            font-size: calc( var(--thermal-fs) * 1.2 )
        }

        .result_label {
        }

        .result_comment {
            font-size: calc( var(--thermal-fs) * .8 )
        }

        .tabindex {
            border-radius: var( --thermal-radius );
            &:focus {
                outline: 3px var(--thermal-border-style)var(--thermal-primary);
            }
        }


    `;
	}
	renderNumberField(inputRef, id, label, unit, value, min, max, step, hint) {
		const u = typeof unit === "string" ? (0, lit_directives_unsafe_html_js.unsafeHTML)(unit) : unit;
		return lit.html`
            <div class="field">

                <div class="column column__label">
                    <label for=${id}>
                        ${label}
                    </label>
                </div>
                <div class="column column__value">

                    <div class="input_wrapper">
                        <input 
                            ${(0, lit_directives_ref_js.ref)(inputRef)} 
                            id=${id}
                            name=${id}
                            value=${(0, lit_directives_if_defined_js.ifDefined)(value)}
                            min=${(0, lit_directives_if_defined_js.ifDefined)(min)}
                            max=${(0, lit_directives_if_defined_js.ifDefined)(max)}
                            step=${(0, lit_directives_if_defined_js.ifDefined)(step)}
                            type="number"
                            @blur=${(event) => {
			const target = event.target;
			const value = target.value.trim();
			if (value === "" || value === void 0 || value === null) this[id] = void 0;
			else this[id] = parseFloat(target.value);
		}}
                        ></input>
                        <span>${u}</span>
                    </div>

                    ${hint ? lit.html`<label for=${id}>${hint}</label>` : lit.nothing}

                </div>

            </div>

            
        `;
	}
	renderResult(apparentTemperature, temperature) {
		const diff = apparentTemperature - temperature;
		const prop = {
			diff: Math.abs(diff).toFixed(2),
			app: apparentTemperature.toFixed(2),
			t: temperature
		};
		const summary = t$1("apparenttemperatureverbose", prop);
		const comment = diff < 0 ? t$1("youfeelcolder", prop) : t$1("youfeelwarmer", prop);
		const result = apparentTemperature.toFixed(2);
		return lit.html`<div class="result">

            <p class="result_label">${t$1("apparenttemperature")}</p>

            <p class="result_value">
                ${result} °C
            </p>

            <p class="result_comment">${summary}</p>

            <p class="result_comment">${comment}</p>
        
        </div>`;
	}
	render() {
		return lit.html`
            <thermal-app 
                label=${t$1("apparenttemperature")} 
                author="LabIR Edu" 
                license="CC BY-SA 4.0"
            >

                <thermal-dialog label=${t$1("info")} slot="bar-pre">
                    <thermal-btn slot="invoker">${t$1("info")}</thermal-btn>
                    <div slot="content">
                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(t$1("apparenttemperaturehint", { href: "https://en.wikipedia.org/wiki/Wind_chill#Australian_apparent_temperature" }))}
                    </div>
                </thermal-dialog>

                ${this.t !== void 0 || this.v !== void 0 || this.ha !== void 0 ? lit.html`<thermal-btn 
                slot="bar-pre"
                @click=${() => {
			this.temperature = void 0;
			this.ha = void 0;
			this.ta = void 0;
			this.v = void 0;
		}}>Reset</thermal-btn>` : lit.nothing}


                <section class="table">

                ${this.renderNumberField(this.tRef, "temperature", t$1("airtemperature"), "°C", this.temperature, -273.15, 100, .1)}

                ${this.renderNumberField(this.vRef, "v", t$1("windspeed"), lit.html`<select 
                    @change=${(event) => {
			const value = event.target.value;
			this.vunits = value;
		}} 
                    value=${this.vunits}
                    ${(0, lit_directives_ref_js.ref)(this.vunitsRef)}
                >
                    <option value="mps">m/s</option>
                    <option value="kph">km/h</option>
                </select>`, this.v, 0, void 0, .1)}

                ${this.renderNumberField(this.haRef, "ha", t$1("relativeairhumidity"), "%", this.ha, 0, 100, .1)}

                </section>
                <div  class="tabindex" tabindex="0">
                ${this.ta !== void 0 && this.temperature !== void 0 ? this.renderResult(this.ta, this.temperature) : lit.nothing}
                </div>
                

            </thermal-app>
        `;
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: "t",
	converter: converters
}), __decorateMetadata("design:type", Number)], AatAppElement.prototype, "temperature", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true,
	converter: converters
}), __decorateMetadata("design:type", Number)], AatAppElement.prototype, "v", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true,
	converter: converters
}), __decorateMetadata("design:type", Number)], AatAppElement.prototype, "ha", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AatAppElement.prototype, "ta", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true,
	attribute: true
}), __decorateMetadata("design:type", String)], AatAppElement.prototype, "vunits", void 0);
__decorate([
	(0, _lit_context.provide)({ context: localeContext }),
	(0, lit_decorators_js.property)({
		reflect: true,
		converter: localeConverter
	}),
	__decorateMetadata("design:type", Object)
], AatAppElement.prototype, "locale", void 0);
//#endregion
//#region src/apps/ThermalDropinApp.ts
var DropinAppElement = class extends AbstractApp {
	constructor(..._args) {
		super(..._args);
		this.palette = "jet";
		this.advancedPalettes = false;
		this.smoothThermograms = false;
		this.smoothGraph = false;
		this.tool = "inspect";
		this.managerController = new ManagerController(this);
		this.opacity = 1;
		this.loading = false;
		this.registryController = new RegistryController(this);
		this.autoclearGroup = false;
		this.groupController = new GroupController(this);
		this.ms = 0;
		this.playbackSpeed = 1;
		this.autoHighlight = false;
		this.fileController = new FileController(this);
		this.orderby = "date";
		this.ordering = "asc";
		this.groupListingController = new GroupListingController(this);
		this.displayMode = "input";
		this.toDisplay = [];
	}
	static {
		this.properties = {
			...ManagerController.HOST_PROPERTIES,
			...RegistryController.HOST_PROPERTIES,
			...GroupController.HOST_PROPERTIES,
			...FileController.HOST_PROPERTIES,
			...GroupListingController.HOST_PROPERTIES
		};
	}
	get manager() {
		return this.managerObject;
	}
	connectedCallback() {
		super.connectedCallback();
		try {
			(0, public_ip.publicIpv4)().then((ip) => this.ip = ip);
		} catch (error) {
			console.error("Failed to get public IPv4 address:", error);
		}
		const listener = async (files) => {
			this.log("Files received in listener:", files);
			if (this.onValueChangeTimeout !== void 0) clearTimeout(this.onValueChangeTimeout);
			this.onValueChangeTimeout = setTimeout(async () => {
				this.toDisplay = files;
			}, 0);
		};
		this.groupObject?.files.addListener(this.UUID, listener.bind(this));
		this.groupController.onInternalObject.set(this.UUID, (group) => {
			group.files.addListener(this.UUID, listener.bind(this));
		});
	}
	willUpdate(_changedProperties) {
		super.willUpdate(_changedProperties);
		if (_changedProperties.has("toDisplay")) {
			if (this.toDisplay.length === 0) this.displayMode = "input";
			else if (this.toDisplay.length === 1) {
				this.displayMode = "detail";
				this.fileController.receiveInstance(this.toDisplay[0]);
				this.postLoadedProcessingAndApplyMinmax();
			} else if (this.toDisplay.length > 1) {
				this.displayMode = "list";
				this.postLoadedProcessingAndApplyMinmax();
			}
		}
	}
	/**
	* Postprocess the registry and reset its range to apply min and max values.
	*/
	async postLoadedProcessingAndApplyMinmax() {
		await this.registryObject.postLoadedProcessing();
		this.registryObject.range.applyMinmax();
	}
	handleClear() {
		if (this.groupObject !== void 0) {
			this.fileController.removeInstance();
			this.groupObject.files.removeAllInstances();
			this.file = void 0;
			this.requestUpdate();
			this.analysis1 = void 0;
			this.analysis2 = void 0;
			this.analysis3 = void 0;
			this.analysis4 = void 0;
			this.analysis5 = void 0;
			this.analysis6 = void 0;
			this.analysis7 = void 0;
		}
	}
	static {
		this.styles = lit.css`
        ${GroupListingController.styles}
    
        .layout {
        
            width: 100%;
            display: grid;
            grid-template-columns: auto 1fr;
            gap: 1em;
        
        }

        .layout-content {
            min-width: 0;
        }

        manager-tool-bar {
            height: 2em;
        }

    `;
	}
	async handleDropAndClear(results) {
		this.log(results);
		const readers = results.filter((result) => result instanceof _labirthermal_core.ThermalFileReader);
		this.groupListingController.backupReaders(readers);
		this.groupListingController.restoreTheEntireBackup();
	}
	renderIntroScene() {
		return lit.html`
            <group-dropin-element .onDrop=${this.handleDropAndClear.bind(this)}></group-dropin-element>
        `;
	}
	renderLayout(children) {
		return lit.html`
        <div class="layout">
            <div style="width: 2em;"></div>
            <div class="layout-content">${children}</div>
        </div>
        `;
	}
	renderHeader() {
		const elements = [];
		if (this.displayMode === "input") elements.push(lit.html`<group-dropin-input 
                slot="bar-pre"
                variant="background"
                icon="upload"
                iconStyle="micro"
                tooltip="Vyberte soubory z disku"
                .onDrop=${this.handleDropAndClear.bind(this)}
            ></group-dropin-input>`);
		if (this.displayMode !== "input") elements.push(lit.html`
            <manager-tool-bar slot="pre-bar"></manager-tool-bar>
            <manager-palette-dropdown slot="pre-bar"></manager-palette-dropdown>
            <registry-range-form slot="pre-bar"></registry-range-form>
            
            `);
		if (this.displayMode === "list") elements.push(lit.html`${this.groupListingController.renderListHeader("bar-header")}`);
		if (this.displayMode === "detail") elements.push(lit.html`${this.groupListingController.renderDetailHeader(this.groupObject.files.value[0], "bar-pre")}`);
		if (this.displayMode !== "input") {
			elements.push(lit.html`<thermal-dialog label="${t$1("config")}" slot="bar-pre">
                <thermal-btn slot="invoker" tooltip="${t$1("config")}" icon="settings" iconStyle="solid"></thermal-btn>
                <div slot="content">
                    <table>
                        <manager-export-panel></manager-export-panel>
                        <display-panel></display-panel>
                    </table>
                </div>
            </thermal-dialog>`);
			elements.push(this.groupListingController.renderTemperatureScale());
		}
		return elements;
	}
	renderDetail() {
		return this.renderLayout(this.groupListingController.renderDetailBody());
	}
	renderList() {
		const map = (0, lit_directives_repeat_js.repeat)(this.toDisplay, (instance) => instance.id, (instance) => this.groupListingController.renderThumbnail(instance));
		return this.renderLayout(this.groupListingController.renderListContainer(map));
	}
	renderAuto() {
		switch (this.displayMode) {
			case "input": return this.renderIntroScene();
			case "list": return this.renderList();
			case "detail": return this.renderDetail();
		}
	}
	render() {
		try {
			const label = this.label ?? "LabIR Web Analyser";
			return lit.html`<thermal-app 
                label="${label}"
                ?show-fullscreen=${true}
            >

                ${this.renderHeader()}

                <slot name="bar-pre" slot="bar-pre"></slot>

                ${this.renderAuto()}

            </thermal-app>

        `;
		} catch (error) {
			console.error(error);
			return lit.html`Stala se chyba`;
		}
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: String,
	reflect: true
}), __decorateMetadata("design:type", String)], DropinAppElement.prototype, "displayMode", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", String)], DropinAppElement.prototype, "ip", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], DropinAppElement.prototype, "toDisplay", void 0);
__decorate([
	(0, _lit_context.provide)({ context: localeContext }),
	(0, lit_decorators_js.property)({
		reflect: true,
		converter: localeConverter
	}),
	__decorateMetadata("design:type", Object)
], DropinAppElement.prototype, "locale", void 0);
//#endregion
//#region src/apps/AbstractSingleFileApp.ts
/**
* Common foundation for apps that handle a single thermal file loaded from the URL.
*/
var AbstractSingleFileAppElement = class extends AbstractApp {
	constructor(..._args) {
		super(..._args);
		this.interactiveAnalysis = true;
		this.managerController = new ManagerController(this);
		this.palette = "jet";
		this.advancedPalettes = false;
		this.smoothThermograms = false;
		this.smoothGraph = false;
		this.tool = "inspect";
		this.registryController = new RegistryController(this);
		this.opacity = 1;
		this.loading = false;
		this.groupController = new GroupController(this);
		this.autoclearGroup = true;
		this.fileController = new FileController(this);
		this.ms = 0;
		this.playbackSpeed = 1;
		this.autoHighlight = false;
		this.fileLoadController = new FileLoadController(this);
	}
	static {
		this.properties = {
			...AbstractApp.properties,
			...ManagerController.HOST_PROPERTIES,
			...RegistryController.HOST_PROPERTIES,
			...GroupController.HOST_PROPERTIES,
			...FileController.HOST_PROPERTIES,
			...FileLoadController.HOST_PROPERTIES
		};
	}
};
__decorate([
	(0, _lit_context.provide)({ context: managerInteractiveAnalysesContext }),
	(0, lit_decorators_js.property)({
		type: Boolean,
		reflect: true,
		attribute: "interactive-analysis"
	}),
	__decorateMetadata("design:type", Boolean)
], AbstractSingleFileAppElement.prototype, "interactiveAnalysis", void 0);
//#endregion
//#region src/apps/ThermalFileApp.ts
var ThermalFileAppElement = class extends AbstractSingleFileAppElement {
	connectedCallback() {
		super.connectedCallback();
		if (this.hasUpdated) this.observeLayout();
	}
	firstUpdated(changedProperties) {
		super.firstUpdated(changedProperties);
		this.observeLayout();
	}
	disconnectedCallback() {
		this.layoutObserver?.disconnect();
		this.layoutObserver = void 0;
		super.disconnectedCallback();
	}
	/** Applies responsive classes to the rendered layout without recreating its interactive children. */
	observeLayout() {
		const layout = this.shadowRoot?.querySelector(".layout");
		if (!layout || this.layoutObserver) return;
		const observer = new ResizeObserver((entries) => {
			if (!this.isConnected || this.layoutObserver !== observer) return;
			const entry = entries.find((entry) => entry.target === layout);
			if (entry) {
				layout.classList.toggle("layout--stacked", entry.contentRect.width < 700);
				layout.classList.toggle("layout--compact", entry.contentRect.width < 500);
			}
		});
		this.layoutObserver = observer;
		observer.observe(layout);
	}
	static {
		this.styles = lit.css`
    
        .layout {
            display: grid;
            grid-template-columns: min-content minmax(0, 1fr) minmax(0, 1fr);
            grid-template-areas: "tools viewer analysis";
            gap: 1em;
            margin-top: 1em;
        }

        .layout > * {
            min-width: 0;
        }

        manager-tool-bar {
            grid-area: tools;
            align-self: start;
        }

        .viewer {
            grid-area: viewer;
        }

        file-analysis-complex {
            grid-area: analysis;
        }

        .layout--stacked {
            grid-template-columns: min-content minmax(0, 1fr);
            grid-template-areas:
                "tools viewer"
                "tools analysis";
        }

        .layout--compact {
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas:
                "tools"
                "viewer"
                "analysis";
        }

        .layout--compact manager-tool-bar {
            flex-direction: row;
            flex-wrap: wrap;
        }
    
    `;
	}
	render() {
		return lit.html`<thermal-app 
            label="${(0, lit_directives_if_defined_js.ifDefined)(this.label)}" 
            author="${(0, lit_directives_if_defined_js.ifDefined)(this.author)}" 
            license="${(0, lit_directives_if_defined_js.ifDefined)(this.license)}" 
            .showfullscreen=${this.showFullscreen}
        >

            <file-download-dropdown slot="bar-pre"></file-download-dropdown>
            <file-info-button slot="bar-pre"></file-info-button>

            <manager-palette-dropdown slot="bar-pre"></manager-palette-dropdown>
            <registry-range-form slot="bar-pre"></registry-range-form>
            <registry-opacity-slider slot="bar-pre"></registry-opacity-slider>

            <registry-histogram slot="pre" ?expandable=${true}></registry-histogram>
            <registry-range-slider slot="pre"></registry-range-slider>
            <registry-ticks-bar slot="pre"></registry-ticks-bar>

            
            <div class="layout">
                <manager-tool-bar></manager-tool-bar>
                <div class="viewer">
                    <file-canvas></file-canvas>
                    <file-timeline></file-timeline>
                </div>
                <file-analysis-complex></file-analysis-complex>
            </div>
            
        </thermal-app>`;
	}
};
//#endregion
//#region src/apps/ThermalGroupApp.ts
var ThermalGroupAppElement = class extends AbstractApp {
	constructor(..._args) {
		super(..._args);
		this.managerController = new ManagerController(this);
		this.palette = "jet";
		this.advancedPalettes = false;
		this.smoothThermograms = false;
		this.smoothGraph = false;
		this.tool = "inspect";
		this.registryController = new RegistryController(this);
		this.opacity = 1;
		this.loading = false;
		this.groupController = new GroupController(this);
		this.autoclearGroup = true;
		this.fileController = new FileController(this);
		this.ms = 0;
		this.playbackSpeed = 1;
		this.autoHighlight = false;
		this.groupListingController = new GroupListingController(this);
		this.orderby = "date";
		this.ordering = "asc";
		this.groupLoadController = new GroupLoadController(this);
	}
	static {
		this.properties = {
			...AbstractApp.properties,
			...ManagerController.HOST_PROPERTIES,
			...RegistryController.HOST_PROPERTIES,
			...GroupController.HOST_PROPERTIES,
			...FileController.HOST_PROPERTIES,
			...GroupLoadController.HOST_PROPERTIES
		};
	}
	connectedCallback() {
		super.connectedCallback();
		this.subscribedGroup = this.groupObject;
		this.subscribedGroup.files.addListener(this.UUID, () => {
			if (this.file && !this.groupObject.files.value.includes(this.file)) this.fileController.removeInstance();
			this.requestUpdate();
		});
	}
	disconnectedCallback() {
		this.subscribedGroup?.files.removeListener(this.UUID);
		this.subscribedGroup = void 0;
		super.disconnectedCallback();
	}
	openDetail(instance) {
		this.registryController.setHighlight(void 0);
		this.ms = instance.timeline.currentMs;
		this.playbackSpeed = instance.timeline.playbackSpeed;
		[
			"analysis1",
			"analysis2",
			"analysis3",
			"analysis4",
			"analysis5",
			"analysis6",
			"analysis7"
		].forEach((attribute, index) => {
			this[attribute] = instance.slots.getSlot(index + 1)?.serialized;
		});
		this.fileController.receiveInstance(instance);
	}
	closeDetail() {
		this.registryController.setHighlight(void 0);
		this.fileController.removeInstance();
	}
	static {
		this.styles = lit.css`
        ${GroupListingController.styles}

        .layout {
            width: 100%;
            display: grid;
            grid-template-columns: 2em minmax(0, 1fr);
            gap: 1em;
        }

        .layout-content {
            min-width: 0;
        }

        manager-tool-bar {
            height: 2em;
        }
    `;
	}
	render() {
		const listingOptions = {
			allowFileChanges: false,
			onOpenDetail: (instance) => this.openDetail(instance),
			onCloseDetail: () => this.closeDetail()
		};
		const hasFiles = this.groupObject?.files.value.length > 0;
		return lit.html`<thermal-app
            label=${this.label ?? "LabIR Web Analyser"}
            author=${(0, lit_directives_if_defined_js.ifDefined)(this.author)}
            license=${(0, lit_directives_if_defined_js.ifDefined)(this.license)}
            ?show-fullscreen=${this.showFullscreen}
        >
            ${hasFiles ? lit.html`
                <manager-tool-bar slot="pre-bar"></manager-tool-bar>
                <manager-palette-dropdown slot="pre-bar"></manager-palette-dropdown>
                <registry-range-form slot="pre-bar"></registry-range-form>
                ${this.file ? this.groupListingController.renderDetailHeader(this.file, "bar-header", listingOptions) : this.groupListingController.renderListHeader("bar-header", listingOptions)}
                <thermal-dialog label=${this.t("config")} slot="bar-pre">
                    <thermal-btn slot="invoker" tooltip=${this.t("config")} icon="settings" iconStyle="solid"></thermal-btn>
                    <div slot="content">
                        <table>
                            <manager-export-panel></manager-export-panel>
                            <display-panel></display-panel>
                        </table>
                    </div>
                </thermal-dialog>
                ${this.groupListingController.renderTemperatureScale()}
            ` : void 0}
            <slot name="bar-pre" slot="bar-pre"></slot>
            ${this.groupLoadController.errors.map((message) => lit.html`<p role="alert">${message}</p>`)}
            <div class="layout">
                <div></div>
                <div class="layout-content">
                    ${this.loading ? lit.html`<p role="status">${this.t("loading")}</p>` : void 0}
                    ${hasFiles ? this.file ? this.groupListingController.renderDetailBody() : this.groupListingController.renderListContainer(this.groupListingController.renderList((instance) => this.groupListingController.renderThumbnail(instance, listingOptions))) : this.loading ? void 0 : lit.html`<p>Ve skupině nejsou žádné soubory.</p>`}
                </div>
            </div>
        </thermal-app>`;
	}
};
//#endregion
//#region src/apps/ThermalSlottedApp.ts
/**
* Places left and right slot content beside the canvas, sized to their content.
* Top, bottom and unnamed slot content span the full width.
*/
var ThermalSlottedAppElement = class extends AbstractSingleFileAppElement {
	static {
		this.styles = lit.css`
    
        :host {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr) auto;
            grid-template-areas:
                "left top right"
                "left viewer right"
                "left bottom right"
                "extra extra extra";
            align-items: start;
        }

        slot {
            display: block;
            min-width: 0;
            grid-area: extra;
        }

        slot[name="top"] {
            grid-area: top;
        }

        slot[name="left"] {
            grid-area: left;
        }

        file-canvas {
            grid-area: viewer;
            min-width: 0;
        }

        slot[name="right"] {
            grid-area: right;
        }

        slot[name="bottom"] {
            grid-area: bottom;
        }
    
    `;
	}
	render() {
		return lit.html`
            <slot name="top"></slot>
            <slot name="left"></slot>
            <file-canvas></file-canvas>
            <slot name="right"></slot>
            <slot name="bottom"></slot>
            <slot></slot>
        `;
	}
};
//#endregion
//#region src/controls/file/FileInfoButton.ts
var FileInfoButton = class extends AbstractFileConsumer {
	onFileLoaded() {}
	onInstanceCreated() {}
	onFailure() {}
	static {
		this.styles = lit.css`

        table {
            width: 100%;
        }



        td {
            padding: calc( var( --thermal-gap ) * .5 ) 0;
        }


        tr:not(:last-child) {
            td {
                border-bottom: var(--thermal-border-width) solid var( --thermal-slate );
            }
        }

        .small,
        small {
            font-size: calc( var( --thermal-fs-sm ) * .8 );
        }

        .opaque {
            opacity: .5;
        }

        h2 {
            font-size: calc( var( --thermal-fs ) * 1.4 );
        }

        h3 {
            font-size: var( --thermal-fs-small );
            margin: .2rem 0 .1rem 0;
            padding: 0;
            font-weight: normal;    
        }

        ul {
            margin: 0;
            padding: 0;
            padding-left: var( --thermal-fs-small );
        }

        a {
            color: var( --thermal-primary );
        }

        .download {
            width: var( --thermal-fs );
            display: inline-block;
            margin-left: var( --thermal-gap );
            transition: color .2s ease-in-out;

            &:hover {
                color: var( --thermal-foreground );
            }
        }
    
    `;
	}
	renderRow(label, value) {
		return `<tr>
            <td style="width: 110px">${label}</td>
            <td>${value}</td>
        </tr>`;
	}
	renderNumericalRow(label, value, fixed = 4, unit) {
		const val = value.toFixed(fixed);
		const output = unit !== void 0 ? val + " " + unit : val;
		return this.renderRow(label, output);
	}
	renderDownloadRow(label, text, href, title) {
		return this.renderRow(label, `<span>${text}</span>
            <a href=${href} target="_blank" title="${title}" class="download">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z" clip-rule="evenodd" />
                </svg>
            </a>`);
	}
	render() {
		if (!this.file) return lit.nothing;
		return lit.html`
            <thermal-dialog label=${t$1("fileinfo")}>
                <slot name="invoker" slot="invoker">
                    <thermal-btn
                        tooltip=${t$1("fileinfo")}
                        icon="info"
                        iconStyle="mini"
                    >
                    </thermal-btn>
                </slot>
                <div slot="content">

                    <table>

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderRow(t$1("thermalfilename"), this.file.fileName))}

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderDownloadRow(t$1("thermalfileurl"), this.file.thermalUrl, this.file.thermalUrl, t$1("thermalfiledownload")))}

                        ${this.file.visibleUrl ? (0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderDownloadRow(t$1("visiblefileurl"), this.file.visibleUrl, this.file.visibleUrl, t$1("visiblefiledownload"))) : lit.nothing}

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderRow(t$1("time"), _labirthermal_core.TimeFormat.human(this.file.timestamp)))}

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderNumericalRow(t$1("duration"), this.file.duration, 0, "ms"))}

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderRow(t$1("resolution"), `${this.file.width} x ${this.file.height}<small class="opaque">${this.file.pixels.length} pixels</small>`))}

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderNumericalRow(t$1("bytesize"), this.file.bytesize, 0))}
                        
                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderNumericalRow(t$1("minimaltemperature"), this.file.min, 10, "°C"))}

                        ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderNumericalRow(t$1("maximaltemperature"), this.file.max, 10, "°C"))}

                        

                    </table>

                    <h2>${t$1("filetype")}</h2>
                    <table>
                    ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderRow(t$1("type"), this.file.reader.parser.name))}
                    ${(0, lit_directives_unsafe_html_js.unsafeHTML)(this.renderRow(t$1("description"), this.file.reader.parser.description))}

                    <tr>
                        <td>${t$1("supporteddevices")}</td>
                        <td><ul>${this.file.reader.parser.devices.map((device) => lit.html`<li>
                            <h3><a href="${device.deviceUrl}" target="_blank">${device.deviceName}</a></h3>
                            <div class="small">${device.deviceDescription}</div>
                            <div class="small">Manufactured by <a href="${device.manufacturerUrl}" target="_blank">${device.manufacturer}</a></div>
                        </li>`)}</ul></td>
                    </tr>
                    </table>
                </div>
            </thermal-dialog>
        `;
	}
};
//#endregion
//#region src/controls/file/fileLabel.ts
var FileLabelElement = class extends AbstractFileConsumer {
	onInstanceCreated() {}
	onFailure() {}
	static {
		this.styles = lit.css`
        :host {
            display: contents;
        }

    `;
	}
	render() {
		if (!this.file) return lit.nothing;
		return this.file.fileName;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], FileLabelElement.prototype, "label", void 0);
//#endregion
//#region src/controls/file/FileTimelineElement.ts
var FileTimelineElement = class FileTimelineElement extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.playing = false;
		this.mayStop = true;
		this.timelineRef = (0, lit_directives_ref_js.createRef)();
		this.barRef = (0, lit_directives_ref_js.createRef)();
		this.containerRef = (0, lit_directives_ref_js.createRef)();
		this.disablePlayButton = false;
		this.disableInfo = false;
		this.collapsed = false;
		this.ticks = [];
	}
	static {
		this.collapseWidth = 500;
	}
	onInstanceCreated(instance) {
		if (this.containerRef.value) this.ticks = calculateTicks(this.containerRef.value.clientWidth, instance.duration);
	}
	onFailure() {
		this.file?.timeline.removeListener(this.UUID);
	}
	connectedCallback() {
		super.connectedCallback();
		this.requestUpdate();
	}
	disconnectedCallback() {
		this.observer?.disconnect();
		this.observer = void 0;
		this.observedContainer = void 0;
		super.disconnectedCallback();
	}
	update(changedProperties) {
		super.update(changedProperties);
		const container = this.containerRef.value;
		if (container === this.observedContainer) return;
		this.observer?.disconnect();
		this.observer = void 0;
		this.observedContainer = void 0;
		if (!this.isConnected || !container) return;
		this.observedContainer = container;
		const observer = new ResizeObserver((entries) => {
			if (!this.isConnected || this.observer !== observer) return;
			const entry = entries.find((entry) => entry.target === container);
			if (!entry) return;
			if (this.file) this.ticks = calculateTicks(entry.contentRect.width, this.file.duration);
			this.collapsed = entry.contentRect.width < FileTimelineElement.collapseWidth;
		});
		this.observer = observer;
		observer.observe(container);
	}
	/** Handlers */
	/** Handle playback buttons */
	handlePlayButtonClick() {
		if (this.playing === true && this.mayStop === false) return;
		if (this.playing) this.file?.timeline.stop();
		else this.file?.timeline.play();
	}
	handleBarClick(event) {
		event.preventDefault();
		if (this.mayStop === false) return;
		const eventValues = this.getValueFromEvent(event);
		if (eventValues && this.file) this.file.timeline.setValueByPercent(eventValues.percent);
	}
	/** Take a MouseEvent on `this.timelineRef` and calculate the percentage out of it. */
	getValueFromEvent(event) {
		if (this.timelineRef.value && this.file) {
			const rect = this.timelineRef.value.getBoundingClientRect();
			if (rect.width === 0) return;
			const x = event.clientX - rect.left;
			const percent = Math.max(0, Math.min(100, x / rect.width * 100));
			return {
				percent,
				ms: this.file.duration * (percent / 100)
			};
		}
	}
	handleBarEnter(event) {
		const eventValues = this.getValueFromEvent(event);
		if (eventValues) this.pointerMs = eventValues.ms;
		if (eventValues) this.fileController.setTimeCursorPercentage(eventValues.percent);
	}
	handleBarHover(event) {
		event.preventDefault();
		const eventValues = this.getValueFromEvent(event);
		if (eventValues) this.pointerMs = eventValues.ms;
		if (eventValues) this.fileController.setTimeCursorPercentage(eventValues.percent);
	}
	handleBarMouseLeave() {
		this.fileController.setTimeCursorPercentage(void 0);
		this.pointerMs = void 0;
	}
	static {
		this.styles = lit.css`
    
        .container {

            padding-top: calc( var( --thermal-gap ) * .2 );

            width: 100%;

            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: calc( var( --thermal-gap ) * .5 );

            color: var( --thermal-foreground );

        }

        .cursor {
            width: 70px;
        }

        .small {
            font-size: calc( var( --thermal-fs ) * .7 );
            color: var( --thermal-foreground );
        }

        .real {
            display: flex;
            gap: var( --thermal-fs-small );
            align-items: center;
            padding-top: 5px;
            justify-content: space-between;
            width: 100%;

            .label { opacity: .5; }
        }

        .real.collapsed {
            flex-direction: column;
            align-items: flex-start;
        }

        .inline {
            white-space: nowrap;
        }

        .timeline {
            flex-grow: 1;
            cursor: pointer;
        }

        .timeline-bar {
            width: 100%;
            height: var( --thermal-fs );
            background: var( --thermal-slate );
            transition: background-color .2s ease-in-out;
            position: relative;
        }

        .timeline-marks {
            width: 100%;
        }

        .mark {
            background: red;
            height: 5px;
            position: relative;
        }

        .bar {
            height: 100%;
            background: var( --thermal-primary-dark );
            content: "";
            border-right: 1px solid var( --thermal-foreground );
            transition: background-color .3s ease-in-out;
            &:hover {
                background: var(--thermal-primary);
            }
        }

        .mayNot {
            opacity: .5;
            cursor: not-allowed;
        }

        .pointer {
            position: absolute;
            width: 1px;
            background: var( --thermal-background );
            height: 100%;
            top: 0;
        }

        ${ticksCss}


        .controls {

            display: flex;
            align-items: stretch;
            justify-content: center;
            gap: 5px;

            padding-top: 5px;

        }

        .container.collapsed .controls {
            flex-wrap: wrap;
        }

        .chrome {
            width: 1em;
            color: var(--thermal-primary-dark);
            transition: all .3s ease-in-out;
            cursor: pointer;
            &:hover {
                color: var(--thermal-primary);
            }
        }
    
    `;
	}
	renderControls(file, disabled, playButtonClasses) {
		return lit.html`<nav class="controls">

    <thermal-btn 
        ?disabled=${disabled}
        @click=${() => {
			file.timeline.prev();
		}}
    >${t$1("prev")}</thermal-btn>


    <thermal-btn 
        class="${(0, lit_directives_class_map_js.classMap)(playButtonClasses)}" 
        @click=${this.handlePlayButtonClick.bind(this)}
        icon="${this.playing ? "pause" : "play"}"
        iconStyle="solid"
        ?disabled=${disabled}
    ></thermal-btn>

    <thermal-btn 
        @click=${() => file.timeline.next()}
        ?disabled=${disabled}
    >${t$1("next")}</thermal-btn>

    <thermal-btn 
        @click=${() => file.timeline.setRelativeTime(0)}
        ?disabled=${disabled}
    >${t$1("back")}</thermal-btn>

    <file-playback-speed-dropdown enabled="${this.mayStop ? "on" : "off"}" class="item"></file-playback-speed-dropdown>

</nav>`;
	}
	render() {
		const file = this.file;
		if (file === void 0) return lit.nothing;
		else if (file.duration === 0) return lit.nothing;
		const containerClasses = {
			container: true,
			collapsed: this.collapsed
		};
		const mayClasses = {
			may: this.mayStop === true,
			mayNot: this.mayStop === false
		};
		const playButtonClasses = {
			item: true,
			button: true,
			playback: true,
			...mayClasses
		};
		const barClasses = {
			item: true,
			timeline: true,
			...mayClasses
		};
		const disabled = this.mayStop === false;
		return lit.html`
<section class="${(0, lit_directives_class_map_js.classMap)(containerClasses)}" ${(0, lit_directives_ref_js.ref)(this.containerRef)}>

    <aside class="ticks-horizontal-indent">

        <notation-timeline></notation-timeline>

        <div class="${(0, lit_directives_class_map_js.classMap)(barClasses)}"  ${(0, lit_directives_ref_js.ref)(this.timelineRef)}>

            <div 
                class="timeline-bar" 
                @click=${this.handleBarClick}
                @mouseenter=${this.handleBarEnter.bind(this)}
                @mousemove=${this.handleBarHover} 
                @mouseleave=${this.handleBarMouseLeave.bind(this)}
            >
                <div class="bar" data-video-rerender style="width: ${this.currentFrame ? this.currentFrame.percentage : 0}%" ${(0, lit_directives_ref_js.ref)(this.barRef)}></div>
                    ${this.cursor !== void 0 ? lit.html`<div class="pointer" style="left: ${this.cursor}%"></div>` : ""}
                </div>

            </div>


${this.currentFrame ? renderTicks(file.duration, this.ticks, this.currentFrame.ms, this.pointerMs) : lit.nothing}


${this.disablePlayButton === false ? this.renderControls(file, disabled, playButtonClasses) : lit.nothing}

    </aside>

</section>



${this.currentFrame !== void 0 && this.disableInfo === false ? lit.html`<div class="small real ${this.collapsed ? "collapsed" : ""}">
        <div>
            <span class="label">${t$1("date")}:</span> 
            <span class="inline" data-video-dynamic>${(0, date_fns.format)(this.currentFrame.absolute, "d. L. y")}</span>
        </div>
        <div>
            <span class="label">${t$1("time")}:</span> 
            <span class="inline" data-video-dynamic>${(0, date_fns.format)(this.currentFrame.absolute, "H'h' mm'm' ss:SSS")}</span>
        </div>
        <div>
            <span class="label">${t$1("frame")}:</span> 
            <span class="inline" data-video-dynamic>${this.currentFrame.index + 1} / ${this.file?.frameCount}</span>
        </div>
    </div>` : lit.nothing}
    `;
	}
};
__decorate([
	(0, _lit_context.consume)({
		context: filePlayingContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], FileTimelineElement.prototype, "playing", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileCurrentFrameContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], FileTimelineElement.prototype, "currentFrame", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileDurationContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Object)
], FileTimelineElement.prototype, "duration", void 0);
__decorate([
	(0, _lit_context.consume)({
		context: fileMayStopContext,
		subscribe: true
	}),
	(0, lit_decorators_js.state)(),
	__decorateMetadata("design:type", Boolean)
], FileTimelineElement.prototype, "mayStop", void 0);
__decorate([(0, _lit_context.consume)({
	context: fileTimeCursorContext,
	subscribe: true
}), __decorateMetadata("design:type", Object)], FileTimelineElement.prototype, "cursor", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "disable-play-button"
}), __decorateMetadata("design:type", Boolean)], FileTimelineElement.prototype, "disablePlayButton", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "disable-info"
}), __decorateMetadata("design:type", Boolean)], FileTimelineElement.prototype, "disableInfo", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Boolean)], FileTimelineElement.prototype, "collapsed", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Array)], FileTimelineElement.prototype, "ticks", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileTimelineElement.prototype, "pointerMs", void 0);
//#endregion
//#region src/controls/file/video/ISingleVideoExportElement.ts
let RecordingPhase = /* @__PURE__ */ function(RecordingPhase) {
	RecordingPhase[RecordingPhase["IDLE"] = 0] = "IDLE";
	RecordingPhase[RecordingPhase["RECORDING"] = 1] = "RECORDING";
	RecordingPhase[RecordingPhase["ENCODING"] = 2] = "ENCODING";
	RecordingPhase[RecordingPhase["CLEANUP"] = 3] = "CLEANUP";
	return RecordingPhase;
}({});
//#endregion
//#region src/controls/file/video/internals/VideoRecorder.ts
/**
* Atribut pro označení dynamických elementů, které se mění mezi framy.
* Tyto elementy budou mít svůj textContent aktualizován z originálu.
*/
const DYNAMIC_CONTENT_ATTRIBUTE = "data-video-dynamic";
/**
* Atribut pro označení SVG elementů, které se mění mezi framy.
* Celý innerHTML SVG bude aktualizován z originálu.
*/
const DYNAMIC_SVG_ATTRIBUTE = "data-video-svg";
/**
* Atribut pro označení elementů, jejichž styly se mění mezi framy.
* Inline styly budou aktualizovány z originálu.
*/
const DYNAMIC_STYLE_ATTRIBUTE = "data-video-style";
/**
* Atribut pro označení elementů, které se mají kompletně překreslit při každém framu.
* Element včetně jeho stylů a potomků bude znovu naklonován z originálu.
* Použij pro elementy, které jsou vytvářeny asynchronně nebo se dynamicky mění.
*/
const DYNAMIC_RERENDER_ATTRIBUTE = "data-video-rerender";
/**
* Atribut pro označení elementů, které nemají být zahrnuty do exportu.
* Tyto elementy budou odstraněny z klonu před exportem.
*/
const IGNORE_ATTRIBUTE = "data-video-ignore";
var VideoRecorder = class {
	constructor(app) {
		this.app = app;
		this.exportWidth = 0;
		this.exportHeight = 0;
		this.canvasToImageMap = /* @__PURE__ */ new Map();
		this.dynamicElementMap = /* @__PURE__ */ new Map();
		this.dynamicSvgMap = /* @__PURE__ */ new Map();
		this.rerenderMap = /* @__PURE__ */ new Map();
		this.dynamicStyleMap = /* @__PURE__ */ new Map();
		this.file = app.innerFile;
		this.exportedElement = app.exportedElement;
	}
	getMuxingCanvas() {
		if (this.muxingCanvas) return this.muxingCanvas;
		const bounds = this.exportedElement.getBoundingClientRect();
		const canvas = new OffscreenCanvas(bounds.width, bounds.height);
		this.muxingCanvas = canvas;
		return this.muxingCanvas;
	}
	getMuxingContext() {
		if (this.muxingContext) return this.muxingContext;
		if (this.muxingCanvas === void 0) this.getMuxingCanvas();
		this.muxingContext = this.muxingCanvas.getContext("2d", { alpha: false });
		this.muxingContext.imageSmoothingEnabled = false;
		return this.muxingContext;
	}
	/**
	* Jednorázová příprava exportu:
	* 1. Klonuje DOM (pouze jednou)
	* 2. Inlinuje computed styles do klonu
	* 3. Embeduje obrázky jako data URI
	* 4. Vytváří SVG wrapper s foreignObject
	* 5. Mapuje dynamické elementy a canvasy pro rychlou aktualizaci
	*/
	async prepareExport() {
		const element = this.exportedElement;
		this.exportWidth = element.clientWidth;
		this.exportHeight = element.clientHeight;
		console.log("[VideoRecorder] Preparing export...", this.exportWidth, "x", this.exportHeight);
		const clone = element.cloneNode(true);
		console.log("[VideoRecorder] Inlining styles...");
		this.inlineStylesRecursive(element, clone);
		console.log("[VideoRecorder] Flattening custom elements...");
		this.flattenCustomElements(element, clone);
		console.log("[VideoRecorder] Removing ignored elements...");
		this.removeIgnoredElements(clone);
		console.log("[VideoRecorder] Embedding images...");
		await this.embedImages(clone);
		console.log("[VideoRecorder] Cleaning up clone...");
		this.removeLitComments(clone);
		this.ensureXmlnsAttributes(clone);
		console.log("[VideoRecorder] Mapping canvases...");
		this.createCanvasMap(element, clone);
		console.log("[VideoRecorder] Mapping dynamic elements...");
		this.createDynamicElementMap(element, clone);
		console.log("[VideoRecorder] Mapping dynamic SVGs...");
		this.createDynamicSvgMap(element, clone);
		console.log("[VideoRecorder] Mapping dynamic style elements...");
		this.createDynamicStyleMap(element, clone);
		console.log("[VideoRecorder] Mapping rerender elements...");
		this.createRerenderMap(element, clone);
		console.log("[VideoRecorder] Creating SVG wrapper...");
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
		svg.setAttribute("width", String(this.exportWidth));
		svg.setAttribute("height", String(this.exportHeight));
		const foreignObject = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
		foreignObject.setAttribute("width", "100%");
		foreignObject.setAttribute("height", "100%");
		foreignObject.setAttribute("x", "0");
		foreignObject.setAttribute("y", "0");
		clone.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
		foreignObject.appendChild(clone);
		svg.appendChild(foreignObject);
		this.preparedSvgWrapper = svg;
		this.preparedClone = clone;
		console.log("[VideoRecorder] Export prepared. Canvas count:", this.canvasToImageMap.size, "Dynamic elements:", this.dynamicElementMap.size, "Rerender elements:", this.rerenderMap.size);
	}
	/**
	* Odstraní elementy s atributem data-video-ignore z klonu.
	* Tyto elementy nebudou zahrnuty do exportu.
	*/
	removeIgnoredElements(clone) {
		const ignored = clone.querySelectorAll(`[${IGNORE_ATTRIBUTE}]`);
		console.log("[VideoRecorder] Removing ignored elements:", ignored.length);
		for (const el of ignored) el.parentNode?.removeChild(el);
	}
	/**
	* Rekurzivně inlinuje computed styles z originálu do klonu.
	* Kopíruje pouze důležité CSS vlastnosti pro zrychlení.
	*/
	inlineStylesRecursive(original, clone) {
		if (!(original instanceof HTMLElement) || !(clone instanceof HTMLElement)) return;
		const computed = getComputedStyle(original);
		for (const prop of [
			"display",
			"position",
			"top",
			"left",
			"right",
			"bottom",
			"width",
			"height",
			"min-width",
			"min-height",
			"max-width",
			"max-height",
			"margin",
			"margin-top",
			"margin-right",
			"margin-bottom",
			"margin-left",
			"padding",
			"padding-top",
			"padding-right",
			"padding-bottom",
			"padding-left",
			"box-sizing",
			"overflow",
			"overflow-x",
			"overflow-y",
			"flex",
			"flex-direction",
			"flex-wrap",
			"justify-content",
			"align-items",
			"align-content",
			"flex-grow",
			"flex-shrink",
			"flex-basis",
			"order",
			"gap",
			"grid",
			"grid-template-columns",
			"grid-template-rows",
			"grid-gap",
			"grid-column",
			"grid-row",
			"background",
			"background-color",
			"background-image",
			"background-size",
			"background-position",
			"border",
			"border-width",
			"border-style",
			"border-color",
			"border-radius",
			"border-top",
			"border-right",
			"border-bottom",
			"border-left",
			"color",
			"font",
			"font-family",
			"font-size",
			"font-weight",
			"font-style",
			"line-height",
			"text-align",
			"text-decoration",
			"text-transform",
			"white-space",
			"letter-spacing",
			"word-spacing",
			"opacity",
			"visibility",
			"z-index",
			"transform",
			"box-shadow",
			"text-shadow",
			"table-layout",
			"border-collapse",
			"border-spacing"
		]) {
			const value = computed.getPropertyValue(prop);
			if (value && value !== "none" && value !== "normal" && value !== "auto") clone.style.setProperty(prop, value);
		}
		const origChildren = Array.from(original.children);
		const cloneChildren = Array.from(clone.children);
		for (let i = 0; i < origChildren.length && i < cloneChildren.length; i++) this.inlineStylesRecursive(origChildren[i], cloneChildren[i]);
	}
	/**
	* Zploštění custom elementů — nahradí custom elementy za statický HTML.
	* Tím se zabrání spouštění jejich lifecycle (connectedCallback atd.)
	* při vložení klonu do dokumentu.
	* 
	* DŮLEŽITÉ: Canvasy jsou označeny data-canvas-index atributem pro pozdější mapování.
	*/
	flattenCustomElements(original, clone) {
		const originalCanvases = this.querySelectorAllDeep(original, "canvas");
		originalCanvases.forEach((canvas, index) => {
			canvas.setAttribute("data-canvas-index", String(index));
		});
		console.log("[VideoRecorder] Marked canvases with index (including shadow DOM):", originalCanvases.length);
		const originalElements = Array.from(original.querySelectorAll("*"));
		const cloneElements = Array.from(clone.querySelectorAll("*"));
		for (let i = originalElements.length - 1; i >= 0; i--) {
			const origEl = originalElements[i];
			const cloneEl = cloneElements[i];
			if (!cloneEl) continue;
			if (origEl.tagName.includes("-") && origEl instanceof HTMLElement) {
				const replacement = document.createElement("div");
				replacement.setAttribute("data-flattened-from", origEl.tagName.toLowerCase());
				const computed = getComputedStyle(origEl);
				replacement.style.display = computed.display;
				replacement.style.width = computed.width;
				replacement.style.height = computed.height;
				replacement.style.position = computed.position;
				replacement.style.margin = computed.margin;
				replacement.style.padding = computed.padding;
				replacement.style.boxSizing = computed.boxSizing;
				replacement.style.background = computed.background;
				replacement.style.backgroundColor = computed.backgroundColor;
				if (origEl.shadowRoot) {
					for (const child of origEl.shadowRoot.children) if (child.tagName !== "STYLE") {
						const childClone = child.cloneNode(true);
						this.inlineStylesRecursive(child, childClone);
						replacement.appendChild(childClone);
					}
				} else for (const child of origEl.children) {
					const childClone = child.cloneNode(true);
					this.inlineStylesRecursive(child, childClone);
					replacement.appendChild(childClone);
				}
				const nestedCustom = replacement.querySelectorAll("*");
				for (const nested of nestedCustom) if (nested.tagName.includes("-")) {
					const nestedOrig = origEl.shadowRoot?.querySelector(nested.tagName.toLowerCase()) || origEl.querySelector(nested.tagName.toLowerCase());
					if (nestedOrig) this.flattenSingleElement(nestedOrig, nested);
				}
				cloneEl.parentNode?.replaceChild(replacement, cloneEl);
				console.log(`[VideoRecorder] Flattened: <${origEl.tagName.toLowerCase()}>`);
			}
		}
	}
	/**
	* Zploští jeden custom element
	*/
	flattenSingleElement(original, clone) {
		const replacement = document.createElement("div");
		replacement.setAttribute("data-flattened-from", original.tagName.toLowerCase());
		const computed = getComputedStyle(original);
		replacement.style.display = computed.display;
		replacement.style.width = computed.width;
		replacement.style.height = computed.height;
		if (original.shadowRoot) {
			for (const child of original.shadowRoot.children) if (child.tagName !== "STYLE") {
				const childClone = child.cloneNode(true);
				this.inlineStylesRecursive(child, childClone);
				replacement.appendChild(childClone);
			}
		}
		clone.parentNode?.replaceChild(replacement, clone);
	}
	/**
	* Převede všechny <img> a background-image na data URI
	*/
	async embedImages(element) {
		const images = element.querySelectorAll("img");
		const imagePromises = [];
		for (const img of images) if (img.src && !img.src.startsWith("data:")) imagePromises.push(this.fetchAsDataUri(img.src).then((dataUri) => {
			img.src = dataUri;
		}).catch((e) => console.warn("[VideoRecorder] Failed to embed image:", img.src, e)));
		const bgElements = element.querySelectorAll("*");
		for (const el of bgElements) {
			const bg = el.style.background || "";
			const bgImg = el.style.backgroundImage || "";
			const combined = [bg, bgImg].filter(Boolean).join(" ");
			if (!combined.includes("url(")) continue;
			const urls = Array.from(combined.matchAll(/url\((['"]?)(.*?)\1\)/g)).map((m) => m[2]).filter((u) => u && !u.startsWith("data:"));
			if (urls.length === 0) continue;
			imagePromises.push((async () => {
				let newBg = bg;
				let newBgImg = bgImg;
				for (const url of urls) {
					const dataUri = await this.fetchAsDataUri(url);
					newBg = newBg.replaceAll(url, dataUri);
					newBgImg = newBgImg.replaceAll(url, dataUri);
				}
				if (bg) el.style.background = newBg;
				if (bgImg) el.style.backgroundImage = newBgImg;
			})().catch((e) => console.warn("[VideoRecorder] Failed to embed background:", e)));
		}
		await Promise.all(imagePromises);
	}
	/**
	* Načte URL jako data URI
	*/
	async fetchAsDataUri(url) {
		const blob = await (await fetch(url)).blob();
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(blob);
		});
	}
	/**
	* Vytvoří mapování mezi originálními canvasy a <img> elementy v klonu.
	* Nahrazuje <canvas> elementy za <img> elementy v klonu.
	* Používá data-canvas-index atribut pro správné mapování po zploštění.
	*/
	createCanvasMap(original, clone) {
		this.canvasToImageMap.clear();
		const originalCanvases = this.querySelectorAllDeep(original, "canvas");
		const cloneCanvases = clone.querySelectorAll("canvas");
		console.log("[VideoRecorder] Found canvases in original:", originalCanvases.length);
		console.log("[VideoRecorder] Found canvases in clone:", cloneCanvases.length);
		for (const origCanvas of originalCanvases) {
			const index = origCanvas.getAttribute("data-canvas-index");
			if (index === null) continue;
			const cloneCanvas = clone.querySelector(`canvas[data-canvas-index="${index}"]`);
			if (!cloneCanvas) {
				console.warn(`[VideoRecorder] Canvas with index ${index} not found in clone`);
				continue;
			}
			const origCanvasEl = origCanvas;
			const img = document.createElement("img");
			img.width = origCanvasEl.width;
			img.height = origCanvasEl.height;
			img.style.width = cloneCanvas.style.width || `${origCanvasEl.width}px`;
			img.style.height = cloneCanvas.style.height || `${origCanvasEl.height}px`;
			img.style.display = "block";
			img.style.imageRendering = "pixelated";
			img.setAttribute("data-canvas-index", index);
			try {
				const dataUrl = this.getCanvasDataUrl(origCanvasEl);
				if (dataUrl) {
					img.src = dataUrl;
					console.log(`[VideoRecorder] Canvas ${index} converted to data URL (${dataUrl.length} chars)`);
				} else console.warn(`[VideoRecorder][taint] Canvas ${index} returned null dataURL - possibly tainted!`, origCanvasEl);
			} catch (e) {
				console.warn(`[VideoRecorder][taint] Canvas ${index} TAINTED - cannot get dataURL:`, e, origCanvasEl);
			}
			cloneCanvas.parentNode?.replaceChild(img, cloneCanvas);
			this.canvasToImageMap.set(origCanvasEl, img);
			console.log(`[VideoRecorder] Mapped canvas ${index}: ${origCanvasEl.width}x${origCanvasEl.height}`);
		}
		console.log("[VideoRecorder] Total canvas mappings:", this.canvasToImageMap.size);
	}
	/**
	* Vytvoří mapování mezi originálními a klonovanými dynamickými elementy.
	* Hledá elementy s atributem DYNAMIC_CONTENT_ATTRIBUTE včetně shadow DOM.
	*/
	createDynamicElementMap(original, clone) {
		this.dynamicElementMap.clear();
		const originalDynamic = this.querySelectorAllDeep(original, `[${DYNAMIC_CONTENT_ATTRIBUTE}]`);
		const cloneDynamic = clone.querySelectorAll(`[${DYNAMIC_CONTENT_ATTRIBUTE}]`);
		console.log("[VideoRecorder] Found dynamic elements (including shadow DOM):", originalDynamic.length);
		console.log("[VideoRecorder] Found dynamic elements in clone:", cloneDynamic.length);
		originalDynamic.forEach((origEl, index) => {
			origEl.setAttribute("data-dynamic-index", String(index));
		});
		for (let i = 0; i < originalDynamic.length && i < cloneDynamic.length; i++) this.dynamicElementMap.set(originalDynamic[i], cloneDynamic[i]);
	}
	/**
	* Vytvoří mapování pro dynamické SVG elementy.
	* Hledá SVG s atributem DYNAMIC_SVG_ATTRIBUTE včetně shadow DOM.
	*/
	createDynamicSvgMap(original, clone) {
		this.dynamicSvgMap.clear();
		const originalSvgs = this.querySelectorAllDeep(original, `svg[${DYNAMIC_SVG_ATTRIBUTE}]`);
		const cloneSvgs = clone.querySelectorAll(`svg[${DYNAMIC_SVG_ATTRIBUTE}]`);
		console.log("[VideoRecorder] Found dynamic SVGs (including shadow DOM):", originalSvgs.length);
		for (let i = 0; i < originalSvgs.length && i < cloneSvgs.length; i++) this.dynamicSvgMap.set(originalSvgs[i], cloneSvgs[i]);
	}
	/**
	* Vytvoří mapování pro elementy s dynamickými styly.
	* Hledá elementy s atributem DYNAMIC_STYLE_ATTRIBUTE včetně shadow DOM.
	*/
	createDynamicStyleMap(original, clone) {
		this.dynamicStyleMap.clear();
		const originalStyled = this.querySelectorAllDeep(original, `[${DYNAMIC_STYLE_ATTRIBUTE}]`);
		const cloneStyled = clone.querySelectorAll(`[${DYNAMIC_STYLE_ATTRIBUTE}]`);
		console.log("[VideoRecorder] Found dynamic style elements (including shadow DOM):", originalStyled.length);
		for (let i = 0; i < originalStyled.length && i < cloneStyled.length; i++) this.dynamicStyleMap.set(originalStyled[i], cloneStyled[i]);
	}
	/**
	* Vytvoří mapování pro elementy, které se mají kompletně překreslit při každém framu.
	* Hledá elementy s atributem DYNAMIC_RERENDER_ATTRIBUTE včetně shadow DOM.
	*/
	createRerenderMap(original, clone) {
		this.rerenderMap.clear();
		const originalRerender = this.querySelectorAllDeep(original, `[${DYNAMIC_RERENDER_ATTRIBUTE}]`);
		const cloneRerender = clone.querySelectorAll(`[${DYNAMIC_RERENDER_ATTRIBUTE}]`);
		console.log("[VideoRecorder] Found rerender elements (including shadow DOM):", originalRerender.length);
		for (let i = 0; i < originalRerender.length && i < cloneRerender.length; i++) this.rerenderMap.set(originalRerender[i], cloneRerender[i]);
	}
	/**
	* querySelector pro celý DOM strom včetně shadow DOM
	*/
	querySelectorAllDeep(root, selector) {
		const results = [];
		const matches = root.querySelectorAll(selector);
		results.push(...Array.from(matches));
		const allElements = root.querySelectorAll("*");
		for (const el of allElements) if (el.shadowRoot) {
			const shadowMatches = el.shadowRoot.querySelectorAll(selector);
			results.push(...Array.from(shadowMatches));
			const nestedResults = this.querySelectorAllDeepInShadow(el.shadowRoot, selector);
			results.push(...nestedResults);
		}
		return results;
	}
	/**
	* Rekurzivní helper pro hledání v shadow DOM
	*/
	querySelectorAllDeepInShadow(shadowRoot, selector) {
		const results = [];
		const allElements = shadowRoot.querySelectorAll("*");
		for (const el of allElements) if (el.shadowRoot) {
			const shadowMatches = el.shadowRoot.querySelectorAll(selector);
			results.push(...Array.from(shadowMatches));
			const nestedResults = this.querySelectorAllDeepInShadow(el.shadowRoot, selector);
			results.push(...nestedResults);
		}
		return results;
	}
	/**
	* Aktualizuje pouze dynamický obsah v klonu:
	* 1. Aktualizuje src <img> elementů z originálních canvasů
	* 2. Aktualizuje textContent dynamických elementů
	* 3. Aktualizuje innerHTML dynamických SVG
	* 4. Aktualizuje inline styly dynamických elementů
	* 5. Kompletně překreslí rerender elementy
	* 
	* Toto je MNOHEM rychlejší než klonování celého DOM!
	*/
	updateDynamicContent() {
		for (const [origCanvas, img] of this.canvasToImageMap) try {
			const dataUrl = this.getCanvasDataUrl(origCanvas);
			if (dataUrl) img.src = dataUrl;
		} catch (e) {
			console.warn("[VideoRecorder] Failed to update canvas image:", e);
		}
		for (const [origEl, cloneEl] of this.dynamicElementMap) if (cloneEl.textContent !== origEl.textContent) cloneEl.textContent = origEl.textContent;
		for (const [origSvg, cloneSvg] of this.dynamicSvgMap) if (cloneSvg.innerHTML !== origSvg.innerHTML) cloneSvg.innerHTML = origSvg.innerHTML;
		for (const [origEl, cloneEl] of this.dynamicStyleMap) {
			const origStyle = origEl.getAttribute("style") || "";
			if ((cloneEl.getAttribute("style") || "") !== origStyle) cloneEl.setAttribute("style", origStyle);
		}
		for (const [origEl, cloneEl] of this.rerenderMap) this.rerenderElement(origEl, cloneEl);
	}
	/**
	* Kompletně překreslí element - znovu naklonuje obsah z originálu
	* včetně všech stylů a potomků.
	*/
	rerenderElement(original, clone) {
		if (original instanceof HTMLElement && original.tagName.includes("-")) {
			if (original.shadowRoot) {
				while (clone.firstChild) clone.removeChild(clone.firstChild);
				for (const child of original.shadowRoot.children) if (child.tagName !== "STYLE") {
					const childClone = child.cloneNode(true);
					this.inlineStylesRecursive(child, childClone);
					clone.appendChild(childClone);
				}
			}
		} else {
			if (clone.innerHTML !== original.innerHTML) clone.innerHTML = original.innerHTML;
			if (original instanceof HTMLElement && clone instanceof HTMLElement) {
				const origStyle = original.getAttribute("style") || "";
				clone.setAttribute("style", origStyle);
				this.inlineStylesRecursive(original, clone);
			}
		}
	}
	/**
	* Odstraní Lit framework komentáře z klonu.
	* Tyto komentáře mohou způsobovat problémy v SVG foreignObject.
	*/
	removeLitComments(element) {
		const walker = document.createTreeWalker(element, NodeFilter.SHOW_COMMENT, null);
		const commentsToRemove = [];
		let node;
		while (node = walker.nextNode()) commentsToRemove.push(node);
		for (const comment of commentsToRemove) comment.parentNode?.removeChild(comment);
	}
	/**
	* Zkontroluje a opraví xmlns atributy v klonu pro foreignObject.
	* Všechny HTML elementy musí mít xmlns="http://www.w3.org/1999/xhtml"
	*/
	ensureXmlnsAttributes(element) {
		const XHTML_NS = "http://www.w3.org/1999/xhtml";
		const checkAndFix = (el) => {
			if (el instanceof HTMLElement) {
				const currentXmlns = el.getAttribute("xmlns");
				if (!currentXmlns || currentXmlns !== XHTML_NS) el.setAttribute("xmlns", XHTML_NS);
			}
			for (const child of el.children) checkAndFix(child);
		};
		checkAndFix(element);
	}
	/**
	* Získá data URL z canvasu - podporuje i WebGL kontexty
	*/
	getCanvasDataUrl(canvas) {
		const webgl2 = canvas.getContext("webgl2");
		const webgl = canvas.getContext("webgl");
		const ctx2d = canvas.getContext("2d");
		if (webgl2 || webgl) try {
			return this.webglCanvasToDataUrl(canvas, webgl2 || webgl);
		} catch (e) {
			console.warn("[VideoRecorder] WebGL canvas unreadable:", e);
			return null;
		}
		else if (ctx2d) try {
			return canvas.toDataURL("image/png");
		} catch (e) {
			console.warn("[VideoRecorder] 2D canvas unreadable:", e);
			return null;
		}
		else try {
			return canvas.toDataURL("image/png");
		} catch (e) {
			console.warn("[VideoRecorder] Canvas unreadable:", e);
			return null;
		}
	}
	/**
	* Konvertuje WebGL canvas na data URL pomocí readPixels
	*/
	webglCanvasToDataUrl(canvas, gl) {
		const width = canvas.width;
		const height = canvas.height;
		const pixels = new Uint8Array(width * height * 4);
		gl.readPixels(0, 0, width, height, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
		const tempCanvas = document.createElement("canvas");
		tempCanvas.width = width;
		tempCanvas.height = height;
		const tempCtx = tempCanvas.getContext("2d");
		const imageData = tempCtx.createImageData(width, height);
		for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
			const srcIdx = ((height - y - 1) * width + x) * 4;
			const dstIdx = (y * width + x) * 4;
			imageData.data[dstIdx] = pixels[srcIdx];
			imageData.data[dstIdx + 1] = pixels[srcIdx + 1];
			imageData.data[dstIdx + 2] = pixels[srcIdx + 2];
			imageData.data[dstIdx + 3] = pixels[srcIdx + 3];
		}
		tempCtx.putImageData(imageData, 0, 0);
		return tempCanvas.toDataURL("image/png");
	}
	/**
	* Hlavní metoda pro export videa.
	* Kombinuje rasterizaci a enkódování do jednoho průchodu.
	* Framy se posílají přímo do encoderu bez mezitřídy do IndexedDB.
	*/
	async recordAndEncode() {
		this.app.setRecordingPhase(1);
		await this.prepareExport();
		const output = new mediabunny.Output({
			target: new mediabunny.BufferTarget(),
			format: new mediabunny.Mp4OutputFormat()
		});
		console.log("[VideoRecorder] Supported video codecs:", output.format.getSupportedVideoCodecs());
		const source = new mediabunny.VideoSampleSource({
			codec: "vp9",
			bitrate: this.app.renderProps.mp4Quality
		});
		output.addVideoTrack(source);
		output.start();
		const totalFrames = this.file.timeline.frames.length;
		console.log("[VideoRecorder] Starting recording & encoding. Total frames:", totalFrames);
		let frameCount = 0;
		for (const frame of this.file.timeline.frames) {
			await this.file.timeline.setRelativeTime(frame.relative);
			await this.file.draw();
			this.updateDynamicContent();
			if (!await this.rasterizeToCanvas()) {
				console.warn("[VideoRecorder] Failed to rasterize frame:", frame.index);
				continue;
			}
			const videoFrame = new VideoFrame(this.getMuxingCanvas(), { timestamp: frame.relative * 1e3 });
			const sample = new mediabunny.VideoSample(videoFrame);
			await source.add(sample, { keyFrame: frameCount % 30 === 0 });
			videoFrame.close();
			sample.close();
			frameCount++;
			if (frameCount % 10 === 0) console.log(`[VideoRecorder] Progress: ${frameCount}/${totalFrames} frames`);
			const percent = frameCount / totalFrames * 100;
			this.app.setRecordingPhaseProgress(percent);
		}
		this.app.setRecordingPhase(2);
		console.log("[VideoRecorder] Recording & encoding complete.");
		source.close();
		await output.finalize();
		this.app.setRecordingPhase(0);
		return new Blob([output.target.buffer], { type: "video/mp4" });
	}
	/**
	* Rasterizuje připravené SVG přímo do muxing canvasu.
	* Vrací true při úspěchu, false při chybě.
	*/
	async rasterizeToCanvas() {
		if (!this.preparedSvgWrapper) {
			console.error("[VideoRecorder] SVG wrapper not prepared!");
			return false;
		}
		const serialized = new XMLSerializer().serializeToString(this.preparedSvgWrapper);
		const dataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(serialized)}`;
		try {
			const imageToDraw = await new Promise((resolve, reject) => {
				const img = new Image();
				img.width = this.exportWidth;
				img.height = this.exportHeight;
				img.onload = () => resolve(img);
				img.onerror = (e) => {
					console.error("[VideoRecorder] Image load error:", e);
					reject(/* @__PURE__ */ new Error(`Failed to load SVG image`));
				};
				img.src = dataUrl;
			});
			const canvas = this.getMuxingCanvas();
			canvas.width = this.exportWidth;
			canvas.height = this.exportHeight;
			const ctx = this.getMuxingContext();
			ctx.clearRect(0, 0, this.exportWidth, this.exportHeight);
			ctx.drawImage(imageToDraw, 0, 0);
			return true;
		} catch (e) {
			console.error("[VideoRecorder] Rasterization error:", e);
			return false;
		}
	}
	/**
	* Vyčistí připravené struktury po dokončení exportu.
	* Důležité pro uvolnění paměti a možnost opakovaného exportu.
	*/
	cleanup() {
		for (const origCanvas of this.canvasToImageMap.keys()) origCanvas.removeAttribute("data-canvas-index");
		for (const origEl of this.dynamicElementMap.keys()) origEl.removeAttribute("data-dynamic-index");
		this.canvasToImageMap.clear();
		this.dynamicElementMap.clear();
		this.dynamicSvgMap.clear();
		this.dynamicStyleMap.clear();
		this.rerenderMap.clear();
		this.preparedSvgWrapper = void 0;
		this.preparedClone = void 0;
		this.muxingCanvas = void 0;
		this.muxingContext = void 0;
		this.exportWidth = 0;
		this.exportHeight = 0;
		console.log("[VideoRecorder] Cleanup complete.");
	}
	/**
	* Hlavní veřejná metoda pro spuštění exportu videa.
	*/
	async captureVideo() {
		const initialScale = this.app.renderProps.previewScale;
		this.app.setPreviewScale(1);
		await Promise.resolve();
		const start = performance.now();
		try {
			const videoBlob = await this.recordAndEncode();
			const end = performance.now();
			console.log("[VideoRecorder] Total export time:", end - start, "ms");
			const blobUrl = URL.createObjectURL(videoBlob);
			const a = document.createElement("a");
			a.href = blobUrl;
			const baseName = this.app.renderProps.fileName || "exported-video";
			a.download = baseName.endsWith(".mp4") ? baseName : `${baseName}.mp4`;
			a.click();
			a.remove();
			setTimeout(() => {
				URL.revokeObjectURL(blobUrl);
				console.log("[VideoRecorder] Video blob URL revoked.");
			}, 1e3);
		} finally {
			this.cleanup();
			this.app.setPreviewScale(initialScale);
		}
	}
	/**
	* Hlavní metoda pro export současného snímku jako PNG
	*/
	async captureCurrentFrameAsPng() {
		const initialScale = this.app.renderProps.previewScale;
		await Promise.resolve();
		try {
			await this.prepareExport();
			await this.file.draw();
			this.updateDynamicContent();
			await this.rasterizeToCanvas();
			const blob = await this.getMuxingCanvas().convertToBlob({ type: "image/png" });
			if (blob) {
				const blobUrl = URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.href = blobUrl;
				const baseName = this.app.renderProps.fileName || "exported-frame";
				const finalName = [
					baseName,
					"frame",
					this.file.timeline.currentFrameIndex + 1
				].join("_");
				a.download = finalName.endsWith(".png") ? baseName : `${finalName}.png`;
				a.click();
				a.remove();
				setTimeout(() => {
					URL.revokeObjectURL(blobUrl);
					console.log("[VideoRecorder] PNG blob URL revoked.");
				}, 1e3);
			}
		} finally {
			this.cleanup();
			this.app.setPreviewScale(initialScale);
		}
	}
};
//#endregion
//#region src/controls/file/video/AbstractSingleVideoExport.ts
var AbstractSingleVideoExport = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.fileCopyElementRef = (0, lit_directives_ref_js.createRef)();
		this.exportedDivRef = (0, lit_directives_ref_js.createRef)();
		this.parentHasAnalyses = false;
		this.recordingPhase = 0;
		this.recordingPhaseProgress = 0;
		this.renderProps = {
			hasHistogram: true,
			hasThermalScale: true,
			hasAnalysis: false,
			hasTimeline: false,
			isVertical: false,
			exportFrameWidth: 1200,
			exportFramePadding: 15,
			exportFrameGap: 30,
			exportGraphHeight: 300,
			fileName: "exported-video",
			mp4Quality: mediabunny.QUALITY_VERY_HIGH,
			skin: "light",
			previewScale: .45,
			autoScale: true
		};
	}
	get slug() {
		return [
			"single-video-export",
			this.file?.fileName ?? "no-file",
			this.UUID
		].join("__");
	}
	get outerFile() {
		return this.file;
	}
	get innerFile() {
		return this.fileCopyElementRef.value?.file;
	}
	get exportedElement() {
		return this.exportedDivRef.value;
	}
	setRecordingPhase(phase) {
		this.recordingPhase = phase;
	}
	setRecordingPhaseProgress(progress) {
		this.recordingPhaseProgress = progress;
	}
	/** Voláno při změně vlastností ovlivňujících layout exportu.
	*  Lze přepsat v potomcích pro reakci na změny (např. přepočet autoScale).
	*/
	onLayoutAffectingPropertyChanged() {}
	setHasHistogram(value) {
		this.renderProps.hasHistogram = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setHasThermalScale(value) {
		this.renderProps.hasThermalScale = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setPreviewScale(value) {
		this.renderProps.previewScale = value;
		this.requestUpdate();
	}
	setAutoScale(value) {
		this.renderProps.autoScale = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	/** The analyses are mirrored to the copy by the `withAnalyses` property of the `file-copy` element (see the providers directive). */
	setHasAnalysis(value) {
		this.renderProps.hasAnalysis = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setHasTimeline(value) {
		this.renderProps.hasTimeline = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setIsVertical(value) {
		this.renderProps.isVertical = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setExportFramePadding(value) {
		this.renderProps.exportFramePadding = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setExportFrameGap(value) {
		this.renderProps.exportFrameGap = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setExportFrameWidth(value) {
		this.renderProps.exportFrameWidth = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setExportGraphHeight(value) {
		this.renderProps.exportGraphHeight = value;
		this.requestUpdate();
		this.onLayoutAffectingPropertyChanged();
	}
	setFileName(value) {
		this.renderProps.fileName = value;
		this.requestUpdate();
	}
	setMp4Quality(value) {
		this.renderProps.mp4Quality = value;
		this.requestUpdate();
	}
	setSkin(value) {
		this.renderProps.skin = value;
		this.requestUpdate();
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		if (_changedProperties.has("file") && this.file) {
			this.parentHasAnalyses = this.file.analysis.value.length > 0;
			const baseName = this.file.fileName.replace(/\.(lrc|jpe?g)$/i, "");
			this.renderProps.fileName = baseName;
			this.requestUpdate();
		}
	}
	async record() {
		await new VideoRecorder(this).captureVideo();
	}
	async currentFrame() {
		await new VideoRecorder(this).captureCurrentFrameAsPng();
	}
};
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], AbstractSingleVideoExport.prototype, "parentHasAnalyses", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", typeof RecordingPhase === "undefined" ? Object : RecordingPhase)], AbstractSingleVideoExport.prototype, "recordingPhase", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], AbstractSingleVideoExport.prototype, "recordingPhaseProgress", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Object)], AbstractSingleVideoExport.prototype, "renderProps", void 0);
//#endregion
//#region src/directives/DirectiveHelpers.ts
/** Utilities for rendering */
var DirectiveHelpers = class {
	static unknownContainsSomething(content) {
		if (content === lit.nothing || content === null || content === void 0) return false;
		if (typeof content === "string" && content.trim().length === 0) return false;
		if (Array.isArray(content)) {
			if (content.length === 0) return false;
			else if (!content.some((item) => this.unknownContainsSomething(item))) return false;
		}
		return true;
	}
};
//#endregion
//#region src/directives/AbstractThermalDirective.ts
var AbstractThermalDirective = class extends lit_directive_js.Directive {
	t(key) {
		return t$1(T[key]);
	}
	update(_part, props) {
		return this.render(...props);
	}
	unknownContainsSomething(content) {
		return DirectiveHelpers.unknownContainsSomething(content);
	}
	renderDef(...args) {
		const content = [];
		const first = args.shift();
		if (first) content.push(lit.html`<dt>${first}</dt>`);
		args.forEach((item) => {
			content.push(lit.html`<dd>${item}</dd>`);
		});
		return content;
	}
};
//#endregion
//#region src/directives/SlotOrNothing.ts
var SlotOrNothing = class extends AbstractThermalDirective {
	render(label, content) {
		if (!this.unknownContainsSomething(content)) return lit.nothing;
		return lit.html`<thermal-slot
            label=${t$1(T[label])}
        >${content}</thermal-slot>`;
	}
};
const slotOrNothing = (0, lit_directive_js.directive)(SlotOrNothing);
//#endregion
//#region src/controls/file/video/directives/SingleVideoExportConfigDirective.ts
var SingleVideoExportConfigDirective = class extends lit_directive_js.Directive {
	renderRadio(label, checked, onChange) {
		return lit.html`<thermal-radio
            .checked=${checked}
            .onChange=${onChange}
        >${label}</thermal-radio>`;
	}
	renderText(label, suffix, value, onChange) {
		return lit.html`<div class="export-config-field export-config-field--text">

            <div class="export-config-field--label">
                <label>${label}</label>
            </div>

            <div class="export-config-field--value">

                <div class="">
                    <input
                        type="text"
                        .value=${value}
                        @input=${(event) => {
			const target = event.target;
			onChange(target.value);
		}}
                    />
                    <span class="unit">${suffix}</span>
                </div>

            </div>

        </div>`;
	}
	renderDropdown(value, options, onChange) {
		const elements = options.map((option) => lit.html`<thermal-btn
            slot="option"
            @click=${() => onChange(option)}
        >${option}</thermal-btn>`);
		return lit.html`<thermal-dropdown>
            <span slot="invoker">${value}</span>
            ${elements}
        </thermal-dropdown>`;
	}
	renderNumber(label, unit, value, onChange, min, max, step) {
		return lit.html`<div class="export-config-field">

            <div class="export-config-field--label">
                <label>${label}</label>
            </div>

            <div class="export-config-field--value">

                <div class="">
                    <input
                        type="number"
                        .value=${value === void 0 || value === null ? "" : String(value)}
                        min=${(0, lit_directives_if_defined_js.ifDefined)(min)}
                        max=${(0, lit_directives_if_defined_js.ifDefined)(max)}
                        step=${(0, lit_directives_if_defined_js.ifDefined)(step)}
                        @input=${(event) => {
			const raw = event.target.value.trim();
			if (raw === "") {
				onChange(NaN);
				return;
			}
			let num = parseFloat(raw);
			if (min !== void 0 && !isNaN(num) && num < min) num = min;
			if (max !== void 0 && !isNaN(num) && num > max) num = max;
			onChange(num);
		}}
                    />
                    <span class="unit">${unit}</span>
                </div>

            </div>

        </div>`;
	}
	renderConfigHeader(element) {
		const isSequence = element.innerFile?.timeline.isSequence;
		const hasAnalyses = element.parentHasAnalyses;
		const slots = [];
		const thermalScale = [lit.html`<manager-palette-dropdown ></manager-palette-dropdown>`, lit.html`<registry-range-form></registry-range-form>`];
		slots.push(slotOrNothing("thermalscale", thermalScale));
		const components = [this.renderRadio(element.t("histogram"), element.renderProps.hasHistogram, element.setHasHistogram.bind(element)), this.renderRadio(element.t("thermalscale"), element.renderProps.hasThermalScale, element.setHasThermalScale.bind(element))];
		if (hasAnalyses) components.push(this.renderRadio(element.t("analysis"), element.renderProps.hasAnalysis, element.setHasAnalysis.bind(element)));
		if (isSequence) components.push(this.renderRadio(element.t("timeline"), element.renderProps.hasTimeline, element.setHasTimeline.bind(element)));
		slots.push(slotOrNothing("exportcontent", components));
		const appearance = [];
		if (hasAnalyses && element.renderProps.hasAnalysis) appearance.push(this.renderRadio("Is Vertical", element.renderProps.isVertical, element.setIsVertical.bind(element)));
		appearance.push(this.renderDropdown(element.renderProps.skin, [
			"light",
			"dark",
			"solarized"
		], (value) => element.setSkin(value)));
		slots.push(slotOrNothing("display", appearance));
		slots.push(this.renderNumber(element.t("exportwidth"), "px", element.renderProps.exportFrameWidth, element.setExportFrameWidth.bind(element), 500, 1920, 10));
		slots.push(this.renderNumber(element.t("exportmargin"), "px", element.renderProps.exportFramePadding, element.setExportFramePadding.bind(element), 0, 100, 1));
		if (hasAnalyses && element.renderProps.hasAnalysis) {
			slots.push(this.renderNumber(element.t("exportgap"), "px", element.renderProps.exportFrameGap, element.setExportFrameGap.bind(element), 0, 100, 1));
			slots.push(this.renderNumber(element.t("exportgrahpheight"), "px", element.renderProps.exportGraphHeight, element.setExportGraphHeight.bind(element), 200, 700, 1));
		}
		const ext = isSequence ? ".mp4 / .png" : ".png";
		slots.push(this.renderText(element.t("name"), ext, element.renderProps.fileName, element.setFileName.bind(element)));
		if (isSequence) {
			const options = [
				{
					label: "VERY_HIGH",
					value: mediabunny.QUALITY_VERY_HIGH
				},
				{
					label: "HIGH",
					value: mediabunny.QUALITY_HIGH
				},
				{
					label: "MEDIUM",
					value: mediabunny.QUALITY_MEDIUM
				},
				{
					label: "LOW",
					value: mediabunny.QUALITY_LOW
				},
				{
					label: "VERY_LOW",
					value: mediabunny.QUALITY_VERY_LOW
				}
			];
			const choices = options.map((option) => option.label);
			const setter = (label) => {
				const found = options.find((o) => o.label === label);
				if (found) {
					element.setMp4Quality(found.value);
					console.log(found.value);
				}
			};
			const value = options.find((o) => o.value === element.renderProps.mp4Quality)?.label ?? "UNKNOWN";
			const output = [this.renderDropdown(value, choices, setter.bind(this))];
			slots.push(slotOrNothing("videoquality", output));
		}
		return slots;
	}
	static {
		this.styles = lit.css`
    
        .export-bar {

            width: 100%;

            .export-bar-part {
            }

            .export-bar-part--config {
                display: flex;
                flex-wrap: wrap;
                gap: 1em 2em;

                background: var( --thermal-background );
                padding: 1em;

                border-radius: var( --thermal-radius );

                thermal-slot {
                    box-sizing: border-box;
                }
            }

            .export-bar-part--actions {
            }
        

            .export-config-field {

                &:hover,
                &:focus-within {
                    .export-config-field--label {
                        color: var( --thermal-foreground );
                        &::after {
                            background: var( --thermal-foreground );
                        }
                    }
                }
                
                .export-config-field--label {

                    margin: 0px 0px 0.5em;
                    padding: 0px;
                    font-weight: normal;
                    font-size: 0.7em;
                    text-transform: uppercase;
                    color: var(--thermal-slate);
                    display: flex;
                    align-items: center;
                    gap: 0.5em;

                    &::after {
                        content: "";
                        flex-grow: 1;
                        height: 1px;
                        background: var( --thermal-slate-light );
                    }

                }

                .export-config-field--value {

                    input {
                        border: var( --thermal-slate-light ) solid 1px;
                        text-align: right;
                        font-family: var( --thermal-ff );
                        padding: .3em .1em .3em .3em;
                        width: 5em;
                        display: inline-block;
                    }

                    .unit {
                        font-size: 0.7em;
                    }

                }

                &.export-config-field--text {
                    .export-config-field--value input {
                        width: 200px;
                        text-align: left;
                    }
                }
            
            }

        
        }
    
    `;
	}
	render(element) {
		return lit.html`<div class="export-bar">

            <div class="export-bar-part export-bar-part--config">
                ${this.renderConfigHeader(element)}
            </div>
        
        </div>`;
	}
};
const exportConfigDirective = (0, lit_directive_js.directive)(SingleVideoExportConfigDirective);
//#endregion
//#region src/controls/file/video/directives/SingleVideoExportLayoutDirective.ts
var SingleVideoExportLayoutDirective = class extends lit_directive_js.Directive {
	constructor(..._args) {
		super(..._args);
		this.innerHeight = 0;
	}
	renderHistogram(props) {
		return lit.html`<registry-histogram style="display: ${props.hasHistogram ? "block" : "none"};"></registry-histogram>`;
	}
	renderThermalScale(props) {
		return lit.html`<div style="display: ${props.hasThermalScale ? "block" : "none"};">
            <registry-range-slider></registry-range-slider>
            <registry-ticks-bar></registry-ticks-bar>
        </div>`;
	}
	renderAnalyses(props) {
		if (!props.hasAnalysis) return lit.nothing;
		const width = props.exportFrameWidth / 2 - props.exportFramePadding * 2 - props.exportFrameGap;
		const height = props.exportGraphHeight;
		return lit.html`<div class="export-element-content--analyses">
            <!-- Analysis content here -->
            <file-analysis-display></file-analysis-display>
            <file-analysis-graph 
                graphWidth=${width} 
                graphHeight=${height}
                .hasDownloads=${false}
                style="height: ${height}px; width: ${width}px; display: block;"
            ></file-analysis-graph>
        </div>`;
	}
	renderMainContent(props) {
		const content = [lit.html`<file-canvas
                .prefers-gpu=${false}
            ></file-canvas>`];
		if (props.hasTimeline) content.push(lit.html`<file-timeline hasplaybutton="false"></file-timeline>`);
		return lit.html`<div>
            ${content}
        </div>`;
	}
	static {
		this.styles = lit.css`
    
        .export-element {

            position: relative;


            --thermal-export-bg: white;
            --thermal-export-fg: black;

            --thermal-crop: 2em;

            padding: var( --thermal-crop );

            box-sizing: border-box;

            .crop {
                position: absolute;
                width: var( --thermal-crop );
                height: var( --thermal-crop );
                box-sizing: border-box;

                &.crop-t {
                    top: 0;
                }

                &.crop-b {
                    bottom: 0;
                }

                &.crop-l {
                    left: 0;
                }

                &.crop-r {
                    right: 0;
                }

                --thermal-export-crop-border-width: 3px;
                --thermal-export-border-color: var( --thermal-background );

                &.crop-t.crop-l {
                    border-bottom: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-right: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-t.crop-r {
                    border-bottom: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-left: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-b.crop-l {
                    border-top: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-right: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }

                &.crop-b.crop-r {
                    border-top: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                    border-left: var(--thermal-export-crop-border-width) solid var(--thermal-export-border-color);
                }
            }


            .export-overlay {
                width: 100%;
                height: 100%;
                position: absolute;
                top: 0;
                left: 0;
                z-index: 99;
                cursor: help;

                box-sizing: border-box;
                padding: var( --thermal-crop );

                transition: all .3s ease;

                display: flex;
                align-items: stretch;
                justify-content: stretch;

                

                span {

                    font-size: 3em;
                    font-weight: normal !important;

                    width: 100%;
                    padding: 1em;
                
                    opacity: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    
                    box-sizing: outline-box;

                    transition: opacity .3s ease;
                    
                    color: var( --thermal-export-bg );
                    
                }

                &:hover {
                    span {
                        background: color-mix(in srgb, var( --thermal-export-fg ) 50%, transparent);
                        opacity: 1;
                    }
                }
            }

            .export-element-content {
                display: grid;
                box-sizing: border-box;
                background-color: var( --thermal-export-bg );

                .export-element-content--analyses {

                    display: grid;
                    gap: 1em;
                    grid-template-columns: 100%;
                    grid-template-rows: 1fr auto;
                
                }

            }



            &.vertical {
                &.hasAnalysis {

                    .export-element-content {
                        grid-template-columns: auto;
                        grid-template-rows: auto auto;
                    }
        
                }
            }

            &.horizontal {
                &.hasAnalysis {

                    .export-element-content {
                        grid-template-columns: 1fr 1fr;
                        grid-template-rows: auto;
                    }
                }
            }

            &.hasAnalysis {

            }

            &.hasTimeline {
            
            }

            &.hasHistogram {
            
            }

            &.hasThermalScale {
            
            }

            

            &.skin-light {
                --thermal-export-bg: white;
                --thermal-export-fg: black;
                --thermal-slate: var( --thermal-slate-base );
                --thermal-slate-dark: var( --thermal-slate-base-dark );
                --thermal-slate-light: var( --thermal-slate-base-light );
                --thermal-foreground: black;
                --thermal-background: white;
                --thermal-primary: var( --thermal-primary-base );
            }

            &.skin-dark {
                --thermal-export-bg: black;
                --thermal-export-fg: white;
                --thermal-background: black;
                --thermal-foreground: white;
                --thermal-slate: gray;
                --thermal-slate-dark: darkgray;
                --thermal-slate-light: lightgray;
            }

            &.skin-solarized {
                --thermal-export-bg: #1d5766ff;
                --thermal-export-fg: white;
                --thermal-background: #1d5766ff;
                --thermal-foreground: white;
                --thermal-slate: #27888bff;
                --thermal-slate-dark: #39aaa1ff;
                --thermal-slate-light: #073642;
            }

        
        }
    
    `;
	}
	initObserver(svgElement) {
		if (this.observer) return;
		const contentElement = svgElement?.querySelector(".export-element-content");
		if (!contentElement) return;
		this.observer = new ResizeObserver((entries) => {
			for (const entry of entries) {
				this.innerHeight = entry.borderBoxSize[0].blockSize;
				svgElement.setAttribute("height", String(this.innerHeight));
			}
		});
		this.observer.observe(contentElement);
	}
	render(app) {
		const reference = app.exportedDivRef;
		const props = app.renderProps;
		if (reference.value) this.initObserver(reference.value);
		const mainClasses = {
			"export-element": true,
			vertical: props.isVertical,
			horizontal: !props.isVertical,
			hasAnalysis: props.hasAnalysis,
			hasHistogram: props.hasHistogram,
			hasTimeline: props.hasTimeline,
			hasThermalScale: props.hasThermalScale,
			["skin-" + props.skin]: true
		};
		const effectiveScale = app.recordingPhase !== 0 ? 1 : props.previewScale;
		const containerStyle = {
			width: `calc( ${props.exportFrameWidth}px + var( --thermal-crop ) * 2 )`,
			scale: String(effectiveScale)
		};
		const contentStyle = {
			width: props.exportFrameWidth + "px",
			gap: props.exportFrameGap + "px",
			padding: props.exportFramePadding + "px"
		};
		const mainContent = [
			this.renderHistogram(props),
			this.renderThermalScale(props),
			this.renderMainContent(props)
		];
		const analyses = this.renderAnalyses(props);
		return lit.html`<!-- The main content rendered through the SingleVideoExportLayoutDirective -->
        <main
            class=${(0, lit_directives_class_map_js.classMap)(mainClasses)}
            style=${(0, lit_directives_style_map_js.styleMap)(containerStyle)}
        >
            <b class="crop crop-t crop-l"></b>
            <b class="crop crop-t crop-r"></b>
            <b class="crop crop-b crop-l"></b>
            <b class="crop crop-b crop-r"></b>

            <section 
                ${(0, lit_directives_ref_js.ref)(reference)}
                class="export-element-content" 
                style=${(0, lit_directives_style_map_js.styleMap)(contentStyle)}
            >

                <div class="export-element-content--main">
                    ${mainContent}
                </div>

                ${analyses}

            </section>

            <aside class="export-overlay">
                <span>
                    <strong>Náhled</strong>
                </span>
            </aside>

        </main>
        
        `;
	}
};
const exportLayoutDirective = (0, lit_directive_js.directive)(SingleVideoExportLayoutDirective);
//#endregion
//#region src/controls/file/video/directives/SingleVideoExportProvidersDirective.ts
var SingleVideoExportDirective = class extends lit_directive_js.Directive {
	renderWrappedWithNestedProviders(app, content) {
		const registry = app.registryObject;
		const group = app.groupObject;
		if (!registry || !group) return lit.nothing;
		return lit.html`<registry-provider 
            slug="${app.slug}"
            style="display: contents;"
        >
            <group-provider 
                slug=${app.slug}
                style="display: contents;"
            >
                <file-copy 
                    .originalFile=${app.outerFile} 
                    .withAnalyses=${app.renderProps.hasAnalysis}
                    ${(0, lit_directives_ref_js.ref)(app.fileCopyElementRef)}
                >
                    ${content}
                </file-copy>
            </group-provider>
        </registry-provider>`;
	}
	render(element, content) {
		return this.renderWrappedWithNestedProviders(element, content);
	}
};
const singleVideoProviders = (0, lit_directive_js.directive)(SingleVideoExportDirective);
//#endregion
//#region src/controls/file/video/FileVideoExportPanel.ts
var FileVideoExportPanel = class extends AbstractSingleVideoExport {
	constructor(..._args) {
		super(..._args);
		this.previewSectionRef = (0, lit_directives_ref_js.createRef)();
		this.exportRealWidth = 0;
		this.exportRealHeight = 0;
	}
	onInstanceCreated(instance) {
		this.parentHasAnalyses = instance.analysis.value.length > 0;
	}
	onFailure() {}
	connectedCallback() {
		super.connectedCallback();
		this.setupResizeObserver();
	}
	disconnectedCallback() {
		super.disconnectedCallback();
		this.previewResizeObserver?.disconnect();
		this.exportSizeObserver?.disconnect();
	}
	updated(_changedProperties) {
		super.updated(_changedProperties);
		this.setupResizeObserver();
		this.setupExportSizeObserver();
	}
	/** Nastaví ResizeObserver pro automatické škálování */
	setupResizeObserver() {
		if (this.previewResizeObserver || !this.previewSectionRef.value) return;
		this.previewResizeObserver = new ResizeObserver((entries) => {
			if (!this.renderProps.autoScale) return;
			for (const entry of entries) this.calculateAutoScale(entry.contentRect.height);
		});
		this.previewResizeObserver.observe(this.previewSectionRef.value);
	}
	/** Nastaví ResizeObserver pro sledování rozměrů exportovaného elementu */
	setupExportSizeObserver() {
		if (this.exportSizeObserver || !this.exportedDivRef.value) return;
		const exportMainElement = this.exportedDivRef.value.parentElement;
		if (!exportMainElement) return;
		this.exportSizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				this.exportRealWidth = Math.round(entry.contentRect.width);
				this.exportRealHeight = Math.round(entry.contentRect.height);
			}
		});
		this.exportSizeObserver.observe(exportMainElement);
	}
	/** Přepsaná metoda z AbstractSingleVideoExport - reaguje na změny layout vlastností */
	onLayoutAffectingPropertyChanged() {
		if (!this.renderProps.autoScale) return;
		this.updateComplete.then(() => {
			requestAnimationFrame(() => {
				this.triggerAutoScaleRecalculation();
			});
		});
	}
	/** Spustí přepočet autoScale na základě aktuální velikosti preview sekce */
	triggerAutoScaleRecalculation() {
		if (!this.previewSectionRef.value) return;
		const availableHeight = this.previewSectionRef.value.clientHeight;
		this.calculateAutoScale(availableHeight);
	}
	/** Vypočítá scale na základě dostupné výšky */
	calculateAutoScale(availableHeight) {
		const exportedElement = this.exportedDivRef.value;
		if (!exportedElement) return;
		const currentScale = this.renderProps.previewScale;
		const realHeight = exportedElement.getBoundingClientRect().height / currentScale;
		if (realHeight <= 0 || availableHeight <= 0) return;
		const newScale = Math.min(1, (availableHeight - 20) / realHeight);
		const clampedScale = Math.max(.1, Math.min(1, newScale));
		if (Math.abs(clampedScale - this.renderProps.previewScale) > .01) {
			this.renderProps.previewScale = clampedScale;
			this.requestUpdate();
		}
	}
	static {
		this.styles = [
			SingleVideoExportLayoutDirective.styles,
			SingleVideoExportConfigDirective.styles,
			lit.css`
            :host {
                font-size: var( --thermal-fs );
                color: var( --thermal-foreground );
                display: grid;
                grid-template-rows: auto 1fr auto;
                gap: 1em;
                height: 100%;
                min-height: 0;
                max-height: 100%;
            }

            .controls {
            }

            .preview {
                overflow: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 0; /* klíčové - povolí zmenšení pod velikost obsahu */
                position: relative;

                background: var( --thermal-slate );

                border-radius: var( --thermal-radius );

                & > * {
                
                }


                .preview-size {
                
                    position: absolute;
                    bottom: 1em;
                    right: 1em;

                    z-index: 10000;

                    display: flex;
                    flex-direction: column;
                    align-items: flex-end;
                    gap: 0.5em;

                    

                    & > * {
                        background: var( --thermal-slate-light );
                        border-radius: var( --thermal-radius );
                        box-sizing: border-box;
                        padding: 0.5em 0.75em;
                        text-align: right;
                        font-size: .8em;

                        .preview-label {
                            text-transform: uppercase;
                            
                            font-weight: normal;
                            margin-bottom: .25em;
                            text-align: right;
                            opacity: .8;
                        }

                        .preview-value {
                            font-weight: bold;
                        }
                    }

                    .preview-size--preview {
                    }

                    .preview-size--export {
                        thermal-radio {
                            display: inline-block;
                        }
                    }

                }





            }

            .footer {
            }

            .progress-overlay {
            
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;

                z-index: 100000;

                display: flex;
                align-items: center;
                justify-content: center;

                text-align: center;

                background: color-mix(in srgb, var( --thermal-slate-light ) 90%, transparent);

                .progress-overlay-content {
                
                    display: flex;
                    flex-direction: column;
                    gap: 1em;

                    div {
                        color: var( --thermal-slate-dark );
                    }
                }
            
            }
        `
		];
	}
	renderHeader() {
		return lit.html`<header class="controls">
            ${exportConfigDirective(this)}
        </header>`;
	}
	renderPreview() {
		const isExporting = this.recordingPhase !== 0;
		return lit.html`<section class="preview" ${(0, lit_directives_ref_js.ref)(this.previewSectionRef)}>
            ${exportLayoutDirective(this)}

            ${!isExporting ? lit.html`
                <div class="preview-size">
                    <div class="preview-size--export">
                        <div class="preview-label">Export</div>
                        <div class="preview-value">${this.exportRealWidth} × ${this.exportRealHeight} px</div>
                    </div>
                    <div class="preview-size--preview">
                        <div class="preview-label">Náhled</div>

                        <div class="preview-value">Zoom: ${(this.renderProps.previewScale * 100).toFixed(0)}%</div>


                        ${!this.renderProps.autoScale ? lit.html`
                            <input 
                                type="range" 
                                min="0.1" 
                                max="1" 
                                step="0.01" 
                                .value=${String(this.renderProps.previewScale)} 
                                @input=${(e) => {
			const input = e.target;
			const value = parseFloat(input.value);
			this.setPreviewScale(value);
		}}
                            />
                        ` : lit.nothing}

                        <thermal-radio
                            .checked=${this.renderProps.autoScale} 
                            .onChange=${(checked) => {
			this.setAutoScale(checked);
		}}
                        >Automatické přiblížení</thermal-radio>
                        
                    </div>
                </div>
            ` : lit.html``}

        </section>`;
	}
	renderOverview() {
		if (this.recordingPhase === 0) return lit.nothing;
		let message = this.t("exportencodingfile");
		if (this.recordingPhase === 1) message = `${this.t("exportrecordingframes")} ${this.recordingPhaseProgress.toFixed(2)}%`;
		return lit.html`<div
            class="progress-overlay"
        >

            <div class="progress-overlay-content">

                <thermal-spinner
                    .message=${message}
                ></thermal-spinner>

                <div>${this.t("exportdonotclosewindowhint")}</div>

            </div>
            
        </div>`;
	}
	renderFooter() {
		return lit.html`<footer class="footer">
            <file-timeline></file-timeline>
        </footer>`;
	}
	render() {
		return singleVideoProviders(this, [
			this.renderHeader(),
			this.renderPreview(),
			this.renderFooter(),
			this.renderOverview()
		]);
	}
};
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileVideoExportPanel.prototype, "exportRealWidth", void 0);
__decorate([(0, lit_decorators_js.state)(), __decorateMetadata("design:type", Number)], FileVideoExportPanel.prototype, "exportRealHeight", void 0);
//#endregion
//#region src/controls/manager/ManagerAdvancedPaletteSwitch.ts
var ManagerAdvancedPaletteSwitch = class extends AbstractManagerConsumer {
	render() {
		return lit.html`<thermal-btn-group>
            <thermal-btn
                variant="${!this.advancedPalettes ? "foreground" : "default"}"
                @click=${() => {
			this.managerController.setAdvancedPalettes(false);
		}}
            >Základní palety</thermal-btn>
            <thermal-btn
                variant="${this.advancedPalettes ? "foreground" : "default"}"
                @click=${() => {
			this.managerController.setAdvancedPalettes(true);
		}}
            >Všechny palety</thermal-btn>
        </thermal-btn-group>`;
	}
};
__decorate([(0, _lit_context.consume)({
	context: managerAdvancedPalettesContext,
	subscribe: true
}), __decorateMetadata("design:type", Boolean)], ManagerAdvancedPaletteSwitch.prototype, "advancedPalettes", void 0);
//#endregion
//#region src/renderers/FileDetail.ts
var FileDetailElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.norender = false;
	}
	onInstanceCreated() {}
	onFailure() {}
	static {
		this.styles = lit.css`
    
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        main {
            display: grid;
            gap: var(--thermal-gap);
            grid-template-columns: 1fr;
            @media ( min-width: 900px ) {
                grid-template-columns: 2fr 1fr;
            }
            @media ( min-width: 1300px ) {
                grid-template-columns: 1fr 1fr;
            }
        }

        header {
            width: 100%;
            display: flex;
            gap: 5px;
            margin-bottom: var(--thermal-gap);
            align-items: stretch;
        }
    
    `;
	}
	render() {
		return lit.html`<header>
    <thermal-btn 
        variant="foreground" 
        @click=${() => {
			if (this.onback) this.onback();
		}}
        tooltip=${t$1("back")}
        icon="close"
        iconStyle="micro"
    ></thermal-btn>

    ${this.label !== void 0 ? lit.html`
    <thermal-btn variant="background" non-interactive>${this.label}</thermal-btn>` : lit.nothing}

    <thermal-btn variant="background" non-interactive>
        <file-label></file-label>
    </thermal-btn>

    <file-info-button></file-info-button>
    <file-download-dropdown></file-download-dropdown>
</header>

<main>
    <section>
        <file-canvas norender="${this.norender}"></file-canvas>
        <file-timeline></file-timeline>
    </section>
    <section>
        <file-analysis-complex></file-analysis-complex>
    </section>
</main>`;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], FileDetailElement.prototype, "onback", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true
}), __decorateMetadata("design:type", Boolean)], FileDetailElement.prototype, "norender", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], FileDetailElement.prototype, "label", void 0);
//#endregion
//#region src/renderers/FileThumbnail.ts
var FileThumbnailElement = class extends AbstractFileConsumer {
	constructor(..._args) {
		super(..._args);
		this.norender = false;
	}
	onInstanceCreated() {}
	onFailure() {}
	static {
		this.styles = lit.css`
    
        :host {
            display: block;
            width: 100%;
            box-sizing: border-box;
        }

        header {
            width: 100%;
            display: flex;
            flex-wrap: nowrap;
            align-items: center;
            padding-bottom: 5px;
            color: var(--thermal-foreground);
            
            h2 {
                margin: 0;
                padding: 0;
                flex-grow: 1;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: var( --thermal-fs-sm );

                file-label {
                    white-space: preserve nowrap;
                }

                &:hover {
                    cursor: pointer;
                    color: var( --thermal-primary );
                }
            }

            & > div {
                display: flex;
                flex-wrap: nowrap;
                gap: 5px;
            }

        }
    
    `;
	}
	render() {
		return lit.html`

            <header>
                <h2
                    @click=${() => this.ondetail?.(this.file)}
                >
                    <file-label label="${(0, lit_directives_if_defined_js.ifDefined)(this.label)}"></file-label>
                </h2>
                <div>
                    <thermal-btn size="sm" variant="background" @click=${() => this.ondetail?.(this.file)}>${t$1("detail").toLocaleLowerCase()}</thermal-btn>
                    <file-range-propagator></file-range-propagator>
                    <file-dropdown>
                        <file-info-button>
                            <file-button slot="invoker" label=${t$1("info").toLowerCase()}></file-button>
                        </file-info-button>
                        <file-download-lrc></file-download-lrc>
                        <file-download-png></file-download-png>
                    </file-dropdown>
                </div>
            </header>

            <main>
                <file-canvas norender="${this.norender}"></file-canvas>
                <file-timeline></file-timeline>
                <file-analysis-table mode="compact"></file-analysis-table>
            </main>
        
    `;
	}
};
__decorate([(0, lit_decorators_js.property)({ type: Object }), __decorateMetadata("design:type", Function)], FileThumbnailElement.prototype, "ondetail", void 0);
__decorate([(0, lit_decorators_js.property)({
	type: Boolean,
	reflect: true,
	attribute: "no-render"
}), __decorateMetadata("design:type", Boolean)], FileThumbnailElement.prototype, "norender", void 0);
__decorate([(0, lit_decorators_js.property)({ type: String }), __decorateMetadata("design:type", String)], FileThumbnailElement.prototype, "label", void 0);
//#endregion
//#region src/ui/BtnGroup.ts
var BtnGroupElement = class extends AbstractThermalElement {
	static {
		this.styles = lit.css`
    
        :host {
            display: block;
        }

        .btn-group {
            display: flex;
            flex-wrap: no-wrap;
        }

        ::slotted(thermal-btn:first-child) {

            --custom-radius: var( --thermal-radius ) 0 0 var( --thermal-radius );
            border-right: none !important;
        
        }

        ::slotted(thermal-btn:last-child) {
            --custom-radius: 0 var( --thermal-radius ) var( --thermal-radius ) 0;
        }

        ::slotted(thermal-btn:not(:first-child):not(:last-child)) {
            --custom-radius: 0;
            border-right: none !important;
        }
    
    `;
	}
	render() {
		return lit.html`<div class="btn-group"><slot></slot></div>`;
	}
};
//#endregion
//#region src/iifeCatalog.ts
/**
* List of the UI components
*/
const elementsUi = {
	"thermal-app": ThermalAppElement,
	"thermal-bar": ThermalBarElement,
	"thermal-btn": ThermalBtnElement,
	"thermal-btn-group": BtnGroupElement,
	"thermal-dialog": ThermalDialogElement,
	"thermal-dropdown": ThermalDropdownElement,
	"thermal-dropin": ThermalDropinElement,
	"thermal-expandable": ThermalExpandableElement,
	"thermal-field": ThermalFieldElement,
	"thermal-icon": ThermalIconElement,
	"thermal-loading": ThermalPosterElement,
	"thermal-radio": ThermalRadioElement,
	"thermal-slot": ThermalSlotElement,
	"thermal-spinner": ThermalSpinnerElement,
	"thermal-tip": ThermalTipElement
};
const independentElements = {};
/**
* List of provider components
*/
const elementsProviders = {
	"manager-provider": ManagerProviderElement,
	"registry-provider": RegistryProviderElement,
	"group-provider": GroupProviderElement,
	"file-provider": FileProviderElement,
	"file-copy": FileCopyElement
};
const elementsManagerControls = {
	"manager-image-smooth-switch": ManagerImageSmoothSwitch,
	"manager-graph-smooth-switch": ManagerGraphSmoothSwitch,
	"manager-advanced-palette-switch": ManagerAdvancedPaletteSwitch,
	"manager-palette-dropdown": ManagerPaletteDropdown,
	"manager-palette-buttons": ManagerPaletteButtons,
	"manager-tool-bar": ManagerToolBar,
	/** @deprecated This sort of export should never be used. Please, do export thermal images only through the LIT components instead of the `@labirthermal/core` export. */
	"manager-export-panel": ManagerExportPanel
};
const elementsRegistryControls = {
	"registry-histogram": RegistryHistogram,
	"registry-opacity-slider": RegistryOpacitySlider,
	"registry-range-auto-button": RegistryRangeAutoButton,
	"registry-range-full-button": RegistryRangeFullButton,
	"registry-range-display": RegistryRangeDisplay,
	"registry-range-form": RegistryRangeForm,
	"registry-range-slider": RegistryRangeSlider,
	"registry-ticks-bar": RegistryTicksBar
};
const elementsGroupControls = {
	"group-analysis-sync-button": GroupAnalysisSyncButton,
	"group-chart": GroupChartElement,
	"group-download-buttons": GroupDownloadButtons,
	"group-download-dropdown": GroupDownloadDropdown,
	"group-dropin-element": GroupDropinElement,
	"group-dropin-input": GroupDropinInputElement,
	"group-range-propagator": GroupRangePropagatorElement,
	"group-timeline": GroupTimelineElement
};
const elementsFileControls = {
	"file-canvas": FileCanvasElement,
	"file-download-dropdown": FileDownloadButton,
	"file-info-button": FileInfoButton,
	"file-playback-speed-dropdown": FilePlaybackSpeedDropdown,
	"file-timeline": FileTimelineElement,
	"file-video-export-button": FileVideoExportButton,
	"file-video-export-panel": FileVideoExportPanel,
	"file-label": FileLabelElement,
	"file-button": FileButtonElement,
	"file-dropdown-elt": FileDropdown,
	"file-download-lrc": FileLrcButton,
	"file-download-png": FilePngButton,
	"file-range-propagator": FileRangePropagator,
	"file-analysis-complex": FileAnalysisComplexElement,
	"file-analysis-display": FileAnalysisDisplayElement,
	"file-analysis-edit": FileAnalisisEditDialog,
	"file-analysis-graph": FileAnalysisGraphElement,
	"file-analysis-table-row": FileAnalysisRowElement,
	"file-analysis-table": FileAnalysisTableElement,
	"analysis-color": AnalysisColorDropdown,
	"analysis-name": AnalysisNameInput,
	"edit-area": AreaEditTable,
	"edit-point": EditpointTable,
	"thermal-chart": ThermalChartElement,
	"file-detail": FileDetailElement,
	"file-thumbnail": FileThumbnailElement
};
const elementsApplications = {
	"apparent-temperature-aat": AatAppElement,
	"thermal-dropin-app": DropinAppElement,
	"thermal-file-app": ThermalFileAppElement,
	"thermal-group-app": ThermalGroupAppElement,
	"thermal-simple-app": ThermalSlottedAppElement
};
/** 
* All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
* @see {@link defineBaseWebcomponents}
*/
const elementsAll = {
	...elementsProviders,
	...elementsUi,
	...elementsManagerControls,
	...elementsRegistryControls,
	...elementsGroupControls,
	...elementsFileControls,
	...elementsApplications
};
const isLabirthermalWebcomponent = (tag) => {
	return tag in elementsAll;
};
/** Define all webcomponents from the @labirthermal/webcomponents package */
const defineBaseWebcomponents = () => {
	defineAllWebcomponents(name, version$1, elementsAll);
};
//#endregion
//#region src/index.export.ts
const t = i18webcomponents.t;
//#endregion
exports.AbstractApp = AbstractApp;
exports.AbstractFileConsumer = AbstractFileConsumer;
exports.AbstractFileProvider = AbstractFileProvider;
exports.AbstractGroupConsumer = AbstractGroupConsumer;
exports.AbstractGroupProvider = AbstractGroupProvider;
exports.AbstractHierarchyController = AbstractHierarchyController;
exports.AbstractManagerConsumer = AbstractManagerConsumer;
exports.AbstractManagerProvider = AbstractManagerProvider;
exports.AbstractReactiveController = AbstractReactiveController;
exports.AbstractRegistryConsumer = AbstractRegistryConsumer;
exports.AbstractRegistryProvider = AbstractRegistryProvider;
exports.AbstractThermalElement = AbstractThermalElement;
exports.AnalysisColorDropdown = AnalysisColorDropdown;
exports.AnalysisNameInput = AnalysisNameInput;
exports.AppInfoButton = AppInfoButton;
exports.AreaEditTable = AreaEditTable;
exports.ConfigController = ConfigController;
exports.ConfigDialog = ConfigDialog;
exports.DisplayPanel = DisplayPanel;
exports.EditpointTable = EditpointTable;
exports.FileAnalisisEditDialog = FileAnalisisEditDialog;
exports.FileAnalysisComplexElement = FileAnalysisComplexElement;
exports.FileAnalysisDisplayElement = FileAnalysisDisplayElement;
exports.FileAnalysisGraphElement = FileAnalysisGraphElement;
exports.FileAnalysisRowElement = FileAnalysisRowElement;
exports.FileAnalysisTableElement = FileAnalysisTableElement;
exports.FileButtonElement = FileButtonElement;
exports.FileCanvasElement = FileCanvasElement;
exports.FileController = FileController;
exports.FileCopyElement = FileCopyElement;
exports.FileDownloadButton = FileDownloadButton;
exports.FileDropdown = FileDropdown;
exports.FileLoadController = FileLoadController;
exports.FileLrcButton = FileLrcButton;
exports.FilePlaybackSpeedDropdown = FilePlaybackSpeedDropdown;
exports.FilePngButton = FilePngButton;
exports.FileProviderElement = FileProviderElement;
exports.FileRangePropagator = FileRangePropagator;
exports.FileVideoExportButton = FileVideoExportButton;
exports.GroupAnalysisSyncButton = GroupAnalysisSyncButton;
exports.GroupAnalysisSyncController = GroupAnalysisSyncController;
exports.GroupChartElement = GroupChartElement;
exports.GroupController = GroupController;
exports.GroupDownloadButtons = GroupDownloadButtons;
exports.GroupDownloadDropdown = GroupDownloadDropdown;
exports.GroupDropinElement = GroupDropinElement;
exports.GroupDropinInputElement = GroupDropinInputElement;
exports.GroupListingController = GroupListingController;
exports.GroupLoadController = GroupLoadController;
exports.GroupOrderby = GroupOrderby;
exports.GroupOrdering = GroupOrdering;
exports.GroupProviderElement = GroupProviderElement;
exports.GroupRangePropagatorElement = GroupRangePropagatorElement;
exports.GroupTimelineElement = GroupTimelineElement;
exports.HierarchyUpdatesHub = HierarchyUpdatesHub;
exports.INTERNAL_STATE_DECLARATION = INTERNAL_STATE_DECLARATION;
exports.ManagerController = ManagerController;
exports.ManagerExportPanel = ManagerExportPanel;
exports.ManagerGraphSmoothSwitch = ManagerGraphSmoothSwitch;
exports.ManagerImageSmoothSwitch = ManagerImageSmoothSwitch;
exports.ManagerPaletteButtons = ManagerPaletteButtons;
exports.ManagerPaletteDropdown = ManagerPaletteDropdown;
exports.ManagerProviderElement = ManagerProviderElement;
exports.ManagerToolBar = ManagerToolBar;
exports.RegistryController = RegistryController;
exports.RegistryHistogram = RegistryHistogram;
exports.RegistryOpacitySlider = RegistryOpacitySlider;
exports.RegistryProviderElement = RegistryProviderElement;
exports.RegistryRangeAutoButton = RegistryRangeAutoButton;
exports.RegistryRangeDisplay = RegistryRangeDisplay;
exports.RegistryRangeForm = RegistryRangeForm;
exports.RegistryRangeFullButton = RegistryRangeFullButton;
exports.RegistryRangeSlider = RegistryRangeSlider;
exports.RegistryTicksBar = RegistryTicksBar;
exports.ThermalAppElement = ThermalAppElement;
exports.ThermalBarElement = ThermalBarElement;
exports.ThermalBtnElement = ThermalBtnElement;
exports.ThermalChartElement = ThermalChartElement;
exports.ThermalDialogElement = ThermalDialogElement;
exports.ThermalDropdownElement = ThermalDropdownElement;
exports.ThermalDropinElement = ThermalDropinElement;
exports.ThermalExpandableElement = ThermalExpandableElement;
exports.ThermalFieldElement = ThermalFieldElement;
exports.ThermalIconElement = ThermalIconElement;
exports.ThermalPosterElement = ThermalPosterElement;
exports.ThermalRadioElement = ThermalRadioElement;
exports.ThermalSlotElement = ThermalSlotElement;
exports.ThermalSpinnerElement = ThermalSpinnerElement;
exports.ThermalTipElement = ThermalTipElement;
exports.addInlineStyles = addInlineStyles;
exports.booleanConverter = booleanConverter;
exports.configContext = configContext;
exports.defineAllWebcomponents = defineAllWebcomponents;
exports.defineBaseWebcomponents = defineBaseWebcomponents;
exports.defineWebcomponent = defineWebcomponent;
exports.durationConverter = durationConverter;
exports.elementsAll = elementsAll;
exports.elementsProviders = elementsProviders;
exports.fileAnalysisListContext = fileAnalysisListContext;
exports.fileContext = fileContext;
exports.fileControllerContext = fileControllerContext;
exports.fileCurrentFrameContext = fileCurrentFrameContext;
exports.fileDurationContext = fileDurationContext;
exports.fileFailureContext = fileFailureContext;
exports.fileLoadingContext = fileLoadingContext;
exports.fileMayStopContext = fileMayStopContext;
exports.fileMsContext = fileMsContext;
exports.filePlaybackSpeedContext = filePlaybackSpeedContext;
exports.filePlayingContext = filePlayingContext;
exports.fileRecordingContext = fileRecordingContext;
exports.fileTimeCursorContext = fileTimeCursorContext;
exports.getContrastColor = getContrastColor;
exports.groupAnalysisSyncContext = groupAnalysisSyncContext;
exports.groupControllerContext = groupControllerContext;
exports.groupObjectContext = groupObjectContext;
exports.i18nWebcomponents = i18webcomponents;
exports.icons = icons;
exports.independentElements = independentElements;
exports.isLabirthermalWebcomponent = isLabirthermalWebcomponent;
exports.managerAdvancedPalettesContext = managerAdvancedPalettesContext;
exports.managerContext = managerContext;
exports.managerControllerContext = managerControllerContext;
exports.managerGraphFunctionContext = managerGraphFunctionContext;
exports.managerInteractiveAnalysesContext = managerInteractiveAnalysesContext;
exports.managerPaletteContext = managerPaletteContext;
exports.managerSmoothContext = managerSmoothContext;
exports.managerToolContext = managerToolContext;
exports.numberRangeConverter = numberRangeConverter;
exports.paletteConverter = paletteConverter;
exports.registryControllerContext = registryControllerContext;
exports.registryHighlightContext = registryHighlightContext;
exports.registryLoadingContext = registryLoadingContext;
exports.registryMaxContext = registryMaxContext;
exports.registryMinContext = registryMinContext;
exports.registryObjectContext = registryObjectContext;
exports.registryOpacityContext = registryOpacityContext;
exports.registryRangeFromContext = registryRangeFromContext;
exports.registryRangeToContext = registryRangeToContext;
exports.stringOrUndefinedConverter = stringOrUndefinedConverter;
exports.t = t;

//# sourceMappingURL=index.export.cjs.map