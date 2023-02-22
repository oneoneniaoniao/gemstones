import { Timestamp } from "firebase/firestore";

export type PostType = {
  id: string;
  uid: string;
  imageURL: string;
  comment: string;
  comments: { uid: string; comment: string; commentedAt: string }[] | [];
  materials: { value: string; label: string }[] | [];
  color: string;
  category: string;
  likedBy: string[];
  createdAt: Timestamp,
  editedAt: Timestamp | "";
  imageRef: string;
};

export type MaterialType = { value: string; label: string };

export type UserType = {
  uid: string;
  displayName: string;
  photoURL: string;
  profile: string;
};

export type PostFeaturesType = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  material: MaterialType[];
  setMaterial: React.Dispatch<React.SetStateAction<MaterialType[]>>;
};
