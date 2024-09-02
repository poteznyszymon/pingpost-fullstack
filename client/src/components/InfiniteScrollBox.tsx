import { PropsWithChildren } from "react";
import { useInView } from "react-intersection-observer";

interface InfiniteScrollBoxProps extends PropsWithChildren {
  className?: string;
  onBottom: () => void;
}

const InfiniteScrollBox = ({
  className,
  children,
  onBottom,
}: InfiniteScrollBoxProps) => {
  const { ref } = useInView({
    onChange(inView) {
      if (inView) {
        onBottom();
      }
    },
  });

  return (
    <div className={className}>
      {children}
      <div ref={ref} />
    </div>
  );
};

export default InfiniteScrollBox;
