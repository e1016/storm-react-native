
/**
* functions for fast
* parse JSON and strings
*/

function json (json) {
  return JSON.parse(json)
}

function string (string) {
  return JSON.stringify(string)
}

export {
  json,
  string
}
