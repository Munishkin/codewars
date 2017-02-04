
function TicTacToe() {
 // fill out the construction function
 
 this.strategy = [5,1,3,7,9,2,4,6,8];
 this.board = [ 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u', 'u' ]
 this.hasWon = false;
 this.player = '1'
 this.play_as = ''
}

var findFreeCell = (board, list) => {
  let nextMove = list.filter(p => {
    return board[p - 1] === 'u'; 
  });
  if (nextMove && nextMove.length > 0) {
    return nextMove[0];
  }
  return null;
};

var chooseComputerMove = function(board, strategy) {  
  // check if center is occupied
  let nextMove = findFreeCell(board, strategy);
  if (nextMove) {  
    return nextMove
  }
  return 0; 
};

var checkWin = function(board, field, player) {
  // check horizontal
  let index = field - 1;
  if ([2,5,8].includes(field)) {
    index -= 1;
  } else if ([3,6,9].includes(field)) {
    index -= 2;
  }
  
  if (board[index] === player && board[index] === board[index+1] 
    && board[index] === board[index+2]) {
    return true;
  }

  // check vertical
  index = field - 1;
  if ([4,5,6].includes(field)) {
    index -= 3;
  } else if ([7,8,9].includes(field)) {
    index -= 6;
  }
  
  if (board[index] === player && board[index+3] === board[index] 
    && board[index+6] === board[index]) {
    return true;
  }
  
  // check both diagonals
  if (board[0] === player && board[4] === board[0] 
    && board[8] === board[0]) {
    return true;
  }
  if (board[2] === player && board[4] === board[2] 
    && board[6] === board[2]) {
    return true;
  }
  return false
}

var determineOutcome = function(board, move, player) {   
  return checkWin(board, move, player) ? 'Win' : 
    (findFreeCell(board, [1,2,3,4,5,6,7,8,9]) == null ? 'Draw' : 'Neither');  
}

var makeComputerMove = function(board, strategy, player) {

    let newMove = chooseComputerMove(board, strategy);
    board[newMove - 1] = player;
    let outcome = determineOutcome(board, newMove, player);
  
    if (outcome === 'Win') {
      return { 
         hasWon: true,
         command: [newMove, 'I win!']
      };
    } else if (outcome === 'Draw') {
      return {
        hasWon: false,
        command: [newMove, "Draw!"]
      };
    } else {
      return { 
        hasWon: false, 
        command: [newMove, 'Your move?']
      };
    }
}

TicTacToe.prototype.switchPlayer = function() {
  this.player = this.player === '1' ? '2' : '1';
}

TicTacToe.prototype.move = function(field) {

  let newMove;
  let outcome;
  if (this.hasWon) {
    return [0, "Game ended"];
  } else {
    if (field != null && typeof field !== 'undefined') {
      this.play_as = 'human';
      newMove = field;
    } else {
      this.play_as = 'computer';
      let { hasWon, command } = makeComputerMove(this.board, this.strategy, this.player);
      // change player
      this.switchPlayer();
      this.hasWon = hasWon;
      return command;
    }
    
    if (this.board[newMove - 1] !== 'u') {
        // cell is occupied
        return [0, "Illegal move"];
    } else {
        this.board[newMove - 1] = this.player;
        outcome = determineOutcome(this.board, newMove, this.player);
        if (outcome === 'Win') {
          this.hasWon = true;
          return [0, 'You win!'];
        } else if (outcome === 'Draw') {
          // a draw
          return [0, 'Draw!'];
        } else {
            // generate move for next player (computer) if current player is human
            this.switchPlayer();
          //  { this.hasWon, newMove } = makeComputerMove(this.board, this.strategy, this.player);
            let { hasWon, command } = makeComputerMove(this.board, this.strategy, this.player);
            this.hasWon = hasWon;
            this.switchPlayer();
            return command;
         }
      }
    }
  }