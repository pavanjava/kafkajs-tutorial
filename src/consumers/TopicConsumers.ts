import {KafkaUtil} from '../util/KafkaUtil';
import {Consumer} from 'kafkajs';

export class TopicConsumers {

    consume = async (topics: string[]): Promise<void> => {
        const kafkaConsumer = KafkaUtil.getKafkaInstance().consumer({groupId: 'group-1'});
        try {
            await kafkaConsumer.connect();
            await kafkaConsumer.subscribe({topics: topics, fromBeginning: true});

            await kafkaConsumer.run({
                eachMessage: async ({topic, partition, message, heartbeat, pause}) => {
                    console.log({
                        topic: topic,
                        partition: partition,
                        key: message.key ? message.key.toString() : '',
                        value: message.value ? message.value.toString() : '',
                        headers: message.headers,
                        heartbeat: heartbeat,
                        pause: pause
                    });
                }
            });
        } catch (e) {
            console.log(e);
        } finally {
            await kafkaConsumer.disconnect();
        }
    };
}