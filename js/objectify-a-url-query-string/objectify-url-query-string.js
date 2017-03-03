//In this kata, we want to convert a URL query string into a nested object.
//The query string will contain parameters that may or may not have embedded
//dots ('.'), and these dots will be used to break up the properties into
//the nested object.

//All properties and values will be strings — and the values should be left
//as strings to pass the tests.
//Make sure you decode the URI components correctly
//A method has been provided for testing Objects to compare objects
//recursively without depending on property order:

//You will receive a string input that looks something like this:

// Converts a URL Query String into an object map
function convertQueryToMap(query) {

  if (query == null || typeof query === 'undefined' || query === '') {
    return {};
  }

  // split by &
  // for each key-value pair, split by = to get key and value respectively
  // split key by . to get parts.
  // for each part except the last part, create empty object if not exists
  // insert last part into last object and set value to last part
  let result = query.split('&').reduce( (acc, pair) => {

    let [key, value] = pair.split('=');
    let parts = key.split('.');
    let lastPart = parts.splice(parts.length - 1, 1)[0];
    let leftObj = parts.reduce((objMap, part) => {
        if (!objMap[part]) { objMap[part] = {}; }
        return objMap[part];
    }, acc);
    leftObj[lastPart] = decodeURIComponent(value);
    return acc;
  }, {});
  return result;
}

var q = 'user.name.firstname=Bob&user.name.lastname=Smith&user.favoritecolor=Light%20Blue',
    out = {
      'user': {
        'name': {
          'firstname': 'Bob',
          'lastname': 'Smith'
        },
        'favoritecolor': 'Light Blue'
      }
    };

console.log(convertQueryToMap(q) === out);
