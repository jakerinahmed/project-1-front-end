const submitBtn = document.querySelector('#new-post-form')
const searchBtn = document.querySelector('.searchButton')

// gif functions
const addBtn = document.querySelector('.addBtn')
const resetBtn = document.querySelector('.resetBtn')

addBtn.addEventListener("click", getNewGif)

let clickCount = 0
function getNewGif (e) {
    e.preventDefault()
    let searchTerm = document.querySelector("#searchGif").value;
    if (!searchTerm ) {
        document.querySelector('#searchGif').placeholder = "please try again"
    }
    else {
        if (clickCount === 0) {
            let img = document.createElement("img")
            img.id= "gif"
            document.querySelector(".inputGif").appendChild(img)
        }
        clickCount = 1
        const gifImage = document.querySelector("#gif")
        fetch("https://api.giphy.com/v1/gifs/translate?api_key=JI2XhxjA0Akc6HIu9zDCcuYV02YOBnLD&s=" + searchTerm)
            .then (resp => resp.json())       
            .then (resp =>  gifImage.src = resp.data.images.original.url)

        if (resetBtn)
            resetBtn.addEventListener("click", function () {
                document.querySelector('#gif').remove()
                clickCount = 0
            })
    }
}

submitBtn.addEventListener('submit', submitEntry)


function redirect() {
    window.location.replace('home.html')
}
searchBtn.addEventListener('click', redirect)

