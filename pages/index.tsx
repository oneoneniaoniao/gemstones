import React from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { db } from "@/features/firebase";
import { MaterialType, PostType, UserType } from "@/features/types";
import Post from "@/components/parts/Post";
import SearchModal from "@/components/modals/SearchModal";

const index = () => {
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [allPosts, setAllPosts] = React.useState<PostType[]>([]);
  const [material, setMaterial] = React.useState<MaterialType[]>([]);
  const [color, setColor] = React.useState<string>("");
  const [category, setCategory] = React.useState<string>("");
  const [sort, setSort] = React.useState<string>("New");
  const [openSearchModal, setOpenSearchModal] = React.useState(false);
  const [numberOfFilters, setNumberOfFilters] = React.useState(0);
  const PFs = {
    color,
    setColor,
    category,
    setCategory,
    material,
    setMaterial,
  };

  React.useEffect(() => {
    Promise.all([
      getDocs(
        query(collection(db, "posts"), orderBy("createdAt", "desc"))
      ).then((querySnapshot) => {
        setAllPosts(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            imageURL: doc.data().imageURL,
            comment: doc.data().comment,
            comments: doc.data().comments,
            materials: doc.data().material,
            color: doc.data().color,
            category: doc.data().category,
            likedBy: doc.data().likedBy,
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt,
          }))
        );
        setPosts(
          querySnapshot.docs.map((doc) => ({
            id: doc.id,
            uid: doc.data().uid,
            imageURL: doc.data().imageURL,
            comment: doc.data().comment,
            comments: doc.data().comments,
            materials: doc.data().material,
            color: doc.data().color,
            category: doc.data().category,
            likedBy: doc.data().likedBy,
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt,
          }))
        );
      }),
      getDocs(query(collection(db, "users"))).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          setUsers((prev) => [
            ...prev,
            {
              uid: doc.id,
              displayName: doc.data().displayName,
              photoURL: doc.data().photoURL,
              profile: doc.data().profile,
            },
          ]);
        });
      }),
    ]).catch((err) => {
      alert(err.message);
    });
  }, []);

  // Sort and filter after SearchModal is closed
  React.useEffect(() => {
    if (!openSearchModal) { // Sort and filter only after modal is closed, not when it is opened
      const allPostsCopy = [...allPosts];
      // Sort posts
      if (sort === "Comments") {
        allPostsCopy.sort((a, b) => a.comments.length - b.comments.length);
      } else if (sort === "Likes") {
        allPostsCopy.sort((a, b) => b.likedBy.length - a.likedBy.length);
      }
      // Filter posts
      if (!color && !category && material.length === 0) {
        setPosts(allPostsCopy);
        setNumberOfFilters(0);
      } else if (!color && !category && material.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            material.some((m2) => m.value === m2.value)
          )
        );
        setPosts(filteredPosts);
        setNumberOfFilters(material.length);
      } else if (!color && category && material.length === 0) {
        setPosts(allPostsCopy.filter((post) => post.category === category));
        setNumberOfFilters(1);
      } else if (!color && category && material.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            material.some((m2) => m.value === m2.value)
          )
        );
        setPosts(filteredPosts.filter((post) => post.category === category));
        setNumberOfFilters(material.length + 1);
      } else if (color && !category && material.length === 0) {
        setPosts(allPostsCopy.filter((post) => post.color === color));
        setNumberOfFilters(1);
      } else if (color && !category && material.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            material.some((m2) => m.value === m2.value)
          )
        );
        setPosts(filteredPosts.filter((post) => post.color === color));
        setNumberOfFilters(material.length + 1);
      } else if (color && category && material.length === 0) {
        setPosts(
          allPostsCopy.filter(
            (post) => post.color === color && post.category === category
          )
        );
        setNumberOfFilters(2);
      } else if (color && category && material.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            material.some((m2) => m.value === m2.value)
          )
        );
        setPosts(
          filteredPosts.filter(
            (post) => post.color === color && post.category === category
          )
        );
        setNumberOfFilters(material.length + 2);
      }
    }
  }, [openSearchModal]);

  const onClickReset = () => {
    setPosts(allPosts);
    setColor("");
    setCategory("");
    setMaterial([]);
    setNumberOfFilters(0);
    setSort("New");
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {sort === "New" ? null : (
            <Typography
              variant="body2"
              sx={{
                ml: 1,
                color: grey,
                pr: "4px",
                borderRight: "1px solid #ccc",
              }}
            >
              {sort}↑
            </Typography>
          )}
          {numberOfFilters ? (
            <>
              <Typography
                variant="body2"
                sx={{ px: 1, color: grey }}
              >{`Filters(${numberOfFilters})`}</Typography>
              <Typography variant="body2">
                {`${color} ${category} ${material.map((m) => " " + m.label)}`}
              </Typography>
            </>
          ) : null}
          <IconButton onClick={() => setOpenSearchModal(true)}>
            <SearchIcon />
          </IconButton>
        </Box>
        {numberOfFilters || sort !== "New" ? (
          <IconButton
            size="small"
            disabled={!numberOfFilters && sort === "New"}
            onClick={onClickReset}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </Box>
      <SearchModal
        openSearchModal={openSearchModal}
        setOpenSearchModal={setOpenSearchModal}
        PFs={PFs}
        setSort={setSort}
        sort={sort}
      />
      <Divider sx={{ width: "100%" }} />
      <Box
        sx={{
          mt: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {posts.length > 0 ? (
          posts.map((post) => <Post post={post} users={users} key={post.id} />)
        ) : (
          <Typography variant="body2">No posts found.</Typography>
        )}
      </Box>
    </>
  );
};

export default index;
