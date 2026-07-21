const express = require("express");
const path = require("path");

const app = express();

app.use(express.urlencoded({ extended: true }));

require('./config/database');

const userRoutes = require('./routes/userRoutes');

app.use(userRoutes);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.render("index");
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});
app.get("/login", (req, res) => {
    res.render("auth/login");
});

app.get("/cadastro", (req, res) => {
    res.render("auth/cadastro");
});

app.get("/dashboard", (req, res) => {
    res.render("cliente/dashboard");
});

app.get("/admin", (req, res) => {
    res.render("admin/dashboard");
});