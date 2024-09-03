import { motion } from "framer-motion";

interface FeedSwitchProps {
  firstFeed: string;
  SecondFeed: string;
  activeFeed: string;
  changeFeed: (feed: "for-you" | "following") => void;
}

const FeedSwitch = ({
  firstFeed,
  SecondFeed,
  activeFeed,
  changeFeed,
}: FeedSwitchProps) => {
  return (
    <motion.div className="bg-card w-full h-[2.7rem] rounded-2xl shadow-sm flex p-[0.4rem] text-sm relative overflow-hidden">
      <motion.div
        layout
        initial={false}
        animate={{ x: activeFeed === "for-you" ? 0 : "95%" }}
        className="absolute bg-background w-1/2 h-[1.9rem] rounded-xl"
      />
      <div
        className={`w-1/2 relative flex justify-center items-center cursor-pointer z-10 ${
          activeFeed === "for-you" ? "font-semibold" : "text-muted-foreground"
        }`}
        onClick={() => changeFeed("for-you")}
      >
        <p>{firstFeed}</p>
      </div>
      <div
        className={`w-1/2 relative flex justify-center items-center cursor-pointer z-10 ${
          activeFeed === "following" ? "font-semibold" : "text-muted-foreground"
        }`}
        onClick={() => changeFeed("following")}
      >
        <p>{SecondFeed}</p>
      </div>
    </motion.div>
  );
};

export default FeedSwitch;
