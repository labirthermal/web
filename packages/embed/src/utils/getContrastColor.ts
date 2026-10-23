const contrastColors = new Map<string, "#000000" | "#FFFFFF">();

/** Choose the higher WCAG contrast against an opaque CSS background color. */
export function getContrastColor(backgroundColor: string): "#000000" | "#FFFFFF" {
    const cached = contrastColors.get(backgroundColor);
    if (cached) {
        return cached;
    }

    const probe = document.createElement("span");
    probe.style.color = backgroundColor;
    if (!probe.style.color) {
        throw new Error(`Invalid background color: ${backgroundColor}`);
    }
    probe.style.display = "none";
    document.body.append(probe);
    const normalized = getComputedStyle(probe).color;
    probe.remove();

    const match = normalized.match(/^rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\)$/);
    if (!match || (match[4] !== undefined && Number(match[4]) !== 1)) {
        throw new Error(`Expected an opaque RGB background color: ${backgroundColor}`);
    }

    const linear = [Number(match[1]), Number(match[2]), Number(match[3])].map(channel => {
        const srgb = channel / 255;
        return srgb <= .04045 ? srgb / 12.92 : ((srgb + .055) / 1.055) ** 2.4;
    });
    const luminance = .2126 * linear[0] + .7152 * linear[1] + .0722 * linear[2];
    const blackContrast = (luminance + .05) / .05;
    const whiteContrast = 1.05 / (luminance + .05);
    const result = blackContrast >= whiteContrast ? "#000000" : "#FFFFFF";
    contrastColors.set(backgroundColor, result);
    return result;
}
