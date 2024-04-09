import {dataService, errorHandlingService, loggerService} from '../../helpers';

export const getProductById = async (event) => {
  loggerService.logIncomingRequest(event);

  try {
    const { productId } = event.pathParameters;
    const headers = {
      'Access-Control-Allow-Origin': '*',
    };
    const { Items: productData } = await dataService.getProductById(productId);
    const { Items: stockData } = await dataService.getCountById(productId);

    if (productData.length) {
      const product = productData[0];
      const result = {
        ...product,
        count: stockData[0]?.count || 0,
      };

      return ({
        statusCode: 200,
        headers,
        body: JSON.stringify(result),
      });
    }

    return errorHandlingService.notFoundHandler(`Product ${productId} not found`);
  } catch {
    return errorHandlingService.genericErrorHandler();
  }
};
