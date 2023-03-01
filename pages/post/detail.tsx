import React from "react";
import { useRouter } from "next/router";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";
import {
  Avatar,
  CircularProgress,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import ClearIcon from "@mui/icons-material/Clear";
import { PostType, UserType } from "@/features/types";
import getUsers from "@/features/getUsers";
import { db } from "@/features/firebase";
import { CommentType } from "@/features/types";
import timestampToDate from "@/features/timestampToDate";
import AvatarNameIcon from "@/components/parts/AvatarNameIcon";
import Post from "@/components/parts/Post";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import Link from "next/link";

const Detail = () => {
  const router = useRouter();
  const loginUserID = useAppSelector(selectLoginUserID);
  const [post, setPost] = React.useState<PostType>({
    id: "",
    uid: "",
    imageURL: "",
    authorComment: "",
    comments: [],
    materials: [],
    color: "",
    category: "",
    likedBy: [],
    createdAt: "",
    editedAt: "",
    imageRef: "",
  });
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [comment, setComment] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (router.isReady) {
      const authorId = router.query.authorId;
      const postId = router.query.postId as string;
      console.log(loginUserID);
      if (!authorId || !postId) {
        alert("No such post!");
        router.push("/");
      }
      Promise.all([
        getUsers(),
        getDoc(doc(db, "posts", postId)),
        getDocs(
          query(
            collection(db, "posts", postId, "comments"),
            orderBy("commentedAt", "asc")
          )
        ),
      ])
        .then(([users, doc, querySnapshot]) => {
          setUsers(users);
          if (!doc.exists()) {
            alert("Sorry, no such post.");
            router.push("/");
          } else {
            setPost({
              id: doc.id,
              uid: doc.data().uid,
              imageURL: doc.data().imageURL,
              authorComment: doc.data().authorComment,
              comments: doc.data().comments,
              materials: doc.data().materials,
              color: doc.data().color,
              category: doc.data().category,
              likedBy: doc.data().likedBy,
              createdAt: doc.data().createdAt,
              editedAt: doc.data().editedAt,
              imageRef: doc.data().imageRef,
            });
            setLoading(false);
          }
          if (querySnapshot.empty) {
            console.log("No comments yet.");
          } else {
            const comments = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              uid: doc.data().uid,
              comment: doc.data().comment,
              commentedAt: doc.data().commentedAt,
            }));
            setComments(comments);
          }
        })
        .catch((error) => {
          alert(error.message);
          router.push("/");
        });
    }
  }, [router]);

  const handleDelete = async (commentId: string) => {
    if (confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteDoc(doc(db, "posts", post.id, "comments", commentId));
        if (
          confirm(
            "Your comment has been deleted!\n Do you want to reload the page to see the change?"
          )
        ) {
          window.location.reload();
        }
      } catch {
        (error: any) => {
          alert(error.message);
        };
      }
    }
  };

  const submitNewComment = () => {
    Promise.all([
      updateDoc(doc(db, "posts", post.id), {
        comments: [...post.comments, loginUserID],
      }),
      addDoc(collection(db, "posts", post.id, "comments"), {
        uid: loginUserID,
        comment: comment,
        commentedAt: new Date(),
      }),
    ])
      .then(() => {
        setComment("");
        if (
          confirm(
            "Your comment has been posted!\n Do you want to reload the page to see the comment?"
          )
        ) {
          window.location.reload();
        }
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Post post={post} users={users} />
      <Stack m={1} mb={2} sx={{ maxWidth: "360px" }}>
        <Box>
          {comments.map((comment) => (
            <>
              <Box
                key={comment.id}
                sx={{
                  mb: 0.2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <AvatarNameIcon
                    user={users.filter((user) => user.uid === comment.uid)[0]}
                    size="small"
                  />
                  <Typography sx={{ fontSize: "10px" }}>
                    {timestampToDate(comment!.commentedAt)}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">{comment.comment}</Typography>
                  {comment.uid === loginUserID && (
                    <IconButton
                      onClick={() => handleDelete(comment.id)}
                      sx={{ opacity: 0.4, "&:hover": { opacity: 1 } }}
                    >
                      <ClearIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>
              </Box>
            </>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          {loginUserID ? (
            <>
              <TextField
                size="small"
                variant="standard"
                multiline
                sx={{ borderRadius: 1, width: "100%", mt: 0.5 }}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <Avatar
                      src={
                        users.filter((user) => user.uid === loginUserID)[0]
                          .photoURL
                      }
                      sx={{
                        width: 28,
                        height: 28,
                        marginRight: 0.5,
                      }}
                    />
                  ),
                  endAdornment: (
                    <IconButton
                      size="small"
                      disabled={!comment}
                      onClick={() => setComment("")}
                    >
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              ></TextField>
              <IconButton
                disabled={comment === ""}
                color={comment ? "primary" : "inherit"}
                onClick={submitNewComment}
              >
                <SendIcon />
              </IconButton>
            </>
          ) : (
            <>
              <TextField
                size="small"
                variant="standard"
                multiline
                sx={{ borderRadius: 1, width: "100%", mt: 0.5 }}
                value={"Please login to comment."}
                InputProps={{
                  startAdornment: (
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        marginRight: 0.5,
                      }}
                    />
                  ),
                  endAdornment: (
                    <IconButton size="small" disabled>
                      <ClearIcon />
                    </IconButton>
                  ),
                }}
              ></TextField>
              <IconButton disabled color="inherit">
                <SendIcon />
              </IconButton>
            </>
          )}
        </Box>
      </Stack>
    </Box>
  );
};

export default Detail;
