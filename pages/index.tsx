import { Button, Typography } from "@mui/material";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";

export default function Home() {
  const loginUserID = useAppSelector(selectLoginUserID);

  return (
    <>
      <main>
        <p>LoginUserID: {loginUserID}</p>
      </main>
    </>
  );
}
