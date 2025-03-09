import mysql, { Connection, RowDataPacket } from 'mysql2/promise';
import bcrypt from 'bcrypt';
var { expressjwt: jwt } = require("express-jwt");



class BancoMysql {
    // Propriedade
    private conexao: Promise<Connection>;

    // Métodos
    constructor() {
        this.conexao = mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "corinthians",
            database: process.env.dbname ? process.env.dbname : "bancoca",
            port: process.env.dbport ? parseInt(process.env.dbport) : 3306
        });
    }

    async getConnection() {
        const conn = await this.conexao; 
        return conn;
    }

    async end() {
        const conn = await this.conexao; 
        await conn.end();
    }

    async listarAlimentos(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from alimentos");
        return result
    }
    async listarAlimentosPorId(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "SELECT * FROM alimentos WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro) as RowDataPacket[];
        //Return the first element of the array
        return result[0]
    }

    async inserirAlimentos(alimento:{id:number,nome:string,categoria:string,calorias:string,proteinas:string,carboidratos:string,gorduras:string,peso:string,data_cadastro:string,imagem:string}){

        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO alimentos (id,nome,categoria,calorias,proteinas,carboidratos,gorduras,peso,data_cadastro,imagem) VALUES (?,?,?,?,?,?,?,?,?,?)"
        const parametro = [alimento.id,alimento.nome,alimento.categoria,alimento.calorias,alimento.proteinas,alimento.carboidratos,alimento.gorduras,alimento.peso,alimento.data_cadastro,alimento.imagem]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluirAlimentos(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM alimentos WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterarAlimentos(id:string,alimento:{id?:string,nome:string,categoria:string,calorias:string,proteinas:string,carboidratos:string,gorduras:string,peso:string,data_cadastro:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE alimentos SET nome=?,categoria=?,calorias=?,proteinas=?,carboidratos=?,gorduras=?,peso=?,data_cadastro=?,imagem=? WHERE id = ?"
        const parametro = [alimento.nome,alimento.categoria,alimento.calorias,alimento.proteinas,alimento.carboidratos,alimento.gorduras,alimento.peso,alimento.data_cadastro,alimento.imagem,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }






    
    //Parte dos Clientes
    async listarClientes(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from clientes");
        return result
    }

    async listarClientesPorId(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "SELECT * FROM clientes WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro) as RowDataPacket[];
        //Return the first element of the array
        return result[0]
    }


    async loginCliente(email: string, senha: string) {
        const conn = await this.getConnection();
    
        // Consulta para buscar o cliente pelo email
        const sqlQuery = "SELECT * FROM clientes WHERE email = ?";
        const parametro = [email];
        const [rows] = await conn.query(sqlQuery, parametro) as RowDataPacket[];
    
        // Verifica se o cliente foi encontrado
        if (rows.length === 0) {
            throw new Error('Cliente não encontrado');
        }
    
        const cliente = rows[0];
    
        // Compara a senha fornecida com a senha armazenada
        const senhaValida = await bcrypt.compare(senha, cliente.senha);
        if (!senhaValida) {
            throw new Error('Senha inválida');
        }
    
        // Gera um token JWT
        const token = jwt.sign({ id: cliente.id }, 'seu-segredo', { expiresIn: '1h' });
    
        return { token, cliente }; // Retorna o token e os dados do usuário, se necessário
    }



    async inserirClientes(cliente:{id:number,nome:string,sobrenome:string,idade:string,email:string,senha:string,classe:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO clientes (id,nome,sobrenome,idade,email,senha,classe) VALUES (?,?,?,?,?,?,?)"
        const parametro = [cliente.id,cliente.nome,cliente.sobrenome,cliente.idade,cliente.email,cliente.senha,cliente.classe]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }





    async excluirClientes(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM clientes WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterarClientes(id:string,cliente:{id?:string,nome:string,sobrenome:string,idade:string,email:string,senha:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE clientes SET nome=?,sobrenome=?,idade=?,email=?,senha=? WHERE id = ?"
        const parametro = [cliente.nome,cliente.sobrenome,cliente.idade,cliente.email,cliente.senha,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
}

export default BancoMysql;