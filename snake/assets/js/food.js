import {onSnake, expand_snake} from './sanke.js'
import {random_grid_position} from './grid.js'

let food = get_random_food_position()
const expansion_rate = 1

export function update() {
    if(onSnake(food)){
        expand_snake(expansion_rate)
        food = get_random_food_position()
    }
}

export function draw(gameBoard) {

    const food_element = document.createElement('div')
    food_element.style.gridRowStart = food.y
    food_element.style.gridColumnStart = food.x
    food_element.classList.add('food')
    gameBoard.appendChild(food_element)

}

function get_random_food_position(){
    let new_food_position
    while (new_food_position == null || onSnake(new_food_position)){
        new_food_position = random_grid_position()
    }
    return new_food_position    
}