import { addInlineStyles, defineAllWebcomponents, defineBaseWebcomponents } from "@labirthermal/webcomponents";
import { name, version } from "../package.json";

// This is the main entry file for the IIFE build
// This file is executed withg after it is loaded by the browser.

/**
 * LabIR Embed - webcomponents foundation IIFE build
 * @package `@labirthermal/webcomponents`
 */

console.info( name, version );

import {i18nWebcomponents} from "@labirthermal/webcomponents";

console.log(i18nWebcomponents);


// Initialise dark mode
// import { initialiseMode } from "./styles/mode";
// initialiseMode();

// Append default styles
import { elementsAll } from "./iifeCatalog";

addInlineStyles();

/**
 * Define all included webcomponents right away.
 */
// defineAllWebcomponents( elementsAll );

defineBaseWebcomponents();

defineAllWebcomponents(name, version, elementsAll);

console.info( name, version, "All webcomponents defined." );