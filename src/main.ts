console.log(" Olá Mundo")

//
/*1 - Para construir um servidor back-end e responder 
Vamos utilizar o EXPRESS */
import express from 'express'
import cors from 'cors'
import mysql from 'mysql2/promise'
//Criar o Objeto do tipo express 
const app = express ()

//incluir para ele receber json
app.use(express.json())//Middleware

/*incluir o CORS -> Quando a Gente tem outra porta fazendo */
app.use(cors())



import BancoMysql from './db/bancoMysql'






 /// Parte de Configuração dos Clientes feito por Mateus do Prado:
 
// Parte do Mateus - Listagem dos clientes e Inserindo eles:
//Listando os clientes:
app.get("/clientes", async (req, res) => {
    try{
        const banco = new BancoMysql();
        const result = await banco.listarClientes()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})

app.get("/clientes/:id", async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listarClientesPorId(req.params.id)
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})



//Inserindo clientes:
// Parte para inserir um cliente no Back-end:
app.post("/clientes", async (req, res) => {
   
   
    try{
        const {id,nome,sobrenome,idade,email} = req.body
        
        const banco = new BancoMysql();
        
        const cliente = {id:parseInt(id),nome,sobrenome,idade,email}
        const result = await banco.inserirClientes(cliente)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
   
   

});

app.delete("/clientes/:id",async (req,res) =>{
    try{
        const banco = new BancoMysql();

        const sqlQuery = "DELETE FROM clientes WHERE id = ?"
        const parametro = [req.params.id]

        const result = await banco.excluirClientes(req.params.id)
        

        res.status(200).send(result)
    }catch(e){
          console.log(e)
        res.status(500).send("Erro do servidor")
    }  

    console.log("Tentando excluir o cliente de id:", req.params.id)
    
})


app.put("/clientes/:id", async (req,res) =>{
    try{
        const {nome,sobrenome,idade,email} = req.body
        const banco = new BancoMysql();

        //const sqlQuery = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?"
        const cliente = {nome, sobrenome, idade, email}

        const result = await banco.alterarClientes(req.params.id, cliente)
        res.status(200).send(result)


    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
    console.log("Tentando alterar o cliente de id:",  req.params.id)
   
})














/// Parte de Configuração dos Perfumes feito por Marcos Antonio e Felipe Brito:
 
// Parte do Marcos - Listagem, Inserindo, alterando e removendo perfumes :
//Listando os perdumes:
app.get("/perfumes", async (req, res) => {
    try{
        const banco = new BancoMysql();
        const result = await banco.listarPerfumes()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})


app.get("/perfumes/:id", async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listarPerfumesPorId(req.params.id)
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})


//Inserindo perfume:
// Parte para inserir um perfume no Back-end:
app.post("/perfumes", async (req, res) => {
   
   
    try{
        const {id,nome,marca,fragrancia,volume,preco,imagem} = req.body
        
        const banco = new BancoMysql();
        
        const perfume = {id:parseInt(id),nome,marca,fragrancia,volume,preco,imagem}
        const result = await banco.inserirPerfumes(perfume)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
   
   

});
// Parte do Felipe - Deletando os perfumes e Alterando eles:
app.delete("/perfumes/:id",async (req,res) =>{
    try{
        const banco = new BancoMysql();

        const sqlQuery = "DELETE FROM clientes WHERE id = ?"
        const parametro = [req.params.id]

        const result = await banco.excluirPerfumes(req.params.id)
        

        res.status(200).send(result)
    }catch(e){
          console.log(e)
        res.status(500).send("Erro do servidor")
    }  

    console.log("Tentando excluir o perfume de id:", req.params.id)
    
})


app.put("/perfumes/:id", async (req,res) =>{
    try{
        const {nome,marca,fragrancia,volume,preco,imagem} = req.body
        const banco = new BancoMysql();

        //const sqlQuery = "UPDATE produtos SET nome = ?, marca = ?, fragrancia = ?, volume = ?, preco = ?, imagem = ? WHERE id = ?"
        const perfume = {nome, marca, fragrancia, volume, preco, imagem}

        const result = await banco.alterarPerfumes(req.params.id, perfume)
        res.status(200).send(result)


    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
    console.log("Tentando alterar o perfume de id:",  req.params.id)
   
})





//INICIAR o Servidor 
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
}) 