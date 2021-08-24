CREATE DATABASE juzgado;
USE juzgado;

CREATE TABLE TipoUsuario (
	id_tipo_usuario INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(50),

	PRIMARY KEY (id_tipo_usuario)
);

CREATE TABLE Usuario (
  	id_usuario INT NOT NULL AUTO_INCREMENT,
	id_tipo_usuario INT NOT NULL,
    nombre VARCHAR(100),
	apellidos VARCHAR(100),
	email VARCHAR(100),
	nombre_usuario VARCHAR(100),
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
	nombre VARCHAR(100),
	apellidos VARCHAR(100),
	edad VARCHAR(100),

	PRIMARY KEY (id_imputado),
	FOREIGN KEY (id_municipio) REFERENCES Municipio(id_municipio) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE Victima (
	id_victima INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellidos VARCHAR(100),
	edad VARCHAR(100),

	PRIMARY KEY (id_victima)
);

CREATE TABLE MinisterioPublico (
	id_ministerio INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),

	PRIMARY KEY (id_ministerio)
);

CREATE TABLE Juez (
	id_juez INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellidos VARCHAR(100),

	PRIMARY KEY (id_juez)
);

CREATE TABLE Notificador (
	id_notificador INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellidos VARCHAR(100),

	PRIMARY KEY (id_notificador)
);

CREATE TABLE Notificaciones (
	id_notificacion INT NOT NULL AUTO_INCREMENT,
	id_juez INT NOT NULL,
	nuc VARCHAR(100),
	acuerdo VARCHAR(100),
	fecha DATE,
	descripcion VARCHAR(100),
	archivo VARCHAR(100),

	PRIMARY KEY (id_notificacion),
	FOREIGN KEY (id_juez) REFERENCES Juez(id_juez) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE AuxiliarSala (
	id_auxiliar INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellidos VARCHAR(100),

	PRIMARY KEY (id_auxiliar)
);

CREATE TABLE EncargadoSala (
	id_encargado INT NOT NULL AUTO_INCREMENT,
	nombre VARCHAR(100),
	apellidos VARCHAR(100),

	PRIMARY KEY (id_encargado)
);

CREATE TABLE Sala (
	id_sala INT NOT NULL AUTO_INCREMENT,
	id_encargado INT NOT NULL,
	id_auxiliar INT NOT NULL,
	id_juez INT NOT NULL,
	nombre VARCHAR(100),

	PRIMARY KEY (id_sala),
	FOREIGN KEY (id_encargado) REFERENCES EncargadoSala(id_encargado) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_auxiliar) REFERENCES AuxiliarSala(id_auxiliar) ON UPDATE CASCADE ON DELETE CASCADE,
	FOREIGN KEY (id_juez) REFERENCES Juez(id_juez) ON UPDATE CASCADE ON DELETE CASCADE
);

CREATE TABLE TipoParte (
	id_tipo_parte INT NOT NULL AUTO_INCREMENT,
	tipo VARCHAR(100),

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
	tipo VARCHAR(100),

	PRIMARY KEY (id_tipo_audiencia)
);

CREATE TABLE Carpeta (
	id_carpeta INT NOT NULL AUTO_INCREMENT,
	nuc VARCHAR(100),
	tipo VARCHAR(100),
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
	id_sala INT NOT NULL,
	fecha_sala date,
	nuc VARCHAR(100),
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
	FOREIGN KEY (id_sala) REFERENCES Sala(id_sala) ON UPDATE CASCADE ON DELETE CASCADE
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

INSERT INTO TipoUsuario (tipo) VALUES ('Administrador');
INSERT INTO TipoUsuario (tipo) VALUES ('Editor');
INSERT INTO TipoUsuario (tipo) VALUES ('Notificador');

INSERT INTO Usuario (id_tipo_usuario, nombre, apellidos, email, nombre_usuario, contrasena) VALUES (1, 'Luis David', 'Ceja Luna', 'ceja.luna.luis.david@gmail.com', 'LunaMan', '123456');
