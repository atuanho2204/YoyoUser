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

router.get('/', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }

    let id = req.params.id;

    connection.query(
        `SELECT id, username, password, firstName, lastName, email, roleMask FROM users;`,

        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            res.status(200).json(rows)
        }
    )
})

router.put('/', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }
    let user = req.body;
    connection.query(
        `UPDATE users
        SET firstName = '${user.firstName}',
            lastName = '${user.lastName}',
            email = '${user.email}',
            username = '${user.username}',
            roleMask = '${user.roleMask}'
        WHERE id = ${user.id};

        UPDATE users
        SET password =
            IF (${user.newPassword.length} > 0, '${user.newPassword}', password)
        WHERE id = ${user.id}
        `,
        (err, rows, field) => {
            if(err) {
                res.status(400).end("Bad");
                return;
            }
            res.status(200).json({
                'msg': 'Update Successfully'
            })
        }
    )
})

router.post('/new', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }
    connection.query(
        `INSERT INTO users (username, password, firstName, lastName, email, roleMask) VALUES
        ('username', 'password', 'New', 'User', 'newuser@email.com', 0) ;`,

        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            res.status(200).json({
                'msg': 'Create Successfully'
            })
        }
    )
})

router.delete('/:id', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }

    let id = req.params.id;

    connection.query(
        `DELETE FROM users
            WHERE id = '${id}';`,

        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            res.status(200).end()
        }
    )
})


module.exports = router 
