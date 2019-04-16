# Tastespace-server

This repo contains the code for the backend nodejs server for any frontend apps. It's a simple node app built using express for setup and routing, and firebase for authorizing, reading, and writing data. 

## Running the server locally

`npm start` or `npm run start`  

Either command will launch a local server, by default on port 9000 (this can be changed in the `.env` file). Simply go to `localhost:9000` to see the app.

## Developing the server locally

`npm run dev`  

This will do the same as above, but the server will auto-restart when any new changes to files are made. Simply refresh the browser to see the latest changes. 

---

## File description/layout

`package.json` - defines dependencies and `npm` commands for running the app (like `requirements.txt` in python)  
`package-lock.json` - a more detailed version of the above, designed to be put under version control  
`server.js` - core setup of the app (registering routes, port, database, etc)  
`routes.js` - location of the all the API endpoints  
`controllers/` - folder for different controller for managing database access  
`models/` - folder for various collection schemas in firebase  
`.env` - config file for storing sensitive data (e.g. db credentials) or global config options (e.g. server port); this file is _not_ under version control for security reasons

## Dependency descriptions  

1. `dotenv` [dontenv](https://www.npmjs.com/package/dotenv) allows us to load app configuration files from a `.env` file in the root of the app directory
2. `express` [express](https://expressjs.com/en/guide/routing.html) is the core framework for server and route creation (like Flask or Sanic)
3. `firebase` [firebase](https://www.npmjs.com/package/firebase) is for database read/write operations
4. `firebase-admin` [firebase-admin](https://www.npmjs.com/package/firebase-admin) is for database configuration and user authorization
5. `babel` and `babel-preset-env` 

### Dependencies we might need?

1. `cors` [cors](https://www.npmjs.com/package/cors) for cross-origin requests
2. `ejs` [ejs](https://www.npmjs.com/package/ejs) for dynamic templating
3. `body-parser` [body-parser](https://www.npmjs.com/package/body-parser) for parsing incoming request bodies 
    


