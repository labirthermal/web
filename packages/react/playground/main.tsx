import { StrictMode, useState, version } from "react";
import { createRoot } from "react-dom/client";
import {
  LabirthermalProvider, ThermalBtn, ThermalDropinApp, ThermalApp, ThermalDialog,
  ThermalDropdown, ManagerProvider, ManagerPaletteDropdown, ManagerToolBar,
  ManagerImageSmoothSwitch, ManagerUnitSwitch, RegistryProvider,
  RegistryRangeSlider, RegistryRangeForm, RegistryRangeAutoButton,
  RegistryRangeFullButton, RegistryRangeDisplay, RegistryHistogram,
  RegistryOpacitySlider, GroupProvider, GroupTimeline, GroupDownloadDropdown,
  GroupAnalysisSyncButton, GroupChart, FileProvider, FileCanvas, FileLabel,
  FileInfoButton, FileDownloadButton, FileTimeline, FilePlaybackSpeedDropdown,
  FileAnalysisComplex,
} from "../src/index.export";

const samples = [
  { thermal: "/lrc/image_uint16_small.lrc", label: "Static thermogram" },
  { thermal: "/lrc/sequence_uint16_small_short.lrc", label: "Thermal sequence" },
];


function Playground() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <h1>LabIR React playground</h1>
      <p>React {version}</p>
      <LabirthermalProvider
        fallback={<p>Loading LabIR webcomponents...</p>}
        errorFallback={(error) => <p role="alert">{error.message}</p>}
      >
        <p>LabIR webcomponents are ready.</p>
        <section>
          <h2>Registry, group and file controls</h2>
          <p>Local LRC samples share one registry and group. Use the toolbar to add analyses.</p>
          <ManagerProvider managerSlug="react-playground" tool="edit">
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <ManagerPaletteDropdown />
              <ManagerImageSmoothSwitch />
              <ManagerUnitSwitch />
              <ManagerToolBar />
            </div>
            <RegistryProvider registrySlug="samples">
              <RegistryRangeDisplay />
              <RegistryRangeSlider />
              <RegistryRangeForm />
              <RegistryRangeAutoButton />
              <RegistryRangeFullButton />
              <RegistryOpacitySlider />
              <RegistryHistogram style={{ display: "block", maxWidth: 600 }} />
              <GroupProvider groupSlug="local-files">
                <GroupTimeline />
                <GroupDownloadDropdown />
                <GroupAnalysisSyncButton />
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
                  {samples.map((sample) => (
                    <FileProvider key={sample.thermal} thermal={sample.thermal}>
                      <h3>{sample.label}</h3>
                      <FileLabel />
                      <FileInfoButton />
                      <FileDownloadButton />
                      <FileCanvas style={{ maxWidth: 600 }} />
                      <FileTimeline />
                      <FilePlaybackSpeedDropdown />
                      <FileAnalysisComplex />
                    </FileProvider>
                  ))}
                </div>
                <GroupChart />
              </GroupProvider>
            </RegistryProvider>
          </ManagerProvider>
        </section>
        <ThermalDialog label="Dialog">
          <ThermalBtn slot="invoker" variant="primary" tooltip="Tooltip">Tlačítko</ThermalBtn>
        </ThermalDialog>
        <ThermalApp label="App" showFullscreen>
          <ThermalBtn slot="bar-pre">Tlač</ThermalBtn>
        </ThermalApp>

        <ThermalDropdown>
          <span slot="invoker">Invoker</span>
          <ThermalBtn slot="option">Option</ThermalBtn>
        </ThermalDropdown>

        <ThermalDropinApp>
        </ThermalDropinApp>
      </LabirthermalProvider>
      <button onClick={() => setCount((value) => value + 1)}>
        Clicks: {count}
      </button>
    </main>
  );
}

const root = document.getElementById("root");

if (!root) {
  throw new Error("The playground root element is missing.");
}

createRoot(root).render(
  <StrictMode>
    <Playground />
  </StrictMode>,
);
