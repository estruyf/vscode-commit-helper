import { API, Repository } from "../api/git";

export const getCommitMessage = (git: API, repo?: Repository) => {
  if (repo) {
    const uriPath = repo.rootUri.path;
    let selectedRepository = git.repositories.find(
      (repository) => repository.rootUri.path === uriPath
    );

    if (selectedRepository) {
      return selectedRepository.inputBox.value;
    }
  } else {
    let value = "";
    for (let repo of git.repositories) {
      value += repo.inputBox.value;
    }
  }

  return "";
};
