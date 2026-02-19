import ExplodedViewer from 'explo.js';
import 'explo.js/default-card-style.css';

function createViewerOptions(modelUrl, configUrl) {
    const options = {
        modelPath: modelUrl,
        editMode: true,
        showDebugUI: false,
        showStats: false,
        sceneConfig: {
            backgroundColor: "#1e1e1e",
            shadowsEnabled: false,
            camera: {
                position: [5, 5, 5],
            }
        },
        animationConfig: {
            layerDistance: 1,
            globalExpDirection: [0, 1, 0]
        }
    };

    if (typeof configUrl === 'string' && configUrl.length > 0) {
        options.explosionConfigPath = configUrl;
    }

    return options;
}

function isNetworkError(error) {
    if (!error) return false;
    if (error instanceof TypeError && String(error.message).toLowerCase().includes('networkerror')) {
        return true;
    }
    const message = String(error.message || '').toLowerCase();
    return message.includes('failed to fetch') || message.includes('networkerror');
}

function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error(`Datei konnte nicht gelesen werden: ${file.name}`));
        reader.readAsDataURL(file);
    });
}

async function initViewer(appContainer, modelPath, configPath) {
    const options = createViewerOptions(modelPath, configPath);
    const viewer = new ExplodedViewer(appContainer, options);
    await viewer.init();
}

export async function startEditor(appContainer, modelUrl, configUrl, modelFile = null, configFile = null) {
    // Init ExpViewer
    try {
        await initViewer(appContainer, modelUrl, configUrl);
    } catch (error) {
        if (!isNetworkError(error) || !modelFile) {
            throw error;
        }

        const fallbackModelPath = await fileToDataUrl(modelFile);
        const fallbackConfigPath = configFile ? await fileToDataUrl(configFile) : null;

        appContainer.innerHTML = '';
        await initViewer(appContainer, fallbackModelPath, fallbackConfigPath);
    }
}
