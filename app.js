import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Middleware para parsear JSON y form-data (necesario para recibir datos de formularios)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para servir el archivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});



const DATA_PATH = path.join(__dirname, 'data', 'deportes.json');

function leerDeportes() {
    const data = fs.readFileSync(DATA_PATH, 'utf8');
    return JSON.parse(data).deportes;
}

function guardarDeportes(deportes) {
    const data = JSON.stringify({ deportes }, null, 2);
    fs.writeFileSync(DATA_PATH, data, 'utf8');
}

app.get('/deportes', (req, res) => {
    try {
        const deportes = leerDeportes();
        res.status(200).json({ deportes });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/agregar', (req, res) => {
    try {
        const { nombre, precio } = req.body;
        const deportes = leerDeportes();
        deportes.push({ nombre, precio });
        guardarDeportes(deportes);
        res.status(201).send('Deporte agregado exitosamente.');
    } catch (error) {
        res.status(500).send('Error al agregar el deporte.');
    }
});
app.post('/editar', (req, res) => {
    const { nombre, precio } = req.body;
    try {
        let deportes = leerDeportes();
        const index = deportes.findIndex(d => d.nombre === nombre);
        if (index !== -1) {
            deportes[index].precio = precio;
            guardarDeportes(deportes);
            res.send('Deporte actualizado exitosamente.');
        } else {
            res.status(404).send('Deporte no encontrado.');
        }
    } catch (error) {
        res.status(500).send('Error al actualizar el deporte.');
    }
});
app.post('/eliminar', (req, res) => {
    const { nombre } = req.body; // Asegúrate de que el frontend envíe el nombre como parte del cuerpo de la solicitud.
    try {
        let deportes = leerDeportes();
        const nuevosDeportes = deportes.filter(d => d.nombre !== nombre);
        if (nuevosDeportes.length < deportes.length) {
            guardarDeportes(nuevosDeportes);
            res.send('Deporte eliminado exitosamente.');
        } else {
            res.status(404).send('Deporte no encontrado.');
        }
    } catch (error) {
        res.status(500).send('Error al eliminar el deporte.');
    }
});


app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
