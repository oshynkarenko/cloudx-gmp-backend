# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Locally

In order to test the functions locally, run the following commands:

- `serverless invoke local --function basicAuthorizer --path src/functions/basicAutorizer/mock.json`
