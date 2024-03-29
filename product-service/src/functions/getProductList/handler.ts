import {dataService} from '../../helpers';

export const getProductList = async () =>  {
  const productData = await dataService.getProducts();

  return ({
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(productData),
  });
}
