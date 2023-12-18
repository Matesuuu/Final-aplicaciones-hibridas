const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reservaSchema = new Schema({
  restaurante: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurante', 
    required: true
 },
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Usuario', 
    required: true 
},
  fecha: { 
    type: Date, 
    required: true
 },
  hora: { 
    type: String, 
    required: true
 },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;