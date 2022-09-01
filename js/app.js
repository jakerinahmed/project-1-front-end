//Home page

function getAllEntries(){
    fetch('https://wrote-it-babole.herokuapp.com/journal-entries')
        .then(r => r.json())
        .then(appendEntries)
        .catch(console.warn)
};


function appendEntries(entries){
    entries.forEach(appendEntry);
    const cards = document.querySelectorAll(".card-body");
    cards.forEach((e) => {
        e.addEventListener('click', (e) => {
            location.href = "view.html?="+e.currentTarget.id
        })
    })

    const eButtons = document.querySelectorAll("#eBtn");
    eButtons.forEach((e) => {
        e.addEventListener('click', () => {
            updateEmojiCount(e)
        })
    })
};


function appendEntry(entryData){
    const newDiv = document.createElement('div');
    newDiv.className = 'card w-100 my-4';     
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body'
    cardBody.id = entryData.id 
    
    const title = document.createElement('h5');
    title.className = 'card-title'
    title.textContent = entryData.title
    
    const text = document.createElement('p');
    text.className = 'card-text'
    text.textContent = entryData.content

    //emojis
    const emojiDiv = document.createElement('div');
    emojiDiv.id = "emoji";

    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'emojiBtn';

    const emojiBtn1 = document.createElement('button')
    emojiBtn1.id = "eBtn"
    emojiBtn1.textContent = String.fromCodePoint( 128512 );
    const emoji1Count = document.createElement('span')
    emoji1Count.id = "e1:" + entryData.id
    emoji1Count.textContent = entryData.emoji1
    emojiBtn1.appendChild(emoji1Count)

    const emojiBtn2 = document.createElement('button')
    emojiBtn2.id = "eBtn"
    emojiBtn2.textContent = String.fromCodePoint( 128558 );
    const emoji2Count = document.createElement('span')
    emoji2Count.id = "e2:" + entryData.id
    emoji2Count.textContent = entryData.emoji2
    emojiBtn2.appendChild(emoji2Count)

    const emojiBtn3 = document.createElement('button')
    emojiBtn3.id = "eBtn"
    emojiBtn3.textContent = String.fromCodePoint( 128169 );
    const emoji3Count = document.createElement('span')
    emoji3Count.id = "e3:" + entryData.id
    emoji3Count.textContent = entryData.emoji3
    emojiBtn3.appendChild(emoji3Count)

    
    newDiv.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(text);

    newDiv.appendChild(emojiDiv);
    emojiDiv.appendChild(emojiSpan);
    emojiSpan.appendChild(emojiBtn1)
    emojiSpan.appendChild(emojiBtn2)
    emojiSpan.appendChild(emojiBtn3)
    
    const recentEntries = document.querySelector('#recent-entries');
    recentEntries.append(newDiv);
};


//Create page

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
        .then(location.href = '#') // << make function to check if fields are truthy for redirect
        .catch(console.warn)
};

//View page

function getOneEntry(e){
    fetch('https://wrote-it-babole.herokuapp.com/journal-entries/' + e)
        .then(r => r.json())
        .then(viewEntry)
        .catch(console.warn)
}

function viewEntry(entryData){
    const newDiv = document.createElement('div');
    newDiv.className = 'card w-100';     
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body'
    
    const title = document.createElement('h5');
    title.className = 'card-title'
    title.textContent = entryData.title
    
    const text = document.createElement('p');
    text.className = 'card-text'
    text.textContent = entryData.content

    //emojis
    const emojiDiv = document.createElement('div');
    emojiDiv.id = "emoji";

    const emojiSpan = document.createElement('span');
    emojiSpan.className = 'emojiBtn';

    const emojiBtn1 = document.createElement('button')
    emojiBtn1.id = "eBtn"
    emojiBtn1.textContent = String.fromCodePoint( 128512 );
    const emoji1Count = document.createElement('span')
    emoji1Count.id = "e1:" + entryData.id
    emoji1Count.textContent = entryData.emoji1
    emojiBtn1.appendChild(emoji1Count)

    const emojiBtn2 = document.createElement('button')
    emojiBtn2.id = "eBtn"
    emojiBtn2.textContent = String.fromCodePoint( 128558 );
    const emoji2Count = document.createElement('span')
    emoji2Count.id = "e2:" + entryData.id
    emoji2Count.textContent = entryData.emoji2
    emojiBtn2.appendChild(emoji2Count)

    const emojiBtn3 = document.createElement('button')
    emojiBtn3.id = "eBtn"
    emojiBtn3.textContent = String.fromCodePoint( 128169 );
    const emoji3Count = document.createElement('span')
    emoji3Count.id = "e3:" + entryData.id
    emoji3Count.textContent = entryData.emoji3
    emojiBtn3.appendChild(emoji3Count)

    
    newDiv.appendChild(cardBody);
    cardBody.appendChild(title);
    cardBody.appendChild(text);

    // newDiv.appendChild(emojiDiv);
    emojiDiv.appendChild(emojiSpan);
    emojiSpan.appendChild(emojiBtn1)
    emojiSpan.appendChild(emojiBtn2)
    emojiSpan.appendChild(emojiBtn3)
    
    const blogEntries = document.querySelector('#blog-entries');
    blogEntries.append(emojiDiv);
    blogEntries.append(newDiv);

    //add emoji eventListeners
    const eButtons = document.querySelectorAll("#eBtn");
    eButtons.forEach((e) => {
        e.addEventListener('click', () => {
            updateEmojiCount(e)
        })
    })
}

function addComment(){
    const addComentBtn = document.querySelector('.addcomment-btn');

    // console.log(window.location.search.slice(searchTerm.search('=')+1))

    if (clickNo === 0) {
        clickNo += 1

        const getFormBtn = document.createElement('button')
        getFormBtn.className = "card-link text-right comment"
        getFormBtn.type = "button"
        getFormBtn.id = "get-form"
        getFormBtn.append('Add comment')

        addComentBtn.appendChild(getFormBtn)

        getFormBtn.addEventListener('click', () => {
            addComment()
        })
        
    } else if (clickNo % 2 === 0) {
        clickNo += 1

        addComentBtn.removeChild(document.querySelector('#form-div'))

        const getFormBtn = document.createElement('button')
        getFormBtn.className = "card-link text-right comment"
        getFormBtn.type = "button"
        getFormBtn.id = "get-form"
        getFormBtn.append('Add comment')

        addComentBtn.appendChild(getFormBtn)

        getFormBtn.addEventListener('click', () => {
            addComment()
        })

    } else {
        clickNo += 1

        addComentBtn.removeChild(document.querySelector('#get-form'))

        const newDiv = document.createElement('div')
        newDiv.className = 'card w-100';
        newDiv.id = 'form-div'
    
        const newForm = document.createElement('form')
        newForm.id = "new-comment-form"
        newDiv.appendChild(newForm)
    
        const newTextArea = document.createElement('textarea')
        newTextArea.className = "form-control"
        newTextArea.id = "contentOfComment"
        newTextArea.setAttribute("rows", "3");
        newTextArea.setAttribute("placeholder", "Start typing...")
        
        const btnDiv = document.createElement('div')
        btnDiv.className = "m-1"
        btnDiv.id = "submitBtn"
    
        const inputBtn = document.createElement('input')
        inputBtn.type = "submit"
        inputBtn.setAttribute("value", "Submit Comment!");
        btnDiv.appendChild(inputBtn)
        
        newForm.append(newTextArea, btnDiv)
        addComentBtn.append(newDiv)

        newForm.addEventListener('submit', submitComment)
    }
}

function submitComment(e){
    e.preventDefault();
    // console.log(e.target.contentOfComment.value)

    const entryData = {
        content: e.target.contentOfComment.value,
        entryId: parseInt(window.location.search.slice(searchTerm.search('=')+1))
    };

    const options = { 
        method: 'POST',
        body: JSON.stringify(entryData),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('https://wrote-it-babole.herokuapp.com/comments', options)
        .then(r => r.json())
        .then(appendComment)
        .catch(console.warn)


    addComment()
}

function getEntryComments(e){
    fetch('https://wrote-it-babole.herokuapp.com/comments/eId/' + e)
        .then(r => r.json())
        .then(appendComments)
        .catch(console.warn)
}

function appendComments(comments){
    comments.forEach(appendComment); 
}

function appendComment(commentData){
    const newDiv = document.createElement('div');
    newDiv.className = 'card w-100 my-1';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body'

    const text = document.createElement('p');
    text.className = 'card-text'
    text.textContent = commentData.content

    newDiv.appendChild(cardBody);
    cardBody.appendChild(text);

    const commentSection = document.querySelector('#comment-section');
    commentSection.append(newDiv);
}

//Common

function updateEmojiCount(e){
    const countId = e.children[0].id
    const entryId = countId[countId.search(":") + 1]
    const emojiNo = parseInt(countId[countId.search(":") - 1])

    const count = parseInt(e.children[0].innerText)
    let changes = null
    if (emojiNo === 1) {
        changes = { emoji1: count + 1 }
    } else if (emojiNo === 2) {
        changes = { emoji2: count + 1 }
    } else if (emojiNo === 3) {
        changes = { emoji3: count + 1 }
    }

    const options = { 
        method: 'PATCH',
        body: JSON.stringify(changes),
        headers: {
            "Content-Type": "application/json"
        }
    };

    fetch('https://wrote-it-babole.herokuapp.com/journal-entries/'+entryId, options)
        .then(r => r.json())
        .then(appendEmojiCount)
        .catch(console.warn)
}

function appendEmojiCount(entryData){
    document.querySelector("#e1\\:"+entryData.id).textContent = entryData.emoji1
    document.querySelector("#e2\\:"+entryData.id).textContent = entryData.emoji2
    document.querySelector("#e3\\:"+entryData.id).textContent = entryData.emoji3
}

module.exports = {
    getAllEntries,
    submitEntry,
    updateEmojiCount,
    appendEntry
}
