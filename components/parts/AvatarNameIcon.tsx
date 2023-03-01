import React from "react";
import { useRouter } from "next/router";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { UserType } from "@/features/types";

type Props = {
  user: UserType;
  size: "small" | "medium" | "large";
};

const AvatarNameIcon = ({ user, size }: Props) => {
  const avatarSize = size === "small" ? 20 : size === "medium" ? 32 : 48;
  const fontSize =
    size === "small" ? "body2" : size === "medium" ? "body2" : "h6";
  const router = useRouter();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        margin: 0,
        marginBottom: 0.2,
        "&:hover": { opacity: 0.8, cursor: "pointer" },
      }}
      onClick={() => router.push(`/user/${user.uid}`)}
    >
      <Avatar
        src={user.photoURL}
        sx={{
          width: avatarSize,
          height: avatarSize,
          marginRight: 0.5,
        }}
      />
      <Typography variant={fontSize}>{user.displayName}</Typography>
    </Box>
  );
};

export default AvatarNameIcon;
