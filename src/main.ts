// LIVE SERVER é do FRONT-END
// QUEM É O LIVE SERVER DO BACK-END?

// 1 - Para construir um servidor back-end e responder
// Vamos utilizar o EXPRESS
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
//Criar um objeto do tipo express.
const app = express()
//incluir pra ele receber json
app.use(express.json())  //Middleware
//incluir o CORS -> QUANDO A GENTE TEM OUTRA PORTA FAZENDO REQUISIÇÃO PARA A PORTA DO SERVIDOR
app.use(cors())
//ROTAS

import BancoMysql from './db/bancoMysql'
import BancoMongo from './db/bancoMongo'

app.get("/produtos",async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listar()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})
app.get("/produtos/:id",async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listarPorId(req.params.id)
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})

app.post("/produtos",async(req,res)=>{
    try{
        const {id,nome,descricao,preco,imagem} = req.body
        console.log(id,nome,descricao,preco,imagem)
        const banco = new BancoMysql();

        const produto = {id:parseInt(id),nome,descricao,preco,imagem}

        const result = await banco.inserir(produto)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})

app.delete("/produtos/:id",async (req,res)=>{
    console.log("Tentando excluir o produto de id:",req.params.id)
    try{
        const sqlQuery = "DELETE FROM produtos WHERE id = ?"
        const parametro = [req.params.id]

        const banco = new BancoMysql();

        const result = await banco.excluir(req.params.id)

        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})
app.put("/produtos/:id",async (req,res)=>{
    console.log("Tentando alterar o produto de id:",req.params.id)
    try{
        const {nome,descricao,preco,imagem} = req.body
        //const sqlQuery = "UPDATE produtos SET nome=?,descricao=?,preco=?,imagem=? WHERE id = ?"
        const produto = {nome,descricao,preco,imagem}

        const banco = new BancoMysql();

        const result = await banco.alterar(req.params.id,produto)

        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }
})



//INICIAR O SERVIDOR
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
})