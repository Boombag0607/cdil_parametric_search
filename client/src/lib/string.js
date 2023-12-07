export function extractStringsInQuotes(mainString) {
  // Regular expression to match strings enclosed in double quotes
  const regex = /"([^"]*)"/g;

  // Use match method to extract substrings in quotes
  const matches = mainString.match(regex);

  // Check if matches were found
  if (matches) {
    const extractedStrings = matches.map((match) => match.replace(/"/g, ""));
    return extractedStrings;
  } else {
    return [];
  }
}
