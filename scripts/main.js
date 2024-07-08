document.addEventListener('DOMContentLoaded', () => {
    const boxes = document.querySelectorAll('.box');

    boxes.forEach(box => {
        box.addEventListener('mouseover', () => {
            highlightConnectedBoxes(box, true);
        });
        
        box.addEventListener('mouseout', () => {
            highlightConnectedBoxes(box, false);
        });
    });

    function highlightConnectedBoxes(box, highlight) {
        const connectedIds = box.dataset.connected.split(' ');
        connectedIds.forEach(id => {
            const connectedBox = document.getElementById(id);
            if (connectedBox) {
                if (highlight) {
                    connectedBox.classList.add('highlight');
                } else {
                    connectedBox.classList.remove('highlight');
                }
            }
        });

        if (highlight) {
            box.classList.add('highlight');
        } else {
            box.classList.remove('highlight');
        }
    }
});

