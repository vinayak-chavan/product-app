require('./db/connection');
const dotenv = require('dotenv');
const express = require('express');
const userRoutes = require('./routes/user.routes');
const productRoutes = require('./routes/product.routes');

const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.use('/', userRoutes)
app.use('/', productRoutes);

app.listen(port, () => {
    console.log(`connection is live at port ${port}`);
});