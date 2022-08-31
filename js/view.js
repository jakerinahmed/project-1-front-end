const viewSearchBtn = document.querySelector('.viewSearchButton')

function redirect() {
    window.location.replace('home.html')
}

viewSearchBtn.addEventListener('click', redirect)