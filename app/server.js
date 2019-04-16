import express from 'express';
import dotenv from 'dotenv';
import * as firebase from 'firebase/app';
import routes from './routes';


// Load environment variabels for the app
dotenv.config();

// Initialize the app
const app = express();

// Use ejs if we want to render templates with variables in them like jinja in flask
app.set('view engine', 'ejs');

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
    res.send("You're at the homepage!");
});

// Register other routes
routes(app);

// Start the server
const port = process.env.PORT || 9000;
app.listen(port);
console.log(`Server listening on port ${port}`);
