import {subscribe} from './kafka.subscribe.helper';
import MessageController from "../../controllers/message/message.controller";

export const kafkaSubscribe: any = () => {
    subscribe(
        'message',
        async (message: any) => {
            const messageObj = new MessageController;
            await messageObj.save(message);
        }
    );
};