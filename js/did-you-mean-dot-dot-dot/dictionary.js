function Dictionary(words) {
  this.words = words;
}

let levenshtein_distance = function(a, b) {
  
  let costMatrix = [];  
  for (let i = 0; i < a.length + 1; i++) {
    costMatrix.push([]);
    for (let j = 0; j < b.length + 1; j++) {
      if (i === 0) {
        costMatrix[i].push(j);
      } else if (j === 0) {
        costMatrix[i].push(i);
      } else {
        costMatrix[i].push(0) ;
      }
    }
  }
  
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < b.length; j++) {
        costMatrix[i+1][j+1] = Math.min(costMatrix[i][j+1] + 1, 
                                costMatrix[i+1][j] + 1, 
                                costMatrix[i][j] + (a[i] === b[j]? 0 : 1)
                              );
    }
  }    
  return costMatrix[a.length][b.length];
}

Dictionary.prototype.findMostSimilar = function(term) {
  let minDist = Number.MAX_VALUE;
  let similarWord = '';
  for (let k in this.words) {
    let diff = levenshtein_distance(term, this.words[k]);
    if (diff < minDist) {
      minDist = diff;
      similarWord = this.words[k];
    }
  }
  return similarWord;
}

fruits = new Dictionary(['cherry', 'pineapple', 'melon', 'strawberry', 'raspberry']);
//console.log(fruits.findMostSimilar('strawbery'));
console.log(fruits.findMostSimilar('strawbery') === 'strawberry'); // must return "strawberry"
console.log(fruits.findMostSimilar('berry') === 'cherry'); // must return "cherry"

things = new Dictionary(['stars', 'mars', 'wars', 'codec', 'codewars']);
console.log(things.findMostSimilar('coddwars') === 'codewars'); // must return "codewars"

languages = new Dictionary(['javascript', 'java', 'ruby', 'php', 'python', 'coffeescript']);
console.log(languages.findMostSimilar('heaven') === 'java'); // must return "java"
console.log(languages.findMostSimilar('javascript') === 'javascript'); // must return "javascript" (same words are obviously the most similar ones)
