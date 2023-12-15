//color constants
const greenBackground = '#36E502'
const redBackground = '#DA3B04'

const items = document.querySelectorAll('.item');
items.forEach(item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

const cells = document.querySelectorAll('td');
cells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragenter', dragEnter);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dragDrop);
});

function dragStart(evt) {
    evt.dataTransfer.setData('text', evt.target.id);
}

function dragEnd(evt) {
    evt.target.style.opacity = '1';
}

function dragOver(evt) {
    evt.preventDefault();

    const isHeader = evt.target.tagName === 'TH' || evt.target.parentElement.tagName === 'TH';
    const isInvalidDrop = evt.target.classList.contains('invalid-drop');

    if (!isHeader && !isInvalidDrop) {
        evt.target.style.background = 'lightgray';
    }
}

function dragEnter(evt) {
    evt.preventDefault();

    const isHeader = evt.target.tagName === 'TH' || evt.target.parentElement.tagName === 'TH';
    const isInvalidDrop = evt.target.classList.contains('invalid-drop');

    if (!isHeader && !isInvalidDrop) {
        evt.target.style.background = 'lightgray';
    }
}

function dragLeave(evt) {
    evt.target.style.background = '';
}

function dragDrop(evt) {
    evt.preventDefault();
    evt.target.style.background = '';

    const isHeader = evt.target.tagName === 'TH' || evt.target.parentElement.tagName === 'TH';
    const isInvalidDrop = evt.target.classList.contains('invalid-drop');

    if (!isHeader && !isInvalidDrop) {
        const data = evt.dataTransfer.getData('text');
        const draggedItem = document.getElementById(data);

        if (draggedItem) {
            const cellClass = evt.target.className;
            const itemId = draggedItem.id;

            if (cellClass === itemId) {
                evt.target.style.background = greenBackground;
            } else {
                evt.target.style.background = redBackground;
            }
        } else {
            evt.target.style.background = redBackground;
        }

        evt.target.appendChild(draggedItem);
    }
}
