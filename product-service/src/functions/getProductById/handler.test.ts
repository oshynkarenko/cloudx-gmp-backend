import { getProductById } from './handler';
import { dataService } from '../../helpers/data-service';

jest.mock('../../helpers/data-service');

describe('getProductById handler', () => {
  const mockProductData = {
    count: 5,
    description: 'Test description',
    id: '123',
    price: 150,
    title: 'Test Product'
  };

  it('should get product data if product with id exists', async () => {
    jest.spyOn(dataService, 'getProductById').mockReturnValueOnce(Promise.resolve(mockProductData));
    const mockEvent = {
      pathParameters: {
        productId: '123',
      },
    };
    const expected = {
      statusCode: 200,
      body: JSON.stringify(mockProductData),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
  };

    const result = await getProductById(mockEvent);

    expect(result).toEqual(expected);
  });

  it('should return 404 response if product with product id does not exist', async () => {
    jest.spyOn(dataService, 'getProductById').mockReturnValueOnce(Promise.resolve(undefined));
    const mockEvent = {
      pathParameters: {
        productId: '123',
      },
    };
    const expected = {
      statusCode: 404,
      body: JSON.stringify({
        message: 'Product 123 not found',
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    const result = await getProductById(mockEvent);

    expect(result).toEqual(expected);
  });
});