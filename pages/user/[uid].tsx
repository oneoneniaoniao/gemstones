import React from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { Box } from "@mui/system";
import { Avatar, Divider, Typography } from "@mui/material";
import { db } from "@/features/firebase";
import { UserType, PostType } from "@/features/types";
import Post from "@/components/parts/Post";

const UserPage = () => {
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = React.useState<UserType>({
    uid: "",
    displayName: "",
    photoURL: "",
    profile: "",
  });
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [users, setUsers] = React.useState<UserType[]>([]);

  React.useEffect(() => {
    Promise.all([
      getDocs(collection(db, "users")).then((querySnapshot) => {
        const allUsers: UserType[] = [];
        querySnapshot.forEach((doc) => {
          if (doc.id === uid) {
            setUser({
              uid: doc.id,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              profile: doc.data().profile,
            });
          }
          allUsers.push({
            uid: doc.id,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            profile: doc.data().profile,
          });
          setUsers(allUsers);
        });
      }),
      getDocs(
        query(
          collection(db, "posts"),
          where("uid", "==", uid),
          orderBy("createdAt", "desc")
        )
      ).then((querySnapshot: QuerySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            id: doc.id,
            uid: doc.data().uid,
            imageURL: doc.data().imageURL,
            authorComment: doc.data().authorComment,
            comments: doc.data().comments,
            materials: doc.data().materials,
            color: doc.data().color,
            category: doc.data().category,
            likedBy: doc.data().likedBy,
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt,
            imageRef: doc.data().imageRef,
          }))
        );
      }),
    ]).catch((error) => {
      alert(error.message);
    });
  }, [uid]);

  return (
    <>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box mb={3}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Avatar
              src={user.photoURL}
              sx={{ my: 1, width: "50px", height: "50px" }}
            />
            <Typography variant="h6" sx={{ ml: 2, mr: 0.5 }}>
              {user.displayName}
            </Typography>
          </Box>
          <Typography variant="body1">{user.profile}</Typography>
        </Box>
        <Divider />
        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {posts.map((post) => (
            <Post post={post} users={users} key={post.id} />
          ))}
        </Box>
      </Box>
    </>
  );
};

export default UserPage;
