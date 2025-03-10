console.log(" Olá Mundo")

//
/*1 - Para construir um servidor back-end e responder 
Vamos utilizar o EXPRESS */
import express, { Request, Response } from 'express';
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
 
// Parte de Listagem dos clientes e Inserindo eles:
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
        const {id,nome,sobrenome,idade,email,senha,classe} = req.body
        
        const banco = new BancoMysql();
        
        const cliente = {id:parseInt(id),nome,sobrenome,idade,email,senha,classe}
        const result = await banco.inserirClientes(cliente)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
   
   

});


//Login do cliente:
/*
app.post('/clientes', async (req: Request, res: Response) => {
    const { email, senha } = req.body;

    try {
        const banco = new BancoMysql();
        const { token, cliente } = await banco.loginCliente(email, senha);
        return res.json({ token, cliente });
    } catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
});
*/



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
        const {nome,sobrenome,idade,email,senha} = req.body
        const banco = new BancoMysql();

        //const sqlQuery = "UPDATE produtos SET nome = ?, descricao = ?, preco = ?, imagem = ? WHERE id = ?"
        const cliente = {nome, sobrenome, idade, email, senha}

        const result = await banco.alterarClientes(req.params.id, cliente)
        res.status(200).send(result)


    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
    console.log("Tentando alterar o cliente de id:",  req.params.id)
   
})














/// Parte de Configuração dos Alimentos:
 
// Parte de Listagem, Inserindo, alterando e removendo alimentos:
//Listando os alimentos:
app.get("/alimentos", async (req, res) => {
    try{
        const banco = new BancoMysql();
        const result = await banco.listarAlimentos()
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})


app.get("/alimentos/:id", async(req,res)=>{
    try{
        const banco = new BancoMysql();
        const result = await banco.listarAlimentosPorId(req.params.id)
        console.log(result)
        await banco.end()
        res.send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
})


//Inserindo Alimento:
// Parte para inserir um Alimento no Back-end:
app.post("/alimentos", async (req, res) => {
   
   
    try{
        const {id,nome,categoria,calorias,proteinas,carboidratos,gorduras,peso,data_cadastro,imagem} = req.body
        
        const banco = new BancoMysql();
        
        const alimento = {id:parseInt(id),nome,categoria,calorias,proteinas,carboidratos,gorduras,peso,data_cadastro,imagem}
        const result = await banco.inserirAlimentos(alimento)
        console.log(result)
        
        await banco.end()
        
        res.status(200).send(result)
    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
   
   

});
// Parte Deletando os alimentos e Alterando eles:
app.delete("/alimentos/:id",async (req,res) =>{
    try{
        const banco = new BancoMysql();

        const sqlQuery = "DELETE FROM alimentos WHERE id = ?"
        const parametro = [req.params.id]

        const result = await banco.excluirAlimentos(req.params.id)
        

        res.status(200).send(result)
    }catch(e){
          console.log(e)
        res.status(500).send("Erro do servidor")
    }  

    console.log("Tentando excluir o alimento de id:", req.params.id)
    
})


app.put("/alimentos/:id", async (req,res) =>{
    try{
        const {nome,categoria,calorias,proteinas,carboidratos,gorduras,peso,data_cadastro,imagem} = req.body
        const banco = new BancoMysql();

        //const sqlQuery = "UPDATE produtos SET nome = ?, marca = ?, fragrancia = ?, volume = ?, preco = ?, imagem = ? WHERE id = ?"
        const alimento = {nome,categoria,calorias,proteinas,carboidratos,gorduras,peso,data_cadastro,imagem}

        const result = await banco.alterarAlimentos(req.params.id, alimento)
        res.status(200).send(result)


    }catch(e){
        console.log(e)
        res.status(500).send("Erro do servidor")
    }  
    console.log("Tentando alterar o alimento de id:",  req.params.id)
   
})





//INICIAR o Servidor 
app.listen(8000,()=>{
    console.log("SERVIDOR INICIADO NA PORTA 8000")
}) 