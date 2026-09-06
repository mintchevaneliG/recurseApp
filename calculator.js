const display = document.getElementById('display');

function appendToDisplay(value) {
    if (display.value === '0' || display.value.includes('Error') || display.value.length > 15) {
        display.value = value;
    } else if (value === '.') {
        const currentNumber = display.value.split(/[+\-*/%()]/).pop();
        if (!currentNumber.includes('.')) display.value += value;
    } else {
        display.value += value;
    }
}

function clearLastChar() {
    display.value = display.value.slice(0, -1);
}

function clearAll() {
    display.value = '';
}

function evaluateExpression(expression) {
    const tokens = expression.match(/\d*\.?\d+|[()+\-*/%]/g);
    if (!tokens || tokens.join('') !== expression.replace(/\s+/g, '')) {
        throw new Error('Invalid expression');
    }

    let position = 0;

    function parseExpression() {
        let value = parseTerm();

        while (tokens[position] === '+' || tokens[position] === '-') {
            const operator = tokens[position++];
            const nextValue = parseTerm();
            value = operator === '+' ? value + nextValue : value - nextValue;
        }

        return value;
    }

    function parseTerm() {
        let value = parseFactor();

        while (true) {
            let operator = tokens[position];
            if (!['*', '/', '%'].includes(operator)) {
                if (operator === '(' || (operator && !Number.isNaN(Number(operator)))) {
                    operator = '*';
                } else {
                    break;
                }
            } else {
                position++;
            }

            if (operator === '%' && !tokens[position]) {
                value /= 100;
                break;
            }

            const nextValue = parseFactor();

            if (operator === '/' && nextValue === 0) {
                throw new Error('Division by zero');
            }

            switch (operator) {
                case '*':
                    value *= nextValue;
                    break;
                case '/':
                    value /= nextValue;
                    break;
                case '%':
                    value = (value / 100) * nextValue;
                    break;
            }
        }

        return value;
    }

    function parseFactor() {
        const token = tokens[position++];

        if (token === '-') return -parseFactor();
        if (token === '(') {
            const value = parseExpression();
            if (tokens[position++] !== ')') throw new Error('Invalid expression');
            return value;
        }
        if (!token || Number.isNaN(Number(token))) throw new Error('Invalid expression');

        return Number(token);
    }

    const result = parseExpression();
    if (position !== tokens.length) throw new Error('Invalid expression');
    return result;
}

function calculate() {
    try {
        const result = evaluateExpression(display.value);
        display.value = result;
    } catch (error) {
        display.value = "Error, please try again";
    }
}