//#1 removing the homepage and displaying the cards

const home = document.getElementById("homepage");
const bodybg = document.querySelector("body");
const sectionbg = document.querySelector("section") ;
const cardsTemplate = document.getElementById("cardsTemplate") ;
const all = document.querySelector("*") ;
const timer = document.querySelector("#timer") ;

function removeHome(){

  home.style.transform = "translateX(-120%)" ;
  home.style.transition = "transform 2s ease-in" ;

  setTimeout(() => {

      home.style.display = "none" ;
      sectionbg.style.backgroundColor = "none" ;
      all.style.backgroundColor = "none" ;
      bodybg.style.backgroundColor = "none" ;
      bodybg.style.backgroundImage = "URL(https://i.pinimg.com/564x/36/52/37/3652379f4a122677a27849e186c3e3fb.jpg)" ;
      cardsTemplate.style.display = "grid" ;
      timer.style.display = "block" ;

  }, 2000) ; // setTimeOut() ends here

}// removeHome() ends here


//#2 matching the cards and eliminating them from screen if the match result is true

// const card = document.querySelector(".grid-item") ;
let flippedCards = [] ; // an array for containing the 2 flipped cards of the moment temporarily
let allFlippedCards = [] ; // array for containing all the flipped cards

function rotateCard(element, event) {

  event.preventDefault(); // Prevent default behavior of clicking the image link

  const backOfCard = element.querySelector("img");
  backOfCard.style.opacity = "1";
  backOfCard.style.transition = "opacity 0.6s ease-in";

  flippedCards.push(element); // adding cards into the flippedCards array

  if (flippedCards.length === 2) {
    
    setTimeout(() => {

      const card1Image = flippedCards[0].querySelector("img").src;
      const card2Image = flippedCards[1].querySelector("img").src;

      if (card1Image === card2Image) {

        element.style.opacity = "0" ;
        element.style.transition = "opacity 0.3s ease";
        // element.style.pointerEvents = "none";

        flippedCards[0].style.opacity = "0" ;
        flippedCards[0].style.transition = "opacity 0.3s ease";
        // flippedCards[0].style.pointerEvents = "none";

        // adding both matched cards to a new array
        allFlippedCards.push(element);
        allFlippedCards.push(flippedCards[0]) ; 
        
        flippedCards.splice(0, 2); // Remove both cards from the flippedCards array

      } else {

        backOfCard.style.opacity = "0";
        backOfCard.style.transition = "opacity 0.3s ease";

        flippedCards[0].querySelector("img").style.opacity = "0";
        flippedCards[0].querySelector("img").style.transition = "opacity 0.3s ease-in";

        // removeMatchedCards() ;
        flippedCards.splice(0, 2); // Remove both cards from the flippedCards array

      } // else ends here

    }, 1000); // setTimeOut() ends here

  } // outer if ends here

} // rotateCard() ends here 


//#3 Applying timer to decide whether the user won or lose

const button = document.getElementById("playbutton") ;

const time = document.getElementById("time") ;
const sec = document.getElementById("sec") ;
let seconds = 60 ;
let timeInterval;

function timeDecreaser() {
  time.textContent = seconds ;

  if(seconds <= 10){

    time.style.color = "red" ;
    sec.style.color = "red" ;

  }else{

    time.style.color = "white";
    sec.style.color = "white" ;

  }

  const totalCards = document.querySelectorAll(".grid-item").length ;
  if(allFlippedCards.length === totalCards && seconds > 0){

    clearInterval(timeInterval) ;
    cardsTemplate.style.display = "none" ;
    document.getElementById("won").style.display = "block" ; 
    // document.querySelector("#won span").style.display = "block" ;
    
  }

  if(seconds === 0 && flippedCards.length < totalCards){

    clearInterval(timeInterval) ;
    cardsTemplate.style.display = "none" ;
    document.getElementById("lose").style.display = "block" ;
    // document.querySelector("#lose span").style.display = "block" ;
    
  }else{

    seconds-- ;

  }

} // timeDecreaser() ends here

button.addEventListener('click', function() {
  timeInterval = setInterval(timeDecreaser, 1000) ; // this method will be triggered when play button is clicked, and this will call the timeDecreaser() in each 1 sec unless clearInterval is not called. 
});


// #4 replay game method

function replay() {
  // Clear the interval to stop the timer for replayed game
  clearInterval(timeInterval);

  // Reset the timer and flipped cards arrays
  seconds = 60;
  time.textContent = seconds;
  flippedCards = [];
  allFlippedCards = [];

  // Show the cards template and hide win/lose messages
  cardsTemplate.style.display = 'grid';

  let allCards = document.querySelectorAll(".grid-item") ;
  let allCardsImg = document.querySelectorAll(".grid-item img");

  allCards.forEach((allCard) => {
    allCard.style.opacity = "1" ;
  })

  allCardsImg.forEach((allCardImg) => {
    allCardImg.style.opacity = "0" ;
  }) 

  document.getElementById('won').style.display = 'none';
  document.getElementById('lose').style.display = 'none';

  // Restart the timer for replayed game
  timeInterval = setInterval(timeDecreaser, 1000);
}