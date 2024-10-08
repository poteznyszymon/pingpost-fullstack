export const extractHashtag = (text) => {
  const regex = /(?:^|\s)#(\w+)/g;
  const matches = [];
  let match;

  while ((match = regex.exec(text)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};
