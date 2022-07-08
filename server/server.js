const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const CheckToken = require('./middleware/CheckTokenMiddleware')
const multer = require('multer')
const fs = require('fs')

// SCHEMA IMPORT
const user_model = require('./model/UserSchema')
const product_model = require('./model/ProductSchema')


// Connnect With MongoDB

mongoose.connect("mongodb://localhost:27017/buddyfood")

require('dotenv/config')

const FILE_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
}

const storage = multer.diskStorage({
    destination: ((req, file, cb) => {
        cb(null, './public/uploads')
    }),
    filename: ((req, file, cb) => {
        let convertFileName = file.originalname.split(' ').join('-')
        const extension = FILE_TYPE[file.mimetype]
        cb(null, `${convertFileName}-${Date.now()}.${extension}`)
    })
})

const upload = multer({ storage: storage })

//Middleware to restful api and prevent cors errors

app.use(express.json())
app.use(cors())
app.use('/public/uploads', express.static(__dirname + '/public/uploads'))


const api = process.env.URL_API



app.post(`${api}/sign_in`, (req, res) => {

    //receive data from client

    const phone_number = req.body.phone_number
    const password = req.body.password

    // find where is eqaul with this phone number and password

    user_model.findOne({ phone_number: phone_number, password: password }, (err, user) => {
        if (err) throw err

        if (user) {


            let user_id = user._id.toString()

            let token = jwt.sign({ user_id: user_id, role: user.role }, 'hello', { expiresIn: '1hr' })

            res.json({ invalid_user: false, token: token, user_id: user_id, role: user.role })
        } else {
            res.json({ invalid_user: true })
        }
    })

})


app.post(`${api}/sign_up`, (req, res) => {
    const phone_number = req.body.phone_number
    const email = req.body.email
    const password = req.body.password

    console.log(req.body)

    user_model.findOne({ phone_number: phone_number }, (err, user) => {
        if (err) throw err

        if (user) {
            console.log("This phone number has already taken")
        } else {
            user_model.insertMany({ phone_number: phone_number, password: password, email: email, role: 0 }, (err, inserted) => {
                if (err) throw err

                console.log("Register Successfully")
            })
        }
    })

})

app.get(`${api}/check_token`, CheckToken, (req, res) => {
    console.log("Checked Token")
})


app.get(`${api}/products`, async (req, res) => {
    let products = await product_model.find()

    res.json(products)
})


app.post(`${api}/upload_product`, upload.single('image'), (req, res) => {
    const fileName = req.file.filename
    // const product_name = req.body.product_name
    // const product_price = req.body.product_price
    // const product_image = 'http://play2api.ddns.net:3001/public/uploads/'+fileName
    // const seller_id = req.body.seller_id

    const product = {
        product_name: req.body.product_name,
        product_price: req.body.product_price,
        product_image: 'http://play2api.ddns.net:3001/public/uploads/' + fileName,
        seller_id: req.body.seller_id
    }

    product_model.insertMany(product, (err, inserted) => {
        if (err) throw err

        console.log("Added Product")
    })

})

app.post(`${api}/delete_product`, (req, res) => {
    const id_product = req.body.id_product
    const image_source = req.body.image_source

    product_model.deleteOne({
        _id: id_product
    }).then((res) => {
        fs.unlinkSync(`./public/uploads/${image_source}`)
        console.log("Delete photo file success")
    })
})

app.get(`${api}/product_id/:product_id`, async(req, res)=>{
    let product_id = req.params.product_id

    let product = await product_model.findById(product_id)

    res.json(product)
})


app.listen(3001, () => {
    console.log("Server is running on port 3001")
})