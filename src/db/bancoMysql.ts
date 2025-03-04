import mysql, { Connection, RowDataPacket } from 'mysql2/promise';

class BancoMysql {
    // Propriedade
    private conexao: Promise<Connection>;

    // Métodos
    constructor() {
        this.conexao = mysql.createConnection({
            host: process.env.dbhost ? process.env.dbhost : "localhost",
            user: process.env.dbuser ? process.env.dbuser : "root",
            password: process.env.dbpassword ? process.env.dbpassword : "",
            database: process.env.dbname ? process.env.dbname : "banco1022b",
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

    async listarPerfumes(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from perfumes");
        return result
    }
    async listarPerfumesPorId(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "SELECT * FROM perfumes WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro) as RowDataPacket[];
        //Return the first element of the array
        return result[0]
    }

    async inserirPerfumes(perfume:{id:number,nome:string,marca:string,fragrancia:string,volume:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO perfumes (id,nome,marca,fragrancia,volume,preco,imagem) VALUES (?,?,?,?,?,?,?)"
        const parametro = [perfume.id,perfume.nome,perfume.marca,perfume.fragrancia,perfume.volume,perfume.preco,perfume.imagem]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluirPerfumes(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM perfumes WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterarPerfumes(id:string,perfume:{id?:string,nome:string,marca:string,fragrancia:string,volume:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE perfumes SET nome=?,marca=?,fragrancia=?,volume=?,preco=?,imagem=? WHERE id = ?"
        const parametro = [perfume.nome,perfume.marca,perfume.fragrancia,perfume.volume,perfume.preco,perfume.imagem,id]
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



    async inserirClientes(cliente:{id:number,nome:string,sobrenome:string,idade:string,email:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO clientes (id,nome,sobrenome,idade,email) VALUES (?,?,?,?,?)"
        const parametro = [cliente.id,cliente.nome,cliente.sobrenome,cliente.idade,cliente.email]
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
    async alterarClientes(id:string,cliente:{id?:string,nome:string,sobrenome:string,idade:string,email:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE clientes SET nome=?,sobrenome=?,idade=?,email=? WHERE id = ?"
        const parametro = [cliente.nome,cliente.sobrenome,cliente.idade,cliente.email,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
}

export default BancoMysql;