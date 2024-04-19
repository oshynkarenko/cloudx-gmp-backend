import {dataService, errorHandlingService, loggerService, validationService} from '../../helpers';

export const createProduct = async (event) =>  {
  loggerService.logIncomingRequest(event);

  const { product: productData } = JSON.parse(event.body);

  if (!validationService.isValidProduct(productData)) {
    return errorHandlingService.clientErrorHandler();
  }

  try {
    await dataService.createProduct(productData);

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
