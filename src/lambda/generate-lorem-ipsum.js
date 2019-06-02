import { WORDS } from "./words";
export function handler(event, context, callback) {
  const { queryStringParameters } = event;
  const { paragraphs = 0, words = 0 } = queryStringParameters;

  let isParagraph = Boolean(paragraphs);
  let count;

  if (paragraphs > 1) {
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
      ? generateLoremIpsum(isParagraph, count).join(" ")
      : generateLoremIpsum(isParagraph, count);
  } catch (error) {
    console.log(error);
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({ msg: response })
  });
}

export function generateLoremIpsum(isParagraph, count) {
  if (isParagraph) {
    console.log(`Trying to construct ${count} paragraphs`);
    return generateParagraphs(count);
  } else {
    console.log(`Trying to return ${count} words`);
    return generateWords(count);
  }
}

export function generateWords(wordCount) {
  let words = [];
  console.log(wordCount);

  for (var i = 0; i < wordCount; i++) {
    words.push(WORDS[getRandomInt()]);
  }
  const formattedWords = `<p>${words.join(" ")}</p>`;

  return formattedWords;
}

export function generateParagraphs(paragraphCount) {
  let paragraphs = [];
  for (var i = 0; i < paragraphCount; i++) {
    paragraphs.push(generateWords(50));
  }
  return paragraphs;
}

export function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(WORDS.length));
}
