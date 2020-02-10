import { KafkaClient as Client, Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';

const kafkaHost = 'localhost:9092';

export const subscribe:any = (topic: string): void => {
    const client = new Client({ kafkaHost });
    const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0 }];
    const options: ConsumerOptions = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024 };

    const consumer = new Consumer(client, topics, options)

    consumer.on('error', function(err: Error): void {
        console.log('error', err);
    });

    client.refreshMetadata(
        [topic],
        (err: Error): void => {
            const offset = new Offset(client);

            if (err) {
                throw err;
            }

            consumer.on('message', function(message: Message): void {
                // do something useful with message
            });

            /*
             * If consumer get `offsetOutOfRange` event, fetch data from the smallest(oldest) offset
             */
            consumer.on(
                'offsetOutOfRange',
                (topic: OffsetFetchRequest): void => {
                    offset.fetch([topic], function(err, offsets): void {
                        if (err) {
                            return console.error(err);
                        }
                        const min = Math.min.apply(null, offsets[topic.topic][topic.partition]);
                        consumer.setOffset(topic.topic, topic.partition, min);
                    });
                }
            );
        }
    );
};