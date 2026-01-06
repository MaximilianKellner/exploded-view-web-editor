const timeline = document.getElementById('timeline');
        const scrubber = document.getElementById('scrubber');

        function moveScrubber(e) {
            const rect = timeline.getBoundingClientRect();
            let x = e.clientX - rect.left; // Mausposition relativ zum Container

            // Begrenzung (Boundary Check)
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            // Nadel bewegen
            scrubber.style.left = x + 'px';
            
            // Optional: Berechnung des Prozentwerts oder Frames
            const percent = (x / rect.width) * 100;
            console.log(`Position: ${percent.toFixed(2)}%`);

            scrubber.setAttribute('data-percent', percent.toFixed(2) + '%');
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