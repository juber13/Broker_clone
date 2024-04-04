const express = require('express');
const app = express();
const connectDb  = require('./db/db')
const dotenv = require('dotenv');



dotenv.config({path : './config/.env'})
connectDb()

app.use(express.json());

app.use('/api/user', require('./routes/user.route'))
app.use('/api/auth', require('./routes/auth.route.js'))


app.listen(process.env.PORT, () => {
    console.log('server is running ' + process.env.PORT)
})




