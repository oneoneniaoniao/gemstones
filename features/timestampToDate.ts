import { Timestamp } from "firebase/firestore";

const timestampToDate = (timestamp: Timestamp | null | "") => {
  if (timestamp) {
    const date = timestamp.toDate();
    const year = date.getFullYear();
    const month = ("00" + (date.getMonth() + 1)).slice(-2);
    const day = ("00" + date.getDate()).slice(-2);
    const hour = ("00" + date.getHours()).slice(-2);
    const minutes = ("00" + date.getMinutes()).slice(-2);

    return `${year}/${month}/${day} ${hour}:${minutes}`;
  }
  return "";
};

export default timestampToDate;
