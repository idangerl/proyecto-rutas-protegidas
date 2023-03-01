const {ExtractJwt, Strategy} = require('passport-jwt')
const passport = require('passport')

const findUserById = require('../users/users.controllers')

const passportConfigs = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'auth113'
}

passport.use(new Strategy(passportConfigs, (tokenDecoded, done) => {
    findUserById(tokenDecoded.id)
        .then(data => {
            if(data){
                done(null, tokenDecoded)
            } else {
                done(null, false, {message: 'Incorrect token'})
            }
        })
        .catch(err => {
            done(err, false)
        })
}))

module.exports = passport.authenticate('jwt', {session: false})