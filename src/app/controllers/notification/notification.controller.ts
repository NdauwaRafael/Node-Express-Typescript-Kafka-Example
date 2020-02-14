import IControllerBase from "../interfaces/IControllerBase.interface";
import express, {Request, Response} from "express";
import NotificationModel from "../../models/notification.model";

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
        try {
            const messages_passes = JSON.parse(messages);
            let savedMessages = await NotificationModel.bulkCreate(messages_passes, {
                returning: true,
                updateOnDuplicate: ["title", "message"]
            });

            console.log("Messages have been updated successfully");
            
            return {
                message: "Saved",
            }
        }
        catch (e) {

        }
    }
}