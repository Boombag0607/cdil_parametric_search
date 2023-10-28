export function removeCategorySuffix(subCatString, catString) {
  let catArr = catString.split(" ");
  let ret = subCatString;
  for (let i = 0; i < catArr.length; i++) {
    if (subCatString.includes(catArr[i])) {
      ret = ret.replace(catArr[i], "");
      if (ret.includes(" s")) {
        ret = ret.replace(" s", "");
      }
    } 
  }
  return ret;
}
