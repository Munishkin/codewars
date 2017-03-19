#Pete is now mixing the cake mixture. He has the recipe, containing the
#required ingredients for one cake. He also might have added some of the
#ingredients already, but something is missing. Can you help him to find out,
#what he has to add to the mixture?

#Requirements:

#Pete only wants to bake whole cakes. And ingredients, that were added once
#to the mixture, can't be removed from that. That means: if he already added
#the amount of flour for 2.8 cakes, he needs to add at least the amount of flour
#for 0.2 cakes, in order to have enough flour for 3 cakes.
#If Pete already added all ingredients for an integer amount of cakes, you
#don't need to add anything, just return an empty hash then.
#If Pete didn't add any ingredients at all, you need to add all ingredients
#for exactly one cake.
#For simplicity we ignore all units and just concentrate on the numbers.
#E.g. 250g of flour is simply 250 (units) of flour and 1 lb of sugar is
#also simply 1 (unit) of sugar.
#Ingredients, which don't have to be added to the mixture (missing amount = 0),
#must not be present in the result.

getMissingIngredients = (recipe, added) ->
  # need to calculate the number of cakes to bake
  # calculate ceiling of cake that each added ingredient can make
  # find the max value out of them as the number of cakes to bake
  #
  # iterate recipe hash
  # if item is not in added then, added to item:recipe's amount x no. of cakes
  # if item is in added, calculate diff = (no. pf cales * amount in recipe -
  # amount in added)
  # if diff > 0, add item:diff in hash
  # if diff <= 0, do nothing
  numCakes = Object.keys(added).reduce ((acc, item) ->
    ratio = 1
    if recipe[item]
      ratio = Math.ceil(added[item] / recipe[item])
    return if ratio > acc then ratio else acc
  ), 0
  if numCakes is 0 then numCakes = 1
  
  result = Object.keys(recipe).reduce ((acc, item) ->
    if not added[item]
      #console.log {item: item, diff: recipe[item]}
      acc[item] = recipe[item] * numCakes
    else
      diff = numCakes * recipe[item] - added[item]
      if diff > 0 then acc[item] = diff
    acc
  ), {}
  result


# test cases
recipe = {flour: 200, eggs: 1, sugar: 100 }

 # must return {flour: 150, sugar: 100 }
a = getMissingIngredients recipe, {flour: 50, eggs: 1}
console.log a

# must return {flour: 200, eggs: 1, sugar: 100}
b = getMissingIngredients recipe, {}
console.log b
        
# must return {flour: 100, eggs: 3, sugar: 100}
c = getMissingIngredients recipe, {flour: 500, sugar: 200}
console.log c
