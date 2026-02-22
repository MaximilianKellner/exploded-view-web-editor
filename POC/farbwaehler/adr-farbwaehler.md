# ADR: Einsatz von `@simonwep/pickr` als einheitlicher Colorpicker

## Status
Accepted

## Kontext
- Der native System-Colorpicker ist plattformabhängig und liefert insbesondere unter Windows kein konsistentes UX.
- Für den Web-Editor wird ein einheitlicher, visuell anpassbarer Colorpicker benötigt, der in das bestehende Designsystem integrierbar ist.
- Die Colorpicker-Lösung soll als NPM-Paket einfach integrierbar sein.

## Entscheidung
Es wird `@simonwep/pickr` als standardmäßige Colorpicker-Implementierung im Projekt verwendet.

## Begründung
- **Aktueller Wartungszustand:** Das Projekt erhält weiterhin wichtige Security- und Bugfix-Updates.
- **Funktionsumfang passend:** Die benötigten Farb-Interaktionen und Formate sind für den aktuellen Scope passend.
- **Styling-Flexibilität:** Der Picker bietet mehrere Größen und lässt sich gut per CSS anpassen/überschreiben, sodass er ins Designsystem passt.
- **Einfache Integration:** NPM-Paket mit unkomplizierter Einbindung in die bestehende Frontend-Struktur.

## Bekannte Einschränkungen
- Das Maintainer kommuniziert, dass der "Funktionsumfang eingefroren" ist.

## Konsequenzen
- Schnelle Integration eines konfigurierbaren, stabilen, konsistenten und gut integrierbaren Colorpickers.
- Langfristig ist mit begrenzter Weiterentwicklung zu rechnen.
- Die Integration muss daher bewusst über ein eigenes Adapter-/Wrapper-Modul erfolgen, um einen späteren Austausch mit geringem Aufwand zu ermöglichen.

## Technische Umsetzung
- Kapselung über ein zentrales Colorpicker-Modul (keine direkte Kopplung der Business-Logik an `pickr`).
- Interne Normalisierung von Farben auf ein einheitliches Format (HEX).

## Erfolgs- und Abbruchkriterien
### Erfolg
- Einheitliches Erscheinungsbild und Verhalten auf allen Zielplattformen.
- Nahtlose Einbettung in das Designsystem durch CSS-Anpassung.
- Keine spürbaren UI-Lags.

### Abbruch / Re-Evaluation
- Bestehende Sicherheitslücken im Paket, die nicht zeitnah behoben werden.
- Unerwartete Inkompatibilitäten mit der bestehenden Codebasis.
- Signifikante Performance-Probleme oder negative UX-Bewertungen im Vergleich zum nativen System-Colorpicker.

## Alternativen (bewusst nicht gewählt)
- **Native `<input type="color">`:** zu inkonsistent im UX, eingeschränkte Anpassbarkeit.
- **Eigenentwicklung:** hoher initialer und laufender Entwicklungs-/Wartungsaufwand.
- **Andere NPM-Picker:** zum Zeitpunkt der Entscheidung kein besseres Gesamtverhältnis aus Integrationsaufwand, Styling und Scope-Fit.