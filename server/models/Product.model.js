var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    productId: Number,
    productName: String,
    price: Number,
    instock: Boolean,
    productsku: String,
    productImage: String
});
module.exports = mongoose.model('Product', ProductSchema);
