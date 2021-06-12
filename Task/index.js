const express = require('express');
const app = express();
const bodyParse = require('body-parser');
const port = 3000;

app.use(bodyParse.urlencoded({extended : true}));

app.get("/",(req, res) =>{
    res.sendFile(__dirname + "/index.html");
});
app.post("/",(req, res)=>{
    var name = req.body.
})
 
app.listen(port, () =>{
    console.log("server is running at port:${port}");
});