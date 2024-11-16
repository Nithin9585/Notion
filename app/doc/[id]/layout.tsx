import { auth } from "@clerk/nextjs/server";
import RoomProvider from "@/components/roomprovider";
function DocLayout({params : {id},children,}:{
  children : React.ReactNode;
  params: {id:string};
}) {
  return<RoomProvider roomId={id}>
      {children}
    </RoomProvider>;
  
}

export default DocLayout
