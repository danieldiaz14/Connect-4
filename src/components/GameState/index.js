const createBoard = () => {
        const board = [];
        for (let i = 0; i < 6; i++) {
            board[i] = new Array(7).fill(0);
        };
        return board;
};

export const initialGameState = createBoard();

export default (state, action) => {
    switch (action.type) {
        
        default:
            return state;
    }
}