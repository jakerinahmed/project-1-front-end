let searchTerm = window.location.search
var newWord = searchTerm.slice(searchTerm.search('=')+1)

console.log(newWord)
