const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
    totalPrice: { type: Number, required: true }
});

module.exports = mongoose.model('Order', OrderSchema);