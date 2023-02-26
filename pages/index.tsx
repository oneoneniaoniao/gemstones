import React from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, IconButton, Typography } from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import { db } from "@/features/firebase";
import { MaterialType, PostType, UserType } from "@/features/types";
import Post from "@/components/parts/Post";
import SearchModal from "@/components/modals/SearchModal";
import { getColor } from "@/features/getColor";

const Index = () => {
  const [users, setUsers] = React.useState<UserType[]>([]);
  const [posts, setPosts] = React.useState<PostType[]>([]);
  const [allPosts, setAllPosts] = React.useState<PostType[]>([]);
  const [materials, setMaterials] = React.useState<MaterialType[]>([]);
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
    materials,
    setMaterials,
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
            authorComment: doc.data().authorComment,
            comments: doc.data().comments,
            materials: doc.data().materials,
            color: doc.data().color,
            category: doc.data().category,
            likedBy: doc.data().likedBy,
            createdAt: doc.data().createdAt,
            editedAt: doc.data().editedAt,
            imageRef: doc.data().imageRef,
          }))
        );
        setPosts(
          querySnapshot.docs.map((doc) => ({
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
          }))
        );
      }),
      getDocs(query(collection(db, "users"))).then((querySnapshot) => {
        const allUsers: UserType[] = [];
        querySnapshot.forEach((doc) => {
          allUsers.push({
            uid: doc.id,
            displayName: doc.data().displayName,
            photoURL: doc.data().photoURL,
            profile: doc.data().profile,
          });
        });
        setUsers(allUsers);
      }),
    ]).catch((err) => {
      alert(err.message);
    });
  }, []);

  // Sort and filter after SearchModal is closed
  React.useEffect(() => {
    if (!openSearchModal) {
      // Sort and filter only after modal is closed, not when it is opened
      const allPostsCopy = [...allPosts];
      // Sort posts
      if (sort === "Comments") {
        allPostsCopy.sort((a, b) => a.comments.length - b.comments.length);
      } else if (sort === "Likes") {
        allPostsCopy.sort((a, b) => b.likedBy.length - a.likedBy.length);
      }
      // Filter posts
      if (!color && !category && materials.length === 0) {
        setPosts(allPostsCopy);
        setNumberOfFilters(0);
      } else if (!color && !category && materials.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            materials.some((m2) => m.value === m2.value)
          )
        );
        setPosts(filteredPosts);
        setNumberOfFilters(materials.length);
      } else if (!color && category && materials.length === 0) {
        setPosts(allPostsCopy.filter((post) => post.category === category));
        setNumberOfFilters(1);
      } else if (!color && category && materials.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            materials.some((m2) => m.value === m2.value)
          )
        );
        setPosts(filteredPosts.filter((post) => post.category === category));
        setNumberOfFilters(materials.length + 1);
      } else if (color && !category && materials.length === 0) {
        setPosts(allPostsCopy.filter((post) => post.color === color));
        setNumberOfFilters(1);
      } else if (color && !category && materials.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            materials.some((m2) => m.value === m2.value)
          )
        );
        setPosts(filteredPosts.filter((post) => post.color === color));
        setNumberOfFilters(materials.length + 1);
      } else if (color && category && materials.length === 0) {
        setPosts(
          allPostsCopy.filter(
            (post) => post.color === color && post.category === category
          )
        );
        setNumberOfFilters(2);
      } else if (color && category && materials.length > 0) {
        const filteredPosts = allPostsCopy.filter((post) =>
          post.materials?.some((m) =>
            materials.some((m2) => m.value === m2.value)
          )
        );
        setPosts(
          filteredPosts.filter(
            (post) => post.color === color && post.category === category
          )
        );
        setNumberOfFilters(materials.length + 2);
      }
    }
  }, [openSearchModal]);

  const onClickReset = () => {
    setPosts(allPosts);
    setColor("");
    setCategory("");
    setMaterials([]);
    setNumberOfFilters(0);
    setSort("New");
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
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
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                flexWrap: "wrap",
                width: "100%",
              }}
            >
              {sort === "New" ? null : (
                <Box
                  sx={{
                    fontSize: "12px",
                    m: "1px",
                    px: 1,
                    py: "1px",
                    border: `1px solid ${pink[300]}`,
                    background: grey[50],
                    borderRadius: 3,
                    fontweight: "bold",
                  }}
                >
                  {sort}↑
                </Box>
              )}

              {color && (
                <Box
                  sx={{
                    fontSize: "12px",
                    m: "1px",
                    px: 1,
                    py: "1px",
                    background: getColor(color).background,
                    color: getColor(color).text,
                    borderRadius: 3,
                  }}
                >
                  {color}
                </Box>
              )}
              {category && (
                <Box
                  sx={{
                    fontSize: "12px",
                    m: "1px",
                    px: 1,
                    py: "1px",
                    background: grey[50],
                    borderRadius: 3,
                  }}
                >
                  {category}
                </Box>
              )}
              {materials.map((m) => (
                <Box
                  sx={{
                    fontSize: "12px",
                    m: "1px",
                    px: 1,
                    py: "1px",
                    background: grey[50],
                    borderRadius: 3,
                    fontweight: "bold",
                  }}
                >
                  {m.label}
                </Box>
              ))}
            </Box>
            <IconButton onClick={() => setOpenSearchModal(true)}>
              <SearchIcon />
            </IconButton>
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
        </Box>
      </Box>
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
        {posts.length === 0 && numberOfFilters > 0 ? (
          <Typography variant="body2">No posts found.</Typography>
        ) : (
          users &&
          posts.map((post) => <Post post={post} users={users} key={post.id} />)
        )}
      </Box>
      <SearchModal
        openSearchModal={openSearchModal}
        setOpenSearchModal={setOpenSearchModal}
        PFs={PFs}
        setSort={setSort}
        sort={sort}
      />
    </>
  );
};

export default Index;
