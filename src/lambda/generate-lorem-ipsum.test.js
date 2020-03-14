import { handler } from './generate-lorem-ipsum';

test('wordgenerator', async () => {
  const event = {
    queryStringParameters: {
      paragraphs: '4',
      words: '2',
    },
  };
  const context = 'context';
  const callback = (error, response) => {
    expect(response.statusCode).toEqual(200);
    expect(typeof response.body).toBe('string');
  };
  await handler(event, context, callback);
});
