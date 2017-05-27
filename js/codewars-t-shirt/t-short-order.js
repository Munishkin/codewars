
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

const SHIRT_MAP = {
     'White': 0,
     'Orange': 1,
     'Blue': 2,
     'Purple': 3,
     'Red': 4,
     'Black': 5
};

const generateOrderIndices = (orderCombinations, orderIndices) => {
   // find the position left most 1, say k
   // for j to 0 to k - 1, make a copy of o', change o'[j] = 1
   // append to result list
   // return result list
   let idxOne = orderIndices.indexOf('1');
   if (idxOne < 0) { idxOne = orderIndices.length; }
   for (let i = 0; i < idxOne; i++) {
     cloned = orderIndices.substring(0, i) + '1' + orderIndices.substring(i+1);
     if (!orderCombinations.includes(cloned)) {
       orderCombinations.push(cloned);
     }
   }
}

const satisfyOrder = (quantity, orders, orderIndices) => {

  //console.log('testing: ' + orderIndices);
  let shirtOrder = `${quantity}`.repeat(6);
  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const shirtColor = order[orderIndices[i]];
    const idxShirtColor = SHIRT_MAP[shirtColor];

    if (shirtOrder[idxShirtColor] === '0') {
      return false;
    } else {
      shirtOrder = shirtOrder.substring(0, idxShirtColor)
          + (parseInt(shirtOrder[idxShirtColor]) - 1)
          + shirtOrder.substring(idxShirtColor + 1);
    }
  }
  return true;
};

const codewarsTshirts_old = (n, orders) => {

  // find out the quantity of each type of shirt
  // use brute force, loop each order, deduct the quantity. if quantity falls below
  // zero, backtrack and try the next combination
  // if a combination is found where order is satisfied, return true
  // if no combination is found, then return false
  if (orders.length <= 1) { return true; }

  const NUM_SHIRTS = n / 6;

  // find all the shirt combination
  const orderCombinations = [];
  const initial = '0'.repeat(orders.length);

  orderCombinations.push(initial);

  while (orderCombinations.length > 0) {
    const orderIndices = orderCombinations.shift();
    const isSatisfied = satisfyOrder(NUM_SHIRTS, orders, orderIndices)
    if (isSatisfied) { return true; }
    // generate more combination
    generateOrderIndices(orderCombinations, orderIndices);
  }

  return false;
}

const buildShirtOrder = (cachedShirtResults, orders, orderIndices) => {

  const cached = cachedShirtResults[orderIndices];
  if (!cached) {
      return [];
  }

  const buildShirtOrderSubset = (shirtSubset, strOrderIndices, order, idx) => {
    const shirtColor = order[idx];
    const idxShirtColor = SHIRT_MAP[shirtColor];

    if (shirtSubset[idxShirtColor] >= '1') {
      const nextOrderIndices = `${strOrderIndices}${idx}`;
      const nextShirtSubset = shirtSubset.substring(0, idxShirtColor)
        + (parseInt(shirtSubset[idxShirtColor]) - 1)
        + shirtSubset.substring(idxShirtColor + 1);
      return [nextOrderIndices, nextShirtSubset ];
    }
    return [ null, null];
  };

  const newOrderIndices = [];
  const order = orders[orderIndices.length];
  const [ firstOrderIndices, firstShirtSubset ] = buildShirtOrderSubset(cached, orderIndices,
                                                  order, 0);

  const [ secOrderIndices, secShirtSubset ] = buildShirtOrderSubset(cached, orderIndices,
                                                  order, 1);

  if (firstOrderIndices && firstShirtSubset) {
      cachedShirtResults[firstOrderIndices] = firstShirtSubset;
      newOrderIndices.push(firstOrderIndices);
  }

  if (secOrderIndices && secShirtSubset) {
      cachedShirtResults[secOrderIndices] = secShirtSubset;
      newOrderIndices.push(secOrderIndices);
  }
  return newOrderIndices;
}

const codewarsTshirts = (n, orders) => {
  // find out the quantity of each type of shirt
  // use brute force, loop each order, deduct the quantity. if quantity falls below
  // zero, backtrack and try the next combination
  // if a combination is found where order is satisfied, return true
  // if no combination is found, then return false
  if (orders.length <= 1) { return true; }

  // set base cases
  const cachedShirtResults = {};
  const NUM_SHIRTS = n / 6;

  const initial = `${NUM_SHIRTS}`.repeat(6);
  const idxFirst = SHIRT_MAP[orders[0][0]];
  const idxSecond = SHIRT_MAP[orders[0][1]];

  cachedShirtResults['0'] = initial.substring(0, idxFirst) + (NUM_SHIRTS - 1)
                              + initial.substring(idxFirst + 1);
  cachedShirtResults['1'] = initial.substring(0, idxSecond) + (NUM_SHIRTS - 1)
                              + initial.substring(idxSecond + 1);
  const orderCombinations = ['0', '1'];

  while (orderCombinations.length > 0) {
    const orderIndices = orderCombinations.shift();

    // build up solution and update cachedShirtResults
    const newShirtOrderSubsets = buildShirtOrder(cachedShirtResults, orders, orderIndices);
    if (newShirtOrderSubsets.length > 0 && newShirtOrderSubsets[0].length === orders.length) {
      return true;
    }
    newShirtOrderSubsets.forEach((o) => {
      orderCombinations.push(o);
    })
  }
  return false;
}


console.log(codewarsTshirts_old(6,[["Red","Black"],["Red","Black"]]) === true);
console.log(codewarsTshirts_old(6,[["Red","Black"],["Red","Black"],["Red","Black"]]) === false);
console.log(codewarsTshirts_old(6,[["White","Purple"],["Purple","Blue"],["Blue","Orange"],
["Orange","Red"],["Red","Black"],["Black","White"]]) === true);
console.log(codewarsTshirts_old(24,[]) === true);
console.log(codewarsTshirts_old(6,[["Red","Black"],["Red","Black"],["Blue","Black"]]) === true);

console.log(codewarsTshirts_old(6,[["Blue","Purple"]]) === true);
console.log(codewarsTshirts_old(18,
  [["Black","Blue"],["Purple","Blue"],["Blue","White"],["White","Orange"],
  ["White","Blue"],["Purple","White"],["White","Purple"],["White","Red"],
  ["Blue","Purple"],["Orange","White"],["Black","Blue"],["Purple","Red"],
  ["Blue","Red"],["Blue","White"],["Purple","White"],["Purple","Blue"],
  ["Orange","Red"]]) === true);
console.log(codewarsTshirts_old( 6, [ ["Purple","Black"], ["Black","Red"],
    ["Red","Purple"], ["Red","Purple"], ["White","Orange"] ] )=== false);

let n = null, orders = null;

n = 18
orders = [
    ["Purple","White"],
    ["Red","Purple"],
    ["Black","Red"],
    ["Purple","Blue"],
    ["Black","Blue"],
    ["White","Purple"],
    ["Red","Blue"],
    ["Purple","Blue"],
    ["Black","White"],
    ["Red","Orange"],
    ["Orange","Black"],
    ["Purple","White"],
    ["White","Blue"],
    ["Orange","Blue"],
    ["Blue","Red"],
    ["Black","Purple"],
    ["Black","Orange"],
    ["Red","Black"],
    ["Orange","Black"],
    ["White","Blue"]]
console.log(codewarsTshirts_old(n, orders));


 n = 30
 orders = [["Orange","Black"],["White","Blue"],["Purple","Red"],
 ["Black","Red"],["White","Black"],["Black","Orange"],["Orange","Black"],
 ["Red","Purple"],["Purple","White"],["Red","Black"],
 ["Orange","Purple"],["White","Red"],
 ["White","Purple"],["Black","White"],
 ["Blue","Purple"],["Orange","Red"],["Blue","Red"],
 ["Red","Blue"],["White","Red"]]
 console.log(codewarsTshirts_old(n, orders));

n = 36
orders = [["Purple","Orange"],["White","Orange"],["Red","Orange"],
["Red","Blue"],["Black","White"],["Blue","Red"],["Orange","White"],
["Orange","Blue"],["Purple","Blue"],["Black","White"],["Purple","White"],
["Red","Black"],["Red","Black"],["Black","Blue"],["Orange","Blue"],
["Black","Orange"],["Purple","Blue"],["White","Orange"],
["Red","Black"],["Orange","Red"]]
console.log(codewarsTshirts_old(n, orders));


n = 36
orders = [["Black","White"],["Purple","Blue"],["Black","White"],["Orange","Blue"],
["Orange","Red"],["White","Orange"],["Red","Purple"],["Purple","Blue"],["Orange","Blue"],
["Purple","Black"],["White","Orange"],["Orange","Black"],["Orange","White"],["White","Red"],
["Blue","White"],["White","Red"],["Purple","Red"],["Blue","Orange"]]
console.log(codewarsTshirts_old(n, orders));
