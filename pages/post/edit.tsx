import React from "react";
import { useRouter } from "next/router";
import { MaterialType, PostType, UserType } from "@/features/types";
import getUsers from "@/features/getUsers";
import {
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/features/firebase";
import { Button, Grid, TextField, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import ColorRadio from "@/components/parts/ColorRadio";
import CategoryRadio from "@/components/parts/CategoryRadio";
import MaterialSelect from "@/components/parts/MaterialSelect";

const Edit = () => {
  const router = useRouter();
  const [author, setAuthor] = React.useState({
    uid: "",
    displayName: "",
    photoURL: "",
  });
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
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [materials, setMaterials] = React.useState<MaterialType[]>([]);
  const [authorComment, setAuthorComment] = React.useState("");
  const [initialState, setInitialState] = React.useState({
    color: "",
    category: "",
    materials: [],
    authorComment: "",
  });
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    if (router.isReady) {
      const authorId = router.query.authorId;
      const postId = router.query.postId as string;
      if (!authorId || !postId) {
        alert("No such post!");
        router.push("/");
      }
      getUsers().then((users) => {
        setUsers(users);
        setAuthor(users.filter((user) => user.uid === authorId)[0]);
      });
      getDoc(doc(db, "posts", postId))
        .then((doc) => {
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
            setColor(doc.data().color);
            setCategory(doc.data().category);
            setMaterials(doc.data().materials);
            setAuthorComment(doc.data().authorComment);
            setInitialState({
              color: doc.data().color,
              category: doc.data().category,
              materials: doc.data().materials,
              authorComment: doc.data().authorComment,
            });
            setLoading(false);
          } else {
            // doc.data() will be undefined in this case
            alert("Sorry, no such document.");
            router.push("/");
          }
        })
        .catch((error) => {
          alert(error.message);
          router.push("/");
        });
    }
  }, [router]);

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, "posts", post.id), {
        authorComment: authorComment,
        color: color,
        category: category,
        materials: materials,
        editedAt: serverTimestamp(),
      });
      alert("Your post has been updated!");
      router.push("/myPage");
    } catch {
      (error: any) => {
        alert(error.message);
      };
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", post.id));
        alert("Your post has been deleted!");
        router.push("/myPage");
      } catch {
        (error: any) => {
          alert(error.message);
        };
      }
    }
  };

  return (
    <>
      <Grid container component="main">
        <Grid item xs={12}>
          <Box
            sx={{
              my: { xs: 0, sm: 1 },
              pb: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              component="label"
              htmlFor="image-button"
              sx={styles.imageButton}
            >
              <Tooltip title="You can't change the image." placement="top">
                <Box
                  component="img"
                  sx={{
                    background: "#ddd",
                    width: "90vw",
                    height: "90vw",
                    maxWidth: "300px",
                    maxHeight: "300px",
                    objectFit: "cover",
                  }}
                  src={post.imageURL}
                />
              </Tooltip>
            </Box>

            <TextField
              sx={{ m: 2, mb: 1, bgcolor: "white", borderRadius: 1 }}
              color="info"
              fullWidth
              id="standard-multiline-flexible"
              label="Comment"
              multiline
              maxRows={4}
              variant="outlined"
              value={authorComment}
              onChange={(e) => setAuthorComment(e.target.value)}
            />
            <Box sx={{ width: "100%" }}>
              <ColorRadio color={color} setColor={setColor} />
              <CategoryRadio category={category} setCategory={setCategory} />
              {!loading && (
                <MaterialSelect
                  setMaterials={setMaterials}
                  defaultValue={materials}
                />
              )}
            </Box>
            <Box display="flex">
              <Button
                type="button"
                variant="contained"
                sx={{ m: 1, mt: 3, px: 2, width: "140px" }}
                onClick={handleSubmit}
                disabled={
                  initialState.color === color &&
                  initialState.category === category &&
                  initialState.authorComment === authorComment &&
                  JSON.stringify(
                    initialState.materials
                      .map((material: MaterialType) => material.value)
                      .sort()
                  ) ===
                    JSON.stringify(
                      materials
                        .map((material: MaterialType) => material.value)
                        .sort()
                    )
                }
              >
                Submit
              </Button>
              <Button
                sx={{ m: 1, mt: 3, px: 2, width: "140px" }}
                type="button"
                color="secondary"
                variant="outlined"
                onClick={() => router.push("/myPage")}
              >
                cancel
              </Button>
              <Button
                sx={{ m: 1, mt: 3, px: 2, width: "140px" }}
                type="button"
                variant="outlined"
                color="error"
                onClick={handleDelete}
              >
                delete
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Edit;

const styles = {
  imageButton: {
    background: " #ddd",
    width: "100%",
    maxWidth: " 300px",
    margin: "0 auto",
    display: " flex",
    justifyContent: "center",
    alignItems: "center",
    "&::before": {
      content: "''",
      display: "block",
      paddingTop: "100%",
    },
  },
};
