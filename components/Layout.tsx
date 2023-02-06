import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Box,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { pink, grey } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "@/features/hooks/reduxHooks";
import { selectUser, storeUserInfo, initUserInfo } from "@/features/userSlice";
import Head from "next/head";
import { provider } from "@/features/firebase";

const Layout = ({ children }: { children?: ReactNode }) => {
  const auth = getAuth();
  const [value, setValue] = React.useState(0);
  const [openAuthModal, setOpenAuthModal] = React.useState(false);
  const [nextPath, setNextPath] = React.useState("/");
  const router = useRouter();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  console.log("user@Layout",user);

  React.useEffect(() => {
    if (router.pathname === "/") {
      setValue(0);
    } else if (router.pathname === "/myPage") {
      setValue(1);
    } else if (router.pathname === "/newPost") {
      setValue(2);
    }
  }, [router]);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(initUserInfo());
        router.push("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        dispatch(
          storeUserInfo({
            photoURL: "",
            displayName: "Maru",
            uid: "hello",
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  return (
    <>
      <Head>
        <title>Gemstones</title>
        <meta
          name="description"
          content="SNS for handmade gemstone accessories"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Box>
        <Box
          sx={{
            borderBottom: `1px solid ${pink[100]}`,
            background: "rgba(255,230,240,1)",
            width: "100%",
            height: "3rem",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              height: "100%",
              alignItems: "center",
              maxWidth: "620px",
              margin: "0 auto",
              padding: "0 1.5rem",
            }}
          >
            <Typography variant="h5" color={grey[800]}>
              Gemstones
            </Typography>
            {user.uid ? (
              <Button
                variant="outlined"
                size="small"
                sx={{ width: "100px" }}
                onClick={handleSignOut}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="contained"
                size="small"
                sx={{ width: "100px" }}
                onClick={handleSignIn}
              >
                Login
              </Button>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            background:
              "url(https://images.unsplash.com/photo-1521133573892-e44906baee46?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80)",
            opacity: "0.5",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        ></Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            alignItems: "center",
            maxWidth: "620px",
            margin: "3rem auto 0 auto",
            padding: "1rem 1rem",
          }}
        >
          {children}
        </Box>
        <BottomNavigation
          sx={{
            borderTop: `1px solid ${pink[100]}`,
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: "rgba(255,230,240,1)",
            transform: "translateY(40%)",
            transition: "all 0.2s ease-in-out",
            opacity: 0,
            "&:hover": {
              transform: "translateY(0)",
              opacity: 1,
            },
          }}
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        >
          <BottomNavigationAction
            label="Feed"
            icon={<FavoriteIcon sx={{ "&:hover": { opacity: 0.8 } }} />}
            onClick={
              user.uid
                ? () => {
                    router.push("/");
                  }
                : () => {
                    setOpenAuthModal(true);
                  }
            }
          />
          <BottomNavigationAction
            label="My Page"
            icon={<HomeRoundedIcon sx={{ "&:hover": { opacity: 0.8 } }} />}
            onClick={
              user.uid
                ? () => {
                    router.push("/myPage");
                  }
                : () => {
                    setNextPath("/myPage");
                    setOpenAuthModal(true);
                  }
            }
          />
          <BottomNavigationAction
            label="New Post"
            icon={<AddBoxIcon sx={{ "&:hover": { opacity: 0.8 } }} />}
            onClick={
              user.uid
                ? () => {
                    router.push("/newPost");
                  }
                : () => {
                    setNextPath("/newPost");
                    setOpenAuthModal(true);
                  }
            }
          />
        </BottomNavigation>
      </Box>
    </>
  );
};

export default Layout;
