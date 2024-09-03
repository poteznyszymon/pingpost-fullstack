import DropDownAvatar from "@/components/DropDownAvatar";
import SearchInput from "@/components/SearchInput";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 bg-card shadow-sms ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 flex-wrap">
        <Link to="/" className="text-2xl font-bold text-primary">
          pingpost
        </Link>
        <div className="flex items-center gap-5">
          <SearchInput />
          <DropDownAvatar />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
