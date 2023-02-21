import React from "react";
import {
  Box,
  Button,
  FormControl,
  Modal,
  NativeSelect,
  Paper,
  Typography,
} from "@mui/material";
import { PostFeaturesType } from "@/features/types";
import MaterialSelect from "@/components/parts/MaterialSelect";
import ColorRadio from "@/components/parts/ColorRadio";
import CategoryRadio from "@/components/parts/CategoryRadio";

type Props = {
  PFs: PostFeaturesType;
  openSearchModal: boolean;
  setOpenSearchModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
};

const SearchModal = ({
  openSearchModal,
  setOpenSearchModal,
  PFs,
  setSort,
  sort,
}: Props) => {
  return (
    <Modal open={openSearchModal} onClose={() => setOpenSearchModal(false)}>
      <Paper
        sx={{
          width: "90%",
          maxWidth: "580px",
          position: "absolute",
          padding: "1.5rem",
          py: "2rem",
          top: `4rem`,
          left: `50%`,
          borderRadius: 4,
          transform: `translate(-50%, 0)`,
        }}
      >
        <Box sx={{ width: "100%" }}>
          <ColorRadio color={PFs.color} setColor={PFs.setColor} />
          <CategoryRadio
            category={PFs.category}
            setCategory={PFs.setCategory}
          />
          <MaterialSelect
            setMaterial={PFs.setMaterial}
            defaultValue={PFs.material}
          />
        </Box>
        <Typography fontWeight="bold" variant="subtitle1">
          Sort by
        </Typography>
        <FormControl sx={{ m: 1, mt: 0, minWidth: 140 }} size="small">
          <NativeSelect
            id="sort"
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as string);
            }}
            variant="standard"
          >
            <option value={"New"}>Newest Post</option>
            <option value={"Likes"}>Likes</option>
            <option value={"Comments"}>Comments</option>
          </NativeSelect>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Button
            variant="contained"
            sx={{ width: "50%" }}
            onClick={() => setOpenSearchModal(false)}
          >
            Search
          </Button>
        </Box>
      </Paper>
    </Modal>
  );
};

export default SearchModal;
