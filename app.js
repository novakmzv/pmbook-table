const greenBackground = '#36E502';
const redBackground = '#DA3B04';
const defaultBackground = ''; // Fondo blanco

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

let currentDraggedItem;

function dragStart(evt) {
    evt.dataTransfer.setData('text', evt.target.id);
    currentDraggedItem = evt.target;
}

function dragEnd(evt) {
    evt.target.style.opacity = '1';
}

function dragOver(evt) {
    evt.preventDefault();

    const isHeader = evt.target.tagName === 'TH' || evt.target.parentElement.tagName === 'TH';
    const isInvalidDrop = evt.target.classList.contains('invalid-drop');
    const hasItem = evt.target.querySelector('.item');

    if (!isHeader && !isInvalidDrop) {
        if (!hasItem) {
            evt.target.style.background = 'lightgray';
        }
    }
}

function dragEnter(evt) {
    evt.preventDefault();
}

function dragLeave(evt) {
    const hasItem = evt.target.querySelector('.item');

    if (!hasItem) {
        evt.target.style.background = defaultBackground;
    }
}

function dragDrop(evt) {
    evt.preventDefault();

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

            // Restablecer el color de la celda anterior
            if (currentDraggedItem) {
                const previousCell = currentDraggedItem.parentElement;
                previousCell.style.background = defaultBackground;
            }
        } else {
            evt.target.style.background = redBackground;
        }

        evt.target.appendChild(currentDraggedItem);
    }

    currentDraggedItem = null; // Restablecer el ítem actualmente arrastrado
}
