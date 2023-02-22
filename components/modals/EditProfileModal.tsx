import React from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import { db, storage } from "@/features/firebase";

type Props = {
  openModal: boolean;
  setOpenModal: (isOpen: boolean) => void;
  setLoginUserInfo: (loginUserInfo: {
    profile: string;
    displayName: string;
    photoURL: string;
  }) => void;
};

const EditProfileModal = ({
  openModal,
  setOpenModal,
  setLoginUserInfo,
}: Props) => {
  const auth = getAuth();
  const LoginUserID = useAppSelector(selectLoginUserID);
  const [profile, setProfile] = React.useState("");
  const [displayName, setDisplayName] = React.useState("");
  const [photoURL, setPhotoURL] = React.useState("");
  const [avatarRef, setAvatarRef] = React.useState("");
  const [avatarImage, setAvatarImage] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (!auth.currentUser) return;
    if (openModal) return;
    getDoc(doc(db, "users", auth.currentUser!.uid)).then((doc) => {
      if (doc.exists()) {
        setProfile(doc.data().profile);
        setDisplayName(doc.data().displayName);
        setPhotoURL(doc.data().photoURL);
        setAvatarRef(doc.data().avatarRef);
      }
    });
  }, [auth.currentUser, openModal]);

  // To show the avatar image preview
  React.useEffect(() => {
    if (avatarImage) {
      setPhotoURL(URL.createObjectURL(avatarImage));
    }
  }, [avatarImage]);

  const handleImageChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setAvatarImage(e.target.files![0]);
      console.log(e.target.files![0]);
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    try {
      let url = photoURL; // To store the image URL
      let newAvatarRef = "";
      if (avatarImage) {
        if (avatarRef) {
          const oldAvatarRef = ref(storage, avatarRef);
          deleteObject(oldAvatarRef);
        }
        const randomChar = uuidv4();
        const fileName = randomChar + "_" + avatarImage.name;
        newAvatarRef = `avatars/${LoginUserID}/${fileName}`;
        const storageRef = ref(storage, newAvatarRef);
        await uploadBytes(storageRef, avatarImage);
        url = await getDownloadURL(storageRef);
      }
      setLoginUserInfo({ profile, displayName, photoURL: url });
      updateProfile(auth.currentUser!, {
        displayName,
        photoURL: url,
      });
      setDoc(doc(db, "users", LoginUserID), {
        displayName,
        photoURL: url,
        profile,
        avatarRef: newAvatarRef,
      });
    } catch (error: any) {
      alert(error.message);
    }
    setOpenModal(false);
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)}>
      <Paper
        sx={{
          position: "absolute",
          width: 400,
          border: "1px solid #555",
          borderRadius: 4,
          boxShadow: 24,
          p: 2,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Stack spacing={2} sx={{ m: 2 }}>
          <Typography variant="h6">Update profile</Typography>
          <Box
            sx={{
              m: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <IconButton component="label">
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleImageChanged}
              />
              <Avatar sx={{ width: 56, height: 56 }} src={photoURL} />
            </IconButton>
            <TextField
              fullWidth
              label="Display Name"
              value={displayName}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => setDisplayName(e.target.value)}
              sx={{ ml: 2 }}
            />
          </Box>
          <TextField
            label="Profile"
            multiline
            rows={4}
            fullWidth
            value={profile}
            onChange={(
              e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
            ) => setProfile(e.target.value)}
          />
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{ m: "8px", width: "160px" }}
            >
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={() => setOpenModal(false)}
              sx={{ m: "8px", width: "160px" }}
            >
              Cancel
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Modal>
  );
};

export default EditProfileModal;
