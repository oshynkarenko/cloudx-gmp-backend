import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.catalogBatchProcess`,
  url: true,
  events: [
    {
      sqs: {
        arn: {"Fn::GetAtt": [ "SQSQueue", "Arn" ]},
        batchSize: 5
      },
    },
  ],
  environment: {
    PRODUCTS_TABLE_NAME: '${self:provider.environment.PRODUCTS_TABLE}',
    STOCKS_TABLE_NAME: '${self:provider.environment.STOCKS_TABLE}',
  },
};
