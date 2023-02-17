import React from "react";
import Radio from "@mui/material/Radio";
import { FormControlLabel, RadioGroup } from "@mui/material";

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
    <RadioGroup
      sx={{ display: "flex", flexDirection: "row", width: "100%", pl: 1 }}
    >
      <FormControlLabel
        value="bracelet"
        control={<Radio {...controlProps("bracelet")} size="small" />}
        label="Bracelet"
      />
      <FormControlLabel
        value="necklace"
        control={<Radio {...controlProps("necklace")} size="small" />}
        label="Necklace"
      />
      <FormControlLabel
        value="ring"
        control={<Radio {...controlProps("ring")} size="small" />}
        label="Ring"
      />
      <FormControlLabel
        value="earring"
        control={<Radio {...controlProps("earring")} size="small" />}
        label="Earring"
      />
      <FormControlLabel
        value="others"
        control={<Radio {...controlProps("others")} size="small" />}
        label="Others"
      />
    </RadioGroup>
  );
};

export default CategoryRadio;
