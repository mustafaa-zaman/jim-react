import React, { useMemo, useState } from "react";
import questionIcon from "./icons/question-icon.svg";
import likeIcon from "./icons/like-icon.svg";
import chartIcon from "./icons/chart-icon.svg";
import commitIcon from "./icons/commit-icon.svg";
import shareIcon from "./icons/share-icon.svg";

// Sample data for demonstration
const apiDATA = {
  content: "🔥 Want to speak English, Read this first like a native speaker? Read this like a native speaker? Read this first.",
  like: "99",
  chart: "28",
  commit: "29",
  share: "88",
  notPossible: { users: Array(6).fill({ userId: 1, image: "" }) },
  happeningNow: { users: Array(5).fill({ userId: 1, image: "" }) },
};

// Main Quiz component
const Quiz = () => {
  const [isSelected, setIsSelected] = useState(false);
  const { content, like, chart, commit, share, notPossible, happeningNow } = apiDATA;

  const { percentage, bgColor, showNotPossible, showHappeningNow } = usePercentageAndColor(
    notPossible.users.length,
    happeningNow.users.length
  );

  return (
    <div className="flex flex-col gap-4 border p-4 w-[640px]">
      <TabSection
        isSelected={isSelected}
        setIsSelected={setIsSelected}
        bgColor={bgColor}
        percentage={percentage}
        showNotPossible={showNotPossible}
        showHappeningNow={showHappeningNow}
      />
      <ContentSection content={content} />
      <FooterSection like={like} chart={chart} commit={commit} share={share} />
    </div>
  );
};

// TabSection component with buttons
const TabSection = ({
  isSelected,
  setIsSelected,
  bgColor,
  percentage,
  showNotPossible,
  showHappeningNow
}) => (
  <div className={`flex items-center ${isSelected ? `${bgColor} rounded-full border` : "gap-2.5"}`}>
    <Button
      onClick={() => setIsSelected(true)}
      align="left"
      isSelected={isSelected}
      percentage={percentage.notPossible}
      transparent={!showNotPossible}
    >
      Not Possible
    </Button>
    <Button
      onClick={() => setIsSelected(true)}
      align="right"
      isSelected={isSelected}
      percentage={percentage.happeningNow}
      transparent={!showHappeningNow}
    >
      Happening Now
    </Button>
  </div>
);

// ContentSection component for displaying content
const ContentSection = ({ content }) => (
  <div className="flex items-center bg-[#F0F0F3] p-2 rounded-md">
    <p className="flex-1 text-[#60646C] hover:underline">{content}</p>
  </div>
);

// FooterSection component for social interactions
const FooterSection = ({ like, chart, commit, share }) => (
  <div className="flex justify-between items-center">
    <IconWithCount icon={questionIcon} count="1024 SOC" bgClass="bg-[#FFC53D]" />
    <div className="flex gap-6">
      <SocialButton icon={likeIcon} count={like} />
      <SocialButton icon={chartIcon} count={chart} />
      <SocialButton icon={commitIcon} count={commit} />
      <SocialButton icon={shareIcon} count={share} />
    </div>
  </div>
);

// Button component with dynamic styles
const Button = ({ children, isSelected, align, percentage, transparent, ...props }) => {
  const isLeftAligned = align === "left";
  const baseStyles = `relative w-full px-6 py-2 border-[#1C2024] font-bold`;
  const btnStyles = isSelected
    ? `rounded-full ${!transparent && (isLeftAligned ? "bg-black" : "bg-white")} ${
        isLeftAligned ? "text-white" : "text-black"
      }`
    : `${isLeftAligned ? "rounded-s-full" : "rounded-e-full"} bg-white border group-hover:bg-[#F0F0F3] text-[#1C2024]`;

  const borderStyles = `${isLeftAligned ? "-mr-2 border-r right-0" : "-ml-2 border-l left-0"} border-t border-b -skew-x-12`;

  return (
    <div className={`group relative ${isSelected ?"transition-all duration-300 ease-out" : "mx-2"}`} style={{ width: isSelected ? `${percentage}%` : "100%" }}>
      <button {...props} className={`${baseStyles} ${btnStyles}`} disabled={isSelected}>
        {isSelected ? `${percentage}%` : children}
      </button>
      {!isSelected && <div className={`absolute inset-y-0 w-4 border-[#1C2024] ${borderStyles} bg-white group-hover:bg-[#F0F0F3]`} />}
    </div>
  );
};

// IconWithCount component to show icons with count
const IconWithCount = ({ icon, count, bgClass }) => (
  <div className={`group flex items-center gap-1 ${bgClass} rounded-full hover:bg-[#F4D10016]`}>
    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
      <img src={icon} alt="icon" />
    </div>
    <div className="text-sm text-white pr-2 group-hover:text-[#FFC53D]">{count}</div>
  </div>
);

// SocialButton component for social interaction icons
const SocialButton = ({ icon, count }) => (
  <div className="flex items-center gap-1">
    <div className="w-6 h-6 p-1 rounded-full hover:bg-[#F0F0F3]">
      <img src={icon} alt="icon" />
    </div>
    <div className="text-[#60646C] text-sm font-normal">{count}</div>
  </div>
);

// Custom hook to calculate percentage and color
const usePercentageAndColor = (notPossibleLength, happeningNowLength) => {
  return useMemo(() => {
    const totalVotes = notPossibleLength + happeningNowLength;
    const happeningNowPercent = ((happeningNowLength / totalVotes) * 100).toFixed(0);
    const notPossiblePercent = ((notPossibleLength / totalVotes) * 100).toFixed(0);

    return {
      percentage: { happeningNow: happeningNowPercent, notPossible: notPossiblePercent },
      bgColor: happeningNowPercent > notPossiblePercent ? "bg-black" : "bg-white",
      showHappeningNow: happeningNowPercent >= notPossiblePercent,
      showNotPossible: notPossiblePercent > happeningNowPercent,
    };
  }, [notPossibleLength, happeningNowLength]);
};

export default Quiz;
