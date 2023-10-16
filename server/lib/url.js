const convertUrlToName = (str) => {
  const name = str.split("-");

  return name
    .map((namePart) => namePart[0].toUpperCase() + namePart.slice(1))
    .join(" ");
};

const convertNameToUrl = (str) => {
  return str.toLowerCase().replace(/ /g, "-");
};

(module.exports = convertNameToUrl), convertUrlToName;
