import { ActionRuleApplication, Hunk } from '@beeker-tech/engine-common';
import {
  displayError,
  displayInfo,
  displayMessage,
  displaySuccess,
  displayLineBreak,
  displayWarning,
} from '../../../../adapters';

export const displayRuleApplication = (
  ruleApplication: ActionRuleApplication
) => {
  const { rule, targetFilePath, diff, isSkippedInConfig } = ruleApplication;

  if (isSkippedInConfig) {
    displayWarning(`⏭ [Rule] ${rule.name}`);

    displayWarning(`✔️ [Skipped] ${targetFilePath}\n`);

    return;
  }

  if (!diff) {
    displayWarning(`▶️ [Rule] ${rule.name}`);

    displayMessage(`✔️ [No change] ${targetFilePath}\n`);

    return;
  }

  displayInfo(`▶️ [Rule] ${rule.name}`);
  displayMessage(`✔️ [Change] ${targetFilePath}\n`);

  const { hunks } = diff;

  for (const hunk of hunks) {
    displayHunk(hunk);
  }
};

const displayHunk = (hunk: Hunk) => {
  const {
    lines,
    oldStart: hunkOldStart,
    oldLines,
    newStart: hunkNewStart,
    newLines,
  } = hunk;
  let oldStart = hunkOldStart;
  let newStart = hunkNewStart;

  // Unified Diff Format quirk: If the chunk size is 0,
  // the first number is one lower than one would expect.
  // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
  if (oldLines === 0) {
    oldStart -= 1;
  }
  if (hunk.newLines === 0) {
    newStart -= 1;
  }

  displayMessage(`@@ -${oldStart},${oldLines} + ${newStart},${newLines} @@`);

  for (const line of lines) {
    displayLine(line);
  }

  displayLineBreak();
};

const displayLine = (line: string) => {
  const added = line.startsWith('+');
  const removed = line.startsWith('-');

  if (added) {
    displaySuccess(line);
  } else if (removed) {
    displayError(line);
  } else {
    displayMessage(line);
  }
};
