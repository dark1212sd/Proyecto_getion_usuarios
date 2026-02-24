const mongoose = require('mongoose');

// Definición del esquema para la colección de Usuarios
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: [3, 'El nombre debe tener al menos 3 caracteres'],
        maxlength: [50, 'Nombre demasiado largo'],
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor ingrese un correo válido']
    },
    phone: {
        type: String,
        required: true,
        match: [/^(0414|0424|0412|0416|0426|0212)\d{7}$/, 'Formato de teléfono venezolano inválido (Ej: 04141234567)']
    }
});

// Exportar el modelo para usarlo en el CRUD de app.js
module.exports = mongoose.model('User', UserSchema);