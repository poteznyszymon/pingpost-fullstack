import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

const ChangeThemeButton = () => {
  const { setTheme, theme } = useTheme();

  return (
    <div
    title="change theme"
      className="text-primary cursor-pointer "
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? <Moon /> : <Sun />}
    </div>
  );
};

export default ChangeThemeButton;
