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
        }
      },
    },
  ],
};
