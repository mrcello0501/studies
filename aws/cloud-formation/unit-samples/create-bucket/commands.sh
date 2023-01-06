# create stack
aws cloudformation create-stack \
    --stack-name create-bucket-stack-sample \
    --template-body file://template.yaml

# list buckets
aws s3 ls

# visualise objects stored within a specific bucket
aws s3 ls s3://bucket-smpl \
    --recursive \
    --human-readable \
    --summarize

# upload file
aws s3 cp sample.txt s3://bucket-smpl 

# delete stack
aws cloudformation delete-stack \
   --stack-name create-bucket-stack-sample 

# delete s3 bucket (if not empty it's not deleted):
aws s3 rm s3://bucket-smpl --recursive

