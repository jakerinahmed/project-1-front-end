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