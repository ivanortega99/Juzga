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

        let victimas = [];
        for (let i = 0; i < dataMinuta.victimas.length; i++) {
            let victimaCreated = await db.query("INSERT INTO Victima (id_municipio, nombre_victima, apellidos_victima, edad_victima) VALUES (?, ?, ?, ?)", [
                dataMinuta.id_municipio_victima,
                dataMinuta.nombre_victima,
                dataMinuta.apellido_paterno_victima + " " + dataMinuta.apellido_materno_victima,
                dataMinuta.edad_victima
            ]);

            victimas.push(victimaCreated.insertId)
        }

        // let id_imputado = imputadoCreated.insertId;
        // let id_victima = victimaCreated.insertId;

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
            dataMinuta.presentacion,
            dataMinuta.fecha_ingreso,
            dataMinuta.fecha_inicio,
            dataMinuta.hora_inicio,
            dataMinuta.hora_final,
            dataMinuta.duracion,
            dataMinuta.resolutivos,
            dataMinuta.observaciones,
            dataMinuta.desahogo_audiencia
        ]);
        
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
                minutaAdded.inserId,
                imputados[i]
            ]);
        }
        
        return {
            message: "Minuta added",
            payload: { id_inserted: minutaAdded.inserId },
            code: 201
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