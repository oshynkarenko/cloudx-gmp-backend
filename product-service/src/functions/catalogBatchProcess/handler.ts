import { dataService, loggerService } from '../../helpers';
import { SQSEvent } from 'aws-lambda';
import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';

export const catalogBatchProcess  = async (event: SQSEvent) =>  {
  loggerService.logIncomingRequest(event);
  const sns = new SNSClient({ region: 'eu-north-1'});

  try {
    let priceLevelIndication: string;
    let message: string;
    const highPriceThreshold = 30;
    const LOW_PRICE = 'LOW';
    const HIGH_PRICE = 'HIGH'

    for (const record of event.Records) {
      const item = JSON.parse(record.body);
      priceLevelIndication = item.price > highPriceThreshold ? HIGH_PRICE : LOW_PRICE;

      await dataService.createProduct(item)
          .then(() => {
            message = `Product '${item.id}/${item.title}' has been successfully created`;
          })
          .catch(() => {
            message = `Product '${item.id}/${item.title}' could not be created`;
          });

      await sns.send(new PublishCommand({
        TopicArn: process.env.SNS_ARN,
        Message: message,
        Subject: 'Product created',
        MessageAttributes: {
          priceLevel: {
            DataType: 'String',
            StringValue: priceLevelIndication,
          }
        }
      }));
    }
  } catch (error) {
    loggerService.logError(error);
  }
}
