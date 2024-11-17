'use client'
import RoomProvider from "@/components/roomprovider";
import { usePathname } from "next/navigation";

function DocLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  if (!id) {
    return <div>Error: Room ID is required to access this page.</div>;
  }

  return (
    <RoomProvider roomId={id}>
      {children}
    </RoomProvider>
  );
}

export default DocLayout;
