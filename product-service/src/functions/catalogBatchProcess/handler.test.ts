import { catalogBatchProcess } from './handler';
import { dataService, loggerService } from '../../helpers';
import { SNSClient } from '@aws-sdk/client-sns';
import { mockClient } from 'aws-sdk-client-mock';

jest.mock('../../helpers/data-service');
jest.mock('../../helpers/logger-service');
const mockSns = mockClient(SNSClient);

describe('catalogBatchService handler', () => {
  const mockItem = {
    description: 'Test description',
    id: '123',
    price: 150,
    title: 'Test Product'
  };

  const mockEvent = {
    Records: [{ body: JSON.stringify(mockItem) }],
  } as any;

  it('should log incoming event', async () => {
    const logger = jest.spyOn(loggerService, 'logIncomingRequest');

    await catalogBatchProcess(mockEvent);

    expect(logger).toHaveBeenCalledWith(mockEvent);
  });

  it('should create product', async () => {
    const createProductSpy = jest.spyOn(dataService, 'createProduct').mockReturnValueOnce(Promise.resolve({} as any));

    await catalogBatchProcess(mockEvent);

    expect(createProductSpy).toHaveBeenCalledWith(mockItem);
  });

  it('should send message on successful product creation', async () => {
    jest.spyOn(dataService, 'createProduct').mockReturnValueOnce(Promise.resolve({} as any));
    const snsSpy = jest.spyOn(mockSns, 'send');

    const expected = {
      TopicArn: {
        Ref: 'CreateProductTopic',
      },
      Message: 'Product 123/Test Product has been successfully created',
      Subject: 'Product created',
      MessageAttributes: {
        priceLevel: {
          DataType: 'String',
          StringValue: 'HIGH',
        }
      }
    };

    await catalogBatchProcess(mockEvent);

    await expect(snsSpy).toHaveBeenCalledWith(expected);
  });
});