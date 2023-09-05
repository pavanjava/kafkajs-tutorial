import {Admin, ITopicConfig} from 'kafkajs';
import {KafkaUtil} from '../util/KafkaUtil';

interface TopicConfig extends ITopicConfig {
    topic: string;
    numPartitions: number;
    replicationFactor: number;
}

export class ManageTopics {
    createTopic = async (topicConfig: TopicConfig[]): Promise<boolean> => {
        const kafkaAdmin: Admin = KafkaUtil.getKafkaInstance().admin();
        try {
            await kafkaAdmin.connect();
            return await kafkaAdmin.createTopics({
                topics: topicConfig
            });
        }catch (e) {
            return false;
        }finally {
            await kafkaAdmin.disconnect();
        }
    };

    deleteTopic = async (topics: string[]): Promise<void> => {
        const kafkaAdmin: Admin = KafkaUtil.getKafkaInstance().admin();
        try {
            await kafkaAdmin.connect();
            await kafkaAdmin.deleteTopics({
                topics: topics,
                timeout: 300, // default: 5000
            });
        }catch (e) {
            console.log(e);
        }finally {
            await kafkaAdmin.disconnect();
        }
    };
}