function DocumentParser(reader)
{
  this.reader = reader;
  this.reset();
}

DocumentParser.prototype.reset = function()
{
  this.wordCount = 0;
  this.charCount = 0;
  this.lineCount = 0;
};

DocumentParser.prototype.parse = function()
{
  // TODO: Code Here!
  var chunk = this.reader.getChunk();
  var ch = null;
  var prevCh = null;
  while (chunk !== "") {
    for (var i = 0; i < chunk.length; i++)  { 
      var prevCh = ch;
      ch = chunk[i];
      if (ch !== '\n') {
        this.charCount += 1;
      }      
      
      if ( (ch === ' ' || ch === '\n') && prevCh !== ' ' && prevCh !== '\n' && prevCh != null) { // reach the boundary of word
        this.wordCount += 1; 
      } 
      
      if (ch === '\n') { 
        this.lineCount += 1;
      }
    };    
    chunk = this.reader.getChunk(); 
  }
  if (ch != null && ch !== '' && ch !== '\n' && ch !== ' ') {
    this.wordCount += 1;
  }  
  if ((ch != null && ch !== '') || ch === '\n') {
    this.lineCount += 1;  
  }  
};
