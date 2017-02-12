function add(a, b) { 
  return a+b;
};

/*function getArgs(func) {
  // First match everything inside the function argument parens.
  var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];
 
  // Split the arguments string into an array comma delimited.
  return args.split(",").map(function(arg) {
    // Ensure no inline comments are parsed and trim the whitespace.
    return arg.replace(/\/\*.*\*\//, "").trim();
  }).filter(function(arg) {
    // Ensure no undefineds are added.
    return arg;
  });
}*/

function defaultArguments(func, params) {
    
  let funStr = func.toString();
  let openParen = funStr.indexOf('(');
  let closeParen = funStr.indexOf(')');
  let argumentList = funStr.substring(openParen+1, closeParen)
                        .split(',')
                        .map((a) => { 
                          return a.trim().split('')[0]; 
                        })
                        .map((a) => { 
                            return a + (params[a]? '=' + params[a] : '');
                        });
  let functionBody = funStr.substring(funStr.indexOf('{') + 1, funStr.length - 1).trim();    
  let newFunc =  Function(argumentList, functionBody);
  return newFunc;
}

var add_ = defaultArguments(add,{b:9});
console.log(add_(10) === 19); // returns 19
console.log(add_(10,7) === 17); // returns 17
console.log(add_()); // returns NaN

add_ = defaultArguments(add_,{b:3, a:2});
console.log(add_(10) === 13) ; // returns 13 now
console.log(add_() === 5); // returns 5

add_ = defaultArguments(add_,{c:3}); // doesn't do anything, since c isn't an argument
console.log(add_(10)); // returns NaN
console.log(add_(10,10) === 20); // returns 20
