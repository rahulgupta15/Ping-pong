import {SVG_NS, KEYS} from '../settings'
import Board from './Board.js';
import Paddle from './Paddle'
import Ball from './Ball';
import Score from './Score'

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    // Creating new instance of game
		this.gameElement = document.getElementById(this.element)
    
    // Creating new instance of board background, height and width passed through from game object
    this.board = new Board(this.width, this.height)

    this.paddleWidth = 8
    this.paddleHeight = 56
    this.boardGap = 10 // this is your x value for the paddle

    // create ball
    this.ball = new Ball(8, this.width, this.height) 
    this.ball2 = new Ball(8, this.width, this.height) 


    this.player1 = new Paddle (
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      ((this.height - this.paddleHeight)/2),
      KEYS.a,
      KEYS.z
    )

    this.player2 = new Paddle (
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      (this.width - this.boardGap - this.paddleWidth),
      ((this.height - this.paddleHeight)/2),
      KEYS.up,
      KEYS.down
    )

    this.score1 = new Score(this.width / 4, 30, 30)
    this.score2 = new Score(this.width / 4 + 250, 30, 30)

    console.log(this.board)

    document.addEventListener('keydown', event => {
      switch(event.key) {
        case KEYS.spaceBar:
          this.gameOn = !this.gameOn
          this.player1.speed = 10
          this.player2.speed = 10
        break 
      }
    })
  }

  render() {

    if(this.gameOn) {
      this.player1.speed = 0
      this.player2.speed = 0
      return
    }

	  let svg = document.createElementNS(SVG_NS, "svg")

    this.gameElement.innerHTML = ''

    svg.setAttributeNS(null, "width", this.width)
    svg.setAttributeNS(null, "height", this.height)
    svg.setAttributeNS(null, "viewBox", `0 0 ${this.width} ${this.height}`)
    this.gameElement.appendChild(svg)

    this.board.render(svg)
    this.player1.render(svg)
    this.player2.render(svg)
    this.ball.render(svg, this.player1, this.player2)
    this.ball2.render(svg, this.player1, this.player2)
    this.score1.render(svg, this.player1.score)
    this.score2.render(svg, this.player2.score)

    document.getElementById('backgroundmusic').play();
    
    let lvl1 = document.getElementById("beg")
    lvl1.addEventListener("click", function(){
      this.ball.direction *= 1;
      this.ball2.direction *= 1;
      this.ball.radius = 8
      this.ball2.radius = 8
    })
    let lvl2 = document.getElementById("int")
    lvl2.addEventListener("click", function(){
      this.ball.direction *= 3;
      this.ball2.direction *= 3;
      this.ball.radius = 6
      this.ball2.radius = 6
    })
    let lvl3 = document.getElementById("adv")
    lvl3.addEventListener("click", function(){
      this.ball.direction *= 5;
      this.ball2.direction *= 5;
      this.ball.radius = 4
      this.ball2.radius = 4
    })


  }
}
