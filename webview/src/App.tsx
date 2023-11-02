import { VSCodeButton, VSCodePanelTab, VSCodePanelView, VSCodePanels, VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

function App() {
  return (
    <div className="pt-1 px-6 max-w-[1200px] w-full">
      <VSCodeTextField className="w-full" placeholder="Search project settings">
        <section slot="end" className="flex items-end">
          <VSCodeButton appearance="icon" aria-label="Clear All">
            <span className="codicon codicon-clear-all" />
          </VSCodeButton>

          <VSCodeButton appearance="icon" aria-label="Filter">
            <span className="codicon codicon-filter" />
          </VSCodeButton>
        </section>
      </VSCodeTextField>

      <VSCodePanels>
        <VSCodePanelTab id="tab-1">General</VSCodePanelTab>
        <VSCodePanelTab id="tab-2">Input Map</VSCodePanelTab>
        <VSCodePanelTab id="tab-3">Localization</VSCodePanelTab>
        <VSCodePanelTab id="tab-4">Autoload</VSCodePanelTab>
        <VSCodePanelTab id="tab-5">Shader Globals</VSCodePanelTab>
        <VSCodePanelTab id="tab-6">Plugins</VSCodePanelTab>
        <VSCodePanelTab id="tab-7">Import Defaults</VSCodePanelTab>

        <VSCodePanelView id="view-1">General</VSCodePanelView>
        <VSCodePanelView id="view-2">Input Map</VSCodePanelView>
        <VSCodePanelView id="view-3">Localization</VSCodePanelView>
        <VSCodePanelView id="view-4">Autoload</VSCodePanelView>
        <VSCodePanelView id="view-5">Shader Globals</VSCodePanelView>
        <VSCodePanelView id="view-6">Plugins</VSCodePanelView>
        <VSCodePanelView id="view-7">Import Defaults</VSCodePanelView>
      </VSCodePanels>
    </div>
  );
}

export default App;
