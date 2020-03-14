import WORDS from './words';

export function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(WORDS.length));
}

export function generateWords(wordCount) {
  const words = [];

  for (let i = 0; i < wordCount; i += 1) {
    words.push(WORDS[getRandomInt()]);
  }
  const formattedWords = `<p>${words.join(' ')}</p>`;

  return formattedWords;
}

export function generateParagraphs(paragraphCount) {
  const paragraphs = [];
  for (let i = 0; i < paragraphCount; i += 1) {
    paragraphs.push(generateWords(50));
  }
  return paragraphs;
}

export function generateLoremIpsum(isParagraph, count) {
  if (isParagraph) {
    return generateParagraphs(count);
  }

  return generateWords(count);
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
      ? generateLoremIpsum(isParagraph, count).join(' ')
      : generateLoremIpsum(isParagraph, count);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(error);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: response }),
  });
}
