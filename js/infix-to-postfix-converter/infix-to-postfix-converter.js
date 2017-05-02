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

const LEFT_ASSOC = ['+', '-', '*', '/'];
const PRECEDENCE = {
  '+': 1,
  '-': 1,
  '*': 2,
  '/': 2,
  '^': 3
};
const RIGHT_ASSOC = ['^'];
const DIGITS = '01234567890';

const toPostfix = (expression) => {

  const operatorStack = [];
  let result = expression.replace(/\s/g, '')
    .split('')
    .reduce((postfix, o) => {
        // read a number
        if (o.indexOf(LEFT_ASSOC) >= 0 || o.indexOf(RIGHT_ASSOC) >= 0) {
          // read an operator
          if (operatorStack.length > 0) {
            const o2 = operatorStack[0];
            if ( (LEFT_ASSOC.includes(o) && PRECEDENCE[o] <= PRECEDNCE[o2])
                || (RIGHT_ASSOC.includes(o) && PRECEDENCE[o] < PRECEDNCE[o2])) {
                // pop o2 from operator stack to postfix
                postfix += operatorStack.shift();
            }
          }
          // push operator to stack
          operatorStack.unshift(o);
        } else if (o === '(') {
          operatorStack.unshift(o);
        } else if (o === ')') {
          // Until the token at the top of the stack is a left parenthesis,
          // pop operators off the stack onto the output queue.
          let o = operatorStack.shift();
          while (operatorStack.length > 0 && o !== '(' ) {
            postfix += o;
            o = operatorStack.shift();
          }
        } else if (o.indexOf(DIGITS) < 0) {
          throw new Error('unknown operator');
        }
        return postfix;
    }, '');

    // pop the operands in the stack
    return result;
}

console.log(toPostfix("2 + 7 * 5") === '275*+'); // Should return "275*+"
// console.log(toPostfix("2+7*5") === '275*+'); // Should return "275*+"
// console.log(toPostfix("3*3/(7+1)") === '33*71+/'); // Should return "33*71+/"
// console.log(toPostfix("5+(6-2)*9+3^(7-1)") === '562-9*+371-^+'); // Should return "562-9*+371-^+"
