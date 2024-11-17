'use server' // server action from client component to server component
import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {

   const { sessionClaims }  = await auth(); 
    
    const docCollectionRef = adminDb.collection("documents");

    const docRef = await docCollectionRef.add({
        title: "New Doc"
    });
 await adminDb.collection('users')
 .doc(sessionClaims?.email!)
 .collection('rooms')
 .doc(docRef.id)
 .set({
    userId:sessionClaims?.email,
    role:"owner",
    createdAt: new Date(),
    roomId: docRef.id,
 })

 return {docId: docRef.id};
}

export  async function deleteDocument(roomId:string) {
   console.log("deleteDocument: ", roomId);

      try{
         // delete the document reference itself
         await adminDb.collection("documents").doc(roomId).delete();
         const query = await adminDb
         .collectionGroup("rooms")
         .where("roomId" , "==" , roomId)
         .get();
         
         const batch = adminDb.batch();
         //delete the room reference in the users collection for every user in the room
         query.docs.forEach((doc)=>{
            batch.delete(doc.ref);
         });
         await batch.commit(); 
         //delete the room in live blocks
         await liveblocks.deleteRoom(roomId);

         return { success: true};

      } catch(error){
         console.error(error);
         return {success: false};

      }
   
}