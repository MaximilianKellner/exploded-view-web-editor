## POC 3: Einheitlicher Colorpicker

### Problem:
* System-Colorpicker sind plattformabhängig und inkonsistent.
* Besonders unter Windows sind Design, UX und Funktionsumfang lückenhaft und veraltet.
* Unterschiedliche Implementierungen erschweren einheitliche Funktionen und UX-Design.

### Scope:
* Auswahl eines bestehenden NPM-Pakets oder Entwicklung eines eigenen Colorpickers.
* Einheitlicher Colorpicker für alle Plattformen.
* Austauschbarkeit des System-Colorpickers.
* Unterstützung gängiger Farbformate (HEX, RGB(A), HSL)?

### Resources:
* Vanilla-Picker (oder vergleichbares NPM-Paket)
* Browser-native APIs (Input Type Color als Fallback)

### Description:
* Der native System-Colorpicker wird durch eine einheitliche Lösung ersetzt.
* Ein zentrales Colorpicker-Modul kapselt die Implementierung.
* Nutzer öffnen den Colorpicker unabhängig vom Betriebssystem mit identischem UX.
* Farben werden intern in ein einheitliches Format normalisiert.

### Success Criteria:
* Einheitliches Erscheinungsbild und Funktionen auf allen Plattformen.
* Austausch des Colorpickers ohne Anpassung der Business-Logik möglich.
* Positive UX-Bewertung im Vergleich zum System-Colorpicker (insb. Windows).

### Fail Criteria:
* Inkonsistentes Verhalten zwischen Plattformen.
* Performance-Probleme oder UI-Lags.

### Fallbacks:
* Nutzung des nativen `<input type="color">` als Minimal-Fallback.