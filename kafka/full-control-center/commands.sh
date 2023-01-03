
# list topics
kafka-topics --bootstrap-server localhost:9092 --list

# create  a topic: 
kafka-topics --bootstrap-server localhost:9092 \
    --create \
    --topic  topic-sample \
    --partitions 1 \
    --replication-factor 1

# produce messages
kafka-console-producer --bootstrap-server localhost:9092 \
    --topic  topic-sample 

# consume messages
kafka-console-consumer --bootstrap-server localhost:9092 \
    --topic  topic-sample \
    --group x-group \
    --from-beginning