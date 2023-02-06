import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "@/features/firebase";
import { Button, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useAppDispatch, useAppSelector } from "@/features/hooks/reduxHooks";
import { selectUser, storeUserInfo } from "@/features/userSlice";

export default function Home() {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const auth = getAuth();

  return (
    <>
      <main>
        <p>name:{user.displayName}</p>
        <div
          onClick={() => {
            signInWithPopup(auth, provider)
              .then((result) => {
                console.log(result.user);
                dispatch(
                  storeUserInfo({
                    photoURL: "",
                    displayName: "Maru",
                    uid: "",
                  })
                );
              })
              .catch((error) => alert(error.message));
          }}
        >
          hello how are you today
        </div>
      </main>
    </>
  );
}
