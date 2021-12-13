const section = document.querySelector("section")
const playerLivesCount = document.querySelector(".playerLivesCount")
let playerLives = 6;

playerLivesCount.textContent = playerLives

// Data Creation function
// --1) Array of images as objects in function called get Data
// --1.1) NOTE: if NO curly brackets after arrow, it will automatically return array upon invoking
//             const getData = () => "{" [{}] "}" <--- DONT USE CURLY BRACKETS!!!!

const getData = () => [
    {imgSrc: "./images/AM.jpg", name: "AM"},
    {imgSrc: "./images/Favourite-worst-nightmare.jpg", name: "Favourite-worst-nightmare"},
    {imgSrc: "./images/Humbug.jpg", name: "Humbug"},
    {imgSrc: "./images/I-am-Sasha-Fierce.jpg", name: "Beyonce"},
    {imgSrc: "./images/Ia.jpg", name: "21 Savage"},
    {imgSrc: "./images/Madman-acro-the-water.jpg", name: "Elton John"},
    {imgSrc: "./images/Suffering-from-succe-ed-deluxe.jpg", name: "DJ Khaleed"},
    {imgSrc: "./images/Whatever-people-say-I-am-that-s-what-I-m-not.jpg", name: "Arctic Monkeys"}, 
    {imgSrc: "./images/AM.jpg", name: "AM"},
    {imgSrc: "./images/Favourite-worst-nightmare.jpg", name: "Favourite-worst-nightmare"},
    {imgSrc: "./images/Humbug.jpg", name: "Humbug"},
    {imgSrc: "./images/I-am-Sasha-Fierce.jpg", name: "Beyonce"},
    {imgSrc: "./images/Ia.jpg", name: "21 Savage"},
    {imgSrc: "./images/Madman-acro-the-water.jpg", name: "Elton John"},
    {imgSrc: "./images/Suffering-from-succe-ed-deluxe.jpg", name: "DJ Khaleed"},
    {imgSrc: "./images/Whatever-people-say-I-am-that-s-what-I-m-not.jpg", name: "Arctic Monkeys"}
]

// Randomisation Function
const randomize = () => {
    // --1) save the the array in a variable
    const cardData = getData()
    
    // --2) to randomize the cards, run method on it (SORT)
    cardData.sort(() => Math.random() - 0.5) 

    // --3) in order to be able to use the data from this 
    //      function in other functions i have to RETURN it
    return cardData

    // console.log(cardData);
}
        // randomize()

// Card Generator Function to generate cards in HTML
const cardGenerator = () => {
    // --1) get randomized cards
    const cardData = randomize()
    // console.log(cardData);
    
    // --3) FOR EACH LOOP to generate all of the 16 cards
    cardData.forEach((item) => {
        // --2) HTML Card Geneartion 
        // NOTE: This is only one card!!!
        //       I Need TO DO it for all the cards!!!
        const card = document.createElement("div")
        // --2.1) Create Anterior of the card
        const cardAnterior = document.createElement("img")
        // --2.2) Create Posterior of the card
        const cardPosterior = document.createElement("div")
        
        // Add Classes 
        // NOTE: classes MUST BE named the same as VARIABLES 
        card.classList = "card"
        cardAnterior.classList = "anterior"
        cardPosterior.classList = "posterior"
        
            // --5) ATTACH THE COVER TO THE CARDS
            cardAnterior.src = item.imgSrc
            
            // --7.1 get card name
            card.setAttribute('name', item.name)
            
        // --4) ATTACH THE CARDS TO THE SECTION
        section.appendChild(card)
        card.appendChild(cardAnterior)
        card.appendChild(cardPosterior)

        // --6) ADD EVENT LISTENER
        card.addEventListener("click", (e) => {
            card.classList.toggle("toggle-card")
                    checkCards(e)
                })
    })
}

// --7) CHECK CARDS
const checkCards = (e) => {
    const clickedCard = e.target
    clickedCard.classList.add("flipped")
    const flippedCards = document.querySelectorAll(".flipped")
    const toggleCard =  document.querySelectorAll(".toggle-card")
    // LOGIC
    if (flippedCards.length === 2) {
        if (
            flippedCards[0].getAttribute("name") ===
            flippedCards[1].getAttribute("name")
            ) {
                console.log("match")
                flippedCards.forEach((card) => {
                    card.classList.remove("flipped");
                card.style.pointerEvents = "none";
                
            })
        } else {
            console.log("wrong");
            // REMOVE ALL THE FLIPPED cards
            flippedCards.forEach((card) => {
                card.classList.remove("flipped");
                setTimeout(() => card.classList.remove("toggle-card"), 1000)
            })
            
            // UPDATE PLAYERS LIVE COUNT
            playerLives--;
            playerLivesCount.textContent = playerLives;
            
            // RESTART THE GAME ON LIVES = 0
            if (playerLives === 0) {
                restart ("you lost")
            }
        }
    }
    if(toggleCard.length === 16) {
        restart("you won")
    }
}


// RESTART FUNCTION
const restart = (text) => {
    let cardData = randomize()
    let anterior = document.querySelectorAll(".anterior")
    let cards = document.querySelectorAll(".card")
    section.style.pointerEvents = "none"

    cardData.forEach((item, index) => {
        cards[index].classList.remove('toggle-card')

        // randomize
        setTimeout(() => {
            cards[index].style.pointerEvents= "all"
            anterior[index].src = item.imgSrc;
            cards[index].setAttribute('name', item.name)
            section.style.pointerEvents = "all"
        }, 1000)
    })
    playerLives =6;
    playerLivesCount.textContent = playerLives;
    setTimeout(() => window.alert(text), 1000)
}

cardGenerator()