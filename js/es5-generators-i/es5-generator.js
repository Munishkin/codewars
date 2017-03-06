//Generators and Iterators are new ES6 features that will allow things like this:

// function* fibonacci() {
//     let [prev, curr] = [0, 1];
//     for (;;) {
//         [prev, curr] = [curr, prev + curr];
//         yield curr;
//     }
// }
// Using them in this way, we can do amazing things:

// let seq = fibonacci();
// print(seq.next()); // 1
// print(seq.next()); // 2
// print(seq.next()); // 3
// print(seq.next()); // 5
// print(seq.next()); // 8
// This is powerful, but until a few months later, ES6 will not be born.

// The goal of this kata is to implement pseudo-generators with ES5.
//
// The first thing to do is to implement the generator function:

// function generator(sequencer) {
//    ...
// }
// generator(sequencer[, arg1, arg2, ...]) receives a sequencer function to generate
// the sequence and returns and object with a next() method.
// When the next() method is invoked, the next value is generated.
// The method could receive as well optional arguments to be passed to the sequencer function.

// This is an example of a dummy sequencer:
//
// function dummySeq() {
//   return function() {
//     return "dummy";
//   };
// }
// To test generator(), you could use dummySeq() in this way:

// var seq = generator(dummySeq);
// seq.next(); // 'dummy'
// seq.next(); // 'dummy'
// seq.next(); // 'dummy'
// ....
// When you're done, you should implement the following generators (I think the
// functions are self explanatory):

// function factorialSeq() {...} // 1, 1, 2, 6, 24, ...
// function fibonacciSeq() {...} // 1, 1, 2, 3, 5, 8, 13, ...
// function rangeSeq(start, step) {...} // rangeSeq(1, 2)  -> 1, 3, 5, 7, ...
// function primeSeq() {...} // 2, 3, 5, 7, 11, 13, ...
// partialSumSeq(1, 3, 7, 2, 0) {...} // 1, 4, 11, 13, 13, end
// You can use any of them in the same way:

// var seq = generator(factorialSeq);
// seq.next(); // !0 = 1
// seq.next(); // !1 = 1
// seq.next(); // !2 = 2
// seq.next(); // !3 = 6
// seq.next(); // !4 = 24
// ...
// There are some sequences which are infinite and others are not. For example:

// primeSeq: Is infinite
// partialSumSeq: Is limited to the passed values.
// When the sequence is done (in finite sequences), if you call seq.next() again,
// it should produce an error.


function SequenceGenerator(sequencer, args) {
    this.func = sequencer(...args);
}

SequenceGenerator.prototype.next = function() {
  return this.func.apply(null);
}

function generator(sequencer) {
  let args = [].slice.call(arguments)
  // remove the mandatory sequencer function
  args.splice(0, 1);
  return new SequenceGenerator(sequencer, args);
}

function dummySeq() {
  return () => { return "dummy"; };
}

function factorialSeq() {
    let [counter, fact] = [-1, 1];
    return () => {
      ++counter;
      if (counter <= 0) { fact = 1; }
      else { fact = fact * counter; }
      return fact;
    }
}

function fibonacciSeq() {
  let [prev, current] = [0, 1];
  return () => {
    let result = current;
    [prev, current] = [current, prev + current];
    return result;
  }
}

function rangeSeq(start, step) {
  let i = 0;
  return () => {
    let result =  start + i * step;
    i++;
    return result;
  }
}

function primeSeq() {
}

function partialSumSeq() {
}

let seq = generator(dummySeq);
console.log (seq.next() === 'dummy');
console.log(seq.next() === 'dummy');
console.log(seq.next() === 'dummy');

let seq2 = generator(factorialSeq);
console.log(seq2.next() === 1); // 0! = 1
console.log(seq2.next() === 1); // 1! = 1
console.log(seq2.next() === 2); // 2! = 2
console.log(seq2.next() === 6); // 3! = 6
console.log(seq2.next() === 24); // 4! = 6

let seq3 = generator(fibonacciSeq);
console.log(seq3.next() === 1); // fib(0) = 1
console.log(seq3.next() === 1); // fib(1) = 1
console.log(seq3.next() === 2); // fib(2) = 2
console.log(seq3.next() === 3); // fib(3) = 3
console.log(seq3.next() === 5); // fib(4) = 5
console.log(seq3.next() === 8); // fib(5) = 8
console.log(seq3.next() === 13); // fib(6) = 13

let seq4 = generator(rangeSeq, 5, 3); // 5,8,11,14,17
console.log(seq4.next() === 5);
console.log(seq4.next() === 8);
console.log(seq4.next() === 11);
console.log(seq4.next() === 14);

/*
let seq5 = generator(primeSeq);
console.log(seq5.next() === 2);
console.log(seq5.next() === 3);
console.log(seq5.next() === 5);
console.log(seq5.next() === 7);
console.log(seq5.next() === 11);
console.log(seq5.next() === 13);
console.log(seq5.next() === 17);
console.log(seq5.next() === 19);

let seq6 = generator(partialSumSeq, -1, 4, 2, 5);
console.log(seq6.next() === -1);
console.log(seq6.next() === 3);
console.log(seq6.next() === 5);
console.log(seq6.next() === 10); //End of sequence
seq.next();  // expect exception thrown
*/
//Test.expectError('End of sequence error expected', seq.next);
