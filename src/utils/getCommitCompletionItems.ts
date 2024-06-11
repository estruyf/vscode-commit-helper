import * as vscode from "vscode";
import { getCommitMessages } from "./getCommitMessages";

export const getCommitCompletionItems = (
  commitMessage: string,
  range: vscode.Range
) => {
  const commitMessages = getCommitMessages();
  if (!commitMessages) {
    return [];
  }

  const items: vscode.CompletionItem[] = [];

  let index = 0;
  for (const { type, values } of commitMessages) {
    for (const value of values) {
      // Exclude the value if it already exists in the commit message
      if (commitMessage.includes(value)) {
        continue;
      }

      items.push({
        label: value,
        insertText: `${value} `,
        kind: vscode.CompletionItemKind.Value,
        detail: type,
        additionalTextEdits: [vscode.TextEdit.delete(range)],
        sortText: index.toString(),
      });

      index++;
    }
  }

  return items;
};
