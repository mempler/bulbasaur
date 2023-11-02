import * as vscode from "vscode";

import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";

export class ProjectSettingsProvider implements vscode.CustomTextEditorProvider {
  //#region Register
  private static readonly viewType = "bulbasaur.projectSettings";

  public static register(context: vscode.ExtensionContext): vscode.Disposable {
    const provider = new ProjectSettingsProvider(context);
    const providerRegistration = vscode.window.registerCustomEditorProvider(ProjectSettingsProvider.viewType, provider, {
      webviewOptions: {
        retainContextWhenHidden: true,
      },
      supportsMultipleEditorsPerDocument: false,
    });

    return providerRegistration;
  }
  //#endregion

  constructor(private readonly context: vscode.ExtensionContext) {}

  private _disposables: vscode.Disposable[] = [];

  public dispose() {
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Called when our custom editor is opened.
   */
  public async resolveCustomTextEditor(document: vscode.TextDocument, webviewPanel: vscode.WebviewPanel, _token: vscode.CancellationToken): Promise<void> {
    webviewPanel.webview.options = {
      enableScripts: true,
      // Strict resources are enabled, so we must specify all our resources
      // in this case, just the webview
      localResourceRoots: [vscode.Uri.joinPath(this.context.extensionUri, "webview/dist")],
    };
    webviewPanel.webview.onDidReceiveMessage(this._webViewMessageHandler, undefined, this._disposables);
    webviewPanel.webview.html = this._getWebviewContent(webviewPanel.webview);
    webviewPanel.webview.postMessage({ command: "navigate", path: "/project_settings" });
  }

  private _getWebviewContent(webview: vscode.Webview) {
    const stylesUri = getUri(webview, this.context.extensionUri, ["webview", "dist", "assets", "index.css"]);
    const scriptUri = getUri(webview, this.context.extensionUri, ["webview", "dist", "assets", "index.js"]);

    const nonce = getNonce();

    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>Project Settings</title>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'unsafe-inline'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <script defer nonce="${nonce}" src="${scriptUri}"></script>
        </head>

        <body>
          <div id="root"></div>
        </body>
      </html>
    `;
  }

  private _webViewMessageHandler(message: any) {
    vscode.window.showInformationMessage(`Received message from webview: ${JSON.stringify(message)}`);
  }
}
