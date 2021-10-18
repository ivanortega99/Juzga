const db = require('../../config/db');

// Obtener todas las carpetas
exports.getCarpetas = async () => {
    try {
        let carpetas = await db.query('SELECT * FROM Carpeta');
        
        return {
            message: "Carpetas obtenidas",
            payload: carpetas,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Obtener una sola carpeta
exports.getCarpeta = async (carpetaId) => {
    try {
        let carpeta = await db.query("SELECT * FROM Carpeta WHERE id_carpeta = ?", [carpetaId]);
        let delitos = await db.query("SELECT Delito.id_delito, delito FROM Delito INNER JOIN CarpetaDelito ON Delito.id_delito = CarpetaDelito.id_delito WHERE CarpetaDelito.id_carpeta = ?", [carpetaId]);

        let carpetaResponse = carpeta[0]
        carpetaResponse.delitos = delitos;
        console.log(carpetaResponse)

        return {
            message: "Carpeta obtenida",
            payload: carpetaResponse,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Crear una carpeta
exports.createCarpeta = async (carpetaData) => {
    try {
        let carpetaCreated = await db.query("INSERT INTO Carpeta (nuc_carpeta, tipo_carpeta, presentacion_carpeta, fecha_ingreso_carpeta, fecha_inicio_carpeta, duracion_carpeta, judicalizada_carpeta, nuevo_carpeta, archivo_muerto_carpeta, vinculacion_carpeta, rol_carpeta, oficio_carpeta) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            carpetaData.nuc_carpeta,
            carpetaData.tipo_carpeta,
            carpetaData.presentacion_carpeta,
            carpetaData.ingreso_carpeta,
            carpetaData.inicio_carpeta,
            carpetaData.duracion_carpeta,
            carpetaData.judicalizada_carpeta,
            carpetaData.nuevo_carpeta,
            carpetaData.archivo_muerto_carpeta,
            carpetaData.vinculacion_carpeta,
            carpetaData.rol_carpeta,
            carpetaData.oficio_carpeta
        ]);

        if (carpetaData.delitos_carpeta.length > 0) {
            let newDelitos = carpetaData.delitos_carpeta;
            for (let i = 0; i < newDelitos.length; i++) {
                if (!newDelitos[i].id_delito) {
                    let delitoAdded = await db.query("INSERT INTO Delito (delito) VALUES (?)", newDelitos[i].delito);
                    newDelitos[i].id_delito = delitoAdded.insertId;
                }
            }
            carpetaData.delitos_carpeta = newDelitos;

            let delitos = carpetaData.delitos_carpeta;
            for (let i = 0; i < delitos.length; i++) {
                let relation = await db.query("INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (?, ?)", [carpetaCreated.insertId, delitos[i].id_delito])
            }
        }

        return {
            message: "Carpeta creada",
            payload: {
                inserted: carpetaCreated.insertId
            },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Modificar carpeta
exports.updateCarpeta = async (id_carpeta, dataToUpdate) => {
    try {
        let carpetaUpdated = await db.query(`UPDATE Carpeta SET nuc_carpeta = ?, tipo_carpeta = ?, presentacion_carpeta = ?, judicalizada_carpeta = ?, nuevo_carpeta = ?, archivo_muerto_carpeta = ?, vinculacion_carpeta = ?, rol_carpeta = ?, oficio_carpeta = ? WHERE id_carpeta = ?`, [
            dataToUpdate.nuc_carpeta,
            dataToUpdate.tipo_carpeta,
            dataToUpdate.presentacion_carpeta,
            dataToUpdate.judicalizada_carpeta,
            dataToUpdate.nuevo_carpeta,
            dataToUpdate.archivo_muerto_carpeta,
            dataToUpdate.vinculacion_carpeta,
            dataToUpdate.rol_carpeta,
            dataToUpdate.oficio_carpeta,
            id_carpeta]);

        return {
            message: "Carpeta actualizada!",
            payload: { updated: id_carpeta },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Eliminar carpeta
exports.deleteCarpeta = async (id_carpeta) => {
    try {
        let delitosDeleted = await db.query("DELETE FROM CarpetaDelito WHERE id_carpeta = ?", id_carpeta);
        let carpetaDeleted = await db.query("DELETE FROM Carpeta WHERE id_carpeta = ?", id_carpeta);

        return {
            message: "Carpeta eliminada!",
            payload: { id_deleted: id_carpeta },
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Obtener delitos para crear la carpeta
exports.getDelitos = async () => {
    try {
        let delitos = await db.query("SELECT * FROM Delito");

        return {
            message: "Delitos obtenidos",
            payload: delitos,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}