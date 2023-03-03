import React from "react";
import { useRouter } from "next/router";
import { Box, Grid, TextField, Button } from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { useAppSelector } from "@/features/hooks/reduxHooks";
import { selectLoginUserID } from "@/features/userIDSlice";
import { storage, db } from "@/features/firebase";
import MaterialSelect from "@/components/parts/MaterialSelect";
import CategoryRadio from "@/components/parts/CategoryRadio";
import ColorRadio from "@/components/parts/ColorRadio";
import { MaterialType } from "@/features/types";

const NewPost = () => {
  const loginUserID = useAppSelector(selectLoginUserID);
  const router = useRouter();
  const [comment, setComment] = React.useState("");
  const [image, setImage] = React.useState<File | null>(null);
  const [imageURL, setImageURL] = React.useState<string>("");
  const [materials, setMaterials] = React.useState<MaterialType[]>([]);
  const [color, setColor] = React.useState("");
  const [category, setCategory] = React.useState("");

  React.useEffect(() => {
    if (!loginUserID) {
      router.push("/");
    }
  });

  React.useEffect(() => {
    if (image) {
      setImageURL(URL.createObjectURL(image));
    }
  }, [image]);

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files![0]) {
      if (e.target.files![0].size > 1000000) {
        alert("Image size is too large. Please select an image less than 1MB.");
        e.target.value = "";
        return;
      }
      setImage(e.target.files![0]);
      e.target.value = "";
    }
  };

  const handleSubmit = async () => {
    if (confirm("Would you like to post this?")) {
      const randomChar = uuidv4();
      const fileName = randomChar + "_" + image!.name;
      const storageRef = ref(storage, `images/${fileName}`);
      try {
        await uploadBytes(storageRef, image!);
        const url = await getDownloadURL(storageRef);
        await addDoc(collection(db, "posts"), {
          uid: loginUserID,
          authorComment: comment,
          comments: [],
          materials: materials,
          color: color,
          imageURL: url,
          category: category,
          likedBy: [],
          createdAt: serverTimestamp(),
          editedAt: "",
          imageRef: `images/${fileName}`,
        });
        alert("Your post has been successfully posted!");
        router.push("/myPage");
      } catch (err: any) {
        alert(err.message);
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
              pb: 14,
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
              onChange={(e) => {
                if (e.target.value.length <= 300) {
                  setComment(e.target.value);
                } else {
                  alert(
                    "Comment is too long. Please enter 300 characters or less."
                  );
                }
              }}
            />
            <Box sx={{ width: "100%" }}>
              <ColorRadio color={color} setColor={setColor} />
              <CategoryRadio category={category} setCategory={setCategory} />
              <MaterialSelect
                setMaterials={setMaterials}
                defaultValue={materials}
              />
            </Box>
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 5, px: 8 }}
              onClick={handleSubmit}
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

export default NewPost;

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
