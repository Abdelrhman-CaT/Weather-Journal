/*
    Author: Abdelrahman Hany
    Created on: 22-Sep-21
*/

let projectData = {};

const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express(); 
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json()); 
app.use(express.static("website"));

const port = 5000 ; 

const listeningVerify = () => {
    console.log(`Server is running at: http://localhost:${port}`); 
};


// GET request handler
app.get( "/weatherdata" , (req, res, next) =>{
    res.send(projectData); 
}); 

// POST request handler
app.post( "/weatherdata" , (req, res, next) =>{
    projectData = req.body;
}); 

const server = app.listen(port, listeningVerify); 