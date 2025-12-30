import ExplodedViewer from '@maximiliankellner/exploded-views';

const klemmbaustein = {
    sceneConfigPath: '/lego/scene-config.json',
    modelPath: '/lego/lego-figur.glb',
    explosionConfigPath: '/lego/exp-config.json',

    showDebugUI: false,
    showStats: false,

    // Editor aktivieren
    editMode: true,
};
const sportwagen = {
    sceneConfigPath: '/car/scene-config.json', // Pfad zur Szenenkonfiguration
    modelPath: '/car/911.glb', // Pfad zum explodierbaren .glb Modell
    //modelPath: '/car/911-with-ground.glb', // Pfad zum explodierbaren .glb Modell
    explosionConfigPath: '/car/911-exp-config.json', // Pfad zur Explosions-Konfiguration
    cardDataPath: '/car/911-cards.json', // Pfad zu den Card-Inhalten
    showDebugUI: true,
    showStats: true,

    editMode: true,  // Edit-Mode beim Start
    
    sceneConfig: {
        backgroundColor: "#6480be", //old: 353535 -- blue: 6480be
        camera: {
            position: [5, 3, 9],
            maxDistance: 50,
            lockVertical: false,
        }
    },
    
    highlightOptions: {
        highlightComponent: true,
        mode: "ghost"  // 'wireframe' oder 'ghost'
    },

    infoElementType: 'card', // 'pointer', 'attached-card', 'card'
}

async function main() {
    const container = document.getElementById('exp-container');
    if (!container) return;

    const viewer = new ExplodedViewer(container, sportwagen);
    await viewer.init();

    window.addEventListener('ev:objectSelected', (event) => {
        const { object } = event.detail;

        if (object) {
            console.log('Objekt ausgewählt:', object.name);
            viewer.attachTransformControlsByUUID(object.uuid);
        } else {
            viewer.detachTransformControls();
        }
    });

    /**
     * TODO Edit-Mode toggel
     */
}

main();
