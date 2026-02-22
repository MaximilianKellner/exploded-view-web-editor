import { initUI, hideOverlay, showValidationError } from './onboarding-ui-handler.js';
import { getFilesFromList, validateConfigFile } from './file-logic.js';
import { startEditor } from './editor-logic.js';

const appContainer = document.getElementById('app-container');

let modelUrl = null;
let configUrl = null;
let sceneConfigUrl = null;

function revokeObjectUrl(url) {
    if (!url) return;
    URL.revokeObjectURL(url);
}

function resetObjectUrls() {
    revokeObjectUrl(modelUrl);
    revokeObjectUrl(configUrl);
    revokeObjectUrl(sceneConfigUrl);
    modelUrl = null;
    configUrl = null;
    sceneConfigUrl = null;
}

// UI mit callbacks initialisieren
initUI(
    // onFilesReceived
    async (files) => {
        await handleFiles(files);
    },
    // onReset
    () => {
        resetObjectUrls();
    },
    // onValidate
    async (file, fileRole) => {
        if (fileRole === 'expConfig') {
            return await validateConfigFile(file);
        }
        return { isValid: true, errors: [], warnings: [] };
    }
);

async function handleFiles(files) {
    const { glbFile, expConfigFile, sceneConfigFile } = getFilesFromList(files);

    if (expConfigFile) {
        revokeObjectUrl(configUrl);
        configUrl = URL.createObjectURL(expConfigFile);
    }

    if (sceneConfigFile) {
        revokeObjectUrl(sceneConfigUrl);
        sceneConfigUrl = URL.createObjectURL(sceneConfigFile);
    }

    if (glbFile) {
        revokeObjectUrl(modelUrl);
        modelUrl = URL.createObjectURL(glbFile);
        
        try {
            await startEditor(appContainer, modelUrl, configUrl, sceneConfigUrl, glbFile, expConfigFile, sceneConfigFile);
            hideOverlay();
        } catch (error) {
            console.error('Fehler beim Laden des Modells oder Initialisieren der Animation:', error);
            showValidationError('Modell/Animation konnte nicht geladen werden. Bitte Dateien prüfen oder erneut versuchen.');
        }
        
    } else if (expConfigFile || sceneConfigFile) {
        console.log('Config geladen, warte auf GLB...');
    }
}
