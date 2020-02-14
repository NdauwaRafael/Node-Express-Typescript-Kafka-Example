import {subscribe} from './kafka.subscribe.helper';
import MessageController from "../../controllers/message/message.controller";
import NotificationController from "../../controllers/notification/notification.controller";

export const kafkaSubscribe: any = () => {
    subscribe(
        'message',
        async (message: any) => {
            try {
                if (message){
                    const messageObj = new MessageController;
                    await messageObj.save(message.value);

                }

            }
            catch (e) {
                console.log(e, 'Error saving message.')
            }

        }
    );

    //notification
    subscribe(
        'messages',
        async (message: any) => {
            try {
                if (message){
                    const messageObj = new NotificationController;
                    await messageObj.save(message.value);
                }

            }
            catch (e) {
                console.log(e, 'Error saving message.')
            }

        }
    );
};