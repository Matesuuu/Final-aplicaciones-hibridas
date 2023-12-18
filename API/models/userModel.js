const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const usuarioSchema = new Schema({
  name: { 
    type: String, 
    required: true 
},
  email: { 
    type: String,
    required: true, 
    unique: true
},
  password: { 
    type: String, 
    required: true 
},
  reservas: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Reserva' 
}],
reviews: [{
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Review'
}],
});

usuarioSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario;