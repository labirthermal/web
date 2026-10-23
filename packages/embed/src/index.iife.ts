import { elementsAll } from "./iifeCatalog";
import { defineAllWebcomponents } from "./utils/iife";
import { name, version } from "../package.json";

// This is the main entry file for the IIFE build
// This file is executed withg after it is loaded by the browser.

/**
 * LabIR Embed - webcomponents foundation IIFE build
 * @package `@labirthermal/webcomponents`
 */

console.info( name, version );

import "./translations/i18n";

// Initialise dark mode
// import { initialiseMode } from "./styles/mode";
// initialiseMode();

// Append default styles
import { addInlineStyles } from "./styles/defaultStyles";

addInlineStyles();

/**
 * Define all included webcomponents right away.
 */
defineAllWebcomponents( name, version, elementsAll );

console.info( name, version, "All webcomponents defined." );