projectData = {};

const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use(cors());


app.use(express.static('website'));

const port = 8080
app.listen(port, ()=>{
    console.log(`listening on port : ${port}`)
});

//routes

app.get('/all' , (req,res)=>{
    res.send(projectData)
       .status(200);
});

app.post('/add' , (req,res)=>{
    projectData = req.body;
    res.send(projectData)
       .status(200);
})