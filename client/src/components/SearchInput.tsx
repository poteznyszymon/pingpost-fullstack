import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";

const SearchInput = () => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative hidden sm:block">
        <Input id="searchField" className="pe-10  rounded-2xl"/>
        <label htmlFor="searchField">
          <SearchIcon className="absolute right-3 top-1/2 hover:text-primary cursor-pointer -translate-y-1/2 transform text-muted-foreground" />
        </label>
      </div>
    </form>
  );
};

export default SearchInput;
