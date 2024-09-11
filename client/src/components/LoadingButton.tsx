import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./ui/button";
import { Loader2 } from "lucide-react";

interface LoadingButton extends ButtonProps {
  loading: boolean;
}

const LoadingButton = ({
  loading,
  disabled,
  className,
  ...props
}: LoadingButton) => {
  return (
    <Button
      disabled={loading || disabled}
      className={cn("flex items-center gap-2 rounded-2xl", className)}
      {...props}
    >
      {loading && <Loader2 className="size-5 animate-spin " />}
      {props.children}
    </Button>
  );
};

export default LoadingButton;
