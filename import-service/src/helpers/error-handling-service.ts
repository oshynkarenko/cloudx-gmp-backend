const headers = {
  'Access-Control-Allow-Origin': '*',
};

export const errorHandlingService = {
  genericErrorHandler: () => {
    const message = 'Something went wrong, please try again later';
    return ({
      statusCode: 500,
      headers,
      body: JSON.stringify({ message }),
    });
  },
};
