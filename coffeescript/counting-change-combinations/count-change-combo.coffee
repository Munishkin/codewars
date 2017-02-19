#Write a function that counts how many different ways you can make change
#for an amount of money, given an array of coin denominations. For example,
#there are 3 ways to give change for 4 if you have coins with denomination 1
#and 2:

#1+1+1+1, 1+1+2, 2+2.
#The order of coins does not matter:

#1+1+2 == 2+1+1
#Also, assume that you have an infinite ammount of coins.

#Your function should take an amount to change and an array of unique
#denominations for the coins:

#  countChange(4, [1,2]) # => 3
#  countChange(10, [5,2,3]) # => 4
#  countChange(11, [5,7]) # => 0

countChange = (money, coins) ->
  # solve with dynamic programming
  # initialize coin_count array from 0 .. money
  # coin_count[0] = []
  # coin_count[n] = [[n]] if n is in the coins array
  # for each coin amount i in coin_count array
  #   for each coin j
  #      k = i - j
  #      if k < 0 do nothing
  #      if k >= 0 and k >= j then
  #         proposed solution = coin_count[k] + [j] and sorted,
  #         check for existence. if not existence, insert to coin_count[k]
  #   return the length of coin_count[n]
  coin_count = []
  coin_count.push [] for i in [0..money]
  for c in coins
    if c <= money then coin_count[c][0] = [c]
  #console.log coin_count
    
  for i in [0..money]
    for j in coins
      k = i - j
      if k >= j
        for solution in coin_count[k]
          c_solution = solution.slice 0
          c_solution.push j
          c_solution.sort()
          #console.log cloned_solution
          strCoinCount = JSON.stringify coin_count[i]
          strSol = JSON.stringify c_solution
          if strCoinCount.indexOf(strSol) < 0 then coin_count[i].push c_solution
    #console.log "i: #{i}"
    #console.log coin_count[i]
  #console.log coin_count
  coin_count[money].length

#console.log countChange(4, [1,2])
#console.log countChange(4, [1,2]) is 3
#console.log countChange(10, [5,2, 3]) is 4
#console.log countChange(11, [5, 7]) is 0

console.log countChange(300, [ 5, 10, 20, 50, 100, 200, 500 ])

#console.log countChange(10, [ 5, 10 ])



#coin amount:  0 1 2 3 4
#coin combo:   0 1 1 2 3
#   coin_count[3] = coin_count[2] + coin_count[1]
#   coin_count[4] = coin_count[3] + coin_count[2]
              
#coin amount:  0 1 2 3 4 5 6 7 8 9 10
#coin combo:   0 0 1 1 1 2 2 2 3 3  2

# 1 +
# 5 + 2, 2 + 2 + 3
# 2 + 2 + 2, 3 + 3
# 2 + 2 + 2 + 2, 3 + 3 + 2, 5 + 3
# 5 + 2 + 2, 3 + 2 + 2 + 2, 3 + 3 + 3
# 5 + 5, 5 + 3 + 2,2 + 2 + 2 + 2 + 2, 3 + 3 + 2 + 2
