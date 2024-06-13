import * as vscode from "vscode";
import { DocumentFilters } from "./constants";
import { MessageCompletionProvider } from "./providers";
import { showGitTagging } from "./commands";

// https://github.dev/microsoft/vscode-pull-request-github/blob/4406af5c38e20ed5702b21b19a5791d2b4985d76/src/issues/userCompletionProvider.ts

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(
      "*",
      new MessageCompletionProvider(),
      "/"
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      "commitHelper.showGitTagging",
      showGitTagging
    )
  );
}

export function deactivate() {}
