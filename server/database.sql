CREATE DATABASE cdillocal;

CREATE TYPE param_val_pair(
    param VARCHAR(255),
    val numeric(10, 2)
);

-- CREATE TABLE values(
--     param1 description VARCHAR(255) NOT NULL
-- );

CREATE TABLE parameters(
    device_id SERIAL PRIMARY KEY,
    device_name VARCHAR(255) NOT NULL,
    val_dict param_val_pair[]
    CONSTRAINT unique_device_name_constraint UNIQUE (device_name)
);

-- ALTER TABLE parameters ADD CONSTRAINT unique_device_name_constraint UNIQUE (device_name);