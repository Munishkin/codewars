# Complete the class filling in the operations for simplifying, comparing, adding,
# subtracting, multiplying, and dividing Rationals.

# None of the operations (except for the constructor and the simplify) should
# modify the Rational.

class Rational
  constructor: (@numerator, @denominator) ->
     @denominator ?= 1
     @simplify()

  toString: ->
     @numerator + "/" + @denominator

  ###
  Implement the following:
  ###
  gcd: (a, b) ->
    if a is 0 then return b
    if b is 0 then return a
    if a > b then return @gcd(a - b, b)
    if b > a then return @gcd(a, b - a)
    a

  simplify: ->
    # find gcd and divide each number
    if @numerator < 0 then absNumerator = @numerator * -1 else absNumerator = @numerator
    if @denominator < 0 then absDenominator = @denominator * -1 else absDenominator = @denominator
    n = @gcd absNumerator, absDenominator
    @numerator = @numerator / n
    @denominator = @denominator / n
    if @denominator < 0
      @denominator = @denominator * -1
      @numerator = @numerator * -1

  equals: (b) ->
    (@numerator * b.denominator) is  (@denominator * b.numerator)
  lessThan: (b) ->
    (@numerator * b.denominator) < (@denominator * b.numerator)
  lessThanOrEquals: (b) ->
    @equals(b) or @lessThan(b)
  greaterThan: (b) ->
    (@numerator * b.denominator) > (@denominator * b.numerator)
  greaterThanOrEquals: (b) ->
    @equals(b) or @greaterThan(b)

  add: (b) ->
    new Rational(@numerator * b.denominator + b.numerator * @denominator, @denominator * b.denominator)
  sub: (b) ->
    new Rational(@numerator * b.denominator - b.numerator * @denominator, @denominator * b.denominator)
  mul: (b) ->
    new Rational(@numerator * b.numerator, @denominator * b.denominator)
  div: (b) ->
    new Rational(@numerator * b.denominator, @denominator * b.numerator)

#minusHalf = new Rational 5, -10;
#console.log minusHalf.toString()
#console.log new Rational(0,5).toString()

r2 = new Rational 3, 10;
r1 = new Rational 1, 6;

console.log r1.toString()
console.log r2.toString()

console.log  r1.lessThan(r2)
console.log  r1.lessThanOrEquals(r2)


#Test.expect(minusHalf.add(minusHalf).equals(new Rational(-1,1)), "-1/2 + -1/2 = -1/1")
#Test.expect(minusHalf.toString() is "-1/2", "5/-10 ==> -1/2")
#Test.expect(new Rational(0,5).toString() is "0/1", "0/5 ==> 0/1")
