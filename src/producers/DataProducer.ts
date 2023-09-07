import {kafka} from '../util/KafkaUtil';
import readline from 'readline';
import {Producer} from 'kafkajs';

const dataInterface: readline.Interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export const init = async (): Promise<void> => {
    const producer: Producer = kafka.producer();

    await producer.connect();

    dataInterface.setPrompt('$ ');
    dataInterface.prompt();

    console.log(`type your input and push: `);

    dataInterface.on('line', async function (line) {
        const data = JSON.parse(line);
        await producer.send({
            topic: 'topic_61',
            messages: [
                {
                    partition: data.location.toLowerCase() === 'north' ? 0 : 1,
                    key: 'location-update',
                    value: JSON.stringify(data),
                },
            ],
        });
    }).on('close', async () => {
        await producer.disconnect();
    });
};