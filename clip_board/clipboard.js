const copyText = "[CTRL+C]";
const pasteText = "[CTRL+V]";
const cutText = "[CTRL+X]";

const removeUnusedCommands = (str, cutIndex, copyIndex, pasteIndex) => {
  if (cutIndex === 0) {
    let newStr = str.replace(cutText, "");
    return newStr;
  }

  if (pasteIndex === 0) {
    let newStr = str.replace(pasteText, "");
    return newStr;
  }

  if (copyIndex === 0) {
    let newStr = str.replace(copyText, "");
    return newStr;
  }

  return str;
};

const removePasteBeforeCopy = (str, copyIndex, pasteIndex, pasteText) => {
  if (pasteIndex < copyIndex) {
    let newStr = str.replace(pasteText, "");
    return newStr;
  }

  return str;
};

const copyPaste = (croppedStr, copyIndex, copyText, pasteIndex, pasteText) => {
  const truncatedStr = removePasteBeforeCopy(
    croppedStr,
    copyIndex,
    pasteIndex,
    pasteText
  );
  const truncatedCopyIndex = truncatedStr.match(/(\[CTRL\+C\])/)?.index;
  const copiedText = truncatedStr.substring(0, truncatedCopyIndex);

  const initialCleanString = truncatedStr
    .replace(pasteText, copiedText)
    .replace(copyText, "");

  return initialCleanString;
};

const cutPaste = (croppedStr, cutIndex, cutText, pasteIndex, pasteText) => {
  const truncatedStr = removePasteBeforeCopy(
    croppedStr,
    cutIndex,
    pasteIndex,
    pasteText
  );
  const truncatedCutIndex = truncatedStr.match(/(\[CTRL\+X\])/)?.index;
  const croppedText = truncatedStr.substring(0, truncatedCutIndex);

  const initialCleanString = truncatedStr
    .replace(croppedText, "")
    .replace(cutText, "")
    .replace(pasteText, croppedText);

  return initialCleanString;
};

const cleanStrings = (str) => {
  const cutIndex = str.match(/(\[CTRL\+X\])/)?.index;
  const pasteIndex = str.match(/(\[CTRL\+V\])/)?.index;
  const copyIndex = str.match(/(\[CTRL\+C\])/)?.index;
  let cleanString = "";

  const croppedStr = removeUnusedCommands(str, cutIndex, copyIndex, pasteIndex);
  const globalCopies = croppedStr.match(/(\[CTRL\+C\])/g);
  if (croppedStr.match(/(\[CTRL\+X\])/)?.index) {
    cleanString = cutPaste(
      croppedStr,
      cutIndex,
      cutText,
      pasteIndex,
      pasteText
    );
  } else if (globalCopies?.length > 0) {
    for (let i = 0; i < globalCopies.length; i++) {
      const initialCleanString = copyPaste(
        croppedStr,
        copyIndex,
        copyText,
        pasteIndex,
        pasteText
      );

      if (!initialCleanString.match(/(\[CTRL\+C\])/)?.index) {
        cleanString = initialCleanString;
      } else {
        return (cleanString = cleanStrings(initialCleanString));
      }
    }
  } else {
    cleanString = removePasteBeforeCopy(
      croppedStr,
      copyIndex,
      pasteIndex,
      pasteText
    );
  }
  // console.log(cleanString);
  return cleanString;
};

// const copyPaste = (strArr) => {
//   let results = [];
//   for (const str of strArr) {
//     results.push(mapStrings(str));
//   }
//   return results;
// };

module.exports = cleanStrings;
