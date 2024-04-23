"use client";

import UserAvatar from "./user.avatar";
import { useOthers, useSelf } from "../../../../liveblocks.config";
import { connectionIdToColor } from "@/lib/utils";

const MAX_SHOW_USERS = 1;

export const Participants = () => {
  const users = useOthers();
  const currentUser = useSelf();
  const hasMoreUsers = users.length > MAX_SHOW_USERS;

  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md">
      <div className="flex items-center gap-2">
        {currentUser && (
          <>
            <UserAvatar
              borderColor={connectionIdToColor(currentUser.connectionId)}
              src={currentUser?.info?.picture}
              name={`You`}
              fallback={currentUser?.info?.name?.[0] || "T"}
            ></UserAvatar>
          </>
        )}
        {users.length > 0 &&
          users.slice(0, MAX_SHOW_USERS).map(({ connectionId, info }) => {
            return (
              <UserAvatar
                borderColor={connectionIdToColor(connectionId)}
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "T"}
              ></UserAvatar>
            );
          })}

        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_SHOW_USERS} more`}
            fallback={`+${users.length - MAX_SHOW_USERS}`}
          ></UserAvatar>
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton = () => {
  return (
    <div className="absolute h-12 top-2 right-2 bg-white rounded-md p-3 flex items-center shadow-md w-[100px]"></div>
  );
};
