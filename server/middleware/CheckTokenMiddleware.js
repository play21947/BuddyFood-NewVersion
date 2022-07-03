const jwt = require('jsonwebtoken')

const CheckToken=(req, res, next)=>{

    
    let token = req.headers.authorization.split(' ')[1] // Get Token From headers from users pass Authorization

    if(token){
        try{
            let decoded = jwt.verify(token, 'hello') // Check Jwt That is It expired?
            res.json({expired: false, data: decoded}) // pass data then verify token put it to result and pass it to do next
        }catch(err){
            res.json({expired: true})
        }
    }

    next()
}

module.exports = CheckToken