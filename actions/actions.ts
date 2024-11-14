'use server'
import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    // Retrieve session claims to verify user authentication
    const { sessionClaims } = await auth();

    if (!sessionClaims) {
        throw new Error("User not authenticated");
    }

    // Reference to Firestore collection for documents
    const docCollectionRef = adminDb.collection("documents");

    // Add a new document with a default title
    const docRef = await docCollectionRef.add({
        title: "New Doc"
    });

    // Reference to the user's "rooms" collection
    const userRoomRef = adminDb
        .collection('users')
        .doc(sessionClaims?.email!)
        .collection('rooms')
        .doc(docRef.id);

    // Set up the room data for the user (only once)
    await userRoomRef.set({
        userId: sessionClaims?.email!,
        role: "owner",
        createdAt: new Date(),
        roomId: docRef.id,
    });

    // Return the ID of the newly created document
    return { docId: docRef.id };
}
