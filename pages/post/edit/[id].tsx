import React from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";

const editPost = () => {
  const router = useRouter();
  const postId = router.query.id;
  const loginUserID = useAppSelector(selectLoginUserID);
  
  return (
    <>
      Your post is ${postId}
      <hr />
      this is edit page
    </>
  );
};

export default editPost;
