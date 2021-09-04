const { query } = require('../../config/db');
const db = require('../../config/db');

// Obtener todas las partes
exports.getPartes = async () => {
    try {
        let partes = await db.query("SELECT id_parte, parte.id_tipo_parte, nombre_parte, tipo_parte FROM parte INNER JOIN tipoparte ON parte.id_tipo_parte = tipoparte.id_tipo_parte");
        // console.log(partes);

        for (let i = 0; i < partes.length; i++) {
            let correos = await db.query("SELECT CorreoP.id_correo, correo FROM CorreoP INNER JOIN ParteCorreoP ON CorreoP.id_correo = ParteCorreoP.id_correo WHERE id_parte = ?", partes[i].id_parte);
            let telefonos = await db.query("SELECT TelefonoP.id_telefono, telefono FROM TelefonoP INNER JOIN ParteTelefonoP ON TelefonoP.id_telefono = ParteTelefonoP.id_telefono WHERE id_parte = ?", partes[i].id_parte);
            partes[i].correos = correos;
            partes[i].telefonos = telefonos;
        }

        console.log(partes);

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
        let correos = await db.query("SELECT CorreoP.id_correo, correo FROM CorreoP INNER JOIN ParteCorreoP ON CorreoP.id_correo = ParteCorreoP.id_correo WHERE id_parte = ?", id_parte);
        let telefonos = await db.query("SELECT TelefonoP.id_telefono, telefono FROM TelefonoP INNER JOIN ParteTelefonoP ON TelefonoP.id_telefono = ParteTelefonoP.id_telefono WHERE id_parte = ?", id_parte);

        parte[0].correos = correos;
        parte[0].telefonos = telefonos;

        return {
            message: "Parte obtained!",
            payload: parte[0],
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Agregar parte
exports.createParte = async (dataParte) => {
    try {
        let newParte = await db.query("INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (?, ?)", [dataParte.id_tipo_parte ,dataParte.nombre_parte]);
        let parteInserted = newParte.insertId;

        if (dataParte.correos.length > 0) {
            for (let i = 0; i < dataParte.correos.length; i++) {
                let newCorreo = await db.query("INSERT INTO CorreoP (correo) VALUES (?)", dataParte.correos[i]);
                let relation = await db.query("INSERT INTO ParteCorreoP (id_parte, id_correo) VALUES (?, ?)", [parteInserted, newCorreo.insertId]);
            }
        }

        if (dataParte.telefonos.length > 0) {
            for (let i = 0; i < dataParte.telefonos.length; i++) {
                let newTelefono = await db.query("INSERT INTO TelefonoP (telefono) VALUES (?)", dataParte.telefonos[i]);
                let relation = await db.query("INSERT INTO ParteTelefonoP (id_parte, id_telefono) VALUES (?, ?)", [parteInserted, newTelefono.insertId]);
            }
        }

        return {
            message: "Usuario(Parte), creada correctamente",
            payload: { idInserted: parteInserted },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}