import IControllerBase from "../interfaces/IControllerBase.interface";
import express, {Request, Response} from "express";

export default class NotificationController implements IControllerBase {
    public path = '/';
    public router = express.Router();

    constructor() {
        this.initRoutes();
    }

    public initRoutes() {
        this.router.get('/message', this.index)
    }

    index = (req: Request, res: Response) => {

    };

    public async save(messages: any) {
        console.log(messages)
    }
}