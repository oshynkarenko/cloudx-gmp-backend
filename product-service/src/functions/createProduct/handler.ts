import { v4 as uuidv4 } from 'uuid'

import {dataService, errorHandlingService, loggerService, validationService} from '../../helpers';

export const createProduct = async (event) =>  {
  loggerService.logIncomingRequest(event);

  const { product } = JSON.parse(event.body);

  if (!validationService.isValidProduct(product)) {
    return errorHandlingService.clientErrorHandler();
  }

  try {
    await dataService.createProduct({
      ...product,
      id: uuidv4(),
    });

    return ({
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify('Product added'),
    });
  } catch {
    return errorHandlingService.genericErrorHandler();
  }
}
