import { AWSError } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';
import { DocumentClient, PutItemOutput, ScanOutput } from 'aws-sdk/clients/dynamodb';
import * as process from 'process';

import { ProductData } from '../types';

const dynamo = new DocumentClient();

export const dataService = {
  getProducts: (): Promise<PromiseResult<ScanOutput, AWSError>> => {
    return dynamo.scan({
      TableName: process.env.PRODUCTS_TABLE_NAME,
    }).promise();
  },

  getStocks: (): Promise<PromiseResult<ScanOutput, AWSError>> => {
    return dynamo.scan({
      TableName: process.env.STOCKS_TABLE_NAME,
    }).promise();
  },

  getProductById: (id: string): Promise<PromiseResult<ScanOutput, AWSError>> => {
    return dynamo.query({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      KeyConditionExpression: 'id = :id',
      ExpressionAttributeValues: { ':id': id }
    }).promise();
  },

  getCountById: (id: string): Promise<PromiseResult<ScanOutput, AWSError>> => {
    return dynamo.query({
      TableName: process.env.STOCKS_TABLE_NAME,
      KeyConditionExpression: 'product_id = :product_id',
      ExpressionAttributeValues: { ':product_id': id }
    }).promise();
  },

  createProduct: (product: ProductData): Promise<PromiseResult<PutItemOutput, AWSError>> => {
    return dynamo.put({
      TableName: process.env.PRODUCTS_TABLE_NAME,
      Item: product,
    }).promise()
  },
};
