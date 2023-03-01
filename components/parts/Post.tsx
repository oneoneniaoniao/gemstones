import React from "react";
import { useRouter } from "next/router";
import { CircularProgress, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { PostType, UserType } from "@/features/types";
import { selectLoginUserID } from "@/features/userIDSlice";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import PostHeader from "./PostHeader";
import AvatarNameIcon from "./AvatarNameIcon";
import timestampToDate from "@/features/timestampToDate";
import { getColor } from "@/features/getColor";

type Props = {
  post: PostType;
  users: UserType[];
  setLikeClicked?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Post = ({ post, users, setLikeClicked }: Props) => {
  const router = useRouter();
  const loginUserID = useAppSelector(selectLoginUserID);
  // Get the author info of the post
  const author = users.filter((user) => user.uid === post.uid)[0];
  if (!author)
    return (
      <>
        <CircularProgress />
      </>
    );

  return (
    <>
      <Stack m={1} mb={2} sx={{ maxWidth: "360px" }}>
        {setLikeClicked ? (
          <PostHeader
            post={post}
            author={author}
            setLikeClicked={setLikeClicked}
          />
        ) : (
          <PostHeader post={post} author={author} />
        )}
        <Box
          sx={{
            objectFit: "cover",
            maxWidth: "360px",
            maxHeight: "360px",
            width: "90vw",
            height: "90vw",
            "&:hover": {
              cursor: "pointer",
              opacity: "0.8",
            },
          }}
          onClick={() => {
            router.push({
              pathname: "/post/detail",
              query: { postId: post.id, authorId: post.uid },
            });
          }}
          component="img"
          src={`${post.imageURL}`}
          alt={post.authorComment}
          loading="lazy"
          width="100%"
        />
        <Stack
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
          >
            <Typography
              variant="caption"
              sx={{ color: "#555", fontSize: "10px" }}
            >
              {timestampToDate(post.createdAt)}
              {post.editedAt && ` Edited: ${timestampToDate(post.editedAt)}`}
            </Typography>
          </Box>
          <Box
            sx={{
              mt: "1px",
              mb: "2px",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Box
              sx={{
                fontSize: "11px",
                m: "1px",
                px: 1,
                py: "1px",
                background: getColor(post.color).background,
                color: getColor(post.color).text,
                borderRadius: 3,
              }}
            >
              {post.color}
            </Box>
            <Box
              sx={{
                fontSize: "11px",
                m: "1px",
                px: 1,
                py: "1px",
                background: "white",
                borderRadius: 3,
              }}
            >
              {post.category}
            </Box>

            {post.materials.map((material) => {
              return (
                <>
                  <Box
                    key={material.label}
                    sx={{
                      fontSize: "11px",
                      m: "1px",
                      px: 1,
                      py: "1px",
                      background: "white",
                      borderRadius: 3,
                    }}
                  >
                    {material.label}
                  </Box>
                </>
              );
            })}
          </Box>
        </Stack>
        {post.authorComment ? (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AvatarNameIcon user={author} size="small" />
              </Box>
              <Typography variant="body2" sx={{ mr: 1 }}>
                {post.authorComment}
              </Typography>
              {/* {post.comments.length > 0 ? (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                  }}
                >
                  <Typography variant="caption">
                    `See all ${post.comments.length} more comment`+
                    {post.comments.length > 1 && "s"}+"."
                  </Typography>
                </Box>
              ) : null} */}
            </Box>
          </>
        ) : null}
      </Stack>
    </>
  );
};

export default Post;
