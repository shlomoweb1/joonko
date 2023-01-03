const express = require('express');
const {OPEN_JOBS} = require('../constants/jobs');
const USERS = require('../constants/users');

const {setCookieUser, verifyDomainEmail, verifyUser, verifyCookie} = require('../middlewares/auth');

const router = express.Router();

router.post('/register', (req, res) => {
    res.status(201).send();
});


router.post('/login', verifyDomainEmail, verifyUser, setCookieUser);



router.get('/jobs', verifyCookie, (req, res, next) => {
    const {user} = res.locals;
    const jobs = OPEN_JOBS.filter(job=>user.departments.indexOf(job.department) != -1)
    res.status(200).json({jobs});
});

module.exports = router;