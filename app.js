import {fromJS, List} from 'immutable';

const boardSize = 5;

const generateDiagonalCoordinates = (xOrigin, yOrigin) => {
    let variableXOrigin = xOrigin;
    let variableYOrigin = yOrigin;

    const coordinates = [];
    while (variableXOrigin - 1 > -1 && variableYOrigin - 1 > -1) {
        coordinates.push({x: --variableXOrigin, y: --variableYOrigin});
    }

    variableXOrigin = xOrigin;
    variableYOrigin = yOrigin;

    while (variableXOrigin + 1 < boardSize && variableYOrigin + 1 < boardSize) {
        coordinates.push({x: ++variableXOrigin, y: ++variableYOrigin});
    }
    return coordinates;
};


const canQueenTake = (xOrigin, yOrigin, board) => {
    //see if there is more than 1 queen in this row, should never happen
    const rowTake = board.get(xOrigin).filter(x => x === 1).count() > 1;
    // see if there is more than 1 queen on the diagonal occupied by this queen
    const diagonalCoordinates = generateDiagonalCoordinates(xOrigin, yOrigin);
    const diagonalTake = diagonalCoordinates.some(({x, y}) => board.getIn([x, y]) === 1);

    //see if there is a queen in this column
    const columnTake = board.some((row, rowIndex) => row.get(xOrigin) === 1 && rowIndex !== yOrigin);

    return rowTake || diagonalTake || columnTake;

};

//check all queens, starting in row 0 to see if they can take other queens
const isBoardValid = (board) => {
    return board.every((row, rowIndex) => {
        const queenIndex = row.findIndex(r => r === 1);
        return !canQueenTake(queenIndex, rowIndex, board);
    });
};

let board = fromJS([...Array(boardSize)].map((y, yIndex) => [...Array(boardSize)].map(() => 0)));
//board = board.setIn([1,0], 1);

for (let row = 0; row < boardSize; row++) {
    board = board.setIn([row, 0], 1);

    for (let column = 0; column < boardSize; column++) {
        if(row+1 === boardSize) {
            continue;
        }
        board = board.set(row+1, List([...Array(boardSize)].fill(0)).set(column, 1));
        console.log(board.toJS());
    }
}
console.log(board.toJS());
console.log(isBoardValid(board));