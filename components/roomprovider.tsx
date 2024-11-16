'use client';

import { ClientSideSuspense, RoomProvider as RoomProviderWrapper } from "@liveblocks/react/suspense";
import LoadingSpinner from "./LoadingSpinner";
import Livecursorprovider from "./Livecursorprovider";

function RoomProvider({ roomId, children }: { roomId: string; children: React.ReactNode }) {
  const initialPresence = {
    cursor: { x: 0, y: 0 },  // default cursor position
  };

  return (
    <RoomProviderWrapper id={roomId} initialPresence={initialPresence}>
      <ClientSideSuspense fallback={<LoadingSpinner />}>
        <Livecursorprovider>
          {children}
        </Livecursorprovider>
      </ClientSideSuspense>
    </RoomProviderWrapper>
  );
}

export default RoomProvider;
