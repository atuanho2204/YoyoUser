const auth = require('../authentication')
const connection = require('../database') // connected db 
const express = require('express')
const router = express.Router() // express route handler 

function genToken(length){
    //edit the token allowed characters
    var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    var b = [];  
    for (var i = 0; i < length; i++) {
        var j = (Math.random() * (a.length - 1)).toFixed(0);
        b[i] = a[j];
    }
    return b.join("");
}

router.post('/', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }

    let user = req.body;

    connection.query(
        `SELECT * FROM users WHERE username='${user.username}'
                             AND password='${user.password}';`, 
        (err, rows, fields) => {
            if(err) {
                res.status(400).end();
                return;
            }
            if (rows.length == 0) {
                res.status(200).json({auth: false, msg: "Invalid login"});
                return;
            }
            let token = genToken(32);

            connection.query(
                `DELETE FROM tokens WHERE userId = ${rows[0].id}; 
                INSERT INTO tokens (userId, token) VALUES (${rows[0].id}, '${token}');`,
                (err, rows, fields) => {
                    if (err) throw err;
                    res.status(200).json({
                        auth: true,
                        token: token,
                    });
                }
            );
        }
    )
})

router.get('/:token', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }

    let token = req.params.token;

    connection.query(
        `SELECT id, username, firstName, lastName, email, roleMask FROM users 
            INNER JOIN tokens 
            ON users.id = tokens.userId 
            WHERE token = '${token}';`,
        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            if (rows.length == 0) {
                res.status(401).json({
                    msg: "Invalid token",
                })
            }
            else {
                res.status(200).json(rows[0])
            }
        }
    )
})

module.exports = router 
