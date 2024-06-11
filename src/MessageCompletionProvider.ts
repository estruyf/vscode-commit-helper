import * as vscode from "vscode";
import { getCommitCompletionItems } from "./utils";

export class MessageCompletionProvider
  implements vscode.CompletionItemProvider
{
  constructor() {}

  public async provideCompletionItems(
    document: vscode.TextDocument,
    position: vscode.Position,
    __: vscode.CancellationToken,
    context: vscode.CompletionContext
  ) {
    if (
      document.languageId !== "scminput" &&
      context.triggerKind === vscode.CompletionTriggerKind.Invoke
    ) {
      return [];
    }

    const text = document.getText();

    const range = new vscode.Range(
      new vscode.Position(position.line, position.character - 1),
      // position,
      position
    );

    const list: vscode.CompletionList = new vscode.CompletionList();

    list.items = getCommitCompletionItems(text, range);

    return list;
  }
}
