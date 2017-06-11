/*Mahjong is based on draw-and-discard card games that were popular in 18th and
19th century China and some are still popular today.

In each deck, there are three different suits numbered 1 to 9, which are called
Simple tiles. They are Circles (denoted by [1-9]p), Bamboo (denoted by [1-9]s),
and Characters (denoted by [1-9]m).

Moreover, there is another suit named Honor tiles. It includes Wind tiles
(namely East, South, West, North, denoted by [1-4]z) and Dragon tiles
(namely Red, Green, White, denoted by [5-7]z).

In each of Mahjong games, each of the 4 players around the table has 13 tiles.
They take turns drawing a tile from the tile walls and then discarding one of
the tiles from their hands. One wins the game if that player holds a
combination of tiles as defined below:

A regular winning hand consists of 4 Melds and 1 Pair. Each meld of tiles
can be 3 identical or consecutive tiles of a suit, e.g. 222 or 456.
*/

/*
Task

Work out all tiles that can make up a winning hand with the given 13 tiles.
Remember that a winning hand may be regular or in a form of Seven-pairs.

Input
A string denoting 13 tiles to be computed, in the order of Circles ([1-9]p),
Bamboo ([1-9]s), Characters ([1-9]m), and Honors ([1-7]z). The tiles are
space-separated.
Output
A string consisting of the tiles that can form a winning hand with given ones,
in the order of Circles ([1-9]p), Bamboo ([1-9]s), Characters ([1-9]m),
and Honors ([1-7]z).
*/

const FOUR_MELDS_LEN = 12;
const HAND_LEN = FOUR_MELDS_LEN + 2;
const IDENTICAL_PIECES = 3;
const PAIR_LEN = 2;
const MAX_PIECES = 4;
const SEVEN_PAIRS = 7;

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

  const hand = `${tiles} ${tile}`.split(' ');

  console.log({ hand: hand });
  if (hand && hand.length !== HAND_LEN) { return ''; }

  const counts = hand.reduce((acc, o) => {
              acc[o] = (acc && acc[o] && acc[o] + 1) || 1;
              return acc;
          }, {});
  const pairs = Object.keys(counts).filter((t) => {
    return counts[t] >= PAIR_LEN;
  });

  // need to check that each tile is between 0 and 4
  // const tooManyPieces = Object.keys(counts).some((t) => {
  //   return counts[t] < 0 || counts[t] > MAX_PIECES;
  // });
  //
  // if (tooManyPieces) { return ''; }
  //
  // // check if a hand has seven pairs
  // const hasSevenPairs = Object.keys(counts).length === 7;
  // if (hasSevenPairs) { return true; }
  //
  // const buildThreeConsecutiveTiles = (combination, countsCopy) => {
  //   for (let i = 1; i <= 7; i++) {
  //     //console.log({countsCopy: countsCopy});
  //     let sheungCombination = '';
  //     for (let j = i; j <= 7; j++) {
  //       while (countsCopy[j] >= 1 && countsCopy[j+1] >= 1 && countsCopy[j+2] >= 1) {
  //         countsCopy[j] -= 1;
  //         countsCopy[j+1] -= 1;
  //         countsCopy[j+2] -= 1;
  //         sheungCombination += `${j}${j+1}${j+2}`;
  //       }
  //     }
  //     if ((combination.length + sheungCombination.length) === FOUR_MELDS_LEN) {
  //       return combination + sheungCombination;
  //     } else {
  //       // restore value
  //       sheungCombination.split('').forEach((t) => {
  //         countsCopy[t] += 1;
  //       });
  //     }
  //   }
  //   return '';
  // }
  //
  // const hasFourMelds = (counter) => {
  //
  //   // remove 3 identical pieces, from 0 to 4 groups
  //   const pongList = Object.keys(counter)
  //     .filter((t) => { return counter[t] >= IDENTICAL_PIECES; });
  //
  //   const countsCopy = JSON.parse(JSON.stringify(counter));
  //   let combination = '', combo = null;
  //
  //   // can a winning hand be made without pong
  //   let feasibleCombination = buildThreeConsecutiveTiles('', countsCopy);
  //   if (feasibleCombination) { return feasibleCombination; }
  //
  //   if (pongList.length > 0) {
  //     // try pong 1, 2, 3 and up to 4 times
  //     const combos = PONG_COMBINATIONS[pongList.length];
  //     for (let w = 0; w < combos.length; w++) {
  //       combination = '';
  //       combo = combos[w];
  //       for (let k = 0; k < combo.length; k++) {
  //         const tile = pongList[combo[k]];
  //         countsCopy[tile] -= IDENTICAL_PIECES;
  //         combination += `${tile}${tile}${tile}`;
  //       }  // end combine pong
  //
  //      feasibleCombination = buildThreeConsecutiveTiles(combination, countsCopy);
  //      if (feasibleCombination) { return feasibleCombination; }
  //
  //       if (combination) {
  //         combination.split('').forEach((t) => {
  //           countsCopy[t] += 1;
  //         });
  //       }
  //     } // end loop combos
  //     return '';
  //   }
  //   return '';
  // }
  //
  // for (let i = 0; i < pairs.length; i++) {
  //   counts[pairs[i]] -= PAIR_LEN;
  //   const combination = hasFourMelds(counts);
  //   if (combination) {
  //     return true;
  //   }
  //   counts[pairs[i]] += PAIR_LEN;
  // }
  return false;
}

const solution = (tiles) => {
  // for tile from 1 to 9, insert tile to tiles to form a hand with 14 tiles
  // if hand is a winning hand, then append tile to result
  // when done, return result
  let result = '';
  '123456789'.split('').forEach((i) => {
    ['p', 'm', 's'].forEach((suit) => {
      if (hasWinningHand(tiles, `${i}${suit}`)) {
        result += i;
      }
    });
  });
  // check honor tiles
  '1z 2z 3z 4z 5z 6z 7z'.split(' ').forEach((tile) => {
    if (hasWinningHand(tiles, tile)) {
      result += i;
    }
  });
  return result;
}

const cases = [
  ["2p 2p 3p 3p 4p 4p 5p 5p 7m 7m 8m 8m 8m", "2p 5p 7m 8m"],
  ["1p 1p 3p 3p 4p 4p 5p 5p 6p 6p 7p 7p 9p", "9p"],
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
