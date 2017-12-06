package kata

import "math"

// EvenOrOdd - Return whether a number is odd or even
func EvenOrOdd(number int) string {
	// your code here
	if int(math.Mod(float64(number), 2.0)) == 1 {
		return "Odd"
	}
	return "Even"
}
