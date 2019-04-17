// We're exporting a function that takes as input an express app and adds routes to it
import isAuthenticated from './controllers/auth.js';

module.exports = (app) => {
    
    app.post('/', (req, res) => {
        res.render("hello.ejs", { data: req.body.name})
    })

    app.get('/test', (req, res) => {
        res.send("You're at the test route!")
    })


};