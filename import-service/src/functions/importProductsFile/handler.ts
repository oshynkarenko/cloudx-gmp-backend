import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import { errorHandlingService } from '../../helpers';

export const importProductsFile = async (event) =>  {
  console.log(event);

  try {
    const { name } = event.queryStringParameters;
    const BUCKET = 'oshynkarenko-cloudx-gmp-task6';
    const s3 = new S3Client({ region: 'eu-north-1' });
    const params = {
      Bucket: BUCKET,
      Key: `uploaded/${name}`,
    };

    const command = new PutObjectCommand(params);

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

    return ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ signedUrl }),
    });
  } catch {
    return errorHandlingService.genericErrorHandler();
  }
}
