import { getProductList } from './handler';
import { dataService } from '../../helpers/data-service';

jest.mock('../../helpers/data-service');

describe('getProductList handler', () => {
  const mockProductData = [
    {
      count: 5,
      description: 'Test description 1',
      id: '123',
      price: 150,
      title: 'Test Product 1'
    },
    {
      count: 25,
      description: 'Test description 2',
      id: '456',
      price: 50,
      title: 'Test Product 2'
    }
  ];

  it('should get products data', async () => {
    jest.spyOn(dataService, 'getProducts').mockReturnValueOnce(Promise.resolve(mockProductData));
    const expected = {
      statusCode: 200,
      body: JSON.stringify(mockProductData),
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    };

    const result = await getProductList();

    expect(result).toEqual(expected);
  });
});