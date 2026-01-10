const timelineColumn = document.querySelector('.timeline-column');
const timelineHeader = document.querySelector('.timeline-header');
const scrubber = document.getElementById('scrubber');
const scrubberHead = document.getElementById('scrubber-head');

function moveScrubber(e, snap = true) {
    const rect = timelineHeader.getBoundingClientRect();
    let x = e.clientX - rect.left;

    // Begrenzung auf 0-100%
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    // Prozent berechnen
    let percent = (x / rect.width) * 100;

    // Beim Ziehen einrasten lassen
    if (snap) {
        percent = Math.round(percent);
    }

    // Beide Scrubber-Teile synchron bewegen
    const percentStr = Math.round(percent) + '%';
    scrubber.style.left = percentStr;
    scrubberHead.style.left = percentStr;
    scrubberHead.setAttribute('data-percent', percentStr);
    console.log(`Position: ${percentStr}`);
}

function getScrubberPosition() {
    const percent = scrubber.getAttribute('data-percent');
    console.log('Current Scrubber Position:', percent + '%');
    return percent ? parseInt(percent) : 0;
}

// Event Listener für Klicken und Ziehen
let isDragging = false;

// Klickbereich: Timeline-Header und Timeline-Column
timelineHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveScrubber(e);
});

timelineColumn.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveScrubber(e);
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) moveScrubber(e);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// Initial-Position setzen
const currentPercent = parseInt(scrubberHead.getAttribute('data-percent')) || 6;
const percentStr = currentPercent + '%';
scrubber.style.left = percentStr;
scrubberHead.style.left = percentStr;