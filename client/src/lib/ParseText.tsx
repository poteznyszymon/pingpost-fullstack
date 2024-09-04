import { Link } from "react-router-dom";

export const parseText = (text: string) => {
  const hashtagRegex = /#(\w+)/g;
  const linkRegex = /(https?:\/\/[^\s]+)/g;

  const splitText = text.split(/(#\w+|https?:\/\/[^\s]+)/g);

  return splitText.map((part, index) => {
    if (hashtagRegex.test(part)) {
      const hashtag = part.slice(1);
      return (
        <Link
          to={`/hashtag/${hashtag}`}
          key={index}
          className=" text-primary hover:underline font-semibold"
        >
          #{hashtag}
        </Link>
      );
    } else if (linkRegex.test(part)) {
      return (
        <a
          href={part}
          key={index}
          className=" text-primary hover:underline font-semibold"
          target="_blank"
          rel="noopener noreferrer"
        >
          {part}
        </a>
      );
    } else {
      // Zwykły tekst
      return part;
    }
  });
};
