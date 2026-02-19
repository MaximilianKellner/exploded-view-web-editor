import { initUI, hideOverlay, showValidationError } from './onboarding-ui-handler.js';
import { getFilesFromList, validateConfigFile } from './file-logic.js';
import { startEditor } from './editor-logic.js';

const appContainer = document.getElementById('app-container');

let modelUrl = null;
let configUrl = null;

// UI mit callbacks initialisieren
initUI(
    // onFilesReceived
    async (files) => {
        await handleFiles(files);
    },
    // onReset
    () => {
        modelUrl = null;
        configUrl = null;
    },
    // onValidate
    async (file) => {
        if (file.name.toLowerCase().endsWith('.json')) {
            return await validateConfigFile(file);
        }
        return { isValid: true, errors: [], warnings: [] };
    }
);

async function handleFiles(files) {
    const { glbFile, jsonFile } = getFilesFromList(files);

    if (jsonFile) {
        // überprüfung bereits beim upload
        configUrl = URL.createObjectURL(jsonFile);
    }

    if (glbFile) {
        modelUrl = URL.createObjectURL(glbFile);
        
        try {
            await startEditor(appContainer, modelUrl, configUrl, glbFile, jsonFile);
            hideOverlay();
        } catch (error) {
            console.error('Fehler beim Laden des Modells oder Initialisieren der Animation:', error);
            showValidationError('Modell/Animation konnte nicht geladen werden. Bitte Dateien prüfen oder erneut versuchen.');
        }
        
    } else if (jsonFile) {
        console.log('Config loaded, waiting for GLB...');
    }
}
