"use client";
import { ReactNode } from "react";
import { RoomProvider } from "../../liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface IRoomProps {
  children: ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode>;
}

const Room = ({ children, roomId, fallback }: IRoomProps) => {
  return (
    <>
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>
          {() => children}
        </ClientSideSuspense>
      </RoomProvider>
    </>
  );
};

export default Room;
