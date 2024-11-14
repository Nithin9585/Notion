export type User = {
    fullName : string;
    email : string,
    image: string;
};

export type RoomDocument = {
    createdAt: string;
    role: "owner" | "editor";
    roomId: string;
    userId: string ;
}