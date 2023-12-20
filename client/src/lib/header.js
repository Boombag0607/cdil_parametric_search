export function convertToSubscript(input) {
    let result = '';
    let i = 0;

    while (i < input.length) {
        if (input[i] === '_') {
        let j = i + 1;
        while (input[j] && input[j] !== '@') {
            j++;
        }
        result += `<sub>${input.substring(i + 1, j)}</sub>`;
            i = j;
        } else if (input[i] === '@') {
            result += ' at ';
            i++;
        } else {
            result += input[i];
            i++;
        }
    }

    return result;
}
  