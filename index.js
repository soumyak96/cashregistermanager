//import modules
const express = require('express');
const { json,urlencoded } = express;
const morgan = require('morgan');
const cors = require('cors');
const path = require('path')
require('dotenv').config();
const mongoose = require('mongoose');

//app
const app = express();

//db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected')).catch((err) => console.log('Database connection Error', err));


app.use(express.static(path.join(__dirname, 'client', '')))


//middleware
app.use(morgan('dev'));
app.use(cors({origin: true, credentials: true}));
app.use(json());
app.use(urlencoded({ extended: false }));

//routes
const mainRoutes = require('./routes/main');
app.use('/', mainRoutes);

//port
const port = process.env.PORT || 8080;

//listener
const server = app.listen(port, () => console.log(`Server is running on port ${port}`));