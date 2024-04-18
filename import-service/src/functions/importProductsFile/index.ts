import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importProductsFile`,
  url: true,
  events: [
    {
      http: {
        method: 'get',
        path: 'import',
        cors: true,
        request: {
          parameters: {
            querystrings: {
              name: true,
            },
          },
        },
        responses: {
          200: {
            description: 'Success response',
            bodyType: 'SignedUrlResponse',
          },
          500: {
            description: 'Server error',
            bodyType: 'ApiError',
          },
        }
      },
    },
  ],
};
