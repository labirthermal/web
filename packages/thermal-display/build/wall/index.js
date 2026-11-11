/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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

/***/ "./src/wall/edit.js"
/*!**************************!*\
  !*** ./src/wall/edit.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/icon/index.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/lock.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/unlock.mjs");
/* harmony import */ var _utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/useRegisterIframeScript */ "./src/utils/useRegisterIframeScript.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/wall/editor.scss");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__);







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
  (0,_utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_5__.useRegisterIframeScript)();
  const {
    serverUrl,
    serverApiRoot,
    enabled,
    promptTitle,
    promptText
  } = attributes;
  const icon = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    return enabled ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"]
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
      icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"]
    });
  }, [enabled]);
  const label = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    return enabled ? 'Vyžadováno přihlášení' : 'Veřejně viditelné';
  }, [enabled]);
  const enabledClass = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_7__.useMemo)(() => {
    return enabled ? 'enabled' : 'disabled';
  }, [enabled]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InspectorControls, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "Nastaven\xED ochrany",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: "Povolit ochranu obsahu",
          checked: enabled,
          onChange: value => setAttributes({
            enabled: value
          })
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "Upozorn\u011Bn\xED",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "Titulek upozorn\u011Bn\xED",
          help: "N\xE1zev upozorn\u011Bn\xED, kter\xE9 se zobraz\xED nep\u0159ihl\xE1\u0161en\xFDm u\u017Eivatel\u016Fm.",
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: value => setAttributes({
            promptTitle: value
          }),
          value: promptTitle,
          required: true,
          type: "string"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "Text upozorn\u011Bn\xED",
          help: "Voliteln\xFD text, kter\xFD se zobraz\xED pod titulkem upozorn\u011Bn\xED.",
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: value => setAttributes({
            promptText: value
          }),
          value: promptText,
          required: true,
          type: "string"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
        title: "P\u0159ipojen\xED k serveru",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "URL serveru",
          help: "Zadejte URL adresu serveru, kter\xFD ov\u011B\u0159uje u\u017Eivatele.",
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: value => setAttributes({
            serverUrl: value
          }),
          value: serverUrl,
          required: true,
          type: "string"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: "API Root",
          help: "Zadejte ko\u0159enovou URL adresu API serveru.",
          __next40pxDefaultSize: true,
          __nextHasNoMarginBottom: true,
          onChange: value => setAttributes({
            serverApiRoot: value
          }),
          value: serverApiRoot,
          required: true,
          type: "string"
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.useBlockProps)(),
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
        className: `labir-wall labir-wall__${enabledClass}`,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("div", {
          className: "labir-wall-meta",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            children: icon
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)("span", {
            children: label
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsxs)("span", {
            children: ["\"", promptTitle, "\""]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_8__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.InnerBlocks, {})]
      })
    })]
  });
}

/***/ },

/***/ "./src/wall/index.js"
/*!***************************!*\
  !*** ./src/wall/index.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/wall/style.scss");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./editor.scss */ "./src/wall/editor.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./edit */ "./src/wall/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./block.json */ "./src/wall/block.json");
/* harmony import */ var _utils_libScriptElement__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/libScriptElement */ "./src/utils/libScriptElement.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);
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
  const el = (0,_utils_libScriptElement__WEBPACK_IMPORTED_MODULE_5__.createLibScriptElement)(document);
  document.head.appendChild(el);
};
loadExternalLibrary();

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(_block_json__WEBPACK_IMPORTED_MODULE_4__.name, {
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_3__["default"],
  icon: {
    src: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("svg", {
      id: "Vrstva_1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("rect", {
        x: "1",
        width: "511",
        height: "406.08",
        rx: "19.65",
        ry: "19.65"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("line", {
        x1: "31.36",
        y1: "30",
        x2: "100.3",
        y2: "30",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("line", {
          x1: "279.91",
          y1: "92.51",
          x2: "410.74",
          y2: "92.51",
          fill: "none",
          stroke: "#818080",
          "stroke-linecap": "round",
          "stroke-miterlimit": "10",
          "stroke-width": "11.89"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("line", {
          x1: "279.91",
          y1: "120.08",
          x2: "396.65",
          y2: "120.08",
          fill: "none",
          stroke: "#818080",
          "stroke-linecap": "round",
          "stroke-miterlimit": "10",
          "stroke-width": "11.89"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("line", {
          x1: "279.91",
          y1: "147.66",
          x2: "470.3",
          y2: "147.66",
          fill: "none",
          stroke: "#818080",
          "stroke-linecap": "round",
          "stroke-miterlimit": "10",
          "stroke-width": "11.89"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("line", {
          x1: "279.91",
          y1: "175.23",
          x2: "355.95",
          y2: "175.23",
          fill: "none",
          stroke: "#818080",
          "stroke-linecap": "round",
          "stroke-miterlimit": "10",
          "stroke-width": "11.89"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
          d: "M483.05,512v-171.78s.02-.09.03-.13c1.15-6.15-2.24-12.25-8.07-14.51l-96.57-37.53c-1.51-.59-3.11-.88-4.71-.88h0c-1.6,0-3.19.29-4.71.88l-95.38,37.05c-5.62,1.44-9.77,6.53-9.77,12.6v174.31h219.17Z",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("polyline", {
          points: "373.74 300.17 470.3 337.69 470.05 337.69 470.05 512 276.88 512 276.88 337.69 277.13 337.69 373.74 300.17"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
          d: "M353.14,468.3h23.02v-40.9h23.02c5.77,0,9.89,1.26,12.45,3.83,2.57,2.57,4.22,6.54,4.99,12.02.58,4.26,1.02,8.58,1.31,13.18.19,4.05,1.01,8.06,2.36,11.87h-.03l.05.05s-.01-.03-.02-.05h23.03c-1.16-1.65-1.99-3.44-2.42-5.38-.53-2.18-.92-4.41-1.16-6.64-.24-2.42-.44-4.65-.53-6.88s-.19-4.22-.29-5.86c-.19-2.62-.58-5.28-1.11-7.9-.48-2.57-1.36-4.99-2.57-7.27-1.16-2.18-2.71-4.12-4.55-5.72-2.04-1.7-4.46-2.96-7.03-3.59v-.29c5.28-1.89,9.79-5.48,12.7-10.27,2.67-4.89,3.97-10.42,3.83-15.99.05-3.83-.68-7.66-2.13-11.19-1.41-3.44-3.49-6.54-6.15-9.16-2.76-2.67-6.06-4.8-9.64-6.2-3.95-1.51-8.13-2.28-12.31-2.28-.13,0-.25,0-.38,0h-56.4v104.62",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("polyline", {
          points: "309.91 468.35 332.93 468.35 332.93 363.69 309.91 363.69 309.91 468.35",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("g", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
            d: "M413.27,385.05c-2.62-2.28-6.59-3.44-11.92-3.44h-25.15v29.46h25.2c5.28,0,9.21-1.16,11.92-3.49,2.71-2.33,3.97-6.15,3.97-11.44s-1.36-8.77-4.02-11.05v-.05Z"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
            d: "M401.35,381.61c5.33,0,9.3,1.16,11.92,3.44v.05c2.67,2.28,4.02,5.77,4.02,11.05s-1.26,9.11-3.97,11.44c-2.71,2.33-6.64,3.49-11.92,3.49h-25.2v-29.46h25.15"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
          d: "M204.29,237.65V95.71c0-7.44-6.03-13.47-13.47-13.47h-74.87c-7.44,0-13.47,6.03-13.47,13.47v141.94c-16.05,14.58-25.12,35.38-24.59,57.65.98,41.15,35.35,74.21,76.51,73.66,41.18-.54,74.51-34.21,74.51-75.51,0-21.56-9.01-41.62-24.62-55.8Z",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("path", {
          d: "M181.29,248.96v-97.14h-55.81v97.14c-14.78,9.29-24.62,25.74-24.62,44.49,0,29.34,24.99,53.47,54.32,52.48,28.17-.95,50.72-24.09,50.72-52.49,0-18.75-9.83-35.19-24.62-44.49Z"
        })]
      })]
    })
  },
  save: props => {
    const {
      attributes
    } = props;
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)("div", {
      "data-enabled": attributes.enabled ? '1' : '0',
      "data-server-url": attributes.serverUrl || '',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_6__.InnerBlocks.Content, {})
    });
  }
});

/***/ },

/***/ "./src/wall/editor.scss"
/*!******************************!*\
  !*** ./src/wall/editor.scss ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/wall/style.scss"
/*!*****************************!*\
  !*** ./src/wall/style.scss ***!
  \*****************************/
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

/***/ "@wordpress/primitives"
/*!************************************!*\
  !*** external ["wp","primitives"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["primitives"];

/***/ },

/***/ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/icon/index.mjs"
/*!*******************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/icon/index.mjs ***!
  \*******************************************************************************************************************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ icon_default)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
// packages/icons/src/icon/index.ts

var icon_default = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(
  ({ icon, size = 24, style, ...props }, ref) => {
    const intrinsicStyle = icon.props.style;
    const mergedStyle = intrinsicStyle || style ? { ...intrinsicStyle, ...style } : void 0;
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.cloneElement)(icon, {
      width: size,
      height: size,
      ...props,
      // Merge styles so the icon's intrinsic style (e.g. `fill: none` on
      // stroke-based icons) is preserved unless the consumer overrides
      // the same property explicitly.
      ...mergedStyle ? { style: mergedStyle } : {},
      ref
    });
  }
);

//# sourceMappingURL=index.mjs.map


/***/ },

/***/ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/lock.mjs"
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/lock.mjs ***!
  \*********************************************************************************************************************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ lock_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/lock.tsx


var lock_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: { fill: "none" }, stroke: "currentColor", strokeWidth: "1.5", children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M9.25 11.1H7.75C7.47386 11.1 7.25 11.3239 7.25 11.6V17.6C7.25 17.8761 7.47386 18.1 7.75 18.1H16.25C16.5261 18.1 16.75 17.8761 16.75 17.6V11.6C16.75 11.3239 16.5261 11.1 16.25 11.1H14.75M9.25 11.1V7.85C9.25 6.33122 10.4812 5.1 12 5.1C13.5188 5.1 14.75 6.33122 14.75 7.85V11.1M9.25 11.1H14.75", vectorEffect: "non-scaling-stroke" }),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M16.25 18.1H7.75C7.47386 18.1 7.25 17.8761 7.25 17.6V11.6C7.25 11.3239 7.47386 11.1 7.75 11.1H16.25C16.5261 11.1 16.75 11.3239 16.75 11.6V17.6C16.75 17.8761 16.5261 18.1 16.25 18.1Z", fill: "currentColor", stroke: "none" })
] });

//# sourceMappingURL=lock.mjs.map


/***/ },

/***/ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/unlock.mjs"
/*!***********************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/unlock.mjs ***!
  \***********************************************************************************************************************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ unlock_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/unlock.tsx


var unlock_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: { fill: "none" }, stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M14.75 10.75H16.25C16.5261 10.75 16.75 10.9739 16.75 11.25V17.25C16.75 17.5261 16.5261 17.75 16.25 17.75H7.75C7.47386 17.75 7.25 17.5261 7.25 17.25V11.25C7.25 10.9739 7.47386 10.75 7.75 10.75H14.75ZM14.75 10.75V7.5C14.75 5.98122 13.5188 4.75 12 4.75C10.4812 4.75 9.25 5.98122 9.25 7.5V7.7368", vectorEffect: "non-scaling-stroke" }) });

//# sourceMappingURL=unlock.mjs.map


/***/ },

/***/ "./src/wall/block.json"
/*!*****************************!*\
  !*** ./src/wall/block.json ***!
  \*****************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"thermal-display/wall","version":"0.1.0","title":"LabIR Server Wall","category":"thermal","description":"Content protected that requires LabIR Server authentication to display","example":{},"supports":{"anchor":true,"lock":true,"align":["wide","full"],"spacing":{"padding":true,"margin":true}},"textdomain":"thermal-display","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","keywords":["webcomponent","IR Camera","embed","LRC"],"attributes":{"layout":{"type":"object","default":{"type":"constrained"}},"enabled":{"type":"boolean","default":false},"serverUrl":{"type":"string"},"serverApiRoot":{"type":"string","default":"/api"},"promptTitle":{"type":"string","default":"Pro přihlášené"},"promptText":{"type":"string","default":"Tento obsah je viditelný pouze pro přihlášené uživatele."}}}');

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
/******/ 			"wall/index": 0,
/******/ 			"wall/style-index": 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["wall/style-index"], () => (__webpack_require__("./src/wall/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map