import { Repository } from "../api/git";

export const updateCommit = (
  repository: Repository,
  tagsToAdd: string[],
  tagsToRemove: string[]
) => {
  let commitMessage = repository.inputBox.value;

  for (const tag of tagsToRemove) {
    commitMessage = commitMessage.replace(tag, "");
  }

  for (const tag of tagsToAdd) {
    if (!commitMessage.includes(tag)) {
      commitMessage += ` ${tag}`;
    }
  }

  // Remove the extra spaces
  commitMessage = commitMessage.replace(/\s+/g, " ").trim();

  repository.inputBox.value = commitMessage;
};
