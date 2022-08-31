const newWroteItBtn = document.getElementsByClassName('new-post-button')

getAllEntries()


let input = document.querySelector('#searchBar')

function search(e) {
    e.preventDefault()
    const allPosts = document.querySelectorAll('.card-body')
    const allPostTitles = document.querySelectorAll('.card-title')
    filter = input.value.toLowerCase();
    for (let i = 0; i < allPosts.length; i++) {
        postContent = allPosts[i].textContent;
        titleContent = allPostTitles[i].textContent;
        if (postContent.toLowerCase().includes(filter) || titleContent.toLowerCase().includes(filter)) {
            allPosts[i].parentElement.style.display = "initial";
        } else {
            allPosts[i].parentElement.style.display = "none"
        
        }
    }   
     
}



input.addEventListener('keyup', search)

input.addEventListener('keypress', (e) => {
    if (e.isComposing || e.keyCode === 13){
    e.preventDefault()}
})