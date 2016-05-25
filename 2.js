const functions = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine'
];

const operations = [{
    name: 'times',
    operator: '*'
}, {
    name: 'plus',
    operator: '+'
}, {
    name: 'minus',
    operator: '-'
}, {
    name: 'dividedBy',
    operator: '/'
}];

operations
    .forEach((operation, i) => {
        global[operation.name] = (rightOperand) => {
            return operation.operator + rightOperand.toString();
        }
    });

functions
    .forEach((funcName, i) => {
        global[funcName] = (operation) => {
            const VALUE = i;

            if (operation) {
                // This sure looks funnier than .bind();
                return eval(VALUE + operation);
            } else {
                return VALUE;
            }
        }
    });

console.assert(seven(times(five())) === 35);
console.assert(four(plus(nine())) === 13);
console.assert(eight(minus(three())) === 5);
console.assert(six(dividedBy(two())) === 3);
