export function extractStringsInQuotes(mainString) {
  const regex = /"([^"]*)"/g;
  const matches = mainString.match(regex);
  if (matches) {
    const extractedStrings = matches.map((match) => match.replace(/"/g, ""));
    return extractedStrings;
  } else {
    return [];
  }
}
