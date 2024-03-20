import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.getProductById`,
  url: true,
  events: [
    {
      http: {
        method: 'get',
        path: 'product/{productId}',
        responses: {
          200: {
            description: 'Success response',
            bodyType: 'Product',
          },
          404: {
            description: 'Product not found response',
            bodyType: 'ApiError',
          },
        },
      },
    },
  ],
};
