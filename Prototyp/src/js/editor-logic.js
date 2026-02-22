import ExplodedViewer from 'explo.js';
import 'explo.js/default-card-style.css';

function createViewerOptions(modelUrl, configUrl, sceneConfigUrl) {
    const options = {
        modelPath: modelUrl,
        editMode: true,
        showDebugUI: false,
        showStats: false,
        animationConfig: {
            globalExpDirection: [0, 1, 0]
        }
    };

    if (typeof sceneConfigUrl !== 'string' || sceneConfigUrl.length === 0) {
        options.sceneConfig = {
            backgroundColor: "#1e1e1e",
            shadowsEnabled: false,
            camera: {
                position: [5, 5, 5],
            }
        };
    }

    if (typeof configUrl === 'string' && configUrl.length > 0) {
        options.explosionConfigPath = configUrl;
    }

    if (typeof sceneConfigUrl === 'string' && sceneConfigUrl.length > 0) {
        options.sceneConfigPath = sceneConfigUrl;
    }

    return options;
}

function isNetworkError(error) {
    if (!error) return false;
    const message = String(error.message || error).toLowerCase();
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

async function initViewer(appContainer, modelPath, configPath, sceneConfigPath) {
    const options = createViewerOptions(modelPath, configPath, sceneConfigPath);
    const viewer = new ExplodedViewer(appContainer, options);
    await viewer.init();
}

export async function startEditor(appContainer, modelUrl, configUrl, sceneConfigUrl, modelFile = null, configFile = null, sceneConfigFile = null) {
    // Init ExpViewer
    try {
        await initViewer(appContainer, modelUrl, configUrl, sceneConfigUrl);
    } catch (error) {
        if (!isNetworkError(error) || !modelFile) {
            throw error;
        }

        const fallbackModelPath = await fileToDataUrl(modelFile);
        const fallbackConfigPath = configFile ? await fileToDataUrl(configFile) : null;
        const fallbackSceneConfigPath = sceneConfigFile ? await fileToDataUrl(sceneConfigFile) : null;

        appContainer.innerHTML = '';
        await initViewer(appContainer, fallbackModelPath, fallbackConfigPath, fallbackSceneConfigPath);
    }
}
