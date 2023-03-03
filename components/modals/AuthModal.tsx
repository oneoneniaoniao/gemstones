import React from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import {
  Avatar,
  Button,
  Modal,
  TextField,
  Paper,
  Box,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { provider, storage, db } from "@/features/firebase";
import { storeLoginUserID } from "@/features/userIDSlice";
import EmailModal from "@/components/modals/EmailModal";

type Props = {
  setOpenAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
  openAuthModal: boolean;
  nextPath?: string;
};

const AuthModal = ({ setOpenAuthModal, openAuthModal, nextPath }: Props) => {
  const auth = getAuth();
  const dispatch = useDispatch();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLogin, setIsLogin] = React.useState(true);
  const [displayName, setDisplayName] = React.useState("");
  const [avatarImage, setAvatarImage] = React.useState<File | null>(null);
  const [openModal, setOpenModal] = React.useState(false);
  const [resetEmail, setResetEmail] = React.useState("");
  const [imageURL, setImageURL] = React.useState<string | null>(null);
  const router = useRouter();

  // To show the avatar image preview
  React.useEffect(() => {
    if (avatarImage) {
      setImageURL(URL.createObjectURL(avatarImage));
    }
  }, [avatarImage]);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      if (e.target.files![0].size > 1000000) {
        alert("Image size is too large. Please select an image less than 1MB.");
        e.target.value = "";
        return;
      }
      setAvatarImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const sendResetEmail = async (e: React.MouseEvent<HTMLElement>) => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      setOpenModal(false);
      alert(
        `Please check your mail box.\n We've sent reset email instructions to: "${resetEmail}".`
      );
      setResetEmail("");
    } catch (err: any) {
      alert(err.message);
      setResetEmail("");
    }
  };

  const signInGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
      // Check if the user is already registered in the database
      getDoc(doc(db, "users", result.user!.uid))
        .then((res) => {
          // If the user is not registered, register the user in the database
          if (res?.data() === undefined) {
            setDoc(doc(db, "users", result.user.uid), {
              displayName: result.user.displayName,
              photoURL: result.user.photoURL,
              profile: "",
            });
            dispatch(storeLoginUserID(result.user.uid));
            // If the user is registered, just update the user information in redux
          } else {
            dispatch(storeLoginUserID(res.id));
          }
        })
        .then(() => {
          setOpenAuthModal(false);
          router.push(nextPath || "/");
        })
        .catch((error) => alert(error.message));
    });
  };

  const signInEmail = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setEmail("");
        setPassword("");
        setAvatarImage(null);
        setOpenAuthModal(false);
        router.push(nextPath || "/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const signUpEmail = async () => {
    const authUser = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let url = ""; // Url of avatar image
    let avatarRef = ""; // Reference of avatar image
    if (avatarImage) {
      const randomChar = uuidv4();
      const fileName = randomChar + "_" + avatarImage.name;
      avatarRef = `avatars/${authUser.user.uid}/${fileName}`;
      const storageRef = ref(storage, avatarRef);
      await uploadBytes(storageRef, avatarImage);
      url = await getDownloadURL(storageRef);
    }
    Promise.all([
      updateProfile(authUser.user, {
        displayName: displayName,
        photoURL: url,
      }),
      setDoc(doc(db, "users", authUser.user.uid), {
        displayName: displayName,
        photoURL: url,
        profile: "",
        avatarRef: avatarRef,
      }),
    ])
      .then(() => {
        setIsLogin(true);
        setEmail("");
        setPassword("");
        setDisplayName("");
        setAvatarImage(null);
        setOpenAuthModal(false);
        router.push(nextPath || "/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  return (
    <>
      <Modal
        open={openAuthModal}
        onClose={() => {
          setIsLogin(true);
          setOpenAuthModal(false);
          router.push(`${location.pathname}${location.search}`);
        }}
      >
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
          <Box
            sx={{
              my: 4,
              mx: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {isLogin ? "Sign in" : "Sign up"}
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              {!isLogin && (
                <>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="displayName"
                    label="displayName"
                    name="displayName"
                    autoComplete="displayName"
                    autoFocus
                    value={displayName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      if(e.target.value.length <= 16){
                        setDisplayName(e.target.value);
                      }else{
                        alert("Display name is too long. Please enter 16 characters or less.");
                      }
                    }}
                  />
                  <Box textAlign="center">
                    {avatarImage && imageURL ? (
                      <Tooltip title="Icon image has selected">
                        <IconButton component="label">
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={onChangeImageHandler}
                          />
                          <Avatar
                            src={imageURL}
                            sx={{ width: "33px", height: "33px" }}
                          />
                        </IconButton>
                      </Tooltip>
                    ) : (
                      <Tooltip title="Register icon image [optional]">
                        <IconButton component="label">
                          <AccountCircleIcon
                            fontSize="large"
                            sx={{ "&:hover": { background: "none" } }}
                          />
                          <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={onChangeImageHandler}
                          />
                        </IconButton>
                      </Tooltip>
                    )}
                  </Box>
                </>
              )}
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(
                  e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                ) => setEmail(e.target.value)}
                inputProps={{ maxLength: 320 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
              />
              <Button
                disabled={
                  isLogin
                    ? email.length < 6 ||
                      !email.includes("@") ||
                      !email.includes(".") ||
                      password.length < 6
                    : email.length < 6 ||
                      !email.includes("@") ||
                      !email.includes(".") ||
                      password.length < 6 ||
                      !displayName
                }
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                startIcon={<EmailIcon />}
                onClick={
                  isLogin
                    ? async () => {
                        try {
                          await signInEmail();
                        } catch (e: any) {
                          alert(e.message);
                        }
                      }
                    : async () => {
                        try {
                          await signUpEmail();
                        } catch (e: any) {
                          alert(e.message);
                        }
                      }
                }
              >
                {isLogin ? "Sign In" : "Sign Up"}
              </Button>
              <Grid container justifyContent="space-between">
                <Grid
                  item
                  onClick={() => setOpenModal(true)}
                  sx={{ "&:hover": { cursor: "pointer", color: "#0000ff" } }}
                >
                  <Typography component="span" variant="body2">
                    Forgot password?
                  </Typography>
                </Grid>
                <Grid
                  item
                  onClick={() => setIsLogin(!isLogin)}
                  sx={{ "&:hover": { cursor: "pointer", color: "#0000ff" } }}
                >
                  <Typography component="span" variant="body2">
                    {isLogin ? "Create a new account?" : "Back to login"}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={signInGoogle}
                startIcon={<GoogleIcon />}
              >
                Sign In With Google
              </Button>
              <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 3, mb: 2 }}
                onClick={() => {
                  setIsLogin(true);
                  setOpenAuthModal(false);
                  // Without this, the bottom navigation's selected tab can be incorrect.
                  router.push(`${location.pathname}${location.search}`);
                }}
              >
                Cancel
              </Button>
            </Box>
            <EmailModal
              resetEmail={resetEmail}
              setResetEmail={setResetEmail}
              sendResetEmail={sendResetEmail}
              setOpenModal={setOpenModal}
              openModal={openModal}
            ></EmailModal>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};

export default AuthModal;
