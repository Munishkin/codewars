
/*Input/Output
Shirts:  White, Orange, Blue, Purple, Red, Black

[input] integer n
The total number of t-shirts that Codewars has for the month. It is guaranteed that n % 6 = 0.
6 ≤ n ≤ 36
[input] 2D string array orders

An array of string arrays representing the orders. Each order is an array of exactly two strings - the color choices the Codewars made. It is guaranteed that only the following colors are given: "Red", "Black", "Blue", "Purple", "Orange" or "White".
0 ≤ orders.length ≤ 20
[output] a boolean value
A boolean representing if all orders can be fulfilled for the month with the given t-shirts.
*/

const codewarsTshirts = (n, orders) => {
  //coding and coding..

  // find out the quantity of each type of shirt
  // use brute force, loop each order, deduct the quantity. if quantity falls below
  // zero, backtrack and try the next combination
  // if a combination is found where order is satisfied, return true
  // if no combination is found, then return false



  return false;
}


console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"]]) === true);
console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"],["Red","Black"]]) === false);
console.log(codewarsTshirts(6,[["White","Purple"],["Purple","Blue"],["Blue","Orange"],["Orange","Red"],["Red","Black"],["Black","White"]]) === true);
console.log(codewarsTshirts(24,[]) === true);
console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"],["Blue","Black"]]) === true);
console.log(codewarsTshirts(6,[["Blue","Purple"]]) === true);
console.log(codewarsTshirts(18,
  [["Black","Blue"],["Purple","Blue"],["Blue","White"],["White","Orange"],["White","Blue"],
  ["Purple","White"],["White","Purple"],["White","Red"],["Blue","Purple"],["Orange","White"],
  ["Black","Blue"],["Purple","Red"],["Blue","Red"],["Blue","White"],["Purple","White"],
  ["Purple","Blue"],["Orange","Red"]]) === true);
console.log(codewarsTshirts( 6, [ ["Purple","Black"], ["Black","Red"], ["Red","Purple"], ["Red","Purple"],
    ["White","Orange"] ] )=== false);
