class Part {
    constructor(value, index, size) {
        this.value = value;
        this.index = index;
        this.size = size;
    }

    get row() {
        return Math.floor(this.index / this.size);
    }
    get col() {
        return this.index % this.size;
    }
    setIndex(newIndex) {
        this.index = newIndex;
    }
    render() {
        const div = document.createElement('div');
        div.classList.add('part');
        if (this.value == 0) div.classList.add('empty');
        div.textContent = this.value == 0 ? '' : this.value;
        div.dataset.index = this.index;
        return div;
    }
}
