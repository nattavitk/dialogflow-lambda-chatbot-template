# Dialogflow chatbot with AWS Lambda fulfillment Template

This is a sample template for Dialogflow chatbot.

It consists of

1. AWS SAM script for package and deploy AWS Lambda function for Dialogflow fulfillment
2. Express server to proxy AWS Lambda and dialogflow-fulfillment library
3. Dialogflow fulfillment agent

Below is a brief explanation of what we have generated for you:

```bash
.
├── README.MD                   <-- This instructions file
├── event.json                  <-- API Gateway Proxy Integration event payload
├── aws                         <-- Scripts for AWS CloudFormation
│   └── template.yaml           <-- Source code for a lambda function
│
├── scripts
│   └── sam-deploy.sh           <-- Shell script to deploy for each environment
│   └── sam-package.sh          <-- Shell script to package for each environment
│
├── chatbot                     <-- Source code for a lambda function
│   └── dialogflow              <-- Source code for Dialogflow chatbot fulfillment
│       └── constant            <-- Constant scripts
│       └── entity              <-- Entity scripts
│       └── intent              <-- Intent scripts
│       └── mapping             <-- Mapping scripts (interface to external data source)
│       └── services            <-- Services (controllers)
│       └── utils               <-- Utilities
│       └── mainChat.js         <-- Main script for Dialogflow Agent
│
│   └── tests                   <-- Unit tests
│       └── unit
│           └── test-handler.js <-- Test scripts here
│
│   └── app.js                  <-- Express server to proxy AWS Lambda to dialogflow-fulfillment library
│   └── package.json            <-- NodeJS dependencies and scripts
│   └── .npmignore              <-- NPM ignore script
│
├── .gitignore                  <-- SAM template
├── template.yaml               <-- SAM template
```

## Requirements

-   AWS CLI already configured with Administrator permission
-   [NodeJS 8.10+ installed](https://nodejs.org/en/download/releases/)
-   [Docker installed](https://www.docker.com/community-edition)

## Setup process

### Local development

**Invoking function locally using a local sample payload**

```bash
sam local invoke ChatbotFunction --event event.json
```

**Invoking function locally through local API Gateway**

```bash
sam local start-api
```

or skip pulling Docker image

```bash
sam local start-api --skip-pull-image
```

If the previous command ran successfully you should now be able to hit the following local endpoint to invoke your function `http://localhost:3000/fulfillment`

## Testing

We use `mocha` for testing our code and it is already added in `package.json` under `scripts`, so that we can simply run the following command to run our tests:

```bash
cd chatbot
yarn
yarn test
```

## Deploying

Package the Lambda function

```bash
./scripts/sam-package.sh <environment>
```

Deploy the Lambda function

```bash
./scripts/sam-deploy.sh <environment>
```
