let express = require('express');

let app = express();

app.get('/', (req, res) => {

    res.send('Welcome to the Home Page');

});

app.get('/careerdevs', (req, res) => {

    res.send('Helloooo CareerDevs!');

});


app.listen(3000, () => {

    console.log('Application listening on port 3000');

});