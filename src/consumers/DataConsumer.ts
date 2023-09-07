import {Consumer, KafkaMessage} from 'kafkajs';
import {kafka} from '../util/KafkaUtil';

interface IMessageParams {
    topic: string;
    partition: number;
    message: KafkaMessage;
    heartbeat?: Function;
    pause?: Function;
}

const group: string = process.argv[2];

export const init = async (): Promise<void> => {
    const consumer: Consumer = kafka.consumer({ groupId: group });
    await consumer.connect();

    await consumer.subscribe({ topics: ['topic_61'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message}: IMessageParams): Promise<void> => {
            console.log(`Group => ${group}, Topic => [${topic}], Partition => ${partition}, `,message.value? message.value.toString(): '');
        },
    });
};

init().then(() => {});