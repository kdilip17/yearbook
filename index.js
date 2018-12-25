// app.js
const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//

// Set up mongoose connection
const mongoose = require('mongoose');
let dev_db_url = 'mongodb://dilip:abcd1234@ds047438.mlab.com:47438/yearbook'
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//

const category = require('./lib/routes/category.route') // Imports routes for the category
const budgets = require('./lib/routes/budget.route') // Imports routes for the budget
const budgetItems = require('./lib/routes/budgetitems.route') // Imports routes for the budget items

app.use('/category',category);
app.use('/budget',budgets);
app.use('/items',budgetItems);

let port = 7788;

app.listen(port, () => {
     console.log('Server is up and running on port numner  - http://localhost:' + port);
});

