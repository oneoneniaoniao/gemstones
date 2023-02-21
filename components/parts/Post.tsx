import React from "react";
import { useRouter } from "next/router";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { useSelector } from "react-redux";
import { doc, setDoc } from "firebase/firestore";
import { PostType, UserType } from "@/features/types";
import { selectLoginUserID } from "@/features/userIDSlice";
import { db } from "@/features/firebase";

type Props = {
  post: PostType;
  users: UserType[] | undefined;
  isMyPage?: boolean;
};

const Post = ({
  post,
  users,
  isMyPage = false,
}: Props) => {
  const router = useRouter();
  const loginUserID = useSelector(selectLoginUserID);
  const [like, setLike] = React.useState<boolean>(
    post.likedBy.includes(loginUserID)
  );
  const [numberOfLikes, setNumberOfLikes] = React.useState<number>(
    post.likedBy.length
  );

  if (!users) return <></>;
  // Get the author info of the post
  const author = users.filter((user) => user.uid === post.uid)[0];

  const onClickLike = () => {
    if (!loginUserID) {
      alert("Please login or sign up first.");
      return;
    }
    if (like) {
      setLike(!like);
      setNumberOfLikes(numberOfLikes - 1);
      setDoc(
        doc(db, "posts", post.id),
        {
          likedBy: post.likedBy.filter((uid) => uid !== loginUserID),
        },
        { merge: true }
      );
    } else {
      setLike(!like);
      setNumberOfLikes(numberOfLikes + 1);
      if (!post.likedBy.includes(loginUserID)) {
        setDoc(
          doc(db, "posts", post.id),
          {
            likedBy: [...post.likedBy, loginUserID],
          },
          { merge: true }
        );
      }
    }
  };

  return (
    <>
      <Stack m={1} mb={2}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              justifyContent: "flex-start",
              alignItems: "center",
              margin: 0,
              marginBottom: 0.2,
              "&:hover": { opacity: 0.8, cursor: "pointer" },
            }}
            onClick={() => router.push(`/user/${post.uid}`)}
          >
            {!isMyPage && (
              <>
                <Avatar
                  src={author.photoURL}
                  sx={{
                    width: 32,
                    height: 32,
                    marginRight: 0.5,
                  }}
                />
                <Typography>{author.displayName}</Typography>
              </>
            )}
          </Box>
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
              <IconButton onClick={() => router.push(`/post/${post.id}`)}>
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
              <IconButton>
                <FavoriteIcon
                  fontSize="small"
                  onClick={onClickLike}
                  color={like ? "primary" : "disabled"}
                />
              </IconButton>
              <Typography variant="body1">{numberOfLikes}</Typography>
            </Box>
          </Box>
        </Box>
        <Box
          sx={{
            objectFit: "cover",
            maxWidth: "360px",
            maxHeight: "360px",
            width: "90vw",
            height: "90vw",
            "&:hover": { opacity: 0.9, cursor: "pointer" },
          }}
          component="img"
          src={`${post.imageURL}`}
          alt={post.comment}
          loading="lazy"
          width="100%"
          onClick={() => router.push(`/post/${post.id}`)}
        />
        <Typography variant="body2">{post.comment}</Typography>
      </Stack>
    </>
  );
};

export default Post;
