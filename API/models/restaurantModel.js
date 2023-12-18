const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const restauranteSchema = new Schema({
    nombre: { 
        type: String,
        required: true
    },
    ubicacion: {
        type: String,
        required: true
    },
    horarios: {
        type: String,
        required: true
    },
    menu: [{ 
      nombre: String, 
      descripcion: String, 
      precio: Number 
    }],
    reservas: [{ 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Reserva' 
    }],
    reviews: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review'
    }],
});
  
  const Restaurante = mongoose.model('Restaurante', restauranteSchema);
  
  module.exports = Restaurante;

