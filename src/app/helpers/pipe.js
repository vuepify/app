export function pipe(initialValue, operators) {
    return operators.reduce((value, operator) => operator(value), initialValue);
}

pipe.replace = (match, to) => value => value.replace(match, to);
pipe.merge = attrs => value => Object.assign(value, attrs);
