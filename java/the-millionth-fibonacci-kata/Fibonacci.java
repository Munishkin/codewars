// http://fusharblog.com/solving-linear-recurrence-for-programming-contest/
import java.math.BigInteger;

public class Fibonacci {

  // properties of matrix
	// A^p = A if p = 1
	// A^p = A^(p - 1) * A if p is odd
	// A^[ = (A^(p/2))^2 if p is even
	private static BigInteger[][] calculateMatrix(BigInteger[][] m, int p) {
		if (p == 1) {
			return m;
		}
		if (p % 2 == 1) {
			BigInteger[][] subMatrix = calculateMatrix(m, p - 1);

			// [a b ][e f] = [ae + bg   af + fh]
			// [c d ][g h]   [ce + dg   cf + dh]

			// find the dimension of the matrix

			//BigInteger[][] result = new

			//subMatrix[0][0] +

		}
		return calculateMatrix(calculateMatrix(m, p / 2), 2);
	}

	public static BigInteger fib(BigInteger n) {
		// f(i) = f(i-1) + f(i-2),
		// F1 = [1
		//       1]
		// T = [[0 1],
		//      [1 1]]
		// FN = T^(N - 1) * F1
		return null;
	  }


  public static void main(String[] args) {

  }

}
