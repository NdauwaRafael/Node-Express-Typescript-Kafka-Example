import App from './app';
import * as bodyParser from 'body-parser';
import loggerMiddleware from './middleware/logger';
import {controllers} from './app/controllers';

const app = new App({
    port: 8080,
    controllers: controllers,
    middleWares: [
        bodyParser.json(),
        bodyParser.urlencoded({ extended: true }),
        loggerMiddleware
    ]
});

app.listen();