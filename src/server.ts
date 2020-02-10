import App from './app';
import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';
import {controllers} from './app/controllers';
import dotenv from "dotenv";

// initialize configuration
dotenv.config();
const port:number = parseInt(process.env.SERVER_PORT);

const app = new App({
    port: port,
    controllers: controllers,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();