CREATE TABLE "device_types" (
  "ID" INT PRIMARY KEY NOT NULL,
  "name" TEXT,
  "types" TEXT[]
);

CREATE TABLE "device_data" (
  "ID" INT PRIMARY KEY NOT NULL,
  "data" VARCHAR[]
);

CREATE TYPE "column_group" AS (
    "group_name" VARCHAR,
    "col_span" INT
)

CREATE TABLE "device_params" (
  "ID" INT PRIMARY KEY NOT NULL,
  "packaging" VARCHAR[],
  "column_groups" column_group[],
  "columns" VARCHAR[]
);

ALTER TABLE "device_params" ADD FOREIGN KEY ("ID") REFERENCES "device_data" ("ID");

-- ALTER TABLE parameters ADD CONSTRAINT unique_device_name_constraint UNIQUE (device_name);