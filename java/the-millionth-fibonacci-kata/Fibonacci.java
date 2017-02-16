package fib;

// http://fusharblog.com/solving-linear-recurrence-for-programming-contest/
import java.math.BigInteger;

public class Fibonacci {

	// properties of matrix
	// A^p = A if p = 1
	// A^p = A^(p - 1) * A if p is odd
	// A^[ = (A^(p/2))^2 if p is even
	private static BigInteger[][] calculateMatrix(BigInteger[][] m, BigInteger p) {
		if (p.intValue() == 1) {
			return m;
		}

		BigInteger[][] sm = null;
		BigInteger[][] result = null;
		BigInteger two = BigInteger.valueOf(2L);
		if (p.mod(two).intValue() == 1) {
			sm = calculateMatrix(m, p.subtract(BigInteger.ONE));

			// [a b ][e f] = [ae + bg   af + fh]
			// [c d ][g h]   [ce + dg   cf + dh]

			result = new BigInteger[2][2];
			result[0] = new BigInteger[2];
			result[1] = new BigInteger[2];

			result[0][0] = sm[0][0].multiply(m[0][0]).add(sm[0][1].multiply(m[1][0]));
			result[0][1] = sm[0][0].multiply(m[0][1]).add(sm[0][1].multiply(m[1][1]));
			result[1][0] = sm[1][0].multiply(m[0][0]).add(sm[1][1].multiply(m[1][0]));
			result[1][1] = sm[1][0].multiply(m[0][1]).add(sm[1][1].multiply(m[1][1]));
			return result;
		}
		sm = calculateMatrix(m, p.divide(two));

		result = new BigInteger[2][2];
		result[0] = new BigInteger[2];
		result[1] = new BigInteger[2];

		// [a b][a b] = [a^2 + bc   ab + bd]
		// [c d][c d]   [ac + cd    cb + d^2]

		result[0][0] = sm[0][0].multiply(sm[0][0]).add(sm[0][1].multiply(sm[1][0]));
		result[0][1] = sm[0][0].multiply(sm[0][1]).add(sm[0][1].multiply(sm[1][1]));
		result[1][0] = sm[1][0].multiply(sm[0][0]).add(sm[1][1].multiply(sm[1][0]));
		result[1][1] = sm[1][0].multiply(sm[0][1]).add(sm[1][1].multiply(sm[1][1]));
		return result;
	}

	public static BigInteger fib(BigInteger n) {
		// f(i) = f(i-1) + f(i-2),
		// F1 = [1
		//       1]
		// T = [[0 1],
		//      [1 1]]
		// FN = T^(N - 1) * F1
		//  T^(N-1) = [a b  [1 =  [a + b]
 		//             c d]  1]   [c + d]
 		// FN = Transpose[f(N) f(N+1)]
		// f(N) = a + b
		if (n.equals(BigInteger.ZERO) || n.equals(BigInteger.ONE)) {
			return n;
		}

		// handle negative fibonacci

		//Using Fn − 2 = Fn − Fn − 1, one can extend the Fibonacci numbers to negative integers. So we get:
		//	... −8, 5, −3, 2, −1, 1, 0, 1, 1, 2, 3, 5, 8, ...
		//	and F−n = (−1)^(n + 1)Fn.
		if (n.signum() == -1) {
			BigInteger negateN = n.negate();
			BigInteger alternateSign = BigInteger.ONE.negate().pow(negateN.add(BigInteger.ONE).intValue());
			return alternateSign.multiply(fib(negateN));
		}

		BigInteger[][] T = new BigInteger[2][2];
		T[0] = new BigInteger[] { BigInteger.ZERO, BigInteger.ONE };
		T[1] = new BigInteger[] { BigInteger.ONE, BigInteger.ONE };

		BigInteger[][] TN = calculateMatrix(T, n.subtract(BigInteger.ONE));

		return TN[0][0].add(TN[0][1]);
	  }


	public static void main(String[] args) {
		System.out.println(fib(BigInteger.ZERO).intValue() == 0);
		System.out.println(fib(BigInteger.ONE).intValue() == 1);
		System.out.println(fib(BigInteger.valueOf(2L)).intValue() == 1);
		System.out.println(fib(BigInteger.valueOf(3L)).intValue() == 2);
		System.out.println(fib(BigInteger.valueOf(5L)).intValue() == 5);
		System.out.println(fib(BigInteger.valueOf(10L)).intValue() == 55);
		System.out.println(fib(BigInteger.valueOf(-1L)).intValue() == 1);
		System.out.println(fib(BigInteger.valueOf(-2L)).intValue() == -1);
		System.out.println(fib(BigInteger.valueOf(-6L)).intValue() == -8);
	}

	// 0 1 1 2 3 5 8 13 21 34 55
}
