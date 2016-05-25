function convertBinToDecimal(input) {
    let l = input.length;
    let output = 0;

    for (let i = 0; i < l; i++) {
        output += Math.pow(2, i) * +input.charAt(l - 1 - i);
    }

    return output;
}

function calculate(...args) {
    return args
        .map(convertBinToDecimal)
        .reduce((a, b) => a + b);
}

console.assert(calculate('10', '10') === 4);
console.assert(calculate('10', '0') === 2);
console.assert(calculate('101', '10') === 7);
console.assert(calculate('101', '10', '1', '10') === 10);
console.assert(calculate('100010110010', '100101110') === 2528);