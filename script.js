"use strict";
window.addEventListener("load", ready);

// globale variabler
let points = 0;
let lives = 3;

function ready() {
  console.log("JavaScript ready!");
  document.querySelector("#btn_start").addEventListener("click", startGame);
  document.querySelector("#btn_restart").addEventListener("click", startGame);
  document
    .querySelector("#btn_go_to_start")
    .addEventListener("click", showStartScreen);
}

function showGameScreen() {
  // Skjul startskærm, game over og level complete
  document.querySelector("#start").classList.add("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function showStartScreen() {
  // fjern hidden fra startskærm og tilføj til game over og level complete
  document.querySelector("#start").classList.remove("hidden");
  document.querySelector("#game_over").classList.add("hidden");
  document.querySelector("#level_complete").classList.add("hidden");
}

function resetLives() {
  // sæt lives til 3
  lives = 3;
  //nulstil visning af liv (hjerte vi ser)
  document.querySelector("#cheeseheart1").classList.remove("broken_heart");
  document.querySelector("#cheeseheart2").classList.remove("broken_heart");
  document.querySelector("#cheeseheart3").classList.remove("broken_heart");
  document.querySelector("#cheeseheart1").classList.add("active_heart");
  document.querySelector("#cheeseheart2").classList.add("active_heart");
  document.querySelector("#cheeseheart3").classList.add("active_heart");
}

function resetPoints() {
  // nulstil point
  points = 0;
  // nulstil vising af point
  displayPoints();
}

function startGame() {
  console.log("Start");
  //registrerClick();
  //sætPositioner();
  resetLives();
  resetPoints();
  showGameScreen();

  // Start baggrundsmusik
  document.querySelector("#sound_background").play();

  // start alle animationer
  startAllAnimations();

  startTimer();

  // Registrer click
  document
    .querySelector("#cheese_container1")
    .addEventListener("mousedown", clickElement);
  document
    .querySelector("#cheese_container2")
    .addEventListener("mousedown", clickElement);
  document
    .querySelector("#cheese_container3")
    .addEventListener("mousedown", clickElement);
  document
    .querySelector("#cheese_container4")
    .addEventListener("mousedown", clickElement);
  document
    .querySelector("#cupcake_container5")
    .addEventListener("mousedown", clickfastfood);
  document
    .querySelector("#pie_container6")
    .addEventListener("mousedown", clickfastfood);

  document
    .querySelector("#fries_container7")
    .addEventListener("mousedown", clickfastfood);

  document
    .querySelector("#chocolade_container8")
    .addEventListener("mousedown", clickfastfood);

  document
    .querySelector("#cheesecake_container9")
    .addEventListener("mousedown", clickfastfood);

  document
    .querySelector("#icecream_container10")
    .addEventListener("mousedown", clickfastfood);

  // Registrer når bunden rammes
  Animationiteration();
}

function startAllAnimations() {
  // Start falling animationer
  document.querySelector("#cheese_container1").classList.add("falling");
  document.querySelector("#cheese_container2").classList.add("falling");
  document.querySelector("#cheese_container3").classList.add("falling");
  document.querySelector("#cheese_container4").classList.add("falling");
  document.querySelector("#cupcake_container5").classList.add("falling");
  document.querySelector("#pie_container6").classList.add("falling");
  document.querySelector("#fries_container7").classList.add("falling");
  document.querySelector("#chocolade_container8").classList.add("falling");
  document.querySelector("#cheesecake_container9").classList.add("falling");
  document.querySelector("#icecream_container10").classList.add("falling");

  // Sæt position klasser
  document.querySelector("#cheese_container1").classList.add("position1");
  document.querySelector("#cheese_container2").classList.add("position2");
  document.querySelector("#cheese_container3").classList.add("position3");
  document.querySelector("#cheese_container4").classList.add("position4");
  document.querySelector("#cupcake_container5").classList.add("position5");
  document.querySelector("#pie_container6").classList.add("position6");
  document.querySelector("#fries_container7").classList.add("position7");
  document.querySelector("#chocolade_container8").classList.add("position8");
  document.querySelector("#cheesecake_container9").classList.add("position9");
  document.querySelector("#icecream_container10").classList.add("position10");
}

function Animationiteration() {
  document
    .querySelector("#cheese_container1")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#cheese_container2")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#cheese_container3")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#cheese_container4")
    .addEventListener("animationiteration", elementRestart);

  document
    .querySelector("#cupcake_container5")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#pie_container6")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#fries_container7")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#chocolade_container8")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#cheesecake_container9")
    .addEventListener("animationiteration", elementRestart);
  document
    .querySelector("#icecream_container10")
    .addEventListener("animationiteration", elementRestart);
}

function clickElement() {
  console.log("Click element");
  // Brug en element variabel i stedet for gentagne querySelectors
  let element = this; // document.querySelector("#cheese_container1");

  // Forhindr gentagne clicks
  element.removeEventListener("mousedown", clickElement);

  // Stop coin container
  element.classList.add("paused");

  // sæt forsvind-animation på sprite
  element.querySelector("img").classList.add("zoom_out");

  // når forsvind-animation er færdig: elementGone
  element.addEventListener("animationend", elementGone);

  //Genstart click-lyd
  document.querySelector("#sound_click").currentTime = 0;
  // Afspil click-lyd
  document.querySelector("#sound_click").play();

  // Giv point
  incrementPoints();
}

function elementGone() {
  console.log("element gone");
  // Brug en element variabel i stedet for gentagne querySelectors
  let element = this; //document.querySelector("#cheese_container1");
  // fjern event der bringer os herind
  element.removeEventListener("animationend", elementGone);

  // fjern forsvind-animation på sprite
  element.querySelector("img").classList.remove("zoom_out");

  // fjern pause
  element.classList.remove("paused");

  elementRestart.call(this);

  // gør det muligt at klikke på element igen
  element.addEventListener("mousedown", clickElement);
}

function elementRestart() {
  console.log("element-restart");
  let element = this;

  // genstart falling animation
  element.classList.remove("falling");
  element.offsetWidth;
  element.classList.add("falling");

  // fjern alle positioner
  element.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8",
    "position9",
    "position10"
  );

  // sæt position til en ny klasse
  const p = Math.ceil(Math.random() * 10);
  element.classList.add(`position${p}`);
}

function clickfastfood() {
  console.log("Click-fastfood");
  // Forhindr gentagne clicks
  let fastfood = this;
  fastfood.removeEventListener("mousedown", clickfastfood);

  // Stop coin container
  fastfood.classList.add("paused");

  // sæt forsvind-animation på fastfood
  fastfood.querySelector("img").classList.add("zoom_in");

  // når forsvind-animation er færdig: fastfoodGone
  fastfood.addEventListener("animationend", fastfoodGone);
  // Genstart bombe-lyd
  document.querySelector("#sound_bomb").currentTime = 0;
  // Afspil bombe-lyd
  document.querySelector("#sound_bomb").play();

  decrementLives();
}

function fastfoodGone() {
  console.log("fastFoodGone");
  let fastfoodGone = this;
  // fjern event der bringer os herind
  fastfoodGone.removeEventListener("animationend", fastfoodGone);

  // fjern forsvind-animation
  fastfoodGone.querySelector("img").classList.remove("zoom_in");

  // fjern pause
  fastfoodGone.classList.remove("paused");

  fastFoodRestart.call(this);

  // genstart falling animation

  // gør det muligt at klikke på bomb igen
  fastfoodGone.addEventListener("mousedown", clickfastfood);
}

function fastFoodRestart() {
  console.log("fastfoodRestart");

  const fastfoodGone = this;

  fastfoodGone.classList.remove("falling");
  fastfoodGone.offsetWidth;
  fastfoodGone.classList.add("falling");

  fastfoodGone.classList.remove(
    "position1",
    "position2",
    "position3",
    "position4",
    "position5",
    "position6",
    "position7",
    "position8",
    "position9",
    "position10"
  );

  const p = Math.ceil(Math.random() * 10);
  fastfoodGone.classList.add(`position${p}`);
}

function incrementPoints() {
  console.log("Giv point");
  points++;
  console.log("har nu " + points + " point");
  displayPoints();

  if (points === 10) {
    levelComplete();
  }
}

function displayPoints() {
  console.log("vis point");
  document.querySelector("#score_board").textContent = points;
}

function decrementLives() {
  console.log("mist et liv");

  showDecrementedLives();
  lives--;
  if (lives === 0) {
    gameOver();
  }
}

function showDecrementedLives() {
  document
    .querySelector("#cheeseheart" + lives)
    .classList.remove("active_heart");
  document.querySelector("#cheeseheart" + lives).classList.add("broken_heart");
}

function gameOver() {
  console.log("Game Over");
  document.querySelector("#game_over").classList.remove("hidden");
  stopGame();
  document.querySelector("#sound_game_over").play();
}

function levelComplete() {
  console.log("Level Complete");
  document.querySelector("#level_complete").classList.remove("hidden");
  stopGame();
  // Afspil tada-lyd
  document.querySelector("#sound_tada").play();
}

function startTimer() {
  console.log("time is going");
  // Sæt timer-animationen (shrink) i gang ved at tilføje klassen shrink til time_sprite
  document.querySelector("#time_sprite").classList.add("shrink");

  // Tilføj en eventlistener som lytter efter at animationen er færdig (animationend) og kalder funktionen timeIsUp
  document
    .querySelector("#time_sprite")
    .addEventListener("animationend", timeIsUp);
}

function timeIsUp() {
  console.log("Tiden er gået!");

  if (points >= 10) {
    levelComplete();
  } else {
    gameOver();
  }
}

function stopGame() {
  // Stop animationer
  document.querySelector("#cheese_container1").classList.remove("falling");
  document.querySelector("#cheese_container2").classList.remove("falling");
  document.querySelector("#cheese_container3").classList.remove("falling");
  document.querySelector("#cheese_container4").classList.remove("falling");
  document.querySelector("#cupcake_container5").classList.remove("falling");
  document.querySelector("#pie_container6").classList.remove("falling");
  document.querySelector("#fries_container7").classList.remove("falling");
  document.querySelector("#chocolade_container8").classList.remove("falling");
  document.querySelector("#cheesecake_container9").classList.remove("falling");
  document.querySelector("#icecream_container10").classList.remove("falling");

  // Fjern click
  document
    .querySelector("#cheese_container1")
    .removeEventListener("mousedown", clickElement);
  document
    .querySelector("#cheese_container2")
    .removeEventListener("mousedown", clickElement);
  document
    .querySelector("#cheese_container3")
    .removeEventListener("mousedown", clickElement);
  document
    .querySelector("#cheese_container4")
    .removeEventListener("mousedown", clickElement);
  document
    .querySelector("#cupcake_container5")
    .removeEventListener("mousedown", clickfastfood);

  document
    .querySelector("#pie_container6")
    .removeEventListener("mousedown", clickfastfood);
  document
    .querySelector("#fries_container7")
    .removeEventListener("mousedown", clickfastfood);
  document
    .querySelector("#chocolade_container8")
    .removeEventListener("mousedown", clickfastfood);
  document
    .querySelector("#cheesecake_container9")
    .removeEventListener("mousedown", clickfastfood);
  document
    .querySelector("#icecream_container10")
    .removeEventListener("mousedown", clickfastfood);

  // Stop og nulstil lyde, fx baggrundsmusik
  document.querySelector("#sound_background").currentTime = 0;
  document.querySelector("#sound_background").pause();

  document.querySelector("#time_sprite").classList.remove("shrink");
}
