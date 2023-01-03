docker run -it  \
    -w /app \
    -v $PWD:/app \
    --rm \
    --name kafka-js-sample  \
    --network full-control-center_default \
    node:16 bash