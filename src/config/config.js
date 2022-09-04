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
    color: '#00FF9F',
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
export const playerThree =  {
    color: '#0C4383',
    id: '3',
    keys: {
        73 : direction.up,
        74 : direction.left,
        75 : direction.down,
        76 : direction.right
    },
    direction: direction.right,
    position: {x: unit * 6, y: unit * 43 },
    hasDied: false,
    instructions: 'IJKL'
}
export const playerFour =  {
    color: '#FFA5A5',
    id: '4',
    keys: {
        104 : direction.up,
        100 : direction.left,
        101 : direction.down,
        102 : direction.right
    },
    direction: direction.left,
    position: {x: unit * 43, y: unit * 6 },
    hasDied: false,
    instructions: 'Numpad 8456'
}