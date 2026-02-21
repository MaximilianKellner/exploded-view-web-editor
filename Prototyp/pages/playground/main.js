import ExplodedViewer from 'explo.js';

// Optional: Standard-Design für Beschriftungen (Cards) importieren
import 'explo.js/default-card-style.css';

const container = document.getElementById('explo-viewer');

if (!container) {
        throw new Error('Container #explo-viewer wurde nicht gefunden.');
}

const options = {
        modelPath: '/playground-assets/911-with-ground.glb',
        sceneConfigPath: '/playground-assets/scene-config.json',
        explosionConfigPath: '/playground-assets/exp-config.json',
        cardDataPath: '/playground-assets/cards.json',
        editMode: true, // Aktiviert den visuellen Editor zur Konfiguration
        showStats: true,
        showDebugUI: false,
};

const viewer = new ExplodedViewer(container, options);
viewer.init();