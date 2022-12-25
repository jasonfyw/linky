import mongoose from 'mongoose';
import * as dotenv from "dotenv";
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../../etc/secrets/.env') })

/**
 * Connection events
 */
// upon successful connection
mongoose.connection.on('connected', function () {
    console.log('Mongoose successfully connected to database ' + process.env.DB_NAME);
});

// upon error in connection
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

// upon connection disconnect
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose default connection disconnected');
});

// upon node process termination
process.on('SIGINT', function () {
    mongoose.connection.close(function () {
        console.log('Mongoose default connection disconnected through app termination');
        process.exit(0);
    });
}); 


export const connect = async () => {
    return mongoose.connect(process.env.MONGODB_URI as string)
}