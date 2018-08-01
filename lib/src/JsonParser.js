
function json (json) {
  return JSON.stringify(json)
}

function string (string) {
  return JSON.parse(string)
}

export {
  json,
  string
}
