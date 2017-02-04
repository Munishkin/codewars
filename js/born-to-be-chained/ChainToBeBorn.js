function chainFunctions(fns) {
  for (let fname in fns) {
    let originalFn = fns[fname]; 
    let fn = (...inputs) => { 
      if (this.result != null) {
        inputs.splice(0, 0, this.result);  
      }
      let cloneCF = new chainFunctions(fns);
      cloneCF.result = originalFn.apply(this, inputs);
      return cloneCF
    };
    Object.defineProperty(this, fname, { value: fn });
  }
}
chainFunctions.prototype.execute = function() { return this.result; }

function chain(fns) {
  return new chainFunctions(fns);
}