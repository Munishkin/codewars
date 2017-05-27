
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


const generateOrderIndices = (orderIndices) => {
   // find the position left most 1, say k
   // for j to 0 to k - 1, make a copy of o', change o'[j] = 1
   // append to result list
   // return result list
   const idxOne = orderIndices.findIndex((o) => { return o === 1; });
   return orderIndices.reduce((acc, v, i) => {
           if (i < idxOne || idxOne < 0) {
             const cloned = JSON.parse(JSON.stringify(orderIndices));
             cloned[i] = 1;
             acc.push(cloned);
           }
           return acc;
         }, []);
}

const satisfyOrder = (quantity, orders, orderIndices) => {
  const shirtMap = {
      'White': quantity,
      'Orange': quantity,
      'Blue': quantity,
      'Purple': quantity,
      'Red': quantity,
      'Black': quantity
  };
  orders.forEach((order, i) => {
    const shirt = order[orderIndices[i]];
    shirtMap[shirt] -= 1;
  });
  return Object.keys(shirtMap).every((shirt) => {
    return shirtMap[shirt] >= 0;
  })
};

const codewarsTshirts = (n, orders) => {
  //coding and coding..

  // find out the quantity of each type of shirt
  // use brute force, loop each order, deduct the quantity. if quantity falls below
  // zero, backtrack and try the next combination
  // if a combination is found where order is satisfied, return true
  // if no combination is found, then return false
  const NUM_SHIRTS = n / 6;

  // find all the shirt combination
  const orderCombinations = [];
  const initial = [];
  for (let i = 0; i < orders.length; i++) {
    initial.push(0);
  }
  //console.log(initial);
  orderCombinations.push(initial);

  while (orderCombinations.length > 0) {
    const orderIndices = orderCombinations.shift();
    const isSatisfied = satisfyOrder(NUM_SHIRTS, orders, orderIndices)
    if (isSatisfied) { return true; }
    // generate more combination
    let newCombos = generateOrderIndices(orderIndices);
    newCombos.forEach((newCombo) => {
      if (!orderCombinations.includes(newCombo)) {
        orderCombinations.push(newCombo);
      }
    });
  }

  return false;
}


/*
  [0 0 0]
  [0 0 1] [0 1 0] [1 0 0] [0 1 1]
  [1 1 0] [1 0 1]
  [1 1 1]
*/


/*[0 0 0 0]
[0 0 0 1] [0 0 1 0] [0 1 0 0] [1 0 0 0]
[0 0 1 1] [0 1 0 1] [1 0 0 1] [0 1 1 0] [1 0 1 0] [1 1 0 0]
[0 1 1 1] [1 0 1 1] [1 1 0 1] [1 1 1 0]
[1 1 1 1]
*/

// console.log(generateOrderIndices([0,0,0,0]))
// console.log(generateOrderIndices([0,0,0,1]))
// console.log(generateOrderIndices([0,1,0,1]))


console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"]]) === true);
console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"],["Red","Black"]]) === false);
console.log(codewarsTshirts(6,[["White","Purple"],["Purple","Blue"],["Blue","Orange"],["Orange","Red"],["Red","Black"],["Black","White"]]) === true);
console.log(codewarsTshirts(24,[]) === true);
console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"],["Blue","Black"]]) === true);

const n = 18
const orders = [["Purple","White"],["Red","Purple"],["Black","Red"],["Purple","Blue"],["Black","Blue"],["White","Purple"],["Red","Blue"],["Purple","Blue"],["Black","White"],["Red","Orange"],["Orange","Black"],["Purple","White"],["White","Blue"],["Orange","Blue"],["Blue","Red"],["Black","Purple"],["Black","Orange"],["Red","Black"],["Orange","Black"],["White","Blue"]]
console.log(codewarsTshirts(n, orders));
/*console.log(codewarsTshirts(6,[["Blue","Purple"]]) === true);
console.log(codewarsTshirts(18,
  [["Black","Blue"],["Purple","Blue"],["Blue","White"],["White","Orange"],["White","Blue"],
  ["Purple","White"],["White","Purple"],["White","Red"],["Blue","Purple"],["Orange","White"],
  ["Black","Blue"],["Purple","Red"],["Blue","Red"],["Blue","White"],["Purple","White"],
  ["Purple","Blue"],["Orange","Red"]]) === true);
console.log(codewarsTshirts( 6, [ ["Purple","Black"], ["Black","Red"], ["Red","Purple"], ["Red","Purple"],
    ["White","Orange"] ] )=== false);
*/
