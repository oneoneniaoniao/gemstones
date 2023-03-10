import React from "react";
import { useRouter } from "next/router";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { PostType, UserType } from "@/features/types";
import AvatarNameIcon from "./AvatarNameIcon";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/features/firebase";

type Props = {
  post: PostType;
  author: UserType;
  setLikeClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

const PostHeader = ({ post, author, setLikeClicked }: Props) => {
  const router = useRouter();
  const loginUserID = useAppSelector(selectLoginUserID);
  const [like, setLike] = React.useState<boolean>(
    post.likedBy.includes(loginUserID)
  );
  const [numberOfLikes, setNumberOfLikes] = React.useState<number>(
    post.likedBy.length
  );
  const onClickLike = () => {
    if (!loginUserID) {
      alert('Please login or sign up to "like" this post.');
      return;
    }
    if (like) {
      setLikeClicked && setLikeClicked(true);
      setLike(!like);
      setNumberOfLikes(numberOfLikes - 1);
      setDoc(
        doc(db, "posts", post.id),
        {
          likedBy: post.likedBy.filter((uid) => uid !== loginUserID),
        },
        { merge: true }
      ).catch((error) => {
        alert(error.message);
      });
    } else {
      setLikeClicked && setLikeClicked(true);
      setLike(!like);
      setNumberOfLikes(numberOfLikes + 1);
      if (!post.likedBy.includes(loginUserID)) {
        setDoc(
          doc(db, "posts", post.id),
          {
            likedBy: [...post.likedBy, loginUserID],
          },
          { merge: true }
        ).catch((error) => {
          alert(error.message);
        });
      }
    }
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <AvatarNameIcon user={author} size="medium" />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <IconButton
              onClick={() => {
                router.push({
                  pathname: "/post/detail",
                  query: { postId: post.id, authorId: post.uid },
                });
              }}
            >
              <ModeCommentIcon
                fontSize="small"
                color={post.comments.length > 0 ? "secondary" : "disabled"}
              />
            </IconButton>
            <Typography variant="body2">{post.comments.length}</Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              padding: 0,
            }}
          >
            <IconButton onClick={onClickLike}>
              <FavoriteIcon
                fontSize="small"
                color={like && loginUserID ? "primary" : "disabled"}
              />
            </IconButton>
            <Typography variant="body1">{numberOfLikes}</Typography>
          </Box>
          {loginUserID === post.uid && (
            <IconButton
              onClick={() => {
                router.push({
                  pathname: "/post/edit",
                  query: { postId: post.id, authorId: post.uid },
                });
              }}
            >
              <EditIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
      </Box>
    </>
  );
};

export default PostHeader;
