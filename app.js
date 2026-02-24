const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User'); // El que creamos antes
require('dotenv').config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB Atlas'))
    .catch(err => console.log(err));

// RUTA READ (Consulta sencilla)
app.get('/', async (req, res) => {
    const items = await User.find(); // Consulta a la BD
    res.render('index', { data: items });
});

// RUTA CREATE
app.post('/add', async (req, res) => {
    try {
        const nuevo = new User(req.body); // req.body debe contener {name, email, phone}
        await nuevo.save();
        res.redirect('/');
    } catch (error) {
        console.log(error);
        res.send("Error al guardar: " + error.message);
    }
});

app.post('/update/:id', async (req, res) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, { runValidators: true });
        res.redirect('/');
    } catch (error) {
        res.status(400).send("Error al actualizar: " + error.message);
    }
});

// Ruta editar
app.get('/edit/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    res.render('edit', { user });
});

// RUTA DELETE
app.get('/delete/:id', async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

app.listen(3000, () => console.log('Servidor listo en http://localhost:3000'));
app.set('view engine', 'ejs');
app.use(express.static('public')); // Para tus estilos CSS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));