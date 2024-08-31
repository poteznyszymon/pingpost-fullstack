import { Button } from "./ui/button";

interface FollowButtonProps {
  className?: string;
}

const FollowButton = ({ className }: FollowButtonProps) => {
  return <Button className={className}>Follow</Button>;
};

export default FollowButton;
