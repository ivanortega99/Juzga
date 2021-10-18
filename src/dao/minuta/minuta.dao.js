const db = require('../../config/db');

// Obtener todas las minutas
exports.getMinutas = async () => {
    try {
        let minutas = await db.query("SELECT * FROM Minuta");

        return {
            message: "Minutas obtenidas",
            payload: minutas,
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Obtener una minuta
exports.getMinuta = async (id_minuta) => {
    try {
        let queryMinuta = "SELECT Minuta.id_minuta, Minuta.id_municipio_delito, id_registro_sala, municipio, nuc_minuta, presentacion_minuta, fecha_ingreso_minuta, fecha_inicio_minuta, hora_inicio_minuta, hora_final_minuta, duracion_minuta, resolutivos_minuta, observaciones_minuta, desahogo_audiencia " +
            "FROM Minuta INNER JOIN Municipio " +
            "ON Minuta.id_municipio_delito = Municipio.id_municipio " +
            "WHERE id_minuta = ?";
        let queryImputados = "SELECT Imputado.id_imputado, nombre_imputado, apellidos_imputado, edad_imputado, Imputado.id_municipio, municipio " +
            "FROM MinutaImputado INNER JOIN Imputado INNER JOIN Municipio " +
            "ON MinutaImputado.id_minuta = ? " +
            "AND MinutaImputado.id_imputado = Imputado.id_imputado " +
            "AND Imputado.id_municipio = Municipio.id_municipio";
        let queryVictimas = "SELECT Victima.id_victima, nombre_victima, apellidos_victima, edad_victima, Victima.id_municipio, municipio " +
            "FROM MinutaVictima INNER JOIN Victima INNER JOIN Municipio " +
            "ON MinutaVictima.id_minuta = ? " +
            "AND MinutaVictima.id_victima = Victima.id_victima " +
            "AND Victima.id_municipio = Municipio.id_municipio";
        let querySala = "SELECT Sala.id_sala, nombre_sala, Juez.id_juez, nombre_juez, apellidos_juez, EncargadoSala.id_encargado, nombre_encargado, apellidos_encargado, AuxiliarSala.id_auxiliar, nombre_auxiliar, apellidos_auxiliar " +
            "FROM RegistroSala INNER JOIN Sala INNER JOIN Juez INNER JOIN AuxiliarSala INNER JOIN EncargadoSala " +
            "ON RegistroSala.id_sala = Sala.id_sala " +
            "AND RegistroSala.id_encargado = EncargadoSala.id_encargado " +
            "AND RegistroSala.id_auxiliar = AuxiliarSala.id_auxiliar " +
            "AND RegistroSala.id_juez = Juez.id_juez " +
            "WHERE RegistroSala.id_registro_sala = ?";

        let minuta = await db.query(queryMinuta, id_minuta);
        let imputados = await db.query(queryImputados, id_minuta);
        let victimas = await db.query(queryVictimas, id_minuta);
        let sala = await db.query(querySala, minuta[0].id_registro_sala);

        minuta[0].imputados = imputados;
        minuta[0].victimas = victimas;
        minuta[0].salaInfo = sala;

        return {
            message: "Minuta obtenida!",
            payload: minuta[0],
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}

// Crear una minuta
exports.createMinuta = async (dataMinuta) => {
    try {
        // Agregar delitos nuevos
        if (dataMinuta.delitos.length > 0) {
            let newDelitos = dataMinuta.delitos;
            for (let i = 0; i < newDelitos.length; i++) {
                if (!newDelitos[i].id_delito) {
                    let delitoAdded = await db.query("INSERT INTO Delito (delito) VALUES (?)", newDelitos[i].delito);
                    newDelitos[i].id_delito = delitoAdded.insertId;
                }
            }
            dataMinuta.delitos = newDelitos
        }
        
        // Agregar datos de imputado y la victima
        let imputados = [];
        for (let i = 0; i < dataMinuta.imputados.length; i++) {
            let imputadoCreated = await db.query("INSERT INTO Imputado (id_municipio, nombre_imputado, apellidos_imputado, edad_imputado) VALUES (?, ?, ?, ?)", [
                dataMinuta.imputados[i].id_municipio_imputado,
                dataMinuta.imputados[i].nombre_imputado,
                dataMinuta.imputados[i].apellido_paterno_imputado + " " + dataMinuta.imputados[i].apellido_materno_imputado,
                dataMinuta.imputados[i].edad_imputado
            ]);

            imputados.push(imputadoCreated.insertId);
        }

        console.log('imputados: ', imputados);

        let victimas = [];
        for (let i = 0; i < dataMinuta.victimas.length; i++) {
            let victimaCreated = await db.query("INSERT INTO Victima (id_municipio, nombre_victima, apellidos_victima, edad_victima) VALUES (?, ?, ?, ?)", [
                dataMinuta.victimas[i].id_municipio_victima,
                dataMinuta.victimas[i].nombre_victima,
                dataMinuta.victimas[i].apellido_paterno_victima + " " + dataMinuta.victimas[i].apellido_materno_victima,
                dataMinuta.victimas[i].edad_victima
            ]);

            victimas.push(victimaCreated.insertId)
        }

        console.log('victimas: ', victimas);

        // Insertar en las relaciones los datos correspondientes
        // Todos los imputados con todos los delitos y todos los imputados con todos los defensores
        for (let i = 0; i < imputados.length; i++) {
            for (let j = 0; j < dataMinuta.delitos.length; j++) {
                let inputadoDelito = await db.query("INSERT INTO ImputadoDelito (id_imputado, id_delito) VALUES (?, ?)", [
                    imputados[i],
                    dataMinuta.delitos[j].id_delito
                ]);
            }

            for (let j = 0; j < dataMinuta.id_defensor.length; j++) {
                let imputadoParte = await db.query("INSERT INTO ImputadoParte (id_parte, id_imputado) VALUES (?, ?)", [
                    dataMinuta.id_defensor[j],
                    imputados[i]
                ]);
            }
        }
        
        // Todas las victimas con todas las partes
        for (let i = 0; i < victimas.length; i++) {
            for (let j = 0; j < dataMinuta.id_asesor.length; j++) {
                let victimaParte = await db.query("INSERT INTO VictimaParte (id_parte, id_victima) VALUES (?, ?)", [
                    dataMinuta.id_asesor[j],
                    victimas[i]
                ]);
            }
        }

        // Agregamos el registro de la sala
        let salaRegistro = await db.query("INSERT INTO RegistroSala (id_sala, id_encargado, id_auxiliar, id_juez) VALUES (?, ?, ?, ?)", [
            dataMinuta.id_sala,
            dataMinuta.id_encargado,
            dataMinuta.id_auxiliar,
            dataMinuta.id_juez
        ]);
        
        // Agregamos datos de la minuta
        let queryMinuta = "INSERT INTO Minuta (id_municipio_delito, id_registro_sala, id_parte, nuc_minuta, presentacion_minuta, fecha_ingreso_minuta, fecha_inicio_minuta, hora_inicio_minuta, hora_final_minuta, duracion_minuta, resolutivos_minuta, observaciones_minuta, desahogo_audiencia) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        let minutaAdded = await db.query(queryMinuta, [
            dataMinuta.id_municipio_delito,
            salaRegistro.insertId,
            dataMinuta.id_ministerio,
            dataMinuta.nuc_minuta,
            dataMinuta.presentacion_minuta,
            dataMinuta.fecha_ingreso_minuta,
            dataMinuta.fecha_inicio_minuta,
            dataMinuta.hora_ingreso_minuta,
            dataMinuta.hora_final_minuta,
            dataMinuta.duracion,
            dataMinuta.resolutivos,
            dataMinuta.observaciones,
            dataMinuta.desahogo_audiencia
        ]);

        // Agregar el tipo de audiencia
        for (let i = 0; i < dataMinuta.tipo_minuta.length; i++) {
            let tipoAudiencia = await db.query("INSERT INTO MinutaTipoAudiencia (id_minuta, id_tipo_audiencia) VALUES (?, ?)", [
                minutaAdded.insertId,
                dataMinuta.tipo_minuta[i]
            ]);
        }
        
        // Agregar relación de las victimas con la minuta
        for (let i = 0; i < victimas.length; i++) {
            let minutaVictima = await db.query("INSERT INTO MinutaVictima (id_minuta, id_victima) VALUES (?, ?)", [
                minutaAdded.insertId,
                victimas[i]
            ]);
        }

        // Agregar relación de los imputados con la minuta
        for (let i = 0; i < imputados.length; i++) {
            let minutaImpuado = await db.query("INSERT INTO MinutaImputado (id_minuta, id_imputado) VALUES (?, ?)", [
                minutaAdded.insertId,
                imputados[i]
            ]);
        }
        
        return {
            message: "Minuta added",
            payload: { id_inserted: minutaAdded.insertId },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Actualizar minuta
exports.updateMinuta = async (id_minuta, dataToUpdate) => {
    try {
        let query = "UPDATE Minuta SET nuc_minuta = ?, presentacion_minuta = ?, duracion_minuta = ?, resolutivos_minuta = ?, observaciones_minuta = ? WHERE id_minuta = ?";
        let minutaUpdated = db.query(query, [
            dataToUpdate.nuc_minuta,
            dataToUpdate.presentacion_minuta,
            dataToUpdate.duracion_minuta,
            dataToUpdate.resolutivos_minuta,
            dataToUpdate.observaciones_minuta,
            id_minuta
        ]);

        return {
            message: "Minuta actualizada!",
            payload: { id_minuta },
            code: 201
        }
    } catch (err) {
        console.log(err);
    }
}

// Eliminar minuta
exports.deleteMinuta = async (id_minuta) => {
    try {
        let imputados = await db.query("SELECT * FROM MinutaImputado WHERE id_minuta = ?", id_minuta);
        let victimas = await db.query("SELECT * FROM MinutaVictima WHERE id_minuta = ?", id_minuta);
        let minuta = await db.query("SELECT id_registro_sala FROM Minuta WHERE id_minuta = ?", id_minuta);
        
        // Eliminar relacion de delitos
        // Eliminar imputados y victimas
        for (let i = 0; i < imputados.length; i++) {
            let relationDelitos = await db.query("DELETE FROM ImputadoDelito WHERE id_imputado = ?", imputados[i].id_imputado);
            let relationParte = await db.query("DELETE FROM ImputadoParte WHERE id_imputado = ?", imputados[i].id_imputado);
            let relationMinuta = await db.query("DELETE FROM MinutaImputado WHERE id_imputado = ?", imputados[i].id_imputado);
            let deleted = await db.query("DELETE FROM Imputado WHERE id_imputado = ?", imputados[i].id_imputado);
        }

        for (let i = 0; i < victimas.length; i++) {
            let relationParte = await db.query("DELETE FROM VictimaParte WHERE id_victima = ?", victimas[i].id_victima);
            let relationMinuta = await db.query("DELETE FROM MinutaVictima WHERE id_victima = ?", victimas[i].id_victima);
            let deleted = await db.query("DELETE FROM Victima WHERE id_victima = ?", victimas[i].id_victima)
        }
        
        // Eliminar de MinutaTipoAudiencia
        let relationDeleted = db.query("DELETE FROM MinutaTipoAudiencia WHERE id_minuta = ?", id_minuta);

        // Eliminar Minuta
        let minutaDeleted = await db.query("DELETE FROM Minuta WHERE id_minuta = ?", id_minuta);
        
        // Eliminar el RegistroSala
        let registroDeleted = await db.query("DELETE FROM RegistroSala WHERE id_registro_sala = ?", minuta[0].id_registro_sala);

        return {
            message: "Minuta eliminada",
            payload: {},
            code: 200
        }
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
        let municipios = await db.query("SELECT * FROM Municipio");

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
                delitos: delitos,
                municipios: municipios
            },
            code: 200
        }
    } catch (err) {
        console.log(err);
    }
}