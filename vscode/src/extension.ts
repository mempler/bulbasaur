import { window, workspace, commands, ExtensionContext } from "vscode";
import { HelloWorldPanel } from "./panels/HelloWorldPanel";

export function activate(context: ExtensionContext) {
  context.subscriptions.push(
    commands.registerCommand("hello-world.showHelloWorld", () => {
      HelloWorldPanel.render(context.extensionUri);
    }),

    commands.registerCommand("bulbasaur.createGodotProject", () =>
      createGodotProject().catch(window.showErrorMessage)
    )
  );
}

function createGodotProject() {
  return new Promise(async (_resolve, reject) => {
    return reject("Not implemented yet");
  });
}
