
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
   let idxOne = orderIndices.findIndex((o) => { return o === 1; });
   const result = [];
   if (idxOne < 0) { idxOne = orderIndices.length; }
   for (let i = 0; i < idxOne; i++) {
     const cloned = JSON.parse(JSON.stringify(orderIndices));
     cloned[i] = 1;
     result.push(cloned);
   }
   return result;
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

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const shirt = order[orderIndices[i]];
    shirtMap[shirt] -= 1;
    if (shirtMap[shirt] < 0) { return false; }
  }
  return true;
};

const codewarsTshirts_old = (n, orders) => {
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

const buildShirtOrder = (cachedShirtResults, orders, orderIndices) => {

  const stringKey = JSON.stringify(orderIndices);
  //console.log({stringKey: stringKey});
  const cached = cachedShirtResults[stringKey];
  //console.log(cached);
  if (!cached) {
      return [];
  }

  const firstShirt = orders[orderIndices.length][0];
  const secondShirt = orders[orderIndices.length][1];
  const firstShirtRemQty = cached[firstShirt] - 1;
  const secondShirtRemQty = cached[secondShirt] - 1;

  //console.log({orderIndices: orderIndices, firstShirt: firstShirt, firstShirtRemQty: firstShirtRemQty,
  //  secondShirt: secondShirt, secondShirtRemQty: secondShirtRemQty});

  const newOrderIndices = [];
  let cloned = null;
  let clonedCache = null;
  let strKey = null;
  if (firstShirtRemQty >= 0) {
      // feasible solution
      cloned = JSON.parse(JSON.stringify(orderIndices));
      cloned.push(0);
      strKey = JSON.stringify(cloned);
      //console.log({xxx: strKey});
      clonedCache = JSON.parse(JSON.stringify(cached));
      clonedCache[firstShirt] = firstShirtRemQty;
      cachedShirtResults[strKey] = clonedCache;
      newOrderIndices.push(cloned);
  }

  if (secondShirtRemQty >= 0) {
      // feasible solution
      cloned = JSON.parse(JSON.stringify(orderIndices));
      cloned.push(1);
      strKey = JSON.stringify(cloned);
      //console.log({xxx: strKey});
      clonedCache = JSON.parse(JSON.stringify(cached));
      clonedCache[secondShirt] = secondShirtRemQty;
      cachedShirtResults[strKey] = clonedCache;
      newOrderIndices.push(cloned);
  }
  //console.log(cachedShirtResults);
  return newOrderIndices;
}

const codewarsTshirts = (n, orders) => {
  //coding and coding..

  // find out the quantity of each type of shirt
  // use brute force, loop each order, deduct the quantity. if quantity falls below
  // zero, backtrack and try the next combination
  // if a combination is found where order is satisfied, return true
  // if no combination is found, then return false
  const NUM_SHIRTS = n / 6;
  const orderCombinations = [];
  if (orders.length <= 1) { return true; }

  // set base cases
  const cachedShirtResults = {};

  const firstShirt = orders[0][0];
  const secondShirt = orders[0][1];
  const shirtMap = {
       'White': NUM_SHIRTS,
       'Orange': NUM_SHIRTS,
       'Blue': NUM_SHIRTS,
       'Purple': NUM_SHIRTS,
       'Red': NUM_SHIRTS,
       'Black': NUM_SHIRTS
  };
  shirtMap[firstShirt] -= 1;
  cachedShirtResults[JSON.stringify([0])] = JSON.parse(JSON.stringify(shirtMap));
  shirtMap[firstShirt] = NUM_SHIRTS;
  shirtMap[secondShirt] -= 1;
  cachedShirtResults[JSON.stringify([1])] = JSON.parse(JSON.stringify(shirtMap));

  orderCombinations.push([0]);
  orderCombinations.push([1]);

  while (orderCombinations.length > 0) {
    const orderIndices = orderCombinations.shift();

    // build up solution and update cachedShirtResults
    newOrderIndices = buildShirtOrder(cachedShirtResults, orders, orderIndices);
    if (newOrderIndices.length > 0 && newOrderIndices[0].length === orders.length) {
      return true;
    }
    //console.log(newOrderIndices);


    newOrderIndices.forEach((o) => {
      orderCombinations.push(o);
    })
  }
//  console.log(cachedShirtResults);
  return false;
}

/*
  0
  1
  0 0
  0 1
  1 0
  1 1
  0 0 0
  0 0 1
  0 1 0
  0 1 1
  1 0 0
  1 0 1

*/


console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"]]) === true);

console.log(codewarsTshirts(6,[["Red","Black"],["Red","Black"],["Red","Black"]]) === false);
console.log(codewarsTshirts(6,[["White","Purple"],["Purple","Blue"],["Blue","Orange"],
["Orange","Red"],["Red","Black"],["Black","White"]]) === true);
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



let n = 18
let orders = [
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
console.log(codewarsTshirts(n, orders));

n = 30
orders = [["Orange","Black"],["White","Blue"],["Purple","Red"],["Black","Red"],["White","Black"],["Black","Orange"],["Orange","Black"],["Red","Purple"],["Purple","White"],["Red","Black"],["Orange","Purple"],["White","Red"],["White","Purple"],["Black","White"],["Blue","Purple"],["Orange","Red"],["Blue","Red"],["Red","Blue"],["White","Red"]]
console.log(codewarsTshirts(n, orders));
