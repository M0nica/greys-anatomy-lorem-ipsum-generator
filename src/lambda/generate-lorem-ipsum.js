import WORDS from './words';

export function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(WORDS.length));
}

export function generateWords(wordCount) {
  const words = Array(wordCount)
    .fill()
    .map(() => WORDS[getRandomInt()]);

  return `<p>${words.join(' ')}</p>`;
}

export function generateParagraphs(paragraphCount) {
  return Array(paragraphCount)
    .fill()
    .map(() => generateWords(50));
}

export function generateLoremIpsum(isParagraph, count) {
  return isParagraph ? generateParagraphs(count) : generateWords(count);
}

export function handler(event, context, callback) {
  const { queryStringParameters } = event;
  const { paragraphs = 0, words = 0 } = queryStringParameters;

  let isParagraph = Boolean(paragraphs);
  let count;

  if (paragraphs >= 1) {
    count = paragraphs;
  } else if (words > 0) {
    count = words;
  } else {
    isParagraph = true;
    count = 4;
  }

  let response;

  try {
    response = isParagraph
      ? generateLoremIpsum(isParagraph, parseInt(count, 10)).join(' ')
      : generateLoremIpsum(isParagraph, parseInt(count, 10));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: response }),
  });
}
