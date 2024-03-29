import { dataService } from '../../helpers';

export const getProductById = async (event) => {
  const { productId } = event.pathParameters;
  const headers = {
    'Access-Control-Allow-Origin': '*',
  };
  const product = await dataService.getProductById(productId);

  if (product) {
    return ({
      statusCode: 200,
      headers,
      body: JSON.stringify(product),
    });
  }

  return ({
    statusCode: 404,
    headers,
    body: JSON.stringify({
      message: `Product ${productId} not found`,
    }),
  });
};
