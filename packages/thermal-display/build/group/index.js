/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/group/edit.js"
/*!***************************!*\
  !*** ./src/group/edit.js ***!
  \***************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ EditGroup)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils_analysisEditor_useAnalysisEditor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/analysisEditor/useAnalysisEditor */ "./src/utils/analysisEditor/useAnalysisEditor.js");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./editor.scss */ "./src/group/editor.scss");
/* harmony import */ var _utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/useRegisterIframeScript */ "./src/utils/useRegisterIframeScript.js");
/* harmony import */ var _utils_analysisEditor_AnalysisEditorModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/analysisEditor/AnalysisEditorModal */ "./src/utils/analysisEditor/AnalysisEditorModal.js");
/* harmony import */ var _utils_analysisEditor_AnalysisEditorTrigger__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/analysisEditor/AnalysisEditorTrigger */ "./src/utils/analysisEditor/AnalysisEditorTrigger.js");
/* harmony import */ var _hooks_useFiles__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./hooks/useFiles */ "./src/group/hooks/useFiles.js");
/* harmony import */ var _utils_appearence_AppearencePanel__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/appearence/AppearencePanel */ "./src/utils/appearence/AppearencePanel.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__);












/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

function EditGroup({
  attributes,
  setAttributes
}) {
  const ID = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useMemo)(() => Math.random().toString());

  /** Register the webcomponents if not already */
  (0,_utils_useRegisterIframeScript__WEBPACK_IMPORTED_MODULE_6__.useRegisterIframeScript)();
  const {
    webcomponent,
    palette,
    thermal,
    files,
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
    interactiveanalysis,
    preservetime
  } = attributes;
  const fl = (0,_hooks_useFiles__WEBPACK_IMPORTED_MODULE_9__.useFiles)(files);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    if (fl.parsed !== files) setAttributes({
      files: fl.parsed
    });
  }, [fl.parsed]);
  const [thermalBackup, setThermalBackup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)(thermal);
  const [previewGroup, setPreviewGroup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  const {
    open,
    setOpen
  } = (0,_utils_analysisEditor_useAnalysisEditor__WEBPACK_IMPORTED_MODULE_2__.useAnalysisEditor)();
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
  const displaySettingsCallback = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useCallback)(node => {
    console.log("displaysettingcallback", node, node.registry);
    if (node) {
      node.registry.range.addListener(ID, value => {
        if (value instanceof Object) {
          setAttributes(value);
        } else {
          setAttributes({
            from: undefined,
            to: undefined
          });
        }
      });
    }
  }, []);
  const previewRef = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useRef)();
  const [group, setGroup] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)();
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    console.log(">>>", previewRef.current);
    if (group === undefined) {
      setTimeout(() => {
        if (previewRef.current !== null) {
          const gr = previewRef.current.group;
          gr.registry.palette.addListener(ID, value => {
            setAttributes({
              palette: value
            });
          });
          gr.registry.range.addListener(ID, value => {
            if (value) {
              setAttributes(value);
            }
          });
          gr.analysisSync.onSlotSync.set(ID, (serialized, slotNumber) => {
            const key = `analysis${slotNumber}`;
            console.log(key, serialized);
            setAttributes({
              [key]: serialized
            });
          });
          previewRef.current.onColumns.set(ID, value => {
            setAttributes({
              columns: value
            });
          });
          setGroup(previewRef.current.group);
        }
      }, 0);
      console.log("==========", previewRef.current);
    }
  }, [previewRef.current, group, setGroup, setAttributes]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.Fragment, {
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUploadCheck, {
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.InspectorControls, {
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Thermal files",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_utils_analysisEditor_AnalysisEditorModal__WEBPACK_IMPORTED_MODULE_7__.AnalysisEditorModal, {
            thermal: thermal,
            open: open,
            setOpen: setOpen,
            attributes: attributes,
            setAttributes: setAttributes
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("div", {
            style: {
              marginBottom: "1rem",
              marginTop: thermal ? "1rem" : "0"
            },
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
              allowedTypes: ['application/octet-stream'],
              multiple: true,
              onSelect: result => {
                console.log(">>>>>", result);
                if (Array.isArray(result)) {
                  const urls = result.map(file => {
                    return file.url;
                  });
                  fl.syncUrls(urls);
                }
              },
              render: ({
                open
              }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                onClick: () => {
                  startUploadingThermalFile();
                  open();
                },
                variant: "primary",
                children: "Upload or select a LRC files"
              })
            }), Object.values(fl.files).map(file => {
              let panelTitle = file.label ? file.label : file.thermal.match(/[^/]*$/)[0];
              return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Panel, {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
                  title: panelTitle,
                  initialOpen: false,
                  children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
                    __next40pxDefaultSize: true,
                    __nextHasNoMarginBottom: true,
                    onChange: value => {
                      fl.updateFileLabel(file.thermal, value);
                    },
                    value: file.label,
                    label: "Label"
                  }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
                    variant: "primary",
                    isDestructive: true,
                    size: "small",
                    onClick: () => fl.removeFile(file.thermal),
                    children: "Remove"
                  })]
                })
              });
            })]
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Information",
          initialOpen: false,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Author', 'thermal-display'),
            value: author || '',
            onChange: value => setAttributes({
              author: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('License', 'thermal-display'),
            value: license || '',
            onChange: value => setAttributes({
              license: value
            })
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Label', 'thermal-display'),
            help: "Label appears on the black button on top & left of the app.",
            value: label || '',
            onChange: value => setAttributes({
              label: value
            })
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.PanelBody, {
          title: "Display settings",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: showhistogram,
            label: "Show histogram",
            hint: "Enable histogram display in the thermal scale?",
            onChange: value => {
              setAttributes({
                showhistogram: value
              });
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: showabout,
            label: "Show about button",
            help: "Display the button with application info?",
            onChange: value => {
              setAttributes({
                showabout: value
              });
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: interactiveanalysis,
            label: "Interactive analysis",
            help: "Should the visitor be able to edit analysis?",
            onChange: value => {
              setAttributes({
                interactiveanalysis: value
              });
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.CheckboxControl, {
            __nextHasNoMarginBottom: true,
            checked: preservetime,
            label: "Preserve time in file labels",
            help: "Should the file time be displayed even if the file has a custom label?",
            onChange: value => {
              setAttributes({
                preservetime: value
              });
            }
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_utils_appearence_AppearencePanel__WEBPACK_IMPORTED_MODULE_10__.AppearencePanel, {
            ...attributes,
            setter: setAttributes
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("div", {
      ...(0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.useBlockProps)(),
      children: fl.parsed !== undefined ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Tooltip, {
        text: "Click on to edit",
        delay: 300,
        hideOnClick: false,
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("thermal-group-app", {
          files: fl.parsed,
          label: label,
          author: author,
          license: license,
          palette: palette,
          ref: previewRef,
          analysis1: analysis1,
          analysis2: analysis2,
          analysis3: analysis3,
          analysis4: analysis4,
          analysis5: analysis5,
          analysis6: analysis6,
          analysis7: analysis7,
          showabout: showabout,
          showhistogram: showhistogram,
          interactiveanalysis: interactiveanalysis,
          preservetime: preservetime,
          skin: attributes.skin,
          lines: attributes.lines,
          corners: attributes.corners
        })
      }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Placeholder, {
        label: "Thermal group",
        instructions: "Display multiple IR recordings taken by IR camera TIMI Edu.",
        icon: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("svg", {
          xmlns: "http://www.w3.org/2000/svg",
          version: "1.1",
          viewBox: "0 0 512 512",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("g", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsxs)("g", {
              id: "Vrstva_1",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                d: "M327.6,240c-5.4-4.7-13.6-7.1-24.6-7.1h-51.9v60.8h52c10.9,0,19-2.4,24.6-7.2s8.2-12.7,8.2-23.6-2.8-18.1-8.3-22.8Z"
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)("path", {
                d: "M252.4,0L18.9,90.7h-.6v421.3h466.9V90.7h.6L252.4,0ZM161.8,411.9h-47.5v-216h47.5v216ZM342.1,411.9c-2.8-7.9-4.5-16.2-4.9-24.6-.6-9.5-1.5-18.4-2.7-27.2-1.6-11.3-5-19.5-10.3-24.8s-13.8-7.9-25.7-7.9h-47.5v84.4h-47.5v-215.9h116.4c8.9-.1,17.8,1.5,26.2,4.7,7.4,2.9,14.2,7.3,19.9,12.8,5.5,5.4,9.8,11.8,12.7,18.9,3,7.3,4.5,15.2,4.4,23.1.3,11.5-2.4,22.9-7.9,33-6,9.9-15.3,17.3-26.2,21.2v.6c5.3,1.3,10.3,3.9,14.5,7.4,3.8,3.3,7,7.3,9.4,11.8,2.5,4.7,4.3,9.7,5.3,15,1.1,5.4,1.9,10.9,2.3,16.3.2,3.4.4,7.5.6,12.1s.6,9.2,1.1,14.2c.5,4.6,1.3,9.2,2.4,13.7.9,4,2.6,7.7,5,11.1h-47.6Z"
              })]
            })
          })
        }),
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_3__.MediaUpload, {
          allowedTypes: ['application/octet-stream'],
          multiple: true,
          onSelect: result => {
            if (Array.isArray(result)) {
              const urls = result.map(file => {
                return file.url;
              });
              fl.syncUrls(urls);
            }
          },
          render: ({
            open
          }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_11__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_4__.Button, {
            onClick: () => {
              startUploadingThermalFile();
              open();
            },
            variant: "primary",
            children: thermal ? "Change file" : "Upload or select a LRC file"
          })
        })
      })
    })]
  });
}

/***/ },

/***/ "./src/group/hooks/useFiles.js"
/*!*************************************!*\
  !*** ./src/group/hooks/useFiles.js ***!
  \*************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useFiles: () => (/* binding */ useFiles)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);


/**
 * 
 * @param {string[]} records 
 */
const formatResult = records => {
  return records.join(";");
};

/**
 * @param {string[]} entries 
 */
const formatRecord = entries => {
  return entries.join("|");
};

/**
 * @param {string} key 
 * @param {string} value 
 */
const formatEntry = (key, value) => {
  return `${key}~${value}`;
};

/**
             * 
             * @param {string} str 
             * @param {string} separator 
             * @returns 
             */
const splitBy = (str, separator) => {
  return str.split(separator).map(s => s.trim());
};

/**
     * 
     * @param {string} value 
     */
const parseString = value => {
  const filesStrings = splitBy(value, ";");
  const filesRecords = filesStrings.map(file => {
    const fileSegments = splitBy(file, "|");
    const fileRecords = fileSegments.map(segment => {
      const [key, value] = splitBy(segment, "~");
      return [key, value];
    });
    return fileRecords;
  });
  const filesObjects = filesRecords.map(record => {
    return Object.fromEntries(record);
  });
  const filesValue = Object.fromEntries(filesObjects.map(record => [record.thermal, record]));
  return filesValue;
};

/**
 * 
 * @param {string|undefined} initialValue 
 * @returns 
 */
const useFiles = initialValue => {
  const initial = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => initialValue, []);
  const initialFiles = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useMemo)(() => {
    if (initialValue === undefined) {
      return {};
    }
    const parsedFiles = parseString(initialValue);
    return parsedFiles;
  }, []);
  const [files, setFiles] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialFiles);
  const [parsed, setParsed] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initial);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (initial) setFiles(parseString(initial));
  }, [initial]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (typeof files === "object") {
      let str = "";
      const filesBuffer = [];
      Object.entries(files).forEach(([url, file]) => {
        const keys = Object.keys(file);
        if (keys.includes("thermal")) {
          const entries = [formatEntry("thermal", file.thermal)];
          if (keys.includes("visible")) {
            entries.push("visible", formatEntry("visible", file.visible));
          }
          if (keys.includes("note")) {
            entries.push("note", formatEntry("note", file.note));
          }
          if (keys.includes("label")) {
            entries.push(formatEntry("label", file.label));
          }
          const record = formatRecord(entries);
          filesBuffer.push(record);
        }
      });
      str = formatResult(filesBuffer);
      if (str.length > 0) {
        setParsed(str);
      } else {
        setParsed(undefined);
      }
    } else {
      setParsed(undefined);
    }
  }, [files]);
  const addFile = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
  /**
   * 
   * @param {string} thermal 
   * @param {string|undefined} visible 
   * @param {string|undefined} label 
   * @param {string|undefined} note 
   */
  (thermal, visible, label, note) => {
    // If the file exists already, update it
    if (Object.keys(files).includes(thermal)) {
      files[thermal] = {
        ...files[thermal],
        visible,
        label,
        note
      };
      setFiles({
        ...files
      });
    } else {
      if (thermal.length > 0 && thermal) {
        files[thermal] = {
          visible,
          thermal,
          label,
          note
        };
        setFiles({
          ...files
        });
      }
    }
  }, [setFiles, files]);
  const removeFile = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
  /**
   * 
   * @param {string} url 
   */
  url => {
    if (Object.keys(files).includes(url)) {
      const {
        [url]: _,
        ...updatedValue
      } = files;
      setFiles(updatedValue);
    }
  }, [setFiles, files]);
  const syncUrls = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
  /**
   * 
   * @param {string[]} urls 
   */
  urls => {
    const f = {
      ...files
    };
    const keys = Object.keys(f);

    // Add files that were not yet
    urls.forEach(url => {
      if (!keys.includes(url)) {
        console.log("added", url);
        f[url] = {
          thermal: url
        };
      }
    });

    // Remove files that are no more
    keys.forEach(url => {
      if (!urls.includes(url)) {
        console.log("removing", url);
        delete f[url];
      }
    });

    // Set the file lastly
    setFiles(f);
  }, [files, setFiles]);
  const updateFileUrl = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
  /**
   * 
   * @param {string} originalUrl 
   * @param {string} newUrl 
   */
  (originalUrl, newUrl) => {
    if (Object.keys(files).includes(originalUrl)) {
      const f = {
        ...files
      };
      const entry = {
        ...f[originalUrl],
        thermal: newUrl
      };
      delete f[originalUrl];
      f[newUrl] = entry;
      setFiles(f);
    }
  }, [files, setFiles]);
  const updateFileLabel = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
  /**
   * 
   * @param {string} url 
   * @param {string|undefined} label 
   */
  (url, label) => {
    console.log(url, label);
    if (Object.keys(files).includes(url)) {
      const f = {
        ...files
      };
      f[url].label = label;
      setFiles(f);
    }
  }, [files, setFiles]);
  const updateFileNote = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(
  /**
   * 
   * @param {string} url 
   * @param {string|undefined} note 
   */
  (url, note) => {
    if (Object.keys(files).includes(url)) {
      const f = {
        ...files
      };
      f[url] = note;
      setFiles(f);
    }
  }, [files, setFiles]);
  return {
    files,
    parsed,
    addFile,
    removeFile,
    syncUrls,
    updateFileLabel,
    updateFileUrl,
    updateFileNote
  };
};

/***/ },

/***/ "./src/group/index.js"
/*!****************************!*\
  !*** ./src/group/index.js ***!
  \****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/group/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/group/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/group/block.json");
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

/***/ "./src/group/editor.scss"
/*!*******************************!*\
  !*** ./src/group/editor.scss ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./src/group/style.scss"
/*!******************************!*\
  !*** ./src/group/style.scss ***!
  \******************************/
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

/***/ "./src/group/block.json"
/*!******************************!*\
  !*** ./src/group/block.json ***!
  \******************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":3,"name":"thermal-display/group","version":"0.1.0","title":"Group of IR images","category":"thermal","icon":"file:./assets/icon.svg","description":"Upload multiple IR images and analyse them in the browser.","example":{},"supports":{"interactivity":false,"html":false,"anchor":true,"lock":true,"align":["wide","full"],"spacing":{"padding":true,"margin":true}},"textdomain":"thermal-display","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css","render":"file:./render.php","viewScript":"file:./view.js","keywords":["webcomponent","IR Camera","embed","LRC"],"attributes":{"layout":{"type":"object","default":{"type":"constrained"}},"showabout":{"type":"boolean","default":"true"},"showhistogram":{"type":"boolean","default":"true"},"interactiveanalysis":{"type":"boolean","default":"true"},"preservetime":{"type":"boolean","default":"true"},"files":{"type":"string"},"columns":{"type":"number","default":3},"palette":{"type":"string","default":"iron"},"from":{"type":"number"},"to":{"type":"number"},"speed":{"type":"number","default":1},"label":{"type":"string"},"author":{"type":"string"},"license":{"type":"string","default":"CC BY-SA 4.0"},"description":{"type":"string"},"analysis1":{"type":"string"},"analysis2":{"type":"string"},"analysis3":{"type":"string"},"analysis4":{"type":"string"},"analysis5":{"type":"string"},"analysis6":{"type":"string"},"analysis7":{"type":"string"},"skin":{"type":"string","default":"default"},"lines":{"type":"string","default":"default"},"corners":{"type":"string","default":"default"}}}');

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
/******/ 			"group/index": 0,
/******/ 			"group/style-index": 0
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
/******/ 	let __webpack_exports__ = __webpack_require__.O(undefined, ["group/style-index"], () => (__webpack_require__("./src/group/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map