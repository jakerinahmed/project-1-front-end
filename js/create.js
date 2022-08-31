const submitBtn = document.querySelector('#new-post-form')
const searchBtn = document.querySelector('.searchButton')


submitBtn.addEventListener('submit', submitEntry)

function redirect() {
    window.location.replace('home.html')
}
searchBtn.addEventListener('click', redirect)