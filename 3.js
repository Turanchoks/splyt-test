function defaultArguments(func, defaultArgs) {
    let FN_ARGS = /^[^\(]*\(\s*([^\)]*)\)/m;
    let funcArgs = func.funcArgs || func
        .toString()
        .match(FN_ARGS)[1]
        .split(',')
        .map((str) => str.trim());

    let newFunc = function(...args) {
        let defaultArgsArr = funcArgs
            .map((el) => {
                if (el in defaultArgs) {
                    return defaultArgs[el];
                } else {
                    return undefined;
                }
            });

        for (let i = 0; i < args.length; i++) {
            if (args[i]) {
                defaultArgsArr[i] = args[i];
            }
        }

        return func.apply(undefined, defaultArgsArr);
    };

    newFunc.funcArgs = funcArgs;
    return newFunc;
}

function add(a, b) {
    return a + b;
};

const add2 = defaultArguments(add, { b: 9 });

console.assert(add2(10) === 19);
console.assert(add2(10, 7) === 17);
console.assert(isNaN(add2()));

const add3 = defaultArguments(add2, { b: 3, a: 2 });
console.assert(add3(10) === 13);
console.assert(add3() === 5);
console.assert(add3(undefined, 10) === 12);

const add4 = defaultArguments(add, { c: 3 });

console.assert(isNaN(add4(10)));
console.assert(add4(10, 10) === 20);
