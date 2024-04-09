import { dataService, errorHandlingService, loggerService } from '../../helpers';

export const getProductList = async (event) =>  {
  loggerService.logIncomingRequest(event);

  try {
    const { Items: products } = await dataService.getProducts();
    const { Items: stocks} = await dataService.getStocks();
    const result = products.map((product) => ({
      ...product,
      count: stocks.find((stock) => product.id === stock.product_id)?.count || 0,
    }))

    return ({
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify(result),
    });
  } catch {
    return errorHandlingService.genericErrorHandler();
  }
}
