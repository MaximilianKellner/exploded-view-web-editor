## POC: Zeitachse für Animierte Objekte

### Problem:
   * Es fehlt eine interaktive Zeitachse zur Steuerung und Visualisierung der Objektanimationen.
   * Die Verschiedenen Intervalle der Animationen sind nicht übersichtlich dargestellt.

### Scope:
   * Implementierung einer Zeitachse mit Play-, Pause- und Reset-Buttons.
   * Interaktive Nadel/Scrubber, die per Drag bewegt werden kann.
   * Visualisierung der Animationsintervalle für Objekte, die aus exp-config.json ausgelesen werden.

### Resources:
   * beispiel exp-config.json

### Description:
   * Die Zeitachse zeigt die Animationsintervalle aller relevanten Objekte an.
   * Die Nadel kann per Drag verschoben werden und steuert die aktuelle Zeit.
   * Play startet die Animation, Pause hält sie an, Reset setzt sie auf 0 zurück.
   * Die Intervalle werden dynamisch aus exp-config.json geladen und angezeigt.

### Success Criteria:
   * Zeitachse mit Play, Pause, Reset und interaktiver Nadel ist implementiert.
   * Animationsintervalle werden korrekt aus exp-config.json geladen und angezeigt.
   * Benutzer kann die Nadel verschieben und damit den globalen Animationsfortschritt steuern.

### Fail Criteria:
   * Zeitachse ist nicht interaktiv oder zeigt keine Animationsintervalle.
   * Play, Pause, Reset funktionieren nicht zuverlässig.
   * exp-config.json wird nicht korrekt ausgelesen.

### Fallbacks:
   * Bestehende Pakete oder Bibliotheken für Zeitachsen verwenden.
   * Simplen Slider anstatt einer Nadel implementieren.