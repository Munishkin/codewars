//The purpose of this Kata is to develop an arithmetic expression evaluator.

//Your task consists in implementing the methods eval and toString within the
//createOperator function.

// Values as Terminal Expressions
// Key to the understanding of the solution of this Kata is the realization that
// all expressions can be reduced to a value, and a value is just an expression
// that cannot be reduced any further. That is, if we evaluate a value expression,
// we get the value itself.

// Somewhat like this:
//
// function Value(value){
//     this.value = value || 0;
// }
//
// Value.prototype.eval = function(){ return this; };
// Value.prototype.valueOf = function(){ return this.value.valueOf(); };
// Value.prototype.toString = function(){ return this.value.toString(); };

//Compound Expressions

//Now, we can also define more complex expressions by combining values with
//operators, like 3 * 5 or 6 + 2

//In this Kata we have provided a function createOperator that is capable of
//creating different kinds of operators. An operator is a type of expression.
//When they are used, they create new compound expression. You can see some
//predefined operators in the initial Kata's testing code.

// Examples of compound expressions.
//
// var sumExpr = new Add(new Value(3), new Value(5)); //3 + 5
// var mulExpr = new Mul(new Value(6), new Value(2)); //6 * 2
// We can even define more complex expressions like 3 * 5 + 6 / 2

// var a = new Mul(new Value(3), new Value(5));
// var b = new Div(new Value(6), new Value(2));
// var c = new Add(a,b);
// Since all expressions can be evaluated (meaning reduced) to a single value,
//we can see now that our operator expressions are lacking two important
//features: the functions eval and toString.

// eval: should reduce an expression to a Value
// toString: should generate a string with a human-readable representation
// of the expression.
// For instance
//
// c.eval();     //should return Value(18)
// c.toString(); //should return the string '3 * 5 + 6 / 2'

function Value(value){
  this.value = value || 0;
}

Value.prototype.eval = function(){ return this; };
Value.prototype.valueOf = function(){ return this.value.valueOf(); };
Value.prototype.toString = function(){ return this.value.toString(); };

var createOperator = (function() {

  // Use this space to create any shared functions
  let eval = () => {

      // return an instance of Value
      let result = new Value();
      return result;
  }

  // create a helper function for toString to print the compound expressions
  let toString = (operator, exprLeft, exprRight) => {
    // if exprLeft is Value, return the number,
    // otherwise, call toString on exprLeft to return the string
    // if exprRight is Value, return the number,
    // otherwise, call toString on exprRight to return the string
    // return <exprLeft> <operator> <exprRight>
    let leftString = (exprLeft instanceof Value) ? exprLeft.toString() :
      toString(exprLeft.oper, exprLeft.expressions[0], exprLeft.expressions[1]);
    let rightString = (exprRight instanceof Value) ? exprRight.toString() :
      toString(exprRight.oper, exprRight.expressions[0], exprRight.expressions[1]);
    return `${leftString} ${operator} ${rightString}`;
  };

  return function(oper, func){
    // name is the operator +, -, *, /
    // func is the corresponding action to the operator

    // return an Arithmetic object with expression array, eval function and
    // toString function
    return function() {
      this.expressions = [].slice.call(arguments);
      this.oper = oper;

      console.log(oper + ',' + JSON.stringify(this.expressions));

      // assign your eval and toString functions here
      //this.eval = ???
      this.toString = () => {
        return toString(oper, this.expressions[0], this.expressions[1]);
      }
    };
  };

})();


var Add = createOperator("+", function(a,b){ return a + b;});
var Sub = createOperator("-", function(a,b){ return a - b;});
var Mul = createOperator("*", function(a,b){ return a * b;});
var Div = createOperator("/", function(a,b){ return a / b;});
var Exp = createOperator("^", function(a,b){ return Math.pow(a,b);});

var exp = new Add(new Mul(new Value(3),new Value(5)),
                  new Sub(new Mul(new Div(new Value(6),new Value(2)) ,
                                  new Exp(new Value(10),new Value(2))),
                          new Value(273)));
console.log(exp.toString() === "3 * 5 + 6 / 2 * 10 ^ 2 - 273");
//console.log(exp.eval().valueOf() === 42);
//console.log(exp.eval() instanceof Value);
