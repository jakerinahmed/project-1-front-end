

const addBtn = document.querySelector('.addBtn')
const resetBtn = document.querySelector('resetBtn')

// window.onload = getNewGif()
addBtn.addEventListener("click", getNewGif)

var clickCount = 0
function getNewGif () {
    let searchTerm = document.querySelector("#searchGif").value;
    if (!searchTerm ) {
        document.querySelector('#searchLabel').textContent = "please try again"
    }
    else {
        if (clickCount === 0) {
            let img = document.createElement("img")
            img.id= "gif"
            document.querySelector(".placeGif").appendChild(img)
        }
        clickCount = 1
        const gif = document.querySelector("#gif")
        fetch("https://api.giphy.com/v1/gifs/translate?api_key=JI2XhxjA0Akc6HIu9zDCcuYV02YOBnLD&s=" + searchTerm)
            .then (response => response.json())       
            .then (response =>  gif.src = response.data.images.original.url)
            // .catch( err => response.status(404).send({err: `There is no gif for ${searchTerm}, try again:( `}));
    }

}


