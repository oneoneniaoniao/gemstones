import React from "react";
import { useRouter } from "next/router";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import { CommentType, PostType, UserType } from "@/features/types";
import { db } from "@/features/firebase";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import PostHeader from "@/components/parts/PostHeader";
import { getColor } from "@/features/getColor";
import AvatarNameIcon from "@/components/parts/AvatarNameIcon";
import TimestampToDate from "@/features/timestampToDate";

const PostPage = () => {
  const router = useRouter();
  const postId = router.query.id as string;
  const loginUserID = useAppSelector(selectLoginUserID);
  const [post, setPost] = React.useState<PostType | null>(null);
  const [comment, setComment] = React.useState<string>("");
  const [comments, setComments] = React.useState<CommentType[]>([]);
  const [author, setAuthor] = React.useState<UserType | null>(null);
  const [users, setUsers] = React.useState<UserType[]>([]);

  React.useEffect(() => {
    if (!loginUserID) {
      // alert("Please login or sign up first.");
      router.push("/");
    }
  }, [loginUserID]);

  React.useEffect(() => {
    const allUsers: UserType[] = [];
    getDocs(query(collection(db, "users")))
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allUsers.push({
            uid: doc.id,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            profile: doc.data().profile,
          });
        });
        setUsers(allUsers);
      })
      .then(() => {
        getDoc(doc(db, "posts", postId)).then((doc) => {
          if (doc.exists()) {
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
            setAuthor(
              allUsers.filter((user) => user.uid === doc.data().uid)[0]
            );
          } else {
            // doc.data() will be undefined in this case
            alert("Sorry, no such document.");
            router.push("/");
          }
        });
      })
      .catch((error) => {
        alert(error.message);
        router.push("/");
      });
    // const getComments = async () => {
    //   const querySnapshot = await getDocs(
    //     collection(db, "posts", postId, "comments")
    //   );
    //   const comments: CommentType[] = [];
    //   querySnapshot.forEach((doc) => {
    //     comments.push({
    //       uid: doc.data().uid,
    //       comment: doc.data().comment,
    //       commentedAt: doc.data().commentedAt,
    //     });
    //   });
    //   setComments(comments);
    // };
    // getComments();
  }, []);

  // const postNewComment = () => {
  //   addDoc(collection(db, "posts", postId, "comments"), {
  //     uid: loginUserID,
  //     comment: comment,
  //     commentedAt: new Date(),
  //   }).then(() => {
  //     setComment("");
  //     getDoc(doc(db, "posts", postId)).then((doc) => {
  //       setPost({
  //         id: doc.id,
  //         uid: doc.data()!.uid,
  //         imageURL: doc.data()!.imageURL,
  //         authorComment: doc.data()!.authorComment,
  //         comments: doc.data()!.comments,
  //         materials: doc.data()!.materials,
  //         color: doc.data()!.color,
  //         category: doc.data()!.category,
  //         likedBy: doc.data()!.likedBy,
  //         createdAt: doc.data()!.createdAt,
  //         editedAt: doc.data()!.editedAt,
  //         imageRef: doc.data()!.imageRef,
  //       });
  //     });
  //   });
  // };

  if (!post || !author) return <>Loading...</>;

  return (
    <>
      <Stack m={1} mb={2} sx={{ maxWidth: "360px" }}>
        <Box sx={{ display: "flex" }}>
          <PostHeader post={post} author={author} />
        </Box>
        <Box
          sx={{
            objectFit: "cover",
            maxWidth: "360px",
            maxHeight: "360px",
            width: "90vw",
            height: "90vw",
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
          <Typography variant="caption">
            Posted: {TimestampToDate(post.createdAt)}{" "}
            {post.editedAt && `Edited: ${TimestampToDate(post.editedAt)}`}
          </Typography>
          <Box
            sx={{
              my: 1,
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            <Box
              sx={{
                fontSize: "12px",
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
                fontSize: "12px",
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
                    sx={{
                      fontSize: "12px",
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
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              mb: 1,
            }}
          >
            <AvatarNameIcon author={author} size="small" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              {post.authorComment}
            </Typography>
          </Box>
        ) : null}
      </Stack>
    </>
  );
};

export default PostPage;
