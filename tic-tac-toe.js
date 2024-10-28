document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const statusDisplay = document.getElementById('status');
    const restartButton = document.getElementById('restart');
    
    let boardState = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    const createBoard = () => {
        const squares = board.querySelectorAll('div');
        squares.forEach((square, index) => {
            square.textContent = boardState[index]; 
            square.className = 'square';             
            square.dataset.index = index; 
            square.addEventListener('click', handleCellClick); 
    
            // Add mouse enter and leave events for hover effect
            square.addEventListener('mouseenter', () => {
                if (boardState[index] === '' && isGameActive) {
                    // Show the current player's symbol on hover
                    square.textContent = currentPlayer;
                    square.style.color = currentPlayer === 'X' ? 'var(--lighterBlue)' : 'var(--coral)';
                }
            });
    
            square.addEventListener('mouseleave', () => {
                if (boardState[index] === '') {
                    square.textContent = ''; 
                    square.style.color = ''; 
                }
            });
        });
    };

    const handleCellClick = (event) => {
        const clickedCellIndex = event.target.dataset.index;

        // Check if the cell is already occupied or if the game is not active
        if (boardState[clickedCellIndex] !== '' || !isGameActive) {
            return;
        }

        boardState[clickedCellIndex] = currentPlayer;
        event.target.textContent = currentPlayer; 
        checkResult();
    };

    const checkResult = () => {
        let roundWon = false;

        for (let i = 0; i < winningConditions.length; i++) {
            const [a, b, c] = winningConditions[i];
            if (boardState[a] === '' || boardState[b] === '' || boardState[c] === '') {
                continue;
            }
            if (boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
                roundWon = true;
                break;
            }
        }

        if (roundWon) {
            statusDisplay.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
            statusDisplay.classList.add('you-won');
            isGameActive = false;
            return;
        }

        if (!boardState.includes('')) {
            statusDisplay.textContent = 'It\'s a draw!';
            isGameActive = false;
            return;
        }

        // Switch players
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusDisplay.textContent = `${currentPlayer}'s turn`;
    };

    // Restart the game
    const restartGame = () => {
        isGameActive = true;
        currentPlayer = 'X';
        boardState = ['', '', '', '', '', '', '', '', ''];
        statusDisplay.textContent = 'Move your mouse over a square and click to play an X or an O.';
        statusDisplay.classList.remove('you-won');
        createBoard();
    };

    restartButton.addEventListener('click', restartGame);
    createBoard();
    statusDisplay.textContent = `${currentPlayer}'s turn`;
});