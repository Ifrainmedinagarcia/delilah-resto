

use delilah

CREATE table meals (
	id_meal int not null primary key auto_increment,
	nombre varchar(255),
	precio int,
	imagen MEDIUMBLOB,
	date_creation timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE table orders (
	id_order int not null primary key auto_increment,
	id_user int,
	id_meal int
);

-- if no exist (table database)
-- cambiar blob a varchar
-- NUNCA SE SUBE UN BINARIO A LA DB
-- cambiar ñ y tiempo de token en variable de entorno
-- mode de desarrollo o producción (varibale de entorno)



CREATE table users (
	id_user int not null primary key auto_increment,
	nombre varchar(255),
	email varchar(255) not null unique,
	phone varchar(255),
	address varchar(255),
	contraseña varchar(255)
);

create table users_roles(
	id_role int not null primary key auto_increment,
	nombre_role varchar(255)
)


ALTER table orders add CONSTRAINT orders_fk_1 FOREIGN KEY (id_user) REFERENCES users (id_user);

ALTER table orders add CONSTRAINT orders_fk_2 FOREIGN KEY (id_meal) REFERENCES meals (id_meal);