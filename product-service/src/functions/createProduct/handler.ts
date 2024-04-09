import { v4 as uuidv4 } from 'uuid'

import {dataService, errorHandlingService, loggerService, validationService} from '../../helpers';

export const createProduct = async (event) =>  {
  loggerService.logIncomingRequest(event);

  const { product: productData } = JSON.parse(event.body);

  if (!validationService.isValidProduct(productData)) {
    return errorHandlingService.clientErrorHandler();
  }

  try {
    const productId = uuidv4();
    const { count, ...product } = productData;

    await dataService.createProduct({
      ...product,
      id: productId,
    });

    await dataService.createStock({
      count,
      product_id: productId,
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
