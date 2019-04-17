import dotenv from 'dotenv';
// Load environment variabels for the app
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import * as path from 'path'
import admin from 'firebase-admin';
import routes from './routes';

// Setup firebase administration
const firebaseAdmin = admin.initializeApp({
    credential: admin.credential.cert({
        "type": process.env.FIREBASE_TYPE,
        "project_id": process.env.FIREBASE_PROJECT_ID,
        "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID,
        "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        "client_email": process.env.FIREBASE_CLIENT_EMAIL,
        "client_id": process.env.FIREBASE_CLIENT_ID,
        "auth_uri": process.env.FIREBASE_AUTH_URI,
        "token_uri": process.env.FIREBASE_TOKEN_URI,
        "auth_provider_x509_cert_url": process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
        "client_x509_cert_url": process.env.FIREBASE_CLIENT_X509_CERT_URL
    }),
    databaseURL: "https://tastespace-185c5.firebaseio.com"
});

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
