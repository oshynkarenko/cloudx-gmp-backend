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
        authorizer: {
          arn: 'arn:aws:lambda:eu-north-1:533267136333:function:authorization-service-dev-basicAuthorizer',
          type: 'token',
          resultTtlInSeconds: 0,
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
