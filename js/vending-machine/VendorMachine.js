function VendingMachine(coins) {
  this.coins = coins;
}

VendingMachine.prototype.calculateCredit = function(credit) {
  var total_credit = 0;
  for (var value in credit) {
    if ((this.coins[value] != null) || (typeof this.coins[value] !== "undefined")) {
      total_credit += value * credit[value];
    } 
  }
  return total_credit;
}

VendingMachine.prototype.processCoins = function(credit) {
  // credit can cover price.  consider the change and update coin qty 
  // in vending machine
  var returnedCoins = {}
  for (var value in credit) {
    if ((this.coins[value] != null) || (typeof this.coins[value] !== "undefined")) {
      this.coins[value] += credit[value];
    } else {
      returnedCoins[value] = credit[value];
    }
  }
  return returnedCoins;
}

VendingMachine.prototype.vending = function(price, credit) {
  
  // calculate total credits 
  var total_credit = this.calculateCredit(credit);
  if (total_credit < price) {
    return credit;
  }
  
  // credit can cover price.  consider the change and update coin qty in vending machine
  var returnedCoins = this.processCoins(credit);
  var change =  total_credit - price;
  if (change > 0) {
    var coinArray = [];
    for (var value in this.coins) {
      coinArray.push(parseInt(value));
    }
    coinArray.sort(function(a,b) { return b - a; });

    var changeAmount = [];
    var changeSeq = [];
    for (var i = 0; i <= change; i++) {
      changeAmount.push(0);
      changeSeq.push({});
    }
    for (var i = 1; i <= change; i++) {
      for (var k = 0; k < coinArray.length; k++) {
        var coin = coinArray[k];
        var sumCoinValue = 0;
        for (var j = 0; j < this.coins[coin]; j++) {
          sumCoinValue += coin;
          if ((i - sumCoinValue) >= 0) {
             var optimalAmount = changeAmount[i - sumCoinValue] + coin;
             var optimalCoinCount = changeSeq[i - sumCoinValue][coin] ? 
                 changeSeq[i - sumCoinValue][coin] + 1 : 1;
             if (optimalAmount > changeAmount[i] && optimalCoinCount <= this.coins[coin]) {
             
               changeAmount[i] = optimalAmount; 
               var currentSeq = Object.assign({}, changeSeq[i - sumCoinValue]);
               currentSeq[coin] = currentSeq[coin] ?  currentSeq[coin] + 1 : 1;
               changeSeq[i] = currentSeq;
             }
          }
        }
      }
    }    
    for (var i in changeSeq[change]) {
      returnedCoins[i] = changeSeq[change][i];
      this.coins[i] -=  changeSeq[change][i];
    }
    return returnedCoins;
  } else {
    return {};
  }
}

