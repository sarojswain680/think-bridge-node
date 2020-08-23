
const express = require('express');
const bodyParser = require('body-parser');
const dbConfig = require('./Config/config');
const mongoose = require('mongoose');
var cors = require('cors');

const PORT = process.env.PORT || 3000 ;

mongoose.Promise = global.Promise;
// create express app
const app = express();

app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


mongoose.connect(dbConfig.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
   return console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

// define a simple route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});

require('./app/routes/routes')(app);
// listen for requests
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});


