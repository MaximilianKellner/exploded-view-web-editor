export function getFilesFromList(files) {
    let glbFile = null;
    let jsonFile = null;

    for (const file of files) {
        if (file.name.toLowerCase().endsWith('.glb')) {
            glbFile = file;
        } else if (file.name.toLowerCase().endsWith('.json')) {
            jsonFile = file;
        }
    }
    return { glbFile, jsonFile };
}

function createValidationResult(isValid, errors = [], warnings = []) {
    return {
        isValid,
        errors,
        warnings
    };
}

// Exp-config Format Überprüfung
export async function validateConfigFile(file) {
    try {
        const text = await file.text();
        const config = JSON.parse(text);

        const errors = [];
        const warnings = [];

        if (!config || typeof config !== 'object' || Array.isArray(config)) {
            return createValidationResult(false, ['Die Config muss ein JSON-Objekt sein.']);
        }

        if (!config.objects || typeof config.objects !== 'object' || Array.isArray(config.objects)) {
            return createValidationResult(false, ['Die Config benötigt ein "objects"-Objekt.']);
        }

        for (const key in config.objects) {
            const obj = config.objects[key];
            if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
                errors.push(`Objekt "${key}": Eintrag muss ein Objekt sein.`);
                continue;
            }

            // level: number (optional)
            if (Object.prototype.hasOwnProperty.call(obj, 'level') && typeof obj.level !== 'number') {
                errors.push(`Objekt "${key}": "level" muss eine Zahl sein.`);
            }

            // expDirection: [x, y, z] (numbers, optional per object)
            if (Object.prototype.hasOwnProperty.call(obj, 'expDirection')) {
                if (!Array.isArray(obj.expDirection) || obj.expDirection.length !== 3) {
                    errors.push(`Objekt "${key}": "expDirection" muss ein Array mit 3 Zahlen sein.`);
                } else if (obj.expDirection.some(n => typeof n !== 'number')) {
                    errors.push(`Objekt "${key}": "expDirection" darf nur Zahlen enthalten.`);
                }
            }

            // rotation: [x, y, z] (numbers, optional)
            if (Object.prototype.hasOwnProperty.call(obj, 'rotation')) {
                if (!Array.isArray(obj.rotation) || obj.rotation.length !== 3) {
                    errors.push(`Objekt "${key}": "rotation" muss ein Array mit 3 Zahlen sein.`);
                } else if (obj.rotation.some(n => typeof n !== 'number')) {
                    errors.push(`Objekt "${key}": "rotation" darf nur Zahlen enthalten.`);
                }
            }

            // start: number (optional)
            if (Object.prototype.hasOwnProperty.call(obj, 'start') && typeof obj.start !== 'number') {
                errors.push(`Objekt "${key}": "start" muss eine Zahl sein.`);
            }

            // end: number (optional)
            if (Object.prototype.hasOwnProperty.call(obj, 'end') && typeof obj.end !== 'number') {
                errors.push(`Objekt "${key}": "end" muss eine Zahl sein.`);
            }

            // sequence: number (optional)
            if (Object.prototype.hasOwnProperty.call(obj, 'sequence') && typeof obj.sequence !== 'number') {
                errors.push(`Objekt "${key}": "sequence" muss eine Zahl sein.`);
            }

            if (Object.prototype.hasOwnProperty.call(obj, 'speedMultiplier')) {
                warnings.push(`Objekt "${key}": Legacy-Feld "speedMultiplier" erkannt.`);
            }
        }

        return createValidationResult(errors.length === 0, errors, warnings);
    } catch (error) {
        console.error("Validation error:", error);
        return createValidationResult(false, ['Ungültiges JSON-Format.']);
    }
}
