/*An event object should work like this:

it has a .subscribe() method, which takes a function and stores it as its handler
it has an .unsubscribe() method, which takes a function and removes it from its handlers
it has an .emit() method, which takes an arbitrary number of arguments and calls all the stored functions with these arguments
As this is an elementary example of events, there are some simplifications:

all functions are called with correct arguments (e.g. only functions will be passed to unsubscribe)
you should not worry about the order of handlers' execution
the handlers will not attempt to modify an event object (e.g. add or remove handlers)
the context of handlers' execution is not important
each handler will be subscribed at most once at any given moment of time. It can still be unsubscribed and then subscribed again
Also see an example test fixture for suggested usage
*/

function Event() {
  //your implementation goes here
}

Event.prototype.subscribe = function() {
  console.log('subscribe:' +  arguments);
}

Event.prototype.unsubscribe = function() {
  console.log('unsubscribe:' +arguments);

}

Event.prototype.emit = function() {
  console.log('emit:' +arguments);
}


// test cases
var event = new Event();

function f() {
    f.calls = (f.calls || 0) + 1;
    console.log(arguments);
    f.args = Array.prototype.slice.call(arguments);
}

event.subscribe(f);
event.emit(1, 'foo', true);

console.log(f.calls === 1); // calls a handler
//console.log(f.args, [1, 'foo', true]); // passes arguments
console.log(f.args[0] === 1 && f.args[1] === 'foo' && f.args[2] === true); // passes arguments

event.unsubscribe(f);
event.emit(2);

console.log(f.calls === 1); //no second call
