class Board {
    constructor(size) {
        this.size = size;
        this.total = size * size;
        this.parts = [];
    }

    render(container) {
        container.innerHTML = '';
        this.parts = [];

        container.style.gridTemplateColumns = `repeat(${this.size}, 80px)`;
        container.style.gridTemplateRows = `repeat(${this.size}, 80px)`;

        for (let i = 0; i < this.total; i++) {
            const value = (i + 1) % this.total;
            const part = new Part(value, i, this.size);
            this.parts.push(part);
        }

        this.shuffleParts(100);

        for (const part of this.parts) {
            const part1 = part.render();
            part1.addEventListener('click', () => {
                this.tryMoveClick(part.index, container);
            });
            container.appendChild(part1);
        }

    }

    shuffleParts(movesCount) {
        for (let i = 0; i < movesCount; i++) {
            const empty = this.parts.find(p => p.value == 0);
            const neighbors = this.getNeighbors(empty.index);

            const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];

            const a = empty.value;
            empty.value = randomNeighbor.value;
            randomNeighbor.value = a;
        }
    }

    getNeighbors(index) {
        const neighbors = [];
        const part = this.parts.find(p => p.index == index);

        const directions = [
            [0, -1],
            [0, 1],
            [-1, 0],
            [1, 0],
        ];

        for (const [dx, dy] of directions) {
            const newRow = part.row + dx;
            const newCol = part.col + dy;

            if (newRow >= 0 && newRow < this.size && newCol >= 0 && newCol < this.size) {
                const newIndex = newRow * this.size + newCol;
                neighbors.push(this.parts.find(p => p.index == newIndex));
            }
        }

        return neighbors;
    }

    tryMoveClick(clickedIndex, container) {
        const clickedPart = this.parts.find(p => p.index === clickedIndex);
        if (clickedPart.value == 0) return;

        const neighbors = this.getNeighbors(clickedIndex);
        const emptyNeighbor = neighbors.find(p => p.value == 0);

        if (!emptyNeighbor) return;

        const a = clickedPart.value;
        clickedPart.value = emptyNeighbor.value;
        emptyNeighbor.value = a;

        container.innerHTML = '';
        for (const part of this.parts) {
            const part1 = part.render();
            part1.addEventListener('click', () => {
                this.tryMoveClick(part.index, container);
            });
            container.appendChild(part1);
        }
    }

    isWIn() {
        for (let i = 0; i < this.total - 1; i++) {
            const part = this.parts.find(p => p.index == i);
            if (part.value != i + 1) return false;
        }
        const last=this.parts.find(p => p.index == this.total-1)
        return last.value == 0;
    }

}
