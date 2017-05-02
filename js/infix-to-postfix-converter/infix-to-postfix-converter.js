// http://en.wikipedia.org/wiki/Reverse_Polish_notation

// The operators used will be +, -, *, /, and ^ with standard precedence rules
// and left-associativity of all operators but ^.

//Shunting-yard_algorithm
/*While there are tokens to be read:
Read a token.
If the token is a number, then push it to the output queue.
If the token is an operator, o1, then:
  * while there is an operator token o2, at the top of the operator stack and either
    * o1 is left-associative and its precedence is less than or equal to that of o2, or
    * o1 is right associative, and has precedence less than that of o2,
      ** pop o2 off the operator stack, onto the output queue;
    at the end of iteration push o1 onto the operator stack.
If the token is a left parenthesis (i.e. "("), then push it onto the stack.
If the token is a right parenthesis (i.e. ")"):
  * Until the token at the top of the stack is a left parenthesis, pop operators off the stack onto the output queue.
  * Pop the left parenthesis from the stack, but not onto the output queue.
  * If the token at the top of the stack is a function token, pop it onto the output queue.
  * If the stack runs out without finding a left parenthesis, then there are mismatched parentheses.
When there are no more tokens to read:
  * While there are still operator tokens in the stack:
    * If the operator token on the top of the stack is a parenthesis, then there are mismatched parentheses.
    * Pop the operator onto the output queue.
Exit.*/

const LEFT_ASSOC = '+-*/';
const RIGHT_ASSOC = '^';
const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3
};
const DIGITS = '01234567890';
const PARENTHESIS = '()'

const toPostfix = (expression) => {

  const operatorStack = [];
  let result = expression.replace(/\s/g, '')
    .split('')
    .reduce((postfix, o) => {
        console.log({o: o});
        // read a number
        if (DIGITS.indexOf(o) >= 0) {
          postfix += o;
        } else if (LEFT_ASSOC.indexOf(o) >= 0 || RIGHT_ASSOC.indexOf(o) >= 0) {
          // read an operator
          console.log({operatorStack: operatorStack});
          if (operatorStack.length > 0) {
            let o2 = operatorStack[0];
            while ( (LEFT_ASSOC.includes(o) && PRECEDENCE[o] <= PRECEDENCE[o2])
                || (RIGHT_ASSOC.includes(o) && PRECEDENCE[o] < PRECEDENCE[o2])) {
                // pop o2 from operator stack to postfix
                postfix += operatorStack.shift();
                o2 = operatorStack[0];
            }
          }
          console.log({operatorStack: operatorStack});
          // push operator to stack
          operatorStack.unshift(o);
          console.log({operatorStack: operatorStack});
        } else if (o === '(') {
          operatorStack.unshift(o);
          console.log({operatorStack: operatorStack});
        } else if (o === ')') {
          // Until the token at the top of the stack is a left parenthesis,
          // pop operators off the stack onto the output queue.
          console.log({operatorStack: operatorStack});
          let tempOperator = operatorStack.shift();
          while (operatorStack.length > 0 && tempOperator !== '(' ) {
            postfix += tempOperator;
            tempOperator = operatorStack.shift();
          }
          console.log({operatorStack: operatorStack});
          if (tempOperator !== '(') {
            throw 'No matching left parenthesis';
          }
        } else if (DIGITS.indexOf(o) < 0) {
          throw 'Unknown token';
        }
        console.log({postfix: postfix});
        return postfix;
    }, '');

    // pop the operands in the stack
    if (operatorStack.length > 0 && PARENTHESIS.indexOf(operatorStack[0]) >= 0) {
      throw 'Unmatched parenthesis';
    }
    console.log({operatorStack: operatorStack});
    result += operatorStack.join('');
    return result;
}

// console.log(toPostfix("2 + 7 * 5") === '275*+'); // Should return "275*+"
// console.log(toPostfix("2+7*5") === '275*+'); // Should return "275*+"
// console.log(toPostfix("3*3/(7+1)") === '33*71+/'); // Should return "33*71+/"
// console.log(toPostfix("5+(6-2)*9+3^(7-1)"));
console.log(toPostfix("5+(6-2)*9+3^(7-1)") === '562-9*+371-^+'); // Should return "562-9*+371-^+"
