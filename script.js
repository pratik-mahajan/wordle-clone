const tileDisplay = document.querySelector('.tile-container')
const keyboard = document.querySelector('.key-container')
const messageDisplay = document.querySelector('.message-container')

const keys=[
    'Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '<<',
]

const isGameOver=false;

const word="CLICK"

const guessRows=[
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]

let currentRow=0
let currentTile=0

guessRows.forEach((guessRow, guessRowIndex) =>{
    const rowElement=document.createElement('div')    
    rowElement.setAttribute('id', 'guessRow-'+guessRowIndex)
    guessRow.forEach((guess, guessIndex)=>{
        const tileElement=document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-'+guessRowIndex+'-tile-'+guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })
    tileDisplay.append(rowElement)
})

const handleClick=(letter)=>{
    console.log('clicked ',letter)
    if(letter==='<<')
    {
        console.log('delete')
        deleteLetter()
        console.log(guessRows)
        return
    }
    if(letter==='ENTER')
    {
        console.log('check row')
        checkRow()
        return
    }
    addLetter(letter)
}

const addLetter=(letter)=>{
    if(currentTile<5 && currentRow<6)
    {
        const tile = document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
        tile.textContent=letter
        guessRows[currentRow][currentTile]=letter
        tile.setAttribute('data', letter)
        currentTile++
        console.log(guessRows)
    }
}

const deleteLetter=()=>{
    if(currentTile>0)
    {
        currentTile--
        const tile=document.getElementById('guessRow-'+currentRow+'-tile-'+currentTile)
        tile.textContent=''
        guessRows[currentRow][currentTile]=''
        tile.setAttribute('data', '')
    }
}

const checkRow=()=>{
    const guess = guessRows[currentRow].join('')
    if(currentTile>3)
    {
        console.log('guess = '+guess, 'wordle = '+word)
        flipTile()
        if(guess==word)
        {
            setTimeout(()=>showMessage('Bingo! The Answer is CLICK',), 2500)
            isGameOver=true
            return
        }
        else
        {
            currentRow++;
            currentTile=0;
            if(currentRow>=6)
            {
                showMessage('The word was "'+word+'" :(')
                isGameOver=true;
            }
            return
        }
    }
}

const showMessage=(message)=>{
    const messageElement=document.createElement('p')
    messageElement.textContent=message
    messageDisplay.append(messageElement)
    setTimeout(()=> messageDisplay.removeChild(messageElement), 50000)
}

const addColorToKey=(keyLetter, color)=>{
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}

const flipTile=()=>{
    const rowTiles=document.querySelector('#guessRow-'+currentRow).childNodes
    let checkWordle = word
    const guess=[]

    rowTiles.forEach(tile=>{
        guess.push({letter:tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index)=>{
        if(guess.letter==word[index])
        {
            guess.color='green-overlay'
            checkWordle=checkWordle.replace(guess.letter, '')
        }
    })
    
    guess.forEach(guess=>{
        if(checkWordle.includes(guess.letter)){
            guess.color='yellow-overlay'
            checkWordle=checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index)=>{
        setTimeout(()=>{
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 500*index)
    })
}

keys.forEach(key => {
    const buttonElement=document.createElement('button')
    buttonElement.textContent=key
    keyboard.append(buttonElement)  
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', ()=>handleClick(key))
})