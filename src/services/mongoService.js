import mongoose from 'mongoose';

export default async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};