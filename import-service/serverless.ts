import type { AWS } from '@serverless/typescript';

import importProductsFile from '@functions/importProductsFile';
import importFilesParser from '@functions/importFilesParser';

const serverlessConfiguration: AWS = {
  service: 'import-service',
  frameworkVersion: '3',
  plugins: ['serverless-auto-swagger', 'serverless-esbuild'],
  provider: {
    name: 'aws',
    runtime: 'nodejs20.x',
    stage: 'dev',
    region: 'eu-north-1',
    iamRoleStatements: [{
      Effect: 'Allow',
      Action: ['s3:ListBucket', 's3:GetObject', 's3:PutObject', 's3:DeleteObject'],
      Resource: 'arn:aws:s3:::oshynkarenko-cloudx-gmp-task6/*',
    }],
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: { importProductsFile, importFilesParser },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node20',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    autoswagger: {
      typefiles: ['./src/types/import.ts', './src/types/errors.ts'],
      host: 'htsce4mmhf.execute-api.eu-north-1.amazonaws.com/dev',
    },
  },
};

module.exports = serverlessConfiguration;
