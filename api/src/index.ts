import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { connect } from "./services/db";
import { router } from "./routes";

dotenv.config()

/**
 * App Variables
 */
if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

/**
 *  App Configuration
 */
app.use(cors());
app.use(express.json());
app.use(router)

/**
 * Server Activation
 */
 // connect to database
connect()
// start the app
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});