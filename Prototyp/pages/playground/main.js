import ExplodedViewer from 'explo.js';

// Optional: Standard-Design für Beschriftungen (Cards) importieren
import 'explo.js/default-card-style.css';

const container = document.getElementById('explo-viewer');

if (!container) {
        throw new Error('Container #explo-viewer wurde nicht gefunden.');
}

const options = {
        modelPath: '/playground-demo/911-with-ground.glb',
        sceneConfigPath: '/playground-demo/scene-config.json',
        explosionConfigPath: '/playground-demo/exp-config.json',
        cardDataPath: '/playground-demo/cards.json',
        editMode: true,
        showStats: false,
};

const viewer = new ExplodedViewer(container, options);
viewer.init();