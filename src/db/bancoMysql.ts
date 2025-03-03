import mysql,  { Connection, RowDataPacket } from 'mysql2/promise';

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

    async listar(){
        const conn = await this.getConnection()
        const [result, fields] = await conn.query("SELECT * from produtos");
        return result
    }
    async inserir(produto:{id:number,nome:string,descricao:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "INSERT INTO produtos (id,nome,descricao,preco,imagem) VALUES (?,?,?,?,?)"
        const parametro = [produto.id,produto.nome,produto.descricao,produto.preco,produto.imagem]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async excluir(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "DELETE FROM produtos WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async alterar(id:string,produto:{id?:string,nome:string,descricao:string,preco:string,imagem:string}){
        const conn = await this.getConnection()
        const sqlQuery = "UPDATE produtos SET nome=?,descricao=?,preco=?,imagem=? WHERE id = ?"
        const parametro = [produto.nome,produto.descricao,produto.preco,produto.imagem,id]
        const [result, fields] = await conn.query(sqlQuery,parametro);
        return result
    }
    async listarPorId(id:string){
        const conn = await this.getConnection()
        const sqlQuery = "SELECT * FROM produtos WHERE id = ?"
        const parametro = [id]
        const [result, fields] = await conn.query(sqlQuery,parametro) as RowDataPacket[];
        //Return the first element of the array
        return result[0]
    }
}

export default BancoMysql;