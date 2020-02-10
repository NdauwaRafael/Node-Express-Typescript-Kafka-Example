import { KafkaClient as Client, Consumer, Message, Offset, OffsetFetchRequest, ConsumerOptions } from 'kafka-node';

const kafkaHost: string = process.env.KAFKA_HOST || 'localhost:9092';

export const subscribe:any = (topic: string, send: (message: Message) => void): void => {
    const client = new Client({ kafkaHost });
    const topics: OffsetFetchRequest[] = [{ topic: topic, partition: 0}];
    const options: ConsumerOptions = { autoCommit: false, fetchMaxWaitMs: 1000, fetchMaxBytes: 1024 * 1024, fromOffset: true };

    const consumer = new Consumer(client, topics, options);

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

            offset.fetchLatestOffsets([topic], function (err, offsets) {
                if (err) {
                    console.log(`error fetching latest offsets ${err}`)
                    return
                }
                let latest = 1;

                Object.keys(offsets[topic]).forEach( o => {
                    latest = offsets[topic][o] > latest ? offsets[topic][o] : latest
                });
                console.log(latest, 'latest');

                consumer.setOffset(topic, 0, latest-1);

                consumer.on('message', function(message: Message): void {
                    // do something useful with message
                    send(message);
                });
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