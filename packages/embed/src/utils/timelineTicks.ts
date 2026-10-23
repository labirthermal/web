import { format } from "date-fns";
import { css, html, nothing } from "lit";

enum TICK {
    MINOR = "minor",
    MAJOR = "major",
    BOUND = "bound"
}


export type Tick = {
    ms: number,
    percent: number,
    type: TICK,
    label: string
}

/** Available minute divisions */
type MinuteDivision = 2 | 4 | 6 | 12 | 30;

/**
 * Format data into a tick value
 */
const tick = (
    ms: number,
    duration: number,
    type: TICK
): Tick => ({
    ms,
    percent: ms / duration * 100,
    type,
    label: format(ms, "m:ss")
})


/**
 * Take a minute interval, divide it into a given number of segments and return array of `Tick` objects:
 * - any number of TICK.MINOR for seconds
 * - one last TICK.MAJOR for minute end
 * All ticks are returned only when they are smaller than the overall duration.
 */
const processTickMinute = (
    /** Milliseconds from which the minute starts */
    from: number,
    /** Milliseconds to which the minute ends */
    to: number,
    /** Number of divisions to which a minute shall be splitted */
    count: MinuteDivision,
    /** The overall duration of the entire timeline */
    duration: number
): Tick[] => {

    const ticks: Tick[] = [];

    let i = 1;

    const partial = (to - from) / count;

    while (i < count) {

        const value = from + (i * partial);
        if (value < duration) {
            ticks.push(tick(
                value,
                duration,
                TICK.MINOR
            ));
        }

        i += 1;

    }

    if (to < duration) {
        ticks.push(tick(to, duration, TICK.MAJOR));
    }

    return ticks;

}

const minute = 60 * 1000;
const tickWidth = 50;
const tickPointerHeight = 3;

export const calculateTicks = (
    /** Width of the element */
    width: number,
    /** Overall duration of the timeline in miliseconds */
    duration: number
): Tick[] => {

    const numTicks = Math.floor(width / tickWidth);
    const numMinutes = Math.floor(duration / (60 * 1000));

    const ticksPerMinuteRaw = numTicks / numMinutes;

    let ticksPerMinute: MinuteDivision = 2;

    if (ticksPerMinuteRaw >= 2) ticksPerMinute = 4;
    if (ticksPerMinuteRaw >= 6) ticksPerMinute = 6;
    if (ticksPerMinuteRaw >= 12) ticksPerMinute = 12;
    if (ticksPerMinuteRaw >= 30) ticksPerMinute = 30;

    const ticks: Tick[] = [];

    let from = 0;
    let to = minute;

    while ( from < duration ) {

        // Process the minute
        processTickMinute( 
            from, 
            to, 
            ticksPerMinute, 
            duration 
        ).forEach( tick => ticks.push(tick) );

        // Add a minute
        from += minute;
        to += minute;

    }

    ticks.push( tick(0, duration, TICK.BOUND) );
    ticks.push( tick(duration, duration, TICK.BOUND) );

    return ticks;

}

const renderTick = (tick: Tick) => {
    return html`<div
        class="tick tick-${tick.type}"
        style="left: ${tick.percent}%;"
    >
        <div class="tick-pointer"></div>
        <div class="tick-label">${tick.label}</div>
    </div>`;
}

const renderPointer = (
    percent: number,
    label: string,
    type: "pointer"|"primary"
) => {
    return html`<div 
        class="indicator-cursor indicator-cursor__${type}"
        style="left: ${percent}%;"
        data-video-rerender
    >
        <div class="indicator-cursor-arrow"></div>
        <div class="indicator-cursor-label">${label}</div>
    </div>`;
}

export const renderTicks = ( 
    duration: number,
    ticks: Tick[],
    currentMs: number,
    pointerMs?: number
) => {

    const currentPercent = currentMs / duration * 100;

    const pointerPercent = pointerMs !== undefined
        ? pointerMs / duration * 100
        : undefined;


    return html`<div class="ticks">
        
        ${ticks.map( renderTick )}

        ${renderPointer( currentPercent, format(currentMs, "m:ss:SSS" ), "primary" )}

        ${pointerMs !== undefined && pointerPercent !== undefined 
            ? renderPointer( pointerPercent, format( pointerMs, "m:ss:SSS" ), "pointer" )
            : nothing
        }

    </div>`;
}

export const ticksCss = css`

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
                width: ${tickPointerHeight*2}px;
                height: ${tickPointerHeight*2}px;
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