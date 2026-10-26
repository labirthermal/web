import { ControllerApp } from "./connection/controllers/apps/ConnectedBrowserApp";

const connectedAppElements = {
    "connected-browser-app": ControllerApp
}

/** 
 * All the webcomponents from the @labirthermal/webcomponents package in a list for the purpose of its registration in `defineAllWebcomponents`.
 * @see {@link defineAllWebcomponents}
 */
export const elementsAll = {
    ...connectedAppElements
} as const;

export const isLabirthermalWebcomponent = (tag: string): boolean => {
    return tag in elementsAll;
};