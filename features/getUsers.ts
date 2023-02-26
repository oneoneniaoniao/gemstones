import { collection, getDocs, query } from "firebase/firestore";
import { db } from "./firebase";
import { UserType } from "./types";

const getUsers = async() => {
  const allUsers: UserType[] = [];
  await getDocs(query(collection(db, "users")))
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        allUsers.push({
          uid: doc.id,
          displayName: doc.data().displayName,
          photoURL: doc.data().photoURL,
          profile: doc.data().profile,
        });
      });
    })
    .catch((err) => {
      alert(err.message);
    });
  return allUsers;
};

export default getUsers;
