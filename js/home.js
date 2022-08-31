const newWroteItBtn = document.getElementsByClassName('new-post-button')

getAllEntries()

let input = document.querySelector('#searchBar')
const searchBtn = document.querySelector('.searchButton')


function search() {
    const allPosts = document.querySelectorAll('.card-body')
    filter = input.value.toLowerCase();
    for (let i = 0; i < allPosts.length; i++) {
        postContent = allPosts[i].textContent;
          if (postContent.toLowerCase().includes(filter)) {
            allPosts[i].style.display = "initial";
          } else {
            allPosts[i].parentElement.remove()
          }
      }
    }


searchBtn.addEventListener('click', search)