'use client'

import { useMyPresence, useOthers } from "@liveblocks/react/suspense";
import { PointerEvent } from "react";
import Followpointer from "./followpointer";

function Livecursorprovider({ children }: { children: React.ReactNode }) {
    const [MyPresence, updateMyPresence] = useMyPresence();
    const others = useOthers();

    function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
        const cursor = { x: Math.floor(e.pageX), y: Math.floor(e.pageY) };
        updateMyPresence({ cursor });
    }

    function handlePointerLeave() {
        // updateMyPresence({ cursor  });
    }

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
        >
            {others
                .filter((other) => other.presence.cursor !== null)
                .map((other) => {
                    const { connectionId, presence } = other;
                    return (
                        <Followpointer
                            key={connectionId}
                            info={other.info}
                            x={presence.cursor!.x}
                            y={presence.cursor!.y}
                        />
                    );
                })}
            {children}
        </div>
    );
}

export default Livecursorprovider;
