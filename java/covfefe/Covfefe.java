public class Covfefe {
   public static String covfefe(String tweet) {
		  if (tweet.indexOf("coverage") < 0) {
			  return String.format("%1$s %2$s",tweet, "covfefe");
		  }
		  return  tweet.replaceAll("coverage", "covfefe");
    }
}
