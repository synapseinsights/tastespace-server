import dotenv from 'dotenv';
// Load environment variables for the app
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser'
import logger from 'morgan'
import admin from 'firebase-admin';
import * as path from 'path'
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

// Serve files in the views folder as static and map the name 'view' to the full path location of the folder so it's always found regardless of where the node process is run from
app.use(express.static('views'));
app.set('views', path.join(__dirname, '/views'));
// Make the public folder available at the root of the app so that files can be access via /images/pic.png or js/somefile.js
app.use(express.static(path.join(__dirname, 'public')));

// Giver server access to user form inputs and make it easy to access, e.g.
// req.body.nameOfForm
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Tell app to use a logger to when the server gets requests it auto logs to console
app.use(logger("dev"));

// Set the default route
app.get('/', (req, res) => {
    res.render("home.ejs");});

// Register other routes
routes(app);

// Start the server
const port = process.env.PORT || 9000;
app.listen(port);
console.log(`Server listening on port ${port}`);
