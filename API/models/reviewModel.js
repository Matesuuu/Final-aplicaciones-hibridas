const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Restaurante',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1, 
    max: 10, 
  },
  comment: {
    type: String,
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;


