// takes: String; returns: [ [String,Int] ] (Strings in return value are single characters)
function frequencies(s) {
  if (s.length <= 1) {
    return null;
  } else {
    
  }
}

// takes: [ [String,Int] ], String; returns: String (with "0" and "1")
function encode(freqs,s) {

}

// takes [ [String, Int] ], String (with "0" and "1"); returns: String
function decode(freqs,bits) {

}


// describe("example tests", ()=>{
//   const s = "aaaabcc";
//   const fs = frequencies(s);
//   Test.assertDeepEquals( [...fs].sort(), [ ["a",4], ["b",1], ["c",2] ] );
//   Test.assertEquals( encode( fs, s ).length, 10 );
//   Test.assertEquals( encode( fs, "" ), "" );
//   Test.assertEquals( decode( fs, "" ), "" );
// });
//
// describe("error handling", ()=>{
//   Test.assertEquals( encode( [], "" ), null );
//   Test.assertEquals( decode( [], "" ), null );
//   Test.assertEquals( encode( [ ["a",1] ], "" ), null );
//   Test.assertEquals( decode( [ ["a",1] ], "" ), null );
// });
