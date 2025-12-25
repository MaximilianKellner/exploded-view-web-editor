import Pickr from "@simonwep/pickr";

const pickr = Pickr.create({
  el: ".color-picker",
  theme: "nano",
  default: "#3498db",

  components: {
    preview: true,
    opacity: false, // Alpha deaktiviert
    hue: true,

    interaction: {
      hex: true,
      rgba: true,
      input: true,
      save: true,
      clear: false,
    },
  },
});

pickr.on("change", (color) => {
  const hex = color.toHEXA().toString();
  console.log("Change:", hex);
});

pickr.on("save", (color) => {
  console.log("Saved:", color.toHEXA().toString());
  pickr.hide();
});
