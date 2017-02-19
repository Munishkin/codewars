/**
 * Constructor DependencyInjector
 * @param {Object} - object with dependencies
 */
let DI = function (dependency) {
  this.dependency = dependency;
};

// Should return new function with resolved dependencies
DI.prototype.inject = function (func) {
  
  let currentArgNames = func.toString()
                            .replace(/[/][/].*$/mg,'')
                            .replace(/\s+/g, '')
                            .replace(/[/][*][^/*]*[*][/]/g, '')
                            .split('(')[1]
                            .split(')')[0]
                            .split(',');
 
  // check if all dependencies are resolved
  let isResolved = currentArgNames.every((n) => { return this.dependency[n]; });
  let args = [];
  if (isResolved) {
      args = currentArgNames.map((n) => {
        return this.dependency[n] ? this.dependency[n] : undefined; 
      });
  } 
    
  return function() {
    return func.apply(null, args);
  }
}

let deps = {
  'dep1': function () {return 'this is dep1';},
  'dep2': function () {return 'this is dep2';},
  'dep3': function () {return 'this is dep3';},
  'dep4': function () {return 'this is dep4';}
};
    
let di = new DI(deps);

let myFunc = di.inject(function (dep3, dep1, dep2) {
  return [dep1(), dep2(), dep3()].join(' -> ');
});
console.log (myFunc() === 'this is dep1 -> this is dep2 -> this is dep3')

let deps2 = {
  'app': function () {return 'this is dep1';},
  'logic': function () {return 'this is dep2';},
  'i18n': function () {return 'this is dep3';}
};

let di2 = new DI(deps2);
let myFunc2 = di2.inject(function (nonExistingVar) {
    return nonExistingVar;
});
let di3 = new DI(deps2);
let myFunc3 = di3.inject(function () {
    return arguments.length;
});

console.log (typeof myFunc2() === 'undefined');
console.log (myFunc3() === 0);
