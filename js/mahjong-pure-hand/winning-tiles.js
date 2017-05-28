/*Mahjong is based on draw-and-discard card games that were popular in 18th and 
19th century China and some are still popular today.

In each deck, there are three different suits numbered 1 to 9, which are called 
Simple tiles. To simplify the problem, we talk about only one suit of simple tiles 
in this kata (and that's what the term Pure Hand means). Note that there are 
EXACTLY 4 identical copies of each kind of tiles in a deck.

In each of Mahjong games, each of the 4 players around the table has 13 tiles. 
They take turns drawing a tile from the tile walls and then discarding one of 
the tiles from their hands. One wins the game if that player holds a 
combination of tiles as defined below:

A regular winning hand consists of 4 Melds and 1 Pair. Each meld of tiles 
can be 3 identical or consecutive tiles of a suit, e.g. 222 or 456.
*/

/*
Task

Complete a function to work out all the optional tiles to form a regular 
winning hand with the given tiles.

Input
A string of 13 non-zero digits in non-decreasing order, denoting different 
tiles of a suit.
  
Output
A string of unique non-zero digits in ascending order.
*/

const FOUR_MELDS_LEN = 12;
const HAND_LEN = FOUR_MELDS_LEN + 2;
const IDENTICAL_PIECES = 3;
const PAIR_LEN = 2;
const MAX_PIECES = 4;

const PONG_COMBINATIONS = {
  1: [ [0] ],
  2: [ [0], [1], [0, 1]],
  3: [ [0], [1], [2], [0, 1], [0, 2], [1, 2], [0, 1, 2]],
  4: [ [0], [1], [2], [3], [0,1], [0,2], [0,3],[1,2],[1,3],[2,3], 
       [0,1,2],[0,1,3],[0,2,3],[1,2,3], [0, 1, 2, 3] ]
}


const hasWinningHand = (tiles, tile) => {
  // tally the occurrence of each tile
  // find tile that has >= 2 pieces
  // make it as a pair,  determine if the remaining 12 pieces can form 4 Melds
  //  - 4 groups of consecutive tiles or
  //  - 3 groups of consecutive tiles and 1 group of 3 identical tiles
  //  - 2 groups of consecutive tiles and 2 group of 3 identical tiles
  //  - 1 groups of consecutive tiles and 3 group of 3 identical tiles
  //  - 0 groups of consecutive tiles and 4 group of 3 identical tiles
  
  const hand = `${tiles}${tile}`.split('');
  if (hand && hand.length !== HAND_LEN) { return ''; }
  
  const counts = hand.reduce((acc, o) => {
              acc[o] = (acc && acc[o] && acc[o] + 1) || 1;
              return acc;
          }, {});
  const pairs = Object.keys(counts).filter((t) => {
    return counts[t] >= PAIR_LEN;
  });

  // need to check that each tile is between 0 and 4
  const tooManyPieces = Object.keys(counts).some((t) => {
    return counts[t] < 0 || counts[t] > MAX_PIECES;
  });
  
  if (tooManyPieces) { return ''; }
  
  const buildThreeConsecutiveTiles = (combination, countsCopy) => {
    for (let i = 1; i <= 7; i++) {
      //console.log({countsCopy: countsCopy});
      let sheungCombination = '';
      for (let j = i; j <= 7; j++) {
        while (countsCopy[j] >= 1 && countsCopy[j+1] >= 1 && countsCopy[j+2] >= 1) {
          countsCopy[j] -= 1;
          countsCopy[j+1] -= 1;
          countsCopy[j+2] -= 1;
          sheungCombination += `${j}${j+1}${j+2}`;
        }
      }
      if ((combination.length + sheungCombination.length) === FOUR_MELDS_LEN) {
        return combination + sheungCombination;
      } else {
        // restore value
        sheungCombination.split('').forEach((t) => {
          countsCopy[t] += 1;
        });
      }  
    }
    return '';
  }

  const hasFourMelds = (counter) => {
    
    // remove 3 identical pieces, from 0 to 4 groups
    const pongList = Object.keys(counter)
      .filter((t) => { return counter[t] >= IDENTICAL_PIECES; });
    
    const countsCopy = JSON.parse(JSON.stringify(counter));
    let combination = '', combo = null;
    
    // can a winning hand be made without pong
    let feasibleCombination = buildThreeConsecutiveTiles('', countsCopy);
    if (feasibleCombination) { return feasibleCombination; }
    
    if (pongList.length > 0) {    
      // try pong 1, 2, 3 and up to 4 times
      const combos = PONG_COMBINATIONS[pongList.length];
      for (let w = 0; w < combos.length; w++) {
        combination = '';
        combo = combos[w];
        for (let k = 0; k < combo.length; k++) {
          const tile = pongList[combo[k]];
          countsCopy[tile] -= IDENTICAL_PIECES;
          combination += `${tile}${tile}${tile}`;
        }  // end combine pong
        
       feasibleCombination = buildThreeConsecutiveTiles(combination, countsCopy);
       if (feasibleCombination) { return feasibleCombination; }
      
        if (combination) {
          combination.split('').forEach((t) => {
            countsCopy[t] += 1;
          });
        }
      } // end loop combos
      return '';            
    }    
    return '';
  }
  
  for (let i = 0; i < pairs.length; i++) {
    counts[pairs[i]] -= PAIR_LEN;
    const combination = hasFourMelds(counts);
    if (combination) {
      return true;
    }   
    counts[pairs[i]] += PAIR_LEN; 
  }    
  return false;
}

const solution = (tiles) => {
  // for tile from 1 to 9, insert tile to tiles to form a hand with 14 tiles
  // if hand is a winning hand, then append tile to result
  // when done, return result
  let result = '';
  for (let i = 1; i <= 9; i++) {
    if (hasWinningHand(tiles, i)) {
      result += i;
    }
  }
  return result;
}

const cases = [
  ["1113335557779", "89"],
  ["1223334455678", "258"],
  ["1111223346788", "58"],
  ["1233334578999", "69"]
];

cases.forEach((o) => {
  const [hand, expected] = o;
  console.log(solution(hand) === expected);

}) 
// 111 123 234 567 88
// 
// 111 123 234 678 88
// 
// 11 123 123 456 788

//123 
