const auth = require('../authentication')
const connection = require('../database') // connected db 
const express = require('express')
const router = express.Router() // express route handler 


router.get('/:id', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }

    let id = req.params.id;

    connection.query(
        `SELECT id, username, firstName, lastName, email, roleMask FROM users
            WHERE id = '${id}';`,

        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            if (rows.length == 0) {
                res.status(401).json({
                    msg: "Invalid id",
                })
            }
            else {
                res.status(200).json(rows[0])
            }
        }
    )
})










module.exports = router 
