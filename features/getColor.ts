import { pink, orange, green, blue, purple, grey } from "@mui/material/colors";

export const getColor = (
  prop: string
): { background: string; text: string } => {
  switch (prop) {
    case "Pink/Red":
      return { background: pink[600], text: "white" };
    case "Yellow/Orange/Gold":
      return { background: orange[800], text: grey[900] };
    case "Green":
      return { background: green[800], text: "white" };
    case "Blue":
      return { background: blue[600], text: "white" };
    case "Purple":
      return { background: purple[600], text: "white" };
    case "White/Silver":
      return { background: grey[300], text: grey[900] };
    case "Black/Gray":
      return { background: grey[900], text: "white" };
    case "Mixed":
      return {
        background:
          "-webkit-linear-gradient(-45deg,orange 10%, green 15%, green 20%, blue 25%, blue 30%,purple 35%, purple 40%, red 50%, red 60%, orange 65%, orange 70%, green 75%, green 80%, blue 85%, blue 90%,purple 95%)",
        text: "white",
      };
    case "Pastel":
      return {
        background:
          "-webkit-linear-gradient(-45deg,#ffaf63 10%, #63ffa9 15%, #63ffa9 20%, #63ceff 25%, #63ceff 30%,#a463ff 35%, #a463ff 40%, #ff638a 50%, #ff638a 60%, #ffaf63 65%, #ffaf63 70%, #63ffa9 75%, #63ffa9 80%, #63ceff 85%, #63ceff 90%,#a463ff 95%)",
        text: grey[900],
      };
    default:
      return { background: "white", text: grey[900] };
  }
};
