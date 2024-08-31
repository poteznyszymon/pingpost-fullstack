import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <h1 className="text-5xl font-semibold">404</h1>
      <p className="text-xl pt-5">Oops! You're lost.</p>
      <p className="text-sm pb-5 text-muted-foreground">
        The page you looking for was not found
      </p>
      <Link to="/">
        <Button>Back to home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
