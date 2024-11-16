'use client';

import { LiveblocksProvider as LBProvider } from "@liveblocks/react/suspense";

function LiveBlocksProvider({ children }: { children: React.ReactNode }) {
    if (!process.env.NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY) {
        throw new Error("NEXT_PUBLIC_LIVEBLOCKS_PUBLIC_KEY is not set in the environment variables.");
    }

    return (
        <LBProvider

    authEndpoint="/api/auth-endpoint"
>

    {children}
</LBProvider>

    );
}

export default LiveBlocksProvider;
