var express = require('express');
var path = require('path');
var serveStatic = require('serve-static');
app = express();

app.use(express.json());

const bodyParser = require("body-parser");

var cors = require('cors')

app.use(cors())
app.use(
    bodyParser.urlencoded({
        extended: false
    })
);

// Then we'll pull in the database client library
const MongoClient = require("mongodb").MongoClient;

// Util is handy to have around, so thats why that's here.
const util = require('util')
// and so is assert
const assert = require('assert');

const mongoose=require('mongoose')



// Now lets get cfenv and ask it to parse the environment variable
const cfenv = require('cfenv');

// load local VCAP configuration  and service credentials
let vcapLocal;
try {
    vcapLocal = require('./vcap-local.json');
    console.log("Loaded local VCAP");
} catch (e) {
    // console.log(e)
}

const appEnvOpts = vcapLocal ? {
    vcap: vcapLocal
} : {}

const appEnv = cfenv.getAppEnv(appEnvOpts);

// Within the application environment (appenv) there's a services object
let services = appEnv.services;

// The services object is a map named by service so we extract the one for MongoDB
let mongodbServices = services["databases-for-mongodb"];


// This check ensures there is a services for MongoDB databases
assert(!util.isUndefined(mongodbServices), "App must be bound to databases-for-mongodb service");

// We now take the first bound MongoDB service and extract it's credentials object
let mongodbConn = mongodbServices[0].credentials.connection.mongodb;

// Read the CA certificate and assign that to the CA variable
let ca = [Buffer.from(mongodbConn.certificate.certificate_base64, 'base64')];

// We always want to make a validated TLS/SSL connection
let options = {
    ssl: true,
    sslValidate: true,
    sslCA: ca,
    useNewUrlParser: true 
};

// Extract the database username and password
let authentication = mongodbConn.authentication;
let username = authentication.username;
let password = authentication.password;

// Extract the MongoDB URIs
let connectionPath = mongodbConn.hosts;
let connectionString = `mongodb://${username}:${password}@${connectionPath[0].hostname}:${connectionPath[0].port},${connectionPath[1].hostname}:${connectionPath[1].port}/?replicaSet=replset`;
console.log(connectionString)
// We want to extract the port to publish our app on


// This is a global variable we'll use for handing the MongoDB client around
let mongodb;

// This is the MongoDB connection. From the application environment, we got the
// credentials and the credentials contain a URI for the database. Here, we
// connect to that URI, and also pass a number of SSL settings to the
// call. Among those SSL settings is the SSL CA, into which we pass the array
// wrapped and now decoded ca_certificate_base64,
MongoClient.connect(connectionString, options, function (err, db) {
    // Here we handle the async response. This is a simple example and
    // we're not going to inject the database connection into the
    // middleware, just save it in a global variable, as long as there
    // isn't an error.
    if (err) {
        console.log(err);
    } else {
        // Although we have a connection, it's to the "admin" database
        // of MongoDB deployment. In this example, we want the
        // "examples" database so what we do here is create that
        // connection using the current connection.
        mongodb = db.db("User_Info");
    }
})

// mongoose.connect(connectionString)
//     .then(()=>console.log("Connected to Mongodb..."))
//     .catch(err=>console.log("Could not Connect..."))


// const UserSchema = new mongoose.Schema({
//     username: String,
//     password: String,
//     first_name: String,
//     last_name: String
// })
// const User= mongoose.model('User',UserSchema)

// async function createUser(){
//     const user= new User({
//         username: 'anikal2001@gmail.com',
//         password:'Loliedady1',
//         first_name: 'Anirudh',
//         last_name: 'Kalia'
//     })
//     const result = await result.save;
//     console.log(result);
// }
// createUser();



app.use(serveStatic(__dirname + "/dist"));
var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);

