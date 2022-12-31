const express = require('express');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { readFileSync } = require('fs');
const app = express();
app.use('/resources', express.static(path.join(__dirname, '/resources')));
app.set('view engine', 'ejs');

const {Client}=require("pg");
var client= new Client({database:"pizza_point",
    user:"daniel", 
    password:"parola", 
    host:"localhost",
    port:5432});
client.connect();

obGlobal={
  errors:null,
  images:null,
  types:null,
  products:null,
  options:null
}

function loadImages(){
  var fileContent = fs.readFileSync(__dirname+"/resources/data/gallery.json").toString("utf8");
  var object = JSON.parse(fileContent);
  var dim_medium = 300;
  var dim_small = 200;
  obGlobal.images = object.images;
  console.log(object.images);

  obGlobal.images.forEach(function (elem){
    [fileName, extension] = elem.path.split(".");
    elem.path = object.folder_path + "/" + elem.path;

    if(!fs.existsSync(__dirname+"/"+object.folder_path+"/medium/")){
        fs.mkdirSync(__dirname+"/"+object.folder_path+"/medium/");
    }
    elem.medium_path = object.folder_path+"/medium/"+fileName+".webp";
    sharp(__dirname+"/"+elem.path).resize(dim_medium).toFile(__dirname+"/"+elem.medium_path);
    
    if(!fs.existsSync(__dirname+"/"+object.folder_path+"/small/")){
      fs.mkdirSync(__dirname+"/"+object.folder_path+"/small/");
    }
    elem.small_path = object.folder_path+"/small/"+fileName+".webp";
    sharp(__dirname+"/"+elem.path).resize(dim_small).toFile(__dirname+"/"+elem.small_path);
  });
}
loadImages();

function readErrors(){
  const data = readFileSync('./resources/data/errors.json');
  obGlobal.errors = JSON.parse(data);
}
readErrors();

app.use("/*", function(req, res, next){
  client.query("select * from unnest(enum_range(null::tipuri_ingrediente))", function(err, rezCateg){
    if(err){
        console.log(err);
        renderError(res, 2);
    }
    else{
        my_query=""
        if (req.query.tip)
          my_query+=` and tip_produs='${req.query.tip}'`
        client.query("select * from meniu where 1=1 " + my_query , function(err, rez){
            if(err){
                console.log(err);
                renderError(res, 2);
            }
            else{
                client.query("select * from unnest(enum_range(null::optiuni_meniu))", function(err, rezType){
                  if(err){
                      console.log(err);
                      renderError(res, 2);
                  }
                  else{
                      obGlobal.types=rezType.rows;
                      obGlobal.products=rez.rows;
                      obGlobal.options=rezCateg.rows;
                      console.log(obGlobal.products);
                      // res.render("pages/products", {products:rez.rows, options:rezCateg.rows});
                  }
                });
            }
        });
    }
  });
  res.locals.types=obGlobal.types;
  next();
});

app.get(['/', '/index', '/home'], (req, res) => {
  const userIp = req.ip;
  res.render('pages/index', {
    userIp: userIp,
    images: obGlobal.images,
    types: obGlobal.types,
    products: obGlobal.products
  });
});

app.get("/gallery", (req, res) => {
  res.render('pages/gallery.ejs', {
    images: obGlobal.images,
    types: obGlobal.types
  });
});

app.get("/products",function(req, res){
  res.render("pages/products", {products:obGlobal.products, options:obGlobal.options});
  console.log(obGlobal.products);
});

app.get("/product/:id",function(req, res){
  console.log(req.params);
  client.query("select * from meniu where id="+req.params.id, function(err, rez){
      if(err){
          console.log(err);
          renderError(res, 2);
      }
      else{
          res.render("pages/product", {prod:rez.rows[0], options: []});
          console.log(rez);
      }
  });
});

app.get("/*.ejs",function(req, res){
  console.log("url:", req.url);
  res.status(403).render('pages/error', {
    title: obGlobal.errors ? obGlobal.errors.forbidden.title : 'Error fetching JSON',
    text: obGlobal.errors ? obGlobal.errors.forbidden.text : 'Error fetching JSON',
    image: obGlobal.errors ? obGlobal.errors.forbidden.image : 'Error fetching JSON',
    credits: obGlobal.errors ? obGlobal.errors.forbidden.credits  : 'Error fetching JSON'
  });
  res.locals.types = obGlobal.types;
});

app.get('/*', (req, res) => {
  res.render('pages' + req.url, (err, result) => {
    // daca pagina nu exista mesajul de eroare este Failed to lookup view
    if(err){
      if (err.message.includes("Failed to lookup view")) {
        res.status(404).render('pages/error', {
          title: obGlobal.errors ? obGlobal.errors.notFound.title : 'Error fetching JSON',
          text: obGlobal.errors ? obGlobal.errors.notFound.text : 'Error fetching JSON',
          image: obGlobal.errors ? obGlobal.errors.notFound.image : 'Error fetching JSON',
          credits: obGlobal.errors ? obGlobal.errors.notFound.credits  : 'Error fetching JSON'
        });
      }
    }
    else {
      res.send(result);
    }
  })
  res.locals.types = obGlobal.types;
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});