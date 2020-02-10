import IControllerBase from "../interfaces/IControllerBase.interface";
import express, {Request, Response} from "express";
import { KafkaClient as Client, Producer, ProduceRequest } from 'kafka-node';


class MessageController implements IControllerBase{
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/message', this.index)
    }

    index = (req: Request, res: Response) => {

    }
}