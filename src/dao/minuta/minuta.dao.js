const db = require('../../config/db');

// Crear una minuta
exports.createMinuta = async (dataMinuta) => {
    try {
        // Agregar delitos nuevos
        // let { payload } = await this.getDataToCreateMinuta();
        // let delitos = payload.delitos;
        // let asesores = payload.asesores;
        // let defensores = payload.defensores;

        if (dataMinuta.delitos.length > 0) {
            let newDelitos = dataMinuta.delitos;
            for (let i = 0; i< newDelitos.length; i++) {
                if (!newDelitos[i].id_delito) {
                    let delitoAdded = await db.query("INSERT INTO Delito (delito) VALUES (?)", newDelitos[i].delito)
                    newDelitos[i].id_delito = delitoAdded.insertId;
                }
            }
            dataMinuta.delitos = newDelitos
        }
        console.log('delitos: ', dataMinuta.delitos);
        // let minutaCreated = await db.query()
    } catch (err) {
        console.log(err);
    }
}

// Obtener datos para crear minuta
exports.getDataToCreateMinuta = async () => {
    try {
        let ministeriosPublicos = await db.query("SELECT id_parte, nombre_parte FROM Parte WHERE id_tipo_parte = 3");
        let defensores = await db.query("SELECT id_parte, nombre_parte FROM Parte WHERE id_tipo_parte = 1");
        let asesores = await db.query("SELECT id_parte, nombre_parte FROM Parte WHERE id_tipo_parte = 2");
        let jueces = await db.query("SELECT * FROM Juez");
        let salas = await db.query("SELECT * FROM Sala");
        let encargados = await db.query("SELECT * FROM EncargadoSala");
        let auxiliares = await db.query("SELECT * FROM AuxiliarSala");
        let delitos = await db.query("SELECT * FROM Delito");

        return {
            message: "Data obtained!",
            payload: {
                ministerios: ministeriosPublicos,
                defensores: defensores,
                asesores: asesores,
                jueces: jueces,
                salas: salas,
                encargados: encargados,
                auxiliares: auxiliares,
                delitos: delitos
            },
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}