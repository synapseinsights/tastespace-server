module.exports = (app) => {
    app.route('/test')
        .get((req, res) =>{
            res.send("You're at the test route!")
        })
};