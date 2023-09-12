import {Kafka} from 'kafkajs';

export const kafka = new Kafka({
    clientId: 'MyStreamingApp',
    brokers: ['localhost:9092']
});

export const kafka_sasl = new Kafka({
    clientId: 'MyStreamingApp',
    brokers: ['pkc-7prvp.centralindia.azure.confluent.cloud:9092'],
    ssl:{
        rejectUnauthorized: true
    },
    sasl:{
        mechanism: 'plain',
        username: '<client-id>',
        password: '<client-secret>'
    }
});