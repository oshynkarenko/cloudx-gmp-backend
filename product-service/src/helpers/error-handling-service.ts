const headers = {
    'Access-Control-Allow-Origin': '*',
};

export const errorHandlingService = {
  notFoundHandler: (message: string) => {
    return ({
      statusCode: 404,
      headers,
      body: JSON.stringify({ message }),
    });
  },

  genericErrorHandler: () => {
    const message = 'Something went wrong, please try again later';
    return ({
      statusCode: 500,
      headers,
      body: JSON.stringify({ message }),
    });
  },

  clientErrorHandler: () => {
    const message = 'Request data is not valid';
    return ({
      statusCode: 400,
      headers,
      body: JSON.stringify({ message }),
    });
  },
};
