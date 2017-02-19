#Write a function that counts how many different ways you can make change
#for an amount of money, given an array of coin denominations. For example,
#there are 3 ways to give change for 4 if you have coins with denomination 1
#and 2:

#1+1+1+1, 1+1+2, 2+2.
#The order of coins does not matter:

#1+1+2 == 2+1+1
#Also, assume that you have an infinite ammount of coins.

# https://andrew.neitsch.ca/publications/m496pres1.nb.pdf
# Let f(n, k) be the number of ways of making change for n cents, using only
# the first k types of coin.

#By using the equivalent recurrence relation
#f(n, k) =  0, k > |a| or n < 0, |a| is number of coin denomination
#           1, n = 0
#          f(n, k + 1) + f(n - ak, k), else
# the answer is f(n, 1)

countChange = (money, coins) ->
  
  coin_count = []
  coin_count.push []
  coin_count[0][j] = 1 for j in [0...coins.length]
  for i in [1..money]
    coin_count.push []
    coin_count[i].push(0) for j in [0...coins.length]
  
  for c in [1..money]
    for k in [coins.length-1 .. 0] by -1
      if k+1 < coins.length then coin_count[c][k] += coin_count[c][k+1]
      if c-coins[k] >= 0 then coin_count[c][k] += coin_count[c-coins[k]][k]
  coin_count[money][0]

console.log countChange(4, [1,2]) is 3
console.log countChange(10, [5,2, 3]) is 4
console.log countChange(11, [5, 7]) is 0
console.log countChange(300, [ 5, 10, 20, 50, 100, 200, 500 ]) is 1022
