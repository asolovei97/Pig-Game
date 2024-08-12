'use strict';

let totalScores = document.querySelectorAll('.score');
let currentScores = document.querySelectorAll('.current-score');
let dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');
const victory = 10;
for (let i = 0; i < totalScores.length; i++) totalScores[i].textContent = 0;
dice.style.display = 'none';

const playerFirst = {
  id: 0,
  playerSection: function () {
    return document.querySelector(`.player--${this.id}`);
  },
  totalScore: 0,
  currentScore: 0,
  addTotalScore: function () {
    this.currentScore === 0
      ? (this.totalScore = 0)
      : (this.totalScore += this.currentScore);
    document.querySelector(`#score--${this.id}`).textContent = this.totalScore;
    this.currentScore = 0;
  },
  addCurrentScore: function (score) {
    score != 1 ? (this.currentScore += score) : (this.currentScore = 1);
    document.querySelector(`#current--${this.id}`).textContent =
      this.currentScore;
  },
  isActive: true,
  makeActive: function () {
    this.isActive = true;
    this.playerSection().classList.add('player--active');
  },
  makeInactive: function () {
    this.isActive = false;
    this.playerSection().classList.remove('player--active');
  },
  isWinner: false,
  makePlayerWinner: function () {
    if (this.totalScore >= victory) {
      btnRoll.removeEventListener('click', gameLogic);
      btnHold.removeEventListener('click', hold);
      this.playerSection().classList.add('player--winner');
      this.isWinner = true;
    }
  },
  makeReset: function () {
    btnRoll.addEventListener('click', gameLogic);
    btnHold.addEventListener('click', hold);
    this.addCurrentScore(0);
    this.addTotalScore();
    this.isWinner = false;
    this.playerSection().classList.remove('player--winner');
    this.isActive = true;
    this.makeActive();
  },
};

const playerSecond = {
  id: 1,
  playerSection: function () {
    return document.querySelector(`.player--${this.id}`);
  },
  playerSection: function () {
    return document.querySelector(`.player--${this.id}`);
  },
  totalScore: 0,
  currentScore: 0,
  addTotalScore: function () {
    this.currentScore === 0
      ? (this.totalScore = 0)
      : (this.totalScore += this.currentScore);
    document.querySelector(`#score--${this.id}`).textContent = this.totalScore;
    this.currentScore = 0;
  },
  addCurrentScore: function (score) {
    score != 1 ? (this.currentScore += score) : (this.currentScore = 1);
    document.querySelector(`#current--${this.id}`).textContent =
      this.currentScore;
  },
  isActive: true,
  makeActive: function () {
    this.isActive = true;
    this.playerSection().classList.add('player--active');
  },
  makeInactive: function () {
    this.isActive = false;
    this.playerSection().classList.remove('player--active');
  },
  isWinner: false,
  makePlayerWinner: function () {
    if (this.totalScore >= victory) {
      btnRoll.removeEventListener('click', gameLogic);
      btnHold.removeEventListener('click', hold);
      this.playerSection().classList.add('player--winner');
      this.isWinner = true;
    }
  },
  makeReset: function () {
    btnRoll.addEventListener('click', gameLogic);
    btnHold.addEventListener('click', hold);
    this.addCurrentScore(0);
    this.addTotalScore();
    this.isWinner = false;
    this.playerSection().classList.remove('player--winner');
    this.isActive = false;
    this.makeInactive();
  },
};

const whoIsActive = () => (playerFirst.isActive ? playerFirst : playerSecond);

const reset = () => {
  dice.style.display = 'none';
  playerFirst.makeReset();
  playerSecond.makeReset();
};

const changePlayer = activePlayer => {
  const nextPlayer = activePlayer === playerFirst ? playerSecond : playerFirst;
  activePlayer.makePlayerWinner();
  activePlayer.addCurrentScore(0);
  activePlayer.makeInactive();
  nextPlayer.makeActive();
};

const hold = () => {
  const currentPlayer = whoIsActive();
  currentPlayer.addTotalScore();
  changePlayer(currentPlayer);
};

const randomDice = () => {
  const random = Math.trunc(Math.random() * 6) + 1;
  dice.src = `dice-${random}.png`;
  return random;
};

const gameLogic = () => {
  dice.style.display = 'block';
  const currentPlayer = whoIsActive();
  if (!currentPlayer.isWinner) {
    const currentScore = randomDice();
    currentPlayer.addCurrentScore(currentScore);
  }
};

btnNew.addEventListener('click', reset);
btnHold.addEventListener('click', hold);
btnRoll.addEventListener('click', gameLogic);
