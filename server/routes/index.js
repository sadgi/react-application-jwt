const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();

router.use(bodyParser.json());

/** Array of users having permission to access the services*/
let users = [
    {
        email: 'Test1', password: 'test1@mytest.com'

    },
    {
        email: 'Test2', password: 'test2@mytest.com'
    }
];

/** Login Router for authentication of user */
router.post('/login', (req, res) => {
    const result = users.find(user => user.email === req.body.email);
    if (result) {
        if (result.password === req.body.password) {
            let token = jwt.sign(req.body.email, 'secretkey'); // Sigining the token
            res.json({
                success: true,
                err: null,
                token
            });
        } else {
            res.status(401).json({
                success: false,
                token: null,
                err: 'Email or password is incorrect'
            });
        }
    } else {
        res.status(401).json({
            success: false,
            token: null,
            err: 'Email Not Found'
        });
    }
});

module.exports = router;
