CREATE DATABASE cdillocal;

CREATE TABLE device(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL
);

CREATE TABLE parameters(
    device_id SERIAL PRIMARY KEY,
    parameters VARCHAR(255) NOT NULL
);