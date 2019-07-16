const express = require("express");
const path = require("path");
const logger = require("morgan");
const router = require("./routes/root");
const app = express();

app.set('view engine','ejs');

app.use(express.urlencoded({extended: true}));


app.use(express.static(path.join(__dirname, "public")));

app.use((req,res,next)=>{
    next();
})

// roots ----------------------------
app.use("/", router);

const PORT = 4545;
const HOSTNAME = 'localhost';

app.listen(PORT, HOSTNAME,() =>{
    console.log(`listening on hostname:port => ${HOSTNAME}:${PORT}`);
})