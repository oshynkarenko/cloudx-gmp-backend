import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.importFilesParser`,
  url: true,
  events: [
    {
      s3: {
        bucket: 'oshynkarenko-cloudx-gmp-task6',
        event: 's3:ObjectCreated:*',
        rules: [{ prefix: 'uploaded/' }, { suffix: '.csv' }],
        existing: true,
        forceDeploy: true
      },
    },
  ],
};
