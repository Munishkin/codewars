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

const solution = (tiles) => {
  // for tile from 1 to 9, insert tile to hand
  // tally 
  
  return '';
}

const cases = [
  ["1113335557779", "89"],
  ["1223334455678", "258"],
];

cases.forEach((o) => {
  const [hand, expected] = o;
  console.log(solution(hand) === expected);
}) 
