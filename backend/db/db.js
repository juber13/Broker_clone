const mongoose = require('mongoose');


const connectDb = async() => {
    try{
        await mongoose.connect(process.env.DB_URL)
        .then(() =>  console.log('db connedted')).catch( (err) => console.log(err))
    }catch(err){
        console.log(err)
    }
}


module.exports = connectDb;