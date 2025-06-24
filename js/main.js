const size = 4;
const container = document.getElementById('board');

const board = new Board(size);
board.render(container);

document.getElementById('board').addEventListener('click', (e) => {
    if (board.isWIn()) {
        const overlay = document.getElementById('overlay');
        overlay.style.removeProperty('display');
        overlay.addEventListener('click', () => {
            location.reload();
        });
    }
});
