import { getProductList } from './handler';
import { dataService } from '../../helpers/data-service';

jest.mock('../../helpers/data-service');

describe('getProductList handler', () => {
  const mockProductData = {
    Items: [
      {
        description: 'Test description 1',
        id: '123',
        price: 150,
        title: 'Test Product 1'
      },
      {
        description: 'Test description 2',
        id: '456',
        price: 50,
        title: 'Test Product 2'
      },
    ],
  };

  const mockStockData = {
    Items: [
      {
        count: 5,
        product_id: '123',
      },
      {
        count: 25,
        product_id: '456',
      },
    ],
  };

  const mockEvent = {};

  it('should get products data', async () => {
    jest.spyOn(dataService, 'getProducts').mockReturnValueOnce(Promise.resolve(mockProductData) as any);
    jest.spyOn(dataService, 'getStocks').mockReturnValueOnce(Promise.resolve(mockStockData) as any);
    const expected = {
      statusCode: 200,
      body: JSON.stringify([
        {
          description: 'Test description 1',
          id: '123',
          price: 150,
          title: 'Test Product 1',
          count: 5,
        },
        {
          description: 'Test description 2',
          id: '456',
          price: 50,
          title: 'Test Product 2',
          count: 25,
        },
      ]),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    const result = await getProductList(mockEvent);

    expect(result).toEqual(expected);
  });
});