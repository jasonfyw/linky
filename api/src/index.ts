import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import favicon from "serve-favicon";

import { connect } from "./services/db";
import { router } from "./routes";
import { corsOptions } from "./config/corsOptions";


dotenv.config({ path: path.resolve(__dirname, '../../.env') })

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
app.use(cors(corsOptions));
app.use(express.json());
app.use(favicon(path.resolve(__dirname, '../frontend_build/favicon.ico')))
app.use(router)
app.use(express.static(path.resolve(__dirname, '../frontend_build')))

/**
 * Server Activation
 */
 // connect to database
connect()
// start the app
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});