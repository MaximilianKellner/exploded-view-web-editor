import Pickr from "@simonwep/pickr";
import '@simonwep/pickr/dist/themes/nano.min.css';

const colorLabel = document.getElementById('color-label');
const colorPreview = document.getElementById('color-preview');

const pickr = Pickr.create({
  el: ".picker-trigger",
  theme: "nano",
  useAsButton: true,    // Erlaubt eigenes HTML als Button
  default: "#1e1e1e",

  components: {
    preview: true,
    opacity: false,
    hue: true,
    interaction: {
      hex: true,
      input: true,
      save: false, // Für event doch wieder aktivieren?
    },
  },
});

// Funktion zum UI-Update
function updateUI(color) {
    const hex = color.toHEXA().toString();
    colorLabel.textContent = hex;
    colorPreview.style.backgroundColor = hex;
}

// Wenn sich die Farbe im Picker ändert (Live-Vorschau)
pickr.on("change", (color) => {
  updateUI(color);
});

// Wenn gespeichert wird
pickr.on("save", (color) => {
  updateUI(color);
  pickr.hide();
});

// Optional: Initial das UI setzen
pickr.on('init', instance => {
    updateUI(instance.getColor());
});