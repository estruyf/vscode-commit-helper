import * as vscode from "vscode";
import { getCommitMessages } from "./getCommitMessages";

export const getCommitQuickPickItems = (commitMessage: string) => {
  const commitMessages = getCommitMessages();
  if (!commitMessages) {
    return [];
  }

  const items: vscode.QuickPickItem[] = [];

  let crntType = "";
  for (const { type, values } of commitMessages) {
    if (crntType !== type) {
      items.push({
        label: type,
        kind: vscode.QuickPickItemKind.Separator,
      });
      crntType = type;
    }

    for (const value of values) {
      items.push({
        label: value,
        description: "",
        kind: vscode.QuickPickItemKind.Default,
        picked: commitMessage.includes(value),
      });
    }
  }

  return items;
};
