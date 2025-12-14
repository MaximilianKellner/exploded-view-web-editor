## POC 2: Objekte auswählen & verschieben

### Problem:
   * Objekte im Editor auswählen und verschieben.
   * Die Integration des NPM-Pakets und Nutzung der Events.

### Scope:
   * Auswahl von Objekten im 3D-Editor mit Gizmo (Three.js).
   * Verschieben der Objekte per Gizmo.
   * Nutzung der Events aus dem eigenen NPM-Paket zur Auswahl.
   * Ausgabe der Ausgangs- und Endposition beim Verschieben.
   * Umrechnung von Punkten in Vektoren.

### Resources:
   * Eigenes NPM-Paket für Auswahl-Events
   * Three.js Gizmo
   * Beispiele für Gizmo-Implementierungen

### Description:
   * Nutzer können ein Objekt im 3D-Editor auswählen (Event aus NPM-Paket).
   * Ein Gizmo erscheint am Objekt und ermöglicht das Verschieben.
   * Beim Start und Ende der Verschiebung werden die Positionen ausgegeben.
   * Punkte werden in Vektoren umgerechnet, um Animationen und Visualisierungen zu ermöglichen.

### Success Criteria:
   * Objekte können per Gizmo ausgewählt und verschoben werden.
   * Auswahl erfolgt über Event aus NPM-Paket.
   * Ausgangs- und Endposition werden korrekt ausgegeben.
   * Punkt-zu-Vektor-Umrechnung funktioniert.

### Fail Criteria:
   * Keine Auswahl oder Verschiebung möglich.
   * Events aus NPM-Paket können nicht genutzt werden.
   * Keine oder falsche Positionsausgabe.

### Fallbacks:
   * Manuelle Auswahl und Verschiebung ohne Events.
   * Nutzung eines Standard-Gizmo aus Three.js ohne Event-Integration.