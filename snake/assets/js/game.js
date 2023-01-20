import { update as updateSnake, draw as drawSnake, snake_speed, get_snake_head, snake_intersection } from './sanke.js'
import { update as updateFood, draw as drawFood } from './food.js'
import { outSide_grid } from './grid.js'

let LastRendertime = 0
let gameOver = false
const gameBoard = document.getElementById('game_board')

function main(current_time) {
    if (gameOver) {
        if (confirm('you lost. press ok to restart')){
            window.location = '/'
        }
        return
    }

    window.requestAnimationFrame(main)
    const seconds_since_last_render = (current_time - LastRendertime) / 1000
    if (seconds_since_last_render < 1 / snake_speed) return

    console.log('Render')
    LastRendertime = current_time

    update()
    draw()
}

window.requestAnimationFrame(main)

function update() {
    updateSnake()
    updateFood()
    checkDeath()
}

function draw() {
    gameBoard.innerHTML = ''
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outSide_grid(get_snake_head()) || snake_intersection()
}