import React, { FC } from "react";
import { RankingData } from "../../utils/firebase/firebase.utils";

type UserRankingCardProps = {
  user: RankingData;
  index: number;
};

const UserRankingCard: FC<UserRankingCardProps> = ({ user, index }) => (
  <div className="text-xs sm:text-base rounded-lg bg-white/20 p-3 flex justify-between items-center">
    <div className="flex flex-row space-x-3 items-center">
      <div>{index + 1}</div>
      <div className="border-r h-12" />
      <img
        className="h-9 w-9  sm:h-14 sm:w-14 rounded-2xl"
        src={user.photoURL}
        alt={user.displayName}
        referrerPolicy="no-referrer"
      />
      <div>{user.displayName}</div>
    </div>

    <div>{user.totalWorkingMinutes} Minutes</div>
  </div>
);

export default UserRankingCard;
