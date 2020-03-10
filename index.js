const express =  require('express');
const app = express();
const bcrypt  = require('bcryptjs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const postRoutes = require('./routes/posts');
dotenv.config();


//Connect To Database

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser : true},() => console.log('Db Connected!'));

//Import routes
 const authRoute = require('./routes/auth');

 app.use(express.json());

 //Route Middleware

 app.use('/api/user', authRoute);
 app.use('/api/posts',postRoutes);



app.listen(4000, () => console.log('Server Up and Running'));