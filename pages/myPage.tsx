import React from "react";
import {
  collection,
  getDocs,
  query,
  QuerySnapshot,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { Avatar, Box, IconButton, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import EditProfileModal from "@/components/modals/EditProfileModal";
import { db } from "@/features/firebase";

const myPage = () => {
  const loginUserID = useAppSelector(selectLoginUserID);
  const [openModal, setOpenModal] = React.useState(false);
  const [loginUserInfo, setLoginUserInfo] = React.useState<{
    profile: string;
    displayName: string;
    photoURL: string;
  }>();

  React.useEffect(() => {
    getDocs(query(collection(db, "users")))
      .then((querySnapshot: QuerySnapshot) => {
        querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
          if (doc.id === loginUserID) {
            setLoginUserInfo({
              profile: doc.data().profile,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
            });
          }
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, [loginUserID]);

  console.log(loginUserInfo)

  return (
    <>
      <Box sx={{ width: "100%", p: 2, m: 2 }}>
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

        <Box
          sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></Box>
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
