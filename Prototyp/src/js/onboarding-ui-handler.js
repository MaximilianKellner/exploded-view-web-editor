const uploadOverlay = document.getElementById('onboarding-screen');
const uploadBoxes = document.querySelectorAll('.upload-box');
const closeBtns = document.querySelectorAll('.close-btn');
const validationChipsContainer = document.getElementById('validation-chips');

// Bilder vorladen
const preloadImages = () => {
    const images = ['./icon/check.svg', './icon/error_round.svg'];
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

function getFileRoleFromInput(input) {
    if (!input || !input.classList) {
        return 'unknown';
    }

    if (input.classList.contains('file-input-glb')) {
        return 'model';
    }

    if (input.classList.contains('file-input-exp-json')) {
        return 'expConfig';
    }

    if (input.classList.contains('file-input-scene-json')) {
        return 'sceneConfig';
    }

    return 'unknown';
}

export function initUI(onFilesReceived, onReset, onValidate) {
    preloadImages();
    clearValidationMessages();

    // Inputs zurücksetzen --> Cache Break
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.value = '';
    });

    // File inputs
    document.querySelectorAll('input[type="file"]').forEach(input => {
        input.addEventListener('change', async (e) => {
            if (e.target.files.length > 0) {
                const file = e.target.files[0];
                const fileRole = getFileRoleFromInput(e.target);
                const box = e.target.closest('.upload-box');
                const btn = e.target.closest('.file-upload-btn');
                const icon = btn.querySelector('.file-upload-icon');
                const img = icon.querySelector('img');
                const textSpan = btn.querySelector('.file-upload-text');

                // Ausgangs src/text speichern
                if (img && !img.dataset.originalSrc) img.dataset.originalSrc = img.getAttribute('src');
                if (textSpan && !textSpan.dataset.originalText) textSpan.dataset.originalText = textSpan.textContent.trim();

                // Format Überprüfung
                let validationResult = { isValid: true, errors: [], warnings: [] };
                if (onValidate) {
                    const result = await onValidate(file, fileRole);
                    validationResult = normalizeValidationResult(result);
                }

                if (fileRole === 'expConfig') {
                    showValidationMessages(validationResult.errors, validationResult.warnings);
                }

                const isValid = validationResult.isValid;

                if (isValid) {
                    // Erfolg anzeigen
                    if (icon) {
                        icon.classList.remove('error');
                        icon.classList.add('success');
                    }
                    if (img) img.src = './icon/check.svg';
                    if (textSpan) textSpan.textContent = file.name;

                    expandBox(box);
                    
                    // Alle Inputs der Box müssen gefüllt sein
                    const allInputs = box.querySelectorAll('input[type="file"]');
                    let allFilled = true;
                    const collectedFiles = [];

                    allInputs.forEach(inp => {
                        const inputRole = getFileRoleFromInput(inp);
                        const isRequiredInput = inputRole !== 'sceneConfig';

                        if (isRequiredInput && inp.files.length === 0) {
                            allFilled = false;
                        } else {
                            const inpBtn = inp.closest('.file-upload-btn');
                            const inpIcon = inpBtn.querySelector('.file-upload-icon');
                            if (isRequiredInput && inpIcon.classList.contains('error')) {
                                allFilled = false; 
                            }

                            if (inp.files.length > 0) {
                                collectedFiles.push({
                                    file: inp.files[0],
                                    role: inputRole
                                });
                            }
                        }
                    });

                    if (allFilled) {
                        onFilesReceived(collectedFiles);
                    }

                } else {
                    // Error anzeigen
                    if (icon) {
                        icon.classList.remove('success');
                        icon.classList.add('error');
                    }
                    if (img) img.src = './icon/error_round.svg';
                    if (textSpan) textSpan.textContent = file.name; 
                    expandBox(box);
                }
            }
        });
        
        input.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });

    // Listeners für upload Boxen
    uploadBoxes.forEach(box => {
        box.addEventListener('click', () => {
            expandBox(box);
        });
    });

    // Listeners für Close buttons
    closeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            resetBoxes();
            if (onReset) onReset();
        });
    });
}

function expandBox(activeBox) {
    uploadBoxes.forEach(box => {
        if (box === activeBox) {
            box.classList.add('expanded');
            box.classList.remove('collapsed');
        } else {
            box.classList.add('collapsed');
            box.classList.remove('expanded');
        }
    });
}

function normalizeValidationResult(result) {
    if (typeof result === 'boolean') {
        return {
            isValid: result,
            errors: result ? [] : ['Ungültiges Dateiformat.'],
            warnings: []
        };
    }

    if (!result || typeof result !== 'object') {
        return {
            isValid: false,
            errors: ['Unbekanntes Validierungsergebnis.'],
            warnings: []
        };
    }

    return {
        isValid: Boolean(result.isValid),
        errors: Array.isArray(result.errors) ? result.errors : [],
        warnings: Array.isArray(result.warnings) ? result.warnings : []
    };
}

function showValidationMessages(errors = [], warnings = []) {
    if (!validationChipsContainer) return;

    validationChipsContainer.innerHTML = '';

    errors.forEach(message => {
        validationChipsContainer.appendChild(createValidationChip(message, 'error'));
    });

    warnings.forEach(message => {
        validationChipsContainer.appendChild(createValidationChip(message, 'warning'));
    });
}

function createValidationChip(message, type) {
    const chip = document.createElement('div');
    chip.classList.add('validation-chip', type);
    chip.textContent = message;
    return chip;
}

function clearValidationMessages() {
    if (!validationChipsContainer) return;
    validationChipsContainer.innerHTML = '';
}

export function showValidationError(message) {
    showValidationMessages([message], []);
}

export function resetBoxes() {
    uploadBoxes.forEach(box => {
        box.classList.remove('expanded');
        box.classList.remove('collapsed');
        
        // Clear inputs
        const inputs = box.querySelectorAll('input[type="file"]');
        inputs.forEach(input => input.value = '');

        // Reset icons
        const icons = box.querySelectorAll('.file-upload-icon');
        icons.forEach(icon => {
            icon.classList.remove('success');
            icon.classList.remove('error');
            
            // Checkboy Icon --> Upload Icon
            const img = icon.querySelector('img');
            if (img && img.dataset.originalSrc) {
                img.src = img.dataset.originalSrc;
            }
        });

        // Reset text
        const texts = box.querySelectorAll('.file-upload-text');
        texts.forEach(text => {
            if (text.dataset.originalText) {
                text.textContent = text.dataset.originalText;
            }
        });
    });

    clearValidationMessages();
}

export function hideOverlay() {
    uploadOverlay.classList.add('hidden');
    setTimeout(() => {
        uploadOverlay.style.display = 'none';
    }, 500);
}
