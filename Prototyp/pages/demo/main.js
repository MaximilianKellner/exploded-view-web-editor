import ExplodedViewer from 'explo.js';

// Optional: Standard-Design für Beschriftungen (Cards) importieren
import 'explo.js/default-card-style.css';

const container = document.getElementById('explo-viewer');

if (!container) {
        throw new Error('Container #explo-viewer wurde nicht gefunden.');
}

const options = {
        modelPath: '/playground-assets/911-with-ground.glb',
        sceneConfigPath: '/demo-page-assets/scene-config.json',
        explosionConfigPath: '/playground-assets/exp-config.json',
        editMode: false, // Aktiviert den visuellen Editor zur Konfiguration
        showStats: false,
        showDebugUI: false,
};

const options2 = {
        modelPath: '/playground-assets/911.glb',
        sceneConfigPath: '/demo-page-assets/scene-config.json',
        explosionConfigPath: '/playground-assets/exp-config.json',
        editMode: false, // Aktiviert den visuellen Editor zur Konfiguration
        showStats: false,
        showDebugUI: false,
};

const viewer = new ExplodedViewer(container, options);
const viewer2 = new ExplodedViewer(document.getElementById('explo-viewer-2'), options2);

viewer.init();
viewer2.init();


setTimeout(() => {
        
}, 2000);

viewer.registerAnimationButton('#playBothBtn', {
        action: 'toggle', // 'toggle' | 'start' | 'pause'
});

viewer2.registerAnimationButton('#playBothBtn', {
        action: 'toggle', // 'toggle' | 'start' | 'pause'
});

viewer.registerAnimationSlider('#progressSlider', {
        eventName: 'input',
        usePercent: true, // Slider-Wert 0-100
        animate: false,
        syncWithAnimation: true,
});

viewer2.registerAnimationSlider('#progressSlider', {
        eventName: 'input',
        usePercent: true, // Slider-Wert 0-100
        animate: false,
        syncWithAnimation: true,
});

viewer.registerAnimationResetButton('#resetBtn', {
        progress: 0, // Zielposition in Prozent
});

viewer2.registerAnimationResetButton('#resetBtn', {
        progress: 0, // Zielposition in Prozent
});

