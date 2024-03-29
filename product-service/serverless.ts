import type { AWS } from '@serverless/typescript';

import getProductList from '@functions/getProductList';
import getProductById from '@functions/getProductById';
import createProduct from '@functions/createProduct';

const serverlessConfiguration: AWS = {
  service: 'product-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    deploymentMethod: 'direct',
    stage: 'dev',
    region: 'eu-north-1',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
      PRODUCTS_TABLE: '${self:custom.productsTable}',
      STOCKS_TABLE: '${self:custom.stocksTable}',
    },
  },
  // import the function via paths
  functions: { getProductList, getProductById, createProduct },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      target: 'node14',
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
  },
};

module.exports = serverlessConfiguration;
