const mysql = require('mysql')
const express = require('express')
const app = express()
const auth = require('../middlewares/auth.js')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'TodoList'
})

app.post('/', (req, res, next) => {
    var sql = `SELECT * FROM users`
    conn.query(sql, function (err, result) {
        if (result.length > 0){
            auth(req, res, next)
        }
        else{
            next()
        }
    })
}, (req, res) => {
    var sql = `SELECT * FROM users WHERE username = "${req.body.username}"`
    conn.query(sql, function (err, result) {
        if (result.length == 1){
            res.send(405)
        }
        else{
            var sql = `INSERT INTO users (username, password) VALUES ("${req.body.username}", "${req.body.password}")`
            conn.query(sql, function (err, result) {
                if (err) throw err
                console.log("Berhasil ditambah")

                var sql = "SELECT * FROM users"
                conn.query(sql, function (err, result) {
                    res.send(result)
                })
            })
        }
    })
})

app.get('/', auth, (req, res) => {
    var sql = "SELECT * FROM users"
    conn.query(sql, function (err, result) {
        res.send(result)
    })
})

app.delete('/:id', auth, (req, res) => {
    var sql = `SELECT * FROM users`
    conn.query(sql, function (err, result) {
        if (result.length == 1){
            res.send(405)
        }
        else{
            var sql = `DELETE FROM users WHERE id = ${req.params.id}`
            conn.query(sql)
            console.log("Berhasil dihapus")

            var sql = "SELECT * FROM users"
            conn.query(sql, function (err, result) {
                res.send(result)
            })
        }
    })
})

module.exports = app