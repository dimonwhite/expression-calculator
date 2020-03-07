function eval() {
    // Do not use eval!!!
    return;
}

const calculate = {
    addition: (a, b) => (a + b),
    subtraction: (a, b) => (a - b),
    multiplication: (a, b) => (a * b),
    division: (a, b) => {
        if (b === 0) {
            throw new Error('TypeError: Division by zero.');
        }
        return (a / b);
    },
    math(string) {
        let a, b, symbol, result;
        a = +string.match(/(?:(?:-)?\d*[.]?\d+)/);
        string = string.replace(/(?:(?:-)?\d*[.]?\d+)/, '');
        symbol = string[0];
        b = +string.slice(1);
        switch (symbol) {
            case '+': {
                result = this.addition(a,b);
                break;
            }
            case '-': {
                result = this.subtraction(a,b);
                break;
            }
            case '*': {
                result = this.multiplication(a,b);
                break;
            }
            case '/': {
                result = this.division(a,b);
                break;
            }
        }

        return result;
    }
}, sequence = [['*', '/'], ['+', '-']];



function expressionCalculator(expr) {
    expr = expr.replace(/ /g, '');

    let openBrackets = expr.match(/[\(]/g) ? expr.match(/[\(]/g).length : 0,
        closeBrackets = expr.match(/[\)]/g) ? expr.match(/[\)]/g).length : 0;

    if (openBrackets !== closeBrackets) {
        throw new Error('ExpressionError: Brackets must be paired');
    }

    while (expr.match(/[\(]/g)) {
        let openBracket = expr.lastIndexOf('('),
            closeBracket = expr.indexOf(')', openBracket);
        expr = expr.replace(expr.slice(openBracket, closeBracket + 1), expressionCalculator(expr.slice(openBracket + 1, closeBracket)));
    }

    while (/\d+[+\-*/]/.test(expr)) {
        sequence.forEach(item => {
            let reg = new RegExp('(?:(?:^-)?\\d*[.]?\\d+)[\\' + item.join('\\') + '](?:(?:-)?\\d*[.]?\\d+)', 'i');
            while (reg.test(expr)) {
                let string = expr.match(reg)[0];
                expr = expr.replace(string, calculate.math(string).toFixed(20));
            }
        });
    }

    return +expr;
}

module.exports = {
    expressionCalculator
}