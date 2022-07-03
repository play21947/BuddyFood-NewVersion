const mongoose = require('mongoose')


const ProductSchema = mongoose.Schema({
    product_name: String,
    product_price: Number,
    product_image: String,
    seller_id: String
})

const product = mongoose.model('products' ,ProductSchema)

module.exports = product