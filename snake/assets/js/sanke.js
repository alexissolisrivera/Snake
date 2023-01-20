import { get_input_direction } from './input.js'

export const snake_speed = 6
const snake_body = [{ x: 11, y: 11 }]
let newSegments = 0

export function update() {
    add_segments()
    const inputDirection = get_input_direction()
    for (let i = snake_body.length - 2; i >= 0; i--) {
        snake_body[i + 1] = { ...snake_body[i] }
    }
    snake_body[0].x += inputDirection.x
    snake_body[0].y += inputDirection.y

}

export function draw(gameBoard) {
    snake_body.forEach(segment => {
        const snake_element = document.createElement('div')
        snake_element.style.gridRowStart = segment.y
        snake_element.style.gridColumnStart = segment.x
        snake_element.classList.add('snake')
        gameBoard.appendChild(snake_element)
    })
}

export function expand_snake(amount){
    newSegments += amount
}

export function onSnake(position, {ignoreHead = false} = {}) {
    return snake_body.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equal_positions(segment, position)
    })
}

export function get_snake_head(){
    return snake_body[0]
}

export function snake_intersection(){
    return(onSnake(snake_body[0], {ignoreHead: true}))
}

function equal_positions (pos1, pos2){
    return pos1.x === pos2.x && pos1.y === pos2.y
}

function add_segments(){
    for (let i = 0; i < newSegments; i++){
        snake_body.push ({...snake_body[snake_body.length - 1]})
    }

    newSegments = 0
}