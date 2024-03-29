import { getProductById } from './handler';
import { dataService } from '../../helpers/data-service';

jest.mock('../../helpers/data-service');

describe('getProductById handler', () => {
  const mockProductData = {
    Items: [{
      description: 'Test description',
      id: '123',
      price: 150,
      title: 'Test Product'
    }],
  };

  const mockStockData = {
    Items: [{
      product_id: '123',
      count: 8,
    }]
  }

  it('should get product data if product with id exists', async () => {
    jest.spyOn(dataService, 'getProductById').mockReturnValueOnce(Promise.resolve(mockProductData) as any);
    jest.spyOn(dataService, 'getCountById').mockReturnValueOnce(Promise.resolve(mockStockData) as any);
    const mockEvent = {
      pathParameters: {
        productId: '123',
      },
    };
    const expected = {
      statusCode: 200,
      body: JSON.stringify({
        description: 'Test description',
        id: '123',
        price: 150,
        title: 'Test Product',
        count: 8,
      }),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
  };

    const result = await getProductById(mockEvent);

    expect(result).toEqual(expected);
  });

  it('should return 404 response if product with product id does not exist', async () => {
    jest.spyOn(dataService, 'getProductById').mockReturnValueOnce(Promise.resolve({ Items: [] }) as any);
    jest.spyOn(dataService, 'getCountById').mockReturnValueOnce(Promise.resolve({ Items: [] }) as any);
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