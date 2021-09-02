const db = require('../../config/db');

// Obtener todas las partes
exports.getPartes = async () => {
    try {
        let partes = await db.query("SELECT id_parte, parte.id_tipo_parte, nombre_parte, tipo_parte FROM parte INNER JOIN tipoparte ON parte.id_tipo_parte = tipoparte.id_tipo_parte");

        return {
            message: "Partes obtained!",
            payload: partes,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Obtener una parte
exports.getParte = async (id_parte) => {
    try {
        let parte = await db.query("SELECT id_parte, parte.id_tipo_parte, nombre_parte, tipo_parte FROM parte INNER JOIN tipoparte ON parte.id_tipo_parte = tipoparte.id_tipo_parte WHERE parte.id_parte = ?", id_parte);

        return {
            message: "Parte obtained!",
            payload: parte[0],
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}