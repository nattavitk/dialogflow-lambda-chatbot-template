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

aws cloudformation package --template-file aws/template.yaml --output-template-file aws/packaged.yaml --s3-bucket s3-storage
echo "Package stack for $stack_env"
