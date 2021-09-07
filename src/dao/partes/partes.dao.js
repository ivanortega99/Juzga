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
        console.log(parte)
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

// Actualizar datos de parte
exports.updateParte = async (id_parte, dataToUpdate) => {
    try {
        let updated = await db.query("UPDATE Parte SET nombre_parte = ? WHERE id_parte = ?", [dataToUpdate.nombre_parte, id_parte]);
        console.log(updated);
        return {
            message: "Actualizado correctamente",
            payload: updated.message,
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Agregar numero de telefono
exports.addTelefono = async (id_parte, telefono) => {
    try {
        let newTelefono = await db.query("INSERT INTO TelefonoP (telefono) VALUES (?)", telefono);
        let relation = await db.query("INSERT INTO ParteTelefonoP (id_parte, id_telefono) VALUES (?, ?)", [id_parte, newTelefono.insertId]);

        return {
            message: "Telefono agregado!",
            payload: { inserted: newTelefono.insertId },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Agregar correo electronico
exports.addCorreo = async (id_parte, correo) => {
    try {
        let newCorreo = await db.query("INSERT INTO CorreoP (correo) VALUES (?)", correo);
        let relation = await db.query("INSERT INTO ParteCorreoP (id_parte, id_correo) VALUES (?, ?)", [id_parte, newCorreo.insertId]);

        return {
            message: "Correo electronico agregado!",
            payload: { inserted: newCorreo.insertId },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Actualizar numero de telefono
exports.updateTelefono = async (id_telefono, newTelefono) => {
    try {
        let updated = await db.query("UPDATE TelefonoP SET telefono = ? WHERE id_telefono = ?", [newTelefono, id_telefono]);
        
        return {
            message: "Telefono actualizado!",
            payload: updated.message,
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Actualizar correo electronico
exports.updateCorreo = async (id_correo, newCorreo) => {
    try {
        let updated = await db.query("UPDATE CorreoP SET correo = ? WHERE id_correo = ?", [newCorreo, id_correo]);

        return {
            message: "Correo actualizado!",
            payload: updated.message,
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Eliminar numero de telefono
exports.deleteTelefono = async (id_parte, id_telefono) => {
    try {
        let relationDeleted = await db.query("DELETE FROM ParteTelefonoP WHERE id_parte = ? AND id_telefono = ?", [id_parte, id_telefono]);
        let phoneDeleted = await db.query("DELETE FROM TelefonoP WHERE id_telefono = ?", [id_telefono]);
        
        return {
            message: "Telefono eliminado!",
            payload: {},
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Eliminar correo electronico
exports.deleteCorreo = async (id_parte, id_correo) => {
    try {
        let relationDeleted = await db.query("DELETE FROM ParteCorreoP WHERE id_parte = ? AND id_correo = ?", [id_parte, id_correo]);
        let emailDeleted = await db.query("DELETE FROM CorreoP WHERE id_correo = ?", [id_correo]);

        return {
            message: "Correo eliminado!",
            payload: {},
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Eliminar parte
exports.deleteParte = async (id_parte) => {
    try {
        // Obtener los correos y telefonos
        let phones = await db.query("SELECT * FROM ParteTelefonoP WHERE id_parte = ?", id_parte);
        let emails = await db.query("SELECT * FROM PArteCorreoP WHERE id_parte = ?", id_parte);

        // Eliminar correo y telefonos de las tablas CorroP y TelefonoP
        for (let i = 0; i < phones.length; i++) {
            let phoneDeleted = await this.deleteTelefono(id_parte, phones[i].id_telefono);
        }

        for (let i = 0; i < emails.length; i++) {
            let emailDeleted = await this.deleteCorreo(id_parte, emails[i]. id_correo);
        }

        // Eliminar datos de la parte
        let parteDeleted = await db.query("DELETE FROM Parte WHERE id_parte = ?", id_parte);

        return {
            message: "Eliminado correctamente",
            payload: {},
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}