
const express =  require('express')
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const mysql = require('mysql')
var conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TodoList"
});

app.post('/', (req, res) => {
    var sql = `INSERT INTO todolist (deskripsi) VALUES ("${req.body.deskripsi}")`
	conn.query(sql, function (err, result) {
        if (err) throw err
        console.log("Berhasil menambah")

        var sql = "SELECT * FROM todolist"
        conn.query(sql, function (err, result) {
            res.send(result)
        })
    })
})

app.get('/', (req, res) => {
    var sql = "SELECT * FROM todolist"
    conn.query(sql, function (err, result) {
        res.send(result)
    })
})

app.delete('/:id', (req, res) => {
    var sql = `DELETE FROM todolist WHERE id = ${req.params.id}`
    conn.query(sql, function (err, result) {
        if (err) throw err
        console.log("berhasil hapus")

        var sql = "SELECT * FROM todolist"
        conn.query(sql, function (err, result) {
            res.send(result)
        })
    })
})

module.exports = app;