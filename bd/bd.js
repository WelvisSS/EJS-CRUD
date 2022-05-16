var mysql = require("mysql");

var conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "empresax",
    multipleStatements: true
});

conexao.connect();
module.exports = conexao;