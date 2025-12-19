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

async function main() {
    const container = document.getElementById('exp-container');
    if (!container) return;

    const viewer = new ExplodedViewer(container, klemmbaustein);
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
