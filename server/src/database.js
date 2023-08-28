
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const dbConfig = {
  host: '172.17.0.2', // Nombre o dirección IP del contenedor MySQL
  user: 'root', // Nombre de usuario de la base de datos
  password: 'pass', // Contraseña de la base de datos
  database: 'prueba', // Nombre de la base de datos
};

/**
 * Un pool es una colección de conexiones a la base de datos.
 * Así, en lugar de crear una nueva conexión totalmente nueva para cada consulta que quiero,
 * voy a tener un pool de conexiones que pueden ser reutilizadas.
 * Esto es muy útil cuando la app empieza a crecer.
 * 
 */
const pool = mysql.createPool(dbConfig).promise();

async function getAlumnos(){
    // const result = await pool.query('SELECT * FROM alumnos');
    // const rows = result[0];
    // return rows;
    const [rows] = await pool.query('SELECT * FROM alumnos');
    return rows;
};
// const alumnos = await getAlumnos();
// console.log(alumnos);


async function getAlumno(id){
    const [rows] = await pool.query(`
        SELECT *
        FROM alumnos
        WHERE id = ?
    `, [id]);
    return rows[0];
};
// const alumno = await getAlumno(1);
// console.log(alumno);

async function crearAlumno(nombre, edad, dni) {
    const [result] = await pool.query(`
        INSERT INTO alumnos (nombre, edad, dni)
        VALUES ( ?, ?, ? )
    `, [nombre, edad, dni]);

    const id = result.insertId;
    return getAlumno(id);
};
// const result = await crearAlumno('Martín', 32, 12345678);
// console.log(result);

