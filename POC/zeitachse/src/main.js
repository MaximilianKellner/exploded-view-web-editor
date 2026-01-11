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
const currentPercent = parseInt(scrubberHead.getAttribute('data-percent')) || 0;
const percentStr = currentPercent + '%';
scrubber.style.left = percentStr;
scrubberHead.style.left = percentStr;


// --------------------------------------
// --- Keyframe Handle Interaktivität ---

let activeHandle = null;
let activeBar = null;
let handleType = null; // 'left' oder 'right'

// Alle Keyframe Handles vorbereiten
document.querySelectorAll('.keyframe-handle').forEach(handle => {
    handle.addEventListener('mousedown', (e) => {
        
        // Entfernt --> Scrubber als % label nutzen und später live vorschau.
        //e.stopPropagation(); // Verhindert Scrubber-Bewegung

        activeHandle = handle;
        activeBar = handle.closest('.keyframe-bar');
        
        // Handle-Typ über keyframe-handle.style.left bestimmen: 0 = links, 100% = rechts
        handleType = parseFloat(handle.style.left) === 0 ? 'left' : 'right';
        
        // Cursor --> Griff-Icon
        document.body.style.cursor = 'ew-resize';
    });
});

window.addEventListener('mousemove', (e) => {
    if (activeHandle && activeBar) {
        const timelineRect = timelineColumn.getBoundingClientRect();
        let x = e.clientX - timelineRect.left;
        
        // Begrenzung auf Timeline-Bereich
        if (x < 0) x = 0;
        if (x > timelineRect.width) x = timelineRect.width;
        
        let newPercent = (x / timelineRect.width) * 100;
        newPercent = Math.max(0, Math.min(100, newPercent));
        
        // Einrasten an ganzen Prozentwerten
        newPercent = Math.round(newPercent);
        
        // Aktuelle Bar-Werte (gerundet)
        const currentLeft = Math.round(parseFloat(activeBar.style.left) || 0);
        const currentWidth = Math.round(parseFloat(activeBar.style.width) || 0);
        const currentRight = currentLeft + currentWidth;
        
        const minWidth = 1; // Mindestbreite 1%
        
        if (handleType === 'left') {
            // Linker Handle (Start)
            const maxLeft = currentRight - minWidth;
            newPercent = Math.min(newPercent, maxLeft);
            
            const newWidth = currentRight - newPercent;
            activeBar.style.left = Math.round(newPercent) + '%';
            activeBar.style.width = Math.round(newWidth) + '%';
        } else {
            // Rechter Handle (End)
            const minRight = currentLeft + minWidth;
            newPercent = Math.max(newPercent, minRight);
            
            const newWidth = newPercent - currentLeft;
            activeBar.style.width = Math.round(newWidth) + '%';
        }
    }
});

window.addEventListener('mouseup', () => {
    if (activeHandle && activeBar) {
        // Werte ausgeben
        const startPercent = Math.round(parseFloat(activeBar.style.left) || 0);
        const width = Math.round(parseFloat(activeBar.style.width) || 0);
        const endPercent = startPercent + width;
        
        console.log(`Keyframe Position: ${startPercent}%-${endPercent}%`);
        
        // Cursor zurücksetzen
        document.body.style.cursor = '';
    }
    
    activeHandle = null;
    activeBar = null;
    handleType = null;
});