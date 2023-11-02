import { window, commands, ExtensionContext } from "vscode";
import { ProjectSettingsProvider } from "./providers/ProjectSettingsProvider";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("bulbasaur.createGodotProject", () => createGodotProject().catch(window.showErrorMessage)),

    ProjectSettingsProvider.register(context)
  );
}

function createGodotProject() {
  return new Promise(async (_resolve, reject) => {
    return reject("Not implemented yet");
  });
}
