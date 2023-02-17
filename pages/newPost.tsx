import React from "react";
import { useRouter } from "next/router";
import { Box, Grid, TextField, Typography, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import { storage, db } from "@/features/firebase";
import MaterialSelect from "@/components/parts/MaterialSelect";
import ColorRadio from "@/components/parts/ColorRadio";
import BirthstoneSelect from "@/components/parts/BirthstoneSelect";
import CategoryRadio from "@/components/parts/CategoryRadio";

const newPost = () => {
  const loginUserID = useAppSelector(selectLoginUserID);
  const router = useRouter();
  const [comment, setComment] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [imageURL, setImageURL] = React.useState<string>("");
  const [material, setMaterial] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [birthstone, setBirthstone] = React.useState<
    { value: string; label: string }[]
  >([]);
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    if (image) {
      setImageURL(URL.createObjectURL(image));
    }
  }, [image]);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      setImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    const randomChar = uuidv4();
    const fileName = randomChar + "_" + image!.name;
    const storageRef = ref(storage, `images/${fileName}`);
    try {
      await uploadBytes(storageRef, image!);
      const url = await getDownloadURL(storageRef);
      await addDoc(collection(db, "posts"), {
        uid: loginUserID,
        topComment: comment,
        comments: [],
        material: [...material, ...birthstone],
        color: color,
        imageURL: url,
        category: category,
        likedBy: [],
        createdAt: serverTimestamp(),
        editedAt: "",
      });
      alert("Your post has been successfully posted!");
      router.push("/myPage");
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <>
      <Grid container component="main">
        <Grid item xs={12}>
          <Box
            sx={{
              my: { xs: 0, sm: 1 },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {image && imageURL ? (
              <>
                <input
                  accept="image/*"
                  hidden
                  id="image-button"
                  type="file"
                  onChange={onChangeImageHandler}
                />

                <Box
                  component="label"
                  htmlFor="image-button"
                  sx={styles.imageButton}
                >
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
                    src={imageURL}
                  />
                </Box>
              </>
            ) : (
              <>
                <input
                  accept="image/*"
                  hidden
                  id="image-button"
                  type="file"
                  onChange={onChangeImageHandler}
                />
                <Box
                  component="label"
                  sx={styles.imageButton}
                  htmlFor="image-button"
                >
                  <AddPhotoAlternateIcon fontSize="large" color="action" />
                </Box>
              </>
            )}

            <TextField
              sx={{ m: 2, mb: 1, bgcolor: "white", borderRadius: 1 }}
              color="info"
              fullWidth
              id="standard-multiline-flexible"
              label="Comment"
              multiline
              maxRows={4}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <Box
              sx={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              <Typography variant="subtitle1">Color Image</Typography>
            </Box>
            <ColorRadio color={color} setColor={setColor} />
            <Box
              sx={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              <Typography variant="subtitle1">Category</Typography>
            </Box>
            <CategoryRadio category={category} setCategory={setCategory} />
            <Box
              sx={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              <Typography variant="subtitle1">Material</Typography>
            </Box>
            <MaterialSelect setMaterial={setMaterial} />
            {/* <Box
              sx={{ display: "flex", justifyContent: "start", width: "100%" }}
            >
              <Typography variant="subtitle1">Birthstone</Typography>
            </Box>
            <BirthstoneSelect setBirthstone={setBirthstone} /> */}
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3,  px: 8 }}
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                handleSubmit(e)
              }
              disabled={!image}
            >
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default newPost;

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
