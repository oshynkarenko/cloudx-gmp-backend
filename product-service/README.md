# Serverless - AWS Node.js Typescript

This project has been generated using the `aws-nodejs-typescript` template from the [Serverless framework](https://www.serverless.com/).

For detailed instructions, please refer to the [documentation](https://www.serverless.com/framework/docs/providers/aws/).

## Installation/deployment instructions

> **Requirements**: NodeJS `lts/fermium (v.14.15.0)`. If you're using [nvm](https://github.com/nvm-sh/nvm), run `nvm use` to ensure you're using the same Node version in local and in your lambda's runtime.

- Run `npm i` to install the project dependencies
- Run `npx sls deploy` to deploy this stack to AWS

### Locally

In order to test the functions locally, run the following commands:

- `serverless invoke local --function getProductList --path src/functions/getProductList/mock.json`
- `serverless invoke local --function getProductById --path src/functions/getProductById/mock.json`
- `serverless invoke local --function createProduct --path src/functions/createProduct/mock.json`

### Remotely

Copy and replace your `url` - found in Serverless `deploy` command output - and `productId` parameter in the following `curl` command in your terminal or in Postman to test your newly deployed application.

```
curl --location --request GET 'https://uffkw824mb.execute-api.eu-north-1.amazonaws.com/dev/products' \
--header 'Content-Type: application/json' \
```

```
curl --location --request GET 'https://uffkw824mb.execute-api.eu-north-1.amazonaws.com/dev/product/7567ec4b-b10c-48c5-9345-fc73c48a80a0' \
--header 'Content-Type: application/json' \
```

### Swagger:
https://bwri326ktd.execute-api.eu-north-1.amazonaws.com/swagger