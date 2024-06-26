import * as vscode from "vscode";
import { GitExtension, Repository } from "../api/git";
import {
  getCommitMessage,
  getCommitQuickPickItems,
  updateCommit,
} from "../utils";

export const showGitTagging = async (repo?: Repository) => {
  const gitExtension =
    vscode.extensions.getExtension<GitExtension>("vscode.git")?.exports;

  if (!gitExtension) {
    vscode.window.showErrorMessage("Git extension not found");
    return;
  }

  const git = gitExtension.getAPI(1);

  vscode.commands.executeCommand("workbench.view.scm");

  const commitMessage = getCommitMessage(git, repo);

  const items: vscode.QuickPickItem[] = getCommitQuickPickItems(commitMessage);
  if (!items || items.length === 0) {
    vscode.window.showErrorMessage("No tags found in settings.json");
    return;
  }

  const prevSelectedTags: string[] = Object.assign(
    [],
    items.filter((item) => item.picked)
  ).map((item: vscode.QuickPickItem) => item.label);

  const selectedTags =
    (await vscode.window.showQuickPick(items, {
      canPickMany: true,
      placeHolder: "Select messages to add to the commit message",
      ignoreFocusOut: true,
      title: "Select commit messages",
    })) || [];

  const tagsToRemove: string[] = prevSelectedTags.filter(
    (tag) => !selectedTags.map((tag) => tag.label).includes(tag)
  );

  if (selectedTags.length === 0 && tagsToRemove.length === 0) {
    return;
  }

  const tagsToAdd = selectedTags.map((tag) => tag.label);

  if (repo) {
    const uriPath = repo.rootUri.path;
    let selectedRepository = git.repositories.find(
      (repository) => repository.rootUri.path === uriPath
    );

    if (selectedRepository) {
      updateCommit(selectedRepository, tagsToAdd, tagsToRemove);
    }
  } else {
    for (let repo of git.repositories) {
      updateCommit(repo, tagsToAdd, tagsToRemove);
    }
  }
};
