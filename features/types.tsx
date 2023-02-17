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
  createdAt: string;
  editedAt: string;
};

export type MaterialType = { value: string; label: string }[] | [];
