import {
  handler,
  generateWords,
  generateParagraphs,
} from './generate-lorem-ipsum';

test('generateParagraphs', () => {
  expect(typeof generateParagraphs(50)).toBe('string');

  expect(
    generateParagraphs(11)
      .join(',')
      .split('<p>')
  ).toHaveLength(12);

  expect(
    generateParagraphs(500)
      .join(',')
      .split('<p>')
  ).toHaveLength(501);
});

test('generateWords', () => {
  expect(typeof generateWords(50)).toBe('string');
  expect(generateWords(50).split(',')).toBeTruthy();
});

test('handler', async () => {
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
