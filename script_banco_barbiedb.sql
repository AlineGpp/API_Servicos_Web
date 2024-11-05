CREATE TABLE movies (
	id SERIAL PRIMARY KEY, 
	title VARCHAR (50) NOT NULL, 
	description TEXT, 
	image TEXT, 
	notice DOUBLE PRECISION,
	year INTEGER,
	link TEXT
);



CREATE TABLE comments (
	id SERIAL PRIMARY KEY, 
	movie_id INTEGER NOT NULL, 
	comment TEXT NOT NULL, 
	FOREIGN KEY (movie_id) REFERENCES movies (id)
);

create table people (
	id SERIAL primary key,
	name varchar (50) not null,
	email varchar (40) not null,
	login varchar (15) not null,
	password varchar (50) not null,
)
