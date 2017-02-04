//https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_.28LRU.29
// http://stackoverflow.com/questions/17438595/js-non-enumerable-function
function LRUCache(capacity, init) {
  this.nextTime = 0;
  this.storage = [];
  this.initialCapacity = capacity;
  
  Object.defineProperty(this, 'nextTime', { enumerable: false });
  Object.defineProperty(this, 'storage', { enumerable: false });
  Object.defineProperty(this, 'initialCapacity', { enumerable: false });  
  Object.defineProperty(this, 'size', { get: () => { return this.storage.length; } });
  
  let capacityOption =
      { get: () => { return this.initialCapacity; },
        set: (newCapacity) => {
          this.removeFirstNProperty(this, (this.size - newCapacity));                  
          this.initialCapacity = newCapacity;
        }
     };
  Object.defineProperty(this, 'capacity', capacityOption);
  
  if (init) {
    for (let k in init) { 
      this.storage.push({ k: k, v: init[k], lastAccess: this.nextTime});
      this.nextTime += 1;
    }
  }
  
  for (let i = 0; i < this.size; i++) {
    let key = this.storage[i].k; 
    Object.defineProperty(this, key, this.createPropertyOption(this, key));
  }

  Object.defineProperty(this, 'cache', { value: LRUCache.prototype.cache });
  Object.defineProperty(this, 'delete', { value: LRUCache.prototype.delete });
}

LRUCache.prototype.cache = function(key, value) {
  let p = this.readCacheValue(this, key);
  if (p) { 
    this[key] = value;
    return;
  }
  
  // check if cache is full
  if (this.size === this.capacity) {
    // remove the least access item
    this.removeFirstNProperty(this, 1);
  }
  this.storage.push({ k: key, v: value, lastAccess: this.nextTime});
  this.nextTime += 1; 
  Object.defineProperty(this, key, this.createPropertyOption(this, key)); 
  return this;
}

LRUCache.prototype.delete = function(key) {
  let idx = this.storage.findIndex((e) => { return e.k === key });
  if (idx >= 0) {
    this.storage.splice(idx, 1);
    delete this[key];
    return true;
  }
  let propDescriptor = Object.getOwnPropertyDescriptor(this, key);
  return (propDescriptor && !propDescriptor.configurable) ? false : true;
}

LRUCache.prototype.createPropertyOption = function(object, key) {   
  return  { enumerable: true, configurable: true,
        get: () => { 
          let p = this.readCacheValue(object, key);
          return p? p.v : undefined;
        },
        set: (newValue) => {
          let p = this.readCacheValue(object, key);
          if (p) { p.v = newValue; }
        }
    };
}

LRUCache.prototype.readCacheValue = function(object, key) {
  let p = object.storage.find((e) => { return e.k === key });
  if (p) {
    p.lastAccess = object.nextTime;
    object.nextTime += 1;
    return p;
  }
  return undefined;
}

LRUCache.prototype.removeFirstNProperty = function(object, n) {
  if (n <= 0) { return; }
  object.storage.sort((a, b) => { return a.lastAccess - b.lastAccess; });
  let removed = object.storage.splice(0, n);  
  removed.forEach((e) => { 
    delete object[e.k];
  });
}