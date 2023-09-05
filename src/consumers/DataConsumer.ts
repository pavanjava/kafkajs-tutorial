import {Consumer} from 'kafkajs';
import {kafka} from '../util/KafkaUtil';

const group: string = 'group-1';

export const init = async (): Promise<void> => {
    const consumer: Consumer = kafka.consumer({ groupId: group });
    await consumer.connect();

    await consumer.subscribe({ topics: ['topic_61'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message}) => {
            console.log(
                `${group}: [${topic}]: PART:${partition}:`,
                message.value? message.value.toString(): ''
            );
        },
    });
};

init().then(() => {});