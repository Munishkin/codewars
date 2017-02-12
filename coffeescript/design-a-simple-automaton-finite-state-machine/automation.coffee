#Create a finite automaton that has three states. Finite automatons are the
#same as finite state machines for our purposes.

#Our simple automaton, accepts the language of A, defined as {0, 1} and should
#have three states,
#q1, q2, and q3.

#q1 is our start state. We begin reading commands from here.
#q2 is our accept state. We return true if this is our last state.

#q1 moves to q2 when given a 1, and stays at q1 when given a 0.
#q2 moves to q3 when given a 0, and stays at q2 when given a 1.
#q3 moves to q2 when given a 0 or 1.

#Our automaton should return whether we end in our accepted state, or not
#(true/false.)

class Automaton
  constructor: ->
    @states = {
      'q1': {0: 'q1', 1: 'q2'}
      'q2': {0: 'q3', 1: 'q2'}
      'q3': {0: 'q2', 1: 'q2'}
    }
    @startState = 'q1'
    @acceptState = 'q2'
    
  readCommands: (commands) ->
    # Return True if we end in our accept state, False otherwise
    finalState = 'q1'
    for c in commands
      finalState = @states[finalState][c]
    finalState is 'q2'

# Do anything necessary to set up your automaton's states, q1, q2, and q3.

a = new Automaton()
# Do anything you need to set up this automaton's states.
isAccepted = a.readCommands ["1", "0", "0", "1", "0"]
console.log(isAccepted is false)

isAccepted = a.readCommands ["1"]
console.log(isAccepted is true)

isAccepted = a.readCommands ["0"]
console.log(isAccepted is false)

isAccepted = a.readCommands ["1", "0", "0", "1", "0", "0"]
console.log(isAccepted is true)
