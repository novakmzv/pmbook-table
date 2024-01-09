const greenBackground = '#36E502';
const redBackground = '#FF0000';
const defaultBackground = '';

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
}

function dragEnter(evt) {
    evt.preventDefault();
}

function dragLeave(evt) {

}

function dragDrop(evt) {

    evt.preventDefault();
    const htmlTDCell = getParentTD(evt.target);

    if (!htmlTDCell) {
        currentDraggedItem = null;
        return
    }

    const data = evt.dataTransfer.getData('text');
    const draggedItem = document.getElementById(data);

    debugger
    if (draggedItem) {
        let cellClass = htmlTDCell.className.split(' ');
        let arrayItemIDs = cellClass.find(str => str.startsWith('key='));
        arrayItemIDs =arrayItemIDs.replace('key=','')

        arrayItemIDs = arrayItemIDs.split('|')
        const itemId = draggedItem.id;

        currentDraggedItem.style.background = arrayItemIDs.includes(itemId) ? greenBackground : redBackground;
    } else {
        htmlTDCell.style.background = redBackground;
    }

    htmlTDCell.appendChild(currentDraggedItem);
}

function getParentTD(element) {
    if (element.tagName === 'TD') {
        return element;
    }

    return getParentTD(element.parentElement);
}
