'use client'
import { collectionGroup, query, where, DocumentData } from "firebase/firestore";
import { MenuIcon } from "lucide-react";
import NewdocumentButton from "./NewdocumentButton";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useUser } from "@clerk/nextjs";
import { db } from "@/firebase";
import { useEffect, useState } from "react";
import SidebarOption from "./SidebarOption";

interface RoomDocument extends DocumentData {
  createdAt: string;
  role: "owner" | "editor";
  roomId: string;
  userId: string;
}

function Sidebar() {
  const { user, isLoaded } = useUser();
  const [groupedData, setGroupedData] = useState<{
    owner: RoomDocument[];
    editor: RoomDocument[];
  }>({
    owner: [],
    editor: [],
  });

  const [data, loading, error] = useCollection(
    user &&
      query(
        collectionGroup(db, "rooms"),
        where("userId", "==", user?.emailAddresses[0].toString())
      )
  );

  useEffect(() => {
    if (!data) return; // Handle loading state or display a message

    const grouped = data.docs.reduce<{
      owner: RoomDocument[];
      editor: RoomDocument[];
    }>((acc, curr) => {
      const roomData = curr.data() as RoomDocument;
      if (roomData.role === "owner") {
        acc.owner.push({
          id: curr.id,
          ...roomData,
        });
      } else {
        acc.editor.push({
          id: curr.id,
          ...roomData,
        });
      }
      return acc;
    }, {
      owner: [],
      editor: [],
    });

    setGroupedData(grouped);
  }, [data]);

  const menuOptions = (
    <>
      <NewdocumentButton />
      <div className="flex justify-center flex-col py-4 space-y-4   text-center">
      {!loading && ( 
        groupedData.owner.length === 0 ? (
          <h2>No documents found</h2>
        ) : (
          <>
            <h2 className="text-xl">My Documents</h2>
            
              {groupedData.owner.map((doc) => (
                <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
              ))}
            
          </>
        )
      )}
      {error && <p>Error loading documents: {error.message}</p>}
      </div>
      {groupedData.editor.length > 0 && (
        <>
        <h2 className="text-xl">Shared with me</h2>
        
          {groupedData.editor.map((doc) => (
            <SidebarOption key={doc.id} id={doc.id} href={`/doc/${doc.id}`}/>
          ))}
        
      </>
      )}

    </>
  );

  return (
    <div className="p-2 md:p-5 bg-gray-200 relative">
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon className="p-2 hover:opacity-30 rounded-lg" size={40} />
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader className="">
              <SheetTitle className="flex justify-center flex-col py-4 space-y-4   text-center ">Menu</SheetTitle>
              <div>{menuOptions}</div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden md:inline flex justify-center flex-col py-4 space-y-4   text-center ">
        <h1 className="text-xl">Menu</h1>
        {menuOptions}
       
      </div>
    </div>
  );
}

export default Sidebar;
