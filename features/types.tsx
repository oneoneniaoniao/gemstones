import { Timestamp } from "firebase/firestore";

export type PostType = {
  id: string;
  uid: string;
  imageURL: string;
  authorComment: AuthorCommentType;
  comments: CommentType[] | [];
  materials: MaterialType[] | [];
  color: string;
  category: string;
  likedBy: string[];
  createdAt: Timestamp;
  editedAt: Timestamp | "";
  imageRef: string;
};

export type MaterialType = { value: string; label: string };

export type CommentType = { uid: string; comment: string; commentedAt: string };

export type AuthorCommentType = {
  comment: string;
  commentedAt: Timestamp|"";
};

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
  materials: MaterialType[];
  setMaterials: React.Dispatch<React.SetStateAction<MaterialType[]>>;
};
