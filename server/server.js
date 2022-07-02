const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const user_model = require('./model/UserSchema')

mongoose.connect("mongodb://localhost:27017/buddyfood")

require('dotenv/config')

app.use(express.json())
app.use(cors())

const api = process.env.URL_API


app.post(`${api}/sign_in`, (req, res)=>{
    const phone_number = req.body.phone_number
    const password = req.body.password

    user_model.findOne({phone_number: phone_number, password: password}, (err, user)=>{
        if(err) throw err

        if(user){
            let user_id = user._id.toString()
            let token = jwt.sign({user_id: user_id}, 'secret', {expiresIn: '1h'})
            res.json(token)
        }else{
            res.json({invalid_user: true})
        }
    })

})


app.post(`${api}/sign_up`, (req, res)=>{
    const phone_number = req.body.phone_number
    const email = req.body.email
    const password = req.body.password

    console.log(req.body)

    user_model.findOne({phone_number: phone_number}, (err, user)=>{
        if(err) throw err

        if(user){
            console.log("This phone number has already taken")
        }else{
            user_model.insertMany({phone_number: phone_number, password: password, email: email, role: 0}, (err, inserted)=>{
                if(err) throw err

                console.log("Register Successfully")
            })
        }
    })

})


app.post(`${api}/checkToken`, (req, res)=>{
    let token = req.headers.authorization.split(' ')[1]

    let decoded = jwt.verify(token, 'secret')
    

    console.log(decoded)
})

app.listen(3001, ()=>{
    console.log("Server is running on port 3001")
})