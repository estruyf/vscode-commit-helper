import * as vscode from "vscode";
import { CommitMessages } from "../models";
import { Settings } from "../constants";

export const getCommitMessages = (): CommitMessages[] | undefined => {
  const tags =
    vscode.workspace
      .getConfiguration()
      .get<CommitMessages[]>(Settings.messages) || [];

  if (!tags) {
    return;
  }

  return tags;
};
