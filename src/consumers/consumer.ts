import {Kafka} from 'kafkajs';

const group = 'group-1';
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['<PRIVATE_IP>:9092'],
});
async function init() {
    const consumer = kafka.consumer({ groupId: group });
    await consumer.connect();

    await consumer.subscribe({ topics: ['topic_61'], fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(
                `${group}: [${topic}]: PART:${partition}:`,
                message.value? message.value.toString(): ''
            );
        },
    });
}

init().then(() => {});