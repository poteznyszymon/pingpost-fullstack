import DropDownAvatar from "@/components/DropDownAvatar";
import SearchInput from "@/components/SearchInput";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Navbar = () => {
  const queryClient = useQueryClient();

  const handleLinkClick = () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <header className="sticky top-0 z-30 bg-card shadow-sm ">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 flex-wrap">
        <Link
          to="/"
          className="text-2xl font-bold text-primary"
          onClick={handleLinkClick}
        >
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
