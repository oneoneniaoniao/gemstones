import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "@/features/firebase";
import { MaterialType, PostType, UserType } from "@/features/types";
import Post from "@/components/parts/Post";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";

const index = () => {
  const loginUser = useAppSelector(selectLoginUserID);
  const router = useRouter();
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [posts, setPosts] = React.useState<PostType[]>([]);

  React.useEffect(() => {
    Promise.all([
      getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
      ).then((querySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            imageURL: doc.data().imageURL,
            comment: doc.data().comment,
            comments: doc.data().comments,
            materials: doc.data().material,
            color: doc.data().color,
            category: doc.data().category,
            likedBy: doc.data().likedBy,
            createdAt: doc.data().timestamp,
            editedAt: doc.data().editedAt,
          }))
        );
      }),
      getDocs(query(collection(db, "users"))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUsers((prev) => [
            ...prev,
            {
              uid: doc.id,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              profile: doc.data().profile,
            },
          ]);
        });
      }),
    ]).catch((err) => {
      alert(err.message);
    });
  }, [loginUser]);

  return (
    <>
      {/* <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          alignItems: "baseline",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Materials</Typography>
        <MaterialSelect setMaterial={setMaterial} />
      </Box>
      <Button variant="outlined">reset</Button> */}
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
          <Post post={post} users={users} />
        ))}
      </Box>
    </>
  );
};

export default index;
