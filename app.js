let deckId = ''
let player1points = 0
let player2points = 0

fetch(`https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        deckId = data.deck_id 

    })
    .catch(err => {
        console.log(`error ${err}`)
    })

document.querySelector("button").addEventListener("click", drawTwo)

function drawTwo() {
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`

    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.remaining > 0) {
                document.querySelector("#player1").src = data.cards[0].image
                document.querySelector("#player2").src = data.cards[1].image
    
                let player1Val = convertIntoNum(data.cards[0].value)
                let player2Val = convertIntoNum(data.cards[1].value)
    
                if(player1Val > player2Val) {
                    document.querySelector("h3").innerText = "Player 1 Wins"
                    document.querySelector(".player-1-score").innerText = player1points += 1
                    document.querySelector(".player-2-score").innerText = player2points -= 1
                } else if (player1Val < player2Val) {
                    document.querySelector("h3").innerText = "Player 2 Wins"
                    document.querySelector(".player-1-score").innerText = player1points -= 1
                    document.querySelector(".player-2-score").innerText =  player2points += 1
                } else {
                    document.querySelector("h3").innerText = "Tie!"
                }  
            }
             else {
                //  = (`${player1points}` > `${player2points}`) ? "Player 1 win" : "Player 2 win" 
                if(`${player1points}` > `${player2points}`) {
                    document.querySelector(".winner").innerText = "Player 1 win"
                } else if (`${player1points}` < `${player2points}`) {
                    document.querySelector(".winner").innerText = "Player 2 win"
                } else {
                    document.querySelector(".winner").innerText = "What a game, tie"
                }
            }

        })
        .catch(err => {
            console.log(`error ${err}`)
        })
} 

function convertIntoNum(val) {
    if(val === "ACE") {
        return 14
    } else if (val === "KING") {
        return 13
    } else if (val === "QUEEN") {
        return 12
    } else if (val === "JACK") {
        return 11
    } else {
        return Number(val)
    }
}
