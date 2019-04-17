// We're exporting a function that takes as input an express app and adds routes to it
import isAuthenticated from './auth.js';

module.exports = (app) => {
    app.route('/test')
        .get((req, res) =>{
            res.send("You're at the test route!")
        })
};