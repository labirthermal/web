import {version as pversion} from "../../package.json";
import { DARK_MODE_CLASS } from "./mode";


export const appendStyles = () => {
    const styles = document.createElement("link");
    styles.href = "https://cdn.jsdelivr.net/npm/@labirthermal/webcomponents/dist/embed.css"
    document.head.appendChild( styles );
}

const version = pversion.toString().replaceAll(".", "-");
const getStylesheetId = (scope: string) => {
    return `labirthermal__${scope}__${version}`;
}


const cssStyleIsAppended = (scope: string) => {
    const element = document.getElementById(getStylesheetId(scope));
    return element !== null;
}

const appendHeadCss = (scope: string, styles: string) => {

    if (!cssStyleIsAppended(scope)) {

        const element = document.createElement("style");
        element.setAttribute("id", getStylesheetId(scope));
        element.innerHTML = styles;

        document.head.appendChild(element);

    }

}

export const addInlineStyles = () => {

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


            
        
        ` );

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
            
        ` );

    appendHeadCss( "solarizedSkin", `*[skin="solarized"] {
--thermal-foreground: #cef0faff;
--thermal-background: #1d5766ff;

--thermal-slate-dark: #39aaa1ff;
--thermal-slate: #27888bff;
--thermal-slate-light: #073642;

--thermal-primary-dark: #defdffff;
--thermal-primary: #9de9f3ff;
--thermal-primary-light: #67bcddff;
}` );

    appendHeadCss( "systemSkin", `*[skin="system"] {
--thermal-foreground: buttontext;
--thermal-background: field;
        
--thermal-slate: ButtonBorder;
--thermal-slate-dark: GrayText;
--thermal-slate-light: ButtonFace;

--thermal-primary: accentcolor;
--thermal-primary-dark: linktext;
--thermal-primary-light: selecteditem;
}` );

    appendHeadCss( "darkSkin", `*[skin="dark"] {
--thermal-primary: aqua;
--thermal-foreground: white;
--thermal-background: black;

--thermal-primary-light: var( --thermal-primary-base-dark );
--thermal-primary-dark: var( --thermal-primary-base-light );

--thermal-slate-light: var( --thermal-slate-base-dark );
--thermal-slate-dark: var( --thermal-slate-base-light );
}` );

    appendHeadCss( "darkHC", `*[skin="darkhc"] {
--thermal-foreground: black;
--thermal-background: white;
        
--thermal-slate: gray;
--thermal-slate-dark: #454545;
--thermal-slate-light: lightgray;

--thermal-primary: blue;
--thermal-primary-dark: navy;
--thermal-primary-light: lightblue;

}` );

    appendHeadCss( "narrowCorners", `*[corners="narrow"] {
--thermal-radius: 0px;
` );

    appendHeadCss( "lineStyles", `*[lines="big"] {
--thermal-border-width: 3px;
` );

}


