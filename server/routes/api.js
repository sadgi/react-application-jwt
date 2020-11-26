const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const db = require("../database/database.js");
const app = express();
const jwt = require('jsonwebtoken');


router.use(bodyParser.json());

/** Function to verify jwt token sent by the client */
function verifyToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, 'secretkey', (err, email) => {
        if (err) return res.sendStatus(403)
        req.email = email
        next() // pass the execution off to whatever request the client intended
    })
}

/** Router to get all customers */
router.get('/customers', verifyToken, (req, res) => {
    const sql = "select * from customers";
    let response;
    db.all(sql, (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.contentType('application/json').status(200);
        res.send(rows);
    });
});

/** Router to get all orders based on customer id */
router.get('/orders/:id', verifyToken, (req, res) => {
    const custNum = req.params.id;
    const sql = `select * from orders where customerNumber = ? order by orderDate`;
    let response;

    db.all(sql, [custNum], (err, rows) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.contentType('application/json').status(200);
        res.send(rows);
    });
});

/** Router to get all order details based on order id */
router.get('/orderdetails/:id', verifyToken, (req, res) => {
    const orderNumber = req.params.id;
    const sql = `select * from orderdetails where orderNumber = ?`;
    let response;

    db.all(sql, [orderNumber], (err, orders) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.contentType('application/json').status(200);
        res.send(orders);
    });
});

/** Router to get product details based on product number */
router.get('/productdetails/:id', verifyToken, (req, res) => {
    const productNumber = req.params.id;
    const sql = `select * from products where productCode = ?`;
    let response;

    db.all(sql, [productNumber], (err, products) => {
        if (err) {
            res.status(400).json({ "error": err.message });
            return;
        }
        res.contentType('application/json').status(200);
        res.send(products);
    });
});

module.exports = router;
