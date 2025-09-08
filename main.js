// start game 
const startContainer = document.querySelector(".start-game");
const inputStart = document.querySelector(".start-game input");
const startButton = document.querySelector(".start-game button");


// main variables
const PlayerName = document.querySelector(".game-header .name span");
const cardContainer = document.querySelector(".game-body");
const cards = Array.from(cardContainer.children);
const restartButton = document.querySelectorAll(".restart");
let moves = document.querySelector(".info .moves span");
const duration = 1000;
let isStart = false;
let matches = 0;
// setTimeout
let timer;

// enable restart button 
restartButton.forEach(button => {
    button.addEventListener("click", function () { window.location.reload(); });
});

// when user click on start game button 
startButton.addEventListener("click", function () {
    if (inputStart.value === '')
        PlayerName.innerHTML = "UNKNOWN";
    else
        PlayerName.innerHTML = inputStart.value;
    startContainer.remove();
    document.querySelector("#start").play();
});

let orderArray = [...cards.keys()];
shuffle(orderArray);

// add order each card to shuffle it 
cards.forEach((card, index) => {
    // add random order to each card 
    card.style.order = orderArray[index];

    card.addEventListener("click", function () {
        flipCard(this);
        if (!isStart) {
            startTimer();
            isStart = true;
        }
    });
});

// start game function 
function startTimer() {
    let min = document.querySelector(".min");
    let sec = document.querySelector(".sec");
    timer = setInterval(function () {
        if (min.innerHTML === "0" && sec.innerHTML === "00") {
            document.querySelector(".lose").classList.add("show");
            stopTimer();
            return;
        }
        else if (sec.innerHTML === '00') {
            sec.innerHTML = '59';
            min.innerHTML--;
        }
        else if (parseInt(sec.innerHTML) > 10) {
            sec.innerHTML--;
        }
        else {
            sec.innerHTML = `0${--sec.innerHTML}`;
        }

    }, duration);
}

// function stop timer 
const stopTimer = () => clearInterval(timer);



// shuffle function to shuffle array 
function shuffle(array) {
    let currentIndex = array.length - 1,
        temp,
        random;
    while (currentIndex > 0) {
        // get random number in range 0 to previos currentIndex
        random = Math.floor(Math.random() * currentIndex);

        // get the current value in temp 
        temp = array[currentIndex];

        // get random value in current element 
        array[currentIndex] = array[random];

        // get current Element in random value 
        array[random] = temp;

        currentIndex--;
    }
}

// flipCard function 
function flipCard(selectedcard) {
    // add 'is-flipped' class in selected card
    selectedcard.classList.add("is-flipped");

    let flippedCard = cards.filter(card => card.classList.contains("is-flipped"));

    if (flippedCard.length === 2) {
        // stop stopClicking until check pair card
        stopClicking();

        checkingPair(flippedCard[0], flippedCard[1]);
    }
}


// stop clicking function 
function stopClicking() {
    // add class no click to cards
    cardContainer.classList.add("no-click");

    // remove class no click after checking
    setTimeout(() => cardContainer.classList.remove("no-click"), duration);
}

// checking pair function
function checkingPair(firstFlipped, secondFlipped) {

    if (firstFlipped.dataset.logo === secondFlipped.dataset.logo) {
        matches++;
        if (matches === cards.length / 2) {
            document.querySelector(".win").classList.add("show");
            document.querySelector(".win .moves span").innerHTML = moves.innerHTML;
            document.querySelector(".win .time span").innerHTML = 70 - document.querySelector(".sec").innerHTML;
            document.querySelector(".win h2 span").innerHTML = PlayerName.innerHTML;
            stopTimer();
        }
        firstFlipped.classList.add("matched");
        secondFlipped.classList.add("matched");
        document.querySelector("#success").play();
    }
    else {
        moves.innerHTML++;
        document.querySelector("#fail").play();
    }
    setTimeout(() => {
        firstFlipped.classList.remove("is-flipped");
        secondFlipped.classList.remove("is-flipped");
    }, duration);

};

