import React from "react";
import { useRouter } from "next/router";
import {
  collection,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  where,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Avatar, Box, Divider, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { db } from "@/features/firebase";
import { PostType, UserType } from "@/features/types";
import Post from "@/components/parts/Post";

const myPage = () => {
  const router = useRouter();
  const loginUserID = useAppSelector(selectLoginUserID);
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [openModal, setOpenModal] = React.useState(false);
  const [loginUserInfo, setLoginUserInfo] = React.useState<{
    profile: string;
    displayName: string;
    photoURL: string;
  }>();

  React.useEffect(() => {
    if (!loginUserID) {
      router.push("/");
    }
    Promise.all([
      getDocs(
        query(
          collection(db, "posts"),
          where("uid", "==", loginUserID),
          orderBy("createdAt", "desc")
        )
      ).then((querySnapshot: QuerySnapshot) => {
        setPosts(
          querySnapshot.docs.map((doc: QueryDocumentSnapshot) => ({
            id: doc.id,
            uid: doc.data().uid,
            imageURL: doc.data().imageURL,
            comment: doc.data().comment,
            comments: doc.data().comments,
            materials: doc.data().material,
            color: doc.data().color,
            category: doc.data().category,
            likedBy: doc.data().likedBy,
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt,
          }))
        );
      }),
      getDocs(query(collection(db, "users"))).then(
        (querySnapshot: QuerySnapshot) => {
          querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
            if (doc.id === loginUserID) {
              setLoginUserInfo({
                profile: doc.data().profile,
                displayName: doc.data().displayName,
                photoURL: doc.data().photoURL,
              });
              setUsers([
                {
                  uid: doc.id,
                  profile: doc.data().profile,
                  displayName: doc.data().displayName,
                  photoURL: doc.data().photoURL,
                },
              ]);
            }
          });
        }
      ),
    ]).catch((err) => {
      alert(err.message);
    });
  }, [loginUserID]);

  return (
    <>
      <Box sx={{ width: "100%", p: 2 }}>
        <Box mb={3}>
          <Box
            sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Avatar
              src={loginUserInfo?.photoURL}
              sx={{ my: 2, width: "50px", height: "50px" }}
            />
            <Typography variant="h6" sx={{ ml: 2, mr: 0.5 }}>
              {loginUserInfo?.displayName}
            </Typography>
            <IconButton onClick={() => setOpenModal(true)}>
              <SettingsIcon color="disabled" fontSize="small" />
            </IconButton>
          </Box>
          <Typography variant="body1">{loginUserInfo?.profile}</Typography>
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
            <Post post={post} users={users} isMyPage={true} />
          ))}
        </Box>
      </Box>
      <EditProfileModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        setLoginUserInfo={setLoginUserInfo}
      />
    </>
  );
};

export default myPage;
