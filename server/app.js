
const express = require('express');
const mysql = require('mysql2');
const path = require('path');
const { getAlumno, getAlumnos, crearAlumno } = require('./src/database');


const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: '172.17.0.2',
    user: 'root',
    password: 'pass',
    database: 'prueba',
});

// Conectar a la base de datos MySQL
db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// app.use(express.static('public'));
// app.use(express.static(path.join(__dirname, 'public')));


// Ruta raíz que realiza una consulta SQL y responde con una tabla HTML
app.get('/', (req, res) => {
    // Realiza una consulta SQL para obtener datos de la tabla 'tu_tabla'
    const query = 'SELECT * FROM alumnos';

    db.query(query, (err, result) => {
        if (err) {
            console.error('Error al ejecutar la consulta SQL:', err);
            res.status(500).send('Error interno del servidor');
            return;
        }

        // Genera la tabla HTML con los datos de la consulta
        let tableHtml = '<table><tr><th>ID</th><th>Apellidos</th><th>Nombres</th><th>DNI</th></tr>';
        result.forEach((row) => {
            tableHtml += `<tr><td>${row.id}</td><td>${row.apellidos}</td><td>${row.nombres}</td><td>${row.dni}</td></tr>`;
        });
        tableHtml += '</table>';

        // Envía la tabla HTML como respuesta
        res.send(tableHtml);
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}. Ir a http://localhost:${port}`);
});



/*
// Ruta para consultar la base de datos
app.get('/database', async (req, res) => {
    try {
        // Crear una conexión a la base de datos
        const connection = mysql.createConnection(dbConfig);
        console.log(connection)

        // Realizar una consulta SQL (ejemplo: seleccionar todos los registros de una tabla llamada 'ejemplo')
        const [rows, fields] = connection.execute('SELECT * FROM alumnos');

        // Cerrar la conexión a la base de datos
        connection.end();

        // Enviar los resultados como respuesta HTTP
        res.json(rows);
        console.log(rows);
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        res.status(500).send('Error al conectar a la base de datos');
    }
});



const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
 */
