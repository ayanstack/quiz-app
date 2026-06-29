import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Failed: ${error.message}`);
        console.log('⚠️ Running in "DEMO MODE" with in-memory persistence.');
        console.log('👉 To use your own database, update the MONGO_URI in server/.env');
        global.MOCK_DB = true;
    }
};

export default connectDB;
