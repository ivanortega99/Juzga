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
	FOREIGN KEY (id_tipo_usuario) REFERENCES TipoUsuario(id_tipo_usuario) ON UPDATE CASCADE ON DELETE CASCADE
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
	edad VARCHAR(100),

	PRIMARY KEY (id_imputado),
	FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Victima (
	id_victima INT NOT NULL AUTO_INCREMENT,
	nombre_victima VARCHAR(100),
	apellidos_victima VARCHAR(100),
	edad VARCHAR(100),

	PRIMARY KEY (id_victima)
);

CREATE TABLE MinisterioPublico (
	id_ministerio INT NOT NULL AUTO_INCREMENT,
	nombre_ministerio VARCHAR(100),

	PRIMARY KEY (id_ministerio)
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

CREATE TABLE Notificaciones (
	id_notificacion INT NOT NULL AUTO_INCREMENT,
	id_juez INT NOT NULL,
	nuc_notificacion VARCHAR(100),
	acuerdo VARCHAR(100),
	fecha DATE,
	descripcion VARCHAR(100),
	archivo VARCHAR(100),

	PRIMARY KEY (id_notificacion),
	FOREIGN KEY (id_juez) REFERENCES Juez(id_juez) ON UPDATE CASCADE ON DELETE CASCADE
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
	FOREIGN KEY (id_sala) REFERENCES Sala(id_sala) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_encargado) REFERENCES EncargadoSala(id_encargado) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_auxiliar) REFERENCES AuxiliarSala(id_auxiliar) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_juez) REFERENCES Juez(id_juez) ON UPDATE CASCADE ON DELETE CASCADE
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
	FOREIGN KEY (id_tipo_parte) REFERENCES TipoParte(id_tipo_parte) ON UPDATE CASCADE ON DELETE CASCADE
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
	presentacion VARCHAR(100),
	fecha_ingreso DATE,
	fecha_inicio DATE,
	duracion VARCHAR(100),
	judicalizada BOOLEAN,
	nuevo BOOLEAN,
	archivo_muerto BOOLEAN,
	vinculacion BOOLEAN,
	rol VARCHAR(100),
	oficio VARCHAR(100),

	PRIMARY KEY (id_carpeta)
);

CREATE TABLE Minuta (
	id_minuta INT NOT NULL AUTO_INCREMENT,
	-- id_delito INT NOT NULL,
	id_municipio INT NOT NULL,
	id_registro_sala INT NOT NULL,
	fecha_sala date,
	nuc_minuta VARCHAR(100),
	presentacion VARCHAR(100),
	fecha_ingreso DATE,
	hora_inicio DATE,
	hora_final DATE,
	duracion VARCHAR(100),
	resolutivos VARCHAR(100),
	observaciones VARCHAR(100),

	PRIMARY KEY (id_minuta),
	-- FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_registro_sala) REFERENCES RegistroSala(id_registro_sala) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE ImputadoDelito (
	id_imputado INT NOT NULL,
	id_delito INT NOT NULL,

	FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_delito) REFERENCES Delito(id_delito) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE MinutaImputado (
	id_minuta INT NOT NULL,
	id_imputado INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE MinutaVictima (
	id_minuta INT NOT NULL,
	id_victima INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_victima) REFERENCES Victima(id_victima) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE MinutaMinisterioPublico (
	id_minuta INT NOT NULL,
	id_ministerio INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_ministerio) REFERENCES MinisterioPublico(id_ministerio) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE NotificadorNotificaciones (
	id_notificacion INT NOT NULL,
	id_notificador INT NOT NULL,

	FOREIGN KEY (id_notificacion) REFERENCES Notificaciones(id_notificacion) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_notificador) REFERENCES Notificador(id_notificador) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE ParteCorreoP (
	id_parte INT NOT NULL,
	id_correo INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_correo) REFERENCES CorreoP(id_correo) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE ParteTelefonoP (
	id_parte INT NOT NULL,
	id_telefono INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_telefono) REFERENCES TelefonoP(id_telefono) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE VictimaParte (
	id_parte INT NOT NULL,
	id_victima INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_victima) REFERENCES Victima(id_victima) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE ImputadoParte (
	id_parte INT NOT NULL,
	id_imputado INT NOT NULL,

	FOREIGN KEY (id_parte) REFERENCES Parte(id_parte) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_imputado) REFERENCES Imputado(id_imputado) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE MinutaTipoAudiencia (
	id_minuta INT NOT NULL,
	id_tipo_audiencia INT NOT NULL,

	FOREIGN KEY (id_minuta) REFERENCES Minuta(id_minuta) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_tipo_audiencia) REFERENCES TipoAudiencia(id_tipo_audiencia) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE CarpetaDelito (
	id_carpeta INT NOT NULL,
	id_delito INT NOT NULL,

	FOREIGN KEY (id_carpeta) REFERENCES Carpeta(id_carpeta) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_delito) REFERENCES Delito(id_delito) ON UPDATE CASCADE ON DELETE CASCADE
);

-- Relacion
CREATE TABLE CarpetaTipoAudiencia (
	id_carpeta INT NOT NULL,
	id_tipo_audiencia INT NOT NULL,

	FOREIGN KEY (id_carpeta) REFERENCES Carpeta(id_carpeta) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_tipo_audiencia) REFERENCES TipoAudiencia(id_tipo_audiencia) ON UPDATE CASCADE ON DELETE CASCADE
);

INSERT INTO TipoUsuario (tipo_usuario) VALUES ('Administrador');
INSERT INTO TipoUsuario (tipo_usuario) VALUES ('Editor');
INSERT INTO TipoUsuario (tipo_usuario) VALUES ('Notificador');

INSERT INTO TipoParte (tipo_parte) VALUES ('Defensor');
INSERT INTO TipoParte (tipo_parte) VALUES ('Asesor juridico');

INSERT INTO AuxiliarSala (nombre_auxiliar, apellidos_auxiliar) VALUES ('Luis', ' Ceja Luna');
INSERT INTO AuxiliarSala (nombre_auxiliar, apellidos_auxiliar) VALUES ('Carlos', 'Solano Vega');
INSERT INTO EncargadoSala (nombre_encargado, apellidos_encargado) VALUES ('Luis', 'Ceja Luna');
INSERT INTO EncargadoSala (nombre_encargado, apellidos_encargado) VALUES ('Carlos', 'Solano Vega');

INSERT INTO Sala (nombre_sala) VALUES ('Sala1');
INSERT INTO Sala (nombre_sala) VALUES ('Sala2');
INSERT INTO Sala (nombre_sala) VALUES ('Zoom');
INSERT INTO Sala (nombre_sala) VALUES ('Telmex');

INSERT INTO Usuario (id_tipo_usuario, nombre_usuario, apellidos_usuario, email, username, contrasena) VALUES (1, 'Luis David', 'Ceja Luna', 'ceja.luna.luis.david@gmail.com', 'LunaMan', '123456');

INSERT INTO Delito (delito) VALUES ('Robo');
INSERT INTO Delito (delito) VALUES ('Asesinato');
INSERT INTO Delito (delito) VALUES ('Roba a mano armada');
INSERT INTO Delito (delito) VALUES ('Robo1');
INSERT INTO Delito (delito) VALUES ('Robo2');
INSERT INTO Delito (delito) VALUES ('Robo3');

INSERT INTO Carpeta (nuc_carpeta, tipo_carpeta, presentacion, fecha_ingreso, fecha_inicio, duracion, judicalizada, nuevo, archivo_muerto, vinculacion, rol, oficio) VALUES ('123', '123', '123', now(), now(), '123', 0, 0, 1, 1, '123', '123');
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (1, 2);
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (1, 3);
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (1, 4);
INSERT INTO Carpeta (nuc_carpeta, tipo_carpeta, presentacion, fecha_ingreso, fecha_inicio, duracion, judicalizada, nuevo, archivo_muerto, vinculacion, rol, oficio) VALUES ('456', '456', '456', now(), now(), '456', 0, 0, 1, 1, '456', '456');
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (2, 5);
INSERT INTO CarpetaDelito (id_carpeta, id_delito) VALUES (2, 6);

INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ('Luis', 'Ceja Luna');
INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ('Carlos', 'Solano Vega');
INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ('Lupita', 'García Ortega');
INSERT INTO Juez (nombre_juez, apellidos_juez) VALUES ('Angell', 'Ayala Aquino');

INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ('Luis', 'Ceja Luna');
INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ('Carlos', 'Solano Vega');
INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ('Lupita', 'García Ortega');
INSERT INTO Notificador (nombre_notificador, apellidos_notificador) VALUES ('Angell', 'Ayala Aquino');

INSERT INTO Notificaciones (id_juez, nuc_notificacion, acuerdo, fecha, descripcion, archivo) VALUES (1, '123', 'acuerdo', now(), '123', '123');
INSERT INTO Notificaciones (id_juez, nuc_notificacion, acuerdo, fecha, descripcion, archivo) VALUES (1, '456', 'acuerdo', now(), '456', '456');

INSERT INTO NotificadorNotificaciones (id_notificacion, id_notificador) VALUES (1, 1);
INSERT INTO NotificadorNotificaciones (id_notificacion, id_notificador) VALUES (2, 1);

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

-- UPDATE Usuario 
-- SET nombre_usuario = '', apellidos_usuario = '', email = '', username = '', contrasena = '', id_tipo_usuario = 2
-- WHERE id_usuario = 

-- ALTER TABLE Usuario CHANGE nombre nombre_usuario VARCHAR(100);
-- ALTER TABLE Usuario CHANGE apellidos apellidos_usuario VARCHAR(100);
-- ALTER TABLE Usuario CHANGE nombre_usuario username VARCHAR(100);

-- ALTER TABLE Imputado CHANGE nombre nombre_imputado VARCHAR(100);
-- ALTER TABLE Imputado CHANGE apellidos apellidos_imputado VARCHAR(100);

-- ALTER TABLE Victima CHANGE nombre nombre_victima VARCHAR(100);
-- ALTER TABLE Victima CHANGE apellidos apellidos_victima VARCHAR(100);

-- ALTER TABLE MinisterioPublico CHANGE nombre nombre_ministerio VARCHAR(100);

-- ALTER TABLE Juez CHANGE nombre nombre_juez VARCHAR(100);
-- ALTER TABLE Juez CHANGE apellidos apellidos_juez VARCHAR(100);

-- ALTER TABLE Notificador CHANGE nombre nombre_notificador VARCHAR(100);
-- ALTER TABLE Notificador CHANGE apellidos apellidos_notificador VARCHAR(100);

-- ALTER TABLE AuxiliarSala CHANGE nombre nombre_auxiliar VARCHAR(100);
-- ALTER TABLE AuxiliarSala CHANGE apellidos apellidos_auxiliar VARCHAR(100);

-- ALTER TABLE EncargadoSala CHANGE nombre nombre_encargado VARCHAR(100);
-- ALTER TABLE EncargadoSala CHANGE apellidos apellidos_encargado VARCHAR(100);

-- ALTER TABLE Parte CHANGE nombre nombre_parte VARCHAR(100);
-- ALTER TABLE TipoUsuario CHANGE tipo tipo_usuario VARCHAR(100);
-- ALTER TABLE TipoParte CHANGE tipo tipo_parte VARCHAR(100);
-- ALTER TABLE TipoAudiencia CHANGE tipo tipo_audiencia VARCHAR(100);
-- ALTER TABLE Carpeta CHANGE tipo tipo_carpeta VARCHAR(100);
-- ALTER TABLE Notificaciones CHANGE nuc nuc_notificacion VARCHAR(100);
-- ALTER TABLE Carpeta CHANGE nuc nuc_carpeta VARCHAR(100);
-- ALTER TABLE Minuta CHANGE nuc nuc_minuta VARCHAR(100);

-- Obtener todas las carpetas
SELECT * FROM Carpeta;

SELECT * 
FROM Carpeta INNER JOIN CarpetaDelito INNER JOIN Delito
ON Carpeta.id_carpeta = CarpetaDelito.id_carpeta
AND CarpetaDelito.id_delito = Delito.id_delito;

SELECT Notificaciones.id_notificacion, Notificador.id_notificador, Juez.id_juez, nombre_juez, apellidos_juez, nombre_notificador, apellidos_notificador, nuc_notificacion, fecha, acuerdo, descripcion, archivo
FROM Notificaciones INNER JOIN Juez INNER JOIN Notificador INNER JOIN NotificadorNotificaciones
ON Notificaciones.id_juez = Juez.id_juez
AND Notificaciones.id_notificacion = NotificadorNotificaciones.id_notificacion
AND NotificadorNotificaciones.id_notificador = Notificador.id_notificador
WHERE Notificaciones.id_notificacion = 1;