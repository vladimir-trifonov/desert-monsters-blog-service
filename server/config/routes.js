'use strict'

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.render('shared/layout')
    });

    require('../api/posts')(app);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end();
    })
}