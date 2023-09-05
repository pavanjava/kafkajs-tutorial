import {ManageTopics} from './ManageTopics';

// ManageTopic class instance
const manageTopics: ManageTopics = new ManageTopics();

// topic configuration
const topicConfig = [{topic: 'test-topic-1', numPartitions: 2, replicationFactor: 1}, {topic: 'test-topic-2', numPartitions: 2, replicationFactor: 1}];
const topicsToDelete = ['test-topic-2'];

// calling create topic from ManageTopic Class
manageTopics.createTopic(topicConfig).then((response: boolean) => {
    if(response){
        for (const topicObj of topicConfig) {
            console.log(`topic: ${topicObj.topic} created successfully`);
        }


        // calling delete topic from ManageTopic Class
        manageTopics.deleteTopic(['test-topic-2']).then(() => {
            for (const topic of topicsToDelete) {
                console.log(`topic: ${topic} deleted successfully`);
            }
        });
    }
});
