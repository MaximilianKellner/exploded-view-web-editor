import ExplodedViewer from "explo.js";

// Optional: Standard-Design für Beschriftungen (Cards) importieren
import "explo.js/default-card-style.css";

const container = document.getElementById("explo-viewer");
const prevButton = document.getElementById("scenePrevBtn");
const nextButton = document.getElementById("sceneNextBtn");
const playButton = document.getElementById("playBothBtn");
const progressSlider = document.getElementById("progressSlider");
const resetButton = document.getElementById("resetBtn");
const previewButtons = Array.from(document.querySelectorAll(".scene-preview"));

if (
    !container ||
    !prevButton ||
    !nextButton ||
    !playButton ||
    !progressSlider ||
    !resetButton
) {
    throw new Error("Ein oder mehrere Demo-Elemente wurden nicht gefunden.");
}

const sharedOptions = {
    editMode: false,
    showStats: false,
    showDebugUI: false,
};

// 6 auswählbare Szenen für den Viewer
const scenes = [
  {
    modelPath: "/playground-assets/911-with-ground.glb",
    sceneConfigPath: "/demo-page-assets/scene-config.json",
    explosionConfigPath: "/playground-assets/exp-config.json",
  },
  {
    modelPath: "/playground-assets/911.glb",
    sceneConfigPath: "/playground-assets/scene-config.json",
    explosionConfigPath: "/playground-assets/exp-config.json",
  },
  {
    modelPath: "/playground-assets/911-with-ground.glb",
    sceneConfigPath: "/playground-assets/scene-config.json",
    explosionConfigPath: "/playground-assets/exp-config.json",
  },
  {
    modelPath: "/playground-assets/911.glb",
    sceneConfigPath: "/demo-page-assets/scene-config.json",
    explosionConfigPath: "/playground-assets/exp-config.json",
  },
  {
    modelPath: "/playground-assets/911-with-ground.glb",
    sceneConfigPath: "/demo-page-assets/scene-config.json",
    explosionConfigPath: "/playground-assets/exp-config.json",
  },
  {
    modelPath: "/playground-assets/911.glb",
    sceneConfigPath: "/playground-assets/scene-config.json",
    explosionConfigPath: "/playground-assets/exp-config.json",
  },
];

let viewer = null;
let activeSceneIndex = 0;
let loadingScene = false;
let loadRequestId = 0;

const normalizeSceneIndex = (index) => {
    const total = scenes.length;
    return ((index % total) + total) % total;
};

// Markiert die aktuell aktive Preview-Kachel
const updateActivePreview = () => {
    previewButtons.forEach((button, index) => {
        const isActive = index === activeSceneIndex;
        button.classList.toggle("is-active", isActive);
        button.setAttribute("aria-current", isActive ? "true" : "false");
  });
};

// Sperrt UI während eine Szene geladen wird
const setLoadingState = (isLoading) => {
    loadingScene = isLoading;
    prevButton.disabled = isLoading;
    nextButton.disabled = isLoading;
    playButton.disabled = isLoading;
    progressSlider.disabled = isLoading;
    resetButton.disabled = isLoading;
    previewButtons.forEach((button) => {
        button.disabled = isLoading;
    });
};

// Verknüpft globale Buttons/Slider mit dem aktuellen Viewer
const registerViewerControls = (viewerInstance) => {
    progressSlider.value = "0";

    viewerInstance.registerAnimationButton("#playBothBtn", {
        action: "toggle",
    });

    viewerInstance.registerAnimationSlider("#progressSlider", {
        eventName: "input",
        usePercent: true,
        animate: false,
        syncWithAnimation: true,
    });

    viewerInstance.registerAnimationResetButton("#resetBtn", {
        progress: 0,
    });
};

// Viewer freigeben, bevor eine neue Szene geladen wird
const destroyViewer = () => {
    if (!viewer) {
        return;
    }

    viewer.destroy();
    viewer = null;
    container.innerHTML = "";
};

const createViewerForScene = async (scene) => {
    // Baut Viewer-Optionen aus Szene + gemeinsamen Defaults
    const options = {
        ...scene,
        ...sharedOptions,
    };

    // Neue Viewer-Instanz erzeugen und initialisieren
    const nextViewer = new ExplodedViewer(container, options);
    await Promise.resolve(nextViewer.init());
    return nextViewer;
};

// Szene laden: alten Viewer zerstören, neuen initialisieren
const loadScene = async (sceneIndex) => {
    const normalizedIndex = normalizeSceneIndex(sceneIndex);
    activeSceneIndex = normalizedIndex;
    updateActivePreview();

    setLoadingState(true);
    const requestId = ++loadRequestId;

    try {
        destroyViewer();

        const nextViewer = await createViewerForScene(scenes[normalizedIndex]);
        if (requestId !== loadRequestId) {
        nextViewer.destroy();
        return;
        }

        viewer = nextViewer;
        registerViewerControls(viewer);
    } catch (error) {
        console.error("Szene konnte nicht geladen werden:", error);
    } finally {
        if (requestId === loadRequestId) {
        setLoadingState(false);
        updateActivePreview();
        }
    }
};

prevButton.addEventListener("click", () => {
    // Eine Szene zurück
    if (loadingScene) {
        return;
    }

    loadScene(activeSceneIndex - 1);
});

nextButton.addEventListener("click", () => {
    // Eine Szene vor
    if (loadingScene) {
        return;
    }

    loadScene(activeSceneIndex + 1);
});

// Direkter Sprung per Klick auf eine Vorschau
previewButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
        if (loadingScene) {
        return;
        }

        loadScene(index);
    });
});

// Initiale Szene anzeigen
loadScene(0);