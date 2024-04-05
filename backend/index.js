const express = require('express');
const app = express();
const connectDb = require('./db/db.js')
const dotenv = require('dotenv');



dotenv.config({ path: './config/.env' })
connectDb()

app.use(express.json());

app.listen(process.env.PORT, () => {
    console.log('server is running ' + process.env.PORT)
})


// app.use('/api/user', require('./routes/user.route.js'))
app.use('/api/auth', require('./routes/auth.route.js'))

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error"

    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    });
});





