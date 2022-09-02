const viewSearchBtn = document.querySelector('.viewSearchButton')

function redirect() {
    window.location.replace('home.html')
}

viewSearchBtn.addEventListener('click', redirect)

let searchTerm = window.location.search
const entryID = searchTerm.slice(searchTerm.search('=')+1)

getOneEntry(entryID)

addComment()

getEntryComments(entryID)
