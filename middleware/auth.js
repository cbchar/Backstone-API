const jwt = require('jsonwebtoken')

function auth(req,res,next){
    const jwtoken = req.header('Authorization, you need a token')
    if(!jwtoken){
        return next.status(404).send('Access denied')
    }
    try{
        const payload = jwt.verify(jwtoken, 'c0ntr4s3n14')
        next()
    }catch (e){
        res.status(400).send('Access denied, invalid token');
    }
}

module.exports = auth;