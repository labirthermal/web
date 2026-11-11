/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app/components/advancedPalette.js"
/*!***********************************************!*\
  !*** ./src/app/components/advancedPalette.js ***!
  \***********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ AdvancedPalette)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



function AdvancedPalette({
  ID,
  advancedPalettes,
  setAttributes
}) {
  const managerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (!node) return;
    node.managerController.onAdvancedPalettesChange.add(ID + "_advancedPalettes", value => {
      setAttributes({
        advancedpalettes: value
      });
    });
    console.log(node);
  }, [setAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("manager-provider", {
    "manager-slug": ID,
    "advanced-palettes": advancedPalettes,
    ref: managerRef,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.CheckboxControl, {
      __nextHasNoMarginBottom: true,
      checked: advancedPalettes,
      label: "Enable advanced palettes",
      onChange: value => {
        setAttributes({
          advancedpalettes: value
        });
      }
    })
  });
}

/***/ },

/***/ "./src/app/components/empty.js"
/*!*************************************!*\
  !*** ./src/app/components/empty.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Empty)
/* harmony export */ });
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



/**
 * Placeholder for the thermal file when no file is present.
 */

function Empty({
  startUploadingThermalFile,
  successfullyUploadedThermalFile
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Placeholder, {
    label: "IR image",
    instructions: "Upload or select a thermal file to see an advanced analyser application here.",
    icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("svg", {
      id: "Vrstva_1",
      xmlns: "http://www.w3.org/2000/svg",
      viewBox: "0 0 512 512",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("defs", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("linearGradient", {
          id: "Nepojmenovan\xFD_p\u0159echod_12",
          "data-name": "Nepojmenovan\xFD p\u0159echod 12",
          x1: "452.4",
          y1: "7.95",
          x2: "-8.33",
          y2: "364.12",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("stop", {
            offset: "0",
            "stop-color": "#eae200"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("stop", {
            offset: ".34",
            "stop-color": "#d42900"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("stop", {
            offset: "1",
            "stop-color": "#0007bf"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("linearGradient", {
          id: "Nepojmenovan\xFD_p\u0159echod_13",
          "data-name": "Nepojmenovan\xFD p\u0159echod 13",
          x1: "25.41",
          y1: "59.57",
          x2: "388.25",
          y2: "59.57",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("stop", {
            offset: "0",
            "stop-color": "#0007bf"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("stop", {
            offset: ".66",
            "stop-color": "#d42900"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("stop", {
            offset: "1",
            "stop-color": "#eae200"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
        x: "1",
        width: "511",
        height: "345",
        rx: "18.11",
        ry: "18.11"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("rect", {
        x: "25",
        y: "80.12",
        width: "362",
        height: "236.61",
        rx: "12.96",
        ry: "12.96",
        fill: "url(#Nepojmenovan\xFD_p\u0159echod_12)"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("line", {
        x1: "31.36",
        y1: "30",
        x2: "100.3",
        y2: "30",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("line", {
        x1: "405.91",
        y1: "88.55",
        x2: "474.85",
        y2: "88.55",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("line", {
        x1: "405.91",
        y1: "106.93",
        x2: "451.36",
        y2: "106.93",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
          d: "M483.03,512v-171.78s.02-.09.03-.13c1.15-6.15-2.24-12.25-8.07-14.51l-96.57-37.53c-1.51-.59-3.11-.88-4.71-.88h0c-1.6,0-3.19.29-4.71.88l-95.38,37.05c-5.62,1.44-9.77,6.53-9.77,12.6v174.31h219.17Z",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("polyline", {
          points: "373.72 300.17 470.28 337.69 470.03 337.69 470.03 512 276.86 512 276.86 337.69 277.11 337.69 373.72 300.17"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
          d: "M353.12,468.3h23.02v-40.9h23.02c5.77,0,9.89,1.26,12.45,3.83,2.57,2.57,4.22,6.54,4.99,12.02.58,4.26,1.02,8.58,1.31,13.18.19,4.05,1.01,8.06,2.36,11.87h-.03l.05.05s-.01-.03-.02-.05h23.03c-1.16-1.65-1.99-3.44-2.42-5.38-.53-2.18-.92-4.41-1.16-6.64-.24-2.42-.44-4.65-.53-6.88s-.19-4.22-.29-5.86c-.19-2.62-.58-5.28-1.11-7.9-.48-2.57-1.36-4.99-2.57-7.27-1.16-2.18-2.71-4.12-4.55-5.72-2.04-1.7-4.46-2.96-7.03-3.59v-.29c5.28-1.89,9.79-5.48,12.7-10.27,2.67-4.89,3.97-10.42,3.83-15.99.05-3.83-.68-7.66-2.13-11.19-1.41-3.44-3.49-6.54-6.15-9.16-2.76-2.67-6.06-4.8-9.64-6.2-3.95-1.51-8.13-2.28-12.31-2.28-.13,0-.25,0-.38,0h-56.4v104.62",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("polyline", {
          points: "309.89 468.35 332.91 468.35 332.91 363.69 309.89 363.69 309.89 468.35",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("g", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
            d: "M413.25,385.05c-2.62-2.28-6.59-3.44-11.92-3.44h-25.15v29.46h25.2c5.28,0,9.21-1.16,11.92-3.49,2.71-2.33,3.97-6.15,3.97-11.44s-1.36-8.77-4.02-11.05v-.05Z"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
            d: "M401.33,381.61c5.33,0,9.3,1.16,11.92,3.44v.05c2.67,2.28,4.02,5.77,4.02,11.05s-1.26,9.11-3.97,11.44c-2.71,2.33-6.64,3.49-11.92,3.49h-25.2v-29.46h25.15"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("line", {
        x1: "31.36",
        y1: "59.57",
        x2: "382.3",
        y2: "59.57",
        fill: "none",
        stroke: "url(#Nepojmenovan\xFD_p\u0159echod_13)",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      })]
    }),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_0__.MediaUpload, {
      allowedTypes: ['application/octet-stream'],
      onSelect: result => {
        successfullyUploadedThermalFile(result.url);
      },
      render: ({
        open
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        onClick: () => {
          startUploadingThermalFile();
          open();
        },
        variant: "primary",
        children: thermal ? "Change file" : "Upload or select a radiometric file (LRC / FLIR JPEG)"
      })
    })
  });
}

/***/ },

/***/ "./src/app/components/palette.js"
/*!***************************************!*\
  !*** ./src/app/components/palette.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Palettes)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Control the palette by a palette dropdown.
 */

function Palettes({
  ID,
  palette,
  advancedPalettes,
  setAttributes
}) {
  const managerRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (!node) return;
    node.managerObject.palette.addListener(ID + "_palette", value => setAttributes({
      palette: value
    }));
  }, [setAttributes, ID]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("manager-provider", {
    palette: palette,
    "manager-slug": ID,
    "advanced-palettes": advancedPalettes,
    ref: managerRef,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("manager-palette-dropdown", {})
  });
}

/***/ },

/***/ "./src/app/components/preview.js"
/*!***************************************!*\
  !*** ./src/app/components/preview.js ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Preview)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Preview of the webcomponent used when a file is provided.
 */

function Preview({
  attributes
}) {
  const {
    variant,
    palette,
    thermal,
    opacity,
    visible,
    label,
    description,
    author,
    license,
    from,
    to,
    analysis1,
    analysis2,
    analysis3,
    analysis4,
    analysis5,
    analysis6,
    analysis7,
    speed,
    showabout,
    showhistogram,
    showshare,
    showlayout,
    interactiveanalysis,
    notations,
    advancedpalettes
  } = attributes;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Tooltip, {
    text: "Click to edit",
    delay: 300,
    hideOnClick: false,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
        className: "thermal__content-editor__container",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("thermal-file-app", {
            thermal: thermal,
            visible: visible,
            palette: palette,
            author: author,
            license: license,
            label: label,
            description: description,
            from: from,
            to: to,
            opacity: opacity,
            analysis1: analysis1,
            analysis2: analysis2,
            analysis3: analysis3,
            analysis4: analysis4,
            analysis5: analysis5,
            analysis6: analysis6,
            analysis7: analysis7,
            speed: speed,
            "advanced-palettes": advancedpalettes
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
          className: "thermal__content-editor__wrapper",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("div", {
            children: "Edit parameters in the sidebar."
          })
        })]
      })
    })
  });
}

/***/ },

/***/ "./src/app/components/range.js"
/*!*************************************!*\
  !*** ./src/app/components/range.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Range)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


function Range({
  ID,
  setAttributes
}) {
  const registryRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (!node) return;
    node.registryController.registryObject.range.addListener(ID + "_range", value => {
      if (value) setAttributes({
        from: value.from,
        to: value.to
      });
    });
  });
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("manager-provider", {
    "manager-slug": ID,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("registry-provider", {
      "registry-slug": ID,
      ref: registryRef,
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("registry-range-slider", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("registry-ticks-bar", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("registry-range-form", {})]
    })
  });
}

/***/ },

/***/ "./src/app/components/thumbnail.js"
/*!*****************************************!*\
  !*** ./src/app/components/thumbnail.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Thumbnail)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/icon/index.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/image.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/info.mjs");
/* harmony import */ var _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/icons */ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/video.mjs");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);




function Row({
  icon,
  children
}) {
  if (children === undefined || children === null) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.Fragment, {});
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: ".2em",
      padding: ".2em"
    },
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_icons__WEBPACK_IMPORTED_MODULE_2__["default"], {
      icon: icon
    }), children]
  });
}

/**
 * Thumbnail component of the provided file along with its base information
 */
function Thumbnail({
  ID,
  thermal,
  palette,
  advancedPalettes,
  from,
  to
}) {
  const [fileName, setFileName] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [duration, setDuration] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [fileSize, setFileSize] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const [fileType, setFileType] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)();
  const filePreviewCallback = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (node) {
      node.fileController.onSuccess.set("thumbnail", instance => {
        // The file name
        setFileName(instance.fileName);

        // The file type
        setFileType(instance.reader.parser.name);

        // Set the duration only for sequences
        if (instance.duration) {
          const formattedDuration = new Date(instance.duration).toISOString().substr(11, 8);
          const numFrames = instance.timeline.steps.length + " frames";
          setDuration(formattedDuration + " (" + numFrames + ")");
        }

        // Format the file size to MB
        const fileSizeInMB = (instance.meta.current.bytesize / (1024 * 1024)).toFixed(2) + " MB";
        setFileSize(fileSizeInMB);
      });
    }
  }, [setFileName, setDuration, setFileSize, setFileType]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("manager-provider", {
    palette: palette,
    "advanced-palettes": advancedPalettes,
    "manager-slug": ID,
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("registry-provider", {
      from: from,
      to: to,
      "registry-slug": ID,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("group-provider", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("file-provider", {
          thermal: thermal,
          ref: filePreviewCallback,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("file-canvas", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.__experimentalItemGroup, {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Row, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_3__["default"],
              children: fileName
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Row, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
              children: fileType
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Row, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_5__["default"],
              children: duration
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(Row, {
              icon: _wordpress_icons__WEBPACK_IMPORTED_MODULE_4__["default"],
              children: fileSize
            })]
          })]
        })
      })
    })
  });
}

/***/ },

/***/ "./src/app/edit.js"
/*!*************************!*\
  !*** ./src/app/edit.js ***!
  \*************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _components_empty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/empty */ "./src/app/components/empty.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _utils_analysisEditor_useAnalysisEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/analysisEditor/useAnalysisEditor */ "./src/utils/analysisEditor/useAnalysisEditor.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/app/editor.scss");
/* harmony import */ var _utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/useRegisterIframeScript */ "./src/utils/useRegisterIframeScript.js");
/* harmony import */ var _utils_analysisEditor_AnalysisEditorModal__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/analysisEditor/AnalysisEditorModal */ "./src/utils/analysisEditor/AnalysisEditorModal.js");
/* harmony import */ var _utils_analysisEditor_AnalysisEditorTrigger__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/analysisEditor/AnalysisEditorTrigger */ "./src/utils/analysisEditor/AnalysisEditorTrigger.js");
/* harmony import */ var _utils_notationEditor_useNotations__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/notationEditor/useNotations */ "./src/utils/notationEditor/useNotations.js");
/* harmony import */ var _utils_editor_EditorModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../utils/editor/EditorModal */ "./src/utils/editor/EditorModal.js");
/* harmony import */ var _utils_appearence_AppearencePanel__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../utils/appearence/AppearencePanel */ "./src/utils/appearence/AppearencePanel.js");
/* harmony import */ var _components_preview__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./components/preview */ "./src/app/components/preview.js");
/* harmony import */ var _components_thumbnail__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./components/thumbnail */ "./src/app/components/thumbnail.js");
/* harmony import */ var _components_range__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./components/range */ "./src/app/components/range.js");
/* harmony import */ var _components_palette__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./components/palette */ "./src/app/components/palette.js");
/* harmony import */ var _components_advancedPalette__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./components/advancedPalette */ "./src/app/components/advancedPalette.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__);



















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
  const ID = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useMemo)(() => Math.random().toString(), []);

  /** Register the webcomponents if not already */
  (0,_utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_7__.useRegisterIframeScript)();
  const {
    variant,
    palette,
    thermal,
    opacity,
    visible,
    label,
    description,
    author,
    license,
    from,
    to,
    analysis1,
    analysis2,
    analysis3,
    analysis4,
    analysis5,
    analysis6,
    analysis7,
    speed,
    showabout,
    showhistogram,
    showshare,
    showlayout,
    interactiveanalysis,
    notations,
    advancedpalettes
  } = attributes;
  const [hasEditor, setHasEditor] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
  const [thermalBackup, setThermalBackup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(thermal);
  const [previewFile, setPreviewFile] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)();
  const [duration, setDuration] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useState)(0);
  const {
    open,
    setOpen
  } = (0,_utils_analysisEditor_useAnalysisEditor__WEBPACK_IMPORTED_MODULE_3__.useAnalysisEditor)();
  const startUploadingThermalFile = () => {
    const backup = thermal;
    setThermalBackup(backup);
    setAttributes({
      thermal: thermal
    });
  };
  const calcelUploadingThermalFile = () => {
    setAttributes({
      thermal: thermalBackup
    });
  };
  const successfullyUploadedThermalFile = file => {
    setAttributes({
      thermal: file
    });
    setThermalBackup(undefined);
  };
  const startUploadingVisibleFile = () => {};
  const successfullyUploadedVisibleFile = file => {
    setAttributes({
      visible: file
    });
  };
  const filePreviewCallback = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(node => {
    if (node) {
      node.fileController.onSuccess.set(ID + "___sth", instance => {
        setPreviewFile(instance);
        if (instance.moutedBaseLayers) {
          instance.unmountFromDom();
        }
        setDuration(instance.timeline.duration);
        instance.draw();
      });
      node.registryController.onInternalObject.set(ID + "___sth", registry => {
        // Handle the internal registry object

        registry.range.addListener(ID, value => {
          if (value instanceof Object) {
            setAttributes(value);
          } else {
            setAttributes({
              from: undefined,
              to: undefined
            });
          }
        });
      });
    }
  }, []);
  const displaySettingsCallback = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_2__.useCallback)(node => {
    if (node) {
      node.registryController.onInternalObject.set(ID + "___sth", registry => {
        // Handle the internal registry object
        registry.range.addListener(ID, value => {
          if (value instanceof Object) {
            setAttributes(value);
          } else {
            setAttributes({
              from: undefined,
              to: undefined
            });
          }
        });
      });
    }
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
    children: [hasEditor === true && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_utils_editor_EditorModal__WEBPACK_IMPORTED_MODULE_11__.EditorModal, {
      attributes: attributes,
      setAttributes: setAttributes,
      onClose: setHasEditor
    }), open === true && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_utils_analysisEditor_AnalysisEditorModal__WEBPACK_IMPORTED_MODULE_8__.AnalysisEditorModal, {
      thermal: thermal,
      open: open,
      setOpen: setOpen,
      attributes: attributes,
      setAttributes: setAttributes
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUploadCheck, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Thermal file",
          children: [thermal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_thumbnail__WEBPACK_IMPORTED_MODULE_14__["default"], {
            ID: ID,
            thermal: thermal,
            palette: palette,
            advancedPalettes: advancedpalettes,
            from: from,
            to: to
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            style: {
              marginBottom: "1rem",
              marginTop: thermal ? "1rem" : "0"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.ButtonGroup, {
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
                allowedTypes: ['application/octet-stream'],
                onSelect: result => {
                  successfullyUploadedThermalFile(result.url);
                },
                onClose: calcelUploadingThermalFile,
                render: ({
                  open
                }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
                  onClick: () => {
                    startUploadingThermalFile();
                    open();
                  },
                  variant: "primary",
                  size: "compact",
                  children: thermal ? "Change file" : "Upload or select a LRC file"
                })
              }), thermal && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
                variant: "secondary",
                size: "compact",
                onClick: () => setHasEditor(true),
                children: "Editor"
              })]
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Visible file",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
            children: [visible && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("img", {
              src: visible
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.MediaUpload, {
              allowedTypes: "image",
              onSelect: result => {
                successfullyUploadedVisibleFile(result.url);
              },
              render: ({
                open
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.Fragment, {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
                  onClick: () => {
                    startUploadingVisibleFile();
                    open();
                  },
                  variant: "primary",
                  children: visible ? "Change file" : "Upload or select a visible image"
                }), visible && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.Button, {
                  variant: "secondary",
                  onClick: () => {
                    setAttributes({
                      visible: undefined,
                      opacity: 1
                    });
                  },
                  children: "Remove the file"
                })]
              })
            })]
          }), visible && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
            style: {
              paddingTop: "1rem"
            },
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.RangeControl, {
              __nextHasNoMarginBottom: true,
              label: "IR image opacity",
              help: "If a visible file is provided, you can set the initial transparency of the thermal file.",
              value: opacity,
              onChange: value => setAttributes({
                opacity: value
              }),
              min: 0,
              max: 1,
              step: 0.01
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Information",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Author', 'thermal-display'),
            value: author || '',
            onChange: value => setAttributes({
              author: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('License', 'thermal-display'),
            value: license || '',
            onChange: value => setAttributes({
              license: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Label', 'thermal-display'),
            help: "Label appears on the black button on top & left of the app.",
            value: label || '',
            onChange: value => setAttributes({
              label: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.PanelBody, {
          title: "Display settings",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_range__WEBPACK_IMPORTED_MODULE_15__["default"], {
            ID: ID,
            setAttributes: setAttributes
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_palette__WEBPACK_IMPORTED_MODULE_16__["default"], {
            ID: ID,
            palette: palette,
            advancedPalettes: advancedpalettes,
            setAttributes: setAttributes
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_advancedPalette__WEBPACK_IMPORTED_MODULE_17__["default"], {
            ID: ID,
            advancedPalettes: advancedpalettes,
            setAttributes: setAttributes
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("manager-provider", {
            // manager-slug={ID}
            palette: palette,
            autoclear: "true",
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("registry-provider", {
              from: from,
              to: to,
              ref: displaySettingsCallback,
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("group-provider", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("file-provider", {
                  thermal: thermal,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
                    __nextHasNoMarginBottom: true,
                    checked: advancedpalettes,
                    label: "Enable advanced palettes",
                    onChange: value => {
                      setAttributes({
                        advancedpalettes: value
                      });
                    }
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
                    label: "Palette",
                    value: palette,
                    options: [{
                      label: "Iron",
                      value: "iron"
                    }, {
                      label: "Jet",
                      value: "jet"
                    }, {
                      label: "White hot",
                      value: "white_hot"
                    }, {
                      label: "Black hot",
                      value: "black_hot"
                    }, {
                      label: "Lava",
                      value: "lava"
                    }, {
                      label: "Rainbow",
                      value: "rainbow"
                    }, {
                      label: "Rainbow HC",
                      value: "rainbow_hc"
                    }],
                    onChange: value => setAttributes({
                      palette: value
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsxs)("div", {
                    style: {
                      paddingBottom: "1rem"
                    },
                    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("registry-range-slider", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("registry-ticks-bar", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("registry-range-display", {})]
                  }), previewFile && previewFile.timeline.isSequence && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.SelectControl, {
                    label: "Playback Speed",
                    value: speed,
                    options: [{
                      label: "0.5x",
                      value: 0.5
                    }, {
                      label: "1x",
                      value: 1
                    }, {
                      label: "2x",
                      value: 2
                    }, {
                      label: "3x",
                      value: 3
                    }, {
                      label: "5x",
                      value: 5
                    }, {
                      label: "10x",
                      value: 10
                    }],
                    onChange: value => setAttributes({
                      speed: value
                    })
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
                    __nextHasNoMarginBottom: true,
                    checked: showhistogram,
                    label: "Show histogram",
                    hint: "Enable histogram display in the thermal scale?",
                    onChange: value => {
                      setAttributes({
                        showhistogram: value
                      });
                    }
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
                    __nextHasNoMarginBottom: true,
                    checked: showshare,
                    label: "Show share button",
                    help: "Display a button with instruction on embedding this file to other websites?",
                    onChange: value => {
                      setAttributes({
                        showshare: value
                      });
                    }
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
                    __nextHasNoMarginBottom: true,
                    checked: showlayout,
                    label: "Show layout button",
                    help: "Enable the user to change the application layout?",
                    onChange: value => {
                      setAttributes({
                        showlayout: value
                      });
                    }
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__.CheckboxControl, {
                    __nextHasNoMarginBottom: true,
                    checked: interactiveanalysis,
                    label: "Interactive analysis",
                    help: "Should the visitor be able to edit analysis?",
                    onChange: value => {
                      setAttributes({
                        interactiveanalysis: value
                      });
                    }
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_utils_appearence_AppearencePanel__WEBPACK_IMPORTED_MODULE_12__.AppearencePanel, {
                    ...attributes,
                    setter: setAttributes
                  })]
                })
              })
            })
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__.useBlockProps)(),
      children: thermal ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_preview__WEBPACK_IMPORTED_MODULE_13__["default"], {
        attributes: attributes
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_18__.jsx)(_components_empty__WEBPACK_IMPORTED_MODULE_0__["default"], {
        startUploadingThermalFile: startUploadingThermalFile,
        successfullyUploadedThermalFile: successfullyUploadedThermalFile
      })
    })]
  });
}

/***/ },

/***/ "./src/app/index.js"
/*!**************************!*\
  !*** ./src/app/index.js ***!
  \**************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/app/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/app/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/app/block.json");
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
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("defs", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("linearGradient", {
          id: "Nepojmenovan\xFD_p\u0159echod_12",
          "data-name": "Nepojmenovan\xFD p\u0159echod 12",
          x1: "452.4",
          y1: "7.95",
          x2: "-8.33",
          y2: "364.12",
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
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("linearGradient", {
          id: "Nepojmenovan\xFD_p\u0159echod_13",
          "data-name": "Nepojmenovan\xFD p\u0159echod 13",
          x1: "25.41",
          y1: "59.57",
          x2: "388.25",
          y2: "59.57",
          gradientUnits: "userSpaceOnUse",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("stop", {
            offset: "0",
            "stop-color": "#0007bf"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("stop", {
            offset: ".66",
            "stop-color": "#d42900"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("stop", {
            offset: "1",
            "stop-color": "#eae200"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "1",
        width: "511",
        height: "345",
        rx: "18.11",
        ry: "18.11"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("rect", {
        x: "25",
        y: "80.12",
        width: "362",
        height: "236.61",
        rx: "12.96",
        ry: "12.96",
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
        x1: "405.91",
        y1: "88.55",
        x2: "474.85",
        y2: "88.55",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("line", {
        x1: "405.91",
        y1: "106.93",
        x2: "451.36",
        y2: "106.93",
        fill: "none",
        stroke: "#818080",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
          d: "M483.03,512v-171.78s.02-.09.03-.13c1.15-6.15-2.24-12.25-8.07-14.51l-96.57-37.53c-1.51-.59-3.11-.88-4.71-.88h0c-1.6,0-3.19.29-4.71.88l-95.38,37.05c-5.62,1.44-9.77,6.53-9.77,12.6v174.31h219.17Z",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("polyline", {
          points: "373.72 300.17 470.28 337.69 470.03 337.69 470.03 512 276.86 512 276.86 337.69 277.11 337.69 373.72 300.17"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
          d: "M353.12,468.3h23.02v-40.9h23.02c5.77,0,9.89,1.26,12.45,3.83,2.57,2.57,4.22,6.54,4.99,12.02.58,4.26,1.02,8.58,1.31,13.18.19,4.05,1.01,8.06,2.36,11.87h-.03l.05.05s-.01-.03-.02-.05h23.03c-1.16-1.65-1.99-3.44-2.42-5.38-.53-2.18-.92-4.41-1.16-6.64-.24-2.42-.44-4.65-.53-6.88s-.19-4.22-.29-5.86c-.19-2.62-.58-5.28-1.11-7.9-.48-2.57-1.36-4.99-2.57-7.27-1.16-2.18-2.71-4.12-4.55-5.72-2.04-1.7-4.46-2.96-7.03-3.59v-.29c5.28-1.89,9.79-5.48,12.7-10.27,2.67-4.89,3.97-10.42,3.83-15.99.05-3.83-.68-7.66-2.13-11.19-1.41-3.44-3.49-6.54-6.15-9.16-2.76-2.67-6.06-4.8-9.64-6.2-3.95-1.51-8.13-2.28-12.31-2.28-.13,0-.25,0-.38,0h-56.4v104.62",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("polyline", {
          points: "309.89 468.35 332.91 468.35 332.91 363.69 309.89 363.69 309.89 468.35",
          fill: "#fff"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("g", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M413.25,385.05c-2.62-2.28-6.59-3.44-11.92-3.44h-25.15v29.46h25.2c5.28,0,9.21-1.16,11.92-3.49,2.71-2.33,3.97-6.15,3.97-11.44s-1.36-8.77-4.02-11.05v-.05Z"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("path", {
            d: "M401.33,381.61c5.33,0,9.3,1.16,11.92,3.44v.05c2.67,2.28,4.02,5.77,4.02,11.05s-1.26,9.11-3.97,11.44c-2.71,2.33-6.64,3.49-11.92,3.49h-25.2v-29.46h25.15"
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("line", {
        x1: "31.36",
        y1: "59.57",
        x2: "382.3",
        y2: "59.57",
        fill: "none",
        stroke: "url(#Nepojmenovan\xFD_p\u0159echod_13)",
        "stroke-linecap": "round",
        "stroke-miterlimit": "10",
        "stroke-width": "11.89"
      })]
    })
  }
});

/***/ },

/***/ "./src/utils/analysisEditor/AnalysisEditorModal.js"
/*!*********************************************************!*\
  !*** ./src/utils/analysisEditor/AnalysisEditorModal.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalysisEditorModal: () => (/* binding */ AnalysisEditorModal)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);



const AnalysisEditorModal = ({
  thermal,
  open,
  setOpen,
  attributes,
  setAttributes
}) => {
  const ID = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => (Math.random() * 1000000).toFixed(0), []);
  const getId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(input => `${ID}__${input}`, [ID]);
  const {
    palette,
    from,
    to,
    analysis1,
    analysis2,
    analysis3,
    analysis4,
    analysis5,
    analysis6,
    analysis7
  } = attributes;
  const fileProviderRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(node => {
    if (node) {
      /** Mirror internal changes of analysis to the global state */
      const closure = instance => {
        instance.slots.onSlot1Serialize.set(ID, value => setAttributes({
          analysis1: value
        }));
        instance.slots.onSlot2Serialize.set(ID, value => setAttributes({
          analysis2: value
        }));
        instance.slots.onSlot3Serialize.set(ID, value => setAttributes({
          analysis3: value
        }));
        instance.slots.onSlot4Serialize.set(ID, value => setAttributes({
          analysis4: value
        }));
        instance.slots.onSlot5Serialize.set(ID, value => setAttributes({
          analysis5: value
        }));
        instance.slots.onSlot6Serialize.set(ID, value => setAttributes({
          analysis6: value
        }));
        instance.slots.onSlot7Serialize.set(ID, value => setAttributes({
          analysis7: value
        }));
      };
      node.onInstanceCreated.set(getId("instance_created__2"), closure);
    }
  }, [thermal]);
  const hasAnalysis = analysis1 || analysis2 || analysis3 || analysis4 || analysis5 || analysis6 || analysis7;

  // Return nothing when closed
  if (!open) return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.Fragment, {});
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Modal, {
    title: "Analysis editor",
    isFullScreen: true,
    onRequestClose: () => setOpen(false),
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("manager-provider", {
      slug: getId("manager"),
      palette: palette,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("registry-provider", {
        from: from,
        to: to,
        autoclear: true,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("group-provider", {
          autoclear: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("file-provider", {
            thermal: thermal,
            ref: fileProviderRef,
            analysis1: analysis1,
            analysis2: analysis2,
            analysis3: analysis3,
            analysis4: analysis4,
            analysis5: analysis5,
            analysis6: analysis6,
            analysis7: analysis7,
            autoclear: true,
            batch: true,
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "modal-editor__container",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "modal-editor__canvas",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("file-canvas", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("file-timeline", {})
                })]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "modal-editor__details",
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("group-tool-buttons", {
                  style: {
                    paddingBottom: "1rem"
                  }
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  style: {},
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("file-analysis-table", {
                    "force-interactive": true
                  })
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                  style: {
                    height: 300
                  },
                  children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("file-analysis-graph", {
                    style: {
                      height: "300px"
                    }
                  })
                })]
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
              className: "modal-editor__footer",
              children: [hasAnalysis && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                size: "compact",
                variant: "secondary",
                onClick: () => {
                  setAttributes({
                    analysis1: undefined,
                    analysis2: undefined,
                    analysis3: undefined,
                    analysis4: undefined,
                    analysis5: undefined,
                    analysis6: undefined,
                    analysis7: undefined
                  });
                },
                children: "Remove all analyses"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
                size: "compact",
                variant: "primary",
                style: {},
                onClick: () => setOpen(false),
                children: "Save & Close"
              })]
            })]
          })
        })
      })
    })
  });
};

/***/ },

/***/ "./src/utils/analysisEditor/AnalysisEditorTrigger.js"
/*!***********************************************************!*\
  !*** ./src/utils/analysisEditor/AnalysisEditorTrigger.js ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AnalysisEditorTrigger: () => (/* binding */ AnalysisEditorTrigger)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);


const AnalysisEditorTrigger = ({
  setOpen
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Button, {
    variant: "secondary",
    size: "compact",
    onClick: () => setOpen(true),
    children: "Analyses"
  });
};

/***/ },

/***/ "./src/utils/analysisEditor/useAnalysisEditor.js"
/*!*******************************************************!*\
  !*** ./src/utils/analysisEditor/useAnalysisEditor.js ***!
  \*******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useAnalysisEditor: () => (/* binding */ useAnalysisEditor)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/** Store the analysis editor state */
const useAnalysisEditor = () => {
  const [open, setOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  return {
    open,
    setOpen
  };
};

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

/***/ "./src/utils/editor/EditorModal.js"
/*!*****************************************!*\
  !*** ./src/utils/editor/EditorModal.js ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EditorModal: () => (/* binding */ EditorModal),
/* harmony export */   formatTimestamp: () => (/* binding */ formatTimestamp)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notationEditor_notationEditor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../notationEditor/notationEditor */ "./src/utils/notationEditor/notationEditor.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const formatFixed = (number, fixed) => {
  const f = number.toFixed(0);
  const length = f.length;
  const add = length - fixed;
  let result = [];
  if (add > 0) {
    for (let i = 0; i < add; i++) {
      result.push(0);
    }
  }
  result.push(f);
  return result.join("");
};
const formatTimestamp = timestamp => {
  const date = new Date(timestamp);
  return `${formatFixed(date.getUTCMinutes(), 0)}:${formatFixed(date.getUTCSeconds(), 2)}.${formatFixed(date.getUTCMilliseconds(), 3)}`;
};
const EditorModal = ({
  attributes,
  setAttributes,
  onClose
}) => {
  const ID = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => (Math.random() * 1000000).toFixed(0), []);
  const getId = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(input => `${ID}__${input}`, [ID]);
  const {
    thermal,
    visible,
    opacity,
    palette,
    variant,
    showhistogram,
    showlayout,
    interactiveanalysis,
    showshare,
    from,
    to,
    author,
    license,
    label,
    analysis1,
    analysis2,
    analysis3,
    analysis4,
    analysis5,
    analysis6,
    analysis7,
    notations
  } = attributes;
  const [tab, setTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)("analyses");
  const [ms, setMs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(0);
  const [duration, setDuration] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(undefined);
  const fileProviderRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(node => {
    if (node) {
      /** Mirror internal changes of analysis to the global state */
      const closure = instance => {
        instance.slots.onSlot1Serialize.set(ID, value => setAttributes({
          analysis1: value
        }));
        instance.slots.onSlot2Serialize.set(ID, value => setAttributes({
          analysis2: value
        }));
        instance.slots.onSlot3Serialize.set(ID, value => setAttributes({
          analysis3: value
        }));
        instance.slots.onSlot4Serialize.set(ID, value => setAttributes({
          analysis4: value
        }));
        instance.slots.onSlot5Serialize.set(ID, value => setAttributes({
          analysis5: value
        }));
        instance.slots.onSlot6Serialize.set(ID, value => setAttributes({
          analysis6: value
        }));
        instance.slots.onSlot7Serialize.set(ID, value => setAttributes({
          analysis7: value
        }));
        instance.group.registry.range.addListener(ID, value => setAttributes({
          from: value.from,
          to: value.to
        }));
        instance.group.registry.manager.palette.addListener(ID, value => setAttributes({
          palette: value
        }));
        setDuration(instance.timeline.duration);
        instance.timeline.addListener(ID, value => {
          setMs(value);
        });
      };
      node.fileController.onSuccess.set(getId("instance_created__2"), closure);
    }
  }, [thermal, setMs]);
  const tabs = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => {
    const result = [{
      name: 'analyses',
      title: 'Analyses',
      className: 'tab-one',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("manager-tool-bar", {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          style: {
            width: "100%"
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("file-analysis-table", {
            style: {
              width: "100%"
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          style: {
            width: "100%"
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("file-analysis-graph", {
            style: {
              width: "100%"
            }
          })
        })]
      })
    }];
    if (duration > 0) {
      result.push({
        name: 'notations',
        title: 'Notations',
        className: 'tab-two',
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_notationEditor_notationEditor__WEBPACK_IMPORTED_MODULE_3__.NotationsEditorLayout, {
            attributes: attributes,
            setAttributes: setAttributes,
            duration: duration,
            ms: ms
          })
        })
      });
    }
    result.push({
      name: 'display',
      title: 'Display',
      className: 'tab-display',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("manager-palette-dropdown", {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
            label: "Variant",
            value: variant,
            options: [{
              label: "Advanced analyser",
              value: "advanced"
            }, {
              label: "Simple layout",
              value: "simple"
            }, {
              label: "Lesson",
              value: "lesson"
            }, {
              label: "Image without interface",
              value: "nogui"
            }],
            onChange: value => setAttributes({
              variant: value
            })
          })
        }), visible && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          style: {
            paddingTop: "1rem"
          },
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.RangeControl, {
            __nextHasNoMarginBottom: true,
            label: "IR image opacity",
            help: "If a visible file is provided, you can set the initial transparency of the thermal file.",
            value: opacity,
            onChange: value => setAttributes({
              opacity: value
            }),
            min: 0,
            max: 1,
            step: 0.01
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: showhistogram,
            label: "Show histogram",
            hint: "Enable histogram display in the thermal scale?",
            onChange: value => {
              setAttributes({
                showhistogram: value
              });
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: showshare,
            label: "Show share button",
            help: "Display a button with instruction on embedding this file to other websites?",
            onChange: value => {
              setAttributes({
                showshare: value
              });
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: showlayout,
            label: "Show layout button",
            help: "Enable the user to change the application layout?",
            onChange: value => {
              setAttributes({
                showlayout: value
              });
            }
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: interactiveanalysis,
            label: "Interactive analysis",
            help: "Should the visitor be able to edit analysis?",
            onChange: value => {
              setAttributes({
                interactiveanalysis: value
              });
            }
          })
        })]
      })
    });
    result.push({
      name: 'metadata',
      title: 'Metadata',
      className: 'tab-three',
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelRow, {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Author', 'thermal-display'),
            value: author || '',
            onChange: value => setAttributes({
              author: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('License', 'thermal-display'),
            value: license || '',
            onChange: value => setAttributes({
              license: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label', 'thermal-display'),
            help: "Label appears on the black button on top & left of the app.",
            value: label || '',
            onChange: value => setAttributes({
              label: value
            })
          })]
        })
      })
    });
    return result;
  }, [attributes, setAttributes, duration]);
  console.log(attributes);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Modal, {
    title: "File editor",
    onRequestClose: onClose,
    isFullScreen: true,
    className: "file-editor",
    children: [formatTimestamp(ms), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("manager-provider", {
      // manager-slug="notations-editor"
      palette: attributes.palette,
      autoclear: true,
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-provider", {
        // registry-slug="notations-editor"
        autoclear: true,
        from: from,
        to: to,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("group-provider", {
          // group-slug="notations-editor"
          autoclear: true,
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("file-provider", {
            thermal: thermal,
            visible: visible,
            ref: fileProviderRef,
            analysis1: analysis1,
            analysis2: analysis2,
            analysis3: analysis3,
            analysis4: analysis4,
            analysis5: analysis5,
            analysis6: analysis6,
            analysis7: analysis7,
            autoclear: true,
            batch: true,
            children: [Object.values(notations).length > 0 && Object.values(notations).map(notation => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("notation-entry", {
              label: notation.label,
              slot: "notation",
              from: notation.from,
              to: notation.to
            })), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("main", {
              class: "file-editor-layout",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("section", {
                children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  class: "file-editor-stack gap-bottom",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-palette-dropdown", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-range-full-button", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-range-auto-button", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("file-info-button", {})]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
                  class: "",
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-histogram", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-range-slider", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("registry-ticks-bar", {})]
                }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("file-canvas", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("file-timeline", {})]
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("section", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.TabPanel, {
                  className: "my-tab-panel",
                  onSelect: setTab,
                  tabs: tabs,
                  children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
                    className: "file-editor-tab",
                    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Panel, {
                      header: tab.title,
                      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(React.Fragment, {
                        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.PanelBody, {
                          children: tab.children
                        })
                      }, ".0")
                    })
                  })
                })
              })]
            })]
          })
        })
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

/***/ "./src/utils/notationEditor/notationEditor.js"
/*!****************************************************!*\
  !*** ./src/utils/notationEditor/notationEditor.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   NotationsEditorLayout: () => (/* binding */ NotationsEditorLayout)
/* harmony export */ });
/* harmony import */ var _useNotations__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useNotations */ "./src/utils/notationEditor/useNotations.js");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _editor_EditorModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../editor/EditorModal */ "./src/utils/editor/EditorModal.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const Notation = ({
  notation,
  updateFn,
  deleteFn
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: notation.from,
        onChange: value => {
          updateFn(notation.id, {
            from: value
          });
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: notation.to,
        onChange: value => {
          updateFn(notation.id, {
            to: value
          });
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TextControl, {
        value: notation.label,
        onChange: value => {
          updateFn(notation.id, {
            label: value
          });
        }
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
        allowedTypes: "image",
        onSelect: result => {
          console.log(result);
          // successfullyUploadedVisibleFile(result.url);
          updateFn(notation.id, {
            image: result.url
          });
        },
        render: ({
          open
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "file-upload-cell",
          children: [notation.image && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("img", {
            src: notation.image,
            alt: notation.img,
            onClick: open,
            className: "notation-image"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.ButtonGroup, {
            children: notation.image ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              variant: "secondary",
              size: "small",
              onClick: () => {
                updateFn(notation.id, {
                  image: undefined
                });
              },
              children: "Remove image"
            }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
              onClick: open,
              variant: "primary",
              size: "small",
              children:  true ? "Change file" : 0
            })
          })]
        })
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
        onClick: deleteFn,
        variant: "tertiary",
        size: "compact",
        children: "Remove"
      })
    })]
  });
};
const NotationsEditorLayout = ({
  attributes,
  setAttributes,
  duration,
  ms
}) => {
  const n = (0,_useNotations__WEBPACK_IMPORTED_MODULE_0__.useNotations)(attributes.notations, setAttributes, duration);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("p", {
      children: ["Sequence duration: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("strong", {
        children: (0,_editor_EditorModal__WEBPACK_IMPORTED_MODULE_4__.formatTimestamp)(duration)
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("table", {
      class: "notations-table",
      children: [n.array.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("thead", {
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
            children: "From"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
            children: "To"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
            children: "Text"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
            children: "Image"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
            children: "Actions"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("tbody", {
        children: n.array.map(notation => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(Notation, {
          notation: notation,
          setAttributes: setAttributes,
          updateFn: n.updateNotation,
          deleteFn: () => n.removeNotation(notation.id)
        }))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
      onClick: () => {
        n.addNotation(ms, ms, "Popiska notace");
      },
      variant: "primary",
      children: "Add notation"
    })]
  });
};

/***/ },

/***/ "./src/utils/notationEditor/useNotations.js"
/*!**************************************************!*\
  !*** ./src/utils/notationEditor/useNotations.js ***!
  \**************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useNotations: () => (/* binding */ useNotations)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const useNotations = (notations = {}, setAttributes, duration) => {
  console.log(notations);
  const [state, setState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(notations);
  const addNotation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((from, to, label, img) => {
    if (duration === undefined || duration === 0) {
      return;
    }
    const id = Math.random();
    const notation = {
      id,
      from,
      to,
      label,
      img
    };
    const newState = {
      ...state,
      [id]: notation
    };
    setState(newState);
    return notation;
  }, [state, setState, duration]);
  const removeNotation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(id => {
    console.log("removing notation", id);
    const newState = {
      ...state
    };
    delete newState[id.toString()];
    setState(newState);
  }, [state, setState]);
  const updateNotation = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id, updates) => {
    console.log("updating", id, updates);
    const notation = state[id];
    if (notation) {
      const newNotation = {
        ...notation,
        ...updates
      };
      const newState = {
        ...state,
        [id]: newNotation
      };
      setState(newState);
      console.log("updated", newState);
    }
  }, [state, setState, duration]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const arr = Object.values(state);
    if (arr.length === 0) {
      return;
    }
    const newState = {
      ...state
    };

    // setState(newState);
  }, [state, duration, setState]);
  const array = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    const arr = Object.values(state);
    return arr; //.sort( (a,b) => a.from - b.from );
  }, [state]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (Object.values(state).length > 0) {
      setAttributes({
        notations: state
      });
    }
  }, [state]);
  return {
    notations: state,
    array,
    addNotation,
    removeNotation,
    updateNotation
  };
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

/***/ "./src/app/editor.scss"
/*!*****************************!*\
  !*** ./src/app/editor.scss ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/app/style.scss"
/*!****************************!*\
  !*** ./src/app/style.scss ***!
  \****************************/
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

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

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

/***/ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/image.mjs"
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/image.mjs ***!
  \**********************************************************************************************************************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ image_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/image.tsx


var image_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: { fill: "none" }, stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M19.25 14.2513L16.0707 11.0707C16.0317 11.0317 15.9683 11.0317 15.9293 11.0707L12.0584 14.9416C12.0245 14.9755 11.9713 14.9806 11.9316 14.9537L8.65791 12.7392C8.62313 12.7156 8.57736 12.7163 8.54332 12.7409L4.75 15.4808M19.25 14.2513V6C19.25 5.30964 18.6904 4.75 18 4.75H6C5.30964 4.75 4.75 5.30964 4.75 6V15.4808M19.25 14.2513V18C19.25 18.6904 18.6904 19.25 18 19.25H6C5.30964 19.25 4.75 18.6904 4.75 18V15.4808", vectorEffect: "non-scaling-stroke" }) });

//# sourceMappingURL=image.mjs.map


/***/ },

/***/ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/info.mjs"
/*!*********************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/info.mjs ***!
  \*********************************************************************************************************************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ info_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/info.tsx


var info_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: { fill: "none" }, stroke: "currentColor", strokeWidth: "1.5", children: /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M12 16V11M12 9.5V8M19.25 12C19.25 16.0041 16.0041 19.25 12 19.25C7.99594 19.25 4.75 16.0041 4.75 12C4.75 7.99594 7.99594 4.75 12 4.75C16.0041 4.75 19.25 7.99594 19.25 12Z", strokeLinejoin: "round", vectorEffect: "non-scaling-stroke" }) });

//# sourceMappingURL=info.mjs.map


/***/ },

/***/ "../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/video.mjs"
/*!**********************************************************************************************************************************************************************************************************************!*\
  !*** ../../node_modules/.pnpm/@wordpress+icons@18.0.0_@types+react-dom@18.3.7_@types+react@18.3.27__@types+react@18.3.27_re_duysswzoorf3hzh4as5ajtpjgu/node_modules/@wordpress/icons/build-module/library/video.mjs ***!
  \**********************************************************************************************************************************************************************************************************************/
(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ video_default)
/* harmony export */ });
/* harmony import */ var _wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/primitives */ "@wordpress/primitives");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
// packages/icons/src/library/video.tsx


var video_default = /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", style: { fill: "none" }, stroke: "currentColor", strokeWidth: "1.5", children: [
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M10 15L15 12L10 9V15Z", fill: "currentColor", stroke: "none" }),
  /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_wordpress_primitives__WEBPACK_IMPORTED_MODULE_0__.Path, { d: "M4.75 6C4.75 5.30964 5.30964 4.75 6 4.75H18C18.6904 4.75 19.25 5.30964 19.25 6V18C19.25 18.6904 18.6904 19.25 18 19.25H6C5.30964 19.25 4.75 18.6904 4.75 18V6Z", vectorEffect: "non-scaling-stroke" })
] });

//# sourceMappingURL=video.mjs.map


/***/ },

/***/ "./src/app/block.json"
/*!****************************!*\
  !*** ./src/app/block.json ***!
  \****************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"thermal-display/file","version":"0.1.0","title":"IR image","category":"thermal","icon":"file:./assets/icon.svg","description":"Display and analyse an uploaded IR image.","example":{},"supports":{"interactivity":false,"html":false,"anchor":true,"lock":true,"align":["wide","full"],"spacing":{"padding":true,"margin":true}},"textdomain":"thermal-display","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js","keywords":["webcomponent","IR Camera","embed","LRC"],"attributes":{"layout":{"type":"object","default":{"type":"constrained"}},"variant":{"type":"string","default":"advanced"},"showabout":{"type":"boolean","default":true},"advancedpalettes":{"type":"boolean","default":false},"showhistogram":{"type":"boolean","default":true},"showshare":{"type":"boolean","default":false},"showlayout":{"type":"boolean","default":false},"interactiveanalysis":{"type":"boolean","default":true},"thermal":{"type":"string"},"visible":{"type":"string"},"opacity":{"type":"number","default":1},"palette":{"type":"string","default":"iron"},"from":{"type":"number"},"to":{"type":"number"},"speed":{"type":"number","default":1},"label":{"type":"string"},"author":{"type":"string"},"license":{"type":"string","default":"CC BY-SA 4.0"},"description":{"type":"string"},"analysis1":{"type":"string"},"analysis2":{"type":"string"},"analysis3":{"type":"string"},"analysis4":{"type":"string"},"analysis5":{"type":"string"},"analysis6":{"type":"string"},"analysis7":{"type":"string"},"notations":{"type":"object","default":{}},"skin":{"type":"string","default":"default"},"lines":{"type":"string","default":"default"},"corners":{"type":"string","default":"default"}}}');

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
/******/ 			"app/index": 0,
/******/ 			"app/style-index": 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["app/style-index"], () => (__webpack_require__("./src/app/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map