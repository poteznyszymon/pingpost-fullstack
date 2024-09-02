import { Link } from "react-router-dom";

export const parseHashtags = (text: string) => {
  const regex = /#(\w+)/g;
  const parts = text.split(regex);

  return parts.map((part, index) => {
    if (index % 2 === 1) {
      return (
        <Link
          to={`/hashtag/${part}`}
          key={index}
          className=" text-primary hover:underline font-semibold"
        >
          #{part}
        </Link>
      );
    } else {
      return part;
    }
  });
};
