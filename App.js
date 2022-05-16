var express = require("express");
var app = express();
var db = require("./bd/bd");
app.set("engine ejs", "ejs");
app.use(express.urlencoded({extended: false}));

// (1)consulta todos regitros para index.ejs
app.get("/", function (req, res) {

    // const sql = "SELECT * FROM Produtos ORDER BY CodProd desc";

    const sql = "CALL mostrar_produtos()";
    
    db.query(sql, [], function (err, rows) {
        
        if (err) {        
            return console.error(err.message);        
        }
        
        rows = rows[0];

        res.render("index.ejs", { dados: rows });    
    });
    
});

// (2)GET /inserir
app.get("/inserir", function (req, res) {

    res.render("inserir.ejs", { dados: {} });
    
});
    
// (2)POST /inserir    
app.post("/inserir", function (req, res) {

    const sql = "CALL InsertProdutos(?,?,?,?,?)";
    
    // const sql = "INSERT INTO Produtos (Descr, CodFor, CodCategoria, Preco, Unidades) VALUES (?, ?, ?, ?, ?)";
    
    const dadosMestre = [
        req.body.Descr, 
        req.body.CodFor, 
        req.body.CodCategoria, 
        req.body.Preco,
        req.body.Unidades
    ];
    
    db.query(sql, dadosMestre, function (err) {
    
        if (err) {        
            return console.error(err.message);        
        }
        
        res.redirect("/");
    
    });
    
});

// (3A)GET /edit/id
app.get('/editar/:id', function (req, res) {
    const idm = req.params.id;    
    const id = [idm];    

    

    const sqle = "CALL selecionar_produto(?)";   

    db.query(sqle, id, function (err, row) {    
        if (err) {    
            return console.error(err.message);    
        }   

        row = row [0];

        res.render("editar.ejs", {    
            dados: row,    
            CodProd: row[0].CodProd,    
            Descr: row[0].Descr,    
            CodFor: row[0].CodFor,    
            CodCategoria: row[0].CodCategoria,    
            Preco: row[0].Preco, 
            Unidades: row[0].Unidades  
        });   
    });    
});

// (3B)POST /edit/id_m
app.post("/editar/:id", function (req, res) {

    const CodProd = req.params.id; //recebe parâmetro id da pagina editar.ejs
    
    const dados = [
        CodProd,
        req.body.Descr, 
        req.body.CodFor, 
        req.body.CodCategoria, 
        req.body.Preco,
        req.body.Unidades,
    ];

    const sqle = "CALL UpdateProdutos(?,?,?,?,?,?)";

    // const sqle = "UPDATE Produtos SET Descr= ?,CodFor= ?,CodCategoria= ?,Preco= ?,Unidades= ? WHERE (CodProd= ?)";
    
    db.query(sqle, dados, function (err) {  

        if (err) {        
            return console.error(err.message);        
        }
        
        res.redirect("/");
    
    });
    
});

// (4A)GET /delete
app.get("/delete/:id_m", function (req, res) {

    const idm = req.params.id_m;    
    const query = [idm];    
    // const sql = "SELECT * FROM Produtos WHERE (CodProd= ?)"; 

    const sql = "CALL selecionar_produto(?)";

    db.query(sql, query, function (err, row) {   

        if (err) {    
            return console.error(err.message);    
        }    

        row = row[0];

        res.render("delete.ejs", {    
            dados: row,    
            CodProd: row[0].CodProd,    
            Descr: row[0].Descr,    
            CodFor: row[0].CodFor,    
            CodCategoria: row[0].CodCategoria,    
            Preco: row[0].Preco, 
            Unidades: row[0].Unidades    
        });    
    });    
});

// (4B) POST /delete
app.post("/delete/:id_m", function (req, res) {

    const idd = req.params.id_m;
    
    // const sql = "DELETE FROM Produtos WHERE CodProd= ?";

    const sql = "CALL DeleteProdutos(?)";
    
    db.query(sql, idd, function (err) {
    
        if (err) {        
            return console.error(err.message);        
        }
        
        res.redirect("/");
    
    });
    
});

app.listen(3000, () => {
    console.log(`Server started on port`)
})