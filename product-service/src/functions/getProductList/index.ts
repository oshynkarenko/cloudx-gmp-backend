import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductList`,
  url: true,
  events: [
    {
      http: {
        method: 'get',
        path: 'products',
        responses: {
          200: {
            description: 'Success response',
            bodyType: 'ProductList',
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
