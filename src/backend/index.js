//=======[ Settings, Imports & Data ]==========================================

var PORT    = 3000;

var express = require('express');
var app     = express();
var utils   = require('./mysql-connector');

// to parse application/json
app.use(express.json()); 
// to serve static files
app.use(express.static('/home/node/app/static/'));

var dato =require("./datos.json");


//=======[ Main module code ]==================================================



//esta api realiza una peticion de los elemtos del archivo datos,json
app.get('/devices/', function(req, res, next) {
   
    res.json(dato);
});

//esta api es para modificar el estado on/off de los dispositvos filtra primeramente ID del dispositivo en especifico y luego moifica el state 
app.post('/devices/',function(req, res) {
    console.log(req.body);
    
    let datosfiltrados = dato.filter(item=> item.id == req.body.id);
    if(datosfiltrados.length>0)
    {
        datosfiltrados[0].state=req.body.state;
    }
    console.log(datosfiltrados);
    res.json(datosfiltrados);
});
//esta api es para las modificaciones de algun dispositivo en especifico de igual manera filtra el parametro ID del disposotivo en especifico y luego modifica sus datos
app.post('/editdev/',function(req, res) {
    console.log(req.body);
    
    let datosfiltrados = dato.filter(item=> item.id == req.body.id);
    if(datosfiltrados.length>0)
    {

        datosfiltrados[0].name=req.body.name;
        datosfiltrados[0].description=req.body.description;
    }
    console.log(req.body);
    res.json(datosfiltrados);
});

//
//esta api es para insertar nuevos dispositivos 
app.post('/insert/', function(req, res, next) {
    
    var count = Object.keys(dato).length +1;
    formdata =  { "id": count, "name": `${req.body.name}`, "description": `${req.body.description}`, "state": 1, "type": 0};

    dato.push(formdata);
    res.json(dato);
});
//esta api es para eliminar dispositivos se filtra el parametro ID del dispositivo el cual queremos eliminar y luego recorre a todos los elementos del datos.json para recorrer los id los demas dispositivos 
app.post('/delet/', function(req, res, next) {
    
    
    dato.splice(req.body.id - 1,1)
   // let datosfiltrados = dato.filter(item=> item.id == req.body.id);
    for (let i=req.body.id-1;i<Object.keys(dato).length;i++)
    {
        dato[i].id=dato[i].id-1;
        console.log(dato[i])
    }
});
//
app.listen(PORT, function(req, res) {
    console.log("NodeJS API running correctly");
});

//=======[ End of file ]=======================================================
