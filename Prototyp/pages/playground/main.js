import ExplodedViewer from 'explo.js';

// Optional: Standard-Design für Beschriftungen (Cards) importieren
import 'explo.js/default-card-style.css';

const container = document.getElementById('explo-viewer');

if (!container) {
        throw new Error('Container #explo-viewer wurde nicht gefunden.');
}

const withBaseUrl = (path) => new URL(path, window.location.origin + import.meta.env.BASE_URL).toString();

const options = {
        modelPath: withBaseUrl('playground-assets/911-with-ground.glb'),
        sceneConfigPath: withBaseUrl('playground-assets/scene-config.json'),
        explosionConfigPath: withBaseUrl('playground-assets/exp-config.json'),
        cardDataPath: withBaseUrl('playground-assets/cards.json'),
        editMode: true, // Aktiviert den visuellen Editor zur Konfiguration
        showStats: true,
        showDebugUI: false,
};

const viewer = new ExplodedViewer(container, options);
viewer.init();