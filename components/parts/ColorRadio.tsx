import React from "react";
import {
  pink,
  orange,
  yellow,
  green,
  blue,
  purple,
  grey,
} from "@mui/material/colors";
import Radio from "@mui/material/Radio";
import {
  FormControlLabel,
  RadioGroup,
} from "@mui/material";

type Props = {
  color: string;
  setColor: React.Dispatch<React.SetStateAction<string>>;
};

const ColorRadio = ({ color: selectedColor, setColor }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setColor(event.target.value);
  };

  const controlProps = (item: string) => ({
    checked: selectedColor === item,
    onChange: handleChange,
    value: item,
    name: "color-radio",
    inputProps: { "aria-label": item },
  });

  return (
    <RadioGroup sx={{ display: "flex", flexDirection: "row", width: "100%" }}>
      <Radio {...controlProps("pink")} sx={color.pink} size="small" />
      <Radio {...controlProps("orange")} sx={color.orange} size="small" />
      <Radio {...controlProps("green")} sx={color.green} size="small" />
      <Radio {...controlProps("blue")} sx={color.blue} size="small" />
      <Radio {...controlProps("purple")} sx={color.purple} size="small" />
      <Radio {...controlProps("white")} sx={color.white} size="small" />
      <Radio {...controlProps("black")} sx={color.black} size="small" />
      <FormControlLabel
        value="mixed"
        control={<Radio {...controlProps("mixed")} size="small" />}
        sx={color.mixed}
        label="Mixed"
      />
      <FormControlLabel
        value="pastel"
        control={<Radio {...controlProps("pastel")} size="small" />}
        sx={color.pastel}
        label="Pastel"
      />
    </RadioGroup>
  );
};

export default ColorRadio;

const color = {
  pink: {
    color: pink[600],
    "&.Mui-checked": {
      color: pink[400],
    },
  },
  orange: {
    color: orange[800],
    "&.Mui-checked": {
      color: orange[600],
    },
  },
  yellow: {
    color: yellow[800],
    "&.Mui-checked": {
      color: yellow[600],
    },
  },
  green: {
    color: green[800],
    "&.Mui-checked": {
      color: green[600],
    },
  },
  blue: {
    color: blue[800],
    "&.Mui-checked": {
      color: blue[600],
    },
  },
  purple: {
    color: purple[800],
    "&.Mui-checked": {
      color: purple[600],
    },
  },
  white: {
    color: grey[200],
    "&.Mui-checked": {
      color: grey[100],
    },
  },
  black: {
    color: grey[900],
    "&.Mui-checked": {
      color: grey[800],
    },
  },

  mixed: {
    margin: 0,
    color: "#ACB6E5",
    background:
      "-webkit-linear-gradient(0deg,orange 20%, green 25%, green 30%, blue 35%, blue 30%,purple 35%, purple 40%, red 50%, red 60%, orange 65%, orange 70%, green 75%, green 80%, blue 85%, blue 90%,purple 95%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  pastel: {
    margin: 0,
    color: "#ACB6E5",
    background:
      "-webkit-linear-gradient(0deg,orange 20%, green 25%, green 30%, blue 35%, blue 30%,purple 35%, purple 40%, #ff638a 50%, #ff638a 60%, #ffaf63 65%, #ffaf63 70%, #63ffa9 75%, #63ffa9 80%, #63ceff 85%, #63ceff 90%,#a463ff 95%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    WebkitTextStroke: "0.1px #333",
    TextStroke: "0.1px #333",
    fontWeight: "bold",
  },
};
