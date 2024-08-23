import mongoose from 'mongoose';

export const connectToDb = async () => {
    
    try {
        const client = await mongoose.connect("mongodb://localhost:27017/ReactSage", {});
        console.log('\x1b[34mConnected to the database\x1b[0m');
    } catch (error) {
        console.log(error);
    }
}