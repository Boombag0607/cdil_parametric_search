export const convertUrlToName = (str) => {
  const name = str.split("-");

  return name
    .map((namePart) => namePart[0].toUpperCase() + namePart.slice(1))
    .join(" ");
};

export const convertNameToUrl = (str) => {
  return str.toLowerCase().replace(/ /g, "-");
};
