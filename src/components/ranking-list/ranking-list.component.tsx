import React from "react";
import { useSelector } from "react-redux";

import { selectRankingData } from "../../store/slices/reports/reports.selector";

import UserRankingCard from "../user-ranking-card/user-ranking-card.component";

const RankingList = () => {
  const currentRankingData = useSelector(selectRankingData);

  return (
    <div className="bg-white/10 p-3 flex flex-col w-5/6 space-y-2 mb-10 rounded-lg">
      <div className="text-sm sm:text-lg font-medium text-center">
        Ranking Data - Top 10 Users
      </div>
      {currentRankingData &&
        currentRankingData.map((user, index) => (
          <UserRankingCard key={index} user={user} index={index} />
        ))}
    </div>
  );
};

export default RankingList;
