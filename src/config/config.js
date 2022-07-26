export const unit = 15;
export const boardSize = 750;

export const gameReady = 1;
export const gamePlaying = 2;
export const gameEnded = 3;

export const direction = {
    left: {x: -unit, y: 0},
    right: { x: unit, y: 0},
    up: {x:0, y:-unit},
    down: {x:0, y:unit}
}

export const playerOne =  {
    color: '#43D9D9',
    id: '1',
    keys: {
        38 : direction.up,
        39 : direction.right,
        40 : direction.down,
        37 : direction.left
    },
    direction: direction.right,
    position: {x: unit * 6, y: unit * 6 },
    hasDied: false,
    instructions: 'Flechas de dirección'
}

export const playerTwo =  {
    color: '#fcec0c',
    id: '2',
    keys: {
        87 : direction.up,
        68 : direction.right,
        83 : direction.down,
        65 : direction.left
    },
    direction: direction.left,
    position: {x: unit * 43, y: unit * 43 },
    hasDied: false,
    instructions: 'WASD'
}