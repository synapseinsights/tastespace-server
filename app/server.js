import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser'
import logger from 'morgan'
import * as firebase from 'firebase/app';
import routes from './routes';


// Load environment variabels for the app
dotenv.config();

// Initialize the app
const app = express();

// Use ejs if we want to render templates with variables in them like jinja in flask
app.set('view engine', 'ejs');

// We also want to be able to send css, images, and other static files
app.use(express.static('views'));
app.set('views', __dirname + '/views');

// Giver server access to user form inputs and make it easy to access, e.g.
// req.body.nameOfForm
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Tell app to use a logger to when the server gets requests it auto logs to console
app.use(logger("dev"));

// Setup database (firebase)
const dbconfig = {
    apiKey: process.env.APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    databaseURL: process.env.DATABASEURL,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID
}
firebase.initializeApp(dbconfig);

// Set the default route
app.get('/', (req, res) => {
    res.render("home.ejs");});

// Quick demo on posting to the default route
app.post('/', (req, res) => {
    res.render("hello.ejs", { data: req.body.name});
});

// Register other routes
routes(app);

// Start the server
const port = process.env.PORT || 9000;
app.listen(port);
console.log(`Server listening on port ${port}`);
