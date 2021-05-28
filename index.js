const express = require('express')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))



const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'TodoList'
})



conn.connect(function(err){
    if(err)
        throw err
})
app.get('/', function(req,res){
    res.send(`
        <form action="/todo" method="post">
            <input name="deskripsi" />
            <button>Add</button>
        </form>
    `)
})
app.post('/todo',function(req,res){
    const sql = `INSERT INTO todolist(deskripsi) values(\'${req.body.deskripsi}\')`
    conn.query(sql,function(err){
        if(err) 
            throw err
        console.log('menambahkan data')
    })
    res.end()
})

app.get('/todo',function(req,res){
    const sql = 'SELECT * FROM todolist'
    conn.query(sql,function(err,result){
        if(err)
            throw err
        res.send(result)
        console.log(result)
    })
})

app.delete('/todo/:id',function(req,res){
    const query = `DELETE FROM todolist WHERE id=\'${req.params.id}\'`
    conn.query(query,function(err,result){
        if(err)
            throw err
        res.send("Berhasil Hapus")
    })
})

app.listen(3000, () => {
    console.log('sudah connect BosKU')
})