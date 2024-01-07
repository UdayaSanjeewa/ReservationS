import mongoose, { connect } from "mongoose";

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log('Database Connected Successfully');
    } catch (error) {
        console.log('Database not connected');
    }
}

export default dbConnect;