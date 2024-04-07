import mongoose from 'mongoose';


const connectDb = async () => {

    try {
        await mongoose.connect('mongodb+srv://juber13:juberkhan@cluster0.j8nghxi.mongodb.net/Broker')
            .then(() => console.log('db connedted')).catch((err) => console.log(err))
    } catch (err) {
        console.log(err)
    }
}

export default  connectDb;