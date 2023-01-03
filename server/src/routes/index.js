const express = require('express');
const router = express.Router();

const usersRoutes = require('./users');

router.use((req,_res,next)=>{
    console.log(req.url, req.method);
    next();
})

router.use('/users', usersRoutes);

module.exports = router;