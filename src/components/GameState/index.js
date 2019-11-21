const createBoard = () => {
        const board = [];
        for (let i = 0; i < 6; i++) {
            board[i] = new Array(7).fill(0);
        };
        return board;
};

const initialState = createBoard();

export default (state, action) => {
    switch (action.type) {
        default:
        return state;
    }
}