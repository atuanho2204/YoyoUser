const auth = require('../authentication')
const connection = require('../database') // connected db
const express = require('express')
const router = express.Router() // express route handler

router.get('/', (req, res) => {
    if (!auth(req.headers)) {
        res.status(401).json({
            response: "Authentication failed",
        });
        return;
    }

    connection.query(
        'SELECT * FROM emails;',
        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            res.status(200).json(rows);
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
        `INSERT INTO emails (firstName, lastName, email) VALUES
        ('New', 'Email', 'newemail@email.com') ;`,
        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            res.status(200).json({
                msg: 'Create successfully'
            });
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

    let email = req.body;

    connection.query(
        `UPDATE emails
        SET firstName = '${email.firstName}',
            lastName = '${email.lastName}',
            email = '${email.email}'
        WHERE id = ${email.id};`,
        (err, rows, field) => {
            if(err) {
                res.status(400).end();
                return;
            }
            res.status(200).json({
                msg: 'Update successfully'
            });
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
        `DELETE FROM emails
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
