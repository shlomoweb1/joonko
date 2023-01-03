const USERS = require('../constants/users');

const verifyDomainEmail = (req,res, next) => {
    if(!req.body.email || !req.body.email.match(/@joonko.co$/)) return res.status(401).end();
    return next();
}

const verifyUser = (req,res,next) => {
    const {email, password} = req.body;
    if(typeof email === 'undefined' || typeof password === 'undefined') return res.status(401).end();
    const hasUser = USERS.find(user=>user.email===email);
    if(!hasUser) return res.status(404).end();
    const validPassword = hasUser.password === password;
    if(!validPassword) return res.status(401).end();
    res.locals.user = hasUser;
    next();
}

const setCookieUser = (req, res, next) => {
    res.cookie('_user_session', JSON.stringify({email: res.locals.user.email})); // cookie is a string value
    res.status(200).send();
}

const verifyCookie = (req, res, next)=>{
    if(!req.headers.cookie) return res.status(401).end();
    const cookies = req.headers.cookie.split(";").reduce((obj, c) => {
        const [key, value] = c.split("=");
        obj[key.trim()] = decodeURIComponent(value.trim());
        return obj;
      }, {} );


    if(!cookies['_user_session']) return res.status(401).end();
    try{
        const session = JSON.parse(cookies['_user_session']);
        if(!session || !session.email) throw new Error('Invalid cookie');
        const user = USERS.find(u=>u.email===session.email);
        if(!user) throw new Error('Invalid user');
        res.locals.user = user;
        next();
    }catch(e){
        console.log(e);
        return res.status(401).end();
    }
}

module.exports = {
    verifyDomainEmail,
    verifyUser,
    setCookieUser,
    verifyCookie
}