const reward = 3;
const suckersPayoff = 0;
const temptation = 5;
const punishment = 1;
const cooperate = 'cooperate';
const defect = 'defect';

class Game {
  constructor() {
    this.humanScore = 0;
    this.titForTatScore = 0;
    this.titForTat = new TitForTat();
    this.round = 1;
  }

  completeRound(humanMove) {
    let titForTatMove = this.titForTat.move();

    this.updateScores(titForTatMove, humanMove)
    this.titForTat.updateLastMove(humanMove)
    this.round += 1;
    this.updateBoard()
  }

  updateScores(titForTatMove, humanMove) {
    if (titForTatMove === cooperate && humanMove === cooperate) {
      this.humanScore += reward;
      this.titForTatScore += reward;
    } else if (titForTatMove === cooperate && humanMove === defect) {
      this.humanScore += temptation;
      this.titForTatScore += suckersPayoff;
    } else if (titForTatMove === defect && humanMove === cooperate) {
      this.humanScore += suckersPayoff;
      this.titForTatScore += temptation;
    } else if (titForTatMove === defect && humanMove === defect) {
      this.humanScore += punishment;
      this.titForTatScore += punishment;
    }
  }

  updateBoard() {
    document.querySelector('h1#round').innerText = `Round ${this.round}`;
    document.querySelector('h1#tit-for-tat-score').innerText = this.titForTatScore;
    document.querySelector('h1#human-score').innerText = this.humanScore;
  }
}

class TitForTat {
  constructor() {
    this.lastMove = cooperate;
  }

  move() {
    if (this.lastMove === cooperate) {
      return cooperate;
    } else {
      return defect;
    }
  }

  updateLastMove(humanMove) {
    this.lastMove = humanMove;
  }
}
