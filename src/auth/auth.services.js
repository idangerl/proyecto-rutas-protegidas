const checkUsersCredentials = require('./auth.controllers')
const response = require('../utils/responses.handler')
const jwt = require('jsonwebtoken')

const postLogin = (req, res) => {
    const {email, password} = req.body 
    checkUsersCredentials(email, password)
        .then(data => {
            if(data){
                const token = jwt.sign({
                    id: data.id,
                    email: data.email
                }, process.env.JWT_SECRET, {
                    expiresIn: '1d'
                })
                response.success({
                    res,
                    status: 200,
                    message: 'Credentials are correct!',
                    data: token
                })
            } else {
                response.error({
                    res,
                    status: 401,
                    message: 'Invalid credentials'
                })
            }
        })
        .catch(err => {
            response.error({
                res,
                status: 400,
                message: err.message || 'Something went wrong',
                data: err
            })
        })
}

module.exports = postLogin