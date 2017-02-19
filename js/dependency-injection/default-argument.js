function defaultArguments(func, params) {
  
   var defaultArgs = [];
  
  var currentArgNames = func.toString()
                            .replace(/[/][/].*$/mg,'')
                            .replace(/\s+/g, '')
                            .replace(/[/][*][^/*]*[*][/]/g, '')
                            .split('(')[1]
                            .split(')')[0]
                            .split(',');

console.log('this.argNames: ' +   this.argNames);    
console.log('currentArgNames 1: ' +   currentArgNames);    
    console.log('func: ' + func.toString());
    console.log('params: ' + JSON.stringify(params));


  if (!this.argNames || currentArgNames[0] !== '') {
    this.argNames = currentArgNames;
  }
  
console.log(' this.argNames: ' +    this.argNames);    
  
  
  for (var i = 0; i < this.argNames.length; i++) {
    var defaultParam = params[this.argNames[i]];

    if (defaultParam) defaultArgs[i] = params[this.argNames[i]];
  }

console.log('defaultParam: ' +   defaultParam);    

  
  return function() {
    var currentArgs = defaultArgs.slice();
    var argsArray = [].slice.call(arguments);

    console.log('currentArgs 2: ' + currentArgs);

    console.log("arguments:" + JSON.stringify(arguments));
    console.log(argsArray);

    for (var i = 0; i < argsArray.length; i++) {
      var newArg = argsArray[i];
      
      currentArgs[i] = newArg;
    }

    console.log('currentArgs 3: ' + currentArgs);

    return func.apply(null, currentArgs);
  }
}
