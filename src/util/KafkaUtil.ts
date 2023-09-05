import {Kafka, KafkaConfig} from 'kafkajs';

export class KafkaUtil {

    private static kafka: Kafka;

    static getKafkaInstance = () => {
        const kafkaConfig: KafkaConfig = {clientId:'MyStreamingApp-1', brokers: ['localhost:9092']};
        if(this.kafka === null || this.kafka === undefined){
            this.kafka = new Kafka(kafkaConfig);
        }
        return this.kafka;
    };
}