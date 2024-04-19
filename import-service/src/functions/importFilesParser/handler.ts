import {
  CopyObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import csv from 'csv-parser';
import { errorHandlingService } from '../../helpers';

export const importFilesParser = async (event) =>  {
  console.log(event);

  try {
    const s3 = new S3Client({ region: 'eu-north-1' });
    const sqs = new SQSClient({ region: 'eu-north-1' });
    const BUCKET = 'oshynkarenko-cloudx-gmp-task6';

    for (const record of event.Records) {
      const fileName = record.s3.object.key
      console.log(`${fileName} has been uploaded`);

      const getObject = new GetObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
      });

      const copyObject = new CopyObjectCommand({
        Bucket: BUCKET,
        Key: fileName.replace('uploaded', 'parsed'),
        CopySource: `${BUCKET}/${fileName}`,
      });

      const deleteObject = new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: fileName,
      });

      const { Body: data} = await s3.send(getObject);

      console.log('Starting data parsing...')
      await data.pipe(csv()).on('data', (item) => sqs.send(new SendMessageCommand({
        QueueUrl: process.env.SQS_URL,
        MessageBody: JSON.stringify(item)
      })));

      await s3.send(copyObject);
      console.log('Product data has been successfully parsed and moved to the /parsed folder');

      await s3.send(deleteObject);
      console.log('Product data has been successfully removed from /uploaded folder after processing');

      return ({
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  } catch (error) {
    return errorHandlingService.genericErrorHandler();
  }
}
