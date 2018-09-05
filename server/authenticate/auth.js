import { use } from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import Admins from '../models/admins'


// use(new LocalStrategy(
//     (username, password, done) => {

        // findUser(username, function (err, user) {
        //     if (err) {
        //         return done(err)
        //     }
        //     if (!user) {
        //         return done(null, false)
        //     }
        //     if (password !== user.password ) {
        //         return done(null, false)
        //     }
        //     return done(null, user)
    // })
// )