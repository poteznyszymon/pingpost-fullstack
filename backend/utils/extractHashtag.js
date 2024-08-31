export const extractHashtag = (text) => {
  const regex = /#\w+/g;
  return text.match(regex) || [];
};
