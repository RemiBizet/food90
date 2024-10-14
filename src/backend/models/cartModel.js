const mongoose = require('mongoose');

// Cart Model, one user per cart and one cart per user user, items is a list with the items selected (name, quantity, price)
const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  items: [{
    title: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true }
  }]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
