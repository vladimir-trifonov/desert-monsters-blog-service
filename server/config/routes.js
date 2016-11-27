'use strict'

module.exports = (app) => {
    require('../api/posts')(app);

    app.all('*', (req, res) => {
        res.status(404);
        res.send('Not Found');
        res.end();
    })
}