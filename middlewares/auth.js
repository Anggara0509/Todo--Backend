const mysql = require('mysql')

const conn = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "TodoList"
})

module.exports = function(req, res, next){
    const username = req.headers.username
    const password = req.headers.password

    const sql = `SELECT * FROM users WHERE username = "${username}" AND password = "${password}"`;
    conn.query(sql, function (err, result) {
        if (result.length > 0){
            next()
        }
        else{
            res.send(401)
        }
    })
}