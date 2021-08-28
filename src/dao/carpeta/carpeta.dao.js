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
        let carpetaCreated = await db.query("INSERT INTO Carpeta (nuc, tipo, presentacion, fecha_ingreso, fecha_inicio, duracion, judicalizada, nuevo, archivo_muerto, vinculacion, rol, oficio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
            carpetaData.nuc,
            carpetaData.tipo,
            carpetaData.presentacion,
            new Date(),
            new Date(),
            carpetaData.duracion,
            carpetaData.judicalizada,
            carpetaData.nuevo,
            carpetaData.archivo_muerto,
            carpetaData.vinculacion,
            carpetaData.rol,
            carpetaData.oficio
        ]);

        if (carpetaData.delitos.length != 0) {
            let delitos = carpetaData.delitos;
            let id = carpetaCreated.insertId;
            for (let i = 0; i < delitos.length; i++) {
                let relation = await db.query("INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (?, ?)", [carpetaCreated.insertId, delitos[i]]);
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