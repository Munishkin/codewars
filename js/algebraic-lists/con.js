
// var numbers  = new Cons(1, new Cons(2, new Cons(3, new Cons(4, new Cons(5, null)))));
// console.log(numbers.toArray()); //yields [1,2,3,4,5]

// The New Requirements
//
// Now, the team is convinced that this is the way to go and they would like to
// build the library around this cool new data type, but they want you to provide
// a few more features for them so that they can start using this type in solving
// some real world problems.
// You have been reading about a technique called applicative programming which
// basically consists in applying a function to every element in a list. So, you
// gave it some thought and you have decided to start adding features like filter,
// map and reduce. Basically you want to provide equivalent functionality to that
// of JavaScript arrays and in the future even more.

// So, you will now add:
//
// filter: create a new algebraic list containing only the elements that satisfy a
//         predicate function.
// map : create a new list in which every element is the result of applying a
//       function provided as argument.
// fromArray: a convenient complementary method that creates a list out of a
//            JavaScript array.
// For this Kata, the definition of Cons and the prototypal method toArray are
// already loaded in your environment.

// constructor
function Cons(head,tail){
    this.head = head;
    this.tail = tail;
}

function toArray(list) {
    if(list){
        var more = list.tail;
        return [list.head].concat(more? toArray(more) : []);
    }
    return [];
}

Cons.prototype.toArray = function(){ return toArray(this); };

let fromArray = (array) => {
  // create an empty con list
  if (!array || array.length === 0) { return new Cons(null, null); }
  // create a con list with exactly 1 element
  else if (!array || array.length === 1) { return new Cons(array[0], null); }
  // more than 1 element, split array into head and the rest of the elements
  // create con list for test and prepend head to it
  let [head, ...tail] = array;
  return new Cons(head, fromArray(tail));
}

Cons.fromArray = function(array){
  //provide a convenient method to convert a JavaScript array
  //to an algebraic list.
  return fromArray(array);
};

function filter(list, predicate){
  //return a new list containing only elements
  //that satisfy the predicate function.
  if (!list) { return null; }
  if (list && list.head && list.tail == null) {
    return predicate(list.head) ? new Cons(list.head, null) : null;
  }
  let tailFilter = filter(list.tail, predicate);
  // pass the predicate, element is retained
  return predicate(list.head) ? new Cons(list.head, tailFilter) : tailFilter;
}

function map(list, mapper){
  //TODO: return a new list containing all elements
  //resulting from applying the mapper functiont to them
  if (!list) { return null; }
  if (list && list.head && list.tail == null) { return new Cons(mapper(list.head), null); }
  // invoke mapper to return the result of head and construct con list of the tail
  return new Cons(mapper(list.head), map(list.tail, mapper));
}

Cons.prototype.filter = function(predicate){ return filter(this,predicate); };
Cons.prototype.map = function(mapper){ return map(this, mapper); };


let noNumber = Cons.fromArray([]);
console.log(JSON.stringify(noNumber));
console.log(noNumber.toArray());

let singleNumber = Cons.fromArray([1]);
console.log(JSON.stringify(singleNumber));
console.log(singleNumber.toArray());

let numbers  = Cons.fromArray([1,2,3,4,5]);
console.log(JSON.stringify(numbers));
console.log(numbers.toArray());
console.log(numbers.filter(function(n){ return n % 2 === 0; }).toArray());  //yields [2,4]
console.log(numbers.map( function(n){ return n * n; }).toArray()); //yields [1,4,9,16,25]

let digits = Cons.fromArray(["1","2","3","4","5"]);
let integers = digits.map(function(s){return parseInt(s);})
                     .filter(function(n){ return n > 3;})
                     .toArray(); //yields [4,5]
console.log(integers);
