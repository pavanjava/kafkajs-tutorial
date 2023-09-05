import {Kafka} from 'kafkajs';

export const kafka = new Kafka({
    clientId: 'MyStreamingApp',
    brokers: ['localhost:9092'],
});