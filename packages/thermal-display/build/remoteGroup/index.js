/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/remoteGroup/edit.js"
/*!*********************************!*\
  !*** ./src/remoteGroup/edit.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_appearence_AppearencePanel__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/appearence/AppearencePanel */ "./src/utils/appearence/AppearencePanel.js");
/* harmony import */ var _utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/useRegisterIframeScript */ "./src/utils/useRegisterIframeScript.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/remoteGroup/editor.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);







/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function Edit({
  attributes,
  setAttributes
}) {
  /** Register the webcomponents if not already */
  (0,_utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_4__.useRegisterIframeScript)();
  const {
    url,
    subfolder,
    folder,
    palette
  } = attributes;
  const [info, setInfo] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(undefined);
  const [validFolder, setValidFolder] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(undefined);
  const isValidUrl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(value => {
    try {
      new URL(value);
      return true;
    } catch (err) {
      return false;
    }
  }, []);
  const validateStringInput = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(value => {
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed.length > 0) {
        return trimmed;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }, []);
  const getInfoUrl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)((url, subfolder) => {
    if (!isValidUrl(url)) {
      return undefined;
    }
    let output = url;
    if (subfolder) output += `?scope=${subfolder}`;
    return output;
  }, [isValidUrl]);
  const fetchInfo = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(async () => {
    setInfo(undefined);
    setValidFolder(undefined);
    const target = getInfoUrl(url, subfolder);
    const raw = await fetch(target);
    if (raw.ok) {
      const json = await raw.json();
      if ("success" in json && "folders" in json) {
        if (json.success === true) {
          const folders = Object.values(json.folders).map(folder => ({
            label: `${folder.name} (${folder.lrc_count})`,
            value: folder.folder
          }));
          setInfo(folders);
          if (Object.keys(json.folders).includes(folder)) {
            setValidFolder(folder);
          } else if (validFolder === undefined) {
            setValidFolder(Object.keys(json.folders)[0]);
          }
        }
      }
    }
    console.log(target);
  }, [url, subfolder, getInfoUrl, folder]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useEffect)(() => {
    if (url && subfolder) {
      fetchInfo();
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "Values",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "API endpoint",
          help: "Provide the URL of the API endpoint",
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: value => {
            setAttributes({
              url: validateStringInput(value)
            });
          },
          value: url,
          required: true,
          type: "url"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "Subfolder",
          help: "Provide the name of the optional subfolder",
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: value => {
            setAttributes({
              subfolder: validateStringInput(value)
            });
          },
          value: subfolder
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          onClick: fetchInfo,
          variant: "primary",
          children: "Fetch information"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("br", {}), info && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          label: "Folder",
          help: "Select a folder from the remote destination",
          onChange: value => {
            setAttributes({
              folder: value
            });
            setValidFolder(value);
          },
          options: info,
          value: folder
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
          label: "Palette",
          value: palette,
          options: [{
            label: "Iron",
            value: "iron"
          }, {
            label: "Jet",
            value: "jet"
          }, {
            label: "Grayscale",
            value: "grayscale"
          }],
          onChange: value => setAttributes({
            palette: value
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "Appearence",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_utils_appearence_AppearencePanel__WEBPACK_IMPORTED_MODULE_3__.AppearencePanel, {
          ...attributes,
          setter: setAttributes
        })
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)(),
      children: validFolder === undefined ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
        label: "A remote folder",
        instructions: "Fill in the URL, folder name and an optional subfolder in the sidebar.",
        icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          version: "1.1",
          viewBox: "0 0 512 512",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("g", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("g", {
              id: "Vrstva_1",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                d: "M327.6,240c-5.4-4.7-13.6-7.1-24.6-7.1h-51.9v60.8h52c10.9,0,19-2.4,24.6-7.2s8.2-12.7,8.2-23.6-2.8-18.1-8.3-22.8Z"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("path", {
                d: "M252.4,0L18.9,90.7h-.6v421.3h466.9V90.7h.6L252.4,0ZM161.8,411.9h-47.5v-216h47.5v216ZM342.1,411.9c-2.8-7.9-4.5-16.2-4.9-24.6-.6-9.5-1.5-18.4-2.7-27.2-1.6-11.3-5-19.5-10.3-24.8s-13.8-7.9-25.7-7.9h-47.5v84.4h-47.5v-215.9h116.4c8.9-.1,17.8,1.5,26.2,4.7,7.4,2.9,14.2,7.3,19.9,12.8,5.5,5.4,9.8,11.8,12.7,18.9,3,7.3,4.5,15.2,4.4,23.1.3,11.5-2.4,22.9-7.9,33-6,9.9-15.3,17.3-26.2,21.2v.6c5.3,1.3,10.3,3.9,14.5,7.4,3.8,3.3,7,7.3,9.4,11.8,2.5,4.7,4.3,9.7,5.3,15,1.1,5.4,1.9,10.9,2.3,16.3.2,3.4.4,7.5.6,12.1s.6,9.2,1.1,14.2c.5,4.6,1.3,9.2,2.4,13.7.9,4,2.6,7.7,5,11.1h-47.6Z"
              })]
            })
          })
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("remote-folder-app", {
        url: url,
        subfolder: subfolder,
        folder: validFolder,
        palette: palette,
        style: {
          pointerEvents: "none"
        },
        skin: attributes.skin,
        lines: attributes.lines,
        corners: attributes.corners
      })
    })]
  });
}

/***/ },

/***/ "./src/remoteGroup/index.js"
/*!**********************************!*\
  !*** ./src/remoteGroup/index.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/remoteGroup/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/remoteGroup/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/remoteGroup/block.json");
/* harmony import */ var _utils_libScriptElement__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/libScriptElement */ "./src/utils/libScriptElement.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * Internal dependencies
 */




/**
 * Load the external JS library for webcomponents
 * 
 * Uses ESM variant of the file downloaded from JSfiddle.
 * 
 * @todo Export ESM build right from @labir/embed
 */

const loadExternalLibrary = () => {
  const el = (0,_utils_libScriptElement__WEBPACK_IMPORTED_MODULE_4__.createLibScriptElement)(document);
  document.head.appendChild(el);
};
loadExternalLibrary();

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_3__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"],
  icon: {
    src: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("svg", {
      id: "Vrstva_1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("defs", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("linearGradient", {
          id: "Nepojmenovan\xFD_p\u0159echod_12",
          "data-name": "Nepojmenovan\xFD p\u0159echod 12",
          x1: "284.42",
          y1: "36.32",
          x2: "4.77",
          y2: "252.5",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("stop", {
            offset: "0",
            "stop-color": "#eae200"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("stop", {
            offset: ".34",
            "stop-color": "#d42900"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("stop", {
            offset: "1",
            "stop-color": "#0007bf"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "1",
        width: "511",
        height: "406.08",
        rx: "19.65",
        ry: "19.65"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "25",
        y: "80.12",
        width: "219.72",
        height: "143.62",
        rx: "7.86",
        ry: "7.86",
        fill: "url(#Nepojmenovan\xFD_p\u0159echod_12)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "262.54",
        y: "80.12",
        width: "219.72",
        height: "143.62",
        rx: "7.86",
        ry: "7.86",
        fill: "url(#Nepojmenovan\xFD_p\u0159echod_12)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "25",
        y: "238",
        width: "219.72",
        height: "143.62",
        rx: "7.86",
        ry: "7.86",
        fill: "url(#Nepojmenovan\xFD_p\u0159echod_12)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "262.54",
        y: "238",
        width: "219.72",
        height: "143.62",
        rx: "7.86",
        ry: "7.86",
        fill: "url(#Nepojmenovan\xFD_p\u0159echod_12)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("line", {
        x1: "31.36",
        y1: "30",
        x2: "100.3",
        y2: "30",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("line", {
        x1: "31.36",
        y1: "59.57",
        x2: "481.52",
        y2: "59.57",
        fill: "none",
        stroke: "url(#Nepojmenovan\xFD_p\u0159echod_12)",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("circle", {
          cx: "245.28",
          cy: "223.74",
          r: "119.5",
          fill: "#009fe3"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M271.58,242.4l31.57-31.57c12.05-12.05,12.96-31.55,1.59-44.23-12.31-13.73-33.51-14.16-46.38-1.29l-26.89,26.89c6.38-.73,12.86.06,18.97,2.36l18.34-18.34c6.08-6.08,16.61-6.73,23.13-1.13,7.5,6.46,7.82,17.84.95,24.71l-32.06,32.06c-5.1,5.1-12.89,6.67-19.38,3.53-4.46-2.15-7.55-5.95-8.87-10.33,0,0,0,0,0,0l-11.37,11.37c1.99,3.37,4.59,6.35,7.7,8.81,12.77,10.11,31.2,8.66,42.72-2.85Z",
            fill: "#fff"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M234.78,216c.05,0,.12,0,.19,0,.22-.01.46-.03.7-.03.26,0,.52,0,.78,0,.2,0,.39.02.58.03.35.02.71.05,1.06.09.22.03.44.06.66.09.31.05.6.11.9.17.27.06.54.12.8.19.21.06.41.11.62.18.35.11.69.23,1.03.36.15.06.28.11.41.16.39.16.78.34,1.17.54.09.05.21.11.32.16.43.23.82.46,1.19.7l.26.17c.42.28.8.57,1.17.86l.14.12c.45.37.83.72,1.19,1.08,1.98,1.98,3.41,4.4,4.2,7.03l11.37-11.37c-1.36-2.3-3.01-4.42-4.91-6.32h0c-.35-.35-.71-.69-1.08-1.02l-.39-.34c-.23-.2-.47-.41-.72-.61-.16-.13-.32-.26-.48-.39-.21-.17-.43-.34-.65-.5l-.15-.12c-.13-.1-.25-.19-.38-.28-.1-.07-.21-.14-.31-.22l-.19-.13c-.44-.3-.87-.6-1.32-.87l-.34-.21c-.28-.17-.56-.33-.84-.49l-.24-.13c-2.7-1.49-5.55-2.57-8.52-3.24l-.16-.04c-1.43-.31-2.92-.53-4.4-.64l-.32-.02c-.32-.02-.63-.04-.95-.05h-.36c-.59-.02-1.19-.02-1.79,0h-.32c-.19.02-.4.03-.6.04h-.16c-.2.02-.41.04-.61.05-.23.02-.47.04-.7.07-.24.03-.48.06-.73.09l-.18.02c-.14.02-.29.04-.43.06-.43.06-.85.13-1.27.21l-.45.09c-.31.06-.62.13-.92.2-.16.04-.31.08-.46.11-.35.09-.65.17-.95.25l-.45.13c-.44.13-.87.27-1.3.42-4.55,1.59-8.6,4.13-12.04,7.57l-30.15,30.15c-12.45,12.45-12.45,32.71,0,45.16,12.45,12.45,32.71,12.45,45.16,0l24.75-24.75c-6.38.73-12.86-.06-18.97-2.36l-16.45,16.45c-6.57,6.57-17.26,6.57-23.83,0-6.57-6.57-6.57-17.26,0-23.83l30.15-30.15c2.84-2.84,6.63-4.57,10.66-4.87Z",
            fill: "#fff"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
          d: "M481.05,512v-171.78s.02-.09.03-.13c1.15-6.15-2.24-12.25-8.07-14.51l-96.57-37.53c-1.51-.59-3.11-.88-4.71-.88h0c-1.6,0-3.19.29-4.71.88l-95.38,37.05c-5.62,1.44-9.77,6.53-9.77,12.6v174.31h219.17Z",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("polyline", {
          points: "371.74 300.17 468.3 337.69 468.05 337.69 468.05 512 274.88 512 274.88 337.69 275.13 337.69 371.74 300.17"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
          d: "M351.14,468.3h23.02v-40.9h23.02c5.77,0,9.89,1.26,12.45,3.83,2.57,2.57,4.22,6.54,4.99,12.02.58,4.26,1.02,8.58,1.31,13.18.19,4.05,1.01,8.06,2.36,11.87h-.03l.05.05s-.01-.03-.02-.05h23.03c-1.16-1.65-1.99-3.44-2.42-5.38-.53-2.18-.92-4.41-1.16-6.64-.24-2.42-.44-4.65-.53-6.88s-.19-4.22-.29-5.86c-.19-2.62-.58-5.28-1.11-7.9-.48-2.57-1.36-4.99-2.57-7.27-1.16-2.18-2.71-4.12-4.55-5.72-2.04-1.7-4.46-2.96-7.03-3.59v-.29c5.28-1.89,9.79-5.48,12.7-10.27,2.67-4.89,3.97-10.42,3.83-15.99.05-3.83-.68-7.66-2.13-11.19-1.41-3.44-3.49-6.54-6.15-9.16-2.76-2.67-6.06-4.8-9.64-6.2-3.95-1.51-8.13-2.28-12.31-2.28-.13,0-.25,0-.38,0h-56.4v104.62",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("polyline", {
          points: "307.91 468.35 330.93 468.35 330.93 363.69 307.91 363.69 307.91 468.35",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M411.27,385.05c-2.62-2.28-6.59-3.44-11.92-3.44h-25.15v29.46h25.2c5.28,0,9.21-1.16,11.92-3.49,2.71-2.33,3.97-6.15,3.97-11.44s-1.36-8.77-4.02-11.05v-.05Z"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M399.35,381.61c5.33,0,9.3,1.16,11.92,3.44v.05c2.67,2.28,4.02,5.77,4.02,11.05s-1.26,9.11-3.97,11.44c-2.71,2.33-6.64,3.49-11.92,3.49h-25.2v-29.46h25.15"
          })]
        })]
      })]
    })
  }
});

/***/ },

/***/ "./src/utils/appearence/AppearencePanel.js"
/*!*************************************************!*\
  !*** ./src/utils/appearence/AppearencePanel.js ***!
  \*************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AppearencePanel: () => (/* binding */ AppearencePanel)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const AppearencePanel = ({
  skin,
  lines,
  corners,
  setter
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: "Skin",
      value: skin,
      options: [{
        label: "Default",
        value: "default"
      }, {
        label: "Dark",
        value: "dark"
      }, {
        label: "Dark HC",
        value: "darkhc"
      }, {
        label: "Solarized",
        value: "solarized"
      }, {
        label: "System",
        value: "system"
      }],
      onChange: value => setter({
        skin: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: "Corners",
      value: corners,
      options: [{
        label: "Default",
        value: "default"
      }, {
        label: "Narrow",
        value: "narrow"
      }],
      onChange: value => setter({
        corners: value
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: "Lines",
      value: lines,
      options: [{
        label: "Default",
        value: "default"
      }, {
        label: "Big",
        value: "big"
      }],
      onChange: value => setter({
        lines: value
      })
    })]
  });
};

/***/ },

/***/ "./src/utils/libScriptElement.js"
/*!***************************************!*\
  !*** ./src/utils/libScriptElement.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createLibScriptElement: () => (/* binding */ createLibScriptElement),
/* harmony export */   documentHasLibScriptElement: () => (/* binding */ documentHasLibScriptElement)
/* harmony export */ });
const scriptId = "labir_embed_lib_dynamical";
const homeUrl = window.location.origin;

/**
 * Create a script element with the ESM library 
 * 
 * It shall be used in block editor.
 * 
 * @param {Document} document 
 */
const createLibScriptElement = document => {
  const element = document.createElement("script");
  element.type = "module";
  element.id = scriptId;
  element.innerHTML = `import '${homeUrl}/wp-content/plugins/thermal-display/assets/labirthermal.iife.js'`;
  return element;
};

/**
 * Check if the given document includes the necessary script.
 * 
 * @param {Document} document 
 * @returns {Boolean}
 */
const documentHasLibScriptElement = document => {
  const element = document.getElementById(scriptId);
  return element ? true : false;
};

/***/ },

/***/ "./src/utils/useRegisterIframeScript.js"
/*!**********************************************!*\
  !*** ./src/utils/useRegisterIframeScript.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useRegisterIframeScript: () => (/* binding */ useRegisterIframeScript)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _libScriptElement__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libScriptElement */ "./src/utils/libScriptElement.js");



/**
 * Make sure the external library is loaded whenever any instance of this component is being edited
 */
const useRegisterIframeScript = () => {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const allIframes = document.querySelectorAll("iframe");
    for (let i = 0; i < allIframes.length; i++) {
      const iframe = allIframes[i];
      if (iframe.name === "editor-canvas") {
        const doc = iframe.contentWindow.document;
        if (!(0,_libScriptElement__WEBPACK_IMPORTED_MODULE_1__.documentHasLibScriptElement)(doc)) {
          const script = (0,_libScriptElement__WEBPACK_IMPORTED_MODULE_1__.createLibScriptElement)(doc);
          doc.head.appendChild(script);
        }
      }
    }
  }, []);
};

/***/ },

/***/ "./src/remoteGroup/editor.scss"
/*!*************************************!*\
  !*** ./src/remoteGroup/editor.scss ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/remoteGroup/style.scss"
/*!************************************!*\
  !*** ./src/remoteGroup/style.scss ***!
  \************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/block-editor"
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
(module) {

module.exports = window["wp"]["blockEditor"];

/***/ },

/***/ "@wordpress/blocks"
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
(module) {

module.exports = window["wp"]["blocks"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "./src/remoteGroup/block.json"
/*!************************************!*\
  !*** ./src/remoteGroup/block.json ***!
  \************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"thermal-display/remote-group","version":"0.1.0","title":"Remote folder","category":"thermal","icon":"file:./assets/icon.svg","description":"A group display of one remote folder.","example":{},"supports":{"interactivity":false,"html":false,"anchor":true,"lock":true,"align":["wide","full"],"spacing":{"padding":true,"margin":true}},"textdomain":"thermal-display","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","keywords":["webcomponent","IR Camera","embed","LRC"],"attributes":{"layout":{"type":"object","default":{"type":"constrained"}},"url":{"type":"string"},"subfolder":{"type":"string"},"folder":{"type":"string"},"palette":{"type":"string","default":"iron"},"skin":{"type":"string","default":"default"},"lines":{"type":"string","default":"default"},"corners":{"type":"string","default":"default"}}}');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	const __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		const cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		const module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			const e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		const deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn) => {
/******/ 			if(chunkIds) {
/******/ 				deferred.push([chunkIds, fn]);
/******/ 				return;
/******/ 			}
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				let [chunkIds, fn] = deferred[i];
/******/ 				let fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if (__webpack_require__.O.j(chunkIds[j])) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					const r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		const getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	// define getter/value functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	__webpack_require__.o = (obj, prop) => (Object.hasOwn(obj, prop));
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = (exports) => {
/******/ 		Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		const installedChunks = {
/******/ 			"remoteGroup/index": 0,
/******/ 			"remoteGroup/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		const webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			let [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		const chunkLoadingGlobal = globalThis["webpackChunkthermal_display"] ||= [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["remoteGroup/style-index"], () => (__webpack_require__("./src/remoteGroup/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map