const express = require("express");
const router = express.Router();
const conn = require("../config/db")

// 1. 회원가입 로직  
router.post("/register",(req,res)=>{
    let {id,pw,nick} = req.body;
    let sql = "insert into member values (?,?,?)"
    conn.query(spl,[id,pw,nick],(err,rows)=>{
        console.log("DB insert:",row);
        if(rows){
            res.redirect("/")
        }else{
            res.send("alert('회원가입실패')")
        }
    })
})

// 2. 로그인 로직
router.post("/login",(req,res)=>{
    let {id,pw} = req.body;
    let sql = "select * from member where id = ? and pw = ?"
    conn.query(sql,[id,pw],(err,rows)=>{
        if(rows.length > 0){
            console.log("로그인성공");
            req.session.nick = row[0].nick
            res.redirect("/")
        }else{
            console.log("로그인 실패");
        }
    })
})

// 3.회원수정 로직 - 수정 
router.post("/updateRegister",(req,res)=>{
    let {id,pw,nick} = req.body;
    let sql = "updateRogister member set nick =? where pw=?"
    conn.query(sql,[nick,pw],(err,rows)=>{
        if(rows.affectedRows > 0){
            console.log("변경성공");
            res.redirect("/")
        }else{
            console.log("변경 실패");
        }
    })
})

// 4. 로그아웃
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.redirect("/")
})

module.exports = router;