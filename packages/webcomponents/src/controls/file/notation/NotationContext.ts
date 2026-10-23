import { createContext } from "@lit/context";
import { NotationEntry } from "./NotationEntry"

export type NotationListContext = NotationEntry[];
export type NotationCurrentContext = NotationEntry[]|undefined;
export type NotationDurationContext = number;

export const notationListContext = createContext<NotationListContext>( "NotationListContext" );
export const notationCurrentContext = createContext<NotationCurrentContext>("NotationCurrentContext");
export const notationDurationContext = createContext<NotationDurationContext>("NotationDurationContext");

export interface IWithNotationContext {
    /** Raw elements slotted in slot named `notation`. There should be only `NotationEntries`, but in case there is other element, we need to filter them. */
    _notationSlot: HTMLElement[],
    /** Current MS */
    ms?: number,
    /** Duration of the notation sequence */
    duration?: number,
    /** Filtered notations slotted in `notation`. Exposes data in a context. */
    notationList: NotationListContext,
    notationCurrent: NotationCurrentContext,
    updateNotationsMs: ( ms: number ) => void
}

/** Grab notations from the slots */
export const grabNotationsFromSlot = ( elements: Element[] ): NotationEntry[] => {
    return elements.filter( element => element instanceof NotationEntry );
}

export const getCurrentNotationsByMs = ( ms: number, container: IWithNotationContext ): NotationEntry[] => {

    const current: NotationEntry[] = [];

    for ( const notation of container.notationList ) {

        if ( notation.from !== undefined && notation.to !== undefined ) {
            if ( notation.from <= ms && notation.to > ms ) {
                current.push( notation );
                notation.activate();
            } else {
                notation.deactivate();
            }
        }

    }

    return current;

}


