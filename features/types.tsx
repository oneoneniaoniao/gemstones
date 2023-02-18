import { Timestamp } from "firebase/firestore";

export type PostType = {
  id: string;
  uid: string;
  imageURL: string;
  comment: string;
  comments: { uid: string; comment: string; commentedAt: string }[] | [];
  materials: { value: string; label: string }[] | [];
  color:
    | "black"
    | "white"
    | "red"
    | "blue"
    | "green"
    | "yellow"
    | "orange"
    | "purple"
    | "other"
    | "mixed"
    | "pastel"
    | "";
  category: "bracelet" | "earring" | "necklace" | "ring" | "other" | "";
  likedBy: string[];
  createdAt: Timestamp;
  editedAt: Timestamp | "";
};

export type MaterialType = { value: string; label: string } 

export type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
  profile: string;
};
