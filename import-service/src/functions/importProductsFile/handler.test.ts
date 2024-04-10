import * as requestPresigner from '@aws-sdk/s3-request-presigner';

import { importProductsFile } from './handler';

jest.mock('@aws-sdk/client-s3');
jest.mock('@aws-sdk/s3-request-presigner', () => ({
  getSignedUrl: () => 'https://test.amazonaws.com/uploaded/test?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=test'
}));

describe('importProductsFile handler', () => {
  const mockEvent = {
    queryStringParameters: {
      name: 'test',
    },
  };

  it('should get signed url for file upload', async () => {
    const expected = {
      statusCode: 200,
      body: JSON.stringify({
        signedUrl: 'https://test.amazonaws.com/uploaded/test?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=test'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    const result = await importProductsFile(mockEvent);

    expect(result).toEqual(expected);
  });

  it('should handle server error', async () => {
    jest.spyOn(requestPresigner, 'getSignedUrl').mockReturnValueOnce(Promise.reject('test error'));

    const expected = {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Something went wrong, please try again later'
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    const result = await importProductsFile(mockEvent);

    expect(result).toEqual(expected);
  });
});