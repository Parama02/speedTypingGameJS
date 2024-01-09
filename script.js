const API_URL = 'https://api.quotable.io/random' //free api for random quote generator

//getElementById
const displayQuotesElement = document.getElementById("displayQuotes")
const inputElement = document.getElementById("displayInput")
const timer = document.getElementById("timer")

//event listerner for input field
inputElement.addEventListener('input', ()=>{
    const quotesArray = displayQuotesElement.querySelectorAll('span') //return nodelist [ here array of span elements ]
    const inputArray = inputElement.value.split('') // value obj and split()
    
    let correct = true
    quotesArray.forEach((charSpan,index) => {  //forEach()
        const char = inputArray[index]
        if(char == null){
            charSpan.classList.remove('correct')   //classList obj with add() and remove()
            charSpan.classList.remove('incorrect')
            correct = false
        }else if(char === charSpan.innerText){
            charSpan.classList.add('correct')
            charSpan.classList.remove('incorrect')
        }else{
            charSpan.classList.remove('correct')
            charSpan.classList.add('incorrect')
            correct = false
        }
    })
    if(correct) renderRandomQuote()
})

function getRandomQuote(){  //handle promise with .then
    return fetch(API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderRandomQuote(){  //async func
    const quote = await getRandomQuote()  //await
    displayQuotesElement.innerText = ''  // innerText (DOM manupulation using getElementById and innerText)
    quote.split('').forEach((char)=> {
        const charSpan = document.createElement('span') //createElement
        charSpan.innerText = char
        displayQuotesElement.appendChild(charSpan) //appendChild
    })
    inputElement.value = null
    startTimer()
}

/* setInterval does not guarantee accurate time so calculate using Date() and Math */

let startTime
function startTimer(){
    timer.innerText = 0
    startTime = new Date(); //create date obj using new Date()
    setInterval(() => {    //setInverval()
        timer.innerText = getTimer()
    }
    ,1000) //1000 millisec = 1 sec execute for every sec
}

function getTimer(){
    return Math.floor((new Date() - startTime)/1000) //Math.floor()
}


renderRandomQuote() //func call

