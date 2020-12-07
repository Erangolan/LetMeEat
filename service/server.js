require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;
require('dotenv').config();
app.set('port', port);

app.use('/', express.static('./public'));
app.use(
  (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.set('Content-Type', 'application/json');
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
    
//Routes
const recipesRoutes = require("./routes/recipes");
const usersRoutes = require("./routes/user");
    
    
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, token"
    );
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
    
//Routes to handle req:
app.use("/recipes", recipesRoutes);
app.use("/user", usersRoutes);


// Middleware
app.use(bodyParser.json());

    

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
});
      
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(port, () => console.log('server listening on port: ', port));