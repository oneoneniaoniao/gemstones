import React from "react";
import Radio from "@mui/material/Radio";
import {
  Box,
  FormControlLabel,
  IconButton,
  RadioGroup,
  Typography,
} from "@mui/material";
import ReplayOutlinedIcon from "@mui/icons-material/ReplayOutlined";

type Props = {
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const CategoryRadio = ({ category, setCategory }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: category === item,
    onChange: handleChange,
    value: item,
    name: "category-radio",
    inputProps: { "aria-label": item },
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="subtitle1" fontWeight="bold">
          Category
        </Typography>
        <IconButton onClick={() => setCategory("")}>
          <ReplayOutlinedIcon sx={{ width: "16px", height: "16px" }} />
        </IconButton>
      </Box>
      <RadioGroup
        sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 1 }}
      >
        <FormControlLabel
          value="Bracelet"
          control={<Radio {...controlProps("Bracelet")} size="small" />}
          label="Bracelet"
        />
        <FormControlLabel
          value="Necklace"
          control={<Radio {...controlProps("Necklace")} size="small" />}
          label="Necklace"
        />
        <FormControlLabel
          value="Ring"
          control={<Radio {...controlProps("Ring")} size="small" />}
          label="Ring"
        />
        <FormControlLabel
          value="Earring"
          control={<Radio {...controlProps("Earring")} size="small" />}
          label="Earring"
        />
        <FormControlLabel
          value="Others"
          control={<Radio {...controlProps("Others")} size="small" />}
          label="Others"
        />
      </RadioGroup>
    </>
  );
};

export default CategoryRadio;
