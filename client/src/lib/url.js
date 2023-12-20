export const convertUrlToName = (str) => {
  const decodedStr = str.split("-").map((namePart) => {
    const decodedNamePart = decodeURIComponent(namePart);
    return decodedNamePart[0].toUpperCase() + decodedNamePart.slice(1);
  }).join(" ");
  const replacedSlash = decodedStr.replace(/_slash_/g, "/");

  const index = replacedSlash.indexOf("/");

  if (index !== -1 && replacedSlash[index + 1]) {
    const capitalized = replacedSlash.charAt(index + 1).toUpperCase();
    const updatedStr = replacedSlash.slice(0, index + 1) + capitalized + replacedSlash.slice(index + 2);
    return updatedStr;
  }

  return replacedSlash;
};

export const convertNameToUrl = (str) => {
  const replacedSpaces = str.toLowerCase().replace(/ /g, "-");
  const replacedSlash = replacedSpaces.replace(/\//g, "_slash_");
  
  return replacedSlash;
};
