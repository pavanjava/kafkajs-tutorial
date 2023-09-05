import {TopicConsumers} from './TopicConsumers';

const consumer: TopicConsumers = new TopicConsumers();

consumer.consume(['topic_61']).then(() => {});