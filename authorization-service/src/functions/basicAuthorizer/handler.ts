import decode from 'decode-base64';
import * as process from 'process';
import { PolicyDocument } from 'aws-lambda';

const generatePolicy = (effect: 'Allow' | 'Deny', resource: string): PolicyDocument => {
  return {
    Version: '2012-10-17',
    Statement: [{
      Action: 'execute-api:Invoke',
      Effect: effect,
      Resource: resource,
    }],
  };
};

export const basicAuthorizer = async (event) =>  {
  console.log(event);

  try {
    const { authorizationToken, methodArn } = event;

    if (!authorizationToken) {
      return new Error('Missing authentication token');
    }

    const decodedCredentials:Uint8Array= decode(authorizationToken.replace('Basic ', ''));
    const credentials: string = String.fromCharCode.apply(null, decodedCredentials);
    const [login, password] = credentials.split('=');
    const isValidCredentials = login && password && process.env[login] === password;

    if (isValidCredentials) {
      return ({
        principalId: login,
        policyDocument: generatePolicy('Allow', methodArn),
      });
    }
    return ({
      principalId: login,
      policyDocument: generatePolicy('Deny', methodArn),
    });
  } catch (error) {
    console.log(error);
  }
}
