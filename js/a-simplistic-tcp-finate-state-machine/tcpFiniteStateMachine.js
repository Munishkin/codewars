function traverseTCPStates(eventList){
  var state = "CLOSED";  // initial state, always
  // Traversal code goes here
  var tcpStates = {  
    'CLOSED' : [{ event: 'APP_PASSIVE_OPEN', new_state: 'LISTEN' }, { event: 'APP_ACTIVE_OPEN',  new_state: 'SYN_SENT'}],
    'LISTEN': [ { event: 'RCV_SYN', new_state: 'SYN_RCVD' }, 
                { event: 'APP_SEND', new_state: 'SYN_SENT' },
                { event: 'APP_CLOSE', new_state: 'CLOSED' } ], 
    'SYN_RCVD': [ { event: 'APP_CLOSE', new_state: 'FIN_WAIT_1' }, 
                  { event: 'RCV_ACK', new_state: 'ESTABLISHED' } ],
    'SYN_SENT': [ { event: 'RCV_SYN', new_state: 'SYN_RCVD' }, 
                  { event: 'RCV_SYN_ACK', new_state: 'ESTABLISHED' }, 
                  { event: 'APP_CLOSE', new_state: 'CLOSED' } ], 
    'ESTABLISHED': [ { event: 'APP_CLOSE', new_state: 'FIN_WAIT_1' }, { event: 'RCV_FIN', new_state: 'CLOSE_WAIT' } ], 
    'FIN_WAIT_1': [ { event: 'RCV_FIN', new_state: 'CLOSING' },
                    { event: 'RCV_FIN_ACK', new_state: 'TIME_WAIT' },
                    { event: 'RCV_ACK', new_state: 'FIN_WAIT_2' } ], 
    'CLOSING': [ { event: 'RCV_ACK', new_state: 'TIME_WAIT' } ], 
    'FIN_WAIT_2': [ { event: 'RCV_FIN', new_state: 'TIME_WAIT' } ],
    'TIME_WAIT': [ { event: 'APP_TIMEOUT', new_state: 'CLOSED' } ], 
    'CLOSE_WAIT': [ { event: 'APP_CLOSE', new_state: 'LAST_ACK' } ],
    'LAST_ACK': [ { event: 'RCV_ACK', new_state: 'CLOSED' } ]
  };

  eventList.forEach((event) => {
    if (state !== 'ERROR' && tcpStates[state]) {
      var nextTransition =  tcpStates[state].find((transition) => {
        return transition.event === event;
      });
      if (typeof nextTransition !== 'undefined' && nextTransition != null) {
        state = nextTransition.new_state;
      } else {
        state = 'ERROR';
      }
    } else {
      state = 'ERROR';
    }
  });  
  return state;
}