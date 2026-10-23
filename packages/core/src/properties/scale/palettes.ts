/** Definition of a palette containing its name, gradient and pixels value. */
export type ThermalPaletteType = {
    /** Actial pixels that shall be ised for drawings of thermograms. */
    pixels: string[],
    /** Human-readable name of the palette. */
    name: string,
    /** A CSS gradient representing the color scale in the UI. */
    gradient: string,
    /** The CSS slug */
    slug: AvailableThermalPalette,
    /** Float array containing color values for WebGL2 texture */
    texturePixels: Float32Array,
}


/** Pixels of the GRAYSCALE palette. Array of 256 strings containing CSS color notation usable in `HTMLCanvasElement`. */

type ColorStop = { percent: number; color: [number, number, number] };

const generatePaletteFromStops = (stops: ColorStop[]): string[] => {
    const palette: string[] = new Array(256);
    const sortedStops = [...stops].sort((a, b) => a.percent - b.percent);

    for (let i = 0; i < 256; i++) {
        const percent = (i / 255) * 100;
        let startStop: ColorStop = sortedStops[0];
        let endStop: ColorStop = sortedStops[sortedStops.length - 1];

        for (let j = 0; j < sortedStops.length - 1; j++) {
            if (percent >= sortedStops[j].percent && percent <= sortedStops[j + 1].percent) {
                startStop = sortedStops[j];
                endStop = sortedStops[j + 1];
                break;
            }
        }

        const range = endStop.percent - startStop.percent;
        const rangePercent = range === 0 ? 0 : (percent - startStop.percent) / range;

        const r = Math.round(startStop.color[0] + rangePercent * (endStop.color[0] - startStop.color[0]));
        const g = Math.round(startStop.color[1] + rangePercent * (endStop.color[1] - startStop.color[1]));
        const b = Math.round(startStop.color[2] + rangePercent * (endStop.color[2] - startStop.color[2]));

        palette[i] = `rgb(${r},${g},${b})`;
    }
    return palette;
};

const generateGradientFromStops = (stops: ColorStop[]): string => {
    const sortedStops = [...stops].sort((a, b) => a.percent - b.percent);
    const gradientStops = sortedStops.map(stop => `rgb(${stop.color.join(',')}) ${stop.percent}%`).join(', ');
    return `linear-gradient(90deg, ${gradientStops})`;
};

const generateTextureArrayFromStops = (stops: ColorStop[]): Float32Array => {
    const sortedStops = [...stops].sort((a, b) => a.percent - b.percent);
    const arr = new Float32Array(256 * 4); // Vždy 256 barev

    for (let i = 0; i < 256; i++) {
        const percent = (i / 255) * 100; // Normalizovat na 0-100%

        // Najít dva sousední stops
        let lowerStop = sortedStops[0];
        let upperStop = sortedStops[sortedStops.length - 1];

        for (let j = 0; j < sortedStops.length - 1; j++) {
            if (percent >= sortedStops[j].percent && percent <= sortedStops[j + 1].percent) {
                lowerStop = sortedStops[j];
                upperStop = sortedStops[j + 1];
                break;
            }
        }

        // Interpolovat barvu
        const ratio = (percent - lowerStop.percent) / (upperStop.percent - lowerStop.percent || 1);
        const r = lowerStop.color[0] + (upperStop.color[0] - lowerStop.color[0]) * ratio;
        const g = lowerStop.color[1] + (upperStop.color[1] - lowerStop.color[1]) * ratio;
        const b = lowerStop.color[2] + (upperStop.color[2] - lowerStop.color[2]) * ratio;

        arr[i * 4] = r / 255;
        arr[i * 4 + 1] = g / 255;
        arr[i * 4 + 2] = b / 255;
        arr[i * 4 + 3] = 1.0;
    }

    return arr;
}

const IRON_STOPS: ColorStop[] = [
    { percent: 0, color: [0, 0, 0] },
    { percent: 30, color: [10, 12, 77] },
    { percent: 49, color: [86, 20, 101] },
    { percent: 64, color: [255, 0, 0] },
    { percent: 84, color: [249, 255, 0] },
    { percent: 100, color: [255, 255, 255] }
];

const JET_STOPS: ColorStop[] = [
    { percent: 0, color: [31, 0, 157] },
    { percent: 8, color: [0, 5, 255] },
    { percent: 36, color: [0, 255, 239] },
    { percent: 66, color: [255, 252, 0] },
    { percent: 94, color: [255, 2, 0] },
    { percent: 100, color: [145, 0, 0] }
];


// Definice barevných zastávek
const WHITE_HOT_STOPS: ColorStop[] = [
    { percent: 0, color: [0, 0, 0] },
    { percent: 100, color: [255, 255, 255] }
];

const BLACK_HOT_STOPS: ColorStop[] = [
    { percent: 0, color: [255, 255, 255] },
    { percent: 100, color: [0, 0, 0] }
];

const LAVA_STOPS: ColorStop[] = [
    { percent: 0, color: [0, 0, 0] },
    { percent: 12, color: [30, 78, 149] },
    { percent: 32, color: [33, 128, 127] },
    { percent: 41, color: [102, 48, 108] },
    { percent: 64, color: [233, 37, 37] },
    { percent: 90, color: [255, 255, 0] },
    { percent: 100, color: [255, 255, 255] }
];

const ARCTIC_STOPS: ColorStop[] = [
    { percent: 0, color: [17, 13, 133] },
    { percent: 15, color: [23, 50, 248] },
    { percent: 30, color: [75, 245, 255] },
    { percent: 55, color: [100, 91, 86] },
    { percent: 70, color: [239, 86, 28] },
    { percent: 87, color: [255, 255, 0] },
    { percent: 100, color: [255, 255, 255] }
];

const RAINBOW_STOPS: ColorStop[] = [
    { percent: 0, color: [12, 11, 65] },
    { percent: 23, color: [36, 108, 212] },
    { percent: 42, color: [100, 255, 30] },
    { percent: 55, color: [255, 255, 0] },
    { percent: 80, color: [255, 0, 69] },
    { percent: 100, color: [255, 255, 255] }
];

const RAINBOW_HC_STOPS: ColorStop[] = [
    { percent: 0, color: [0, 0, 0] },
    { percent: 13, color: [212, 0, 217] },
    { percent: 25, color: [21, 28, 151] },
    { percent: 37, color: [55, 230, 255] },
    { percent: 50, color: [17, 75, 22] },
    { percent: 62, color: [255, 255, 0] },
    { percent: 80, color: [119, 0, 11] },
    { percent: 90, color: [255, 40, 32] },
    { percent: 100, color: [255, 255, 255] }
];


// Generování palet
const IRON = generatePaletteFromStops(IRON_STOPS);
const JET = generatePaletteFromStops(JET_STOPS);
const WHITE_HOT = generatePaletteFromStops(WHITE_HOT_STOPS);
const BLACK_HOT = generatePaletteFromStops(BLACK_HOT_STOPS);
const LAVA = generatePaletteFromStops(LAVA_STOPS);
const ARCTIC = generatePaletteFromStops(ARCTIC_STOPS);
const RAINBOW = generatePaletteFromStops(RAINBOW_STOPS);
const RAINBOW_HC = generatePaletteFromStops(RAINBOW_HC_STOPS);


const PALETTES = {
    iron: {
        name: "IRON",
        gradient: generateGradientFromStops(IRON_STOPS),
        pixels: IRON,
        texturePixels: generateTextureArrayFromStops(IRON_STOPS),
        slug: "iron"
    },
    jet: {
        name: "JET",
        gradient: generateGradientFromStops(JET_STOPS),
        pixels: JET,
        texturePixels: generateTextureArrayFromStops(JET_STOPS),
        slug: "jet"
    },
    white_hot: {
        name: "White Hot",
        gradient: generateGradientFromStops(WHITE_HOT_STOPS),
        pixels: WHITE_HOT,
        texturePixels: generateTextureArrayFromStops(WHITE_HOT_STOPS),
        slug: "white_hot"
    },
    black_hot: {
        name: "Black Hot",
        gradient: generateGradientFromStops(BLACK_HOT_STOPS),
        pixels: BLACK_HOT,
        texturePixels: generateTextureArrayFromStops(BLACK_HOT_STOPS),
        slug: "black_hot"
    },
    lava: {
        name: "Lava",
        gradient: generateGradientFromStops(LAVA_STOPS),
        pixels: LAVA,
        texturePixels: generateTextureArrayFromStops(LAVA_STOPS),
        slug: "lava"
    },
    arctic: {
        name: "Arctic",
        gradient: generateGradientFromStops(ARCTIC_STOPS),
        pixels: ARCTIC,
        texturePixels: generateTextureArrayFromStops(ARCTIC_STOPS),
        slug: "arctic"
    },
    rainbow: {
        name: "Rainbow",
        gradient: generateGradientFromStops(RAINBOW_STOPS),
        pixels: RAINBOW,
        texturePixels: generateTextureArrayFromStops(RAINBOW_STOPS),
        slug: "rainbow"
    },
    rainbow_hc: {
        name: "Rainbow HC",
        gradient: generateGradientFromStops(RAINBOW_HC_STOPS),
        pixels: RAINBOW_HC,
        texturePixels: generateTextureArrayFromStops(RAINBOW_HC_STOPS),
        slug: "rainbow_hc"
    }
} as const;

/** Keys of palettes available in `@labirthermal/core`. */
export type AvailableThermalPalette = keyof typeof PALETTES;

/** Palette definitions available in `@labirthermal/core`. */
export const ThermalPalettes = PALETTES as Record<AvailableThermalPalette, ThermalPaletteType>;

export const defaultPaletteKey: AvailableThermalPalette = "jet";