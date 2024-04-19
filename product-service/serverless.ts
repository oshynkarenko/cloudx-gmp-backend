import type { AWS } from '@serverless/typescript';

import getProductList from '@functions/getProductList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';
import catalogBatchProcess from '@functions/catalogBatchProcess';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    deploymentMethod: 'direct',
    stage: 'dev',
    region: 'eu-north-1',
    runtime: 'nodejs20.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: '${self:custom.productsTable}',
      STOCKS_TABLE: '${self:custom.stocksTable}',
      SNS_ARN: {
        Ref: 'CreateProductTopic',
      },
    },
    iamRoleStatements: [
      {
        Effect: 'Allow',
        Action: ['sqs:*'],
        Resource: 'arn:aws:sqs:eu-north-1:*:*',
      },
      {
        Effect: 'Allow',
        Action: ['sns:Publish'],
        Resource: {
          Ref: 'CreateProductTopic',
        },
      },
    ],
  },
  // import the function via paths
  functions: {
    getProductList,
    getProductById,
    createProduct,
    catalogBatchProcess,
  },
  resources: {
    Resources: {
      SQSQueue: {
        Type: 'AWS::SQS::Queue',
        Properties: {
          QueueName: '${self:custom.catalogItemsQueue}',
        },
      },
      CreateProductTopic: {
        Type: 'AWS::SNS::Topic',
        Properties: {
          DisplayName: '${self:custom.createProductTopic}',
        },
      },
      CreateProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Protocol: 'email',
          Endpoint: 'shynkarenko.o@gmail.com',
          TopicArn: {
            Ref: 'CreateProductTopic',
          },
        },
      },
      ErrorCreateProductSubscription: {
        Type: 'AWS::SNS::Subscription',
        Properties: {
          Protocol: 'email',
          Endpoint: 'olena_shynkarenko@epam.com',
          TopicArn: {
            Ref: 'CreateProductTopic',
          },
          FilterPolicy: {
            priceLevel: ['HIGH'],
          },
        },
      },
    },
  },

  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      typefiles: ['./src/types/product.ts', './src/types/errors.ts'],
      host: 'uffkw824mb.execute-api.eu-north-1.amazonaws.com/dev',
    },
    productsTable: 'CloudX-GMP-Products',
    stocksTable: 'CloudX-GMP-Stocks',
    catalogItemsQueue: 'catalogItemsQueue',
    createProductTopic: 'createProductTopic',
    createProductSubscription: 'createProductSubscription',
  },
};

module.exports = serverlessConfiguration;
