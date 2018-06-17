import * as passport    from 'passport'
import * as PassportJWT from 'passport-jwt';
import config           from '../../config';
import UsersService      from '../../services/UsersService';

export default function(usersService: UsersService){
    const strategy = new PassportJWT.Strategy({
        secretOrKey     : config.jwtSecret,
        // tslint:disable-next-line:object-literal-sort-keys
        jwtFromRequest  : PassportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()
    }, async (payload, done) => { 
        console.log("payload", payload);
        const user = await usersService.findByEmail(payload.email);
        return (user) ? done(null, {id: user.id}) : done(new Error("User not found"), null);
    });

    passport.use(strategy);

    return {
        initialize: () => passport.initialize(),
        // tslint:disable-next-line:object-literal-sort-keys
        authenticate: () => passport.authenticate("jwt", config.jwtSession)
    };
}