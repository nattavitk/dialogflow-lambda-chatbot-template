#!/bin/sh

env_arg="$1"
uat="uat"
prod="prod"
stack_env="dev"

if [ "$env_arg" = $uat ]
then
  stack_env="uat"
elif [ "$env_arg" = $prod ]
then
  stack_env="prod"
else
  stack_env="dev"
fi

aws cloudformation deploy --template-file aws/packaged.yaml --stack-name chatbot-$stack_env --capabilities CAPABILITY_NAMED_IAM
echo "Deploy stack for $stack_env"
