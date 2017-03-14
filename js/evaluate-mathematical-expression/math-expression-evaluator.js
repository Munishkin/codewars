// Given a mathematical expression as a string you must return the result as a number.
//
// Numbers
// Number may be both whole numbers and/or decimal numbers. The same goes for the returned result.
//
// Operators
// You need to support the following mathematical operators:
//
// Multiplication *
// Division /
// Addition +
// Subtraction -
// Operators are always evaluated from left-to-right, and * and / must be evaluated
// before + and -.
//
// Parentheses
//
// You need to support multiple levels of nested parentheses, ex. (2 / (2 + 3.33) * 4) - -6
//
// Whitespace
//
// There may or may not be whitespace between numbers and operators.
//
// An addition to this rule is that the minus sign (-) used for negating numbers
//and parentheses will never be separated by whitespace. I.e., all of the
//following are valid expressions.

// 1-1    // 0
// 1 -1   // 0
// 1- 1   // 0
// 1 - 1  // 0
// 1- -1  // 2
// 1 - -1 // 2
//
// 6 + -(4)   // 2
// 6 + -( -4) // 10

//Reference:   https://en.wikipedia.org/wiki/Shunting-yard_algorithm
//             http://www.sunshine2k.de/coding/java/SimpleParser/SimpleParser.html#ch4
let calc = (expression) => {
  // evaluate `expression` and return result
  // replace all space with empty string in expression
  // use Shunting-yard_algorithm to convert expression in infix notation
  // to postfix notation string
  // While there are tokens to be read:
  //    Read a token.
  //    If the token is a number, then push it to the output queue.
  //    If the token is an operator, o1, then:
  //      while there is an operator token o2, at the top of the operator stack and either
  //         o1 is left-associative and its precedence is less than or equal to that of o2 , or
  //         o1 is right associative, and has precedence less than that of o2,
  //            pop o2 off the operator stack and push to output queue
  //      at the end of iteration push o1 onto the operator stack.
  // If the token is a left parenthesis (i.e. "("), then push it onto the operator stack.
  // If the token is a right parenthesis (i.e. ")"):
  //    Until the token at the top of the stack is a left parenthesis,
  //    pop operators off the operator stack and push it to ouput queue
  //    Pop the left parenthesis from the stack, but not onto the output stack.
  // When there are no more tokens to read:
  //  While there are still operator tokens in the stack:
  //  Pop the operator out of operator stack and push to output queue

  const digits = '0123456789.';
  const operators = ['+', '-', '*', '/', 'negate'];
  const table = {
      '+': { pred: 2, func: (a, b) => { return a + b; }, assoc: "left" },
      '-': { pred: 2, func: (a, b) => { return a - b; }, assoc: "left" },
      '*': { pred: 3, func: (a, b) => { return a * b; }, assoc: "left" },
      '/': { pred: 3, func: (a, b) => {
                        if (b != 0) { return a / b; } else { return 0; }
                      }
            }, assoc: "left",
      'negate': { pred: 4, func: (a) => { return -1 * a; }, assoc: "right" }
  };

  expression = expression.replace(/\s/g, '');
  let operStack = [];
  let outputQueue = [];
  let idx = 0;
  let strNum = '';

  let tokenNumber = true;  // need to tokenize number
  let token = '';
  while (idx < expression.length) {
    // tokenize expression to either number (integer or decimal, positive/negative)
    // or operator
    let ch = expression[idx];
    // operator found
    if (operators.includes(ch)) {
      // check look ahead
      if (strNum !== '') {
        outputQueue.push(new Number(strNum));
        strNum = '';
      }

      // determine if it is minus sign or subtract operator
      if (ch === '-') {
        // look at previous and next characters
        // next characte is number or ( and previous character is operator or (, then minus sign
        // otherwise, subtract operator
        // grammar of unary:
        // unary := number
        // unary := '-' + unary
        if (idx == 0) {
          ch = 'negate';   // negate
        } else {
          let nextCh = expression[idx+1];
          let prevCh = expression[idx-1];
          if ((digits.includes(nextCh) || nextCh === '(' || nextCh === '-') &&
            (operators.includes(prevCh) || expression[idx-1] === '(')) {
              ch = 'negate';
          }
        }
      }

      if (operStack.length > 0) {
        // check the precedence of the top operator
        let topOper = operStack[operStack.length - 1];
        while (operStack.length > 0 && table[topOper] &&
          ((table[ch].assoc === 'left' && table[ch].pred <= table[topOper].pred) ||
          (table[ch].assoc === 'right' && table[ch].pred < table[topOper].pred))) {
          // pop the operator in the stack to output queue
          outputQueue.push(operStack.pop());
          topOper = operStack[operStack.length - 1];
        }
      }
      operStack.push(ch);
    } else if (digits.includes(ch)) { // tokenize number
      strNum += ch
    } else if (ch === '(') {
      operStack.push(ch);
    } else if (ch === ')') {
      if (strNum !== '') {
        outputQueue.push(new Number(strNum));
        strNum = '';
      }
      // pop operator in operator stack until ( is detected
      while (operStack.length > 0 && operStack[operStack.length - 1] !== '(') {
          outputQueue.push(operStack.pop());
      }
      // discard ( parenthesis
      if (operStack.length > 0) { operStack.pop(); }
    }
    idx++;
  }

  // push last number token
  if (strNum !== '') { outputQueue.push(new Number(strNum)); }
  outputQueue = outputQueue.concat(operStack.reverse())

  // evaluate postfix string
  // Evaluation of postfix notation can also be done easily using a stack.
  // The procedure is simple: when we come across a number we push it on the stack.
  // If we encounter an operator, pop the two operands from the stack, apply the operator and
  // push the result on the stack.
  // return the only element in the stack as result
  let resultStack = [];
  while (outputQueue.length > 0) {
    let ch = outputQueue.shift();
    if (operators.includes(ch)) {
      let num1, num2, subResult;
      if (ch === 'negate') {
        resultStack.push(table[ch].func(resultStack.pop()));
      } else {
        let [num2, num1] = [resultStack.pop(), resultStack.pop()];
        resultStack.push(table[ch].func(num1, num2));
      }
    } else {
      resultStack.push(ch);
    }
  }
  return resultStack.pop().valueOf();
};

var tests = [
  ['1+1', 2],
  ['1 - 1', 0],
  ['1* 1', 1],
  ['1 /1', 1],
  ['-123', -123],
  ['123', 123],
  ['2 /2+3 * 4.75- -6', 21.25],
  ['12* 123', 1476],
  ['2 / (2 + 3) * 4.33 - -6', 7.732],
  ['6 + -( -4)', 10],
  ['6 + -(4)', 2],
  ['12* 123/-(-5 + 2)', 492],
  ['12* 123/(-5 + 2)', -492],
  ['(123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) - (123.45*(678.90 / (-2.5+ 11.5)-(((80 -(19))) *33.25)) / 20) + (13 - 2)/ -(-11)', 1],
  ['((2.33 / (2.9+3.5)*4) - -6)', 7.45625],
  ['123.45*(678.90 / (-2.5+ 11.5)-(80 -19) *33.25) / 20 + 11', -12042.760875],
  ['1- -1', 2],
  ['1 - -1', 2],
  ['1--(--1)', 2],
];

tests.forEach(function (m) {
  console.log(calc(m[0]) === m[1]);
});
