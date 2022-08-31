const viewSearchBtn = document.querySelector('.viewSearchButton')

function redirect() {
    window.location.replace('home.html')
}

viewSearchBtn.addEventListener('click', redirect)

let searchTerm = window.location.search
var newWord = searchTerm.slice(searchTerm.search('=')+1)

console.log(newWord)