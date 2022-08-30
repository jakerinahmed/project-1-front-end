function getAllEntries(){
    fetch('https://wrote-it-babole.herokuapp.com/journal-entries')
        .then(r => r.json())
        .then(appendEntries)
        .catch(console.warn)
};

// create new comment

function submitEntry(e){
    e.preventDefault();

    const entryData = {
        title: e.target.titleOfPost.value,
        content: e.target.contentOfPost.value
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(entryData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('https://wrote-it-babole.herokuapp.com/journal-entries', options)
        .then(r => r.json())
        .then(location.href = '#')
        .catch(console.warn)
};

// add comments to page

function appendEntries(entries){
    entries.forEach(appendEntry);
    const cards = document.querySelectorAll(".card");
    cards.forEach((e) => {
        e.addEventListener('click', (e) => {
            location.href = "http://localhost:8000/view.html?="+e.currentTarget.id
        })
    })
};

function appendEntry(entryData){
    const newDiv = document.createElement('div');
    newDiv.className = 'card w-100 my-3';    
    newDiv.id = entryData.id  

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    const title = document.createElement('h5');
    title.className = 'card-title'
    title.textContent = entryData.title

    const text = document.createElement('p');
    text.className = 'card-text'
    text.textContent = entryData.content



    // const commentBtn = document.createElement('a');
    // commentBtn.className = 'comment-button'
    // commentBtn.textContent = 'Comment'

    newDiv.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(text);
    // cardBody.appendChild(commentBtn);

    const recentEntries = document.querySelector('#recent-entries');
    recentEntries.append(newDiv);
};
