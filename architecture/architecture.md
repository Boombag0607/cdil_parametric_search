## For Admin

<!-- The PostgreSQL database has many tables but for the sake of local development 2 are considered.
1. `device` - Contains all of the parameters for the device named "device" as columns, stores the values of those parameters inside the corresponding paramter column. 
    - This is the table which the frontend will be using.
    - This `device` table is a template for actual devices like `Power Transistors`, `Transistors`, `Diodes` & other devices.
2. `parameters` - Contains all of the parameters for different devices. 
    - Different devices are made into a serial primary key called `device_id` which are the columns of the table. 
    - The values of these columns are the parameters which we need for the `device` table. 
    - If any new columns are to be added in `device` table, new values are to be added to the corresponding `device_id`. -->
Access the server using `/admin` path

The PostgreSQL database has 2 tables - 
1. `values` 
    - Column names are all of the possible different parameters (VARCHAR(255)).
    - The values are discrete values of thos parameter in column.
    - This will be displayed on the frontend.

2. `parameters` 
    - Columns are `device_id`, `device_name` & `param_val_pair`
    - The row points to a particular device containing the ID (SERIAL PRIMARY KEY), Name (VARCHAR(255)) and Parameter-Value pair (ROW(VARCHAR(255), numeric(10, 2))).