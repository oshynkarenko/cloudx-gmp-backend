import {
  DynamoDBClient,
} from '@aws-sdk/client-dynamodb';
import * as process from 'process';
import {
  DynamoDBDocumentClient,
  QueryCommand,
  QueryCommandOutput,
  ScanCommand,
  ScanCommandOutput, TransactWriteCommand, TransactWriteCommandOutput
} from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from 'uuid'

const dynamo = new DynamoDBClient();
const client = DynamoDBDocumentClient.from(dynamo)

export const dataService = {
  getProducts: (): Promise<ScanCommandOutput> => {
    return client.send(new ScanCommand({
      TableName: process.env.PRODUCTS_TABLE_NAME,
    }));
  },

  getStocks: (): Promise<ScanCommandOutput> => {
    return client.send(new ScanCommand({
      TableName: process.env.STOCKS_TABLE_NAME,
    }));
  },

  getProductById: (id): Promise<QueryCommandOutput> => {
    // @ts-ignore
    return dynamo.send(new QueryCommand({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id }
    }));
  },

  getCountById: (id): Promise<QueryCommandOutput> => {
    return dynamo.send(new QueryCommand({
      TableName: process.env.STOCKS_TABLE_NAME,
      KeyConditionExpression: 'product_id = :product_id',
      ExpressionAttributeValues: { ':product_id': id }
    }));
  },

  createProduct: (productData): Promise<TransactWriteCommandOutput> => {
    if (!productData.id) {
      productData.id = uuidv4();
    }

    const { count, ...product } = productData
    const stock = {
      count: +count,
      product_id: productData.id,
    }

    return dynamo.send(new TransactWriteCommand({
      TransactItems: [
        {
          Put: {
            TableName: process.env.PRODUCTS_TABLE_NAME,
            Item: product,
          },
        },
        {
          Put: {
            TableName: process.env.STOCKS_TABLE_NAME,
            Item: stock,
          },
        }
      ],
    }));
  },
};
