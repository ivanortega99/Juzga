CREATE DATABASE juzgado;
USE juzgado;

CREATE TABLE TipoUsuario (
	id_tipo_usuario INT NOT NULL AUTO_INCREMENT,
	tipo_usuario VARCHAR(50),

	PRIMARY KEY (id_tipo_usuario)
);

CREATE TABLE Usuario (
  	id_usuario INT NOT NULL AUTO_INCREMENT,
	id_tipo_usuario INT NOT NULL,
    nombre_usuario VARCHAR(100),
	apellidos_usuario VARCHAR(100),
	email VARCHAR(100),
	username VARCHAR(100),
	contrasena VARCHAR(100),

	PRIMARY KEY (id_usuario),
	FOREIGN KEY (id_tipo_usuario) REFERENCES TipoUsuario(id_tipo_usuario)
);

CREATE TABLE Municipio (
	id_municipio INT NOT NULL AUTO_INCREMENT,
	municipio VARCHAR(100),

	PRIMARY KEY (id_municipio)
);

CREATE TABLE Delito (
	id_delito INT NOT NULL AUTO_INCREMENT,
	delito VARCHAR(100),

	PRIMARY KEY (id_delito)
);

CREATE TABLE Imputado (
	id_imputado INT NOT NULL AUTO_INCREMENT,
	id_municipio INT NOT NULL,
	nombre_imputado VARCHAR(100),
	apellidos_imputado VARCHAR(100),
	edad_imputado VARCHAR(100),

	PRIMARY KEY (id_imputado),
	FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio)
);

CREATE TABLE Victima (
	id_victima INT NOT NULL AUTO_INCREMENT,
	id_municipio INT NOT NULL,
	nombre_victima VARCHAR(100),
	apellidos_victima VARCHAR(100),
	edad_victima VARCHAR(100),

	PRIMARY KEY (id_victima),
	FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio)
);

CREATE TABLE Juez (
	id_juez INT NOT NULL AUTO_INCREMENT,
	nombre_juez VARCHAR(100),
	apellidos_juez VARCHAR(100),

	PRIMARY KEY (id_juez)
);

CREATE TABLE Notificador (
	id_notificador INT NOT NULL AUTO_INCREMENT,
	nombre_notificador VARCHAR(100),
	apellidos_notificador VARCHAR(100),

	PRIMARY KEY (id_notificador)
);

CREATE TABLE Notificacion (
	id_notificacion INT NOT NULL AUTO_INCREMENT,
	id_juez INT NOT NULL,
	id_notificador INT NOT NULL,
	nuc_notificacion VARCHAR(100),
	acuerdo_notificacion VARCHAR(100),
	fecha_notificacion VARCHAR(100),
	hora_notificacion VARCHAR(100),
	descripcion_notificacion VARCHAR(100),
	archivo_notificacion VARCHAR(100),
	notificacion_enviada BOOLEAN,
	notificacion_entregada BOOLEAN,

	PRIMARY KEY (id_notificacion),
	FOREIGN KEY (id_juez) REFERENCES Juez(id_juez),
	FOREIGN KEY (id_notificador) REFERENCES Notificador(id_notificador)
);

CREATE TABLE AuxiliarSala (
	id_auxiliar INT NOT NULL AUTO_INCREMENT,
	nombre_auxiliar VARCHAR(100),
	apellidos_auxiliar VARCHAR(100),

	PRIMARY KEY (id_auxiliar)
);

CREATE TABLE EncargadoSala (
	id_encargado INT NOT NULL AUTO_INCREMENT,
	nombre_encargado VARCHAR(100),
	apellidos_encargado VARCHAR(100),

	PRIMARY KEY (id_encargado)
);

CREATE TABLE Sala (
	id_sala INT NOT NULL AUTO_INCREMENT,
	nombre_sala VARCHAR(100),

	PRIMARY KEY (id_sala)
);

CREATE TABLE RegistroSala (
	id_registro_sala INT NOT NULL AUTO_INCREMENT,
	id_sala INT NOT NULL,
	id_encargado INT NOT NULL,
	id_auxiliar INT NOT NULL,
	id_juez INT NOT NULL,

	PRIMARY KEY (id_registro_sala),
	FOREIGN KEY (id_sala) REFERENCES Sala(id_sala),
	FOREIGN KEY (id_encargado) REFERENCES EncargadoSala(id_encargado),
	FOREIGN KEY (id_auxiliar) REFERENCES AuxiliarSala(id_auxiliar),
	FOREIGN KEY (id_juez) REFERENCES Juez(id_juez)
);

CREATE TABLE TipoParte (
	id_tipo_parte INT NOT NULL AUTO_INCREMENT,
	tipo_parte VARCHAR(100),

	PRIMARY KEY (id_tipo_parte)
);

CREATE TABLE Parte (
	id_parte INT NOT NULL AUTO_INCREMENT,
	id_tipo_parte INT NOT NULL,
	nombre_parte VARCHAR(100),

	PRIMARY KEY (id_parte),
	FOREIGN KEY (id_tipo_parte) REFERENCES TipoParte(id_tipo_parte)
);

CREATE TABLE CorreoP (
	id_correo INT NOT NULL AUTO_INCREMENT,
	correo VARCHAR(100),

	PRIMARY KEY (id_correo)
);

CREATE TABLE TelefonoP (
	id_telefono INT NOT NULL AUTO_INCREMENT,
	telefono VARCHAR(100),

	PRIMARY KEY (id_telefono)
);

CREATE TABLE TipoAudiencia (
	id_tipo_audiencia INT NOT NULL AUTO_INCREMENT,
	tipo_audiencia VARCHAR(100),

	PRIMARY KEY (id_tipo_audiencia)
);

CREATE TABLE Carpeta (
	id_carpeta INT NOT NULL AUTO_INCREMENT,
	nuc_carpeta VARCHAR(100),
	tipo_carpeta VARCHAR(100),
	presentacion_carpeta VARCHAR(100),
	fecha_ingreso_carpeta VARCHAR(100),
	fecha_inicio_carpeta VARCHAR(100),
	duracion_carpeta VARCHAR(100),
	judicalizada_carpeta BOOLEAN,
	nuevo_carpeta BOOLEAN,
	archivo_muerto_carpeta BOOLEAN,
	vinculacion_carpeta BOOLEAN,
	rol_carpeta VARCHAR(100),
	oficio_carpeta VARCHAR(100),

	PRIMARY KEY (id_carpeta)
);

CREATE TABLE Minuta (
	id_minuta INT NOT NULL AUTO_INCREMENT,
	id_municipio_delito INT NOT NULL,
	id_registro_sala INT NOT NULL,
	id_parte INT NOT NULL,
	nuc_minuta VARCHAR(100),
	presentacion_minuta VARCHAR(100),
	fecha_ingreso_minuta VARCHAR(100),
	fecha_inicio_minuta VARCHAR(100),
	hora_inicio_minuta VARCHAR(100),
	hora_final_minuta VARCHAR(100),
	duracion_minuta VARCHAR(100),
	resolutivos_minuta VARCHAR(100),
	observaciones_minuta VARCHAR(100),
	desahogo_audiencia BOOLEAN,

	PRIMARY KEY (id_minuta),
	FOREIGN KEY (id_municipio_delito) REFERENCES Municipio(id_municipio),
	FOREIGN KEY (id_registro_sala) REFERENCES RegistroSala(id_registro_sala),
	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte)
);

-- Relacion
CREATE TABLE ImputadoDelito (
	id_imputado INT NOT NULL,
	id_delito INT NOT NULL,

	FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado),
	FOREIGN KEY (id_delito) REFERENCES Delito(id_delito)
);

-- Relacion
CREATE TABLE MinutaImputado (
	id_minuta INT NOT NULL,
	id_imputado INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta),
	FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado)
);

-- Relacion
CREATE TABLE MinutaVictima (
	id_minuta INT NOT NULL,
	id_victima INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta),
	FOREIGN KEY (id_victima) REFERENCES Victima(id_victima)
);

-- Relacion
CREATE TABLE ParteCorreoP (
	id_parte INT NOT NULL,
	id_correo INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte),
	FOREIGN KEY (id_correo) REFERENCES CorreoP(id_correo)
);

-- Relacion
CREATE TABLE ParteTelefonoP (
	id_parte INT NOT NULL,
	id_telefono INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte),
	FOREIGN KEY (id_telefono) REFERENCES TelefonoP(id_telefono)
);

-- Relacion
CREATE TABLE VictimaParte (
	id_parte INT NOT NULL,
	id_victima INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte),
	FOREIGN KEY (id_victima) REFERENCES Victima(id_victima)
);

-- Relacion
CREATE TABLE ImputadoParte (
	id_parte INT NOT NULL,
	id_imputado INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte),
	FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado)
);

-- Relacion
CREATE TABLE MinutaTipoAudiencia (
	id_minuta INT NOT NULL,
	id_tipo_audiencia INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta),
	FOREIGN KEY (id_tipo_audiencia) REFERENCES TipoAudiencia(id_tipo_audiencia)
);

-- Relacion
CREATE TABLE CarpetaDelito (
	id_carpeta INT NOT NULL,
	id_delito INT NOT NULL,

	FOREIGN KEY (id_carpeta) REFERENCES Carpeta(id_carpeta),
	FOREIGN KEY (id_delito) REFERENCES Delito(id_delito)
);

-- Relacion
CREATE TABLE CarpetaTipoAudiencia (
	id_carpeta INT NOT NULL,
	id_tipo_audiencia INT NOT NULL,

	FOREIGN KEY (id_carpeta) REFERENCES Carpeta(id_carpeta),
	FOREIGN KEY (id_tipo_audiencia) REFERENCES TipoAudiencia(id_tipo_audiencia)
);

INSERT INTO TipoUsuario (tipo_usuario) VALUES ('Administrador');
INSERT INTO TipoUsuario (tipo_usuario) VALUES ('Editor');
INSERT INTO TipoUsuario (tipo_usuario) VALUES ('Notificador');

INSERT INTO TipoParte (tipo_parte) VALUES ('Defensor');
INSERT INTO TipoParte (tipo_parte) VALUES ('Asesor juridico');
INSERT INTO TipoParte (tipo_parte) VALUES ('Ministerio publico');

INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (1, "RIGOBERTO GUZMAN OCHO");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (1, "AGUSTÍN ALONSO LOPEZ CANTERO");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (1, "FELIPE ARIAS DE LA TORRE");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (1, "MANUEL ALEJANDRO ZUÑIGA LARIOS");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (1, "GERMAN IBARRA DE LA CRUZ");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (1, "ALEXIS MARTÍN CASTILLO CHÁVEZ");

INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (2, "ORLANDO TOMAS CHÁVEZ TORRES");

INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "ANEL NAYELI VAZQUEZ FAJARDO");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "MARIBEL DÍAZ MARTÍNEZ");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "ALEJANDRO GILDO ALCANTAR");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "PATRICIA NATALY VALENCIA");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "LOURDES MONTOYA PULIDO");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "IVONNE MOYA RIVERA");
INSERT INTO Parte (id_tipo_parte, nombre_parte) VALUES (3, "MÓNICA GUADALUPE CHÁVEZ VARGAS");

INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("ACUMULACIÓN DE CAUSAS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("ADMISIÓN DE ACCIÓN PRIVADA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AJUSTES AL PROCEDIMIENTO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AJUSTES RAZONABLES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AMPLIACIÓN PARA EL TERMINO DE INVESTIGACIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("APERTURA DE CONTROVERSIA DE MODIFICACION DE LA SANCION PRIVATIVA DE LA LIBERTAD");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("APERTURA DE PROCEDIMIENTO ESPECIAL DE INIMPUTABILIDAD");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("APROBACIÓN DE ACUERDO REPARATORIO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("ASUNCION DE LA COMPETENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AUTO DE APERTURA A JUICIO ORAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AUTORIZACIÓN DE ACTOS DE INVESTIGACIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AUTORIZACIÓN DE EXHUMACIÓN DE CADAVER");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AUTORIZACIÓN JUDICIAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("AUTORIZACIÓN JUDICIAL DE TOMA DE FLUIDOS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONMUTACION DE LA PENA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTINUACIÓN AUDIENCIA INICIAL (CUMPLIMENTACIÓN DE ORDEN DE APREHENSIÓN)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTINUACIÓN AUDIENCIA INICIAL (FORMULACIÓN DE IMPUTACIÓN)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTINUACIÓN DE AUDIENCIA A JUICIO ORAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTINUACIÓN DE ETAPA INTERMEDIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTINUACIÓN DE INDIVIDUALIZACIÓN DE SANCIONES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTROL DE DETENCIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTROL DE GARANTÍAS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONTROL JUDICIAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("CONVALIDACION DE ACTUACIONES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("DEBATE DE ADMISIÓN DE MEDIOS DE PRUEBA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("DEBATE DE PLAZO DE INVESTIGACION COMPLEMENTARIA (PUBLICA)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("DECLARACIÓN DE SUSTRACCIÓN DE LA ACCIÓN DE LA JUSTICIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("DECLARACIÓN DEL IMPUTADO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("DESAHOGO DE PRUEBA ANTICIPADA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("DETERMINACIÓN DE COMPETENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("EJECUCIÓN DE SANCIONES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("ESCRITO, PRESENTACIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("ESCUCHAR A LAS PARTES RESPECTO DE LA APROBACIÓN DE ACUERDO REPARATORIO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("EXHORTO, CUMPLIMIENTO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("EXTINCION PENAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("FORMULACIÓN DE IMPUTACIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("FORMULACIÓN DE IMPUTACIÓN (APREHENSIÓN)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("FORMULACIÓN DE IMPUTACIÓN (COMPARECENCIA)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("FORMULACIÓN DE IMPUTACIÓN (APELACION)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("IMPOSICIÓN DE MEDIDA CAUTELAR");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("IMPOSICIÓN DE MEDIDA CAUTELAR (APREHENSION)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("IMPUGNACIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("IMPUGNACIÓN, CONTINUACION");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INCOMPETENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INCOMPETENCIA, ESCRITO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INCONFORMIDAD DE ARCHIVO TEMPORAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INDIVIDUALIZACIÓN DE SANCIONES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INICIAL (CUMPLIMIENTO ORDEN DE APREHENSIÓN)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INICIAL (CUMPLIMIENTO ORDEN DE COMPARECENCIA)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INTERMEDIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("INTERMEDIA (CUMPLIMIENTO APREHENSION)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("JUICIO ORAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("LECTURA DE SENTENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("LEGALIDAD DE LA DETERMINACIÓN ADMINISTRATIVA DE TRASLADO DE LOS IMPUTADOS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("LIBERTAD CONDICIONADA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("MEDIDA PROVISIONAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("MODIFICACIÓN DE MEDIDA CAUTELAR");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("MODIFICACIÓN DE MEDIDAS DE PROTECCIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("NULIDAD DE ACTUACIONES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("NULIDAD DATOS DE PRUEBA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("ORDEN DE CATEO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PARA DECLARAR LA INCOMPETENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PERDON LEGAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PLAZO DE CIERRE DE INVESTIGACION COMPLEMENTARIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PROCEDIMIENTO ABREVIADO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PRORROGA DE CIERRE DE INVESTIGACIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PRÓRROGA DE MEDIDAS DE PROTECCIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PRÓRROGA DE PLAZO DE MEDIDA CAUTELAR");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PRORROGA PARA EL PLAZO DE INVESTIGACIÓN COMPLEMENTARIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PRORROGA PARA EL PLAZO DE INVESTIGACIÓN COMPLEMENTARIA (no se aprueba)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("PROVIDENCIA PRECAUTORIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RATIFICACIÓN DE ACUERDOS REPARATORIOS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RATIFICACIÓN DE FIRMA A CARGO DEL IMPUTADO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RATIFICACIÓN DE INGRESO A LUGAR CERRADO (PRIVADA)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RATIFICACION DE LA SUBSISTENCIA DE LOS DATOS CONSERVADOS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RATIFICACIÓN DE MEDIDAS DE PROTECCIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RATIFICAR CONSENTIMIENTO DE INGRESO A LUGAR CERRADO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REANUDACIÓN DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REANUDACIÓN DE LA SUSPENSIÓN DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REANUDACIÓN DEL PROCESO POR ORDEN DE APREHENSIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REAPERTURA DE INVESTIGACION COMPLEMENTARIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REAPERTURA DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RECURSO DE INCUMPLIMIENTO EN CONTRA DE LA DETERMINACIÓN DE ARCHIVO TEMPORAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RECURSO DE REVOCACION PLANTEADOS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RECLASIFICACION DEL DELITO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("RELATIVA A LA IMPUGNACIÓN PLANTEADA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REPOSICIÓN DEL PROCEDIMIENTO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE ACUERDOS REPARATORIOS");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE CONDICIONES DE SUSPENSIÓN DE PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE CUMPLIMIENTO DE CONDICIONANTES DERIVADAS DE LA SUSPENSIÓN CONDICIONAL DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE LA SUSPENSIÓN CONDICIONAL DE LA PENA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE LAS CONDICIONES Y OBLIGACIONES DE LA SUSPENSIÓN CONDICIONAL DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE LAS CONDICIONES Y OBLIGACIONES IMPUESTAS DE LA SUSPENSIÓN CONDICIONAL DEL PROCESO (CUMPLIMIENTO ORDEN DE APREHENSIÓN)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE MEDIDAS CAUTELARES");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE MEDIDAS CAUTELARES (CUMPLIMIENTO DE ORDEN DE APREHENSIÓN)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVISIÓN DE MEDIDAS DE PROTECCIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVOCACIÓN DE LA SUSPENSIÓN CONDICIONAL DE LA PENA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("REVOCACIÓN DE LA SUSPENSIÓN CONDICIONAL DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SIN AUDIENCIA (OTROS)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOBRESEIMIENTO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOBRESEIMIENTO (A. reparatorio)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOBRESEIMIENTO (fallecimiento)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOBRESEIMIENTO (continua la causa)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOBRESEIMIENTO (Susp cond proceso)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOBRESEIMIENTO parcial");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOLICITUD DE ORDEN COMPARECENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOLICITUD DE ORDEN COMPARECENCIA EN AUDIENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOLICITUD DE ORDEN DE APREHENSIÓN EN AUDIENCIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOLICITUD DE ORDEN DE APREHENSIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SOLICITUD DE TRASLADO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSPENSIÓN CONDICIONAL DE LA PENA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSPENSIÓN CONDICIONAL DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSPENSIÓN CONDICIONAL DEL PROCESO (aprehension)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSPENSIÓN DE LA ACCIÓN PENAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSPENSIÓN DEL PRECESO ACUERDO REPARATORIO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSPENSIÓN DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSTITUCIÓN DE LA PENA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSTRACCIÓN A LA ACCIÓN DE LA JUSTICIA");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("SUSTRACCIÓN A LA ACCIÓN DE LA JUSTICIA Y ORDEN DE APREHENSIÓN");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VERIFICACION DE CUMPLIMIENTO DE ACUERDO REPARATORIO EN CUMPLIMIENTO DE ORDEN DE APREHENSION");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VERIFICACION DE CEDULA PROFESIONAL");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VERIFICACIÓN DE CUMPLIMIENTO DE SUSPENSIÓN CONDICIONAL DEL PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VERIFICACIÓN Y APROBACIÓN DE ACUERDO REPARATORIO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VINCULACIÓN A PROCESO");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VINCULACIÓN A PROCESO (CUMPLIMENTACION DE ORDEN DE APREHENSION)");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("VIGENCIA ORDEN DE APREHENSION");
INSERT INTO TipoAudiencia (tipo_audiencia) VALUES ("?");

INSERT INTO Sala (nombre_sala) VALUES ("1");
INSERT INTO Sala (nombre_sala) VALUES ("2");
INSERT INTO Sala (nombre_sala) VALUES ("ZOOM");
INSERT INTO Sala (nombre_sala) VALUES ("TELMEX");

INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ("IVÁN",  "GÓMEZ VEGA");
INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ("ENRIQUE", "ESPINOZA NIÑO");
INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ("LOURDES ANGÉLICA", "DELGADO ALVÁREZ");

INSERT INTO EncargadoSala (nombre_encargado, apellidos_encargado) VALUES ("ILDA ALEJANDRA", "GUERRERO MARTINEZ");
INSERT INTO EncargadoSala (nombre_encargado, apellidos_encargado) VALUES ("OSCAR", "MURGUIA TORRES"); 

INSERT INTO AuxiliarSala (nombre_auxiliar, apellidos_auxiliar) VALUES ("VIRIDIANA", "ROMERO BARAJAS");
INSERT INTO AuxiliarSala (nombre_auxiliar, apellidos_auxiliar) VALUES ("COLUMBA MONTSERRAT", "LUIS JUAN LÓPEZ");
INSERT INTO AuxiliarSala (nombre_auxiliar, apellidos_auxiliar) VALUES ("JOSE ANTONIO", "FLORES LUNA");
INSERT INTO AuxiliarSala (nombre_auxiliar, apellidos_auxiliar) VALUES ("DANIEL", "URIBE ZABALZA");

INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ("MARIELA YOHANA", "LIZAOLA HERNANDEZ");
INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ("MARIA", "DEL ROSARIO");
INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ("MOISES", "GARCIA CARRIÓN");

INSERT INTO Usuario (id_tipo_usuario, nombre_usuario, apellidos_usuario, email, username, contrasena) VALUES (1, 'Luis David', 'Ceja Luna', 'ceja.luna.luis.david@gmail.com', 'LunaMan', '$2a$10$.is35Ed4xnPkhy52rvD6D.kg9te2Q1MvH992aNMIdgqQdcHwyBQaW');

INSERT INTO Delito (delito) VALUES ('Robo');
INSERT INTO Delito (delito) VALUES ('Asesinato');
INSERT INTO Delito (delito) VALUES ('Roba a mano armada');
INSERT INTO Delito (delito) VALUES ('Robo1');
INSERT INTO Delito (delito) VALUES ('Robo2');
INSERT INTO Delito (delito) VALUES ('Robo3');

INSERT INTO Municipio (municipio) VALUES ('Acatic'),
('Acatlán de Juárez'),
('Ahualulco de Mercado'),
('Amacueca'),
('Amatitán'),
('Ameca'),
('Arandas'),
('Atemajac de Brizuela'),
('Atengo'),
('Atenguillo'),
('Atotonilco el Alto'),
('Atoyac'),
('Autlán de Navarro'),
('Ayotlán'),
('Ayutla'),
('Bolaños'),
('Cabo Corrientes'),
('Cañadas de Obregón'),
('Casimiro Castillo'),
('Chapala'),
('Chimaltitán'),
('Chiquilistlán'),
('Cihuatlán'),
('Cocula'),
('Colotlán'),
('Concepción de Buenos Aires'),
('Cuautitlán de García Barragán'),
('Cuautla'),
('Cuquío'),
('Degollado'),
('Ejutla'),
('El Arenal'),
('El Grullo'),
('El Limón'),
('El Salto'),
('Encarnación de Díaz'),
('Etzatlán'),
('Gómez Farías'),
('Guachinango'),
('Guadalajara'),
('Hostotipaquillo'),
('Huejúcar'),
('Huejuquilla el Alto'),
('Ixtlahuacán de los Membrillos'),
('Ixtlahuacán del Río'),
('Jalostotitlán'),
('Jamay'),
('Jesús María'),
('Jilotlán de los Dolores'),
('Jocotepec'),
('Juanacatlán'),
('Juchitlán'),
('La Barca'),
('La Huerta'),
('La Manzanilla de la Paz'),
('Lagos de Moreno'),
('Magdalena'),
('Mascota'),
('Mazamitla'),
('Mexticacán'),
('Mezquitic'),
('Mixtlán'),
('Ocotlán'),
('Ojuelos de Jalisco'),
('Pihuamo'),
('Poncitlán'),
('Puerto Vallarta'),
('Quitupan'),
('San Cristóbal de la Barranca'),
('San Diego de Alejandría'),
('San Gabriel'),
('San Ignacio Cerro Gordo'),
('San Juan de los Lagos'),
('San Juanito de Escobedo'),
('San Julián'),
('San Marcos'),
('San Martín de Bolaños'),
('San Martín Hidalgo'),
('San Miguel el Alto'),
('San Pedro Tlaquepaque'),
('San Sebastián del Oeste'),
('Santa María de los Ángeles'),
('Santa María del Oro'),
('Sayula'),
('Tala'),
('Talpa de Allende'),
('Tamazula de Gordiano'),
('Tapalpa'),
('Tecalitlán'),
('Techaluta de Montenegro'),
('Tecolotlán'),
('Tenamaxtlán'),
('Teocaltiche'),
('Teocuitatlán de Corona'),
('Tepatitlán de Morelos'),
('Tequila'),
('Teuchitlán'),
('Tizapán el Alto'),
('Tlajomulco de Zúñiga'),
('Tolimán'),
('Tomatlán'),
('Tonalá'),
('Tonaya'),
('Tonila'),
('Totatiche'),
('Tototlán'),
('Tuxcacuesco'),
('Tuxcueca'),
('Tuxpan'),
('Unión de San Antonio'),
('Unión de Tula'),
('Valle de Guadalupe'),
('Valle de Juárez'),
('Villa Corona'),
('Villa Guerrero'),
('Villa Hidalgo'),
('Villa Purificación'),
('Yahualica de González Gallo'),
('Zacoalco de Torres'),
('Zapopan'),
('Zapotiltic'),
('Zapotitlán de Vadillo'),
('Zapotlán del Rey'),
('Zapotlán el Grande'),
('Zapotlanejo');

-- Datos necesarios para crear una minuta (ministerio publico, defensores, asesores, jueces, salas, encargados, auxiliares, delitos)
SELECT id_parte, nombre_parte FROM Parte WHERE id_tipo_parte = 3;
SELECT id_parte, nombre_parte FROM Parte WHERE id_tipo_parte = 1;
SELECT id_parte, nombre_parte FROM Parte WHERE id_tipo_parte = 2;
SELECT * FROM Juez;
SELECT * FROM Sala;
SELECT * FROM EncargadoSala;
SELECT * FROM AuxiliarSala;
SELECT * FROM Delito;

-- Partes
SELECT id_parte, parte.id_tipo_parte, nombre_parte, tipo_parte FROM parte INNER JOIN tipoparte ON parte.id_tipo_parte = tipoparte.id_tipo_parte;
SELECT CorreoP.id_correo, correo FROM CorreoP INNER JOIN ParteCorreoP ON CorreoP.id_correo = ParteCorreoP.id_correo WHERE id_parte = 1;
SELECT TelefonoP.id_telefono, telefono FROM TelefonoP INNER JOIN ParteTelefonoP ON TelefonoP.id_telefono = ParteTelefonoP.id_telefono WHERE id_parte = 1;

-- ------------------------------------------------------------------------------------
-- Para crear un minuta, primero se tienen que agregar los delitos nuevos si es que hay
INSERT INTO Delito (delito) VALUES (?);

-- Después se tiene que agregar los datos del imputado y de la victima
INSERT INTO Imputado (id_municipio, nombre_imputado, apellidos_imputado, edad_imputado) VALUES (?, ?, ?, ?);
INSERT INTO Victima (id_municipio, nombre_victima, apellidos_victima, edad_victima) VALUES (?, ?, ?, ?);

-- Con los ids obtenidos de las consultas anteriores agregan datos a las tablas: ImputadoDelito, MinutaImputado, ImputadoParte, MinutaVictima, VictimaParte
INSERT INTO ImputadoDelito (id_imputado, id_delito) VALUES (?, ?);
INSERT INTO ImputadoParte (id_parte, id_imputado) VALUES (?, ?);
INSERT INTO VictimaParte (id_parte, id_victima) VALUES (?, ?);

-- Agregamos el registro de la sala
INSERT INTO RegistroSala (id_sala, id_encargado, id_auxiliar, id_juez) VALUES (?, ?, ?, ?);

-- Agregamos los datos de la minuta
INSERT INTO Minuta (id_municipio_delito, id_registro_sala, id_parte, nuc_minuta, presentacion_minuta, fecha_ingreso_minuta, fecha_inicio_minuta, hora_inicio_minuta, hora_final_minuta, duracion_minuta, resolutivos_minuta, observaciones_minuta, desahogo_audiencia)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- Estas van despues de crear la minuta
INSERT INTO MinutaImputado (id_minuta, id_imputado) VALUES (?, ?);
INSERT INTO MinutaVictima (id_minuta, id_victima) VALUES (?, ?);

-- ------------------------------------------------------------------------------------
-- Crear carpetas
INSERT INTO Carpeta (nuc_carpeta, tipo_carpeta, presentacion_carpeta, fecha_ingreso_carpeta, fecha_inicio_carpeta, duracion_carpeta, judicalizada_carpeta, nuevo_carpeta, archivo_muerto_carpeta, vinculacion_carpeta, rol_carpeta, oficio_carpeta) VALUES ('123', '123', '123', now(), now(), '123', 0, 0, 1, 1, '123', '123');
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (1, 2);
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (1, 3);
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (1, 4);
INSERT INTO Carpeta (nuc_carpeta, tipo_carpeta, presentacion_carpeta, fecha_ingreso_carpeta, fecha_inicio_carpeta, duracion_carpeta, judicalizada_carpeta, nuevo_carpeta, archivo_muerto_carpeta, vinculacion_carpeta, rol_carpeta, oficio_carpeta) VALUES ('456', '456', '456', now(), now(), '456', 0, 0, 1, 1, '456', '456');
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (2, 5);
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (2, 6);


INSERT INTO Notificacion (id_juez, id_notificador, nuc_notificacion, acuerdo, fecha, descripcion, archivo) VALUES (1, 2, '123', 'acuerdo', now(), '123', '123');
INSERT INTO Notificacion (id_juez, id_notificador, nuc_notificacion, acuerdo, fecha, descripcion, archivo) VALUES (2, 1, '456', 'acuerdo', now(), '456', '456');
-- ------------------------------------------------------------------------------------

ALTER TABLE Carpeta MODIFY fecha_ingreso_carpeta VARCHAR(100);
ALTER TABLE Carpeta MODIFY fecha_inicio_carpeta VARCHAR(100);

ALTER TABLE Minuta MODIFY fecha_ingreso_minuta VARCHAR(100);
ALTER TABLE Minuta MODIFY fecha_inicio_minuta VARCHAR(100);
ALTER TABLE Minuta MODIFY hora_inicio_minuta VARCHAR(100);
ALTER TABLE Minuta MODIFY hora_final_minuta VARCHAR(100);