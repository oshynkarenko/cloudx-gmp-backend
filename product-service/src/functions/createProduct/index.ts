import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.createProduct`,
  url: true,
  events: [
    {
      http: {
        method: 'post',
        path: 'products',
        bodyType: 'CreateProductData',
        cors: true,
        responses: {
          201: {
            description: 'Success response',
            bodyType: 'Message',
          },
          400: {
            description: 'Client error',
            bodyType: 'ApiError'
          },
          500: {
            description: 'Server error',
            bodyType: 'ApiError',
          },
        }
      },
    },
  ],
  environment: {
    PRODUCTS_TABLE_NAME: '${self:provider.environment.PRODUCTS_TABLE}',
    STOCKS_TABLE_NAME: '${self:provider.environment.STOCKS_TABLE}',
  },
};
