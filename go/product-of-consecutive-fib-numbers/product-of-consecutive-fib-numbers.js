package kata

func ProductFib(prod uint64) [3]uint64 {
  var fn_0 uint64
  var fn_1 uint64
  var pass uint64
  fn_0 = 0
  fn_1 = 1
  for fn_0 * fn_1 < prod {
    fn_0, fn_1 = fn_1, fn_0 + fn_1
  }
  pass = 0
  if fn_0 * fn_1 == prod {
    pass = 1
  }
  return [3]uint64{fn_0, fn_1, pass}
}
