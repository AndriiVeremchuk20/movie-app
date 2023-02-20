import { appUserAtom } from "@/atom";
import { BiUserCircle } from "react-icons/bi";
import React from "react";
import getMediaPath from "@/utils/getMediaPath";

interface PropsUserAvatar {
  avatarPath: string|null;
}

const UserAvatar: React.FC<PropsUserAvatar> = ({ avatarPath }) => {
  return (
    <div className="w-full h-full">
      {avatarPath ? (
        <img
          src={getMediaPath(avatarPath)}
          alt={avatarPath}
          className={`w-full h-full rounded-full`}
        />
      ) : (
        <div>
          <BiUserCircle className={`w-full h-full rounded-full`} />
        </div>
      )}
    </div>
  );
};

export default React.memo(UserAvatar);
