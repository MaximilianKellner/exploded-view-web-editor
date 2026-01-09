const timeline = document.getElementById('timeline');
const scrubber = document.getElementById('scrubber');

function moveScrubber(e, snap = true) {
    const rect = timeline.getBoundingClientRect();
    let x = e.clientX - rect.left;

    // Begrenzung
    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;

    // Prozent berechnen
    let percent = (x / rect.width) * 100;

    // Beim Ziehen einrasten lassen
    if (snap) {
        percent = Math.round(percent);
        x = (percent / 100) * rect.width; // X-Position auf feste Prozentwert setzen
    }

    // Scrubber bewegen
    scrubber.style.left = x + 'px';
    scrubber.setAttribute('data-percent', percent);
    console.log(`Position: ${percent}%`);
}

function getScrubberPosition() {
    const percent = scrubber.getAttribute('data-percent');
    console.log('Current Scrubber Position:', percent + '%');
    return percent ? parseInt(percent) : 0;
}

// Event Listener für Klicken und Ziehen
let isDragging = false;

timeline.addEventListener('mousedown', (e) => {
    isDragging = true;
    moveScrubber(e);
});

window.addEventListener('mousemove', (e) => {
    if (isDragging) moveScrubber(e);
});

window.addEventListener('mouseup', () => {
    isDragging = false;
});

// AnimationAbspielen (snap = false):
// x auf Basis der aktuellen Prozentposition setzen
const rect = timeline.getBoundingClientRect();
const percent = getScrubberPosition();
const x = rect.left + (percent / 100) * rect.width;
moveScrubber({ clientX: x }, false);