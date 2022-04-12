const express = require('express');
const routes = require('./routes')
const db = require('./config/connection');

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(routes);

app.listen(PORT, () => {
    db.once('open', () => {
        console.log('API server running on port ${PORT}!');
    });
});
