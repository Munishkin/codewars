package kata

import "math"

// EquableTriangle - perimeter equals to area of a triangle
func EquableTriangle(a, b, c int) bool {
	// Your code goes here
	perimeter := float64(a + b + c)
	p := perimeter / 2.0
	// use heron theorem
	area := math.Sqrt(p * (p - float64(a)) * (p - float64(b)) * (p - float64(c)))
	return perimeter == area
}
