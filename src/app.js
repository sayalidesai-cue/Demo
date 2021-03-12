const express = require('express')
const bp = require('body-parser');
var cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;

const dbConnection = require("./db/db-connection");
app.use(bp.urlencoded({ extended: false }));
app.use(bp.json());

const loadDb = async () => {
    await dbConnection.getDB();
    let db = dbConnection.db
    db.sequelize.sync().then(() => { })

    const passport = require('./middleware/authentication/passport-config')
    //registers our authentication routes with Express.
    require('../src/middleware/routing')(app, passport);

    //initializes the passport configuration.
    app.use(passport.initialize());
    console.log('connected to db');  
}

loadDb();
var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200 
  }

app.use(cors(corsOptions));

app.listen(port, err => {
    if (err) console.error(err);
    console.log(`Listening for Requests on port: ${port}`);
});

module.exports =  app 