# React components

The package exports React wrappers for the webcomponents listed below. Props
are typed from each element's JavaScript properties; use property names such as
`filesString` rather than HTML attribute names such as `group-files`. Each
source link points to the webcomponent class defining the element and its
properties. Follow that class's inheritance for properties declared by a base
class.

All wrappers require [`LabirthermalProvider`](./labirthermal-provider).
Components that consume thermal context also need the relevant providers; see
the [`@labirthermal/webcomponents` context guide](../webcomponents/guide/hierarchy).

## Applications

| React component | Webcomponent | Source and properties |
| --- | --- | --- |
| `ThermalDropinApp` | `thermal-dropin-app` | [ThermalDropinAppElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/apps/ThermalDropinApp.ts) |
| `ThermalFileApp` | `thermal-file-app` | [ThermalFileAppElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/apps/ThermalFileApp.ts) |
| `ThermalGroupApp` | `thermal-group-app` | [ThermalGroupAppElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/apps/ThermalGroupApp.ts) |
| `ThermalSlottedApp` | `thermal-simple-app` | [ThermalSlottedAppElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/apps/ThermalSlottedApp.ts) |
| `AatApp` | `apparent-temperature-aat` | [AatAppElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/apps/AustralianApparentTemperature.ts) |

`ThermalFileApp`, `ThermalGroupApp` and `ThermalDropinApp` are self-contained
applications; the other two wrappers expose their respective app elements.

```tsx
<LabirthermalProvider>
  <ThermalFileApp thermal="/thermal/recording.lrc" />
</LabirthermalProvider>
```

## UI

| React component | Webcomponent | Source and properties |
| --- | --- | --- |
| `ThermalApp` | `thermal-app` | [ThermalAppElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/App.ts) |
| `ThermalBar` | `thermal-bar` | [ThermalBarElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Bar.ts) |
| `ThermalBtn` | `thermal-btn` | [ThermalBtnElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Btn.ts) |
| `ThermalBtnGroup` | `thermal-btn-group` | [ThermalBtnGroupElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/BtnGroup.ts) |
| `ThermalDialog` | `thermal-dialog` | [ThermalDialogElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Dialog.ts) |
| `ThermalDropdown` | `thermal-dropdown` | [ThermalDropdownElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Dropdown.ts) |
| `ThermalDropin` | `thermal-dropin` | [ThermalDropinElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Dropin.ts) |
| `ThermalExpandable` | `thermal-expandable` | [ThermalExpandableElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Expandable.ts) |
| `ThermalField` | `thermal-field` | [ThermalFieldElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Field.ts) |
| `ThermalIcon` | `thermal-icon` | [ThermalIconElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Icon.ts) |
| `ThermalLoading` | `thermal-loading` | [ThermalPosterElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Loading.ts) |
| `ThermalRadio` | `thermal-radio` | [ThermalRadioElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Radio.ts) |
| `ThermalSlot` | `thermal-slot` | [ThermalSlotElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Slot.ts) |
| `ThermalSpinner` | `thermal-spinner` | [ThermalSpinnerElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Spinner.ts) |
| `ThermalTip` | `thermal-tip` | [ThermalTipElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/ui/Tip.ts) |

```tsx
<ThermalBtn variant="primary">Open</ThermalBtn>
```

## Manager

| React component | Webcomponent | Source and properties |
| --- | --- | --- |
| `ManagerProvider` | `manager-provider` | [ManagerProviderElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/hierarchy/providers/ManagerProvider.ts) |
| `ManagerGraphSmoothSwitch` | `manager-graph-smooth-switch` | [ManagerGraphSmoothSwitch](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerGraphSmoothSwitch.ts) |
| `ManagerImageSmoothSwitch` | `manager-image-smooth-switch` | [ManagerImageSmoothSwitch](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerImageSmoothSwitch.ts) |
| `ManagerPaletteButtons` | `manager-palette-buttons` | [ManagerPaletteButtons](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerPaletteButtons.ts) |
| `ManagerPaletteDropdown` | `manager-palette-dropdown` | [ManagerPaletteDropdown](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerPaletteDropdown.ts) |
| `ManagerToolBar` | `manager-tool-bar` | [ManagerToolBar](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerToolsBar.ts) |
| `ManagerAdvancedPaletteSwitch` | `manager-advanced-palette-switch` | [ManagerAdvancedPaletteSwitch](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerAdvancedPaletteSwitch.ts) |
| `ManagerUnitSwitch` | `manager-unit-switch` | [ManagerUnitSwitch](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerUnitSwitch.ts) |
| `ManagerExportPanel` (deprecated) | `manager-export-panel` | [ManagerExportPanel](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/manager/ManagerExportPanel.ts) |

```tsx
<LabirthermalProvider>
  <ManagerProvider>
    <ManagerPaletteDropdown />
  </ManagerProvider>
</LabirthermalProvider>
```

## Registry

| React component | Webcomponent | Source and properties |
| --- | --- | --- |
| `RegistryProvider` | `registry-provider` | [RegistryProviderElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/hierarchy/providers/RegistryProvider.ts) |
| `RegistryHistogram` | `registry-histogram` | [RegistryHistogram](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryHistogram.ts) |
| `RegistryOpacitySlider` | `registry-opacity-slider` | [RegistryOpacitySlider](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryOpacitySlider.ts) |
| `RegistryRangeAutoButton` | `registry-range-auto-button` | [RegistryRangeAutoButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryRangeAutoButton.ts) |
| `RegistryRangeFullButton` | `registry-range-full-button` | [RegistryRangeFullButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryRangeFullButton.ts) |
| `RegistryRangeDisplay` | `registry-range-display` | [RegistryRangeDisplay](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryRangeDisplay.ts) |
| `RegistryRangeForm` | `registry-range-form` | [RegistryRangeForm](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryRangeForm.ts) |
| `RegistryRangeSlider` | `registry-range-slider` | [RegistryRangeSlider](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryRangeSlider.ts) |
| `RegistryTicksBar` | `registry-ticks-bar` | [RegistryTicksBar](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/registry/RegistryTicksBar.ts) |

```tsx
<LabirthermalProvider>
  <ManagerProvider>
    <RegistryProvider>
      <RegistryRangeSlider />
    </RegistryProvider>
  </ManagerProvider>
</LabirthermalProvider>
```

## Group

| React component | Webcomponent | Source and properties |
| --- | --- | --- |
| `GroupProvider` | `group-provider` | [GroupProviderElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/hierarchy/providers/GroupProvider.ts) |
| `GroupAnalysisSyncButton` | `group-analysis-sync-button` | [GroupAnalysisSyncButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupAnalysisSyncButton.ts) |
| `GroupChart` | `group-chart` | [GroupChartElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupChartElement.ts) |
| `GroupDownloadButtons` | `group-download-buttons` | [GroupDownloadButtons](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupDownloadButtons.ts) |
| `GroupDownloadDropdown` | `group-download-dropdown` | [GroupDownloadDropdown](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupDownloadDropdown.ts) |
| `GroupDropin` | `group-dropin-element` | [GroupDropinElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupDropinElement.ts) |
| `GroupDropinInput` | `group-dropin-input` | [GroupDropinInputElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupDropinInput.ts) |
| `GroupRangePropagator` | `group-range-propagator` | [GroupRangePropagatorElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupRangePropagator.ts) |
| `GroupTimeline` | `group-timeline` | [GroupTimelineElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/group/GroupTimeline.ts) |

```tsx
<LabirthermalProvider>
  <ManagerProvider>
    <RegistryProvider>
      <GroupProvider>
        <GroupTimeline />
      </GroupProvider>
    </RegistryProvider>
  </ManagerProvider>
</LabirthermalProvider>
```

## File and analysis

| React component | Webcomponent | Source and properties |
| --- | --- | --- |
| `FileProvider` | `file-provider` | [FileProviderElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/hierarchy/providers/FileProvider.ts) |
| `FileCopy` | `file-copy` | [FileCopyElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/hierarchy/providers/FileCopy.ts) |
| `FileCanvas` | `file-canvas` | [FileCanvasElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/FileCanvas.ts) |
| `FileDownloadButton` | `file-download-dropdown` | [FileDownloadButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/FileDownloadDropdown.ts) |
| `FileInfoButton` | `file-info-button` | [FileInfoButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/FileInfoButton.ts) |
| `FilePlaybackSpeedDropdown` | `file-playback-speed-dropdown` | [FilePlaybackSpeedDropdown](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/FilePlaybackSpeedDropdown.ts) |
| `FileTimeline` | `file-timeline` | [FileTimelineElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/FileTimelineElement.ts) |
| `FileVideoExportButton` | `file-video-export-button` | [FileVideoExportButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/FileVideoExportButton.ts) |
| `FileVideoExportPanel` | `file-video-export-panel` | [FileVideoExportPanel](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/video/FileVideoExportPanel.ts) |
| `FileLabel` | `file-label` | [FileLabelElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/fileLabel.ts) |
| `FileButton` | `file-button` | [FileButtonElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/buttons/FileButton.ts) |
| `FileDropdown` | `file-dropdown-elt` | [FileDropdown](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/buttons/FileDropdown.ts) |
| `FileLrcButton` | `file-download-lrc` | [FileLrcButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/buttons/FileLrcButton.ts) |
| `FilePngButton` | `file-download-png` | [FilePngButton](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/buttons/FilePngButton.ts) |
| `FileRangePropagator` | `file-range-propagator` | [FileRangePropagator](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/buttons/FileRangePropagator.ts) |
| `FileAnalysisComplex` | `file-analysis-complex` | [FileAnalysisComplexElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/FileAnalysisComplex.ts) |
| `FileAnalysisDisplay` | `file-analysis-display` | [FileAnalysisDisplayElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/FileAnalysisDisplay.ts) |
| `FileAnalysisEditDialog` | `file-analysis-edit` | [FileAnalisisEditDialog](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/FileAnalysisEdit.ts) |
| `FileAnalysisGraph` | `file-analysis-graph` | [FileAnalysisGraphElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/FileAnalysisGraph.ts) |
| `FileAnalysisRow` | `file-analysis-table-row` | [FileAnalysisRowElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/FileAnalysisRow.ts) |
| `FileAnalysisTable` | `file-analysis-table` | [FileAnalysisTableElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/FileAnalysisTable.ts) |
| `AnalysisColorDropdown` | `analysis-color` | [AnalysisColorDropdown](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/edit/analysisColorDropdown.ts) |
| `AnalysisNameInput` | `analysis-name` | [AnalysisNameInput](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/edit/analysisNameInput.ts) |
| `AreaEditTable` | `edit-area` | [AreaEditTable](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/edit/editAreaTable.ts) |
| `EditpointTable` | `edit-point` | [EditpointTable](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/edit/editPointTable.ts) |
| `ThermalChart` | `thermal-chart` | [ThermalChartElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/controls/file/analysis/chart/chart.ts) |
| `FileDetail` | `file-detail` | [FileDetailElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/renderers/FileDetail.ts) |
| `FileThumbnail` | `file-thumbnail` | [FileThumbnailElement](https://github.com/labirthermal/web/blob/main/packages/webcomponents/src/renderers/FileThumbnail.ts) |

```tsx
<LabirthermalProvider>
  <ManagerProvider>
    <RegistryProvider>
      <GroupProvider>
        <FileProvider thermal="/thermal/recording.lrc">
          <FileCanvas />
          <FileTimeline />
        </FileProvider>
      </GroupProvider>
    </RegistryProvider>
  </ManagerProvider>
</LabirthermalProvider>
```

## Wrapper implementation

The wrappers use [`@lit/react`](https://lit.dev/docs/frameworks/react/) to
bridge custom elements to React. The package resolves constructors from the
webcomponents catalog after `LabirthermalProvider` initializes it, preserving
browser-only loading. Each exported React component's JSDoc links to the
type-only imported class that defines its corresponding webcomponent's
properties.

See the [React documentation](https://react.dev/learn) for React fundamentals.
