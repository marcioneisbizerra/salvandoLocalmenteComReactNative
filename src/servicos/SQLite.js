import * as SQLite from "expo-sqlite"

function abreConexao(){
    const database = SQLite.openDatabase("db.db")
    console.log("Conexao ao banco de dados")
    return database
}

export const db = abreConexao()