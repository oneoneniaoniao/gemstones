import React from "react";
import { Box, Button, Modal, Paper, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type Props = {
  resetEmail: string;
  setResetEmail: (email: string) => void;
  sendResetEmail: (e: React.MouseEvent<HTMLElement>) => Promise<void>;
  setOpenModal: (isOpen: boolean) => void;
  openModal: boolean;
};

const EmailResetModal = ({
  resetEmail,
  setResetEmail,
  sendResetEmail,
  setOpenModal,
  openModal,
}: Props) => {
  const handleClose = () => {
    setResetEmail("");
    setOpenModal(false);
  };

  return (
    <Modal open={openModal} onClose={() => setOpenModal(false)} >
      <Paper
        sx={{
          position: "absolute",
          padding: "1.5rem",
          py: "3rem",
          top: `50%`,
          left: `50%`,
          borderRadius: 4,
          transform: `translate(-50%, -50%)`,
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            width: "100%",
          }}
          component="form"
        >
          <TextField
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            autoFocus
            required
            sx={{ m: "0.5rem" }}
            type="email"
            name="email"
            id="email"
            label="Please enter E-mail you used to sign up."
            value={resetEmail}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setResetEmail(e.target.value);
            }}
          />
          <Box sx={{ display: "flex", width: "100%", alignItems: "center" }}>
            <Button
              variant="contained"
              disabled={
                resetEmail.length < 6 ||
                !resetEmail.includes("@") ||
                !resetEmail.includes(".")
              }
              onClick={sendResetEmail}
              sx={{ m: "0.5rem", width: "160px" }}
              endIcon={<SendIcon />}
            >
              Send Email
            </Button>
            <Button
              variant="outlined"
              onClick={handleClose}
              sx={{ m: "0.5rem", width: "160px" }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Paper>
    </Modal>
  );
};

export default EmailResetModal;
