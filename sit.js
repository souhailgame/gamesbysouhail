let board = Array(3).fill(Array(3).fill(null));
let currentPlayer = 'X';

document.getElementById('board').addEventListener('click', function(event) {
    if (event.target.tagName === 'TD' && !event.target.textContent) {
        event.target.textContent = currentPlayer;
        board[event.target.parentNode.rowIndex][event.target.cellIndex] = currentPlayer;
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        checkWinner();
    }
});

document.getElementById('reset').addEventListener('click', function() {
    location.reload();
});

document.getElementById('instagram').addEventListener('click', function() {
    window.open('https://www.instagram.com/shouhailyt/');
});

function checkWinner() {
    for (let i = 0; i < 3; i++) {
        if (
            (board[i][0] && board[i][0] === board[i][1] && board[i][1] === board[i][2]) ||
            (board[0][i] && board[0][i] === board[1][i] && board[1][i] === board[2][i])
        ) {
            alert(currentPlayer + ' wins!');
            return;
        }
    }

    if (!board.includes(null)) {
        alert('It\'s a tie!');
   return;
    }
}